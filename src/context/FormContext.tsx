import { createContext, useState,useEffect } from "react";

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
  const savedStep = Number(localStorage.getItem("currentStep")) || 0;

  const [currentStep, setCurrentStep] = useState<number>(savedStep);

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  // Update localStorage whenever `currentStep` changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

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