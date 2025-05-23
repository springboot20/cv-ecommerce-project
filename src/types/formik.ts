import { FormikErrors, FormikTouched } from "formik";

export type FormikEvent = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: InitialValues;
  handleBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  touched?: FormikTouched<InitialValues>;
  errors?: FormikErrors<InitialValues>;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<InitialValues>>;
};

export interface InitialValues {
  email: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  firstname: string;
  lastname: string;
  address_line_one: string;
  address_line_two: string;
  "card_name": string;
  "card_number": string;
  cvc: string;
  "card_expiry": string;
  shipping_method: string;
}
