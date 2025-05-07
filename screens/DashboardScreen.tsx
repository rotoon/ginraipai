import React from 'react'
import { View, Text, ScrollView } from 'dripsy'
import { Pressable } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import { useUser } from '../contexts/UserContext'

const defaultDashboard = {
  streak: 5,
  todayMeals: 3,
  todayCalories: 1450,
  chartData: [400, 600, 450, 1200, 1500, 1300, 1450],
  badges: [
    { icon: '🔥', label: '5-day Streak' },
    { icon: '🏅', label: 'First Week' },
    { icon: '🥗', label: 'Healthy Choice' },
  ],
}

const pastelCard = {
  backgroundColor: '#F1FAFF',
  borderRadius: 24,
  padding: 20,
  marginBottom: 20,
  shadowColor: '#A5D8FF',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
}

const DashboardScreen = ({ navigation }: any) => {
  const { user, setUser } = useUser()
  const handleClearUser = () => {
    setUser(null)
    navigation.replace('Onboarding')
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
      contentContainerStyle={{
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with greeting and streak badge */}
      <View sx={{ width: '100%', maxWidth: 400, marginBottom: 16 }}>
        <Text
          sx={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#22223B',
            marginBottom: 4,
          }}
        >
          Hi, {user?.name || 'User'}!
        </Text>
        <View
          sx={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
        >
          <Text sx={{ fontSize: 20, marginRight: 8 }}>
            {defaultDashboard.badges[0].icon}
          </Text>
          <Text sx={{ color: '#339AF0', fontWeight: '600', fontSize: 16 }}>
            {defaultDashboard.badges[0].label}
          </Text>
        </View>
      </View>

      {/* Daily summary card */}
      <View
        sx={pastelCard}
        accessibilityLabel='Daily summary'
      >
        <Text
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#22223B',
            marginBottom: 4,
          }}
        >
          You had {defaultDashboard.todayMeals} meals today
        </Text>
        <Text sx={{ color: '#7FC8A9', fontSize: 16, marginBottom: 8 }}>
          Total: {defaultDashboard.todayCalories} kcal
        </Text>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => {}}
            accessibilityLabel='Previous day'
            style={{ padding: 8 }}
          >
            <Text sx={{ fontSize: 20, color: '#A5D8FF' }}>{'‹'}</Text>
          </Pressable>
          <Text sx={{ fontSize: 16, color: '#22223B' }}>Today</Text>
          <Pressable
            onPress={() => {}}
            accessibilityLabel='Next day'
            style={{ padding: 8 }}
          >
            <Text sx={{ fontSize: 20, color: '#A5D8FF' }}>{'›'}</Text>
          </Pressable>
        </View>
      </View>

      {/* Calorie chart (simple bar chart) */}
      <View
        sx={{ ...pastelCard, alignItems: 'center' }}
        accessibilityLabel='Weekly calorie chart'
      >
        <Text sx={{ fontWeight: 'bold', color: '#22223B', marginBottom: 8 }}>
          Weekly Calories
        </Text>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: 80,
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          {defaultDashboard.chartData.map((val, i) => (
            <View
              key={i}
              sx={{
                width: 18,
                height: `${val / 20}%`,
                backgroundColor: '#A5D8FF',
                borderRadius: 8,
                marginHorizontal: 2,
                alignSelf: 'flex-end',
              }}
              accessibilityLabel={`Day ${i + 1}: ${val} kcal`}
            />
          ))}
        </View>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <Text
              key={i}
              sx={{
                fontSize: 12,
                color: '#7FC8A9',
                width: 18,
                textAlign: 'center',
              }}
            >
              {d}
            </Text>
          ))}
        </View>
      </View>

      {/* Badges section */}
      <View
        sx={{
          ...pastelCard,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
        accessibilityLabel='Badges'
      >
        {defaultDashboard.badges.map((badge, i) => (
          <View
            key={i}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E3FAFC',
              borderRadius: 16,
              paddingVertical: 6,
              paddingHorizontal: 12,
              marginRight: 10,
              marginBottom: 8,
            }}
          >
            <Text sx={{ fontSize: 18, marginRight: 6 }}>{badge.icon}</Text>
            <Text sx={{ color: '#339AF0', fontWeight: '600', fontSize: 14 }}>
              {badge.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Encouragement message */}
      <View
        sx={{ ...pastelCard, alignItems: 'center', backgroundColor: '#FFF6E3' }}
        accessibilityLabel='Encouragement'
      >
        <Text
          sx={{
            fontSize: 18,
            color: '#FFB703',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          Keep it up! 🌟
        </Text>
        <Text sx={{ color: '#22223B', fontSize: 15 }}>
          You're on a great streak. Every meal counts!
        </Text>
      </View>

      {/* Add Meal button */}
      <PrimaryButton
        title='Add Meal'
        onPress={() => navigation.navigate('Camera')}
        variant='primary'
        width={180}
      />

      {/* Clear User Data button for testing */}
      <View
        style={{
          marginTop: 24,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#FF6B6B',
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
      >
        <PrimaryButton
          title='Clear User Data'
          onPress={handleClearUser}
          variant='secondary'
          width={180}
        />
      </View>
    </ScrollView>
  )
}

export default DashboardScreen
