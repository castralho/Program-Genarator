import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/GeneratePlanStyles";

const GeneratePlanScreen = () => {
  const [plan, setPlan] = useState({
    entrada: null,
    aleluia: null,
    ofertorio: null,
    santo: null,
    paz: null,
    comunhao: null,
    final: null,
  });

  const momentsMap = {
    Entrada: "entrada",
    Aleluia: "aleluia",
    Ofertório: "ofertorio",
    Santo: "santo",
    Paz: "paz",
    Comunhão: "comunhao",
    Final: "final",
  };

  // Função para gerar o plano aleatório
  const generatePlan = async () => {
    // Carrega a lista de músicas guardadas
    const storedSongs = await AsyncStorage.getItem("songs");
    const songs = storedSongs ? JSON.parse(storedSongs) : [];

    // Objeto para armazenar as músicas selecionadas
    const selectedSongs = { ...plan };

    // Para cada momento, seleciona uma música aleatória
    for (const [moment, key] of Object.entries(momentsMap)) {
      const filteredSongs = songs.filter((song) => song.moment === moment);
      if (filteredSongs.length > 0) {
        const randomSong =
          filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
        selectedSongs[key] = {
          number: randomSong.number,
          name: randomSong.name,
        }; // Guarda o número e o nome da música
      } else {
        selectedSongs[key] = { number: "", name: "Nenhuma música disponível" }; // Mensagem caso não haja músicas
      }
    }

    setPlan(selectedSongs); // Atualiza o estado com os números e nomes selecionados
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.item}>
          E - {plan.entrada?.number}{" "}
          {plan.entrada && (
            <Text style={styles.smallText}>({plan.entrada.name})</Text>
          )}
        </Text>
        <Text style={styles.item}>
          A - {plan.aleluia?.number}{" "}
          {plan.aleluia && (
            <Text style={styles.smallText}>({plan.aleluia.name})</Text>
          )}
        </Text>
        <Text style={styles.item}>
          O - {plan.ofertorio?.number}{" "}
          {plan.ofertorio && (
            <Text style={styles.smallText}>({plan.ofertorio.name})</Text>
          )}
        </Text>
        <Text style={styles.item}>
          S - {plan.santo?.number}{" "}
          {plan.santo && (
            <Text style={styles.smallText}>({plan.santo.name})</Text>
          )}
        </Text>
        <Text style={styles.item}>
          P - {plan.paz?.number}{" "}
          {plan.paz && <Text style={styles.smallText}>({plan.paz.name})</Text>}
        </Text>
        <Text style={styles.item}>
          C - {plan.comunhao?.number}{" "}
          {plan.comunhao && (
            <Text style={styles.smallText}>({plan.comunhao.name})</Text>
          )}
        </Text>
        <Text style={styles.item}>
          F - {plan.final?.number}{" "}
          {plan.final && (
            <Text style={styles.smallText}>({plan.final.name})</Text>
          )}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePlan}>
        <Text style={styles.buttonText}>GERAR PLANO</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GeneratePlanScreen;
