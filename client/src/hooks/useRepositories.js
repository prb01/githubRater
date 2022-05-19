import { GET_REPOSITORIES } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
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
      !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositories
