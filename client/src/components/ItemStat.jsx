import { View, StyleSheet } from "react-native"
import { Text } from "./Text"

const styles = StyleSheet.create({
  statItem: {
    display: "flex",
    alignItems: "center",
  },
})

const humanize = (number) => {
  if (number >= 1000000) {
    return `${Math.round(number / 100000) / 10}m`
  }

  if (number >= 1000) {
    return `${Math.round(number / 100) / 10}k`
  }

  return number
}

const ItemStat = ({ num, label }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{humanize(num)}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  )
}

export default ItemStat
