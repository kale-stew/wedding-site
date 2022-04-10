const saltRounds = 10
const bcrypt = require('bcryptjs')

/**
 * Hashes a string using bcryptjs
 * @param {string} pass
 * @returns
 */
export const hashPassword = (pass) => {
  const hash = bcrypt.hashSync(pass, saltRounds)
  return hash
}
