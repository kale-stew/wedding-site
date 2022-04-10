import { updateSiteVisitCount } from '../../utils/notion'
import { ENDPOINTS, HTTP_METHODS } from '../../utils/constants'
import { logIn, logInWithJWT } from '../../utils/auth'
const { POST } = HTTP_METHODS
const {
  FAMILY,
  FRIENDS,
  GUEST_LIST,
  LOGIN,
  LOGOUT,
  LOGIN_WITH_ID,
  UPDATE_COUNT,
} = ENDPOINTS

/**
 * Fetch calls on the front end to '/api/[slug]' will hit these routes
 */
export default async (req, res) => {
  const { slug } = req.query
  console.log('SLUG:', slug)
  switch (slug) {
    case FRIENDS:
      return res.json({ message: 'friends' })
    case FAMILY:
      return res.json({ message: 'family' })
    case LOGIN:
      return logIn(req, res)
    case LOGIN_WITH_ID:
      return logInWithJWT(req, res)
    case LOGOUT:
    // revoke token? Right now they are set to 10 hours so maybe we don't need to worry.
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
