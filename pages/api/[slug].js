import { ENDPOINTS, HTTP_METHODS } from '../../utils/constants'
import { updateSiteVisitCount, fetchAllGuests } from '../../utils/notion'
const { POST } = HTTP_METHODS
const { FAMILY, FRIENDS, UPDATE_COUNT, GUEST_LIST, LOGIN_WITH_ID } = ENDPOINTS
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
    case LOGIN_WITH_ID:
      if (req.method === POST && JSON.parse(req.body)?.id) {
        const guestList = await fetchAllGuests()
        const foundGuest = guestList.find(
          (guest) => guest.id === JSON.parse(req.body)?.id,
        )
        return res.json({ guest: foundGuest })
      }
      return res.json({ message: 'idlogin only allows POST' })
    case GUEST_LIST:
      const guestList = await fetchAllGuests()
      return res.send(guestList)
    case UPDATE_COUNT:
      if (req.method === POST && JSON.parse(req.body)?.notionId) {
        updateSiteVisitCount(JSON.parse(req.body)?.notionId)
        return res.json({ message: 'ok' })
      }
      return res.json({ message: 'updatecount only allows POST' })
    default:
      return res.status(404).json({ error: `/${slug} not found` })
  }
}
