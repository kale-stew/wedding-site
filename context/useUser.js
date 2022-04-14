import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const router = useRouter()
  const response = useSWR('/api/user')
  const { data: user, mutate: mutateUser } = response
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.user)
    ) {
      let userType = user?.user?.guestType?.map((type) =>
        type?.name?.toLowerCase(),
      )
      if (userType !== undefined) {
        router.push(userType[0])
      } else if (userType === undefined && router.asPath !== '/login') {
        router.push('/login')
      }
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
