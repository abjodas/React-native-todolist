import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function ({ navigation }) {
  const { state, dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 8 }}>
      <Text style={{ fontSize: 24 }}>Enter Title</Text>
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
      <Text style={{ fontSize: 24 }}>Enter Description</Text>
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
            type: "ADD",
            payload: { title: title, content: content, completed: false },
          });
          navigation.goBack();
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          Create Note
        </Text>
      </TouchableOpacity>
    </View>
  );
}
