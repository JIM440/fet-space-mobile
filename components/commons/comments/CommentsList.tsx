import { Comment } from "@/types";
import React from "react";
import { ScrollView } from "react-native";
import CommentCard from "../cards/CommentCard";
import ThemedText from "../typography/ThemedText";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <ScrollView style={{ marginBottom: 16,     paddingHorizontal: 20
 }}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <ThemedText>No comments yet</ThemedText>
      )}
    </ScrollView>
  );
};

export default CommentList;