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
      <PageHeader
        eyebrow='CORE Lab / Archive'
        title={artworkSection.title}
        description={artworkSection.description}
      />
      <div className='page-shell grid gap-x-8 gap-y-20 pb-24 md:grid-cols-2 xl:grid-cols-3'>
        {artworkSection.items.map((artwork, index) => (
          <figure
            className='flex flex-col'
            key={`${artwork.artist}-${index}`}
          >
            <Image
              src={artwork.image}
              alt={`Artwork by ${artwork.artist}`}
              className='aspect-4/3 w-full bg-[#e8e8e3] object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
            <figcaption className='mt-5 grid flex-1 gap-3 border-t border-black/20 pt-4 sm:grid-cols-[0.3fr_1fr]'>
              <h2 className='text-xs font-semibold uppercase tracking-[0.12em] text-brand'>Artist: {artwork.artist}</h2>
              <p className='text-base leading-7 text-slate-600'>{artwork.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
