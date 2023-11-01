"use client";
import Image from "next/image";
import { Dialog, DialogContent } from "@/_components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { Form1 } from "./_components";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasLogin, setHasLogin] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/");
    }
    return;
  };
  useEffect(() => {
    setHasLogin(pathname.includes("login"));
  }, [pathname]);
  
  return (
    <Dialog defaultOpen open={hasLogin} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="flex h-full w-full max-w-none items-center justify-center rounded-none sm:max-h-[650px] sm:max-w-[600px] sm:rounded-sm ">
        <Image
          src="/x-icon.svg"
          alt="x-icon"
          width={32}
          height={32}
          className="absolute left-1/2 top-4 -translate-x-1/2"
        />
        <div className="h-full w-[min(364px,100%)] px-8 py-10">
          <Form1 />
        </div>
      </DialogContent>
    </Dialog>
  );
}
