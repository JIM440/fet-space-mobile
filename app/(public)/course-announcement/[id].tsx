import PageContainers from '@/components/commons/containers/PageContainer'
import BackHeader from '@/components/commons/navigation/BackHeader'
import ThemedText from '@/components/commons/typography/ThemedText'
import React from 'react'

const CourseAnnouncement = () => {
  return (
    <PageContainers>
        <BackHeader title='' />
      <ThemedText>course announcements</ThemedText>
    </PageContainers>
  )
}

export default CourseAnnouncement