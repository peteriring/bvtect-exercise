import React from "react";
import { deserialize } from "serializr";
import { match } from "react-router-dom";
import { shallow, ShallowWrapper } from "enzyme";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import {
  EventList,
  IEventListProps,
  mapStateToProps,
  mapDispatchToProps,
} from "../../app/javascript/components/EventList";
import { IRootState, initialRootState } from "../../app/javascript/state";
import * as Models from "../../app/javascript/models";
import { MockHistory } from "../MockHistory";
import { MockDispatch } from "../MockDispatch";

describe("EventList", () => {
  let renderedElement: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  let history: MockHistory;
  beforeEach(() => {
    history = new MockHistory();
    const props: IEventListProps = {
      isSportLoading: false,
      sport: deserialize(Models.SportModel, {
        desc: "MockSport_1",
        id: 1,
        pos: 1,
      }),
      events: [
        deserialize(Models.EventModel, { desc: "OppAvsOppB", id: 1 }),
        deserialize(Models.EventModel, { desc: "OppCvsOppD", id: 2 }),
      ],
      history: history as any,
      location: "/sports/1" as any,
      match: { params: { sport_id: "1" } } as match<{ sport_id: string }>,
      getSport: (sportId: number) => {},
      getEvents: (sportId: number) => {},
    };

    renderedElement = shallow(<EventList {...props} />);
  });

  test("should render", () => {
    expect(renderedElement).toBeDefined();
  });

  test("should call componentDidUpdate", () => {
    spyOn(EventList.prototype, "componentDidUpdate").and.callThrough();
    renderedElement.setProps({ isSportLoading: true });
    expect(EventList.prototype.componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test("should fetch sport and events on init", () => {
    spyOn(EventList.prototype as any, "stateUpdateHook").and.callThrough();
    renderedElement.setProps({ sport: null, events: null });
    expect((EventList.prototype as any).stateUpdateHook).toHaveBeenCalledTimes(
      1
    );
  });

  test("should have exactly two children", () => {
    expect(renderedElement.children().length).toBe(2);
  });

  describe("slugify", () => {
    test("should return value as slug", () => {
      expect((EventList as any).slugify("Table Tennis")).toEqual(
        "table_tennis"
      );
    });

    test("should handle empty params", () => {
      expect((EventList as any).slugify()).toEqual("");
    });
  });

  describe("navigate on action area click", () => {
    beforeEach(() => {
      renderedElement.childAt(0).find(CardActionArea).simulate("click");
    });
    test("should write the proper history entry", () => {
      expect(history.location).toBe("/sports/1/events/1");
    });
  });

  describe("navigate on button click", () => {
    beforeEach(() => {
      renderedElement.childAt(0).find(Button).simulate("click");
    });
    test("should write the proper history entry", () => {
      expect(history.location).toBe("/sports/1/events/1");
    });
  });

  describe("navigate", () => {
    beforeEach(() => {
      renderedElement.setProps({ sport: undefined });
      renderedElement.childAt(0).find(Button).simulate("click");
    });
    test("should handle empty params", () => {
      expect(history.location).toBe("/");
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
    describe("[getSport]", () => {
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(() => {
        const props = mapDispatchToProps(dispatcher.dispatch);
        props.getSport(1);
      });
      test("should dispatch actions", () => {
        expect(dispatcher.actionList.length).toBeGreaterThan(0);
      });
    });

    describe("[getEvents]", () => {
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(() => {
        const props = mapDispatchToProps(dispatcher.dispatch);
        props.getEvents(1);
      });
      test("should dispatch actions", () => {
        expect(dispatcher.actionList.length).toBeGreaterThan(0);
      });
    });
  });
});
