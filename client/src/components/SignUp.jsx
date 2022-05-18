import { View, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput"
import { Formik } from "formik"
import { Button, VStack } from "native-base"
import * as yup from "yup"
import { useNavigate } from "react-router-native"
import useCreateUser from "../hooks/useCreateUser"
import useSignIn from "../hooks/useSignIn"

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#fff",
  },
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "username is too short")
    .max(30, "username is too long")
    .required("username is required"),
  password: yup
    .string()
    .min(5, "password is too short")
    .max(50, "password is too long")
    .required("password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("please confirm password"),
})

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <VStack space={4}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" />
            <FormikTextInput
              name="passwordConfirm"
              placeholder="confirm password"
            />

            <Button onPress={handleSubmit}>Sign up</Button>
          </VStack>
        </View>
      )}
    </Formik>
  )
}

const SignUp = () => {
  const [addUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      await addUser({ username, password })
      await signIn({ username, password })
      navigate(`/`, {
        replace: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
