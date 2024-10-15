import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  console.log("App executed");

  return (
    <SafeAreaView style={styles.container}>
      <Text>Program Generator</Text>
      <Text>by</Text>
      <Text>@maneca and @castralho</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});