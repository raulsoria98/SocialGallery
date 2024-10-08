import Artwork from '#Components/Artwork.jsx'
import Errors from '#Components/Errors.jsx'
import useAuth from '#Hooks/useAuth.js'
import useErrors from '#Hooks/useErrors.js'
import { getArtworksByAuthor } from '#Services/artwork.js'
import { FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'

export default function MyArtworks () {
  const { user } = useAuth()
  const { errors, setErrors, clearErrors } = useErrors()

  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const [sort, setSort] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 6

  const getArtworks = async (page = currentPage) => {
    setLoading(true)
    clearErrors()

    try {
      const { artworks: newArtworks, totalArtworks } = await getArtworksByAuthor({ authorId: user.id, page, pageSize, sort })

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
    getArtworks()
  }, [currentPage, sort])

  return (
    <>
      <h1>Mis obras</h1>
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
