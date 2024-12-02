// src/store/auth.js
import { reactive } from 'vue'

export const authState = reactive({
  isAuthenticated: false,
})

export function setAuthenticated(value) {
  authState.isAuthenticated = value
}
