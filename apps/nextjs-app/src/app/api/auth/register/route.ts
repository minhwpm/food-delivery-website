import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const user = await req.json();
  const { firestoreAdmin } = await import('@open-foody/utils/src/firebase/firebaseAdmin');
  const usersRef = firestoreAdmin.collection("users")
  const userSnapshot = await usersRef.where("email", "==", user.email).get();

  if (!userSnapshot.empty) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const passwordHash = await bcrypt.hash(user.password, 10);

  usersRef.add({
    email: user.email,
    password: passwordHash,
  });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
