import ProfileCard from "@/components/commons/cards/ProfileCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputTeacherSearch from "@/components/commons/inputs/search/InputTeacherSearch";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { userProps } from "@/types";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

const mockUsers: userProps[] = [
  {
    id: 1,
    name: "Dr. Alice Carter",
    imageUri: "https://example.com/alice.jpg",
  },
  {
    id: 2,
    name: "Prof. Bob Wilson",
    imageUri: "https://example.com/bob.jpg",
  },
  {
    id: 3,
    name: "Dr. Clara Thompson",
    imageUri: "https://example.com/clara.jpg",
  },
  {
    id: 4,
    name: "Prof. David Lee",
    imageUri: "https://example.com/david.jpg",
  },
];

const AddTeacher = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchValid, setIsSearchValid] = useState(false);
  const [searchResults, setSearchResults] = useState<userProps[]>([]);

  const handleSearch = () => {
    if (!isSearchValid) return;

    const results = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <PageContainers>
      <BackHeader title="Add Teacher" />
      <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
        <InputTeacherSearch
          label=""
          value={searchQuery}
          onChangeText={setSearchQuery}
          onValidChange={setIsSearchValid}
          onSearch={handleSearch}
          placeholder="Enter teacher name"
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <ProfileCard key={user.id} user={user} type="teacher" />
          ))
        ) : (
          <ThemedText>No results found</ThemedText>
        )}
      </ScrollView>
    </PageContainers>
  );
};

export default AddTeacher;