import ThemedText from "@/components/commons/typography/ThemedText";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface PollOptionProps {
  option: { text: string; votes: number };
  totalVotes: number;
  isSelected: boolean;
  allowMultipleAnswers: boolean;
  onSelect: () => void;
  colors: any;
}

const PollOption: React.FC<PollOptionProps> = ({
  option,
  totalVotes,
  isSelected,
  allowMultipleAnswers,
  onSelect,
  colors,
}) => {
  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

  return (
    <TouchableOpacity style={styles.pollOption} onPress={onSelect}>
      <View style={styles.selectionContainer}>
        {allowMultipleAnswers ? (
          <View
            style={[
              styles.checkbox,
              { borderColor: colors.neutralBorder },
              isSelected && {
                backgroundColor: colors.primaryBase,
                borderColor: colors.primaryBase,
              },
            ]}
          >
            {isSelected && <Entypo name="check" size={16} color={colors.white} />}
          </View>
        ) : (
          <View
            style={[
              styles.radio,
              { borderColor: colors.neutralBorder },
              isSelected && { borderColor: colors.primaryBase },
            ]}
          >
            {isSelected && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: colors.primaryBase },
                ]}
              />
            )}
          </View>
        )}
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <ThemedText variant="body" style={{ flex: 1 }}>
            {option.text}
          </ThemedText>
          <ThemedText variant="body">{option.votes} votes</ThemedText>
        </View>
        <View style={styles.voteContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.backgroundNeutral },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${percentage}%`, backgroundColor: colors.primaryBase },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pollOption: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-start",
    gap: 8,
  },
  selectionContainer: {
    paddingTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  progressBar: {
    flex: 1,
    height: 8,
    width: "80%",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});

export default PollOption;