import { useRouter } from 'next/router'
import fetchJson from '../utils/fetchJson'
import useUser from '../hooks/useUser'
import { hashPassword } from '../utils/auth'

import styles from './ProfileComponent.module.css'

const ProfileComponent = ({ user, guestType }) => {
  const { mutateUser } = useUser()
  const router = useRouter()

  return (
    <div className={styles.profileScreen}>
      <h1 className={styles.profileGreeting}>
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

      <button
        onClick={async (e) => {
          e.preventDefault()
          mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
          router.push('/login')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default ProfileComponent
