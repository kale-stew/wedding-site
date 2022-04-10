const saltRounds = 10
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { fetchAllGuests } from './notion'
import { HTTP_METHODS, EXPIRE_TIME } from './constants'
const { POST } = HTTP_METHODS
/**
 * Hashes a string using bcryptjs
 * @param {string} pass
 * @returns
 */
export const hashPassword = (pass) => {
  const hash = bcrypt.hashSync(pass, saltRounds)
  console.log('hashed:', hash)
  return hash
}

/**
 * Attempts to log a user in with the password provided.
 * @param {object} req
 * @param {object} res
 * @returns
 */
export const logIn = async (req, res) => {
  if (req.method === POST && req.headers?.authorization) {
    try {
      const componentLoggedIn = JSON.parse(req.body)?.component
      let auth = new Buffer.from(
        req.headers?.authorization.split(' ')[1],
        'base64',
      ).toString('ascii')
      // var is nice here because we need it to bleed into the if statement, but we should also reassign the variable

      const guestList = await fetchAllGuests()
      for (let i = 0; i < guestList.length; i++) {
        const isMatch = bcrypt.compareSync(auth, guestList[i].hash)
        if (isMatch) {
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
          } = guestList[i]
          const guest = {
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
          auth = undefined

          // Check if the guest has logged in from the correct component
          const guestTypes = guestType.map((type) => type.name)
          if (!guestTypes.includes(componentLoggedIn)) {
            return res
              .status(401)
              .json({ error: 'Unauthorized, logging in as wrong guest type.' })
          }
          const accessToken = signJwt(guest)
          return res.json({
            accessToken,
            guest,
          })
        }
      }
      return res
        .status(401)
        .json({ error: 'Unauthorized, incorrect password.' })
    } catch (error) {
      console.error('Error Logging in:', error)
      return res.status(500).send({ error: 'Server Error when logging in.' })
    }
  }
  return res.status(400).json({ message: 'login only allows POST' })
}

/**
 * This will use our verified JWT to find a guest in our list. If if finds a guest corresponding to
 * the JWT it will sign a new JWT to send along with the guest (with sensitive info taken out like notionId) from the guest list
 * @param {object} req
 * @param {object} res response
 * @returns
 */
export const logInWithId = async (req, res) => {
  try {
    const isTokenValid = verifyToken(JSON.parse(req.body)?.token)
    const componentLoggedIn = JSON.parse(req.body)?.component
    if (isTokenValid?.data) {
      const guestList = await fetchAllGuests()
      let wrongGuestType = false
      const foundGuest = guestList.find((guest) => {
        const guestTypes = guest.guestType.map((type) => type.name)
        // Check to see if the guest is on the wrong page
        if (
          guest.id === isTokenValid.data?.id &&
          !guestTypes.includes(componentLoggedIn)
        ) {
          wrongGuestType = true
          return false
        }
        return guest.id === isTokenValid.data?.id
      })
      if (wrongGuestType) {
        return res
          .status(401)
          .json({ error: 'Unauthorized, logging in as wrong guest type.' })
      }
      if (!foundGuest) {
        return res.status(401).json({ error: 'Unauthorized, guest not found' })
      }
      // We need to take out sensitive information first
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
      } = foundGuest

      const guest = {
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
      const accessToken = signJwt(guest)
      return res.json({ guest, accessToken })
    } else {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
  } catch (error) {
    console.error('Error logging in with id:', error)
    return res.status(500).json({ error: 'Server error logging in with id' })
  }
}

/**
 * Returns a signed JWT with a lifetime of 10 hours. Signs with the guest object and our token secret
 * @param {object} data in the form of {
                  email,
                  firstName,
                  id,
                  lastName,
                  partnerFirstName,
                  partnerLastName,
                  streetAddress,
                  websiteVisits
                }. WE SHOULD NEVER INCLUDE THE PASSWORD OR NOTION ID
 * @returns {object} signed JWT
 */
const signJwt = (data) =>
  jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) + EXPIRE_TIME },
    process.env.TOKEN_SECRET,
  )

/**
 *
 * @param {string} token JWT sent to us from the request that we need to verify
 * @returns {false | object} false or the decoded JWT
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.error(`Error verifying with jwt. ${err}`)
      if (err?.name === 'TokenExpiredError') {
        console.error('Error token expired')
        return false
      }
      return false
    }
    if (decoded?.data && decoded.data?.firstName) {
      let now = Math.floor(Date.now() / 1000)
      // Check to see if there's an iat and if it has already passed
      if (!decoded?.iat || decoded?.iat + EXPIRE_TIME < now) {
        return false
      }
      return decoded
    }
    return false
  })
}
