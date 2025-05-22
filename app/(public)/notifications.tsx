import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import NotificationsItem from "@/components/screens/notifications/NotificationsItem";
import React from "react";
import { FlatList, View } from "react-native";

const notifications = [
  {
    id: "6",
    image: "https://example.com/notification_icon.png", // Generic notification icon
    type: "General Announcement",
    time: "10min",
    description: "Remember to bring all supplies for Chemistry class tomorrow.",
    read: false,
    code: "Math 101",
  },
  {
    id: "3",
    image: "https://example.com/teacher_profile.jpg", // Teacher's profile image
    type: "New Assignment",
    time: "4h",
    description:
      "History 301 - Essay on the French Revolution assigned by Professor Davis.",
    read: false,
    code: "His 301",
  },
  {
    id: "7",
    image: "https://example.com/profile_pic_1.jpg", // URL to user's profile image or relevant icon
    type: "New Assignment",
    time: "5h", // Or '3 days ago'
    description: "Coding 101 - Assignment Set 3 due next week.",
    read: false, // Indicates if the notification has been read
    code: "Cod 101",
  },
  {
    id: "9",
    image: "https://example.com/teacher_profile.jpg", // Teacher's profile image
    type: "New Assignment",
    time: "6h",
    description:
      "Algebra 301 - Worksheet on Trigonometry assigned by Professor Lewis.",
    read: false,
    code: "Alg 101",
  },

  {
    id: "4",
    image: "https://example.com/profile_pic_2.jpg",
    type: "New Assignment",
    time: "1d",
    description: "Science 201 - Lab Report #2 is due on Friday.",
    read: true, // Example of a read notification,
    code: "Sci 101",
  },
  {
    id: "1", // Unique identifier
    image: "https://example.com/profile_pic_1.jpg", // URL to user's profile image or relevant icon
    type: "New Assignment",
    time: "3d", // Or '3 days ago'
    description: "Math 101 - Problem Set 3 due next week.",
    read: false, // Indicates if the notification has been read
    code: "Math 101",
  },
  {
    id: "5",
    image: "https://example.com/notification_icon.png", // Generic notification icon
    type: "General Announcement",
    time: "1w",
    description: "School closed on Monday for holiday",
    read: true,
    code: "Math 101",
  },
];

const Notifications = () => {
  return (
    <PageContainers>
      <BackHeader title="Notifications" />
      <View>
        <FlatList
          data={notifications}
          renderItem={(item) => (
            <NotificationsItem notification={item.item} index={item.index} />
          )}
        />
      </View>
    </PageContainers>
  );
};

export default Notifications;
