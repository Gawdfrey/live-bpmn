import { ClientSideSuspense } from "@liveblocks/react";
import type { GetServerSideProps } from "next";
import Presence from "../../../components/Presence";
import { RoomProvider } from "../../../utils/liveblocks.config";

export default function Room({ id }: { id: string }) {
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
  return {
    props: {
      id: params!.id,
    },
  };
};
