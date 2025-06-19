import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddCommentInput from '../inputs/AddCommentInput';

interface CommentInputProps {
  type_id: string;
  type: 'courseAnnouncement' | 'generalAnnouncement';
  onSubmit: (content: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ type_id, type, onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      <AddCommentInput
        value={commentText}
        onChangeText={setCommentText}
        onSubmit={handleSubmit}
        type_id={type_id}
        type={type}
        placeholder="Add comment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});

export default CommentInput;