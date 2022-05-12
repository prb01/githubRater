import { View, StyleSheet } from "react-native"
import { Text } from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  languageBox: {
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
})

const ItemLanguage = ({ language }) => {
  return (
    <View style={styles.languageBox}>
      <Text fontWeight="bold" color="textOnDark">
        {language}
      </Text>
    </View>
  )
}

export default ItemLanguage