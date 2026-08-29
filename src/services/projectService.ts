import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { Project } from "@/types";

const COLLECTION_NAME = "projects";
const projectsCol = collection(db, COLLECTION_NAME);

export const getProjects = async (): Promise<Project[]> => {
  // Ideally, you'd add a createdAt field and order by it, but for now we just get all
  const snapshot = await getDocs(projectsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Project;
};

export const createProject = async (data: Omit<Project, "id">) => {
  return await addDoc(projectsCol, data);
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

export const deleteProject = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
