import { View, StyleSheet, Pressable } from "react-native"
import ItemSummary from "./ItemSummary"
import { Text, Subheading } from "./Text"
import moment from "moment"
import theme from "../theme"
import { useNavigate } from "react-router-native"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 8,
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    marginRight: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    color: theme.colors.primary,
  },
})

const ReviewItem = ({ review }) => {
  const createdAt = moment(review.createdAt).format("YYYY-MMM-DD HH:MM a")
  const navigate = useNavigate()

  return (
    <Pressable
      onPress={() =>
        {
          console.log("pressed")
          navigate(`/repositories/${review.repositoryId}`, { replace: true })
        }
      }
    >
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <View style={styles.ratingContainer}>
            <Text fontWeight="bold" style={styles.rating}>
              {review.rating}
            </Text>
          </View>

          <ItemSummary
            name={review.user.username}
            description={createdAt}
          />
        </View>

        <View style={styles.containerRow}>
          <Subheading>{review.text}</Subheading>
        </View>
      </View>
    </Pressable>
  )
}

export default ReviewItem
