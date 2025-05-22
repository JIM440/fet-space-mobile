import ThemedText from '@/components/commons/typography/ThemedText'
import { COLORS } from '@/constants/colors'
import { useTheme } from '@/hooks/useThemeColor'
import React from 'react'
import { View } from 'react-native'

const ItemLabelAndValue = ({label, value}: {label: string, value: string}) => {
  const {resolvedTheme} = useTheme()
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark
    return (
    <View style={{flex: 1}}>
      <ThemedText variant='caption' style={{color: colors.neutralTextTertiary}}>{label}</ThemedText>
      <ThemedText style={{color: colors.neutralTextPrimary}}>{value}</ThemedText>
    </View>
  )
}

export default ItemLabelAndValue