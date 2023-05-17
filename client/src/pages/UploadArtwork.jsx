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
        setErrors({ message: 'Please select an image file (png or jpeg)' })
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
      setErrors({ message: 'Please select an image file (png or jpeg)' })
      return
    }

    try {
      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        type: e.target.type.value,
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
          placeholder='Title'
          value={title}
          onChange={handleChange}
        />
        <input
          id='description'
          type='text'
          placeholder='Description'
          value={description}
          onChange={handleChange}
        />
        <select id='type' value={type} onChange={handleChange}>
          <option value=''>Select a type</option>
          <option value='painting'>Painting</option>
          <option value='photography'>Photography</option>
        </select>
        <input
          id='file'
          type='file'
          ref={inputRef}
          onChange={handleChange}
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className='output'>
        {file && (
          <>
            <div>
              <img src={URL.createObjectURL(file)} alt='uploaded' width='250px' />
            </div>
            <button onClick={clearImage}>Clear</button>
          </>
        )}
      </div>
    </div>
  )
}
