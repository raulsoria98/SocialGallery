import { TextField, styled } from '@mui/material'

const WhiteTextField = styled(TextField)({
  '& label': {
    color: '#fff',
    '&.Mui-focused': {
      color: '#fff'
    }
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff'
    },
    '&:hover fieldset': {
      borderColor: '#fff'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff'
    }
  },
  '& .MuiInputBase-input': {
    color: '#fff'
  }
})

export default WhiteTextField
