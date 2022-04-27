import { useRouter } from 'next/router'
import fetchJson from '../utils/fetchJson'
import useUser from '../hooks/useUser'
import { hashPassword } from '../utils/auth'

import styles from './ProfileComponent.module.css'

const ProfileComponent = ({ user, guestType }) => {
  const { mutateUser } = useUser()
  const buildUserEventData = () => {
    const userEventData = user.eventDataForGuest.find(
      event_ => event_.Type === guestType,
    )
    console.log('-->', userEventData)
    return (
      <div>
        <h2>Event Info:</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log('-->', e.target.favoriteOnly.value)
          }}
        >
          <label for="guestPlusOnes">Select your plus one(s):</label>
          <select name="guestPlusOnes" id="guestPlusOnes" multiple>
            <option>grumpy@woodworkers.com</option>
            <option>happy@woodworkers.com</option>
            <option>sleepy@woodworkers.com</option>
            <option>bashful@woodworkers.com</option>
            <option>sneezy@woodworkers.com</option>
            <option>dopey@woodworkers.com</option>
            <option>doc@woodworkers.com</option>
          </select>
          <button type="submit">submit</button>
        </form>
        <ul>
          <li>Who: {userEventData.Who}</li>
          <li>What: {userEventData.What}</li>
          <li>When: {userEventData.When}</li>
          <li>Where: {userEventData.Where}</li>
          <li>Why: {userEventData.Why}</li>
          {userEventData.FAQ.map((item, i) => {
            return (
              <li key={`question${i}`}>
                <p>Question: {item.question}</p>
                <p>Answer: {item.answer}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  const router = useRouter()
  console.log('User', user, guestType)
  // useEffect(() => {})
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
          onSubmit={e => {
            e.preventDefault()
            hashPassword(e.target[0].value)
          }}
        >
          String to hash:
          <input type="text" placeholder="pass to hash" />
        </form>
      </div>
      {buildUserEventData()}
      <button
        onClick={async e => {
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
