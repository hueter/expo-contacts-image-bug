import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Contacts from "expo-contacts";
import * as FileSystem from "expo-file-system";

export default function App() {
  const handleSaveContact = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const imageUri = await FileSystem.downloadAsync(
      "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
      FileSystem.cacheDirectory + "/images"
    );

    await Contacts.presentFormAsync(null, {
      [Contacts.Fields.ID]: "1",
      [Contacts.Fields.ContactType]: Contacts.ContactTypes.Person,
      [Contacts.Fields.Name]: "Test Contact",
      [Contacts.Fields.Image]: {
        uri: imageUri.uri,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSaveContact}
        style={{ padding: 10, backgroundColor: "#4a44fa" }}
      >
        <Text>Save this contact</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
