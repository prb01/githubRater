import { TextInput as NativeTextInput, StyleSheet } from "react-native"
import {
  Input,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
} from "native-base"
import { useState } from "react"

const styles = StyleSheet.create({
  textInput: {
    marginTop: 5,
    marginBottom: 5,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style]
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  if (props.name === "password") {
    return (
      <FormControl isInvalid={error}>
        <Input
          {...props}
          variant="underlined"
          type={show ? "text" : "password"}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              onPress={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          }
        />
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {error}
        </FormControl.ErrorMessage>
      </FormControl>
    )
  }

  return (
    <FormControl isInvalid={error}>
      <Input variant="underlined" style={textInputStyle} {...props} />
      <FormControl.ErrorMessage
        leftIcon={<WarningOutlineIcon size="xs" />}
      >{error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default TextInput
