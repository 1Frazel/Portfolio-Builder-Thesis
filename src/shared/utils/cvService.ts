import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { firestore, auth } from "./firebase";
import type { FormData } from "../hooks/useFormData";

export interface CVDocument {
  resumeId: string;
  userId: string;
  title: string;
  template: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  index?: number;
  data: FormData;
}

export async function ensureUserDocument(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userRef = doc(firestore, "users", user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
}

export async function saveCV(
  title: string,
  template: string,
  formData: FormData,
  resumeId?: string,
): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  if (!title || !title.trim()) throw new Error("CV title cannot be empty");
  if (!template) throw new Error("Template is required");

  const cvRef = resumeId
    ? doc(firestore, "resumes", resumeId)
    : doc(collection(firestore, "resumes"));

  const now = Timestamp.now();

  const cvData: Partial<CVDocument> = {
    userId: user.uid,
    title: title.trim(),
    template,
    data: formData,
    updatedAt: now,
  };

  if (!resumeId) {
    cvData.createdAt = now;
    cvData.index = 0;
  }

  try {
    await setDoc(cvRef, cvData, { merge: true });
    return cvRef.id;
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Failed to save CV: ${err.message}`);
    throw err;
  }
}

export async function getCV(resumeId: string): Promise<CVDocument> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  try {
    const cvRef = doc(firestore, "resumes", resumeId);
    const snapshot = await getDoc(cvRef);
    if (!snapshot.exists()) throw new Error("CV not found");

    const data = snapshot.data() as Omit<CVDocument, "resumeId">;
    if (data.userId !== user.uid)
      throw new Error("You don't have permission to view this CV");

    return { resumeId, ...data } as CVDocument;
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Failed to load CV: ${err.message}`);
    throw err;
  }
}

export async function getUserCVs(): Promise<CVDocument[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const q = query(
    collection(firestore, "resumes"),
    where("userId", "==", user.uid),
    orderBy("updatedAt", "desc"),
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      resumeId: d.id,
      ...(d.data() as Omit<CVDocument, "resumeId">),
    })) as CVDocument[];
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Failed to load CVs: ${err.message}`);
    throw err;
  }
}

export async function deleteCV(resumeId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const cvRef = doc(firestore, "resumes", resumeId);
  try {
    const snapshot = await getDoc(cvRef);
    if (!snapshot.exists()) throw new Error("CV not found");

    const data = snapshot.data() as Omit<CVDocument, "resumeId">;
    if (data.userId !== user.uid)
      throw new Error("You don't have permission to delete this CV");

    await deleteDoc(cvRef);
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Failed to delete CV: ${err.message}`);
    throw err;
  }
}

export default {
  ensureUserDocument,
  saveCV,
  getCV,
  getUserCVs,
  deleteCV,
};
