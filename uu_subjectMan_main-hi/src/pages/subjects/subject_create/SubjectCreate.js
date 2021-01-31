import React from "react";
import UU5 from "uu5g04";
import { useLsi, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Lsi from "../../../config/lsi";

function SubjectCreate({ onSave, modal }) {
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

  const lsiSubject = useLsi(Lsi.subject.name);
  const lsiCredits = useLsi(Lsi.subject.credits);
  const lsiDegree = useLsi(Lsi.subject.degree);
  const lsiLanguage = useLsi(Lsi.subject.language);
  const lsiDescription = useLsi(Lsi.subject.description);
  const lsiTopic = useLsi(Lsi.topic.name);
  const lsiCreate = useLsi(Lsi.subject.create);

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
          pattern="[A-Za-z]{5}"
          patternMessage="Insert at least 5 characters"
          label={lsiSubject}
          name="name"
          placeholder="Subject name"
          required
        />
        <UU5.Forms.Text
          label={lsiCredits}
          name="credits"
          placeholder="1-12"
          pattern="^\d$"
          patternMessage="Insert numbers only"
          required
        />
        <UU5.Forms.Select label={lsiDegree} name="degree" placeholder="Bc or Ing" required>
          <UU5.Forms.Select.Option value="ing" />
          <UU5.Forms.Select.Option value="bc" />
        </UU5.Forms.Select>

        <UU5.Forms.Select label={lsiLanguage} name="language" placeholder="EN or CZ" required>
          <UU5.Forms.Select.Option value="cz" />
          <UU5.Forms.Select.Option value="en" />
        </UU5.Forms.Select>
        <UU5.Forms.TextArea
          label={lsiDescription}
          name="description"
          pattern=".{10}"
          patternMessage="Insert at least 10 characters"
          placeholder="Description..."
          required
        />
        <UU5.Forms.Select multiple label={lsiTopic} name="topicIdList" placeholder="Topic" required>
          {(data || []).map(({ topicName, id }) => (
            <UU5.Forms.Select.Option value={id}>{topicName}</UU5.Forms.Select.Option>
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Controls buttonSubmitProps={{ content: "Create" }} />
      </UU5.Forms.Form>
    </div>
  );
}

export default SubjectCreate;
