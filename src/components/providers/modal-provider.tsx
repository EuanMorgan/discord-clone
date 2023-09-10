"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import useIsMounted from "@/hooks/useIsMounted";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";

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
    </>
  );
};

export default ModalProvider;
