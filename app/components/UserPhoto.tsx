"use client";
import { useSession } from "next-auth/react";

export default function UserPhoto() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <img
      src={session.user?.image ?? ""}
      alt="Profile"
      className="w-5 h-5 mr-2 rounded-full"
    />
  );
}
