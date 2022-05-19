import { FlatList, View, StyleSheet, Image, Pressable } from "react-native"
import ItemSummary from "./ItemSummary"
import ItemStat from "./ItemStat"
import { useNavigate, useParams } from "react-router-native"
import { Button } from "native-base"
import * as Linking from "expo-linking"
import ItemSeparator from "./ItemSeparator"
import useRepo from "../hooks/useRepo"
import ReviewItem from "./ReviewItem"

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
