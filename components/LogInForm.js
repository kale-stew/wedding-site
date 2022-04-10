import { useAuth } from '../hooks/useAuth'
import { LOADING_STATE } from '../utils/constants'
const LogInForm = ({ guestType }) => {
  const { loadingState, login } = useAuth()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login(e.target[0].value, guestType)
        }}
      >
        {guestType} Log in:
        <input type="password" placeholder="password" />
      </form>
      {loadingState.includes(LOADING_STATE.ERROR) && (
        <p>Error attempting to log in, please try again.</p>
      )}
    </div>
  )
}

export default LogInForm
