import { useState } from 'react'
import { hashPassword } from '../utils/auth'
import { setLocalStorage } from '../utils/localStorage'
import {
  ENDPOINTS,
  HTTP_METHODS,
  LOADING_STATE,
  LOCAL_STORAGE_KEYS,
  SPLIT,
} from '../utils/constants'
const { DEFAULT, ERROR, LOADING, LOCK, SUCCESS } = LOADING_STATE
const { LOGIN_WITH_ID, UPDATE_COUNT, LOGIN } = ENDPOINTS

/**
 * Our custom auth hook that will give loadingState, the user object, and three functions:
 * login, logout, and loginWithId
 * @returns React Hook with the options: {
    loadingState,
    login,
    loginWithId,
    logout,
    user,
  }
 */
export const useAuth = () => {
  const [loadingState, setLoadingState] = useState(DEFAULT)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [user, setUser] = useState(false)

  /**
   * Takes the guest object formatted from the notion guest list and sets that user as logged in.
   * Also will set the loading state to SUCCESS.
   * @param {Object} guest in the shape of {
      email,
      firstName,
      id,
      lastName,
      partnerFirstName,
      partnerLastName,
      streetAddress,
      websiteVisits,
    }
   */
  const setLoggedIn = (guest, token) => {
    const {
      email,
      firstName,
      id,
      lastName,
      partnerFirstName,
      partnerLastName,
      streetAddress,
      websiteVisits,
    } = guest
    setLoginAttempts(0)
    setLoadingState(SUCCESS)
    setUser({
      email,
      firstName,
      id,
      lastName,
      partnerFirstName,
      partnerLastName,
      streetAddress,
      websiteVisits: websiteVisits + 1,
    })
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, token)
  }

  /**
   * Uses the user's notion id to make a request to our api to update the number of times that user has visited our site.
   * @param {string} id
   */
  const updateVisitCount = (id) => {
    fetch(`/api/${UPDATE_COUNT}`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
  }

  /**
   * Gets the password from the user, sets the loading state to LOADING.
   * Then logs a log in attempt, if that count is 10 or more we set loading state to LOCK
   * which should show the locked view (handled in the component).
   * Otherwise we will base 64 encode: the password plus a string to split on plus the hashed process.env.TOKEN_SECRET.
   * This string will then be sent as the Authorization header looking like 'Basic AUTH_STRING' (AUTH_STRING is this 👆)
   * If the response has user.accessToken that means the login attempt was successful!
   * @param {string} pass the password from the user
   * @returns
   */
  const login = async (pass) => {
    setLoadingState(LOADING)
    // If we want to lock someone out after too many attempts?
    // They could just refresh the page, so we'll have to hoist state, or use local storage or something like that
    const count = loginAttempts + 1
    setLoginAttempts(count)
    if (count >= 10) {
      setLoadingState(LOCK)
      return
    }
    try {
      const postString = new Buffer.from(
        pass + SPLIT + hashPassword(process.env.TOKEN_SECRET),
      ).toString('base64')
      const loginResponse = await fetch(`/api/${LOGIN}`, {
        method: HTTP_METHODS.POST,
        headers: { Authorization: 'Basic ' + postString },
      })
      const user = await loginResponse.json()
      if (user?.accessToken) {
        // We have a valid user! Set the state, should we set a local storage item?
        setLoggedIn(user.guest, user.accessToken)
        // Update user's website visit count
        updateVisitCount(user.id)
        return
      }
      setUser(false)
      setLoadingState(`${ERROR} wrong password`)
      return
    } catch (error) {
      console.error('Error logging in:', error)
      setLoadingState(`${ERROR} logging in`)
    }
  }

  /**
   * For now all we are doing is removing the token from local storage, and resetting state.
   * We could eventually send a request to the API to invalidate the token that was associated with
   * this user.
   */
  const logout = () => {
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, undefined)
    setUser(false)
    setLoadingState(DEFAULT)
  }

  /**
   * With this we can try to log the use in with their local storage JWT. We will make a POST request
   * to our api with their JWT. The API will then try and find that user in our guest list.
   * If it does find it, then it will log the user in, and get a new JWT.
   * @param {string} id
   * @returns
   */
  const loginWithId = async (token) => {
    loadingState !== LOADING ? setLoadingState(LOADING) : null
    try {
      const idRequest = await fetch(`/api/${LOGIN_WITH_ID}`, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ token }),
      })
      const response = await idRequest.json()
      if (!response || !response?.guest || !response?.accessToken) {
        setUser(false)
        setLoadingState(DEFAULT)
        return
      }

      setLoggedIn(response.guest, response.accessToken)
      updateVisitCount(response.guest.id)
      return
    } catch (error) {
      console.error('Error logging in with id:', error)
      setLoadingState(`${ERROR} logging in with id`)
    }
  }

  return {
    loadingState,
    login,
    loginWithId,
    logout,
    user,
  }
}
