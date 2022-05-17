import { View, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput"
import { Formik } from "formik"
import { Button, VStack } from "native-base"
import * as yup from "yup"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <VStack space={4}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" />
            <Button onPress={handleSubmit}>Login</Button>
          </VStack>
        </View>
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password })
      navigate("/", { replace: true })
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
