import { useEffect, useState } from 'react'
import { Box, Modal, Rating } from '@mui/material'

import './Artwork.scss'

export default function Artwork ({ artwork }) {
  const [modalOpen, setModalOpen] = useState(false)

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

      <Modal
        open={modalOpen} onClose={() => setModalOpen(false)} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <Box sx={{ width: 800 }}>
          <img src={imageUrl} alt={artwork.title} style={{ width: '100%', marginBottom: 10 }} />
          <h2>{artwork.title}</h2>
          <p>{artwork.description}</p>
          <p>Author: {artwork.author.name}</p>
          <Rating name='read-only' value={artwork.rating} precision={0.5} size='small' readOnly />
        </Box>
      </Modal>
    </li>
  )
}
