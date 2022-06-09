import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
/* TODO: Add SDKs for Firebase products that you want to use
 * https://firebase.google.com/docs/web/setup#available-libraries
 */

/* Your web app's Firebase configuration */
const firebaseConfig = {
  apiKey: 'AIzaSyDMYhFM5yODPij3oQWBJ517ODIZhRfQA6I',
  authDomain: 'vuexslack-77956.firebaseapp.com',
  projectId: 'vuexslack-77956',
  storageBucket: 'vuexslack-77956.appspot.com',
  messagingSenderId: '11597921230',
  appId: '1:11597921230:web:c4b647b42083c75683099f'
}

/* Initialize Firebase */
const firebaseApp = initializeApp(firebaseConfig)
/* Initialize auth */
const authInstance = getAuth(firebaseApp)
authInstance.languageCode = 'fr'

export { authInstance, firebaseApp }
