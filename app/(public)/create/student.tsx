import ProfileCard from "@/components/commons/cards/ProfileCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputStudentSearch from "@/components/commons/inputs/search/InputStudentSearch";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { userProps } from "@/types";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const mockUsers: userProps[] = [
  {
    id: 1,
    name: "John Doe",
    matricule: "fe1a123",
    imageUri: "https://example.com/john.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    matricule: "fe2b456",
    imageUri: "https://example.com/jane.jpg",
  },
  {
    id: 3,
    name: "Emily Johnson",
    matricule: "fe3c789",
    imageUri: "https://example.com/emily.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    matricule: "fe4d012",
    imageUri: "https://example.com/michael.jpg",
  },
];

const AddStudent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchValid, setIsSearchValid] = useState(false);
  const [searchResults, setSearchResults] = useState<userProps[]>([]);

  useEffect(() => {
    if (!isSearchValid) {
      setSearchResults([]);
      return;
    }

    const results = mockUsers.filter(
      (user) =>
        user.matricule!.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, isSearchValid]);

  const handleSearch = () => {
    // Manual search trigger (for icon click or keyboard "search" key)
    if (!isSearchValid) {
      setSearchResults([]);
      return;
    }

    const results = mockUsers.filter(
      (user) =>
        user.matricule!.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <PageContainers>
      <BackHeader title="Add Student" />
      <ScrollView style={{ paddingHorizontal: 20 }}>
      <InputStudentSearch
      label=""
        value={searchQuery}
        onChangeText={setSearchQuery}
        onValidChange={setIsSearchValid}
        onSearch={handleSearch}
        placeholder="Search by matricule or name"
      />
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <ProfileCard key={user.id} user={user} type="student" />
          ))
        ) : (
          <ThemedText>
            {searchQuery ? "No results found" : "Enter a matricule or name to search"}
          </ThemedText>
        )}
      </ScrollView>
    </PageContainers>
  );
};

export default AddStudent;