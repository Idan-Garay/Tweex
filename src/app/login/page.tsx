import { Button } from "@/_components/ui/button";
import { TweexLink } from "@/_components/ui/tweex-link";
import Image from "next/image";

export default function LoginPage() {
  const footerLinks = [
    { title: "About", link: "https://about.twitter.com/" },
    {
      title: "Download the X app",
      link: "https://help.twitter.com/using-x/download-the-x-app",
    },
    { title: "Help Center", link: "https://help.twitter.com/" },
    { title: "Terms of Service", link: "https://twitter.com/tos" },
    { title: "Privacy Policy", link: "https://twitter.com/privacy" },
    {
      title: "Cookie Policy",
      link: "https://support.twitter.com/articles/20170514",
    },
    {
      title: "Accessibility",
      link: "https://help.twitter.com/resources/accessibility",
    },
    {
      title: "Ads Info",
      link: "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
    },
    { title: "Blog", link: "https://blog.twitter.com/" },
    { title: "Status", link: "https://status.twitterstat.us/" },
    { title: "Careers", link: "https://careers.twitter.com/" },
    {
      title: "Brand Resources",
      link: "https://about.twitter.com/press/brand-assets",
    },
    {
      title: "Advertising",
      link: "https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise",
    },
    { title: "Marketing", link: "https://marketing.twitter.com/" },
    {
      title: "X for Business",
      link: "https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness",
    },
    { title: "Developers", link: "https://developer.twitter.com/" },
    { title: "Directory", link: "https://twitter.com/i/directory/profiles" },
    { title: "Settings", link: "https://twitter.com/settings" },
  ];
  return (
    <div className="flex h-screen flex-col items-center">
      <main className=" flex w-[568px] max-w-full flex-wrap bg-background p-8 text-accent-foreground lg:h-full lg:w-screen lg:flex-nowrap">
        <div className="flex h-full max-h-14 w-full items-center justify-start  lg:max-h-full lg:justify-center">
          <div className="relative h-full w-8 lg:h-1/2 lg:w-full">
            <Image src="/x-icon.svg" alt="x-icon" fill />
          </div>
        </div>
        <div className=" flex w-full min-w-[356px] flex-col lg:justify-center">
          <div className="py-16 ">
            <h1 className="text-6xl font-extrabold leading-normal tracking-wide">
              Happening now
            </h1>
          </div>
          <div className="pb-12">
            <h3 className="text-4xl font-extrabold">Join Today.</h3>
          </div>
          <Button className="mb-4 font-normal">
            <Image
              src="/google-icon.svg"
              alt="google-icon"
              height={24}
              width={24}
              className="mr-2"
            />
            Sign up with Google
          </Button>
          <br />

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
          <div className="relative h-[32px] w-[300px] ">
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
            <TweexLink href="https://twitter.com/tos">
              Terms of Service
            </TweexLink>{" "}
            and{" "}
            <TweexLink href="https://twitter.com/privacy">
              Privacy Policy
            </TweexLink>
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
            <Button variant="ghost">Sign in</Button>
          </div>
        </div>
      </main>
      <footer className="mt-24 flex min-h-fit flex-wrap items-center  justify-center gap-2 p-4 py-2 text-accent-foreground">
        {footerLinks.map(({ title, link }) => (
          <TweexLink variant="ghost" key={title} href={link} className="">
            {title}
          </TweexLink>
        ))}
      </footer>
    </div>
  );
}
