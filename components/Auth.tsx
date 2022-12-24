import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { isAfter } from "date-fns";

export function Auth({ children }: { children: JSX.Element }): JSX.Element {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const isUser = session?.user;
  const sessionHasExpired = isAfter(new Date(), new Date(session?.expires!));

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!isUser || sessionHasExpired) {
      signIn("github");
    }
  }, [isUser, loading, sessionHasExpired]);

  if (isUser) {
    return children;
  }

  return <div>Loading...</div>;
}
