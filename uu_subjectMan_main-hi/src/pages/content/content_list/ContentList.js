import React from "react";
import UU5 from "uu5g04";
import { contentData } from "../../../mockData";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";

function ContentList() {
  if (contentData.length === 0) return <UU5.Bricks.Loading />;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("content_create")}
        content={"Add new Digital content"}
      />
      <UU5.Bricks.Table hover condensed header={useLsi(Lsi.subject.subjectList.header)}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={useLsi(Lsi.common.name)} />
            <UU5.Bricks.Table.Th content="Content type" />
            <UU5.Bricks.Table.Th content="Link" />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {contentData.map((col) => {
            const { contentName, contentType, link } = col;
            return (
              <UU5.Bricks.Table.Tr>
                <UU5.Bricks.Table.Td
                  content={
                    <UU5.Bricks.Link
                      onClick={() => UU5.Environment.getRouter().setRoute("content", col)}
                      content={contentName}
                    />
                  }
                />
                <UU5.Bricks.Table.Td content={contentType} />
                <UU5.Bricks.Table.Td content={link} />
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default ContentList;
