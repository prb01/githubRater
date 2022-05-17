import { View, StyleSheet } from "react-native"
import { Link } from "react-router-native"
import { Subheading } from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  flexTab: {
    margin: 20,
  },
  tabText: {
    color: theme.colors.textOnDark,
  },
})

const AppTab = ({ linkTo, children, style, onPress }) => {
  return (
    <Link to={linkTo} style={style} onPress={onPress}>
      <View style={styles.flexTab}>
        <Subheading style={styles.tabText}>{children}</Subheading>
      </View>
    </Link>
  )
}

export default AppTab
