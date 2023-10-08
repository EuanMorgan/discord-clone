"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === "leaveServer";

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onLeaveServer = async () => {
    try {
      setIsLoading(true);
      axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server ? server.name : " this server"}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              disabled={isLoading}
              onClick={onLeaveServer}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;