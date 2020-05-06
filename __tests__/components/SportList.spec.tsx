import React from "react";
import { match } from "react-router-dom";
import { deserialize } from "serializr";
import { shallow, ShallowWrapper } from "enzyme";
import {
  SportList,
  ISportListProps,
  mapStateToProps,
  mapDispatchToProps,
} from "../../app/javascript/components/SportList";
import { IRootState, initialRootState } from "../../app/javascript/state";
import * as Models from "../../app/javascript/models";
import { MockHistory } from "../MockHistory";
import { MockDispatch } from "../MockDispatch";

describe("SportList", () => {
  let renderedElement: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  let history: MockHistory;
  beforeEach(() => {
    history = new MockHistory();
    const props: ISportListProps = {
      sports: [
        deserialize(Models.SportModel, { desc: "MockSport_1", id: 1, pos: 1 }),
        deserialize(Models.SportModel, { desc: "MockSport_2", id: 2, pos: 0 }),
      ],
      sport: deserialize(Models.SportModel, {
        desc: "MockSport_1",
        id: 1,
        pos: 1,
      }),
      history: history as any,
      location: "/sports/1/events/1" as any,
      match: { params: { sport_id: "1", event_id: "1" } } as match<{
        sport_id: string;
        event_id: string;
      }>,
      getSports: () => {},
    };

    renderedElement = shallow(<SportList {...props} />);
  });

  test("should render", () => {
    expect(renderedElement).toBeDefined();
  });

  test("should handle empty sport prop", () => {
    renderedElement.setProps({ sport: null });
    expect(renderedElement).toBeDefined();
  });

  test("should have exactly two children", () => {
    expect(renderedElement.children().length).toBe(2);
  });
  test("should respect pos prop", () => {
    expect(renderedElement.childAt(0).key()).toBe("2");
    expect(renderedElement.childAt(1).key()).toBe("1");
  });

  describe("navigate on click", () => {
    beforeEach(() => {
      renderedElement.childAt(0).simulate("click");
    });
    test("should write the proper history entry", () => {
      expect(history.location).toBe("/sports/2");
    });
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

  describe("[mapDispatchToProps]", () => {
    describe("[getSports]", () => {
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(() => {
        const props = mapDispatchToProps(dispatcher.dispatch);
        props.getSports();
      });
      test("should dispatch actions", () => {
        expect(dispatcher.actionList.length).toBeGreaterThan(0);
      });
    });
  });
});
