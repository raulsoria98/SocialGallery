import useErrors from '#Hooks/useErrors.js'
import { useRef, useState } from 'react'
import Errors from '#Components/Errors.jsx'
import { createArtwork } from '#Services/artwork.js'
import useAuth from '#Hooks/useAuth.js'

export default function UploadArtwork () {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRef = useRef(null)

  const { errors, setErrors, clearErrors } = useErrors()
  const { token } = useAuth()

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value)
    } else if (e.target.id === 'description') {
      setDescription(e.target.value)
    } else if (e.target.id === 'type') {
      setType(e.target.value)
    } else if (e.target.id === 'file') {
      const selected = e.target.files[0]

      if (selected && types.includes(selected.type)) {
        setFile(selected)
        clearErrors()
      } else {
        clearImage()
        setErrors({ message: 'Seleccione un archivo de imagen (png o jpeg)' })
      }
    }
  }

  const clearImage = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const clearFields = () => {
    clearImage()
    setTitle('')
    setDescription('')
    setType('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!file) {
      setErrors({ message: 'Seleccione un archivo de imagen (png o jpeg)' })
      return
    }

    try {
      const data = {
        title,
        description,
        type,
        file
      }

      await createArtwork({ data, token })
      clearFields()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !file || !title || !description || !type || isSubmitting

  return (
    <div className='upload-image'>
      {errors && <Errors errors={errors} />}

      <form className='upload-image-form' onSubmit={handleSubmit}>
        <input
          id='title'
          type='text'
          placeholder='Título'
          value={title}
          onChange={handleChange}
        />
        <input
          id='description'
          type='text'
          placeholder='Descripción'
          value={description}
          onChange={handleChange}
        />
        <select id='type' value={type} onChange={handleChange}>
          <option value=''>Seleccione un tipo</option>
          <option value='painting'>Pintura</option>
          <option value='photography'>Fotografía</option>
        </select>
        <input
          id='file'
          type='file'
          ref={inputRef}
          onChange={handleChange}
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Subiendo...' : 'Subir obra'}
        </button>
      </form>

      <div className='output'>
        {file && (
          <>
            <div>
              <img src={URL.createObjectURL(file)} alt='uploaded' width='250px' />
            </div>
            <button onClick={clearImage}>Quitar archivo</button>
          </>
        )}
      </div>
    </div>
  )
}
