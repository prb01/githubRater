import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import { useEffect, useState } from "react"
import useRepositories from "../hooks/useRepositories"
import { enableExpoCliLogging } from "expo/build/logs/Logs"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories } = useRepositories()

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
    />
  )
}

export default RepositoryList

// const App = () => {
//   const renderItem = ({ item }) => (
//     <Item title={item.title} />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
