import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SongListScreen = () => {
  const [songs, setSongs] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: null, direction: "asc" }); // Adiciona estado para a ordem de classificação

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const storedSongs = await AsyncStorage.getItem("songs");
        if (storedSongs) {
          // Parsea as músicas do armazenamento
          const parsedSongs = JSON.parse(storedSongs);

          // Ordena as músicas por número ao carregar
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

  const renderSong = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.columnNumber}>{item.number}</Text>
      <Text style={styles.columnName}>{item.name}</Text>
      <Text style={styles.columnMoment}>{item.moment}</Text>
    </View>
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
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSort("name")}
          style={styles.headerColumn}
        >
          <Text style={styles.textButton}>Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSort("moment")}
          style={styles.headerColumn}
        >
          <Text style={styles.textButton}>Momento</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  // Cabeçalhos da tabela com largura específica para cada coluna
  headerColumn: {
    flex: 1, // Permite que cada coluna ocupe espaço igual
    alignItems: "left",
    justifyContent: "center", // Alinha o texto verticalmente
    paddingHorizontal: 10,
  },
  textButton: {
    fontWeight: "bold",
  },
  list: {
    flex: 1, // Garante que a lista ocupe o restante da tela
  },
  listContent: {
    flexGrow: 1, // Garante que o conteúdo cresça para preencher o espaço da lista
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  columnNumber: {
    flex: 1,
    textAlign: "left",
  },
  columnName: {
    flex: 2,
    textAlign: "left",
    paddingHorizontal: 10, // Adiciona espaçamento à esquerda e à direita
  },
  columnMoment: {
    flex: 2,
    textAlign: "left",
    paddingLeft: 25, // Adiciona espaçamento à esquerda
  },
});

export default SongListScreen;
