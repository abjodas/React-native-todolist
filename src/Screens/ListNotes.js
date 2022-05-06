import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NotesContext } from "../context/NotesContext";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function ListNotes({ navigation }) {
  const [data, setData] = useState(null);
  const [reloadButton, setReloadButton] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const { state, dispatch } = useContext(NotesContext);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `https://jsonplaceholder.typicode.com/todos?_limit=10&page=1`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setData(response.data);
          if (data != null) {
            dispatch({
              type: "INITIALUPDATE",
              payload: { data: data },
            });
          }
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();

    return () => source.cancel("Data fetching cancelled");
  }, [reloadButton]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            marginTop: 5,
            backgroundColor: "blue",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Create");
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.sort((a, b) => new Date(b.date) - new Date(a.date))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                marginBottom: 5,
                backgroundColor: "white",
                borderRadius: 5,
                height: 35,
                elevation: 4,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                navigation.navigate("Show", { id: item.id });
              }}
            >
              <View style={{ width: 190 }}>
                <Text style={{ fontSize: 24, marginLeft: 10 }}>
                  {item.title}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginRight: 10,
                  alignItems: "center",
                  paddingRight: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => dispatch({ type: "DELETE", payload: item.id })}
                >
                  <Entypo name="trash" size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Update", { id: item.id })}
                >
                  <Feather name="edit" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const completedStatus =
                      item.completed == true ? false : true;
                    dispatch({
                      type: "UPDATE",
                      payload: {
                        title: item.title,
                        content: item.content,
                        id: item.id,
                        completed: completedStatus,
                      },
                    });
                  }}
                >
                  <AntDesign
                    name={
                      item.completed == true ? "checkcircle" : "checkcircleo"
                    }
                    size={24}
                    color={item.completed == true ? "green" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        title="reload"
        onPress={() => setReloadButton(reloadButton == true ? false : true)}
      />
    </View>
  );
}
