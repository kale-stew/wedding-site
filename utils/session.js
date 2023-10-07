import { LOCAL_STORAGE_KEYS } from './constants'

export const sessionOptions = {
  cookieName: LOCAL_STORAGE_KEYS.TOKEN,
  password: process.env.TOKEN_SECRET,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
