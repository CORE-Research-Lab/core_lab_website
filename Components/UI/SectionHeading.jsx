/**
 * Section and subsection headings for long, scroll-anchored pages.
 * `id` doubles as the in-page nav target, so the scroll offset lives here.
 */
export const SectionHeading = ({ id, children, bordered = true, className = '' }) => (
  <h2
    id={id}
    className={`scroll-anchor text-section font-editorial text-brand-dark ${
      bordered ? 'border-t border-black/15 pt-5' : ''
    } ${className}`}
  >
    {children}
  </h2>
)

export const SubsectionHeading = ({ id, children, className = '' }) => (
  <h3
    id={id}
    className={`scroll-anchor text-subsection font-editorial text-brand-dark ${className}`}
  >
    {children}
  </h3>
)

export default SectionHeading
