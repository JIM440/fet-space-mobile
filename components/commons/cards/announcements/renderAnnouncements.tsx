import { Announcement } from '@/utils/api/announcements';
import React from 'react';
import PollAnnouncement from './PollAnnouncement';
import RegularAnnouncement from './RegularAnnouncement';

const renderAnnouncements = (item: Announcement, index: number) => {
  const announcementType = item?.course_id ? 'course' : 'general';
  if (!item){
    return null
  }
  
  const author = {
    name: item?.admin?.user.name || item?.teacher?.user.name || 'Unknown',
    image: '',
  };

  if(item.isPoll){
  if (item.Polls.length > 0) {
    const poll = item.Polls[0];
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    return (
      <PollAnnouncement
        key={index}
        id={item.announcement_id.toString()}
        title={item.title}
        content={item.content}
        date={item.created_at}
        comments={item._count.comments}
        author={author}
        options={poll.options.map((opt) => ({
          text: opt.text,
          votes: opt.votes,
          optionId: opt.option_id,
        }))}
        totalVotes={totalVotes}
        allowMultipleAnswers={poll.allow_multiple_answers}
        index={index}
        announcementType={announcementType}
        pollId={poll.poll_id}
        announcementId={item.announcement_id}
      />
    );
  }}

  return (
    <RegularAnnouncement
      key={index}
      id={item.announcement_id.toString()}
      title={item.title}
      content={item.content}
      date={item.created_at}
      comments={item._count.comments}
      author={author}
      announcementType={announcementType}
    />
  );
};

export default renderAnnouncements;