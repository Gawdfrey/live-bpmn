import { signIn, signOut, useSession } from "next-auth/react";

export default function Index() {
  function handleSignIn() {
    signIn("github");
  }
  function handleSignOut() {
    signOut();
  }
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <button onClick={handleSignIn}>clik</button>
      <button onClick={handleSignOut}>clik</button>
    </div>
  );
}

Index.auth = false;
