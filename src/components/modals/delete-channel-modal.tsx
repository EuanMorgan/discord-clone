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
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server, channel } = data;

  const isModalOpen = isOpen && type === "deleteChannel";

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onDeleteChannel = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
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
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-indigo-500">
              {channel ? `#${channel.name}` : "This channel"}
            </span>{" "}
            will be permenantly deleted.
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
              onClick={onDeleteChannel}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
