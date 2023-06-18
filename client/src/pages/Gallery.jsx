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

  const [sort, setSort] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 6

  const typeRef = useRef(type)

  const getArtworks = async (page = currentPage) => {
    setLoading(true)
    clearErrors()

    try {
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

  useEffect(() => {
    if (typeRef.current !== type) { // Si el tipo cambia, reseteamos la página a 1
      setCurrentPage(1)
      typeRef.current = type
      getArtworks(1)
    } else { // Si el tipo no cambia, hacemos la petición con la página actual
      getArtworks()
    }
  }, [currentPage, type, sort])

  return (
    <>
      <h1>{type === 'painting' ? 'Pintura' : type === 'photography' ? 'Fotografía' : 'Tipo no reconocido'}</h1>
      {/* Checkbox sort by rating */}
      <div className='Sort'>
        <label htmlFor='sort'>Ordenar por valoración</label>
        <input
          type='checkbox'
          id='sort'
          checked={sort}
          onChange={() => setSort(!sort)}
        />
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
