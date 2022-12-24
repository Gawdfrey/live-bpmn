import type { GetServerSideProps } from "next";
import { prismaClient } from "utils/prismadb";

export default function Profile({ id }: { id: string }) {
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={console.log}>Delete me</button>
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
