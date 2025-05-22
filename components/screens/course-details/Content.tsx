import FileCard from '@/components/commons/cards/FileCard'
import React from 'react'
import { Text, View } from 'react-native'

const Content = () => {
  return (
    <View style={{flex: 1, gap: 16}}>
      <Text>Content</Text>
      <FileCard />
    </View>
  )
}

export default Content