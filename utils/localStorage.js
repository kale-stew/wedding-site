import { LOCAL_STORAGE_KEYS } from './constants'

/**
 * Gets a local storage item based on it's key. The key parameter should always come from the
 * LOCAL_STORAGE_KEYS object, if not, this will return false
 * @param {string} key
 * @returns local storage item, or false
 */
export const getLocalStorage = (key) => {
  if (!Object.values(LOCAL_STORAGE_KEYS).includes(key)) {
    return false
  }
  if (typeof window !== 'undefined') {
    try {
      const itemToGet = window.localStorage.getItem(key)
      if (!itemToGet) {
        return false
      } else {
        return itemToGet
      }
    } catch (error) {
      console.error('Error getting local storage:', error)
      return false
    }
  }
}

/**
 * Sets a value to local storage.
 * @param {string} key local storage key to set value to
 * @param {any} value value to set to local storage
 * @returns {boolean} boolean
 */
export const setLocalStorage = (key, value) => {
  if (!Object.values(LOCAL_STORAGE_KEYS).includes(key)) {
    return false
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error('Error setting local storage item:', error)
      return false
    }
  }
  return false
}
