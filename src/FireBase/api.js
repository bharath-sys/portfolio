import db from './main.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const fetchDataByCondition = async (params) => {
    const collectionRef = collection(db, params?.collection);
    const dbquery = query(collectionRef, where("page", "==", params?.page));

    try {
        const snapShot = await getDocs(dbquery);
        const newData = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return newData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
