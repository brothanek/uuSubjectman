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

  const optionsAreObjects = typeof options[0] === "object";

  const props = { onChange: handleChange, value: values[valueType], ...rest };
  const components = {
    input: { name: "input", props },
    textarea: { name: "textarea", props },
    select: {
      name: UU5.Forms.Select,
      props: {
        ...props,
        onChange: ({ value, _data: { type } }) => {
          if (type === "changeValue") {
            const changedVal = multiple ? [...values[valueType], value] : value;
            setValues({ ...values, [valueType]: changedVal });
          }
          if (type === "remove") {
            setValues({ ...values, [valueType]: [...values[valueType].filter((el) => el != value)] });
          } else return;
        },
        multiple,
        children: options.map((item) => {
          if (optionsAreObjects) {
            return <UU5.Forms.Select.Option value={item?.id.toString()}>{item.name}</UU5.Forms.Select.Option>;
          } else {
            return <UU5.Forms.Select.Option value={item} />;
          }
        }),
      },
    },
  };

  const EditComponent = components[inputType].name;
  const dynamicProps = components[inputType].props;

  if (!edit) return <div {...rest}>{children}</div>;

  return <EditComponent {...dynamicProps} />;
};

export default Editable;
