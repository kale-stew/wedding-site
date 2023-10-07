import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../utils/session'
import { updateSiteVisitCount } from '../../utils/notion'
export default withIronSessionApiRoute(verifyRoute, sessionOptions)

async function verifyRoute(req, res) {
  try {
    const page = req?.body?.page
    if (req?.session?.user && page) {
      let guestTypes = req.session.user.guestType.map((type) => type.name)
      if (guestTypes.includes(page)) {
        updateSiteVisitCount(req.session.user.id)
        const updatedUser = {
          ...req.session.user,
          websiteVisits: req.session.user.websiteVisits + 1,
        }
        return res.json({ user: updatedUser })
      } else {
        req.session.destroy()
        return res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    console.error(`Error on /verify: ${error}`)
    res.status(500).json({ error: `Error on /login: ${error}` })
  }
}
