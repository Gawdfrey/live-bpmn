// @ts-nocheck
import Image from "next/image";
import { useOthers } from "../utils/liveblocks.config";

export default function Presence() {
  const others = useOthers();
  console.log(others);
  return (
    <div>
      <p>{`There are ${others?.length} user(s) present`}</p>
      {others?.map((other) => (
        <div key={other.connectionId}>
          <Image
            width={50}
            height={50}
            src={other?.info?.image}
            className="rounded-full"
          />
          <p>{other?.info?.name}</p>
        </div>
      ))}
    </div>
  );
}
