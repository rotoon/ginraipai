import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput } from 'dripsy'
import { Picker } from '@react-native-picker/picker'
import { ScrollView, Image, Animated } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import { useUser } from '../contexts/UserContext'
// import type { NativeStackScreenProps } from '@react-navigation/native-stack'
// import type { RootStackParamList } from '../types/navigation'

const genderOptions = ['Male', 'Female', 'Other']
const goalOptions = [
  { label: 'Lose Weight', value: 'lose' },
  { label: 'Maintain Weight', value: 'maintain' },
  { label: 'Gain Muscle', value: 'gain' },
  { label: 'Custom', value: 'custom' },
]

const steps = ['Welcome', 'Personal Info', 'Body Data', 'Goal', 'Review']

// type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const OnboardingScreen = ({ navigation }: any) => {
  const { setUser } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const animDirectionRef = useRef<'next' | 'back'>('next')
  const cardAnim = useRef(new Animated.Value(0)).current // 0: visible, -1: left, 1: right
  const [form, setForm] = useState({
    name: 'Test User',
    age: '25',
    weight: '70',
    height: '175',
    gender: 'Male',
    goalType: 'maintain',
    targetWeight: '',
    calorieTarget: '2000',
    motivation: 'Testing onboarding flow',
  })
  const [error, setError] = useState('')

  const handleChange = (key: string, value: string) => {
    setError('')
    setForm((f) => ({ ...f, [key]: value }))
  }

  const validateStep = () => {
    if (currentStep === 0 && !form.name.trim()) return 'Please enter your name.'
    if (currentStep === 1) {
      if (
        !form.age ||
        isNaN(Number(form.age)) ||
        Number(form.age) < 10 ||
        Number(form.age) > 120
      )
        return 'Please enter a valid age.'
      if (!form.gender) return 'Please select your gender.'
    }
    if (currentStep === 2) {
      if (
        !form.weight ||
        isNaN(Number(form.weight)) ||
        Number(form.weight) < 20 ||
        Number(form.weight) > 300
      )
        return 'Please enter a valid weight.'
      if (
        !form.height ||
        isNaN(Number(form.height)) ||
        Number(form.height) < 80 ||
        Number(form.height) > 250
      )
        return 'Please enter a valid height.'
    }
    if (currentStep === 3) {
      if (!form.goalType) return 'Please select your goal.'
      if (
        (form.goalType === 'lose' || form.goalType === 'gain') &&
        (!form.targetWeight || isNaN(Number(form.targetWeight)))
      )
        return 'Please enter a valid target weight.'
    }
    return ''
  }

  const animateCard = (
    toValue: number,
    direction: 'next' | 'back',
    cb?: () => void
  ) => {
    Animated.timing(cardAnim, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      if (cb) cb()
    })
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) return setError(err)
    setError('')
    const direction: 'next' = 'next'
    animDirectionRef.current = direction
    animateCard(-1, direction, () => {
      setCurrentStep((s) => s + 1)
      cardAnim.setValue(1)
      animDirectionRef.current = direction
      animateCard(0, direction)
    })
  }

  const handleBack = () => {
    setError('')
    const direction: 'back' = 'back'
    animDirectionRef.current = direction
    animateCard(1, direction, () => {
      setCurrentStep((s) => Math.max(0, s - 1))
      cardAnim.setValue(-1)
      animDirectionRef.current = direction
      animateCard(0, direction)
    })
  }

  const handleFinish = () => {
    setUser(form)
    navigation.replace('Dashboard')
  }

  // Style constants for Nutrio-inspired UI
  const pastelGradient = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: '#A5D8FF',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    opacity: 0.7,
  }
  const cardStyle = {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    shadowColor: '#A5D8FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    marginBottom: 32,
  }
  const inputStyle = {
    minHeight: 60,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#D0EBFF',
    backgroundColor: '#F1FAFF',
    width: '100%',
    marginBottom: 24,
    shadowColor: '#A5D8FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  }
  const headingStyle = {
    fontFamily: 'System',
    color: '#22223B',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  }
  const subheadingStyle = {
    color: '#7FC8A9',
    fontSize: 18,
    marginBottom: 24,
    fontWeight: '600',
  }
  const labelStyle = {
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: '#22223B',
    fontWeight: 'bold',
    fontSize: 16,
  }
  const pickerStyle = {
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#D0EBFF',
    overflow: 'hidden',
    backgroundColor: '#F1FAFF',
  }
  const progressDotStyle = (active: boolean) => ({
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: active ? '#A5D8FF' : '#E0E0E0',
    borderWidth: active ? 2 : 0,
    borderColor: active ? '#339AF0' : 'transparent',
  })

  // Animated Progress indicator
  const progressAnims = useRef(steps.map(() => new Animated.Value(1))).current
  useEffect(() => {
    progressAnims.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: i === currentStep ? 1.3 : 1,
        useNativeDriver: true,
        speed: 16,
        bounciness: 8,
      }).start()
    })
  }, [currentStep])
  const Progress = () => (
    <View
      sx={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}
    >
      {steps.map((_, i) => (
        <Animated.View
          key={i}
          style={{
            transform: [{ scale: progressAnims[i] }],
            width: 16,
            height: 16,
            borderRadius: 8,
            marginHorizontal: 6,
            backgroundColor: i <= currentStep ? '#A5D8FF' : '#E0E0E0',
            borderWidth: i === currentStep ? 2 : 0,
            borderColor: i === currentStep ? '#339AF0' : 'transparent',
          }}
          accessibilityLabel={i === currentStep ? 'Current step' : undefined}
        />
      ))}
    </View>
  )

  // Animated error message
  const errorAnim = useRef(new Animated.Value(0)).current
  const [showError, setShowError] = useState(false)
  useEffect(() => {
    if (error) {
      setShowError(true)
      Animated.timing(errorAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    } else if (showError) {
      Animated.timing(errorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowError(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* Pastel gradient background */}
      <View style={pastelGradient} />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: 20,
          paddingTop: 56,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={true}
      >
        <Progress />
        <View sx={{ width: '100%', maxWidth: 400 }}>
          <AnimatedCard
            cardAnim={cardAnim}
            direction={animDirectionRef.current}
          >
            {showError && (
              <Animated.View
                style={{
                  opacity: errorAnim,
                  marginBottom: 16,
                  maxHeight: 100,
                  transform: [
                    {
                      translateY: errorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 0],
                      }),
                    },
                  ],
                }}
                accessible={!!error}
                accessibilityRole='alert'
                accessibilityLabel={error ? `Error: ${error}` : undefined}
              >
                <View
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFE3E3',
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    marginBottom: 0,
                  }}
                >
                  <Text sx={{ fontSize: 20, marginRight: 8 }}>❗</Text>
                  <Text
                    sx={{ color: '#D7263D', fontSize: 16, fontWeight: '600' }}
                  >
                    {error}
                  </Text>
                </View>
              </Animated.View>
            )}
            {currentStep === 0 && (
              <>
                <Text sx={headingStyle}>Let's get to know you!</Text>
                <Text sx={subheadingStyle}>What should we call you?</Text>
                <TextInput
                  value={form.name}
                  onChangeText={(v) => handleChange('name', v)}
                  placeholder='Your name'
                  sx={inputStyle}
                  accessibilityLabel='Name'
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <Text sx={headingStyle}>Personal Info</Text>
                <Text sx={subheadingStyle}>Tell us a bit about yourself</Text>
                <Text sx={labelStyle}>Age</Text>
                <TextInput
                  value={form.age}
                  onChangeText={(v) => handleChange('age', v)}
                  placeholder='Age'
                  keyboardType='numeric'
                  sx={inputStyle}
                  accessibilityLabel='Age'
                />
                <Text sx={labelStyle}>Gender</Text>
                <View sx={pickerStyle}>
                  <Picker
                    selectedValue={form.gender}
                    onValueChange={(v) => handleChange('gender', v)}
                    accessibilityLabel='Gender'
                  >
                    <Picker.Item
                      label='Select gender...'
                      value=''
                    />
                    {genderOptions.map((g) => (
                      <Picker.Item
                        key={g}
                        label={g}
                        value={g}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            )}
            {currentStep === 2 && (
              <>
                <Text sx={headingStyle}>Body Data</Text>
                <Text sx={subheadingStyle}>Your current stats</Text>
                <Text sx={labelStyle}>Weight (kg)</Text>
                <TextInput
                  value={form.weight}
                  onChangeText={(v) => handleChange('weight', v)}
                  placeholder='Weight'
                  keyboardType='numeric'
                  sx={inputStyle}
                  accessibilityLabel='Weight'
                />
                <Text sx={labelStyle}>Height (cm)</Text>
                <TextInput
                  value={form.height}
                  onChangeText={(v) => handleChange('height', v)}
                  placeholder='Height'
                  keyboardType='numeric'
                  sx={inputStyle}
                  accessibilityLabel='Height'
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <Text sx={headingStyle}>Personal Goal</Text>
                <Text sx={subheadingStyle}>What do you want to achieve?</Text>
                <Text sx={labelStyle}>Goal Type</Text>
                <View sx={pickerStyle}>
                  <Picker
                    selectedValue={form.goalType}
                    onValueChange={(v) => handleChange('goalType', v)}
                    accessibilityLabel='Personal Goal'
                  >
                    <Picker.Item
                      label='Select goal...'
                      value=''
                    />
                    {goalOptions.map((g) => (
                      <Picker.Item
                        key={g.value}
                        label={g.label}
                        value={g.value}
                      />
                    ))}
                  </Picker>
                </View>
                {(form.goalType === 'lose' || form.goalType === 'gain') && (
                  <>
                    <Text sx={labelStyle}>Target Weight (kg)</Text>
                    <TextInput
                      value={form.targetWeight}
                      onChangeText={(v) => handleChange('targetWeight', v)}
                      placeholder='Target weight'
                      keyboardType='numeric'
                      sx={inputStyle}
                      accessibilityLabel='Target Weight'
                    />
                  </>
                )}
                <Text sx={labelStyle}>Daily Calorie Target (optional)</Text>
                <TextInput
                  value={form.calorieTarget}
                  onChangeText={(v) => handleChange('calorieTarget', v)}
                  placeholder='e.g. 1800'
                  keyboardType='numeric'
                  sx={inputStyle}
                  accessibilityLabel='Daily Calorie Target'
                />
                <Text sx={labelStyle}>Motivation (optional)</Text>
                <TextInput
                  value={form.motivation}
                  onChangeText={(v) => handleChange('motivation', v)}
                  placeholder='Why do you want to reach this goal?'
                  sx={inputStyle}
                  accessibilityLabel='Motivation'
                />
              </>
            )}
            {currentStep === 4 && (
              <>
                <Text sx={headingStyle}>Review</Text>
                <Text sx={subheadingStyle}>
                  Check your info before finishing
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Name: <Text sx={{ fontWeight: 'bold' }}>{form.name}</Text>
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Age: <Text sx={{ fontWeight: 'bold' }}>{form.age}</Text>
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Gender: <Text sx={{ fontWeight: 'bold' }}>{form.gender}</Text>
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Weight: <Text sx={{ fontWeight: 'bold' }}>{form.weight}</Text>
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Height: <Text sx={{ fontWeight: 'bold' }}>{form.height}</Text>
                </Text>
                <Text sx={{ marginBottom: 8 }}>
                  Goal:{' '}
                  <Text sx={{ fontWeight: 'bold' }}>
                    {goalOptions.find((g) => g.value === form.goalType)
                      ?.label || ''}
                  </Text>
                </Text>
                {(form.goalType === 'lose' || form.goalType === 'gain') && (
                  <Text sx={{ marginBottom: 8 }}>
                    Target Weight:{' '}
                    <Text sx={{ fontWeight: 'bold' }}>{form.targetWeight}</Text>
                  </Text>
                )}
                {form.calorieTarget ? (
                  <Text sx={{ marginBottom: 8 }}>
                    Calorie Target:{' '}
                    <Text sx={{ fontWeight: 'bold' }}>
                      {form.calorieTarget}
                    </Text>
                  </Text>
                ) : null}
                {form.motivation ? (
                  <Text sx={{ marginBottom: 8 }}>
                    Motivation:{' '}
                    <Text sx={{ fontWeight: 'bold' }}>{form.motivation}</Text>
                  </Text>
                ) : null}
              </>
            )}
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: currentStep === 0 ? 'center' : 'space-between',
                marginTop: 32,
              }}
            >
              {currentStep > 0 && (
                <PrimaryButton
                  title='Back'
                  onPress={handleBack}
                  variant='secondary'
                  width={140}
                />
              )}
              {currentStep < steps.length - 1 && (
                <PrimaryButton
                  title='Next'
                  onPress={handleNext}
                  variant='primary'
                  width={140}
                />
              )}
              {currentStep === steps.length - 1 && (
                <PrimaryButton
                  title='Finish'
                  onPress={handleFinish}
                  variant='primary'
                  width={140}
                />
              )}
            </View>
          </AnimatedCard>
        </View>
      </ScrollView>
    </View>
  )
}

// AnimatedCard component to handle direction logic
import type { Animated as RNAnimated } from 'react-native'
const AnimatedCard = ({
  cardAnim,
  direction,
  children,
}: {
  cardAnim: RNAnimated.Value
  direction: 'next' | 'back'
  children: React.ReactNode
}) => {
  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 32,
          padding: 32,
          shadowColor: '#A5D8FF',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.16,
          shadowRadius: 24,
          marginBottom: 32,
          opacity: cardAnim.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              translateX: cardAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: direction === 'next' ? [-60, 0, 60] : [60, 0, -60],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

export default OnboardingScreen
