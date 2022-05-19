import { FlatList } from "react-native"
import ItemSeparator from "./ItemSeparator"
import ReviewItem from "./ReviewItem"
import useMe from "../hooks/useMe"

const MyReviews = () => {
  const variables = { includeReviews: true}
  const { me, fetchMore } = useMe(variables)

  const reviews = me ? me.reviews.edges.map((edge) => edge.node) : []

  const onEndReach = () => {
    fetchMore()
  } 

  if (!me) return null

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} me={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default MyReviews
