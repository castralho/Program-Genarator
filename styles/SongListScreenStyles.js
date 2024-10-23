import { StyleSheet } from "react-native";

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
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row", // Adicionado para alinhar o texto e o ícone
    justifyContent: "flex-start", // Alinha o texto à esquerda
  },
  textButton: {
    fontWeight: "bold",
    marginRight: 5, // Menos margem para o ícone ficar mais próximo
  },
  icon: {
    marginLeft: 3, // Adiciona um pouco de espaço à esquerda do ícone
    alignSelf: "center", // Centraliza o ícone verticalmente
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
  rowPressed: {
    backgroundColor: "#cf5d25",
  },
});

export default styles;
