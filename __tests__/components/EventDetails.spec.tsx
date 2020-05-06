import React from "react";
import { deserialize } from "serializr";
import { shallow, ShallowWrapper } from "enzyme";
import { match } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import {
  EventDetails,
  IEventDetailsProps,
  mapStateToProps,
  mapDispatchToProps,
} from "../../app/javascript/components/EventDetails";
import { IRootState, initialRootState } from "../../app/javascript/state";
import * as Models from "../../app/javascript/models";
import { MockHistory } from "../MockHistory";
import { MockDispatch } from "../MockDispatch";

describe("EventDetails", () => {
  let renderedElement: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  beforeEach(() => {
    const props: IEventDetailsProps = {
      event: deserialize(Models.EventModel, { desc: "OppAvsOppB", id: 1 }),
      isEventLoading: false,
      history: new MockHistory() as any,
      location: "/sports/1/events/1" as any,
      match: { params: { sport_id: "1", event_id: "1" } } as match<{
        sport_id: string;
        event_id: string;
      }>,
      getEvent: () => {},
    };
    renderedElement = shallow(<EventDetails {...props} />);
  });

  test("should render", () => {
    expect(renderedElement).toBeDefined();
  });

  test("should call componentDidUpdate", () => {
    spyOn(EventDetails.prototype, "componentDidUpdate").and.callThrough();
    renderedElement.setProps({ isEventLoading: true });
    expect(EventDetails.prototype.componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test("should run stateUpdateHook if event ids are not matching", () => {
    spyOn(EventDetails.prototype as any, "stateUpdateHook").and.callThrough();
    renderedElement.setProps({
      event: deserialize(Models.EventModel, { desc: "OppCvsOppD", id: 2 }),
    });
    expect(
      (EventDetails.prototype as any).stateUpdateHook
    ).toHaveBeenCalledTimes(1);
  });

  test("should decide if tie", () => {
    renderedElement.setProps({
      event: deserialize(Models.EventModel, {
        desc: "OppCvsOppD",
        id: 2,
        scoreboard: { scrA: 0, scrB: 0 },
      }),
    });
    const [a, b] = renderedElement
      .find(CardContent)
      .map((content) => content.childAt(0).text());
    expect(a).toMatch(/Tie/);
    expect(b).toMatch(/Tie/);
  });

  test("should decide if the first opponent is the winner", () => {
    renderedElement.setProps({
      event: deserialize(Models.EventModel, {
        desc: "OppCvsOppD",
        id: 2,
        scoreboard: { scrA: 1, scrB: 0 },
      }),
    });
    const [a, b] = renderedElement
      .find(CardContent)
      .map((content) => content.childAt(0).text());
    expect(a).toMatch(/Win/);
    expect(b).toMatch(/Lose/);
  });

  test("should decide if the second opponent is the winner", () => {
    renderedElement.setProps({
      event: deserialize(Models.EventModel, {
        desc: "OppCvsOppD",
        id: 2,
        scoreboard: { scrA: 0, scrB: 1 },
      }),
    });
    const [a, b] = renderedElement
      .find(CardContent)
      .map((content) => content.childAt(0).text());
    expect(a).toMatch(/Lose/);
    expect(b).toMatch(/Win/);
  });

  test("should handle empty event prop", () => {
    renderedElement.setProps({ event: null });
    expect(renderedElement.childAt(0).childAt(0).children().length).toBe(3);
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
    describe("[getEvent]", () => {
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(() => {
        const props = mapDispatchToProps(dispatcher.dispatch);
        props.getEvent(1, 1);
      });
      test("should dispatch actions", () => {
        expect(dispatcher.actionList.length).toBeGreaterThan(0);
      });
    });
  });
});
