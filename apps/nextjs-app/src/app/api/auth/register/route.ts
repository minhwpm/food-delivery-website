import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestoreDb } from "@open-foody/utils";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const user = await req.json();

  const usersRef = collection(firestoreDb, "users")
  const userQuery = query(usersRef, where("email", "==", user.email));
  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(user.password, 10)

  await addDoc(usersRef, {
    email: user.email,
    password: passwordHash,
  })

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
