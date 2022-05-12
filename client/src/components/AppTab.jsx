import { View, StyleSheet, Pressable } from "react-native"
import { Subheading } from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  flexTab: {
    margin: 20,
  },
  tabText: {
    color: theme.colors.menuTab,
  },
})

const AppTab = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.flexTab}>
        <Subheading style={styles.tabText}>
          {children}
        </Subheading>
      </View>
    </Pressable>
  )
}

export default AppTab
