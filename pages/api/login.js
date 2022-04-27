import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../utils/session'
import * as bcrypt from 'bcryptjs'
import { fetchAllGuests, updateSiteVisitCount, getAllBlockData } from '../../utils/notion'
export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {
  try {
    var auth = await new Buffer.from(
      req.headers?.authorization.split(' ')[1],
      'base64',
    ).toString('ascii')

    let authType = req.headers?.authorization.split(' ')[0]

    if (authType !== 'Basic') {
      return res
        .status(401)
        .json({ error: 'Unauthorized, incorrect authorization type.' })
    }
    const guestList = await fetchAllGuests()
    const eventData = await getAllBlockData()

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
        
        const eventDataForGuest = eventData.filter((eventDataItem) => guestType?.map((type) => type?.name).includes(eventDataItem.Type))
        const guest = {
          email,
          firstName,
          id,
          lastName,
          partnerFirstName,
          partnerLastName,
          streetAddress,
          websiteVisits: websiteVisits + 1,
          guestType,
          eventDataForGuest
        }
        updateSiteVisitCount(id)
        auth = undefined
        req.session.user = guest
        await req.session.save()

        return res.json({ user: guest })
      }
    }
    return res
      .status(401)
      .json({ message: 'Unauthorized, incorrect password.' })
  } catch (error) {
    console.error(`Error on /login: ${error}`)
    res.status(500).json({ error: `Error on /login: ${error}` })
  }
}
