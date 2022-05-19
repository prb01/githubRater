import { View, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput"
import { Formik } from "formik"
import { Button, VStack } from "native-base"
import * as yup from "yup"
import { useNavigate } from "react-router-native"
import useCreateReview from "../hooks/useCreateReview"

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#fff",
  },
})

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository's owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating cannot be lower than 0")
    .max(100, "Rating cannot be higher than 100")
    .required("Rating is required"),
  text: yup.string(),
})

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        repositoryName: "",
        ownerName: "",
        rating: "",
        text: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <VStack space={4}>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner's username"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="text" placeholder="Review" multiline={true}/>
            <Button onPress={handleSubmit}>Create a review</Button>
          </VStack>
        </View>
      )}
    </Formik>
  )
}

const ReviewForm = () => {
  const [addReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const { data } = await addReview({
        repositoryName,
        ownerName,
        rating: Number(rating),
        text,
      })
      navigate(
        `/repositories/${ownerName.toLowerCase()}.${repositoryName.toLowerCase()}`,
        {
          replace: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  return <ReviewFormContainer onSubmit={onSubmit} />
}

export default ReviewForm
