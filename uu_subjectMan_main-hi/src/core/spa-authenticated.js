//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config";
import Top from "./top";

import Bottom from "./bottom";
import Home from "../routes/home";
import Subject from "../pages/subjects/subject_view/Subject";
import SubjectCreate from "../pages/subjects/subject_create/SubjectCreate";
import TopicList from "../pages/topics/topic_list/TopicList";
import TopicCreate from "../pages/topics/topic_create/TopicCreate";
import Topic from "../pages/topics/topic_view/Topic";
import Content from "../pages/content/content_view/Content";
import ContentCreate from "../pages/content/content_create/ContentCreate";
import ContentList from "../pages/content/content_list/ContentList";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics
};

const About = UU5.Common.Component.lazy(() => import("../routes/about"));
const InitAppWorkspace = UU5.Common.Component.lazy(() => import("../routes/init-app-workspace"));
const ControlPanel = UU5.Common.Component.lazy(() => import("../routes/control-panel"));

const DEFAULT_USE_CASE = "home";
const ROUTES = {
  "": DEFAULT_USE_CASE,
  home: { component: <Home /> },
  about: { component: <About /> },
  subject: { component: <Subject /> },
  topics: { component: <TopicList /> },
  topic: { component: <Topic /> },
  content: { component: <Content /> },
  content_list: { component: <ContentList /> },
  content_create: { component: <ContentCreate /> },
  subject_create: { component: <SubjectCreate /> },
  topic_create: { component: <TopicCreate /> },

  "sys/uuAppWorkspace/initUve": { component: <InitAppWorkspace /> },
  controlPanel: { component: <ControlPanel /> },
};

export const SpaAuthenticated = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let [initialActiveItemId] = useState(() => {
      let url = UU5.Common.Url.parse(window.location.href);
      return url.useCase || DEFAULT_USE_CASE;
    });
    const [edit, setEdit] = useState(false);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
        <Plus4U5.App.Page
          {...props}
          top={<Plus4U5.App.TopBt children={<Top />} />}
          topFixed="smart"
          bottom={<Bottom />}
          type={3}
          displayedLanguages={["cs", "en"]}
          // left={<Left />}
          leftWidth="!xs-300px !s-300px !m-288px !l-288px !xl-288px"
          leftFixed
          leftRelative="m l xl"
          leftResizable="m l xl"
          leftResizableMinWidth={220}
          leftResizableMaxWidth={500}
          isLeftOpen="m l xl"
          showLeftToggleButton
          fullPage
        >
          <Plus4U5.App.MenuConsumer>
            {({ setActiveItemId }) => {
              let handleRouteChanged = ({ useCase, parameters }) => setActiveItemId(useCase || DEFAULT_USE_CASE);
              return <UU5.Common.Router routes={ROUTES} controlled={false} onRouteChanged={handleRouteChanged} />;
            }}
          </Plus4U5.App.MenuConsumer>
        </Plus4U5.App.Page>
      </Plus4U5.App.MenuProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
