const bcrypt = require('bcryptjs')
const saltRounds = 10
import { LOCAL_STORAGE_KEYS } from './constants'
export const hashPassword = (pass) => {
  const hash = bcrypt.hashSync(pass, saltRounds)
  return hash
}

/**
 * With this, we can check a password from a user against a hash that we grab from our notion DB.
 * If the password matches any of the hashes, we will return the user data and remove the hash.
 * @param {string} pass
 * @param {Array} hashList list of guests with their hashed passwords
 * @returns
 */
export const checkPassword = async (pass, hashList = []) => {
  if (hashList?.length !== 0) {
    for (let i = 0; i < hashList.length; i++) {
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
      } = hashList[i]
      // Check the password, false if not matching
      const isGuest = bcrypt.compareSync(pass, hashList[i]?.hash)
      if (!isGuest) {
        continue
      } else {
        setLocalStorage(id)
        // Matching password hash! Let's only return the user info
        return {
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
      }
    }
    // We haven't gotten a correct password match
    return false
  }
  // No hash list, something went wrong. Let's log it and return false
  console.error("Error, hash list is empty. Can't check passwords")
  return false
}

export const checkLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const isGuest = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_GUEST)
    if (!isGuest) {
      return false
    } else {
      return isGuest
    }
  }
}

export const setLocalStorage = (id) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_GUEST, id)
  }
}
