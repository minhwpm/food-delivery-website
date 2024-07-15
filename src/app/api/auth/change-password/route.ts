import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestoreDb } from "@/app/firebaseConfig";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json();

  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthenticated'},
      { status: 401 }
    )
  }

}
