import React from "react";
import UU5 from "uu5g04";

const data = [
  { id: "1", topicName: "Zaklady JS", contentId: [12, 23] },
  { id: "2", topicName: "Advanced JS", contentId: [1, 3] },
];

function SubjectCreate({ onSave, modal }) {
  return (
    <div>
      <UU5.Forms.Form
        header={<UU5.Bricks.Box content="Create new subject" colorSchema="green" className="font-size-m" />}
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
          name="subjectName"
          placeholder="Subject name"
          required
        />
        <UU5.Forms.Text
          label="Credits number"
          name="credits"
          placeholder="1-12"
          pattern="^\d$"
          patternMessage="Insert numbers only"
          required
        />
        <UU5.Forms.Select label="Degree" name="degree" placeholder="Bc or Ing" required>
          <UU5.Forms.Select.Option value="ing" />
          <UU5.Forms.Select.Option value="bc" />
        </UU5.Forms.Select>

        <UU5.Forms.Select label="Languages" name="languages" placeholder="EN or CZ" required>
          <UU5.Forms.Select.Option value="CZ" />
          <UU5.Forms.Select.Option value="EN" />
        </UU5.Forms.Select>
        <UU5.Forms.TextArea
          label="Description"
          name="description"
          pattern=".{10}"
          patternMessage="Insert at least 10 characters"
          placeholder="Description..."
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

export default SubjectCreate;
