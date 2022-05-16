import { TextInput as NativeTextInput, StyleSheet } from "react-native"
import { Input, Box, Button } from "native-base"
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
      <Box alignItems="center">
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
      </Box>
    )
  }

  return <Input variant="underlined" style={textInputStyle} {...props} />
}

export default TextInput
