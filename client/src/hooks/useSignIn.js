import { useContext } from "react"
import useAuthStorage from "../hooks/useAuthStorage"
import { LOGIN } from "../graphql/mutations"
import { useMutation } from "@apollo/client"
import { useApolloClient } from "@apollo/client"

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      throw (error.graphQLErrors[0].message)
    },
  })

  const signIn = async ({ username, password }) => {
    const result = await login({
      variables: { credentials: { username, password } },
    })

    if (result.data) {
      authStorage.setAccessToken(result.data.authenticate.accessToken)
      apolloClient.resetStore()
    }

    return result
  }

  return [signIn, result]
}

export default useSignIn


// useEffect(() => {
//   if (result.data) {
//     const token = result.data.login.value
//     setToken(token)
//     localStorage.setItem("library-user-token", token)
//     setUsername("")
//     setPassword("")
//     refetchUserQuery()
//     setPage("authors")
//   }
// }, [result.data])

// if (!show) return null

// const handleSubmit = (event) => {
//   event.preventDefault()

//   login({ variables: { username, password } })
// }
