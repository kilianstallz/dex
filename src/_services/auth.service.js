import { auth, firestore } from '../firebaseConfig'

export const authService = {
  // Login with email & password
  async loginWithForm (email, password) {
    try {
      const firebaseUser = auth.signInWithEmailAndPassword(email, password)
      return firebaseUser
    } catch (e) {
      console.error(e)
      return e
    }
  }
}
