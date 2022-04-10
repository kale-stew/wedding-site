import { ENDPOINTS } from '../../utils/constants'
import { updateSiteVisitCount, fetchAllGuests } from '../../utils/notion'
const { FAMILY, FRIENDS, UPDATE_COUNT, GUEST_LIST } = ENDPOINTS
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
    case GUEST_LIST:
      const guestList = await fetchAllGuests()
      return res.send(guestList)
    case UPDATE_COUNT:
      if (req.method === 'POST' && JSON.parse(req.body)?.notionId) {
        updateSiteVisitCount(JSON.parse(req.body)?.notionId)
        return res.json({ message: 'ok' })
      }
      return res.json({ message: 'updatecount only allows POST' })
    default:
      return res.status(404).json({ error: `/${slug} not found` })
  }
}
