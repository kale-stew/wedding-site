import Loading from '../components/Loading'
import {
  LOADING_STATE,
  LOCAL_STORAGE_KEYS,
  GUEST_TYPES,
} from '../utils/constants'
import { getLocalStorage } from '../utils/localStorage'
import { hashPassword } from '../utils/auth'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FriendComponent from '../components/FriendComponent'
import LogInForm from '../components/LogInForm'

const Friends = () => {
  const { DEFAULT, ERROR, LOADING, LOCK, SUCCESS } = LOADING_STATE
  const router = useRouter()
  const { loadingState, loginWithId, logout, user } = useAuth()

  // Log user out if they leave the page ?
  useEffect(() => {
    const localStorageToken = getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN)

    const routeChangeStart = (url) => {
      console.log('Starting route change..', url)
    }

    const beforeunload = () => {
      // logout()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', beforeunload)
    }
    router.events.on('routeChangeStart', routeChangeStart)

    if (localStorageToken) {
      loginWithId(localStorageToken, GUEST_TYPES.FRIENDS)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', beforeunload)
      }
      router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [])

  if (loadingState === DEFAULT || loadingState.includes(ERROR)) {
    return <LogInForm guestType={GUEST_TYPES.FRIENDS} />
  }

  if (loadingState === LOADING) {
    return <Loading />
  }

  if (loadingState === LOCK) {
    return (
      <div>
        We're sorry you've tried logging in too many times, Please try again
        soon
      </div>
    )
  }

  if (loadingState === SUCCESS) {
    return (
      <div>
        <h1>Your Friend Profile</h1>
        <FriendComponent />
        <ul>
          <li>Name: {`${(user?.firstName, user?.lastName)}`}</li>
          <li>Guest: {`${user?.partnerFirstName} ${user?.partnerLastName}`}</li>
          <li>Email: {user?.email}</li>
          <li>Address: {user?.streetAddress}</li>
          <li>Times Visited: {user?.websiteVisits}</li>
        </ul>
        {/* form to hash a string if we want */}
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
}

export default Friends
