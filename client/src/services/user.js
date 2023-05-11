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
