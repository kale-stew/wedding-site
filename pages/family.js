import { GUEST_TYPES } from '../utils/constants'
import ProfileComponent from '../components/ProfileComponent'
import useUser from '../context/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import fetchJson from '../utils/fetchJson'
import { FetchError } from '../utils/fetchJson'
import loginStyles from '../components/LoginForm.module.css'
import Loading from '../components/Loading'

const Family = () => {
  const router = useRouter()
  const { user, mutateUser } = useUser({
    redirectTo: '/login',
  })

  useEffect(async () => {
    if (!user || !user.user) {
      try {
        await mutateUser(
          await fetchJson('/api/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: GUEST_TYPES.FAMILY }),
          }),
        )
      } catch (error) {
        console.error('Error mutating user in Family:', error)
        if (error instanceof FetchError) {
          let message = error?.toString()?.split(' ')[1]
          if (message === 'Unauthorized') {
            router.replace('/login')
          }
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
  }, [user])

  return user && user?.user ? (
    <ProfileComponent user={user?.user} guestType={GUEST_TYPES.FAMILY} />
  ) : (
    <div className={loginStyles.loginScreen}>
      <Loading />
    </div>
  )
}
export default Family
