"use client";
import { usePathname, useRouter } from "next/navigation";
import { Form1, Form2, Form3, Form4 } from "./_components";
import { useEffect, useState } from "react";
import { useWizardForm } from "../_hooks/useWizardForm";
import { OnboardingDialog } from "../_components";
import { RegisterUserProvider } from "./_hooks/use-register-form";

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
    return () => reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <OnboardingDialog
      defaultOpen
      open={hasRegister}
      onOpenChange={handleDialogOpenChange}
    >
      <RegisterUserProvider>
        <h3 className="absolute left-32 top-4 -translate-x-1/2 text-xl font-semibold">
          Step {step + 1} of 4
        </h3>
        {step === 0 && <Form1 nextStep={nextStep} />}
        {step === 1 && (
          <div className="animate slideInLeft flex h-full w-full flex-col px-12 py-10 pb-1">
            <Form2 nextStep={nextStep} />
          </div>
        )}
        {step === 2 && (
          <div className="animate slideInLeft relative flex h-full w-full flex-col px-12 pb-1 pt-10">
            <Form3 nextStep={nextStep} />
          </div>
        )}
        {step === 3 && (
          <div className="animate slideInLeft relative flex h-full w-full flex-col px-12 pb-1 pt-10">
            <Form4 />
          </div>
        )}
        {/* {step === FORMS_NEXT_STEP.SSO_DOB && (
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
        )} */}
      </RegisterUserProvider>
    </OnboardingDialog>
  );
}

export const FORMS_NEXT_STEP = Object.freeze({
  SSO_DOB: 11,
});
