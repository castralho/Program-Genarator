import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "flex-start", // Alinha os itens à esquerda
  },
  item: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10, // Espaçamento vertical entre os itens
  },
  smallText: {
    fontSize: 15, // Tamanho menor para o nome da música
    fontStyle: "italic", // Estilo itálico para diferenciá-lo
  },
  button: {
    backgroundColor: "#cf5d25", // Cor de fundo do botão
    paddingVertical: 30, // Altura do botão
    paddingHorizontal: 25, // Largura interna
    borderRadius: 15, // Canto arredondado
    marginTop: 40, // Espaço entre botões
    alignItems: "center", // Centraliza o texto
    width: "65%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
