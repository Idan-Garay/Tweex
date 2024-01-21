"use client";
import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { Loading } from "@/_components/ui/loading";
import { TweexLink } from "@/_components/ui/tweex-link";
import { useToast } from "@/_components/ui/use-toast";
import { useLoading } from "@/_lib/hooks/use-loading";
import Image from "next/image";
import { GoogleSignIn } from "./google-sign-in";
import { useLocalStorageLoading } from "@/_lib/hooks/use-local-storage-loading";
import type User from "../../../../../types/user";

export const Form1 = ({
  username,
  handleUsernameChange,
  nextStep,
}: {
  username: string;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) => {
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const { ssoLoading } = useLocalStorageLoading();
  const handleNextClick = async () => {
    try {
      if (username.length <= 1) return;
      setLoading(true);
      const res = await fetch("/api/user/username-login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
        }),
      });
      setLoading(false);
      if (res.ok) {
        const data = (await res.json()) as {
          success: boolean;
          message: string;
          data: User | null;
        };
        if (data.success) {
          nextStep();
        } else {
          toast({
            description: data.message,
          });
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };
  return loading === false && ssoLoading === false ? (
    <>
      <DialogTitle className="text-3xl font-bold">Sign in to X</DialogTitle>
      <div className="h-6" />
      <GoogleSignIn setLoading={setLoading} />
      <div className="h-4"></div>
      <Button className="font-semibold">
        <Image
          src="/apple-icon.svg"
          alt="apple-icon"
          height={24}
          width={24}
          className="mr-2"
        />
        Sign up with Apple
      </Button>
      <div className="relative h-[40px] w-[300px] ">
        <hr className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-foreground/30 " />
        <p className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground px-2 text-primary">
          or
        </p>
      </div>
      <Input
        className="h-14 text-base"
        placeholder="Phone, email, or username"
        defaultValue={username}
        onChange={handleUsernameChange}
      />
      <div className="h-6"></div>

      <Button onClick={handleNextClick} className="font-semibold">
        Next
      </Button>
      <div className="h-6"></div>

      <Button variant="outline" className="font-semibold">
        Forgot Password?
      </Button>
      <div className="h-12"></div>
      <span className="block text-base text-muted-foreground">
        {"Don't have an account? "} <TweexLink href="/register">Sign up</TweexLink>
      </span>
    </>
  ) : (
    <Loading />
  );
};
