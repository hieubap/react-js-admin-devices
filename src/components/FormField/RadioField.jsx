import { Field } from "formik";
import React from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

function RadioField({ data = [], ...props }) {
  return (
    <Field
      {...props}
      render={({ field, form }) => {
        console.log(field, "field");
        return (
          <RadioGroup
            onChange={(d) => {
              console.log(d, "d");
              form.setFieldValue(field.name, d);
            }}
            value={Number(field.value)}
          >
            <Stack direction="row">
              {data.map((item, idx) => (
                <Radio key={idx} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      }}
    />
  );
}

export default RadioField;
