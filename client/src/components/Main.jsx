import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"
import AppBar from "./AppBar"
import MyReviews from "./MyReviews"
import { SingleRepository } from "./RepositoryItem"
import RepositoryList from "./RepositoryList"
import ReviewForm from "./ReviewForm"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
})

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/review" element={<ReviewForm />} exact />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/me/reviews" element={<MyReviews />} />
          <Route
            path="/repositories/:repositoryId"
            element={<SingleRepository />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  )
}

export default Main
