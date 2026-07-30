import Image from 'next/image';
import { artworkSection } from '@/data/home';
import PageHeader from '@/Components/UI/PageHeader';

export const metadata = {
  title: 'Lab Artwork',
  description: 'Artwork, office decorations, and visual notes made by CORE Lab members.',
};

export default function ArtworkPage() {
  return (
    <>
      <PageHeader title={artworkSection.title} description={artworkSection.description} />
      <div className='page-shell grid grid-cols-auto gap-6 pb-16'>
        {artworkSection.items.map((artwork, index) => (
          <figure
            className='flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
            key={`${artwork.artist}-${index}`}
          >
            <Image
              src={artwork.image}
              alt={`Artwork by ${artwork.artist}`}
              className='aspect-4/3 w-full bg-slate-50 object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px'
            />
            <figcaption className='flex flex-1 flex-col p-5'>
              <h2 className='text-base font-semibold text-brand'>Artist: {artwork.artist}</h2>
              <p className='mt-2 text-sm leading-6 text-slate-600'>{artwork.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
