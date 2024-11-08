import { useFormik } from "formik"
import { orderSchema } from "../../schema/Schema";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";


interface InitialValues {
  email:string
  
  "card-name":string
  "card-number":number
  "expiring-date":Date
  cvc:number
  address:string
}

const CheckOutForm = ({ className }: { className: string }) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      phone: "",
      saveInfo: false,
    },
    validationSchema: orderSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    if (values) {
      const btn = document.querySelector("button") as HTMLButtonElement;
      btn.innerHTML = "checking out....";
      btn.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return (
   
  );
};

export default CheckOutForm;
