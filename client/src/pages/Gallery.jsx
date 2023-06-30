import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material'

import useErrors from '#Hooks/useErrors.js'

import { getArtworksByAuthor, getArtworksByType } from '#Services/artwork.js'

import Errors from '#Components/Errors.jsx'
import Artwork from '#Components/Artwork.jsx'

import './Gallery.scss'
import { getUserById } from '#Services/user.js'

export default function Gallery () {
  const { type, authorId } = useParams()
  const { errors, setErrors, clearErrors } = useErrors()

  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [sort, setSort] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 6

  const typeRef = useRef(type)

  const getArtworks = async (page = currentPage) => {
    setLoading(true)
    clearErrors()

    try {
      if (authorId) {
        const { artworks: newArtworks, totalArtworks } = await getArtworksByAuthor({ authorId, page, pageSize, sort })

        setArtworks(newArtworks)
        setTotalPages(Math.ceil(totalArtworks / pageSize))
        return
      }

      const { artworks: newArtworks, totalArtworks } = await getArtworksByType({ type, page, pageSize, sort })

      setArtworks(newArtworks)
      setTotalPages(Math.ceil(totalArtworks / pageSize))
    } catch (error) {
      setErrors(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const setTitleFromTypeOrAuthorId = async () => {
    if (authorId) {
      const { name } = await getUserById({ userId: authorId })
      setTitle(name)
    } else {
      setTitle(type === 'painting' ? 'Pintura' : type === 'photography' ? 'Fotografía' : 'Tipo no reconocido')
    }
  }

  useEffect(() => {
    if (typeRef.current !== type) { // Si el tipo cambia, reseteamos la página a 1
      setCurrentPage(1)
      typeRef.current = type
      getArtworks(1)
    } else { // Si el tipo no cambia, hacemos la petición con la página actual
      getArtworks()
    }
    setTitleFromTypeOrAuthorId()
  }, [currentPage, type, authorId, sort])

  return (
    <>
      <h1>{title}</h1>
      <div className='Sort'>
        <FormLabel id='sort-label' style={{ marginRight: '1rem', color: 'white' }}>Ordernar por:</FormLabel>
        <RadioGroup
          row
          aria-label='sort-label'
        >
          <FormControlLabel
            value='date'
            control={<Radio checked={!sort} onChange={() => setSort(false)} />}
            label='Fecha'
          />
          <FormControlLabel
            value='rating'
            control={<Radio checked={sort} onChange={() => setSort(true)} />}
            label='Valoración'
          />
        </RadioGroup>
      </div>
      {loading && <p className='loading'>Cargando...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && !artworks.length && <p>No se han encontrado obras de arte</p>}
      {!loading && !errors && !!artworks.length && (
        <div>
          <ul className='Gallery'>
            {artworks.map(artwork => (
              <Artwork key={artwork.id} artwork={artwork} getArtworks={getArtworks} />
            ))}
          </ul>
          <div className='Pagination'>
            <Pagination
              color='primary'
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  )
}
