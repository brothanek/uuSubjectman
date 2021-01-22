import React from "react";
import UU5 from "uu5g04";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../config/lsi";

function Top() {
  return (
    <div>
      <UU5.BlockLayout.Row>
        <UU5.BlockLayout.Column>
          <UU5.Bricks.Button
            onClick={() => UU5.Environment.getRouter().setRoute("home")}
            content={useLsi(Lsi.top.home)}
          />
        </UU5.BlockLayout.Column>
        <UU5.BlockLayout.Column>
          <UU5.Bricks.Button
            onClick={() => UU5.Environment.getRouter().setRoute("topics")}
            content={useLsi(Lsi.top.topics)}
          />
        </UU5.BlockLayout.Column>
        <UU5.BlockLayout.Column style={{ marginLeft: "300px" }}>
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
