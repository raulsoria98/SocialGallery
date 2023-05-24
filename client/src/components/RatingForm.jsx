import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'

import Errors from './Errors.jsx'
import { Box, Rating } from '@mui/material'
import { deleteRating, getArtworkById, rateArtwork } from '#Services/artwork.js'

export default function RatingForm ({ artwork, token, userRating, setUserRating, onDeleteRating }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(userRating?.score || null)
  const [comment, setComment] = useState(userRating?.comment || '')

  const updateArtworkRating = async ({ artwork }) => {
    const updatedArtwork = await getArtworkById({ artworkId: artwork.id })
    artwork.rating = updatedArtwork.rating
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        artworkId: artwork.id,
        score,
        comment
      }

      await rateArtwork({ data, token })
      setUserRating({ score, comment })
      clearErrors()

      // Actualizamos la valoración media de la obra
      updateArtworkRating({ artwork })
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (e) => {
    setIsSubmitting(true)

    try {
      await deleteRating({ artworkId: artwork.id, token })
      onDeleteRating()
      clearErrors()

      // Actualizamos la valoración media de la obra
      updateArtworkRating({ artwork })
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !score || isSubmitting

  const handleChange = (e) => {
    const { value, name } = e.target

    if (name === 'score') {
      setScore(parseInt(value))
    } else if (name === 'comment') {
      setComment(value)
    }
  }

  return (
    <Box>
      {errors && <Errors errors={errors} />}
      {userRating
        ? (
          <Box>
            <Rating name='user-rating' value={userRating.score} precision={0.5} size='small' readOnly />
            <p>{userRating.comment}</p>
            <button onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Borrando...' : 'Borrar valoración'}
            </button>
          </Box>
          )
        : (
          <form className='rating-form' onSubmit={handleSubmit}>
            <Rating name='score' defaultValue={0} size='small' value={score} onChange={handleChange} />
            <textarea name='comment' value={comment} placeholder='Deja un comentario...' rows={4} style={{ width: '100%', marginTop: '8px' }} onChange={handleChange} />
            <button type='submit' disabled={isDisabled} style={{ marginTop: '8px' }}>
              {isSubmitting ? 'Cargando...' : 'Enviar'}
            </button>
          </form>
          )}
    </Box>
  )
}
