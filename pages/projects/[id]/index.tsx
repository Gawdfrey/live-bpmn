import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import BPMN from "components/flow/BPMN";
import type { GetServerSideProps } from "next";
import { NodeTypes } from "types/Flow";
import { prismaClient } from "utils/prismadb";
import { trpc } from "utils/trpc";
import { RoomProvider } from "../../../utils/liveblocks.config";

export default function Project({ id }: { id: string }) {
  const { data: project } = trpc.getProjectById.useQuery(id);
  return (
    <RoomProvider
      id={id}
      initialPresence={{ cursor: null }}
      initialStorage={() => ({
        nodes: new LiveList([
          {
            id: "1",
            type: NodeTypes.EVENT,
            data: {
              label: "Start",
            },
            position: {
              x: 0,
              y: 0,
            },
          },
        ]),
      })}
    >
      <ClientSideSuspense fallback={<div>...loading</div>}>
        {() => <BPMN name={project?.name!} projectId={id} />}
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
Project.renderFooter = false;
Project.renderHeader = false;
