import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "./Avatar";

const links = [{ href: "/projects", label: "Projects" }];

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between bg-purple-500 text-white py-5 px-10">
      <Link className="my-auto" href="/">
        Live BPMN
      </Link>
      <nav className="flex gap-10">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="my-auto">
            {label}
          </Link>
        ))}
        {session ? (
          <Link href={`/profile/${session.user?.id}`}>
            <Avatar name={session.user?.name!} image={session.user?.image!} />
          </Link>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
