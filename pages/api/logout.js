import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../utils/session'
export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req, res) {
  req.session.destroy()
  return res.json({ user: null, isLoggedIn: false })
}
