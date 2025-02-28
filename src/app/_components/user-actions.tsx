"use client";

import { Button } from "~/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOutIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";

export default function UserActions() {
  const router = useRouter();
  const { data: admin } = api.admin.me.useQuery();

  const avatarName = admin?.name.split(" ").map((name) => name[0]).join("");

  return (
    <div className="flex items-center gap-2 w-full justify-between">
      <Avatar>
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      <div>
        <Button variant={"ghost"} size={"icon"}>
          <SettingsIcon className="h-4 w-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={() => {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }}>
          <LogOutIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}