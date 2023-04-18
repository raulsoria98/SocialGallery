import USER_ROLES from '#Enums/USER_ROLES.js'

export const email = {
  type: 'string',
  format: 'email',
  errorMessage: {
    type: 'El email debe ser un string',
    format: 'El email debe tener un formato válido'
  }
}

export const id = {
  type: 'number',
  errorMessage: {
    type: 'El id debe ser un número'
  }
}

export const name = {
  type: 'string',
  minLength: 2,
  maxLength: 50,
  pattern: '^[a-zA-ZÀ-ÿ\\s]+$',
  errorMessage: {
    type: 'El nombre debe ser un string',
    minLength: 'El nombre debe tener al menos 2 caracteres',
    maxLength: 'El nombre debe tener como máximo 50 caracteres',
    pattern: 'El nombre debe tener solo letras y espacios'
  }
}

export const password = {
  type: 'string',
  minLength: 6,
  maxLength: 50,
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])',
  errorMessage: {
    type: 'La contraseña debe ser un string',
    minLength: 'La contraseña debe tener al menos 6 caracteres',
    maxLength: 'La contraseña debe tener como máximo 50 caracteres',
    pattern: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número'
  }
}

export const role = {
  type: 'string',
  enum: [
    USER_ROLES.USER,
    USER_ROLES.ADMIN,
    USER_ROLES.ARTIST
  ],
  errorMessage: {
    type: 'El rol debe ser un string',
    enum: 'El rol debe ser admin, user o artist'
  }
}
