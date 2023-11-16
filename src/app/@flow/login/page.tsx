"use client";
import Image from "next/image";
import { Dialog, DialogContent } from "@/_components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { Form1, Form2 } from "./_components";
import { useEffect, useState } from "react";
import { useWizardForm } from "./_hooks/useWizardForm";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasLogin, setHasLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { reset, step, nextStep } = useWizardForm();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/");
      setTimeout(() => {
        reset();
      }, 1000);
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
        {step === 0 && (
          <div className="h-full w-[min(364px,100%)] px-8 py-10">
            <Form1
              username={username}
              handleUsernameChange={handleUsernameChange}
              nextStep={nextStep}
            />
          </div>
        )}
        {step === 1 && (
          <div className="flex h-full w-full flex-col px-12 py-10 pb-1">
            <Form2
              username={username}
              password={password}
              setPassword={setPassword}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
