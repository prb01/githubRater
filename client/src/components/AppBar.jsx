import { View, StyleSheet, Pressable, Alert } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"
import AppTab from "./AppTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.menuBackground,
    display: "flex",
    flexDirection: "row",
  },
  flexTab: {
    margin: 20,
  },
  tabText: {
    color: "#fff",
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppTab onPress={() => null}>Repositories</AppTab>
    </View>
  )
}

export default AppBar
