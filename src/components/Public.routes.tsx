import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth()

  if (auth.token) {
    return (
      <Navigate
        to="/home"
        state={{ path: window.location.pathname }}
        replace={true}
      />
    )
  }

  return children
}

export default PublicRoute
