import Members from '@/Components/All_Team/Team';
import Sidebar from '@/Components/All_Team/Sidebar';

export const metadata = {
  title: 'Team',
  description: 'Directors, current students, frequent collaborators, and past members of the CORE Lab.',
};

export default function Team() {
  return (
    <>
      <header className='mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 lg:px-12'>
        <h1 className='text-3xl font-bold tracking-tight text-brand-dark'>Our Team</h1>
        <p className='mt-2 max-w-2xl leading-7 text-slate-700'>
          Directors, current students, and frequent collaborators from the University of Toronto and partner institutions.
        </p>
      </header>
      <div className='mx-auto flex w-full max-w-7xl'>
        <Sidebar/>
        <div className='min-w-0 flex-1'>
          <Members/>
        </div>
      </div>
    </>
  );
}
