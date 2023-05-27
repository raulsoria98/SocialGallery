import { useState } from 'react'
import { deleteArtworkAsAuthor } from '#Services/artwork.js'
import useErrors from '#Hooks/useErrors.js'
import Errors from './Errors.jsx'

export default function DeleteArtworkButton ({ artwork, token, getArtworks }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async (e) => {
    clearErrors()
    setIsSubmitting(true)

    try {
      await deleteArtworkAsAuthor({ artworkId: artwork.id, token })
      getArtworks()
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type='button'
        className='delete-button'
        onClick={handleDelete}
        disabled={isSubmitting}
        style={{ marginLeft: '1rem', marginBottom: '1rem' }}
      >
        {isSubmitting ? 'Eliminando...' : 'Eliminar'}
      </button>
      {errors && <Errors errors={errors} />}
    </>
  )
}
