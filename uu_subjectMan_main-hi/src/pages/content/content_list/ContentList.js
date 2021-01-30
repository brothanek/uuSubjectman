import React from "react";
import UU5 from "uu5g04";
import { useDataList } from "uu5g04-hooks";
import Calls from "calls";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";

function ContentList() {
  const pageSize = 8;
  const dataListResult = useDataList({
    pageSize,
    handlerMap: {
      load: Calls.listContents,
    },
    itemHandlerMap: {
      delete: Calls.deleteContent,
    },
  });
  const header = useLsi(Lsi.subject.subjectList.header);
  const name = useLsi(Lsi.common.name);

  if (dataListResult?.state !== "ready") return <UU5.Bricks.Loading />;
  if (dataListResult?.data.length < 1) return <h1>{"There are no data to load :("}</h1>;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("content_create")}
        content={"Add new Digital content"}
      />
      <UU5.Bricks.Table hover condensed header={header}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={name} />
            <UU5.Bricks.Table.Th content="Content type" />
            <UU5.Bricks.Table.Th content="Link" />
            <UU5.Bricks.Table.Th content="Manage" />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {(dataListResult?.data || []).map(({ data, handlerMap }) => {
            const { contentName = "", contentType = "", link = "" } = data;
            return (
              <UU5.Bricks.Table.Tr>
                <UU5.Bricks.Table.Td
                  content={
                    <UU5.Bricks.Link
                      onClick={() => UU5.Environment.getRouter().setRoute("content", data)}
                      content={contentName}
                    />
                  }
                />
                <UU5.Bricks.Table.Td content={contentType} />
                <UU5.Bricks.Table.Td
                  style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  content={<a href={link}>{link} </a>}
                />
                <UU5.Bricks.Table.Td content={<UU5.Bricks.Button onClick={handlerMap.delete} content={"Delete"} />} />
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default ContentList;
