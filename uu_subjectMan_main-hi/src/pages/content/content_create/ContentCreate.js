import React from "react";
import UU5 from "uu5g04";

function ContentCreate() {
  const handleSubmit = (values) => {
    UU5.Environment.getPage().getAlertBus().addAlert({
      content: `Creation succeeded!`,
      colorSchema: "green",
    });
    UU5.Environment.getRouter().setRoute("home");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div>
      <UU5.Forms.Form
        header={<UU5.Bricks.Box content="Create new digital content" colorSchema="green" className="font-size-m" />}
        onSave={({ component, values }) => handleSubmit(component, values)}
        onCancel={handleCancel}
      >
        <UU5.Forms.Text
          pattern="[A-Za-z]{5}"
          patternMessage="Insert at least 5 characters"
          label="Content name"
          name="contentName"
          placeholder="Content name"
          required
        />
        <UU5.Forms.Select label="Content Type" name="contentType" placeholder="Content type" required>
          <UU5.Forms.Select.Option value="uuCourse" />
          <UU5.Forms.Select.Option value="uuBook" />
          <UU5.Forms.Select.Option value="document" />
          <UU5.Forms.Select.Option value="video" />
          <UU5.Forms.Select.Option value="other" />
        </UU5.Forms.Select>

        <UU5.Forms.Text
          label="Link"
          name="link"
          placeholder="Link"
          pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
          patternMessage="Insert link only"
          required
        />
        <UU5.Forms.Controls buttonSubmitProps={{ content: "Create" }} />
      </UU5.Forms.Form>
    </div>
  );
}

export default ContentCreate;
