import { cn } from "@/_lib/utils";
import Link from "next/link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button/button";
// import type of Next Link component

const linkVariants = cva("whitespace-nowrap ", {
  variants: {
    variant: {
      default: "text-secondary hover:underline",
      ghost: "text-sm text-primary/30 hover:underline",
      button: buttonVariants({ variant: "outline" }),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TweexLinksProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const TweexLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  TweexLinksProps
>(({ className, variant, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(linkVariants({ variant, className }))}
    {...props}
  />
));

TweexLink.displayName = "TweexLink";

export { TweexLink };
