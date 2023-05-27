import { Box, Modal } from '@mui/material'
import RatingForm from './RatingForm.jsx'
import { useEffect, useState } from 'react'
import { getUserRating } from '#Services/artwork.js'
import useErrors from '#Hooks/useErrors.js'
import Errors from './Errors.jsx'

export default function ArtworkModal ({ artwork, user, token, modalOpen, setModalOpen, imageUrl, getArtworks }) {
  const [userRating, setUserRating] = useState(null)

  const { errors, setErrors, clearErrors } = useErrors()

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const rating = await getUserRating({ artworkId: artwork.id, token })
        setUserRating(rating)
        clearErrors()
      } catch (error) {
        setErrors(error)
      }
    }

    if (user) {
      fetchUserRating()
    }
  }, [artwork.id, token, user])

  const handleDeleteRating = async () => {
    try {
      setUserRating(null)
      clearErrors()
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)} sx={modalStyle}>
      <Box sx={{ display: 'flex', maxHeight: '500px', maxWidth: '70%', backgroundColor: 'grey', border: 'round', borderRadius: '8px' }}>
        {errors && <Errors errors={errors} />}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={imageUrl} alt={artwork.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px' }}>
          <div>
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
            <p>Autor: {artwork.author.name}</p>
          </div>
          {user && (
            <RatingForm
              artwork={artwork}
              user={user}
              token={token}
              userRating={userRating}
              onDeleteRating={handleDeleteRating}
              setUserRating={setUserRating}
              getArtworks={getArtworks}
            />
          )}
        </Box>
      </Box>
    </Modal>
  )
}
