import { DangerButton } from "components/Button";
import type { GetServerSideProps } from "next";
import { prismaClient } from "utils/prismadb";
import { trpc } from "utils/trpc";

export default function Profile({ id }: { id: string }) {
  const { mutate } = trpc.deleteById.useMutation();
  const handleDelete = async () => {
    mutate(id);
  };
  return (
    <div>
      <h1>Profile</h1>
      {/* <DangerButton onClick={handleDelete}>Delete my profile</DangerButton> */}
    </div>
  );
}

Profile.auth = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  if (typeof id === "string") {
    const profile = await prismaClient.user.findMany({
      where: {
        id,
      },
    });
    if (profile.length < 1) return { notFound: true };
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
