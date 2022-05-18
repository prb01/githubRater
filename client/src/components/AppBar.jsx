import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"
import AppTab from "./AppTab"
import { useQuery } from "@apollo/client"
import { CURRENT_USER } from "../graphql/queries"
import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.menuBackground,
    display: "flex",
    flexDirection: "row",
  },
  tabRight: {
    marginLeft: "auto",
  },
})

const AppBar = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const { data } = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  })

  const handleLogout = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppTab linkTo="/">Repositories</AppTab>
        {data && data.me && (
          <AppTab linkTo="/review">Create a review</AppTab>
        )}
      </ScrollView>
      {data && data.me ? (
        <AppTab
          style={styles.tabRight}
          linkTo="/signin"
          onPress={() => handleLogout()}
        >
          Logout
        </AppTab>
      ) : (
        <AppTab style={styles.tabRight} linkTo="/signin">
          Login
        </AppTab>
      )}
    </View>
  )
}

export default AppBar
