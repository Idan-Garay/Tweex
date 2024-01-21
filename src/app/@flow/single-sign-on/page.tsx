"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OnboardingDialog } from "../_components";
import { SsoForm1, SsoForm2 } from "./_components";
import { useWizardForm } from "../_hooks/useWizardForm";

export default function Register() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasRegister, setHasRegister] = useState(false);
  const { reset, step, nextStep } = useWizardForm();

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        reset();
      }, 1000);
      router.replace("/");
    }
    return;
  };
  useEffect(() => {
    setHasRegister(pathname.includes("register"));
  }, [pathname]);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <OnboardingDialog
      defaultOpen
      open={hasRegister}
      onOpenChange={handleDialogOpenChange}
    >
      <h3 className="absolute left-32 top-4 -translate-x-1/2 text-xl font-semibold">
        Step {step + 1} of 4
      </h3>
      {step === FORMS_NEXT_STEP.SSO_DOB && (
        <SsoForm1 nextStep={() => nextStep(FORMS_NEXT_STEP.SSO_DOB)} />
      )}
      {step === FORMS_NEXT_STEP.SSO_DOB + 1 && (
        <div className="animate slideInLeft relative flex h-full w-full flex-col px-12 pb-1 pt-10">
          <SsoForm2
            nextStep={() => {
              router.replace("/");
            }}
          />
        </div>
      )}
    </OnboardingDialog>
  );
}

export const FORMS_NEXT_STEP = Object.freeze({
  SSO_DOB: 11,
});
