import axiosClient from '#Config/axios.js'

export const getAllArtworks = async ({ page, pageSize, sort }) => {
  const response = await axiosClient.get('/artwork/find-all?page=' + page + '&pageSize=' + pageSize + '&sort=' + sort)

  const { artworks, totalArtworks } = response.data
  return {
    artworks,
    totalArtworks
  }
}

export const getArtworksByType = async ({ type, page, pageSize, sort }) => {
  const response = await axiosClient.get('/artwork/find-by-type/' + type + '?page=' + page + '&pageSize=' + pageSize + '&sort=' + sort)

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

export const getArtworkById = async ({ artworkId }) => {
  const response = await axiosClient.get('/artwork/find-one/' + artworkId)

  return response.data.artwork
}

export const rateArtwork = async ({ data, token }) => {
  const { artworkId, score, comment } = data

  const body = {
    artworkId,
    score
  }

  if (comment) {
    body.comment = comment
  }

  const response = await axiosClient.post('/artwork/rate', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.rating
}

export const getUserRating = async ({ artworkId, token }) => {
  const response = await axiosClient.get('/artwork/user-rating/' + artworkId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.rating
}

export const deleteRating = async ({ artworkId, token }) => {
  const response = await axiosClient.delete('/artwork/rating/' + artworkId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.rating
}

export const getArtworksByAuthor = async ({ authorId, page, pageSize, sort }) => {
  const response = await axiosClient.get('/artwork/find-by-author/' + authorId + '?page=' + page + '&pageSize=' + pageSize + '&sort=' + sort)

  const { artworks, totalArtworks } = response.data
  return {
    artworks,
    totalArtworks
  }
}

export const deleteArtworkAsAuthor = async ({ artworkId, token }) => {
  const response = await axiosClient.delete('/artwork/delete/' + artworkId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.artwork
}

export const getRatingsFromArtwork = async ({ artworkId }) => {
  const response = await axiosClient.get('/artwork/ratings/' + artworkId)

  return response.data.ratings
}
