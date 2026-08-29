import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ContactMessage } from "@/types";

const COLLECTION_NAME = "contactMessages";
const messagesCol = collection(db, COLLECTION_NAME);

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const q = query(messagesCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage));
};

export const createContactMessage = async (data: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
  return await addDoc(messagesCol, {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
};

export const markMessageAsRead = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, { read: true });
};

export const deleteMessage = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
