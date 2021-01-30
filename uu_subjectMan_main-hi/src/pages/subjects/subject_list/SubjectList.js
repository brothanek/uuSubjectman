import React from "react";
import UU5 from "uu5g04";
import Calls from "calls";
import { useDataList } from "uu5g04-hooks";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";

function SubjectList() {
  const pageSize = 8;
  const dataListResult = useDataList({
    pageSize,
    handlerMap: {
      load: Calls.listSubjects,
      createItem: Calls.createSubject,
    },
    itemHandlerMap: {
      delete: Calls.deleteSubject,
    },
  });

  const name = useLsi(Lsi.common.name);
  const header = useLsi(Lsi.subject.subjectList.header);

  if (dataListResult?.state !== "ready") return <UU5.Bricks.Loading />;
  if (dataListResult?.data.length < 1) return <h1>{"There are no data to load :("}</h1>;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("content_create")}
        content={"Add new Subject"}
      />
      <UU5.Bricks.Table hover condensed header={header}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={name} />
            <UU5.Bricks.Table.Th content="Credits" />
            <UU5.Bricks.Table.Th content="Degree" />
            <UU5.Bricks.Table.Th content="State" />
            <UU5.Bricks.Table.Th content="Languages" />
            <UU5.Bricks.Table.Th content="Manage" />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {(dataListResult?.data || []).map(({ data, handlerMap }) => {
            const { credits, subjectName, id, degree, languages = [], state } = data;
            return (
              <UU5.Bricks.Table.Tr key={data}>
                <UU5.Bricks.Table.Td
                  content={
                    <UU5.Bricks.Link
                      onClick={() => UU5.Environment.getRouter().setRoute("subject", data)}
                      content={subjectName}
                    />
                  }
                />
                <UU5.Bricks.Table.Td content={credits} />
                <UU5.Bricks.Table.Td content={degree} />
                <UU5.Bricks.Table.Td content={state} />
                <UU5.Bricks.Table.Td content={languages.join(",")} />
                <UU5.Bricks.Table.Td content={<UU5.Bricks.Button onClick={handlerMap.delete} content={"Delete"} />} />
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default SubjectList;
