import { photoCarouselContent } from '@/data/home'
import { getLabPhotos } from '@/lib/photos.mjs'
import PhotoCarousel from '@/Components/Home/PhotoCarousel'

/**
 * The photo strip at the foot of the homepage. The folder is read here, on the
 * server, and the client carousel gets a plain list. An empty folder means no
 * section at all rather than an empty frame.
 */
const LabPhotos = async () => {
  const photos = await getLabPhotos()

  if (photos.length === 0) return null

  return (
    <PhotoCarousel
      title={photoCarouselContent.title}
      description={photoCarouselContent.description}
      photos={photos}
    />
  )
}

export default LabPhotos
