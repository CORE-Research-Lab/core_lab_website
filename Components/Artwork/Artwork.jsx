import Image from 'next/image';
import { artworkSection } from '@/data/home';

const Artwork = () => {
  return (
    <section className='mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12'>
      <h1 className='border-b border-b-slate-200 pb-3 text-2xl font-semibold text-brand'>{artworkSection.title}</h1>
      <p className='max-w-3xl pt-4 leading-7 text-slate-700'>{artworkSection.description}</p>

      <div className='mt-8 grid grid-cols-auto gap-6'>
        {artworkSection.items.map((artwork, index)=>(
            <figure
              className='flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md'
              key={`${artwork.artist}-${index}`}
            >
                <div className='flex h-56 items-center justify-center overflow-hidden bg-slate-50'>
                  <Image
                    src={artwork.image}
                    alt={`Artwork by ${artwork.artist}`}
                    className='h-full w-full object-cover'
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <figcaption className='flex flex-1 flex-col px-5 py-4'>
                  <h3 className='text-base font-semibold text-brand'>Artist: {artwork.artist}</h3>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>{artwork.description}</p>
                </figcaption>
            </figure>
        ))}
      </div>
    </section>
  )
}

export default Artwork
