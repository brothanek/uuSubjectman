import React, { useState } from "react";
import UU5 from "uu5g04";
import Calls from "calls";
import { useLsi } from "uu5g04-hooks";
import Editable from "../../../components/Editable";
import Lsi from "../../../config/lsi";

function Content({ params }) {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState(params);
  const { contentName, contentType, link } = values;

  const submitBtn = useLsi(Lsi.common.submit);
  const editBtn = edit ? useLsi(Lsi.common.cancel) : useLsi(Lsi.common.edit);
  const lsiName = useLsi(Lsi.common.name);

  const propsForEditable = { edit, setEdit, setValues, values };

  const handleSubmit = async () => {
    try {
      let result = await Calls.updateContent(values);
      setValues(result);
      setEdit(false);
      UU5.Environment.getPage().getAlertBus().addAlert({
        content: `Editation succeeded!`,
        colorSchema: "green",
      });
    } catch (e) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content: e,
        colorSchema: "red",
      });
    }
  };

  return (
    <div>
      <UU5.Bricks.Header
        level="1"
        content={
          <div style={{ fontSize: "50px", marginLeft: "100px" }}>
            <Editable edit={edit} setEdit={setEdit} setValues={setValues} values={values} valueType="contentName">
              {contentName || ""}
            </Editable>
          </div>
        }
        style={{
          padding: "8px",
          backgroundColor: "gray",
        }}
      />
      <div style={{ marginLeft: "100px" }}>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header={lsiName}>
              <Editable
                {...propsForEditable}
                valueType="contentType"
                inputType="select"
                options={["uuCourse", "uuBook", "document", "video", "other"]}
                style={{
                  width: "100px",
                }}
              >
                {contentType || []}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Link">
              <Editable
                {...propsForEditable}
                valueType="link"
                inputType="input"
                type="url"
                style={{
                  width: "550px",
                }}
              >
                <a href={link}>{link || ""}</a>
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

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

export default Content;
