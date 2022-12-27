import * as RadixAvatar from "@radix-ui/react-avatar";

function getInitials(name: string) {
  if (!name) return "??";
  const [firstName, lastName] = name?.split(" ");
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function Avatar({ image, name }: { name: string; image: string }) {
  return (
    <RadixAvatar.Root>
      <RadixAvatar.Image
        src={image}
        alt={name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <RadixAvatar.Fallback className="rounded-full bg-purple-800 px-3 py-4 text-white">
        {getInitials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
