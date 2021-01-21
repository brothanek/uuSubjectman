import React from "react";
import UU5 from "uu5g04";
import { subjectData } from "../../../mockData";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";

function SubjectList() {
  if (subjectData.length === 0) return <UU5.Bricks.Loading />;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("subject_create")}
        content={"Add new Subject"}
      />
      <UU5.Bricks.Table hover condensed header={useLsi(Lsi.subjectList.header)}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={useLsi(Lsi.subjectList.name)} />
            <UU5.Bricks.Table.Th content="Credits" />
            <UU5.Bricks.Table.Th content="Degree" />
            <UU5.Bricks.Table.Th content="State" />
            <UU5.Bricks.Table.Th content="Languages" />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {subjectData.map((col) => {
            const { credits, topicName, id, degree, languages, state } = col;
            return (
              <UU5.Bricks.Table.Tr>
                <UU5.Bricks.Table.Td
                  content={
                    <UU5.Bricks.Link
                      onClick={() => UU5.Environment.getRouter().setRoute("subject", col)}
                      content={topicName}
                    />
                  }
                />
                <UU5.Bricks.Table.Td content={credits} />
                <UU5.Bricks.Table.Td content={degree} />
                <UU5.Bricks.Table.Td content={state} />
                <UU5.Bricks.Table.Td content={languages.join(",")} />
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default SubjectList;
