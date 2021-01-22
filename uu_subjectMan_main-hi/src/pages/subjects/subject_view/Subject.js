import React, { useState } from "react";
import UU5 from "uu5g04";
import { useLsi } from "uu5g04-hooks";
import Editable from "../../../components/Editable";
import Lsi from "../../../config/lsi";

function Subject({ params }) {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState(params);
  const { id, subjectName, credits, degree, languages, description, topicIdList, state } = values;

  const submitBtn = useLsi(Lsi.common.submit);
  const editBtn = edit ? useLsi(Lsi.common.cancel) : useLsi(Lsi.common.edit);

  const propsForEditable = { edit, setEdit, setValues, values };

  const handleSubmit = () => {
    setEdit(false);

    // POST req to BE
    try {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content: `Editation succeeded!`,
        colorSchema: "green",
      });
    } catch (e) {}
    console.log(values);
  };

  return (
    <div>
      <UU5.Bricks.Header
        level="1"
        content={
          <div style={{ fontSize: "50px", marginLeft: "100px" }}>
            <Editable edit={edit} setEdit={setEdit} setValues={setValues} values={values} valueType="subjectName">
              {subjectName || ""}
            </Editable>
          </div>
        }
        style={{
          padding: "8px",
          backgroundColor: "cornflowerblue",
        }}
      />
      <div style={{ marginLeft: "100px" }}>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Degree">
              <Editable
                {...propsForEditable}
                valueType="degree"
                inputType="select"
                options={["bc", "ing"]}
                style={{
                  width: "100px",
                }}
              >
                {degree || ""}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Credits">
              <Editable
                {...propsForEditable}
                valueType="credits"
                inputType="input"
                type="number"
                style={{
                  width: "70px",
                }}
              >
                {credits || ""}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Languages">
              <Editable
                {...propsForEditable}
                inputType="select"
                multiple
                options={["EN", "CZ"]}
                valueType="languages"
                style={{
                  width: "150px",
                }}
              >
                {(languages || []).join(",")}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Topics">
              <Editable
                {...propsForEditable}
                inputType="select"
                multiple
                options={["1", "2", "..."]} // TODO - get all topics from database
                valueType="topicIdList"
                style={{
                  width: "150px",
                }}
              >
                {(topicIdList || []).join(",")}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

        <UU5.Bricks.Section header="Description">
          <Editable
            {...propsForEditable}
            valueType="description"
            style={{
              resize: "none",
              width: "700px",
              height: "140px",
              border: "1px solid #cccccc",
            }}
            inputType="textarea"
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
    </div>
  );
}

export default Subject;
