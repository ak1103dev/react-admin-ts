import React, {
  useEffect,
  useReducer,
  useMemo,
  useContext,
  createContext,
} from 'react'
import PropTypes from 'prop-types'
import request, { TOKEN_KEY } from '../utils/request'

interface ProviderInterface {
  children: JSX.Element
}

interface CredentialInterface {
  email: string
  password: string
}

interface StateInterface {
  isLoading: boolean
  isSignout: boolean
  userToken: string | null
  user: unknown
}
interface ContextInterface {
  authContext: {
    getMe: () => Promise<void>
    login: (credentials: CredentialInterface) => Promise<void>
    changePassword: (credential: { [key: string]: string }) => Promise<void>
    logout: () => Promise<void>
  }
  state: StateInterface
}

type ActionInterface =
  | {
      type: 'RESTORE_TOKEN' | 'SIGN_IN'
      token: string | null
    }
  | {
      type: 'USER'
      user: unknown
    }
  | {
      type: 'SIGN_OUT'
    }

const AuthContext = createContext<ContextInterface | null>(null)

const initialState: StateInterface = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: {},
}

const reducer = (prevState: StateInterface, action: ActionInterface) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        user: {},
      }
    case 'USER':
      return {
        ...prevState,
        user: action.user,
      }
    default:
      throw new Error()
  }
}

export const AuthProvider = ({ children }: ProviderInterface): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await localStorage.getItem(TOKEN_KEY)
        dispatch({ type: 'RESTORE_TOKEN', token: userToken })
      } catch (e) {
        // Restoring token failed
      }
    }

    bootstrapAsync()

    return () => {
      console.log('leave auth')
    }
  }, [])

  useEffect(() => {
    if (state.userToken) authContext.getMe()
  }, [state.userToken])

  const authContext = useMemo(
    () => ({
      getMe: async () => {
        try {
          const result = await request.get('/admin/me')
          dispatch({ type: 'USER', user: result })
        } catch (e) {
          console.log(JSON.stringify(e.response, null, 2))
          throw e
        }
      },
      login: async (credentials: CredentialInterface) => {
        try {
          await localStorage.removeItem(TOKEN_KEY)
          const res: { token: string } = await request.post(
            '/admin/login',
            credentials
          )
          await localStorage.setItem(TOKEN_KEY, res.token)
          dispatch({ type: 'SIGN_IN', token: res.token })
        } catch (e) {
          console.log('qwe', e)
          throw e
        }
      },
      changePassword: async ({
        email,
        oldPassword,
        newPassword,
      }: {
        [key: string]: string
      }) => {
        try {
          await request.post('/admin/changePassword', {
            email,
            oldPassword,
            newPassword,
          })
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      logout: async () => {
        await localStorage.removeItem(TOKEN_KEY)
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    [state]
  )

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export const useAuth = (): ContextInterface => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth can be use in AuthContext only')
  }
  return context
}
