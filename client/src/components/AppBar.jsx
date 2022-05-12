import { View, StyleSheet } from "react-native"
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
  tabRight: {
    marginLeft: "auto"
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppTab linkTo="/">Repositories</AppTab>
      <AppTab style={styles.tabRight} linkTo="/signin">Sign-in</AppTab>
    </View>
  )
}

export default AppBar
