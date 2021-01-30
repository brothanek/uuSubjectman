import React from "react";
import UU5 from "uu5g04";
import { useDataList } from "uu5g04-hooks";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";
import Calls from "calls";

function TopicList() {
  const pageSize = 8;
  const dataListResult = useDataList({
    pageSize,
    handlerMap: {
      load: Calls.listTopics,
      // createItem: Calls.createTopic,
    },
    itemHandlerMap: {
      delete: Calls.deleteTopic,
    },
  });

  const lsiHeader = useLsi(Lsi.topic.topicList.header);
  const lsiName = useLsi(Lsi.topic.topicList.name);

  if (dataListResult?.state !== "ready") return <UU5.Bricks.Loading />;
  if (dataListResult?.data.length < 1) return <h1>{"There are no data to load :("}</h1>;

  return (
    <div>
      <UU5.Bricks.Button
        onClick={() => UU5.Environment.getRouter().setRoute("topic_create")}
        content={"Add new Topic"}
      />
      <UU5.Bricks.Table hover condensed header={lsiHeader}>
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content={lsiName} />
            <UU5.Bricks.Table.Th content={"ID"} />
            <UU5.Bricks.Table.Th content={"Manage"} />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          {(dataListResult?.data || []).map(({ data, handlerMap }) => (
            <UU5.Bricks.Table.Tr key={data}>
              <UU5.Bricks.Table.Td
                content={
                  <UU5.Bricks.Link
                    onClick={() => UU5.Environment.getRouter().setRoute("topic", data)}
                    content={data?.topicName}
                  />
                }
              />
              <UU5.Bricks.Table.Td content={data?.id} />
              <UU5.Bricks.Table.Td content={<UU5.Bricks.Button onClick={handlerMap.delete} content={"Delete"} />} />
            </UU5.Bricks.Table.Tr>
          ))}
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    </div>
  );
}

export default TopicList;
