import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import { useEffect, useState } from "react"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [repositories, setRepositories] = useState()

  const fetchRepositories = async () => {
    const response = await fetch(
      "http://192.168.186.82:5000/api/repositories"
    )
    const json = await response.json()

    console.log(json)

    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

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
