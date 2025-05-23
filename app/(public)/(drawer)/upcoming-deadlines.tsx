import PageContainers from '@/components/commons/containers/PageContainer'
import BackHeader from '@/components/commons/navigation/BackHeader'
import ThemedText from '@/components/commons/typography/ThemedText'
import React from 'react'

const UpcomingDeadlines = () => {
  return (
    <PageContainers>
      <BackHeader title='Upcoming Deadlines' />
      <ThemedText>Upcoming Deadlines</ThemedText>
    </PageContainers>
  )
}

export default UpcomingDeadlines