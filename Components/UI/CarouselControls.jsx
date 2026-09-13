import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

/**
 * Pieces shared by the Embla carousels: the poster wall on the publications
 * page and the photo slideshow on the homepage.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Autoplay that behaves the way people expect of a slideshow: it pauses while
 * the pointer is over the frame and resumes when it leaves, and it carries on
 * after a swipe or an arrow press instead of stopping for good. The hover area
 * is the frame around the viewport, so the arrows and counter count as "over".
 */
export const autoplayOptions = (delay) => ({
  delay,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  rootNode: (viewport) => viewport.parentElement,
})

/**
 * Step one slide by hand. This also restarts the autoplay clock, so the next
 * automatic step is a full interval away rather than whatever was left on the
 * timer.
 */
export const stepCarousel = (emblaApi, direction) => {
  if (!emblaApi) return
  if (direction < 0) emblaApi.scrollPrev()
  else emblaApi.scrollNext()
  emblaApi.plugins().autoplay?.reset()
}

const ArrowButton = ({ label, onClick, side, children }) => (
  <button
    type='button'
    onClick={onClick}
    aria-label={label}
    className={`absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand shadow-sm ring-1 ring-slate-900/10 backdrop-blur-sm hover:bg-white hover:text-brand-dark ${
      side === 'left' ? 'left-3' : 'right-3'
    }`}
  >
    {children}
  </button>
)

/**
 * Previous and next buttons laid over the left and right edges of a carousel
 * frame, which needs `relative` and should render these after its viewport so
 * they paint on top.
 */
export const CarouselArrows = ({ onPrevious, onNext, itemName = 'slide' }) => (
  <>
    <ArrowButton label={`Show previous ${itemName}`} onClick={onPrevious} side='left'>
      <HiChevronLeft className='size-5' aria-hidden='true' />
    </ArrowButton>
    <ArrowButton label={`Show next ${itemName}`} onClick={onNext} side='right'>
      <HiChevronRight className='size-5' aria-hidden='true' />
    </ArrowButton>
  </>
)
