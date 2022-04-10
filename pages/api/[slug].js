import { fetchAllGuests, updateSiteVisitCount } from '../../utils/notion'
import { ENDPOINTS, HTTP_METHODS, SPLIT } from '../../utils/constants'
const { POST } = HTTP_METHODS
const { FAMILY, FRIENDS, GUEST_LIST, LOGIN, LOGIN_WITH_ID, UPDATE_COUNT } =
  ENDPOINTS
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
/**
 * Fetch calls on the front end to '/api/[slug]' will hit these routes
 */
export default async (req, res) => {
  const { slug } = req.query
  switch (slug) {
    case FRIENDS:
      return res.json({ message: 'friends' })
    case FAMILY:
      return res.json({ message: 'family' })
    case LOGIN:
      if (req.method === POST && req.headers?.authorization) {
        try {
          const auth = new Buffer.from(
            req.headers?.authorization.split(' ')[1],
            'base64',
          ).toString('ascii')
          // var is nice here because we need it to bleed into the if statement, but we should also reassign the variable
          var [hashedPass, hashedToken] = auth.split(SPLIT)

          const tokenMatch = bcrypt.compareSync(
            process.env.TOKEN_SECRET,
            hashedToken,
          )
          if (tokenMatch) {
            const guestList = await fetchAllGuests()
            for (let i = 0; i < guestList.length; i++) {
              const isMatch = bcrypt.compareSync(hashedPass, guestList[i].hash)
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
                }
                hashedPass = undefined
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
          } else {
            return res
              .status(401)
              .json({ error: 'Unauthorized, incorrect token.' })
          }
        } catch (error) {
          console.error('Error Logging in:', error)
          return res
            .status(500)
            .send({ error: 'Server Error when logging in.' })
        }
      }
      return res.status(400).json({ message: 'login only allows POST' })
    case LOGIN_WITH_ID:
      try {
        const isTokenValid = verifyToken(JSON.parse(req.body)?.token)
        if (isTokenValid) {
          return logInWithId(isTokenValid, res)
        } else {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' })
        }
      } catch (error) {
        console.error('Error logging in with id:', error)
        res.status(500).json({ error: 'Server error logging in with id' })
      }

    case GUEST_LIST:
      return res.send({ list: [] })
    case UPDATE_COUNT:
      try {
        if (req.method === POST) {
          updateSiteVisitCount(JSON.parse(req.body)?.id)
          return res.json({ message: 'ok' })
        }
        return res.status(400).json({ message: 'updatecount only allows POST' })
      } catch (error) {
        console.error('Error updating count:', error)
        res.status(500).json({ error: 'Error updating count' })
      }
    default:
      return res.status(404).json({ error: `/${slug} not found` })
  }
}

/**
 * This will use our verified JWT to find a guest in our list. If if finds a guest coorisponding to
 * the JWT it will sign a new JWT to send along with the guest (with sensitive info taken out like notionId) from the guest list
 * @param {string} token
 * @param {object} res response
 * @returns
 */
async function logInWithId(token, res) {
  const guestList = await fetchAllGuests()
  const foundGuest = guestList.find((guest) => guest.id === token.id)
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
  }
  const accessToken = signJwt(guest)
  return res.json({ guest, accessToken })
}

/**
 *
 * @param {string} token JWT sent to us from the request that we need to verify
 * @returns {false | object} false or the decoded JWT
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.error(`Error verifying with jwt. ${err}`)
      if (err?.name === 'TokenExpiredError') {
        console.error('Error token expired')
        return false
      }
      return false
    }
    console.log('Decoded:', decoded)
    if (decoded?.firstName && decoded.firstName !== '') {
      return decoded
    }
    return false
  })
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
    { data, exp: Math.floor(Date.now() / 1000) + 600 * 60 },
    process.env.TOKEN_SECRET,
  )
