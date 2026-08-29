import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { BlogPost } from "@/types";

const COLLECTION_NAME = "blogs";
const blogsCol = collection(db, COLLECTION_NAME);

type FirestoreTimestampLike = {
  toMillis: () => number;
  toDate: () => Date;
};

const isFirestoreTimestampLike = (value: unknown): value is FirestoreTimestampLike => {
  return (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    "toDate" in value &&
    typeof (value as FirestoreTimestampLike).toMillis === "function" &&
    typeof (value as FirestoreTimestampLike).toDate === "function"
  );
};

export const getBlogs = async (onlyPublished = true): Promise<BlogPost[]> => {
  const q = onlyPublished
    ? query(blogsCol, where("published", "==", true))
    : query(blogsCol);

  const snapshot = await getDocs(q);
  const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));

  return blogs.sort((a, b) => {
    const aTime = isFirestoreTimestampLike(a.createdAt) ? a.createdAt.toMillis() : 0;
    const bTime = isFirestoreTimestampLike(b.createdAt) ? b.createdAt.toMillis() : 0;
    return bTime - aTime;
  });
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const q = query(blogsCol, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as BlogPost;
};

export const getBlogById = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as BlogPost;
};

export const createBlog = async (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
  return await addDoc(blogsCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateBlog = async (id: string, data: Partial<BlogPost>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteBlog = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
