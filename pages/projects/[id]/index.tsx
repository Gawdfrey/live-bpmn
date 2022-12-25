import { ClientSideSuspense } from "@liveblocks/react";
import type { GetServerSideProps } from "next";
import { prismaClient } from "utils/prismadb";
import Presence from "../../../components/Presence";
import { RoomProvider } from "../../../utils/liveblocks.config";

export default function Project({ id }: { id: string }) {
  return (
    <RoomProvider id={id} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => (
          <div>
            <p>Room</p>
            <Presence />
          </div>
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
