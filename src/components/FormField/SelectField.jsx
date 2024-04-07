import React from "react";
import { Field, Formik } from "formik";
import Select from "react-select";

function SelectField({ isMulti = false, options, ...props } = {}) {
  console.log(isMulti, "isMulti");
  return (
    <Field
      {...props}
      render={({ field, form }) => {
        const _values = isMulti
          ? (field?.value || [])?.map((i) =>
              options?.find((j) => j.value == i?.value || j?.value == i)
            )
          : options?.find((j) => j.value == field?.value);
        return (
          <Select
            options={options}
            isMulti={isMulti}
            noOptionsMessage={() => props.placeholder}
            value={_values}
            onChange={(d) => {
              if (isMulti) {
                form.setFieldValue(
                  field?.name,
                  d.map((i) => i.value)
                );
                return;
              }
              form.setFieldValue(field?.name, d.value);
            }}
            placeholder={props.placeholder}
          />
        );
      }}
      variant="filled"
    />
  );
}

export default SelectField;
