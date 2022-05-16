import { StatusBar } from "expo-status-bar"
import { NativeRouter } from "react-router-native"
import Main from "./src/components/Main"
import { NativeBaseProvider } from "native-base"


const App = () => {
  return (
    <>
      <NativeRouter>
        <NativeBaseProvider>
          <Main />
        </NativeBaseProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  )
}

export default App
