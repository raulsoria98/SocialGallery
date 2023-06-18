import { useState } from 'react'

export default function useErrors () {
  const [errors, setErrors] = useState(null)

  const saveErrors = error => {
    if (error.response) {
      setErrors(error.response.data.errors)
    } else {
      setErrors([error.message])
    }
  }

  const clearErrors = () => {
    setErrors(null)
  }

  return {
    setErrors: saveErrors,
    clearErrors,
    errors
  }
}
