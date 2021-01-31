import React from "react";
import UU5 from "uu5g04";
import { useDataList, useRef, useCallback, useUnmountedRef } from "uu5g04-hooks";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";
import Calls from "calls";
import TopicCreate from "../topic_create/TopicCreate";

function TopicList() {
  const modalRef = useRef();
  const alertBusRef = useRef();
  const unmountedRef = useUnmountedRef();
  const pageSize = 8;
  const dataListResult = useDataList({
    pageSize,
    handlerMap: {
      load: Calls.listTopics,
      createItem: Calls.createTopic,
    },
    itemHandlerMap: {
      delete: Calls.deleteTopic,
    },
  });

  const lsiHeader = useLsi(Lsi.topic.topicList.header);
  const lsiName = useLsi(Lsi.common.name);
  const lsiTopName = useLsi(Lsi.topic.name);
  const lsiManage = useLsi(Lsi.common.manage);
  const lsiDelete = useLsi(Lsi.common.delete);
  const lsiAdd = useLsi(Lsi.topic.add);

  const showModal = useCallback((onSave) => {
    const modal = modalRef.current;
    modal.open({
      header: lsiTopName,
      content: <TopicCreate onSave={onSave} modal={modal} />,
    });
  }, []);

  const handleCreate = useCallback(() => {
    showModal(async ({ component, values }) => {
      let data, error;
      try {
        console.log(dataListResult);
        data = await dataListResult.handlerMap.createItem(values);
      } catch (e) {
        console.warn(e);
        error = e;
      }
      if (unmountedRef.current) return;
      if (error) component.saveFail(error);
      else component.saveDone(data);
    });
  }, [showModal, unmountedRef, dataListResult]);

  if (dataListResult?.state !== "ready") return <UU5.Bricks.Loading />;

  return (
    <div>
      <UU5.Bricks.Button onClick={handleCreate} content={lsiAdd} colorSchema="success" />
      {dataListResult?.data.length < 1 ? (
        <h1>{"There are no data to load :("}</h1>
      ) : (
        <UU5.Bricks.Table hover condensed header={lsiHeader}>
          <UU5.Bricks.Table.THead>
            <UU5.Bricks.Table.Tr>
              <UU5.Bricks.Table.Th content={lsiName} />
              {UU5.Environment.App.authorization.canManageAll() && <UU5.Bricks.Table.Th content={lsiManage} />}
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
                {UU5.Environment.App.authorization.canManageAll() && (
                  <UU5.Bricks.Table.Td
                    content={<UU5.Bricks.Button onClick={() => handlerMap.delete()} content={lsiDelete} />}
                  />
                )}
              </UU5.Bricks.Table.Tr>
            ))}
          </UU5.Bricks.Table.TBody>
        </UU5.Bricks.Table>
      )}
      <UU5.Bricks.Modal controlled={false} ref={modalRef} mountContent="onEachOpen" />
      <UU5.Bricks.AlertBus ref={alertBusRef} />
    </div>
  );
}

export default TopicList;
