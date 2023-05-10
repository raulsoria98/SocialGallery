import axiosClient from '#Config/axios.js'

export const loginUser = async ({ email, password }) => {
  const response = await axiosClient.post('/auth/login', {
    email,
    password
  })

  return response.data
}

export const signUpUser = async ({ name, email, password, isArtist }) => {
  const response = await axiosClient.post('/auth/sign-up', {
    name,
    email,
    password,
    isArtist
  })

  return response.data
}
