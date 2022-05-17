import AsyncStorage from "@react-native-async-storage/async-storage"

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    )

    return accessToken ? JSON.parse(accessToken) : []
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken)
    )
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
  }
}

export default AuthStorage

// const doShopping = async () => {
//   const shoppingCartA = new ShoppingCartStorage("shoppingCartA")
//   const shoppingCartB = new ShoppingCartStorage("shoppingCartB")

//   await shoppingCartA.addProduct("chips")
//   await shoppingCartA.addProduct("soda")

//   await shoppingCartB.addProduct("milk")

//   const productsA = await shoppingCartA.getProducts()
//   const productsB = await shoppingCartB.getProducts()

//   console.log(productsA, productsB)

//   await shoppingCartA.clearProducts()
//   await shoppingCartB.clearProducts()
// }

// doShopping()
