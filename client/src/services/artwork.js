import axiosClient from '#Config/axios.js'

export const getAllArtworks = async ({ page, pageSize }) => {
  const response = await axiosClient.get('/artwork/find-all?page=' + page + '&pageSize=' + pageSize)

  const { artworks, totalArtworks } = response.data
  return {
    artworks,
    totalArtworks
  }
}

export const getArtworksByType = async ({ type, page, pageSize }) => {
  const response = await axiosClient.get('/artwork/find-by-type/' + type + '?page=' + page + '&pageSize=' + pageSize)

  const { artworks, totalArtworks } = response.data
  return {
    artworks,
    totalArtworks
  }
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
