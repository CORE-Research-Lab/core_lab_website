import Papers from '@/Components/Publications/Papers';
import Posters from '@/Components/Publications/Posters';
import Sidebar from '@/Components/Publications/Sidebar';

export const metadata = {
  title: 'Publications',
  description: 'Papers and posters from the CORE Lab and its collaborators.',
};

export default function Publications() {
  return (
    <>
      <header className='mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 lg:px-12'>
        <h1 className='text-3xl font-bold tracking-tight text-brand-dark'>Publications</h1>
        <p className='mt-2 max-w-2xl leading-7 text-slate-700'>
          Papers and poster presentations from the lab and its collaborators.
        </p>
        <aside
          aria-label="Publication author formatting legend"
          className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
        >
          <span className="font-medium text-slate-800">Author legend:</span>
          <span>
            <strong className="text-brand">Bold name</strong>
            {' '}— current CORE Lab member
          </span>
          <span>
            <span className="text-brand underline underline-offset-2">Underlined name</span>
            {' '}— CORE Lab alumni or collaborator with a profile
          </span>
        </aside>
      </header>
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar/>
        <div className="min-w-0 flex-1">
          <Posters/>
          <Papers/>
        </div>
      </div>
    </>
  );
}
