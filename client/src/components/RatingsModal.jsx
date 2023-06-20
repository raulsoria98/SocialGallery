import React, { useState, useEffect } from 'react'
import { getRatingsFromArtwork } from '#Services/artwork.js'
import useErrors from '#Hooks/useErrors.js'
import Errors from './Errors.jsx'
import { Box, List, ListItem, ListItemText, Modal, Rating, Typography } from '@mui/material'

const RatingsModal = ({ artwork, userRating }) => {
  const [openModal, setOpenModal] = useState(false)
  const [ratings, setRatings] = useState([])

  const { errors, setErrors, clearErrors } = useErrors()

  useEffect(() => {
    // Llamada a la función para obtener las valoraciones del artwork
    const fetchRatings = async () => {
      try {
        const fetchedRatings = await getRatingsFromArtwork({ artworkId: artwork.id })
        setRatings(fetchedRatings)
        clearErrors()
      } catch (error) {
        setErrors(error)
      }
    }

    fetchRatings()
  }, [artwork, userRating])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }

  return (
    <>
      <button onClick={handleOpenModal}>Ver valoraciones</button>
      <Modal open={openModal} onClose={() => handleCloseModal} sx={modalStyle}>
        <Box
          sx={{
            width: 600,
            maxHeight: 400,
            bgcolor: 'grey',
            boxShadow: 24,
            p: 2
          }}
        >
          {errors && <Errors errors={errors} />}
          <Typography variant='h6' component='h2' align='center' fontWeight='bold' gutterBottom>
            Valoraciones de {artwork.title}
          </Typography>
          <List sx={{ maxHeight: 200, overflow: 'auto' }}>
            {ratings.map((rating, index) => (
              <ListItem key={index} disablePadding>
                <Rating style={{ paddingRight: '10px' }} value={rating.score} readOnly />
                <ListItemText primary={rating.comment} />
              </ListItem>
            ))}
          </List>
          <button style={{ marginTop: '10px' }} onClick={handleCloseModal}>Cerrar valoraciones</button>
        </Box>
      </Modal>
    </>
  )
}

export default RatingsModal
