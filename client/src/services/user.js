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
