import { useState } from 'react'
import { checkPassword, hashPassword } from '../utils/auth'
import { LOADING_STATE, ENDPOINTS } from '../utils/constants'
const { DEFAULT, LOADING, ERROR, SUCCESS, LOCK } = LOADING_STATE
const { UPDATE_COUNT, GUEST_LIST } = ENDPOINTS
const useAuth = () => {
  const [user, setUser] = useState(false)
  const [loadingState, setLoadingState] = useState(DEFAULT)
  const [loginAttempts, setLoginAttempts] = useState(0)

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
        // Don't want to keep the hash in state
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
        } = isGuest

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
        // Update user's website visit count
        fetch(`/api/${UPDATE_COUNT}`, {
          method: 'POST',
          body: JSON.stringify({ notionId }),
        })

        return
      }
    } catch (error) {
      console.error('Error logging in:', error)
      setLoadingState(`${ERROR} logging in`)
    }
  }

  const logout = () => {
    setUser(false)
    setLoadingState(DEFAULT)
  }

  const hashPass = (pass) => {
    const hash = hashPassword(pass)
    console.log('hash', hash)
  }

  return {
    loadingState,
    user,
    login,
    logout,
    hashPass,
  }
}

export default useAuth
