import React from 'react'
import { Pressable } from 'react-native'
import { View, Text } from 'dripsy'

type PrimaryButtonProps = {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  width?: number | string
}

const PrimaryButton = ({
  title,
  onPress,
  variant = 'primary',
  width,
}: PrimaryButtonProps) => {
  const isPrimary = variant === 'primary'
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='button'
    >
      <View
        sx={{
          p: 12,
          width: width || 140,
          backgroundColor: isPrimary ? '#007AFF' : '#fff',
          borderRadius: 16,
          alignItems: 'center',
          mb: 8,
          borderWidth: isPrimary ? 0 : 2,
          borderColor: isPrimary ? 'transparent' : '#D0EBFF',
        }}
      >
        <Text
          sx={{ color: isPrimary ? '#fff' : '#007AFF', fontWeight: 'bold' }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  )
}

export default PrimaryButton
