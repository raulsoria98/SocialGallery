import { useEffect, useState } from 'react'
import { Rating } from '@mui/material'

import useAuth from '#Hooks/useAuth.js'

import ArtworkModal from './ArtworkModal.jsx'

import './Artwork.scss'

export default function Artwork ({ artwork, getArtworks }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { user, token } = useAuth()

  const fileData = new Uint8Array(artwork.file.data)
  // eslint-disable-next-line no-undef
  const blob = new Blob([fileData], { type: artwork.file.type })
  const imageUrl = URL.createObjectURL(blob)

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <li className='Artwork'>
      <img className='file' src={imageUrl} alt={artwork.title} onClick={openModal} />
      <h2 className='title'>{artwork.title}</h2>
      <p className='author'>{artwork.author.name}</p>
      <Rating name='read-only' value={artwork.rating} precision={0.5} size='small' readOnly />

      <ArtworkModal
        artwork={artwork}
        user={user}
        token={token}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        imageUrl={imageUrl}
        getArtworks={getArtworks}
      />
    </li>
  )
}
