import { DangerButton } from "components/Button";
import CancelIcon from "components/icons/CancelIcon";
import TitleSection from "components/TitleSection";
import type { GetServerSideProps } from "next";
import { prismaClient } from "utils/prismadb";
import { trpc } from "utils/trpc";

export default function Profile({ id }: { id: string }) {
  const { mutate, isLoading } = trpc.deleteById.useMutation();
  const handleDelete = async () => {
    mutate(id);
  };
  return (
    <div className="container mx-auto flex flex-col gap-5 w-2/4 mt-10">
      <TitleSection text="Profile" />
      <div>
        <DangerButton isLoading={isLoading} onClick={handleDelete}>
          <div>
            <CancelIcon />
          </div>
          <span>Delete me</span>
        </DangerButton>
      </div>
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
