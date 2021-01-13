import React from "react";
import { subjects } from "../mockData";

function SubjectList() {
  return (
    <div>
      {subjects.map(({ topicName, id }) => (
        <UU5.Bricks.Button onClick={() => UU5.Environment.getRouter().setRoute("subject",{id})} content={topicName} />
      ))}
    </div>
  );
}

export default SubjectList;
