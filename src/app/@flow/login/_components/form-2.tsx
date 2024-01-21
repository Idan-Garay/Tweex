import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { InputConceal } from "@/_components/ui/input-conceal";
import { TweexLink } from "@/_components/ui/tweex-link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/_components/ui/use-toast";
import { useLoading } from "@/_lib/hooks/use-loading";
import { Loading } from "@/_components/ui/loading";

export const Form2 = ({
  username,
  password,
  setUsername,
  setPassword,
  reset,
}: {
  username: string;
  password: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  reset: () => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const handleLogin = async () => {
    // handle loading feedback
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      // handle request
      if (res.ok) {
        // save authorized user to browser
        const data = await res.json() as {success: boolean};
        if (data.success) {
          setUsername("");
          setPassword("");

          router.replace("/");
          reset();
        } else {
          setTimeout(() => {
            toast({
              description: "Wrong Password!",
            });
          }, 500);
        }
        // saved
      } else {
        console.log("not ok");
        // error handle
      }
    } catch (e) {
      console.log("e", e);
    }
    setLoading(false);
  };

  return loading === false ? (
    <>
      <DialogTitle className="text-3xl font-bold">
        Enter your password
      </DialogTitle>
      <div className="h-14" />
      <Input
        defaultValue={username}
        className="h-14 min-h-[3.5rem] text-base disabled:cursor-default"
        placeholder="Phone, email, or username"
        disabled
      />
      <div className="h-16" />
      <InputConceal />
      <div className="pl-3">
        <TweexLink href="#">Forgot Password?</TweexLink>
      </div>
      <div className="h-full" />

      <Button
        onClick={handleLogin}
        className="min-h-[3rem] w-full font-semibold"
      >
        Log in
      </Button>
      <div className="h-12" />
      <span className="block text-base text-muted-foreground">
        {"Don't have an account? "} <TweexLink href="#">Sign up</TweexLink>
      </span>
    </>
  ) : (
    <Loading />
  );
};
