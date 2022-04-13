import { useAuthContext } from '../context/AuthContext'
import { LOADING_STATE } from '../utils/constants'

import styles from './LoginForm.module.css'

const LoginForm = ({ guestType }) => {
  const { loadingState, login } = useAuthContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(e.target[0].value, guestType)
  }

  return (
    <div className={styles.loginScreen}>
      <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.loginLabel}>
          <h3>Hi {guestType},</h3>
          <h1>Please log in:</h1>
        </div>
        <input type="password" placeholder="password" />
        {/* <button>Submit</button> */}
      </form>
      {loadingState.includes(LOADING_STATE.ERROR) && (
        <p>Error attempting to log in, please try again.</p>
      )}
    </div>
  )
}

export default LoginForm
