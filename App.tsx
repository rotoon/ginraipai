import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DripsyProvider, Text } from 'dripsy'
import { View, ActivityIndicator } from 'react-native'
import OnboardingScreen from './screens/OnboardingScreen'
import DashboardScreen from './screens/DashboardScreen'
import CameraScreen from './screens/CameraScreen'
import PrimaryButton from './components/PrimaryButton'
import { UserProvider, useUser } from './contexts/UserContext'

const Stack = createNativeStackNavigator()

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F8FAFC',
    }}
  >
    <Text
      sx={{
        fontFamily: 'System',
        color: '#22223B',
        fontSize: 28,
        fontWeight: 'bold',
        mb: 2,
      }}
    >
      GinRaiPai Home
    </Text>
    <PrimaryButton
      title='Go to Onboarding'
      onPress={() => navigation.navigate('Onboarding')}
    />
    <PrimaryButton
      title='Go to Dashboard'
      onPress={() => navigation.navigate('Dashboard')}
    />
    <PrimaryButton
      title='Go to Camera'
      onPress={() => navigation.navigate('Camera')}
    />
  </View>
)

const theme = {
  colors: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#A5D8FF',
    secondary: '#FFD6E0',
    button: '#7FC8A9',
    text: '#22223B',
    error: '#FF6B6B',
    border: '#E0E0E0',
    inputFocus: '#A5D8FF',
  },
  text: {
    heading: {
      fontFamily: 'System',
      color: '#22223B',
      fontSize: 28,
      fontWeight: 'bold',
    },
    body: { fontFamily: 'System', color: '#22223B', fontSize: 16 },
  },
  radii: [0, 4, 8, 16, 32],
  shadows: {
    card: {
      shadowColor: '#A5D8FF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    button: {
      shadowColor: '#7FC8A9',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
    },
  },
}

const RootNavigator = () => {
  const { user, loading } = useUser()
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F8FAFC',
        }}
      >
        <ActivityIndicator
          size='large'
          color={theme.colors.primary}
        />
      </View>
    )
  }
  return (
    <Stack.Navigator
      initialRouteName={user ? 'Dashboard' : 'Onboarding'}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
      />
      <Stack.Screen
        name='Onboarding'
        component={OnboardingScreen}
      />
      <Stack.Screen
        name='Dashboard'
        component={DashboardScreen}
      />
      <Stack.Screen
        name='Camera'
        component={CameraScreen}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <UserProvider>
      <DripsyProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </DripsyProvider>
    </UserProvider>
  )
}
