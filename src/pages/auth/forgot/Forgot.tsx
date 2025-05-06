import { Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { Details } from "./details/Details";
import { Success } from "./success/Success";
import { classNames } from "../../../helpers";
import { ResetPassword } from "./password/Password";
import { useNavigate } from "react-router";

const Forgot = () => {
  const { steps, setSteps, currentStep } = useForm();
  const [page, setPage] = useState("details");
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    setSteps([
      <Details setPage={setPage} />,
      <ResetPassword setPage={setPage} />,
      <Success setPage={setPage} />,
    ]);
  }, [setSteps]);

  useEffect(() => {
    navigate(`/forgot?tab=${page}&step=${currentStep + 1}`);
  }, [page, navigate, currentStep]);

  return (
    <Fragment>
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
                return <Stepper activeClass={currentStep === i ? "bg-blue-500" : "bg-gray-400"} />;
              })}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Forgot;

const Stepper: React.FC<{ activeClass: string }> = ({ activeClass }) => {
  return <div className={classNames(activeClass, "size-2 rounded-full block")}></div>;
};
