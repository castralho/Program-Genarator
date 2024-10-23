import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import styles from "../styles/HomeScreenStyles";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Função para gerar músicas */
          }}
        >
          <Text style={styles.buttonText}>Gerar Plano</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddSong")}
        >
          <Text style={styles.buttonText}>Adicionar Música</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SongList")}
        >
          <Text style={styles.buttonText}>Lista de Músicas</Text>
        </TouchableOpacity>
      </View>

      {/* Texto no fundo do ecrã */}
      <Text style={styles.footerText}>Program Generator by @castralho</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
