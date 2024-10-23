import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/SongListScreenStyles"; // Importa os estilos

const SongListScreen = () => {
  const [songs, setSongs] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: null, direction: "asc" }); // Adiciona estado para a ordem de classificação
  const [pressedSong, setPressedSong] = useState(null); // Adiciona estado para a música pressionada

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const storedSongs = await AsyncStorage.getItem("songs");
        if (storedSongs) {
          // Carrega músicas da memória
          const parsedSongs = JSON.parse(storedSongs);
          const sortedSongs = parsedSongs.sort(
            (a, b) => Number(a.number) - Number(b.number)
          );
          setSongs(sortedSongs);
        }
      } catch (error) {
        console.error(
          "Já te fodeste ahah vais ter de procurar à moda antiga!",
          error
        );
      }
    };

    loadSongs();
  }, []);

  const handleSort = (field) => {
    // Alterna entre as direções de classificação
    const newDirection =
      sortOrder.field === field && sortOrder.direction === "asc"
        ? "desc"
        : "asc";

    // Atualiza a ordem de classificação
    setSortOrder({ field, direction: newDirection });

    // Ordena as músicas
    const sortedSongs = [...songs].sort((a, b) => {
      let comparison = 0;

      if (field === "number") {
        // Para números, converte-os para número e compara
        comparison = Number(a[field]) - Number(b[field]);
      } else {
        // Para string, usa localeCompare
        comparison = a[field].localeCompare(b[field]);
      }

      return newDirection === "asc" ? comparison : -comparison;
    });
    setSongs(sortedSongs);
  };

  const handleDeleteSong = async (song) => {
    // Mostra uma caixa de alerta para confirmação da eliminação
    Alert.alert(
      "Eliminar música",
      `Tens a certeza que queres eliminar a música "${song.name}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Remove a música da lista
              const updatedSongs = songs.filter(
                (item) => item.number !== song.number
              );
              setSongs(updatedSongs);

              // Atualiza o armazenamento
              await AsyncStorage.setItem("songs", JSON.stringify(updatedSongs));
            } catch (error) {
              console.error("Erro ao eliminar a música:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity
      onPressIn={() => setPressedSong(item.number)} // Define a música pressionada
      onPressOut={() => setPressedSong(null)} // Reseta quando solta
      onPress={() => handleDeleteSong(item)}
      style={[
        styles.row,
        pressedSong === item.number && styles.rowPressed, // Aplica o estilo quando pressionada
      ]}
    >
      <Text style={styles.columnNumber}>{item.number}</Text>
      <Text style={styles.columnName}>{item.name}</Text>
      <Text style={styles.columnMoment}>{item.moment}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safeArea.backgroundColor}
        translucent={false}
      />

      {/* Cabeçalhos da tabela, fixo no topo */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => handleSort("number")}
          style={styles.headerColumn}
        >
          <Text style={styles.textButton}>Número</Text>
          {sortOrder.field === "number" && (
            <Icon
              name={sortOrder.direction === "asc" ? "caret-up" : "caret-down"}
              size={15}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSort("name")}
          style={styles.headerColumn}
        >
          <Text style={styles.textButton}>Nome</Text>
          {sortOrder.field === "name" && (
            <Icon
              name={sortOrder.direction === "asc" ? "caret-up" : "caret-down"}
              size={15}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSort("moment")}
          style={styles.headerColumn}
        >
          <Text style={styles.textButton}>Momento</Text>
          {sortOrder.field === "moment" && (
            <Icon
              name={sortOrder.direction === "asc" ? "caret-up" : "caret-down"}
              size={15}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Lista de músicas */}
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()} // Usa o índice como key temporária
        renderItem={renderSong}
        contentContainerStyle={styles.listContent}
        style={styles.list} // Adiciona estilo para ocupar o restante da tela
      />
    </SafeAreaView>
  );
};

export default SongListScreen;
