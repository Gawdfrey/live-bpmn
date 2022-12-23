import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const { NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY } = process.env;

const client = createClient({
  publicApiKey:
    "pk_dev_0zrYPINchhcKquTwDZTjEd4jq9MXCNbVmqGH9EtM9BZvidlNcVv4-4rXc39b-CCV",
});

export const { RoomProvider, useOthers, useUpdateMyPresence } =
  createRoomContext(client);
