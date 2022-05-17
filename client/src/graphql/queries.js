import { gql } from "@apollo/client"

const REPO_DETAIL = gql`
  fragment RepoDetail on Repository {
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
`

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          ...RepoDetail
        }
      }
    }
  }
  ${REPO_DETAIL}
`

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoDetail
    }
  }
  ${REPO_DETAIL}
`

export const CURRENT_USER = gql`
  {
    me {
      id
      username
    }
  }
`
