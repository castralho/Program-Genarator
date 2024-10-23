import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-end", //Posiciona o conteúdo no final do ecrã
    alignItems: "center",
    padding: 20,
    //backgroundColor: "#181B1E",
  },
  footerText: {
    fontSize: 12,
    color: "#888", // Cor mais suave para o texto
    marginBottom: 5, // Pequena margem no fundo
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
    fontSize: 18, // Tamanho do texto
    fontWeight: "600", // Peso da fonte
  },
});

export default styles;
