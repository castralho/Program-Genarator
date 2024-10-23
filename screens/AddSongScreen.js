import React, { useEffect, useState } from "react";
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
import songsData from "../songsData"; // Importa a lista de músicas
import styles from "../styles/AddSongScreenStyles";

const AddSongScreen = ({ navigation }) => {
  const [newSongName, setNewSongName] = useState("");
  const [newSongNumber, setNewSongNumber] = useState("");
  const [newSongMoment, setNewSongMoment] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso
  const [songs, setSongs] = useState([]); // Estado para armazenar as músicas

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
    // Remove espaços no início
    const trimmedValue = value.replace(/^\s+/, "");

    // Verifica se o valor contém apenas letras e espaços
    if (/^[a-zA-ZÀ-ÿ\s]*$/.test(trimmedValue)) {
      setNewSongName(trimmedValue);
    } else {
      alert("Deves pensar que ando a dormir. Introduz apenas letras!");
    }
  };

  // Função para aceitar somente números inteiros no input do número da música
  const handleNumberChange = (value) => {
    // Verifica se o valor é um número inteiro
    if (/^\d*$/.test(value)) {
      // Aceita apenas dígitos
      setNewSongNumber(value);
    } else {
      alert("Deixa de ser tecla 3 e introduz apenas números!");
    }
  };

  const addSong = async () => {
    if (newSongName && newSongNumber && newSongMoment) {
      const newSong = {
        name: newSongName.trim(),
        number: parseInt(newSongNumber),
        moment: newSongMoment,
      };

      // Verifica se o número já existe nas músicas guardadas
      const isNumberTaken = (number) => {
        return songs.some((song) => song.number === number);
      };

      if (isNumberTaken(newSong.number)) {
        alert("Ó nabo, já existe uma música com este número!");
        setNewSongNumber("");
        return; // Impede que a música seja adicionada
      }

      // Se o número for único, adiciona a nova música
      const updatedSongs = [...songs, newSong];
      await AsyncStorage.setItem("songs", JSON.stringify(updatedSongs));
      setSongs(updatedSongs); // Atualiza o estado das músicas

      // Limpar os inputs
      setNewSongName("");
      setNewSongNumber("");
      setNewSongMoment("");

      // Exibir mensagem de sucesso
      setSuccessMessage("Música adicionada com sucesso!");

      // Remover a mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      alert(
        "Deixa de ser burro, e preenche todos os campos... Não venhas dizer que não viste!"
      );
    }
  };

  // Adiciona as músicas pré carregadas ao AsyncStorage se ainda não estiverem lá
  const initializeSongsData = async () => {
    const storedSongs = await AsyncStorage.getItem("songs");
    if (!storedSongs) {
      await AsyncStorage.setItem("songs", JSON.stringify(songsData));
      setSongs(songsData); // Atualiza o estado das músicas com os dados iniciais
    } else {
      setSongs(JSON.parse(storedSongs)); // Carrega músicas já armazenadas
    }
  };

  // Usa useEffect para inicializar os dados de músicas ao montar o componente
  useEffect(() => {
    initializeSongsData();
  }, []);

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

export default AddSongScreen;
