import { useAuthContext } from '../context/AuthContext'
import { hashPassword } from '../utils/auth'

const ProfileComponent = ({ user, guestType }) => {
  const { logout } = useAuthContext()
  return (
    <div className="full-screen">
      <h1 className="profile-greeting">
        Hi {`${(user?.firstName, user?.lastName)}`}!
      </h1>
      <ul>
        <li>Guest: {`${user?.partnerFirstName} ${user?.partnerLastName}`}</li>
        <li>Email: {user?.email}</li>
        <li>Address: {user?.streetAddress}</li>
        <li>Times Visited: {user?.websiteVisits}</li>
      </ul>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            hashPassword(e.target[0].value)
          }}
        >
          String to hash:
          <input type="text" placeholder="pass to hash" />
        </form>
      </div>
      <div>
        <button onClick={() => logout()}>Log Out</button>
      </div>
    </div>
  )
}

export default ProfileComponent
