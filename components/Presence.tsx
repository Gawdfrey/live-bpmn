import { useOthers } from "../utils/liveblocks.config";
import { Avatar } from "./Avatar";

export default function Presence() {
  const others = useOthers();
  return (
    <div className="flex gap-3 w-24">
      {others?.map((other) => {
        // @ts-ignore
        const name = other.info?.name;
        // @ts-ignore
        const image = other.info?.image;
        return <Avatar key={other.connectionId} name={name} image={image} />;
      })}
    </div>
  );
}
