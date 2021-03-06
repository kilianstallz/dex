import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDnaSvb2H8_EXMCf36_MqgAQmyQYhj9M1s',
  authDomain: 'dex-flashcards.firebaseapp.com',
  databaseURL: 'https://dex-flashcards.firebaseio.com',
  projectId: 'dex-flashcards',
  storageBucket: 'dex-flashcards.appspot.com',
  messagingSenderId: '449719371197'
}
firebase.initializeApp(config)

firebase.firestore().enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })
const auth = firebase.auth()
const db = firebase.firestore()
const currentUser = auth.currentUser
// eslint-disable-next-line
const timestamp = firebase.firestore.Timestamp.now()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const usersCollection = db.collection('users')
const stacksCollection = db.collection('stacks')
const listsCollection = db.collection('lists')
const decksCollection = db.collection('decks')
const notesCollection = db.collection('notes')

export {
  db,
  auth,
  timestamp,
  googleAuthProvider,
  currentUser,
  usersCollection,
  listsCollection,
  stacksCollection,
  decksCollection,
  notesCollection
}
