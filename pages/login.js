import useUser from '../hooks/useUser'
import fetchJson from '../utils/fetchJson'
import { FetchError } from '../utils/fetchJson'
import loginStyles from '../components/LoginForm.module.css'
import { useState } from 'react'
import Loading from '../components/Loading'
import { LOADING_STATE } from '../utils/constants'
const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: '/heythere',
    redirectIfFound: true,
  })

  const [loginError, setError] = useState(false)
  const [loadingState, setLoading] = useState(LOADING_STATE.DEFAULT)
  const handleSubmit = async (e) => {
    e.preventDefault()
    loadingState !== LOADING_STATE.LOADING
      ? setLoading(LOADING_STATE.LOADING)
      : null
    loginError ? setError(false) : null
    const postString = Buffer.from(e.target[0].value).toString('base64')
    try {
      await mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + postString,
          },
        }),
      )
    } catch (error) {
      console.error('Error mutating user in LoginForm:', error)
      if (error instanceof FetchError) {
        setError(true)
        setLoading(LOADING_STATE.DEFAULT)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  if (loadingState === LOADING_STATE.LOADING) {
    return (
      <div className={loginStyles.loginScreen}>
        <Loading />
      </div>
    )
  }
  return (
    <div className={loginStyles.loginScreen}>
      <form className={loginStyles.loginForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={loginStyles.loginLabel}>
          <h3>Hi you,</h3>
          <h1>Please log in:</h1>
        </div>
        <input type="password" placeholder="password" />
        {/* <button>Submit</button> */}
      </form>
      {loginError && <p>Error attempting to log in, please try again.</p>}
    </div>
  )
}

export default Login
