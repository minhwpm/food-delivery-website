import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestoreDb } from "@/app/firebaseConfig";

export async function POST(req: NextRequest) {
  const user = await req.json();

  const usersRef = collection(firestoreDb, "users");
  const q = query(usersRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  await addDoc(usersRef, {
    email: user.email,
    password: user.password,
  })

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
