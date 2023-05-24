import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from '@mui/material'

import useErrors from '#Hooks/useErrors.js'

import { getArtworksByType } from '#Services/artwork.js'

import Errors from '#Components/Errors.jsx'
import Artwork from '#Components/Artwork.jsx'

import './Gallery.scss'

export default function Gallery () {
  const { type } = useParams()
  const { errors, setErrors, clearErrors } = useErrors()

  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 6

  const typeRef = useRef(type)

  const getArtworks = async ({ page, pageSize }) => {
    setLoading(true)
    clearErrors()

    try {
      const { artworks: newArtworks, totalArtworks } = await getArtworksByType({ type, page, pageSize })

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

  useEffect(() => {
    if (typeRef.current !== type) { // Si el tipo cambia, reseteamos la página a 1
      setCurrentPage(1)
      typeRef.current = type
      getArtworks({ page: 1, pageSize })
    } else { // Si el tipo no cambia, hacemos la petición con la página actual
      getArtworks({ page: currentPage, pageSize })
    }
  }, [currentPage, type])

  return (
    <>
      <h1>{type === 'painting' ? 'Pintura' : type === 'photography' ? 'Fotografía' : 'Tipo no reconocido'}</h1>
      {loading && <p className='loading'>Cargando...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && !artworks.length && <p>No se han encontrado obras de arte</p>}
      {!loading && !errors && !!artworks.length && (
        <div>
          <ul className='Gallery'>
            {artworks.map(artwork => (
              <Artwork key={artwork.id} artwork={artwork} />
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
