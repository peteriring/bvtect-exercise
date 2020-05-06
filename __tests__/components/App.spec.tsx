import React from "react";
import { deserialize } from "serializr";
import { shallow, ShallowWrapper } from "enzyme";
import { match } from "react-router-dom";
import { App, mapStateToProps } from "../../app/javascript/components/App";
import {
  initialRootState,
  IRootState,
} from "../../app/javascript/state/root.reducer";
import * as Models from "../../app/javascript/models";
import { MockHistory } from "../MockHistory";

describe("App", () => {
  let renderedElement: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  beforeEach(() => {
    const props = {
      ...initialRootState,
      history: new MockHistory() as any,
      location: "/sports/1/events/1" as any,
      match: { params: { sport_id: "1", event_id: "1" } } as match<{
        sport_id: string;
        event_id: string;
      }>,
    };
    renderedElement = shallow(<App {...props} />);
  });

  test("should render", () => {
    expect(renderedElement).toBeDefined();
  });

  test("should handle sport prop", () => {
    renderedElement.setProps({
      sport: deserialize(Models.SportModel, {
        desc: "MockSport_1",
        id: 1,
        pos: 1,
      }),
    });
    expect(renderedElement).toBeDefined();
  });

  describe("[mapStateToProps]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = mapStateToProps(initialRootState);
    });
    test("should return the original state", () => {
      expect(state).toEqual(initialRootState);
    });
  });
});
