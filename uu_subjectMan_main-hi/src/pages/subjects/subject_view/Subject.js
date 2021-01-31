import React, { useState } from "react";
import UU5 from "uu5g04";
import { useLsi, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Editable from "../../../components/Editable";
import Lsi from "../../../config/lsi";

function Subject({ params }) {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState(params);
  const { id, name, credits, degree, language, description, topicIdList } = values;
  console.log(values);

  const submitBtn = useLsi(Lsi.common.submit);
  const editBtn = edit ? useLsi(Lsi.common.cancel) : useLsi(Lsi.common.edit);

  const propsForEditable = { edit, setEdit, setValues, values };

  const dataListResult = useDataList({
    pageSize: 50,
    handlerMap: {
      load: Calls.listTopics,
    },
    itemHandlerMap: {
      delete: Calls.deleteSubject,
    },
  });
  const data = (dataListResult?.data || []).map(({ data }) => data);

  const handleSubmit = async () => {
    try {
      let result = await Calls.updateSubject(values);
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
            <Editable edit={edit} setEdit={setEdit} setValues={setValues} values={values} valueType="name">
              {name || ""}
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
                  width: "70px",
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
            <UU5.Bricks.Section header="Language">
              <Editable
                {...propsForEditable}
                inputType="select"
                options={["en", "cz"]}
                valueType="language"
                style={{
                  width: "70px",
                }}
              >
                {language}
              </Editable>
            </UU5.Bricks.Section>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column width="25%">
            <UU5.Bricks.Section header="Topics">
              <Editable
                {...propsForEditable}
                inputType="select"
                multiple
                options={(data || []).map((item) => ({ ...item, name: item.topicName }))}
                valueType="topicIdList"
                style={{
                  width: "350px",
                }}
              >
                <ul>
                  {(data || [])
                    .filter(({ id }) => topicIdList.includes(id))
                    .map((data) => (
                      <li>
                        <UU5.Bricks.Link
                          onClick={() => UU5.Environment.getRouter().setRoute("topic", data)}
                          content={data.topicName}
                        />
                      </li>
                    ))}
                </ul>
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
