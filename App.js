import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProgramGenerator = () => {
  //console.log("App executed");

  return (
    <SafeAreaView style={styles.container}>
      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { /* Função para gerar músicas */ }}>
          <Text style={styles.buttonText}>Geral Plano</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { /* Função para adicionar música */ }}>
          <Text style={styles.buttonText}>Adicionar Música</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { /* Função para ver lista de músicas */ }}>
          <Text style={styles.buttonText}>Lista de Músicas</Text>
        </TouchableOpacity>
      </View>

      {/* Texto no fundo do ecrã */}
      <Text style={styles.footerText}>Program Generator by @maneca and @castralho</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',  //Posiciona o conteúdo no final do ecrã
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#888',  // Cor mais suave para o texto
    marginBottom: 10,  // Pequena margem no fundo
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '95%',
  },
  button: {
    backgroundColor: '#cf5d25',  // Cor de fundo do botão
    paddingVertical: 30,  // Altura do botão
    paddingHorizontal: 25,  // Largura interna
    borderRadius: 15,  // Canto arredondado
    marginBottom: 40,  // Espaço entre botões
    alignItems: 'center',  // Centraliza o texto
  },
  buttonText: {
    color: '#FFFFFF',  // Cor do texto
    fontSize: 18,  // Tamanho do texto
    fontWeight: '600',  // Peso da fonte
  },
});

export default ProgramGenerator;