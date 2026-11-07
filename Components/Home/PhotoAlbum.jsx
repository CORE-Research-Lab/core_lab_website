'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal, flushSync } from 'react-dom'
import Image from 'next/image'
import { Caveat } from 'next/font/google'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import { TurnControls, prefersReducedMotion, useSwipe } from '@/Components/UI/TurnControls'
import PhotoViewer, { printSizes } from '@/Components/Home/PhotoViewer'

// Captions are written under each print, the way people label an album.
const handwriting = Caveat({ subsets: ['latin'], weight: ['500'], display: 'swap' })

// The page shape, 5:4. The book lays two side by side as a 5:2 spread from
// `lg` up and shows one alone below that; the frame uses the same ratios, so
// nothing moves when the book takes over from the static first page.
const pageWidth = 500
const pageHeight = 400
// The book switches to one page at a time when it is narrower than twice
// this. 350 puts the switch between the widest single-page frame
// (sm:max-w-2xl) and the narrowest spread at `lg`, so it agrees with the CSS.
const minPageWidth = 350
const paperColor = '#fbf8f1'
const flipMs = 900

// Prints are never mounted quite straight. A fixed sequence keeps the tilt the
// same on every visit and between server and browser renders.
const tilts = ['-1.4deg', '1deg', '0.6deg', '-0.9deg', '1.5deg', '-0.5deg']
const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left']

// The width a print image declares. Only its ratio to the height matters: the
// print box sets the displayed size and `printSizes` picks the file.
const printImageWidth = 1200

// A fresh order on every visit (Fisher–Yates).
const shuffled = (items) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const subscribeToNothing = () => () => {}
const useIsClient = () =>
  useSyncExternalStore(subscribeToNothing, () => true, () => false)

const nextPaint = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

const canMorph = () =>
  typeof document !== 'undefined' &&
  typeof document.startViewTransition === 'function' &&
  !prefersReducedMotion()

/**
 * Carries a print between the album page and the viewer. `from` is the print
 * on screen now; `update` makes the change and returns the print on screen
 * after it. Where the browser has View Transitions it animates one into the
 * other, so the print lifts off the page, straightens and grows (or settles
 * back); elsewhere the change just happens.
 */
const morphPrint = (from, update) => {
  if (!canMorph()) {
    update()
    return
  }

  let to = null
  if (from) from.style.viewTransitionName = 'album-print'

  const transition = document.startViewTransition(async () => {
    if (from) from.style.viewTransitionName = ''
    to = update()
    if (!to) return
    to.style.viewTransitionName = 'album-print'
    // Hold the snapshot until the photo is decoded, so it never lifts blank.
    await to.querySelector('img')?.decode().catch(() => {})
  })

  transition.ready.catch(() => {})
  transition.finished.finally(() => {
    if (to) to.style.viewTransitionName = ''
  })
}

/**
 * A white-bordered print held by four photo corners, cut to the photo's own
 * shape so nothing is cropped. Pressing it holds the photo up in the viewer.
 */
const Print = ({ photo, index, eager, onOpen }) => (
  <button
    type='button'
    className='photo-print relative block cursor-zoom-in'
    style={{ '--ratio': photo.aspectRatio, '--tilt': tilts[index % tilts.length] }}
    data-photo-index={index}
    onClick={(event) => onOpen(index, event.currentTarget)}
    aria-label={`View photo: ${photo.alt}`}
  >
    <span className='relative block size-full overflow-hidden bg-slate-100'>
      {/* Sized by its own shape rather than `fill`: pages the book is not
          showing have no size, and a `fill` image that loads ahead on one of
          them trips Next's zero-height warning. */}
      <Image
        src={photo.src}
        alt=''
        width={printImageWidth}
        height={Math.round(printImageWidth / photo.aspectRatio)}
        loading={eager ? 'eager' : 'lazy'}
        sizes={printSizes}
        className='size-full object-cover'
        draggable={false}
      />
    </span>
    {corners.map((corner) => (
      <span key={corner} className='photo-corner' data-corner={corner} aria-hidden='true' />
    ))}
  </button>
)

/**
 * What is printed on one page: the print, its handwritten caption, and the
 * page number. `side` says which side of the spine the page sits on, for the
 * gutter shading.
 */
const PageContent = ({ photo, index, eager, onOpen }) => (
  <div className='album-leaf absolute inset-0' data-side={index % 2 === 0 ? 'left' : 'right'}>
    <div className='absolute inset-x-6 top-6 bottom-9 sm:inset-x-10 sm:top-8 sm:bottom-11'>
      <figure className='album-fit flex size-full flex-col items-center justify-center'>
        <Print photo={photo} index={index} eager={eager} onOpen={onOpen} />
        <figcaption
          className={`${handwriting.className} mt-3 line-clamp-2 max-w-full text-center text-xl leading-6 text-brand-dark/80 sm:text-[1.375rem]`}
          aria-hidden='true'
        >
          {photo.alt}
        </figcaption>
      </figure>
    </div>
    <p
      className='absolute inset-x-0 bottom-3 text-center font-serif text-xs italic tabular-nums text-slate-400 sm:bottom-4'
      aria-hidden='true'
    >
      {index + 1}
    </p>
  </div>
)

/**
 * The homepage photo album. Pages turn like paper: drag a corner, swipe, click
 * a page, or use the controls underneath, and the page curls over with its
 * shadow. One page shows at a time on phones and tablets, an open spread from
 * `lg` up. Pressing a print lifts it off the page into the viewer.
 *
 * The page curl is `@gullabs/flipbook-core` (MPL-2.0), a maintained fork of
 * StPageFlip. It owns the page elements and moves them around its own DOM, so
 * React renders each page into its element through a portal. Until it loads,
 * a static copy of the first spread holds the place.
 */
const PhotoAlbum = ({ title, description, photos: folderPhotos }) => {
  const isClient = useIsClient()
  // Shuffled in the browser, so each visit gets its own order. The server
  // render keeps filename order, and the swap happens once the page's script
  // takes over, so the two never disagree while React hydrates.
  const photos = useMemo(
    () => (isClient ? shuffled(folderPhotos) : folderPhotos),
    [isClient, folderPhotos]
  )
  const albumRef = useRef(null)
  const hostRef = useRef(null)
  const bookRef = useRef(null)
  const viewerPrintRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState([0])
  const [viewing, setViewing] = useState(null)

  // One element per page, for the book to own.
  const pageNodes = useMemo(() => {
    if (!isClient) return null
    return photos.map(() => {
      const node = document.createElement('div')
      node.dataset.density = 'soft'
      return node
    })
  }, [isClient, photos])

  useEffect(() => {
    const host = hostRef.current
    if (!pageNodes || !host) return

    let book = null
    let cancelled = false

    import('@gullabs/flipbook-core').then(({ PageFlip }) => {
      if (cancelled) return

      book = new PageFlip(host, {
        sizing: 'responsive',
        width: pageWidth,
        height: pageHeight,
        minWidth: minPageWidth,
        maxWidth: 720,
        minHeight: 100,
        maxHeight: 900,
        usePortrait: true,
        drawShadow: true,
        maxShadowOpacity: 0.45,
        flippingTime: flipMs,
        // No corner peeling up on hover: the site keeps hover feedback to
        // colour and shadow. Corners still turn when dragged.
        foldCornerOnHover: false,
        flipOnClick: 'anywhere',
        pageBackground: paperColor,
        respectReducedMotion: true,
      })

      const sync = ({ data }) => setVisible(data.visiblePages)
      book.on('ready', (event) => {
        sync(event)
        setReady(true)
      })
      book.on('flip', sync)
      book.on('pagesChanged', sync)
      // Going from one page to a spread (or back) changes what is on show
      // without turning a page, and this event carries no page list.
      book.on('changeOrientation', () => setVisible(book.getVisiblePages()))
      book.loadFromHTML(pageNodes)
      bookRef.current = book
    })

    return () => {
      cancelled = true
      book?.destroy()
      bookRef.current = null
      setReady(false)
    }
  }, [pageNodes])

  const turn = useCallback((direction) => {
    const book = bookRef.current
    if (!book?.isReady()) return
    if (direction > 0) book.flipNext('bottom')
    else book.flipPrev('bottom')
  }, [])

  const openPhoto = useCallback((index, print) => {
    if (bookRef.current?.isAnimating()) return
    morphPrint(print, () => {
      flushSync(() => setViewing(index))
      return viewerPrintRef.current
    })
  }, [])

  // Putting a photo down leaves the album open at it, so browsing in the
  // viewer carries the book along. The turn happens under the dimmed viewer,
  // before the print settles back onto its page.
  const closePhoto = useCallback(async () => {
    const index = viewing
    if (index === null) return

    const book = bookRef.current
    if (book?.isReady() && !book.getVisiblePages().includes(index)) {
      book.turnToPage(index)
      await nextPaint()
    }

    const pagePrint = albumRef.current?.querySelector(`[data-photo-index="${index}"]`)
    morphPrint(viewerPrintRef.current, () => {
      flushSync(() => setViewing(null))
      return pagePrint
    })
  }, [viewing])

  const stepPhoto = useCallback(
    (direction) =>
      setViewing((index) => Math.min(Math.max(index + direction, 0), photos.length - 1)),
    [photos.length]
  )

  // A swipe that starts on a print turns the page too. The book handles
  // swipes everywhere else itself, but leaves prints alone because they are
  // buttons.
  const swipe = useSwipe({
    onNext: () => turn(1),
    onPrevious: () => turn(-1),
    from: '.photo-print',
  })

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') turn(1)
    if (event.key === 'ArrowLeft') turn(-1)
  }

  const first = visible[0] ?? 0
  const last = visible.at(-1) ?? first
  const label =
    first === last
      ? `Page ${first + 1} of ${photos.length}`
      : `Pages ${first + 1}–${last + 1} of ${photos.length}`

  // The pages on show and a spread either side load ahead, so a turning page
  // never shows a blank print; the rest wait until they are close.
  const isNear = (index) => index >= first - 2 && index <= last + 3

  return (
    <section
      className='border-t border-brand-line'
      aria-roledescription='photo album'
      aria-label={title}
      onKeyDown={onKeyDown}
    >
      <div className='page-shell py-14 sm:py-16'>
        <SectionHeading id='photos'>{title}</SectionHeading>

        {description && (
          <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-700'>{description}</p>
        )}

        {/* The cover: a navy board a little larger than the pages, so it
            shows as a rim around them. */}
        <div className='album-cover mx-auto mt-6 rounded-2xl p-2 sm:max-w-2xl sm:p-2.5 lg:max-w-6xl'>
          <div
            ref={albumRef}
            className='album-pages relative aspect-5/4 touch-pan-y overflow-hidden rounded-lg lg:aspect-5/2'
            {...swipe}
          >
            <div ref={hostRef} className='album-host' />

            {/* Rendered here in the React tree, whatever the book does with
                the elements, so React events from a page (the swipe above)
                bubble through this frame. */}
            {pageNodes?.map((node, index) =>
              createPortal(
                <PageContent
                  photo={photos[index]}
                  index={index}
                  eager={isNear(index)}
                  onOpen={openPhoto}
                />,
                node,
                photos[index].src
              )
            )}

            {!ready && (
              <div className='absolute inset-0 flex'>
                <div className='relative h-full w-full lg:w-1/2'>
                  <PageContent photo={photos[0]} index={0} eager onOpen={openPhoto} />
                </div>
                {photos[1] && (
                  <div className='relative hidden h-full w-1/2 lg:block'>
                    <PageContent photo={photos[1]} index={1} eager onOpen={openPhoto} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {photos.length > 1 && (
          <TurnControls
            className='mt-4'
            itemName='page'
            onPrevious={() => turn(-1)}
            onNext={() => turn(1)}
            canPrevious={first > 0}
            canNext={last < photos.length - 1}
            label={label}
          />
        )}
      </div>

      <PhotoViewer
        photos={photos}
        index={viewing}
        onClose={closePhoto}
        onStep={stepPhoto}
        printRef={viewerPrintRef}
        captionClassName={handwriting.className}
      />
    </section>
  )
}

export default PhotoAlbum
