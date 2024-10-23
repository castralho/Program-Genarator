import { StyleSheet } from "react-native";

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

export default styles;
