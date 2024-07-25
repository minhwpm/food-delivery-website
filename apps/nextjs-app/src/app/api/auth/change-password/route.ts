import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@open-foody/utils";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" });
  }
  try {
    const userQuery = query(collection(firestoreDb, "users"), where("email", "==", session.user.email));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const isPasswordValid = await bcrypt.compare(currentPassword, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 403 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateDoc(userDoc.ref, { password: hashedPassword });
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}