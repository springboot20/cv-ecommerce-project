import { createContext, useState } from "react";

interface FormContextType {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  currentStep: number;
  steps: JSX.Element[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setSteps: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export const FormContext = createContext({} as FormContextType);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <FormContext.Provider
      value={{
        steps,
        setSteps,
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
