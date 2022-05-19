import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"
import { GET_REPOSITORY, CURRENT_USER } from "../graphql/queries"

const useDeleteReview = () => {
  const [removeReview, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      throw error.graphQLErrors[0].message
    },
    refetchQueries: [
      {query: GET_REPOSITORY},
      { query: CURRENT_USER, variables: { includeReviews: true } },
    ],
  })

  const deleteReview = async (deleteReviewId) => {
    const { data } = await removeReview({
      variables: {deleteReviewId},
    })

    return { data }
  }

  return [deleteReview, result]
}

export default useDeleteReview