import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListNotes from "./src/Screens/ListNotes";
import { NotesProvider } from "./src/context/NotesContext";
import CreateNoteScreen from "./src/Screens/CreateNoteScreen";
import ShowNoteScreen from "./src/Screens/ShowNoteScreen";
import EditNoteScreen from "./src/Screens/EditNoteScreen";

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="notes"
          component={ListNotes}
          options={{
            headerTitleAlign: "center",
            title: "All todos",
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateNoteScreen}
          options={{
            headerTitleAlign: "center",
            title: "Create Todo",
          }}
        />
        <Stack.Screen
          name="Show"
          component={ShowNoteScreen}
          options={{
            headerTitleAlign: "center",
            title: "Todo Details",
          }}
        />
        <Stack.Screen
          name="Update"
          component={EditNoteScreen}
          options={{
            headerTitleAlign: "center",
            title: "Edit Todo",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NotesProvider>
      <App />
    </NotesProvider>
  );
};
