import { View, StyleSheet, ScrollView } from "react-native"
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
      <ScrollView horizontal={true}>
        <AppTab linkTo="/">Repositories</AppTab>
      </ScrollView>
        <AppTab style={styles.tabRight} linkTo="/signin">
          Sign-in
        </AppTab>
    </View>
  )
}

export default AppBar
