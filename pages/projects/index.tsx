import { PrimaryButton } from "components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "utils/trpc";

export default function Projects() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: projects, isFetching } = trpc.getAllProjects.useQuery(userId!);

  const mutation = trpc.createProject.useMutation();

  const handleCreate = async () => {
    await mutation.mutateAsync({
      name: "New project",
      user: userId!,
    });
  };

  if (isFetching) return <div>Loading...</div>;
  return (
    <div>
      <h1>Projects</h1>
      {/* <PrimaryButton onClick={handleCreate}>Create new</PrimaryButton> */}
      <ul>
        {projects?.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Projects.auth = true;
