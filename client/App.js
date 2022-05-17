import { StatusBar } from "expo-status-bar"
import { NativeRouter } from "react-router-native"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"
import Main from "./src/components/Main"
import { NativeBaseProvider } from "native-base"
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from "./src/contexts/AuthStorageContext"

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  return (
    <>
      <NativeRouter>
        <NativeBaseProvider>
          <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
              <Main />
            </AuthStorageContext.Provider>
          </ApolloProvider>
        </NativeBaseProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  )
}

export default App
