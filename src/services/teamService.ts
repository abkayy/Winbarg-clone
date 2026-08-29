import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { TeamMember } from "@/types";

const COLLECTION_NAME = "teamMembers";
const teamCol = collection(db, COLLECTION_NAME);

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const q = query(teamCol, orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
};

export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as TeamMember;
};

export const createTeamMember = async (data: Omit<TeamMember, "id">) => {
  return await addDoc(teamCol, data);
};

export const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

export const deleteTeamMember = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
