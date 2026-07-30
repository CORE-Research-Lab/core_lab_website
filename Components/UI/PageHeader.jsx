/**
 * The single page-title block used by every route, so headings and intro copy
 * line up across the site instead of each page rolling its own widths.
 */
const PageHeader = ({ title, description, children }) => (
  <header className='page-shell pb-6 pt-10 sm:pt-14'>
    <h1 className='text-title font-bold text-brand-dark'>{title}</h1>
    {description && (
      <p className='mt-3 text-lg leading-8 text-slate-600'>{description}</p>
    )}
    {children}
  </header>
)

export default PageHeader
