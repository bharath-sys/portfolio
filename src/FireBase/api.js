import db from '../FireBase/main.js'
import { collection, onSnapshot } from 'firebase/firestore';
export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(collection(db, 'PersonalDetails'), (snapShot) => {
            const newData = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(newData);
            resolve(newData);
        }, error => {
            reject(error);
        });

        // Cleanup function to unsubscribe from snapshot listener
        return () => unsubscribe();
    });
}

