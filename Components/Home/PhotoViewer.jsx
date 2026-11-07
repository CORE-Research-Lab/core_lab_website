'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { HiX } from 'react-icons/hi'
import { TurnControls } from '@/Components/UI/TurnControls'

// What a print on an album page asks the image optimizer for. The viewer shows
// the same file first, already in the browser's cache, so the print can lift
// off the page without a blank frame while the sharper copy loads over it.
export const printSizes = '(max-width: 1024px) 90vw, 560px'
const viewerSizes = '(max-width: 1100px) 94vw, 1088px'

/**
 * One photo held up close: the print, larger and straight, over a dimmed page,
 * with its caption underneath. A native modal dialog, so focus stays inside,
 * Escape closes it, and focus returns to the print that opened it.
 *
 * The album decides when it opens and closes (it animates the print between
 * the page and here), so this only mirrors `index`: a number shows that photo,
 * `null` closes.
 */
const PhotoViewer = ({ photos, index, onClose, onStep, printRef, captionClassName }) => {
  const dialogRef = useRef(null)
  const isOpen = index !== null

  // A layout effect so the dialog is open by the time the album's
  // `flushSync` returns, ready to be captured for the lift animation.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const photo = isOpen ? photos[index] : null

  // Clicks on the dimmed area around the print close it, like putting it down.
  const closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      onStep(event.key === 'ArrowLeft' ? -1 : 1)
    }
    // Keep arrow keys from also turning the album's pages behind the dialog.
    event.stopPropagation()
  }

  return (
    <dialog
      ref={dialogRef}
      className='photo-viewer'
      aria-label={photo ? photo.alt : 'Photo viewer'}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={closeOnBackdrop}
      onKeyDown={onKeyDown}
    >
      {photo && (
        <div
          className='flex size-full flex-col items-center justify-center gap-5 px-4 py-6 sm:px-8'
          onClick={closeOnBackdrop}
        >
          <button
            type='button'
            onClick={onClose}
            className='absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline sm:right-6 sm:top-5'
          >
            <HiX className='size-4' aria-hidden='true' />
            Close
          </button>

          <figure key={index} className='flex flex-col items-center'>
            <div
              ref={printRef}
              className='viewer-print relative'
              style={{ '--ratio': photo.aspectRatio }}
            >
              <span className='relative block size-full overflow-hidden bg-slate-200'>
                <Image
                  src={photo.src}
                  alt=''
                  fill
                  loading='eager'
                  sizes={printSizes}
                  className='object-cover'
                  draggable={false}
                />
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading='eager'
                  quality={85}
                  sizes={viewerSizes}
                  className='object-cover'
                  draggable={false}
                />
              </span>
            </div>
            <figcaption
              className={`${captionClassName} mt-4 max-w-2xl text-center text-2xl leading-7 text-white/90`}
            >
              {photo.alt}
            </figcaption>
          </figure>

          <TurnControls
            tone='dark'
            itemName='photo'
            onPrevious={() => onStep(-1)}
            onNext={() => onStep(1)}
            canPrevious={index > 0}
            canNext={index < photos.length - 1}
            label={`${index + 1} of ${photos.length}`}
          />
        </div>
      )}
    </dialog>
  )
}

export default PhotoViewer
