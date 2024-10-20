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
import { Picker } from "@react-native-picker/picker";

const AddSongScreen = ({ navigation }) => {
  const [newSongName, setNewSongName] = useState("");
  const [newSongNumber, setNewSongNumber] = useState("");
  const [newSongMoment, setNewSongMoment] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso

  // Array com os momentos disponíveis para a música
  const moments = [
    { id: "1", label: "Entrada", value: "Entrada" },
    { id: "2", label: "Ato penitencial", value: "Ato penitencial" },
    { id: "3", label: "Aleluia", value: "Aleluia" },
    { id: "4", label: "Ofertório", value: "Ofertório" },
    { id: "5", label: "Santo", value: "Santo" },
    { id: "6", label: "Paz", value: "Paz" },
    { id: "7", label: "Comunhão", value: "Comunhão" },
    { id: "8", label: "Ação de Graças", value: "Ação de Graças" },
    { id: "9", label: "Final", value: "Final" },
  ];

  // Função para aceitar somente letras inteiros no input do nome da música
  const handleNameChange = (value) => {
    // Verifica se o valor contém apenas letras (incluindo espaços)
    if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
      // Aceita apenas letras e espaços
      setNewSongName(value);
    } else {
      alert(
        "Deves pensar que ando a dormir, não? Escreve lá um nome só com LETRAS."
      );
    }
  };

  // Função para aceitar somente números inteiros no input do número da música
  const handleNumberChange = (value) => {
    // Verifica se o valor é um número inteiro
    if (/^\d*$/.test(value)) {
      // Aceita apenas dígitos
      setNewSongNumber(value);
    } else {
      alert("Deves pensar que ando a dormir, não? Escolhe um número inteiro.");
    }
  };

  const addSong = async () => {
    if (newSongName && newSongNumber && newSongMoment) {
      const newSong = {
        name: newSongName,
        number: parseInt(newSongNumber),
        moment: newSongMoment,
      };

      // Carrega a lista de músicas guardadas
      const storedSongs = await AsyncStorage.getItem("songs");
      const songs = storedSongs ? JSON.parse(storedSongs) : [];

      // Verifica se o número já existe
      const isNumberTaken = songs.some(
        (song) => song.number === newSong.number
      );
      if (isNumberTaken) {
        alert("Ó nabo, já existe uma música com este número!");
        setNewSongNumber("");
        return; // Impede que a música seja adicionada
      }

      // Se o número for único, adiciona a nova música
      const updatedSongs = [...songs, newSong];
      await AsyncStorage.setItem("songs", JSON.stringify(updatedSongs));

      //Limpar os inputs
      setNewSongName("");
      setNewSongNumber("");
      setNewSongMoment("");

      // Exibir mensagem de sucesso
      setSuccessMessage("Música adicionada com sucesso!");

      // Remover a mensagem após 5 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      alert(
        "Deixa de ser burro, e preenche todos os campos... Não venhas dizer que não viste!"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonContainer}>
        {/* Exibir a mensagem de sucesso se ela existir */}
        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <TextInput
          placeholder="Nome"
          value={newSongName}
          onChangeText={handleNameChange}
          style={styles.input}
        />

        <TextInput
          placeholder="Número"
          value={newSongNumber}
          onChangeText={handleNumberChange}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Uma vez que o picker não consegue ser alterado no seu estilo, coloquei o picker dentro de uma view e editei a view */}
        <View style={styles.picker}>
          <Picker
            selectedValue={newSongMoment}
            onValueChange={(itemValue) => setNewSongMoment(itemValue)} // Atualiza o estado quando um valor é selecionado
            dropdownIconColor="grey" // Define a cor do ícone do dropdown
          >
            <Picker.Item color="grey" label="Selecione um momento" value="" />

            {moments.map((moment) => (
              <Picker.Item
                key={moment.id}
                label={moment.label}
                value={moment.value}
                color="black"
              />
            ))}
          </Picker>
        </View>

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
  successText: {
    color: "green",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  picker: {
    backgroundColor: "lightgrey",
    paddingVertical: 7,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
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
