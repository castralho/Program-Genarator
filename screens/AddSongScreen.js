import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup from "react-native-radio-buttons-group";

const AddSongScreen = ({ navigation }) => {
  const [newSongName, setNewSongName] = useState("");
  const [newSongNumber, setNewSongNumber] = useState("");
  const [newSongMoment, setNewSongMoment] = useState("");

  const addSong = async () => {
    if (newSongName && newSongNumber && newSongMoment) {
      const newSong = {
        name: newSongName,
        number: parseInt(newSongNumber),
        moment: newSongMoment,
      };

      const storedSongs = await AsyncStorage.getItem("songs");
      const songs = storedSongs ? JSON.parse(storedSongs) : [];
      const updatedSongs = [...songs, newSong];

      await AsyncStorage.setItem("songs", JSON.stringify(updatedSongs));
      setNewSongName("");
      setNewSongNumber("");
      setNewSongMoment("");
      alert("Quero ver se sabes esta de cor... Música adicionada!");
    } else {
      alert(
        "Deixa de ser burro, e preenche todos os campos... Nem venhas dizer que não viste!"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="Nome"
          value={newSongName}
          onChangeText={setNewSongName}
          style={styles.input}
        />
        <TextInput
          placeholder="Número"
          value={newSongNumber}
          onChangeText={setNewSongNumber}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Momento"
          value={newSongMoment}
          onChangeText={setNewSongMoment}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addSong}>
          <Text style={styles.buttonText}>Adicionar Música</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Adiciona a música que pretendes, depois consulta-a na lista de músicas.
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-end", // Posiciona o conteúdo no final do ecrã
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "95%",
  },
  button: {
    backgroundColor: "#cf5d25", // Cor de fundo do botão
    paddingVertical: 30, // Altura do botão
    paddingHorizontal: 25, // Largura interna
    borderRadius: 15, // Canto arredondado
    marginBottom: 40, // Espaço entre botões
    alignItems: "center", // Centraliza o texto
  },
  buttonText: {
    color: "#FFFFFF", // Cor do texto
    fontSize: 20, // Tamanho do texto
    fontWeight: "600", // Peso da fonte
  },
  input: {
    backgroundColor: "lightgrey",
    paddingVertical: 20,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  footerText: {
    fontSize: 12,
    color: "#888", // Cor mais suave para o texto
    marginBottom: 5, // Pequena margem no fundo
    textAlign: "center",
  },
});

export default AddSongScreen;
