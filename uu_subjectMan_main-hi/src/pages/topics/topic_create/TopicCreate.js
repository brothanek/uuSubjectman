import React from "react";
import UU5 from "uu5g04";

const data = [
  { id: "1", topicName: "Video 1" },
  { id: "2", topicName: "Text 1" },
];
function TopicCreate({ onSave, modal }) {
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
          pattern="[A-Za-z]{5}"
          patternMessage="Insert at least 5 characters"
          label="Subject"
          name="topicName"
          placeholder="Topic name"
          required
        />

        <UU5.Forms.Select multiple label="Topics" name="topics" placeholder="Topic" required>
          {data.map(({ topicName }) => (
            <UU5.Forms.Select.Option value={topicName} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Controls buttonSubmitProps={{ content: "Create" }} />
      </UU5.Forms.Form>
    </div>
  );
}

export default TopicCreate;
