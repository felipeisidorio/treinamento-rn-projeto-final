
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseCredential } from "../../env/env";

const firebaseConfig = firebaseCredential;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);

export async function getClientsAll() {

  const clientsCol = collection(db, 'Clients');

  const clientsSnapshot = await getDocs(clientsCol);
  const clientList = clientsSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
  return clientList;
}
export async function getClient(id: string) {

  const docRef = doc(db, 'Clients', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
  return {};
}

export async function authSignIn(email: string, password: string) {
  const auth = getAuth();
  return new Promise((resolve, _) => {
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        resolve(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        resolve(false)
      });
  })
}

export function authSignOut() {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log('Sign-out successful');
  }).catch((error) => {
    console.log('An error happened.', error);
  });
}
export function createUser( email: string, password: string) {
  const auth = getAuth();
   createUserWithEmailAndPassword(auth, email, password).then(() => {
    console.log('createUserWithEmailAndPassword successful');
  }).catch((error) => {
    console.log(' createUserWithEmailAndPassword An error happened.', error);
  });
}