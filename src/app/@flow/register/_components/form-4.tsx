import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/_components/ui/use-toast";
import { RegisterUserContext } from "../_hooks/use-register-form";
import { TweexLink } from "@/_components/ui/tweex-link";
import { Loading } from "@/_components/ui/loading";
import { useRouter } from "next/navigation";

export const Form4 = () => {
  const registerUser = useContext(RegisterUserContext);
  const { toast } = useToast();
  const router = useRouter();
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    const result = await fetch("/api/email/verify-confirmation-code", {
      method: "POST",
      body: JSON.stringify({
        email: registerUser?.email,
        code: verificationCode,
      }),
    });
    const json = await result.json() as {status:boolean, message: string};

    if (json.status) {
      router.replace("/");
    } else {
      toast({ description: json.message });
    }

    setLoading(false);
  };
  const fetchConfirmationCode = async () => {
    const res = await fetch("/api/email/send-confirmation-code", {
      method: "POST",
      body: JSON.stringify({
        email: registerUser?.email,
        username: registerUser?.username,
      }),
    });

    if (res.ok) {
      const json = await res.json() as {success:boolean, error: string};
      if (!json.success) {
        toast({ description: json.error });
      }
    }
  };

  useEffect(() => {
    console.log("fetch");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchConfirmationCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verificationCode.length > 2) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [verificationCode]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <DialogTitle className="text-3xl font-bold">
        We sent you a code
      </DialogTitle>
      <p className="text-sm text-muted">
        Enter it below to verify {registerUser?.email ?? ""}
      </p>
      <div className="h-9 shrink-0" />
      <Input
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Verification code"
        className="h-14 min-h-[3.5rem] text-base "
      />
      <div className="pl-3">
        <TweexLink href="#">Forgot Password?</TweexLink>
      </div>
      <div className="h-9 shrink-0" />
      <div className="flex h-full items-end justify-center">
        <Button type="submit" disabled={!canSubmit} onClick={handleSubmit}>
          <span className="font-semibold">Next</span>
        </Button>
      </div>
    </>
  );
};
