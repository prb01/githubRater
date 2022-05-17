import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"
import { useMutation } from "@apollo/client"

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      throw error.graphQLErrors[0].message
    },
  })

  const signIn = async ({ username, password }) => {
    const { data } = await login({
      variables: { credentials: { username, password } },
    })

    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()

    return { data }
  }

  return [signIn, result]
}

export default useSignIn
