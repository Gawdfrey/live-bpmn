import { signIn, signOut } from "next-auth/react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  function handleSignIn() {
    signIn("github");
  }
  function handleSignOut() {
    signOut();
  }
  return (
    <div>
      <button onClick={handleSignIn}>clik</button>
      <button onClick={handleSignOut}>clik</button>
    </div>
  );
}
