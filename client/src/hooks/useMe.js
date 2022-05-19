import { CURRENT_USER } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useMe = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    CURRENT_USER,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  )

  if (error) {
    console.log(error)
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.me.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    me: data?.me,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useMe
