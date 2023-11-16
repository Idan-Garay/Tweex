import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { InputConceal } from "@/_components/ui/input-conceal";
import { TweexLink } from "@/_components/ui/tweex-link";
import { Dispatch, SetStateAction } from "react";

export const Form2 = ({
  username,
  password,
  setPassword,
}: {
  username: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
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
      <InputConceal value={password} setValue={setPassword} />
      <div className="pl-3">
        <TweexLink href="#">Forgot Password?</TweexLink>
      </div>
      <div className="h-full" />

      <Button className="min-h-[3rem] w-full font-semibold">Log in</Button>
      <div className="h-12" />
      <span className="block text-base text-muted-foreground">
        {"Don't have an account? "} <TweexLink href="#">Sign up</TweexLink>
      </span>
    </>
  );
};
