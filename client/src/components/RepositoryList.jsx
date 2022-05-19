import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import { Select, CheckIcon, Input, Icon, VStack } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import theme from "../theme"
import { useDebouncedCallback } from "use-debounce"
import React from "react"
import ItemSeparator from "./ItemSeparator"



export const SearchBar = ({ search, setSearch }) => {
  const [text, setText] = useState("")
  const debounced = useDebouncedCallback((value) => {
    setSearch(value)
  }, 300)

  return (
    <VStack w="95%" p="2" space={5} alignSelf="center">
      <Input
        placeholder="Filter repositories"
        width="100%"
        borderRadius="10"
        variant="filled"
        py="2"
        px="1"
        fontSize="14"
        value={text}
        onChangeText={(text) => {
          setText(text)
          debounced(text)
        }}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
    </VStack>
  )
}

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

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props

    return (
      <>
        <SearchBar search={props.search} setSearch={props.setSearch} />
        <SortingMenu
          sortMethod={props.sortMethod}
          setSortMethod={props.setSortMethod}
        />
      </>
    )
  }

  render() {
    const props = this.props

    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : []

    const renderItem = ({ item }) => <RepositoryItem item={item} />

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState("")
  const [search, setSearch] = useState("")
  const sortVariables = sortMethod ? JSON.parse(sortMethod) : null
  const searchVariable = { searchKeyword: search }
  const variables = { first: 5, ...sortVariables, ...searchVariable }
  const { repositories, fetchMore } = useRepositories(variables)

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortMethod={sortMethod}
      setSortMethod={setSortMethod}
      search={search}
      setSearch={setSearch}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
