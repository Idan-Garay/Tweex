"use client";
import { useState } from "react";

const DEFAULT_STEP = 0;
export const useWizardForm = () => {
  const [step, setStep] = useState(DEFAULT_STEP);
  const previousStep = () => setStep((step) => step - 1);
  const nextStep = (toStep = 0) =>
    setStep((step) => (toStep > 0 ? toStep : step + 1));
  const reset = () => setStep(DEFAULT_STEP);
  return {
    step,
    previousStep,
    nextStep,
    reset,
  };
};
