import { View, StyleSheet, Alert } from "react-native"
import ItemSummary from "./ItemSummary"
import { Text, Subheading } from "./Text"
import moment from "moment"
import theme from "../theme"
import { useNavigate } from "react-router-native"
import { Button } from "native-base"
import useDeleteReview from "../hooks/useDeleteReview"

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
  buttonContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  buttonLink: {
    backgroundColor: theme.colors.primary,
  },
  buttonDelete: {
    backgroundColor: theme.colors.negative,
  },
})

const ReviewItem = ({ review, me }) => {
  const createdAt = moment(review.createdAt).format("YYYY-MMM-DD HH:MM a")
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()

  const deleteAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => handleDeleteReview() },
      ],
      {
        cancelable: true,
      }
    )
  }

  const handleDeleteReview = () => {
    console.log("up in here")
    try {
      deleteReview(review.id)
      navigate(`/repositories/${review.repositoryId}`, {
        replace: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" style={styles.rating}>
            {review.rating}
          </Text>
        </View>

        <ItemSummary name={review.user.username} description={createdAt} />
      </View>

      <View style={styles.containerRow}>
        <Subheading>{review.text}</Subheading>
      </View>
      {me && (
        <View style={styles.containerRow}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log("pressed")
                navigate(`/repositories/${review.repositoryId}`, {
                  replace: true,
                })
              }}
              style={styles.buttonLink}
            >
              View repository
            </Button>
            <Button onPress={deleteAlert} style={styles.buttonDelete}>
              Delete review
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
