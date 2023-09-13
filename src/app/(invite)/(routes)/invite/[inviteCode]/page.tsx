import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({
  params: { inviteCode },
}: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingMember = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingMember) {
    return redirect(`/servers/${existingMember.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return notFound();
};

export default InviteCodePage;
