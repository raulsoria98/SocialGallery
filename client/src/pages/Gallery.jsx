import { useState, useEffect } from 'react'
import useErrors from '#Hooks/useErrors.js'
import Errors from '#Components/Errors.jsx'
import { getAllArtworks } from '#Services/artwork.js'
import Artwork from '#Components/Artwork.jsx'

import './Gallery.scss'
import { Pagination } from '@mui/material'

export default function Gallery () {
  const { errors, setErrors } = useErrors()

  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 6

  const getArtworks = async ({ page, pageSize }) => {
    console.log('getArtworks', { page, pageSize })
    setLoading(true)

    try {
      const { artworks: responseArtworks, totalArtworks } = await getAllArtworks({ page, pageSize })

      setArtworks(responseArtworks)
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
    getArtworks({ page: currentPage, pageSize })
  }, [currentPage])

  return (
    <>
      <h1>Artworks</h1>
      {loading && <p className='loading'>Loading...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && !artworks.length && <p>No artworks found</p>}
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
