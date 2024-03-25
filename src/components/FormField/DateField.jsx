import { Field } from "formik";
import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";

function DateField({ ...props }) {
  return (
    <Field
      {...props}
      //   name="birth"
      //   type="string"
      render={({ field, form }) => {
        return (
          <DatePicker
            selected={field.value}
            onChange={(d) => {
              console.log(d, "d");
              form.setFieldValue(field.name, moment(d).format());
            }}
            // onFocus={() => {
            //   form.setFieldValue(field.name, null);
            // }}
            dateFormat="dd/MM/yyyy"
            wrapperClassName="input-field"
            placeholder={props.placeholder}
          />
        );
      }}
      variant="filled"
    />
  );
}

export default DateField;
