import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SiteStats } from "@/types/index";

const SETTINGS_COLLECTION = "settings";
const SITE_STATS_DOC = "site_stats";

/**
 * Retrieves the site statistics from Firestore.
 * If the document doesn't exist, it returns a default set of statistics.
 */
export const getSiteStats = async (): Promise<SiteStats> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_STATS_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as SiteStats;
    } else {
      // Default values if document does not exist yet
      return {
        projectsCompleted: "50+",
        happyFamilies: "200+",
        awardsWon: "15+",
        yearFounded: "2022",
      };
    }
  } catch (error) {
    console.error("Error fetching site stats:", error);
    // Return defaults on error to avoid breaking the UI
    return {
      projectsCompleted: "50+",
      happyFamilies: "200+",
      awardsWon: "15+",
      yearFounded: "2022",
    };
  }
};

/**
 * Updates the site statistics in Firestore.
 */
export const updateSiteStats = async (stats: SiteStats): Promise<void> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_STATS_DOC);
    // Use setDoc with merge: true or just setDoc to overwrite since it's exactly these fields
    await setDoc(docRef, stats);
  } catch (error) {
    console.error("Error updating site stats:", error);
    throw error;
  }
};
