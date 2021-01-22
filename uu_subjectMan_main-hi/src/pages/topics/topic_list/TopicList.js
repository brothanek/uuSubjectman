import React from "react";
import UU5 from "uu5g04";
import { topicData } from "../../../mockData";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";

function TopicList() {
  if (topicData.length === 0) return <UU5.Bricks.Loading />;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("topic_create")}
        content={"Add new Topic"}
      />
      <UU5.Bricks.Table hover condensed header={useLsi(Lsi.topic.topicList.header)}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={useLsi(Lsi.topic.topicList.name)} />
            <UU5.Bricks.Table.Th content={"ID"} />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {topicData.map((col) => {
            const { topicName, id } = col;
            return (
              <UU5.Bricks.Table.Tr>
                <UU5.Bricks.Table.Td
                  content={
                    <UU5.Bricks.Link
                      onClick={() => UU5.Environment.getRouter().setRoute("topic", col)}
                      content={topicName}
                    />
                  }
                />
                <UU5.Bricks.Table.Td content={id} />
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default TopicList;
