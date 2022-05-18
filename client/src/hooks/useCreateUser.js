import { CREATE_USER } from "../graphql/mutations"
import { useMutation } from "@apollo/client"

const useCreateUser = () => {
  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      throw error.graphQLErrors[0].message
    },
  })

  const addUser = async ({ username, password }) => {
    const { data } = await createUser({
      variables: {
        user: {
          username,
          password,
        },
      },
    })

    return { data }
  }

  return [addUser, result]
}

export default useCreateUser
