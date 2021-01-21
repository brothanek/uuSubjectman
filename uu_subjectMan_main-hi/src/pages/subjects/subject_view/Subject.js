import React, { useState } from "react";
import UU5 from "uu5g04";
import { useLsi } from "uu5g04-hooks";
import Editable from "../../../components/Editable";
import Lsi from "../../../config/lsi";

function Subject({ params }) {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState(params);
  const { id, topicName, credits, degree, languages, description, topicIdList, state } = values;

  const submitBtn = useLsi(Lsi.subject.submit);
  const editBtn = edit ? useLsi(Lsi.subject.cancel) : useLsi(Lsi.subject.edit);

  const handleSubmit = () => {
    setEdit(false);
    // POST req to BE
    console.log(values);
  };

  return (
    <div>
      <UU5.Bricks.Header
        level="3"
        content={
          <h2>
            <Editable edit={edit} setEdit={setEdit} setValues={setValues} values={values} valueType="topicName">
              {topicName || ""}
            </Editable>
          </h2>
        }
        style={{
          padding: "8px",
          backgroundColor: "cornflowerblue",
        }}
      ></UU5.Bricks.Header>

      <UU5.Bricks.Section header="Description">
        <Editable
          edit={edit}
          setEdit={setEdit}
          setValues={setValues}
          values={values}
          valueType="description"
          style={{
            resize: "none",
            width: "700px",
            height: "140px",
            border: "1px solid #cccccc",
          }}
          type="textarea"
        >
          {description || ""}
        </Editable>
      </UU5.Bricks.Section>

      <UU5.Bricks.Button
        onClick={() => {
          setEdit(!edit);
          setValues(params);
        }}
      >
        {editBtn}
      </UU5.Bricks.Button>
      {edit && (
        <UU5.Bricks.Button onClick={handleSubmit} type="submit">
          {submitBtn}
        </UU5.Bricks.Button>
      )}
    </div>
  );
}

export default Subject;
