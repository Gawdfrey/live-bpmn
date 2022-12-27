import { PrimaryButton } from "components/Button";
import CreateProject from "components/CreateProject";
import PlusIcon from "components/icons/PlusIcon";
import Loading from "components/Loading";
import Modal from "components/Modal";
import TitleSection from "components/TitleSection";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "utils/trpc";

export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: projects, isFetching } = trpc.getAllProjects.useQuery(userId!);

  return (
    <>
      <div className="container mx-auto flex flex-col gap-5 w-2/4 mt-10">
        <TitleSection text="Projects" />
        <ul className="mt-10">
          <li className="border-b border-b-gray-300 flex justify-between mb-5 px-2 text-sm">
            <span>Name</span>
            <span>Created</span>
          </li>
          {!isFetching ? (
            projects?.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="flex justify-between hover:bg-purple-50 p-2 rounded-md"
                >
                  <span>{project.name}</span>
                  <span>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <Loading />
          )}
        </ul>
        <div className="mt-20">
          <PrimaryButton onClick={() => setShowModal(true)} type="button">
            <div>
              <PlusIcon />
            </div>
            <span>Create new</span>
          </PrimaryButton>
        </div>
      </div>
      <Modal
        title="Create new project"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <CreateProject />
      </Modal>
    </>
  );
}

Projects.auth = true;
