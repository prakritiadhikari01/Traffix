import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getLatestTrafficData() {
  const directions = ["north", "south", "east", "west"];
  const results = {};

  for (const dir of directions) {
    const q = query(
      collection(db, "traffic_data"),
      where("direction", "==", dir),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      results[dir] = doc.data();
    });
  }

  return results;
}
