import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { AntDesign } from "@expo/vector-icons";

const EditNoteScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { state, dispatch } = useContext(NotesContext);

  const note = state.find((record) => {
    return record.id == id;
  });
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [completed, setCompleted] = useState(note.completed);

  return (
    <View style={{ flex: 1, alignItems: "center", margin: 8 }}>
      <Text style={{ fontSize: 24 }}>Update Title</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          backgroundColor: "white",
          width: "80%",
          height: 30,
          borderWidth: 1,
          borderRadius: 10,
          padding: 7,
        }}
      />
      <Text style={{ fontSize: 24 }}>Update Description</Text>
      <TextInput
        value={content}
        onChangeText={(content) => setContent(content)}
        style={{
          backgroundColor: "white",
          width: "80%",
          height: 70,
          padding: 7,
          borderWidth: 1,
          borderRadius: 30,
        }}
        multiline={true}
      />
      <Text style={{ fontSize: 24 }}>Completed?</Text>
      <TouchableOpacity
        onPress={() => setCompleted(completed == true ? false : true)}
      >
        <AntDesign
          name={completed == true ? "checkcircle" : "checkcircleo"}
          size={24}
          color={completed == true ? "green" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          width: 100,
          height: 50,
          borderRadius: 10,
          marginTop: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          dispatch({
            type: "UPDATE",
            payload: {
              title: title,
              content: content,
              id: id,
              completed: completed,
            },
          });
          navigation.goBack();
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          Save Note
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditNoteScreen;
