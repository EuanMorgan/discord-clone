'use client';

import CreateServerModal from '@/components/modals/create-server-modal';
import useIsMounted from '@/hooks/useIsMounted';

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
    </>
  );
};

export default ModalProvider;
