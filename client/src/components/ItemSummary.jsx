import { View, StyleSheet } from "react-native"
import { Text, Subheading } from "./Text"
import ItemLanguage from "./ItemLanguage"

const styles = StyleSheet.create({
  containerName: {
    display: "flex",
    justifyContent: "center",
    flexShrink: 1,
  },
})

const ItemSummary = ({ name, description, language }) => {
  return (
    <View style={styles.containerName}>
      <Subheading fontWeight="bold">{name}</Subheading>
      <Text>{description}</Text>
      <ItemLanguage language={language}/>
    </View>
  )
}

export default ItemSummary