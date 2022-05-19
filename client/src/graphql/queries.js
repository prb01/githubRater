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

const REVIEW_DETAIL = gql`
  fragment ReviewDetail on Review {
    id
    repositoryId
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      totalCount
      edges {
        node {
          ...RepoDetail
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPO_DETAIL}
`

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepoDetail
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetail
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${REPO_DETAIL}
  ${REVIEW_DETAIL}
`

export const CURRENT_USER = gql`
  query Me($first: Int, $after: String, $includeReviews: Boolean = false) {
    me {
      id
      username
      reviewCount
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
           ...ReviewDetail
          }
        }
      }
    }
  }
  ${REVIEW_DETAIL}
`
