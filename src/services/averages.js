import { collection, getDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from 'src/db/firebase';

export const getAverages = async () => {
  let averages = [];
  const docs = await getDocs(collection(db, 'averages'));

  docs.forEach((doc) => {
    const data = doc.data();
    averages.push({
      id: doc.id,
      ...data
    });
  });

  return averages;
}

export const saveAverages = async (list = []) => {
  try {
    const collectionRef = collection(db, 'averages');

    await Promise.all(list.map((data) => {
      const { id, ...docData } = data;

      const docRef = doc(collectionRef, `${id}`);

      return setDoc(docRef, docData);
    }));
  } catch(error) {
    return ({ message: 'Error when saving information in the database', error });
  }
}
