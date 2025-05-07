import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type UserProfile = {
  name: string
  age: string
  weight: string
  height: string
  gender: string
  goalType: string
  targetWeight?: string
  calorieTarget?: string
  motivation?: string
}

type UserContextType = {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('user')
        if (stored) setUserState(JSON.parse(stored))
      } catch {}
      setLoading(false)
    }
    loadUser()
  }, [])

  const setUser = (user: UserProfile | null) => {
    setUserState(user)
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user))
    } else {
      AsyncStorage.removeItem('user')
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
