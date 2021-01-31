import React from "react";
import UU5 from "uu5g04";
import { useLsi, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Lsi from "../../../config/lsi";

function TopicCreate({ onSave, modal }) {
  const dataListResult = useDataList({
    pageSize: 50,
    handlerMap: {
      load: Calls.listContents,
    },
    itemHandlerMap: {
      delete: Calls.deleteSubject,
    },
  });
  const data = (dataListResult?.data || []).map(({ data }) => data);
  const lsiCreate = useLsi(Lsi.topic.create);
  const lsiName = useLsi(Lsi.topic.name);
  const lsiContents = useLsi(Lsi.content.name);

  return (
    <div>
      <UU5.Forms.Form
        header={<UU5.Bricks.Box content={lsiCreate} colorSchema="green" className="font-size-m" />}
        onSave={onSave}
        onSaveDone={() => {
          modal.close();
        }}
        onSaveFail={(opt) => {
          opt.component.getAlertBus().setAlert({
            content: "Creating on server failed",
            colorSchema: "danger",
          });
        }}
        onCancel={() => modal.close()}
        controlled={false}
      >
        <UU5.Forms.Text
          pattern="[A-Za-z]{3}"
          patternMessage="Insert at least 3 characters"
          label={lsiName}
          name="topicName"
          placeholder="Topic name"
          required
        />

        <UU5.Forms.Select multiple label={lsiContents} name="contentIdList" placeholder="Digital content" required>
          {(data || []).map(({ contentName, id }) => (
            <UU5.Forms.Select.Option value={id}>{contentName}</UU5.Forms.Select.Option>
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Controls buttonSubmitProps={{ content: "Create" }} />
      </UU5.Forms.Form>
    </div>
  );
}

export default TopicCreate;
