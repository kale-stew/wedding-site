import Loading from '../components/Loading'
import { LOADING_STATE, LOCAL_STORAGE_KEYS } from '../utils/constants'
import { getLocalStorage, hashPassword } from '../utils/localStorage'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const TestLogin = () => {
  const { DEFAULT, ERROR, LOADING, LOCK, SUCCESS } = LOADING_STATE
  const router = useRouter()
  const { loadingState, login, loginWithId, logout, user } = useAuth()

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
      loginWithId(localStorageToken)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', beforeunload)
      }
      router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [])

  if (loadingState === DEFAULT || loadingState.includes(ERROR)) {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            login(e.target[0].value)
          }}
        >
          Log in:
          <input type="password" placeholder="password" />
        </form>
        {loadingState.includes(ERROR) && (
          <p>Error attempting to log in, please try again.</p>
        )}
      </div>
    )
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
        <h1>Your Profile</h1>
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
}

export default TestLogin
