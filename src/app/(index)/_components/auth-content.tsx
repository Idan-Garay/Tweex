import { Button } from "@/_components/ui/button";
import { TweexLink } from "@/_components/ui/tweex-link";
import Image from "next/image";

export const AuthContent = () => {
  return (
    <>
      <div className="py-16 ">
        <h1 className="text-6xl font-extrabold leading-normal tracking-wide">
          Happening now
        </h1>
      </div>
      <div className="pb-12">
        <h3 className="text-4xl font-extrabold">Join Today.</h3>
      </div>
      <Button className=" font-normal">
        <Image
          src="/google-icon.svg"
          alt="google-icon"
          height={24}
          width={24}
          className="mr-2"
        />
        Sign up with Google
      </Button>
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
      <Button variant="secondary" className="mb-2 font-semibold">
        Create Account
      </Button>
      <p className="w-[300px] text-xs text-muted-foreground">
        By signing up, you agree to the{" "}
        <TweexLink href="https://twitter.com/tos">Terms of Service</TweexLink>{" "}
        and{" "}
        <TweexLink href="https://twitter.com/privacy">Privacy Policy</TweexLink>
        , including{" "}
        <TweexLink href="https://help.twitter.com/rules-and-policies/twitter-cookies">
          Cookie Use
        </TweexLink>
        .
      </p>

      <div className="flex flex-col gap-y-4 pt-8">
        <span className="block text-lg font-bold">
          Already have an account?
        </span>
        <TweexLink variant="button" href="/i/flow">
          Sign in
        </TweexLink>
      </div>
    </>
  );
};
