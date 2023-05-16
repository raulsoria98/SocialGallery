import axiosClient from '#Config/axios.js'

export const getAllArtworks = async () => {
  const response = await axiosClient.get('/artwork/find-all')

  return response.data.artworks
}

export const createArtwork = async ({ data, token }) => {
  const { title, description, type, file } = data

  const response = await axiosClient.post('/artwork/create', {
    title,
    description,
    type,
    file
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data.artwork
}
