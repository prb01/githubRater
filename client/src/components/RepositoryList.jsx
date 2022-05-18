import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import { Select, CheckIcon, CircularProgress } from "native-base"
import { useState } from "react"
import theme from "../theme"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export const ItemSeparator = () => <View style={styles.separator} />

const SortingMenu = ({ sortMethod, setSortMethod }) => {
  return (
    <Select
      selectedValue={sortMethod}
      mx={{
        base: 0,
      }}
      p="2"
      fontSize={theme.fontSizes.body}
      onValueChange={(value) => setSortMethod(value)}
      _selectedItem={{
        bg: theme.colors.accent,
        endIcon: <CheckIcon size={5} />,
      }}
      placeholder="SortBy"
      accessibilityLabel="Select a sorting method"
    >
      <Select.Item label="None" value={null} />
      <Select.Item
        label="Latest repositories"
        value='{"orderBy": "CREATED_AT", "orderDirection": "DESC"}'
      />
      <Select.Item
        label="Highest rated repositories"
        value='{"orderBy": "RATING_AVERAGE", "orderDirection": "DESC"}'
      />
      <Select.Item
        label="Lowest rated repositories"
        value='{"orderBy": "RATING_AVERAGE", "orderDirection": "ASC"}'
      />
    </Select>
  )
}

export const RepositoryListContainer = ({
  repositories,
  sortMethod,
  setSortMethod,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const renderItem = ({ item }) => <RepositoryItem item={item} />

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <SortingMenu
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      )}
    />
  )
}

const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState("")
  const { repositories } = useRepositories(sortMethod)

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortMethod={sortMethod}
      setSortMethod={setSortMethod}
    />
  )
}

export default RepositoryList
