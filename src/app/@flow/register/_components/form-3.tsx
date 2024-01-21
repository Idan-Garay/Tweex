import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { useState } from "react";
import { TweexLink } from "@/_components/ui/tweex-link";
import { Checkbox } from "@/_components/ui/checkbox";

export const Form3 = ({ nextStep }: { nextStep: () => void }) => {
  const [agree, setAgree] = useState(false);

  return (
    <>
      <DialogTitle className="text-3xl font-bold">
        Customize your experience
      </DialogTitle>
      <div className="h-9 shrink-0" />
      <h4 className="text-xl font-semibold opacity-90">
        Track where you see TweeX content across the web
      </h4>
      <div className="h-3 shrink-0" />
      <div className="grid grid-cols-6 gap-9">
        <p className="col-span-5 text-sm opacity-80">
          TweeX uses this data to personalize your experience. This web browsing
          history will never be stored with your name, email, or phone number.
        </p>
        <Checkbox
          className="col-span-1"
          onCheckedChange={() => setAgree((val) => !val)}
        />
      </div>
      <div className="h-9 shrink-0" />
      <p className="text-sm text-muted-foreground">
        By signing up, you agree to our <TweexLink href="#">Terms</TweexLink>,{" "}
        <TweexLink href="https://twitter.com/en/privacy">
          Privacy Policy
        </TweexLink>
        , and{" "}
        <TweexLink href="https://support.twitter.com/articles/20170514">
          Cookie Use
        </TweexLink>
        . TweeX may use your contact information, including your email address
        and phone number for purposes outlined in our Privacy Policy.{" "}
        <TweexLink href="https://twitter.com/tos">Learn more</TweexLink>
      </p>

      <div className="flex h-full items-end justify-center">
        <Button type="submit" disabled={!agree} onClick={nextStep}>
          <span className="font-semibold">Next</span>
        </Button>
      </div>
    </>
  );
};
