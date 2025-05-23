import { announcementsData } from "@/constants/static-data/announcements";
import PollAnnouncement from "./PollAnouncement";
import RegularAnnouncement from "./RegularAnnouncement";

const renderAnnouncements = (
  item: (typeof announcementsData)[0] | (typeof announcementsData)[3],
  index: number
) => {
  if (item.type === "poll") {
    return (
      <PollAnnouncement
        id={item.id}
        key={index}
        title={item.title}
        content={item.content}
        date={item.date}
        comments={item.comments}
        author={item.author}
        options={item.options!}
        totalVotes={item.totalVotes!}
        allowMultipleAnswers={item.allowMultipleAnswers!}
        index={index}
        announcementType={item.announcementType}
      />
    );
  }
  return (
    <RegularAnnouncement
      id={item.id}
      key={index}
      title={item.title}
      content={item.content}
      date={item.date}
      comments={item.comments}
      author={item.author}
      announcementType={item.announcementType}
    />
  );
};

export default renderAnnouncements;
