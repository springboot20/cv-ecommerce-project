import { motion } from "framer-motion";
import { useForm } from "../../../hooks/useForm";
import { classNames } from "../../../helpers";

const Register = () => {
  const { steps, currentStep, setCurrentStep } = useForm();

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const handleStepChange = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <>
      <motion.div className="sm:px-8 xl:px-0 flex min-h-[calc(100vh-10rem)] lg:min-h-screen justify-center items-center">
        <div className="w-full">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {steps[currentStep]}
          </motion.div>
          <div className="mt-8 flex items-center gap-2 justify-center">
            {Array(steps.length)
              .fill("-")
              .map((_, i) => {
                return (
                  <Stepper
                    activeClass={currentStep === i ? "bg-blue-500" : "bg-gray-400"}
                    handleStepChange={() => handleStepChange(i)}
                  />
                );
              })}
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Register;

const Stepper: React.FC<{ activeClass: string; handleStepChange: () => void }> = ({
  activeClass,
  handleStepChange,
}) => {
  return (
    <div
      className={classNames(activeClass, "size-2 rounded-full block cursor-pointer")}
      onClick={handleStepChange}
    ></div>
  );
};
