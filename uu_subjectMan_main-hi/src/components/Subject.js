import React from "react";
import UU5 from "uu5g04";
import { subjectData } from "../mockData";

function Subject({ params: { id } }) {
  const { name, credits, degree, languages, desc, topicIdList, state } = subjectData;
  return (
    <div>
      <UU5.Bricks.Header
        level="3"
        content={<h2>{name}</h2>}
        style={{
          padding: "8px",
          backgroundColor: "cornflowerblue",
        }}
      />

      <UU5.Bricks.Section header="Description">{desc}</UU5.Bricks.Section>
    </div>
  );
}

export default Subject;
