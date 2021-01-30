import React, { useState } from "react";
import UU5 from "uu5g04";
import { useLsi, useDataList } from "uu5g04-hooks";
import Editable from "../../../components/Editable";
import Lsi from "../../../config/lsi";
import Calls from "calls";

function Topic({ params }) {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState(params);
  const { id, topicName, contentIdList } = values;

  const dataListResult = useDataList({
    pageSize: 50,
    handlerMap: {
      load: Calls.listContents,
      createItem: Calls.createSubject,
    },
    itemHandlerMap: {
      delete: Calls.deleteSubject,
    },
  });

  const submitBtn = useLsi(Lsi.common.submit);
  const primaryBtn = edit ? useLsi(Lsi.common.cancel) : useLsi(Lsi.common.edit);

  const propsForEditable = { edit, setEdit, setValues, values };

  const handleSubmit = async () => {
    try {
      let result = await Calls.updateTopic(values);
      UU5.Environment.getPage().getAlertBus().addAlert({
        content: `Editation succeeded!`,
        colorSchema: "green",
      });
      setEdit(false);
      setValues(result);
    } catch (e) {
      console.warn(e);
    }
  };
  const data = (dataListResult?.data || []).map(({ data }) => data);
  return (
    <div>
      <UU5.Bricks.Header
        level="1"
        content={
          <div style={{ fontSize: "50px", marginLeft: "100px" }}>
            <Editable edit={edit} setEdit={setEdit} setValues={setValues} values={values} valueType="topicName">
              {topicName || ""}
            </Editable>
          </div>
        }
        style={{
          padding: "8px",
          backgroundColor: "pink",
        }}
      />
      <div style={{ marginLeft: "100px" }}>
        <UU5.Bricks.Section header="Content">
          <Editable
            {...propsForEditable}
            valueType="contentIdList"
            options={data.map((item) => ({ ...item, name: item.contentName }))}
            multiple
            inputType="select"
          >
            {(data || []).map(({ contentName }) => contentName).join(",")}
          </Editable>
        </UU5.Bricks.Section>

        <UU5.Bricks.Button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          {primaryBtn}
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

export default Topic;
