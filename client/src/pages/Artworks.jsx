import { useState, useEffect } from 'react'
import useErrors from '#Hooks/useErrors.js'
import Errors from '#Components/Errors.jsx'
import { getAllArtworks } from '#Services/artwork.js'
import Artwork from '#Components/Artwork.jsx'

export default function Artworks () {
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
    <div className='Artworks'>
      <h1>Artworks</h1>
      {loading && <p>Loading...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && (
        <>
          {artworks.map(artwork => (
            <Artwork key={artwork.id} artwork={artwork} />
          ))}
        </>
      )}
    </div>
  )
}
