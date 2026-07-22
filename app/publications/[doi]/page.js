import Poster from '@/Components/Publications/Poster';
import { posterItems, postersBySlug } from '@/data/publications';

export function generateStaticParams() {
  return posterItems.map((poster) => ({ doi: poster.slug }));
}

export async function generateMetadata({ params }) {
  const { doi } = await params;
  const poster = postersBySlug[doi];

  if (!poster) {
    return { title: 'Poster not found' };
  }

  return {
    title: poster.title,
    description: `${poster.conference} poster: ${poster.title}`,
  };
}

export default async function PosterPage({ params }) {
  const { doi } = await params;
  return <Poster doi={doi} />;
}
