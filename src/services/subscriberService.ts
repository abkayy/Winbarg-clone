import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export interface Subscriber {
  id: string;
  email: string;
  createdAt: unknown;
}

const COLLECTION_NAME = "subscribers";
const subscribersCol = collection(db, COLLECTION_NAME);

export const addSubscriber = async (email: string): Promise<void> => {
  await addDoc(subscribersCol, {
    email: email.toLowerCase().trim(),
    createdAt: serverTimestamp(),
  });
};

export const getSubscribers = async (): Promise<Subscriber[]> => {
  const q = query(subscribersCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Subscriber));
};

export const deleteSubscriber = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};
