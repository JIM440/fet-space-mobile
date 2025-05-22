import { announcementsData } from "@/constants/static-data/announcements";
import PollAnnouncement from "./PollAnouncement";
import RegularAnnouncement from "./RegularAnnouncement";

  const renderAnnouncements = (item: (typeof announcementsData)[0], index: number) => {
    if (item.type === "poll") {
      return (
        <PollAnnouncement
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
        />
      );
    }
    return (
      <RegularAnnouncement
        key={index}
        title={item.title}
        content={item.content}
        date={item.date}
        comments={item.comments}
        author={item.author}
      />
    );
  };

  export default renderAnnouncements