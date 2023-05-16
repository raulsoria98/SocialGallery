import { useEffect } from 'react'

import './Artwork.scss'

export default function Artwork ({ artwork }) {
  const fileData = new Uint8Array(artwork.file.data)
  // eslint-disable-next-line no-undef
  const blob = new Blob([fileData], { type: artwork.file.type })
  const imageUrl = URL.createObjectURL(blob)

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  return (
    <li className='Artwork'>
      <img className='file' src={imageUrl} alt={artwork.title} />
      <h2 className='title'>{artwork.title}</h2>
      <p className='author'>{artwork.author.name}</p>
    </li>
  )
}
