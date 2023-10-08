"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import useIsMounted from "@/hooks/useIsMounted";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import ManageMembersModal from "@/components/modals/manage-members-modal";
import CreateChannelModal from "@/components/modals/create-channel-modal";
import LeaveServerModal from "@/components/modals/leave-server-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import EditChannelModal from "@/components/modals/edit-channel-modal";

// Render all modals here
const ModalProvider = () => {
  const isMounted = useIsMounted();

  // Don't show modals on the server
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};

export default ModalProvider;
