import { createContext, useState } from "react";
import { Details } from "../pages/auth/register/details/Details";
import { Email } from "../pages/auth/register/email/Email";
import { Password } from "../pages/auth/register/password/Password";
import { Success } from "../pages/auth/register/success/Success";

interface FormContextType {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  currentStep: number;
  steps: JSX.Element[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const FormContext = createContext({} as FormContextType);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [<Details />, <Email />, <Password />, <Success />];

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <FormContext.Provider
      value={{
        steps,
        currentStep,
        handleNextStep,
        handlePrevStep,
        setCurrentStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
