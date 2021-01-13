import React, { useContext } from "react";
import UU5 from "uu5g04";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../config/lsi";
import { EditContext } from "../contexts/editContext";

function Top() {
  const { edit, setEdit } = useContext(EditContext);
  console.log(edit);
  return (
    <div>
      <UU5.BlockLayout.Row>
        <UU5.BlockLayout.Column>
          <UU5.Bricks.Button
            onClick={() => UU5.Environment.getRouter().setRoute("home")}
            content={useLsi(Lsi.top.home)}
          />
        </UU5.BlockLayout.Column>

        <UU5.BlockLayout.Column style={{ marginLeft: "300px" }}>
          <UU5.Bricks.Button onClick={() => setEdit(!edit)}>{useLsi(Lsi.top.edit)}</UU5.Bricks.Button>

          <UU5.Bricks.Button
            onClick={() => UU5.Environment.getRouter().setRoute("about")}
            content={useLsi(Lsi.top.about)}
          />
        </UU5.BlockLayout.Column>
      </UU5.BlockLayout.Row>
    </div>
  );
}

export default Top;
