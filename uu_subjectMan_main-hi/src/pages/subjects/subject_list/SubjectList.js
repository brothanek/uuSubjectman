import React from "react";
import UU5 from "uu5g04";
import Calls from "calls";
import { useDataList, useRef, useCallback, useUnmountedRef } from "uu5g04-hooks";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";
import SubjectCreate from "../subject_create/SubjectCreate";

function SubjectList() {
  const modalRef = useRef();
  const alertBusRef = useRef();
  const unmountedRef = useUnmountedRef();
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

  const lsiName = useLsi(Lsi.common.name);
  const lsiHeader = useLsi(Lsi.subject.subjectList.header);

  const showModal = useCallback((onSave) => {
    const modal = modalRef.current;
    modal.open({
      header: "Create Subject",
      content: <SubjectCreate onSave={onSave} modal={modal} />,
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
      <UU5.Bricks.Button onClick={handleCreate} content={"Add new Subject"} />
      {dataListResult?.data.length < 1 ? (
        <h1>{"There are no data to load :("}</h1>
      ) : (
        <UU5.Bricks.Table hover condensed header={lsiHeader}>
          <UU5.Bricks.Table.THead>
            <UU5.Bricks.Table.Tr>
              <UU5.Bricks.Table.Th content={lsiName} />
              <UU5.Bricks.Table.Th content="Credits" />
              <UU5.Bricks.Table.Th content="Degree" />
              <UU5.Bricks.Table.Th content="Language" />
              {UU5.Environment.App.authorization.canManageAll() && <UU5.Bricks.Table.Th content="Manage" />}
            </UU5.Bricks.Table.Tr>
          </UU5.Bricks.Table.THead>

          <UU5.Bricks.Table.TBody>
            {(dataListResult?.data || []).map(({ data, handlerMap }) => {
              const { credits, name, id, degree, language = "" } = data;
              return (
                <UU5.Bricks.Table.Tr key={data}>
                  <UU5.Bricks.Table.Td
                    content={
                      <UU5.Bricks.Link
                        onClick={() => UU5.Environment.getRouter().setRoute("subject", data)}
                        content={name}
                      />
                    }
                  />
                  <UU5.Bricks.Table.Td content={credits} />
                  <UU5.Bricks.Table.Td content={degree} />
                  <UU5.Bricks.Table.Td content={language} />
                  {UU5.Environment.App.authorization.canManageAll() && (
                    <UU5.Bricks.Table.Td
                      content={<UU5.Bricks.Button onClick={handlerMap.delete} content={"Delete"} />}
                    />
                  )}
                </UU5.Bricks.Table.Tr>
              );
            })}
          </UU5.Bricks.Table.TBody>
        </UU5.Bricks.Table>
      )}
      <UU5.Bricks.Modal controlled={false} ref={modalRef} mountContent="onEachOpen" />
      <UU5.Bricks.AlertBus ref={alertBusRef} />
    </div>
  );
}

export default SubjectList;
