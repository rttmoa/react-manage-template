import { useContext, createContext } from 'react'

import cart from './Cart'
import counter from './Counter'




class RootStore {
  cart = cart
  counter = counter
}
const store = new RootStore()
// console.log(cart) 		// 同下
// console.log(counter) // 同下
// RootStore: { cart: {list: 'list66666'}, counter: {increment: ƒ, incrementAsync: ƒ, decrement: ƒ, reset: ƒ, …} }



const Context = createContext(store)

export const useStore = () => {
  return useContext(Context)
}
