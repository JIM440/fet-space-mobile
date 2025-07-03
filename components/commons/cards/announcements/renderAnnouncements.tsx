import { Announcement } from "@/types";
import React from "react";
import PollAnnouncement from "./PollAnnouncement";
import RegularAnnouncement from "./RegularAnnouncement";

interface RenderProps {
  userId: number;
  pollResponses: { [key: number]: any[] }; // Adjust type based on PollResponse
}

const renderAnnouncements = (item: Announcement, index: number, props: RenderProps) => {
  const { userId, pollResponses } = props;
  const announcementType = item?.course_id ? "course" : "general";
  if (!item) return null;

  const author = {
    name: item?.admin?.user.name || item?.teacher?.user.name || "Unknown",
    image: item?.admin?.user.image || item?.teacher?.user.image || "",
  };

  if (item.is_poll && item.poll?.poll_id && Array.isArray(item.poll.options) && item.poll.options.length > 0) {
    console.log("Rendering poll for announcement:", item.announcement_id, item.poll); // Debug log
    const pollResponsesForPoll = pollResponses[item.poll.poll_id] || [];
    const voteCounts = item.poll.options.reduce((acc, option) => {
      acc[option.option_id] = pollResponsesForPoll.filter((r) => r.poll_option_id === option.option_id).length || 0;
      return acc;
    }, {} as { [key: number]: number });
    const totalVotes = item.poll.options.reduce((sum, option) => sum + (voteCounts[option.option_id] || 0), 0);
    const hasVoted = pollResponsesForPoll.some((r) => r.user_id === userId);

    return (
      <PollAnnouncement
        key={index}
        id={item.announcement_id.toString()}
        title={item.title}
        content={item.content}
        date={item.created_at}
        comments={item._count?.comments || 0}
        author={author}
        options={item.poll.options.map((opt) => ({
          text: opt.content || "No option text",
          votes: voteCounts[opt.option_id] || 0,
          optionId: opt.option_id,
        }))}
        totalVotes={totalVotes}
        allowMultipleAnswers={item.poll.allow_multiple_answers || false}
        index={index}
        announcementType={announcementType}
        pollId={item.poll.poll_id}
        announcementId={item.announcement_id}
        userId={userId}
        hasVoted={hasVoted}
      />
    );
  }

  return (
    <RegularAnnouncement
      key={index}
      id={item.announcement_id.toString()}
      title={item.title}
      content={item.content}
      date={item.created_at}
      comments={item._count?.comments || 0}
      author={author}
      announcementType={announcementType}
      attachments={item.attachments || []}
    />
  );
};

export default renderAnnouncements;