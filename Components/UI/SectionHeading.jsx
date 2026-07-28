/**
 * Section and subsection headings for long, scroll-anchored pages.
 * `id` doubles as the in-page nav target, so the scroll offset lives here.
 */
export const SectionHeading = ({ id, children, bordered = true, className = '' }) => (
  <h2
    id={id}
    className={`scroll-anchor text-section font-semibold text-brand ${
      bordered ? 'border-b border-slate-200 pb-3' : ''
    } ${className}`}
  >
    {children}
  </h2>
)

export const SubsectionHeading = ({ id, children, className = '' }) => (
  <h3
    id={id}
    className={`scroll-anchor text-subsection font-semibold text-brand-dark ${className}`}
  >
    {children}
  </h3>
)

export default SectionHeading
