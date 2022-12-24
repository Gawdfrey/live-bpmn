import { signIn } from "next-auth/react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  function handleSignIn() {
    signIn("github");
  }
  return (
    <div>
      <button onClick={handleSignIn}>clik</button>
    </div>
  );
}
