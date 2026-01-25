import { db } from "../firebase";
import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  get,
} from "firebase/database";

import type { Nanny, FirebaseNanny } from "../types/nanny";

export async function fetchNannies(firstKey?: string | null) {
  const nanniesRef = ref(db, "nannies");

  let q;

  if (!firstKey) {
    // Перші 3 записи
    q = query(nanniesRef, orderByKey(), limitToFirst(3));
  } else {
    // Наступні 3 після останнього ключа
    q = query(nanniesRef, orderByKey(), startAfter(firstKey), limitToFirst(3));
  }

  const snapshot = await get(q);

  if (!snapshot.exists()) return { items: [], lastKey: null };

  const data = snapshot.val();

  const items: Nanny[] = Object.entries(data).map(([firebaseId, nanny]) => ({
    id: firebaseId,
    ...(nanny as FirebaseNanny),
  }));

  const lastKey = Object.keys(data).pop() ?? null;

  return { items, lastKey };
}
