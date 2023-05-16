import { useState, useEffect } from 'react'
import useErrors from '#Hooks/useErrors.js'
import Errors from '#Components/Errors.jsx'
import { getAllArtworks } from '#Services/artwork.js'
import Artwork from '#Components/Artwork.jsx'

import './Gallery.scss'

export default function Gallery () {
  const { errors, setErrors } = useErrors()

  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const getArtworks = async () => {
    try {
      const artworks = await getAllArtworks()

      setArtworks(artworks)
    } catch (error) {
      setErrors(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArtworks()
  }, [])

  return (
    <>
      <h1>Artworks</h1>
      {loading && <p className='loading'>Loading...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && (
        <ul className='Gallery'>
          {artworks.map(artwork => (
            <Artwork key={artwork.id} artwork={artwork} />
          ))}
        </ul>
      )}
    </>
  )
}
