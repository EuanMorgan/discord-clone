"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  LucideIcon,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";
import { useModal } from "@/hooks/useModalStore";

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownOption
            Icon={UserPlus}
            label="Invite People"
            onClick={() => {
              onOpen("invite", { server });
            }}
            variant={"indigo"}
          />
        )}

        {isAdmin && (
          <DropdownOption
            Icon={Settings}
            label="Server Settings"
            onClick={() => {
              onOpen("editServer", { server });
            }}
          />
        )}

        {isAdmin && (
          <DropdownOption
            Icon={Users}
            label="Manage Members"
            onClick={() => {
              onOpen("members", { server });
            }}
          />
        )}

        {isModerator && (
          <DropdownOption
            Icon={PlusCircle}
            label="Create Channel"
            onClick={() => {
              onOpen("createChannel", { server });
            }}
          />
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownOption
            Icon={Trash}
            label="Delete Server"
            onClick={() => {
              onOpen("deleteServer", { server });
            }}
            variant="destructive"
          />
        )}

        {!isAdmin && (
          <DropdownOption
            Icon={LogOut}
            label="Leave Server"
            onClick={() => {
              onOpen("leaveServer", { server });
            }}
            variant="destructive"
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const optionVariants = cva("cursor-pointer px-3 py-2 text-sm", {
  variants: {
    variant: {
      default: "",
      indigo: "text-indigo-600 dark:text-indigo-400",
      destructive: "text-rose-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const DropdownOption = ({
  Icon,
  label,
  onClick,
  variant,
}: {
  Icon: LucideIcon;
  label: string;
  onClick: () => void;
} & VariantProps<typeof optionVariants>) => {
  return (
    <DropdownMenuItem
      className={optionVariants({
        variant,
      })}
      onClick={onClick}
    >
      {label}
      <Icon className="ml-auto h-4 w-4" />
    </DropdownMenuItem>
  );
};

export default ServerHeader;
