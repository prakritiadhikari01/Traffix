import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig"; // adjust this path to your actual config
import { doc, onSnapshot } from "firebase/firestore";

/**
 * Hook to get real-time green direction from Firestore.
 */
export function useGreenDirection() {
  const [greenDirection, setGreenDirection] = useState<string>("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "traffic_status", "current"), (docSnap) => {
      if (docSnap.exists()) {
        setGreenDirection(docSnap.data().direction);
      }
    });

    return () => unsub();
  }, []);

  return greenDirection;
}
