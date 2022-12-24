import { useSession } from "next-auth/react";

export default function Index() {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <p>home</p>
    </div>
  );
}

Index.auth = false;
