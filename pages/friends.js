import Loading from '../components/Loading'
import {
  LOADING_STATE,
  LOCAL_STORAGE_KEYS,
  GUEST_TYPES,
} from '../utils/constants'
import { getLocalStorage } from '../utils/localStorage'
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ProfileComponent from '../components/ProfileComponent'
import LogInForm from '../components/LogInForm'

const Friends = () => {
  const { DEFAULT, ERROR, LOADING, LOCK, SUCCESS } = LOADING_STATE
  const router = useRouter()
  const {
    loadingState,
    loginWithId,
    shouldRedirect,
    setShouldRedirectState,
    user,
  } = useAuthContext()

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

    // We found an item in local storage with our key and it's not undefined/null
    if (localStorageToken) {
      // Attempt to log in with the JWT
      loginWithId(localStorageToken, GUEST_TYPES.FRIENDS)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', beforeunload)
      }
      router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [])

  // useEffect to check if we need to redirect the user based on their guest type
  useEffect(() => {
    if (shouldRedirect) {
      setShouldRedirectState(false)
      router.push(`/${GUEST_TYPES.FAMILY.toLowerCase()}`)
    }
  }, [shouldRedirect])

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
    return <ProfileComponent user={user} guestType={GUEST_TYPES.FRIENDS} />
  }
}

export default Friends
