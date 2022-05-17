import { View, StyleSheet, Image, Pressable } from "react-native"
import theme from "../theme"
import ItemSummary from "./ItemSummary"
import ItemStat from "./ItemStat"
import { useNavigate, useParams } from "react-router-native"
import { Button } from "native-base"
import * as Linking from "expo-linking"
import { Text } from "./Text"
import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client"

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
    // backgroundColor: theme.colors.primary,
  },
  containerName: {
    display: "flex",
    justifyContent: "center",
    flexShrink: 1,
  },
  containerStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    marginTop: 12,
  },
  statItem: {
    display: "flex",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 14,
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
})

const RepositoryItem = ({ item }) => {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  })

  if (repositoryId && loading) {
    return <Text>loading...</Text>
  }

  item = item || data.repository

  const openGitHub = () => {
    Linking.openURL(item.url)
  }

  return (
    <Pressable
      onPress={() =>
        navigate(`/repositories/${item.id}`, { replace: true })
      }
    >
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <ItemSummary
            name={item.fullName}
            description={item.description}
            language={item.language}
          />
        </View>

        <View style={styles.containerStats}>
          <ItemStat num={item.stargazersCount} label={"Stars"} />
          <ItemStat num={item.forksCount} label={"Forks"} />
          <ItemStat num={item.reviewCount} label={"Reviews"} />
          <ItemStat num={item.ratingAverage} label={"Rating"} />
        </View>
        {repositoryId ? (
          <Button onPress={openGitHub}>Open in GitHub</Button>
        ) : null}
      </View>
    </Pressable>
  )
}

export default RepositoryItem
