import { FlatList, View, StyleSheet, Image, Pressable } from "react-native"
import theme from "../theme"
import ItemSummary from "./ItemSummary"
import ItemStat from "./ItemStat"
import { useNavigate, useParams } from "react-router-native"
import { Button } from "native-base"
import * as Linking from "expo-linking"
import { Text, Subheading } from "./Text"
import ItemSeparator from "./ItemSeparator"
import moment from "moment"
import useRepo from "../hooks/useRepo"

const humanize = (number) => {
  if (number >= 1000000) {
    return `${Math.round(number / 100000) / 10}m`
  }

  if (number >= 1000) {
    return `${Math.round(number / 100) / 10}k`
  }

  return number
}

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
  containerStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    marginTop: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 14,
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

const RepositoryInfo = ({ repository, repositoryId }) => {
  const navigate = useNavigate()

  const openGitHub = () => {
    Linking.openURL(item.url)
  }

  return (
    <Pressable
      onPress={() =>
        navigate(`/repositories/${repository.id}`, { replace: true })
      }
    >
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: repository.ownerAvatarUrl,
            }}
          />
          <ItemSummary
            name={repository.fullName}
            description={repository.description}
            language={repository.language}
          />
        </View>

        <View style={styles.containerStats}>
          <ItemStat num={repository.stargazersCount} label={"Stars"} />
          <ItemStat num={repository.forksCount} label={"Forks"} />
          <ItemStat num={repository.reviewCount} label={"Reviews"} />
          <ItemStat num={repository.ratingAverage} label={"Rating"} />
        </View>
        {repositoryId ? (
          <Button onPress={openGitHub}>Open in GitHub</Button>
        ) : null}
      </View>
    </Pressable>
  )
}

const ReviewItem = ({ review }) => {
  const createdAt = moment(review.createdAt).format("YYYY-MMM-DD HH:MM a")

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
    </View>
  )
}

export const SingleRepository = () => {
  const { repositoryId } = useParams()
  const variables = { first: 3, repositoryId }
  const { repository, fetchMore } = useRepo(variables)

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

    const onEndReach = () => {
      fetchMore()
    }

  if (!repository) return null

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryInfo
          repository={repository}
          repositoryId={repositoryId}
        />
      )}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryItem = ({ item }) => {
  return <RepositoryInfo repository={item} />
}

export default RepositoryItem
