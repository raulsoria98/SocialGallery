import axiosClient from '#Config/axios.js'

export const getAllArtworks = async () => {
  const response = await axiosClient.get('/artwork/find-all')

  return response.data.artworks
}
