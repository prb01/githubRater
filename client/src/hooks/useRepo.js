import { useState, useEffect } from "react"
import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useRepo = (repositoryId) => {
  const [repo, setRepo] = useState()
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  })

  if (error) {
    console.log(error)
  }

  useEffect(() => {
    if (!loading) {
      setRepo(data?.repository || null)
    }
  }, [loading])

  return { repo, loading }
}

export default useRepo
