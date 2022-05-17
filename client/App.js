import { StatusBar } from "expo-status-bar"
import { NativeRouter } from "react-router-native"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"
import Main from "./src/components/Main"
import { NativeBaseProvider } from "native-base"
import Constants from "expo-constants"

const apolloClient = createApolloClient()

const App = () => {
  return (
    <>
      <NativeRouter>
        <NativeBaseProvider>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </NativeBaseProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  )
}

export default App
