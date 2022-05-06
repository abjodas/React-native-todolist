import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const ShowNoteScreen = ({ route }) => {
  const { state, dispatch } = useContext(NotesContext);
  const { id } = route.params;
  const note = state.find((record) => {
    return record.id == id;
  });
  return (
    <View>
      <Text style={{ fontSize: 24 }}>Title</Text>
      <View
        style={{
          backgroundColor: "white",
          width: "80%",
          height: 30,
          borderWidth: 1,
          borderRadius: 10,
          padding: 7,
        }}
      >
        <Text style={{ fontSize: 15 }}>{note.title}</Text>
      </View>
      <Text style={{ fontSize: 24 }}>Description</Text>
      <View
        style={{
          backgroundColor: "white",
          width: "80%",
          height: 70,
          padding: 7,
          borderWidth: 1,
          borderRadius: 30,
        }}
      >
        <Text style={{ fontSize: 15 }}>{note.content}</Text>
      </View>
    </View>
  );
};

export default ShowNoteScreen;
