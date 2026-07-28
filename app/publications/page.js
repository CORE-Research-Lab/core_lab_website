import Papers from '@/Components/Publications/Papers';
import Posters from '@/Components/Publications/Posters';
import PageHeader from '@/Components/UI/PageHeader';
import SectionNav from '@/Components/UI/SectionNav';
import { publicationsPage } from '@/data/publications';

export const metadata = {
  title: 'Publications',
  description: 'Papers and posters from the CORE Lab and its collaborators.',
};

const navSections = [
  { id: 'posters', label: publicationsPage.postersTitle },
  { id: 'papers', label: publicationsPage.papersTitle },
];

export default function Publications() {
  return (
    <>
      <PageHeader
        title='Publications'
        description='Papers and poster presentations from the lab and its collaborators.'
      />
      <div className='page-shell grid items-start gap-x-12 pb-16 lg:grid-cols-[14rem_minmax(0,1fr)]'>
        <SectionNav sections={navSections} />
        <div className='min-w-0'>
          <Posters />
          <Papers />
        </div>
      </div>
    </>
  );
}
