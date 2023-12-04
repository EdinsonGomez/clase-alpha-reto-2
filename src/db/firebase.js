import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmBZQslPtktu82avzMvpRmTK2XtNB9dKg",
  authDomain: "clase-alpha-reto.firebaseapp.com",
  projectId: "clase-alpha-reto",
  storageBucket: "clase-alpha-reto.appspot.com",
  messagingSenderId: "174661011643",
  appId: "1:174661011643:web:c69024ac48b7cd90f0c19e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
