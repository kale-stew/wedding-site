import { useAuth } from '../hooks/useAuth'
import { hashPassword } from '../utils/auth'
const ProfileComponent = ({ user, guestType }) => {
  const { logout } = useAuth()
  return (
    <div>
      <h1>Your {guestType} Profile</h1>
      <ul>
        <li>Name: {`${(user?.firstName, user?.lastName)}`}</li>
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
