import { useState, useEffect } from "react"
import { GET_REPOSITORIES } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useRepositories = (sortMethod) => {
  const [repositories, setRepositories] = useState()
  const sortVariables = sortMethod ? JSON.parse(sortMethod) : null
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { ...sortVariables },
  })

  if (error) {
    console.log(error)
  }

  useEffect(() => {
    if (!loading) {
      setRepositories(data.repositories)
    }
  }, [loading])

  const refetchRepositories = async () => {
    await client.refetchQueries({
      include: [GET_REPOSITORIES],
    })

    setRepositories(data)
  }

  return { repositories, loading, refetch: refetchRepositories }
}

export default useRepositories
