import React, { useState, createContext, useContext } from 'react'
import { setLocalStorage } from '../utils/localStorage'
import {
  ENDPOINTS,
  HTTP_METHODS,
  LOADING_STATE,
  LOCAL_STORAGE_KEYS,
} from '../utils/constants'
const { DEFAULT, ERROR, LOADING, LOCK, SUCCESS } = LOADING_STATE
const { LOGIN_WITH_ID, UPDATE_COUNT, LOGIN } = ENDPOINTS

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [loadingState, setLoadingState] = useState(DEFAULT)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [user, setUser] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
      guestType,
    }
   */
  const setLoggedIn = (guest, token) => {
    // We have a valid user! Set the state and token
    setLoadingState(SUCCESS)
    const {
      email,
      firstName,
      id,
      lastName,
      partnerFirstName,
      partnerLastName,
      streetAddress,
      websiteVisits,
      guestType,
    } = guest
    setLoginAttempts(0)
    setUser({
      email,
      firstName,
      id,
      lastName,
      partnerFirstName,
      partnerLastName,
      streetAddress,
      websiteVisits: websiteVisits + 1,
      guestType,
    })

    // As of now Apr 10th 2022 the token is set to expire in 10 hours
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, token)
  }

  /**
   * Uses the user's database property 'id' to make a request to our api to update the number of times that user has visited our site.
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
   * which should show the locked view (handled in the page).
   * Otherwise we will base 64 encode: the password.
   * This string will then be sent as the Authorization header looking like 'Basic BASE64ENCODEDPASS'
   * If the response has user.accessToken that means the login attempt was successful!
   * @param {string} pass the password from the user
   * @returns
   */
  const login = async (pass, component) => {
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
      const postString = Buffer.from(pass).toString('base64')
      const loginResponse = await fetch(`/api/${LOGIN}`, {
        method: HTTP_METHODS.POST,
        headers: { Authorization: 'Basic ' + postString },
        body: JSON.stringify({ component }),
      })
      const user = await loginResponse.json()
      if (user?.accessToken) {
        // We have a valid user! Set the state and token
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
   * this user, if we implement an invalidation service on the back end.
   */
  const logout = async () => {
    setUser(false)
    setLoadingState(DEFAULT)
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, undefined)
  }

  /**
   * With this we can try to log the use in with their local storage JWT. We will make a POST request
   * to our api with their JWT. The API will then try and find that user in our guest list.
   * If it does find it and they are on the right, then it will log the user in, and get a new JWT.
   * @param {string} id
   * @returns
   */
  const loginWithId = async (token, component) => {
    loadingState !== LOADING ? setLoadingState(LOADING) : null
    if (token === 'undefined' || token === 'null' || !token) {
      setUser(false)
      setLoadingState(DEFAULT)
      return
    }
    try {
      const idRequest = await fetch(`/api/${LOGIN_WITH_ID}`, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ token, component }),
      })
      const response = await idRequest.json()
      if (
        response.error &&
        response.error?.includes(
          'Unauthorized, logging in as wrong guest type.',
        )
      ) {
        setShouldRedirect(true)
      }

      if (
        response.error &&
        response.error?.includes('Unauthorized: Invalid token')
      ) {
        setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, undefined)
        setUser(false)
        setLoadingState(DEFAULT)
        return
      }

      if (!response || !response?.guest || !response?.accessToken) {
        setUser(false)
        setLoadingState(DEFAULT)
        return
      }
      // We have a valid user! Set the state and token
      // Update user's website visit count
      updateVisitCount(response.guest.id)
      setLoggedIn(response.guest, response.accessToken)
      return
    } catch (error) {
      console.error('Error logging in with id:', error)
      setLoadingState(`${ERROR} logging in with id`)
    }
  }

  const setShouldRedirectState = (value = false) => {
    setShouldRedirect(value)
  }

  const value = {
    loadingState,
    login,
    loginWithId,
    logout,
    shouldRedirect,
    setShouldRedirectState,
    user,
  }
  return <AuthContext.Provider value={value} {...props} />
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an auth provider')
  }
  const {
    loadingState,
    login,
    loginWithId,
    logout,
    shouldRedirect,
    setShouldRedirectState,
    user,
  } = context
  return {
    loadingState,
    login,
    loginWithId,
    logout,
    shouldRedirect,
    setShouldRedirectState,
    user,
  }
}

export { AuthProvider, useAuthContext }
