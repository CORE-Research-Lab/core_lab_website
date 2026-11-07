import { photoAlbumContent } from '@/data/home'
import { getLabPhotos } from '@/lib/photos.mjs'
import PhotoAlbum from '@/Components/Home/PhotoAlbum'

/**
 * The photo strip at the foot of the homepage. The folder is read here, on the
 * server, and the client album gets a plain list. An empty folder means no
 * section at all rather than an empty frame.
 */
const LabPhotos = async () => {
  const photos = await getLabPhotos()

  if (photos.length === 0) return null

  return (
    <PhotoAlbum
      title={photoAlbumContent.title}
      description={photoAlbumContent.description}
      photos={photos}
    />
  )
}

export default LabPhotos
