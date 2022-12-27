import { ClientSideSuspense } from "@liveblocks/react";
import BPMN from "components/BPMN";
import { DangerButton } from "components/Button";
import CancelIcon from "components/icons/CancelIcon";
import TitleSection from "components/TitleSection";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { prismaClient } from "utils/prismadb";
import { trpc } from "utils/trpc";
import Presence from "../../../components/Presence";
import { RoomProvider } from "../../../utils/liveblocks.config";

export default function Project({ id }: { id: string }) {
  const router = useRouter();

  const { data: project } = trpc.getProjectById.useQuery(id);

  const { mutate, isLoading } = trpc.deleteProjectById.useMutation({
    onSuccess() {
      router.push("/projects");
    },
  });
  const handleDelete = async () => {
    mutate(id);
  };

  return (
    <RoomProvider id={id} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => (
          <>
            <div className="container mx-auto flex flex-col gap-5 w-2/4 mt-10">
              <TitleSection text={project?.name!} />
              <div>
                <DangerButton isLoading={isLoading} onClick={handleDelete}>
                  <div>
                    <CancelIcon />
                  </div>
                  <span>Delete project</span>
                </DangerButton>
              </div>
              <Presence />
            </div>
            <BPMN />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params?.id === "string") {
    const id = parseInt(params!.id);
    const project = await prismaClient.project.findMany({
      where: {
        id,
      },
    });
    if (project.length < 1) return { notFound: true };
    return {
      props: {
        id: params!.id,
      },
    };
  }
  return {
    notFound: true,
  };
};

Project.auth = true;
