import React from "react";
import UU5 from "uu5g04";

const Editable = ({
  edit,
  setEdit,
  values,
  setValues,
  children,
  inputType = "input",
  valueType,
  options = [],
  multiple,
  ...rest
}) => {
  const handleChange = ({ target: { value } }) => {
    setValues({ ...values, [valueType]: value });
  };

  const props = { onChange: handleChange, value: values[valueType], ...rest };
  const components = {
    input: { name: "input", props },
    textarea: { name: "textarea", props },
    select: {
      name: UU5.Forms.Select,
      props: {
        ...props,
        onChange: ({ value, _data: { type } }) => {
          if (type === "changeValue") setValues({ ...values, [valueType]: [...values[valueType], value] });
          if (type === "remove")
            setValues({ ...values, [valueType]: [...values[valueType].filter((el) => el !== value)] });
          return;
        },
        multiple,
        children: options.map((el) => <UU5.Forms.Select.Option value={el} />),
      },
    },
  };

  const EditComponent = components[inputType].name;
  const dynamicProps = components[inputType].props;

  if (!edit) return <div {...rest}>{children}</div>;

  return <EditComponent {...dynamicProps} />;
};

export default Editable;
