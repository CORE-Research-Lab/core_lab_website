/**
 * The single page-title block used by every route, so headings and intro copy
 * line up across the site instead of each page rolling its own widths.
 */
const PageHeader = ({ title, description, eyebrow = 'CORE Lab', children }) => (
  <header className='page-shell pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-32'>
    <p className='mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-muted'>
      {eyebrow}
    </p>
    <h1 className='max-w-[15ch] text-title font-editorial text-brand-dark'>{title}</h1>
    {description && (
      <p className='mt-7 max-w-5xl text-xl leading-8 text-slate-600 sm:text-2xl sm:leading-9'>
        {description}
      </p>
    )}
    {children}
  </header>
)

export default PageHeader
