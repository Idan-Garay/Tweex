"use client";
import { useState } from "react";

const DEFAULT_STEP = 0;

export const useWizardForm = () => {
  const [step, setStep] = useState(DEFAULT_STEP);
  const previousStep = () => setStep((step) => step - 1);
  const nextStep = () => setStep((step) => step + 1);
  const reset = () => setStep(DEFAULT_STEP);
  return {
    step,
    previousStep,
    nextStep,
    reset,
  };
};
