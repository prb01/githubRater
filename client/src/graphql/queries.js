import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          id
          ownerName
          name
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          url
          ownerAvatarUrl
          description
          language
          ratingAverage
          fullName
        }
      }
    }
  }
`

export const CURRENT_USER = gql`
  {
    me {
      id
      username
    }
  }
`
