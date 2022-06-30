import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firestoreConfig = {
  apiKey: 'AIzaSyDMYhFM5yODPij3oQWBJ517ODIZhRfQA6I',
  authDomain: 'vuexslack-77956.firebaseapp.com',
  projectId: 'vuexslack-77956',
  storageBucket: 'vuexslack-77956.appspot.com',
  messagingSenderId: '11597921230',
  appId: '1:11597921230:web:c4b647b42083c75683099f'
}

const app = initializeApp(firestoreConfig)
const db = getFirestore(app)
const auth = getAuth(app)

auth.languageCode = 'fr'

export { auth, db }
