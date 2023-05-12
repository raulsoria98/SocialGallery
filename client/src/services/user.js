import axiosClient from '#Config/axios.js'

export const getProfile = async ({ token }) => {
  const response = await axiosClient.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = response.data.user

  return {
    name: user.name,
    email: user.email,
    role: user.role
  }
}

export const changeUserName = async ({ token, name }) => {
  const response = await axiosClient.put('/user/update-name', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = response.data.user

  return {
    name: user.name,
    email: user.email,
    role: user.role
  }
}

export const changeUserEmail = async ({ token, email }) => {
  const response = await axiosClient.put('/user/update-email', {
    email
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = response.data.user

  return {
    name: user.name,
    email: user.email,
    role: user.role
  }
}

export const changeUserPassword = async ({ token, password }) => {
  const response = await axiosClient.put('/user/update-password', {
    password
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = response.data.user

  return {
    name: user.name,
    email: user.email,
    role: user.role
  }
}

export const changeUserIsArtist = async ({ token, isArtist }) => {
  const response = await axiosClient.put('/user/update-is-artist', {
    isArtist
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = response.data.user

  return {
    name: user.name,
    email: user.email,
    role: user.role
  }
}
