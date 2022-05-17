import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { SignInContainer } from "../components/SignIn"
import { NativeBaseProvider } from "native-base"

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn()
      const inset = {
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }
      const { getByPlaceholderText, getByText } = render(
        <NativeBaseProvider initialWindowMetrics={inset}>
          <SignInContainer onSubmit={onSubmit} />
        </NativeBaseProvider>
      )

      fireEvent.changeText(getByPlaceholderText("username"), "kalle")
      fireEvent.changeText(getByPlaceholderText("password"), "password")
      fireEvent.press(getByText("Login"))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        })
      })
    })
  })
})
