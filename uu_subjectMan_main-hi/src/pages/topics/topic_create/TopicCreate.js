import React from "react";
import UU5 from "uu5g04";
import { useLsi, useDataList } from "uu5g04-hooks";
import Calls from "calls";

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

  return (
    <div>
      <UU5.Forms.Form
        header={<UU5.Bricks.Box content="Create new topic" colorSchema="green" className="font-size-m" />}
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
          label="Subject"
          name="topicName"
          placeholder="Topic name"
          required
        />

        <UU5.Forms.Select multiple label="Contents" name="contentIdList" placeholder="Digital content" required>
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
