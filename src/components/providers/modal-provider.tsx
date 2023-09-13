"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import useIsMounted from "@/hooks/useIsMounted";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import ManageMembersModal from "../modals/manage-members-modal";
import CreateChannelModal from "../modals/create-channel-modal";

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
    </>
  );
};

export default ModalProvider;
