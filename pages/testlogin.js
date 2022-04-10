import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkLocalStorage } from '../utils/auth'
import useAuth from '../hooks/useAuth'
import { LOADING_STATE } from '../utils/constants'

const TestLogin = () => {
  const { DEFAULT, LOADING, ERROR, SUCCESS, LOCK } = LOADING_STATE
  const router = useRouter()
  const { login, logout, user, loadingState, hashPass, loginWithId } = useAuth()

  // Log user out if they leave the page ?
  useEffect(() => {
    const localStorageItem = checkLocalStorage()
    console.log('checkLocalStorage', localStorageItem)

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

    if (localStorageItem) {
      loginWithId(localStorageItem)
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
    return <div>Loading...</div>
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
              hashPass(e.target[0].value)
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
