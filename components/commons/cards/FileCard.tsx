import React from 'react'
import { Image, View } from 'react-native'
import ThemedText from '../typography/ThemedText'

const FileCard = () => {
  return (
    <View>
      <Image source={require('@/assets/icons/pdf.svg')} />
      <View>
        <ThemedText>name</ThemedText>
        <View>
            <ThemedText>46 pages</ThemedText>
            <ThemedText>5.1 mb</ThemedText>
            <ThemedText>6 May</ThemedText>
        </View>
      </View>
    </View>
  )
}

export default FileCard