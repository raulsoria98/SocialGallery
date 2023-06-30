import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Errors from '#Components/Errors.jsx'

import { createArtwork } from '#Services/artwork.js'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'
import WhiteTextField from '#Components/WhiteTextField.jsx'
import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material'

import './UploadArtwork.scss'

const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    color: 'white'
  },
  '& .MuiSelect-icon': {
    color: 'white'
  },
  '& .MuiInputBase-root': {
    color: 'white'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white'
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white'
  }
})

export default function UploadArtwork () {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRef = useRef(null)

  const { errors, setErrors, clearErrors } = useErrors()
  const { token } = useAuth()

  const navigate = useNavigate()

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else if (e.target.name === 'description') {
      setDescription(e.target.value)
    } else if (e.target.name === 'type') {
      setType(e.target.value)
    } else if (e.target.name === 'file') {
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
      navigate('/my-artworks')
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !file || !title || !description || !type || isSubmitting

  return (
    <div className='upload-image'>
      <h1>Subir obra</h1>
      {errors && <Errors errors={errors} />}

      <form className='upload-image-form' onSubmit={handleSubmit}>
        <WhiteTextField
          id='title'
          name='title'
          label='Título'
          variant='outlined'
          value={title}
          onChange={handleChange}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
          size='small'
        />
        <WhiteTextField
          id='description'
          name='description'
          label='Descripción'
          variant='outlined'
          value={description}
          onChange={handleChange}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
          size='small'
          multiline
        />
        <FormControl size='small'>
          <InputLabel id='type-label' style={{ color: 'white' }}>Tipo de obra</InputLabel>
          <StyledSelect
            labelId='type-label'
            id='type'
            name='type'
            value={type}
            onChange={handleChange}
            label='Tipo de obra'
          >
            <MenuItem value='painting'>Pintura</MenuItem>
            <MenuItem value='photography'>Fotografía</MenuItem>
          </StyledSelect>
        </FormControl>
        <input
          className='file-input'
          id='file'
          name='file'
          type='file'
          ref={inputRef}
          onChange={handleChange}
        />
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
        <button type='submit' disabled={isDisabled} style={{ marginTop: '1rem' }}>
          {isSubmitting ? 'Subiendo...' : 'Subir obra'}
        </button>
      </form>

    </div>
  )
}
