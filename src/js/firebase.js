import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDMYhFM5yODPij3oQWBJ517ODIZhRfQA6I',
  authDomain: 'vuexslack-77956.firebaseapp.com',
  databaseURL:
    'https://vuexslack-77956-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vuexslack-77956',
  storageBucket: 'vuexslack-77956.appspot.com',
  messagingSenderId: '11597921230',
  appId: '1:11597921230:web:c4b647b42083c75683099f'
}

const app = initializeApp(firebaseConfig)
/* firebasedb is used to store users */
const firebasedb = getDatabase(app)
/* firestoredb is used to store channels and messages */
const firestoredb = getFirestore(app)
/* firebase storage to store */
const firebaseStorage = getStorage(app)

const auth = getAuth(app)
auth.languageCode = 'fr'

export { auth, firebasedb, firebaseStorage, firestoredb }
