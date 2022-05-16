import { View, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput"
import { Formik } from "formik"
import { Button, VStack } from "native-base"

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <VStack space={4}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput
              name="password"
              placeholder="password"
            />
            <Button onPress={handleSubmit}>Login</Button>
          </VStack>
        </View>
      )}
    </Formik>
  )
}

export default SignIn
