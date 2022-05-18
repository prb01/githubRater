import { CREATE_REVIEW } from "../graphql/mutations"
import { useMutation } from "@apollo/client"

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      throw error.graphQLErrors[0].message
    },
  })

  const addReview = async ({
    repositoryName,
    ownerName,
    rating,
    text,
  }) => {
    const { data } = await createReview({
      variables: {
          review: {
            repositoryName,
            ownerName,
            rating,
            text,
          },
      },
    })

    return { data }
  }

  return [addReview, result]
}

export default useCreateReview
