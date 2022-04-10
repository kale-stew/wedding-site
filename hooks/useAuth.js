import { useState } from 'react'
import { checkPassword, hashPassword, setLocalStorage } from '../utils/auth'
import { LOADING_STATE, ENDPOINTS } from '../utils/constants'
const { DEFAULT, LOADING, ERROR, SUCCESS, LOCK } = LOADING_STATE
const { UPDATE_COUNT, GUEST_LIST, LOGIN_WITH_ID } = ENDPOINTS
const useAuth = () => {
  const [user, setUser] = useState(false)
  const [loadingState, setLoadingState] = useState(LOADING)
  const [loginAttempts, setLoginAttempts] = useState(0)

  /**
   * Takes the guest object formatted from the notion guest list and sets that user as logged in.
   * Also will set the loading state to SUCCESS.
   * @param {Object} guest in the shape of {
      firstName,
      lastName,
      partnerFirstName,
      partnerLastName,
      email,
      streetAddress,
      websiteVisits,
      id,
      notionId,
    }
   */
  const setLoggedIn = (guest) => {
    const {
      firstName,
      lastName,
      partnerFirstName,
      partnerLastName,
      email,
      streetAddress,
      websiteVisits,
      id,
      notionId,
    } = guest
    setLoginAttempts(0)
    setLoadingState(SUCCESS)
    setUser({
      firstName,
      lastName,
      partnerFirstName,
      partnerLastName,
      email,
      streetAddress,
      websiteVisits: websiteVisits + 1,
      id,
      notionId,
    })
  }

  /**
   * Uses the user's notion id to make a request to our api to update the number of times that user has visited our site.
   * @param {string} notionId
   */
  const updateVisitCount = (notionId) => {
    fetch(`/api/${UPDATE_COUNT}`, {
      method: 'POST',
      body: JSON.stringify({ notionId }),
    })
  }

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
      const guestListResponse = await fetch(`/api/${GUEST_LIST}`)
      const guestList = await guestListResponse.json()
      const isGuest = await checkPassword(pass, guestList)
      if (!isGuest) {
        setUser(false)
        setLoadingState(`${ERROR} wrong password`)
        return
      } else {
        // We have a valid user! Set the state, should we set a local storage item?
        setLoggedIn(isGuest)
        // Update user's website visit count
        updateVisitCount(isGuest.notionId)
        return
      }
    } catch (error) {
      console.error('Error logging in:', error)
      setLoadingState(`${ERROR} logging in`)
    }
  }

  const logout = () => {
    setLocalStorage(false)
    setUser(false)
    setLoadingState(DEFAULT)
  }

  /**
   * With this we can try to log the use in with their local storage. We will make a POST request
   * to our api with their notion id that was gotten from local storage. This will then try and find that
   * notion id in our guest list, if it does find it, then it will log the user in.
   * @param {string} id
   * @returns
   */
  const loginWithId = async (id) => {
    loadingState !== LOADING ? setLoadingState(LOADING) : null
    try {
      const idRequest = await fetch(`/api/${LOGIN_WITH_ID}`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
      const response = await idRequest.json()
      console.log('RESPONSE:', response)
      if (!response || !response?.guest) {
        setUser(false)
        setLoadingState(DEFAULT)
        return
      }

      setLoggedIn(response.guest)
      updateVisitCount(response.guest.notionId)
      return
    } catch (error) {
      console.error('Error logging in with id:', error)
      setLoadingState(`${ERROR} logging in with id`)
    }
  }

  const hashPass = (pass) => {
    const hash = hashPassword(pass)
    console.log('hash', hash)
  }

  return {
    loadingState,
    user,
    login,
    loginWithId,
    logout,
    hashPass,
  }
}

export default useAuth
