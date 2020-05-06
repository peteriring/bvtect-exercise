import React from "react";
import { deserialize } from "serializr";
import { shallow, ShallowWrapper } from "enzyme";
import { AppBreadcrumbs } from "../../app/javascript/components/AppBreadcrumbs";
import * as Models from "../../app/javascript/models";

const mockSport = deserialize(Models.SportModel, { desc: "MockSport" });
const mockEvent = deserialize(Models.EventModel, { desc: "MockEvent" });

describe("AppBreadcrumbs", () => {
  describe("with path: '/'", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    beforeEach(() => {
      renderedElement = shallow(
        <AppBreadcrumbs
          location={{ pathname: "/" }}
          sport={mockSport}
          event={mockEvent}
        />
      );
    });

    test("should render", () => {
      expect(renderedElement).toBeDefined();
    });

    test("should have exactly one child", () => {
      expect(renderedElement.children().length).toBe(1);
    });
  });

  describe("with path: 'sports/mock_id", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    beforeEach(() => {
      renderedElement = shallow(
        <AppBreadcrumbs
          location={{ pathname: "/sports/mock_id" }}
          sport={mockSport}
          event={mockEvent}
        />
      );
    });

    test("should render", () => {
      expect(renderedElement).toBeDefined();
    });

    test("should have exactly two children", () => {
      expect(renderedElement.children().length).toBe(2);
    });

    test("should have the passed sport name displayed", () => {
      expect(renderedElement.childAt(1).text()).toBe(mockSport.desc);
    });
  });

  describe("with path: 'sports/mock_id/events/mock_id", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    beforeEach(() => {
      renderedElement = shallow(
        <AppBreadcrumbs
          location={{ pathname: "/sports/mock_id/events/mock_id" }}
          sport={mockSport}
          event={mockEvent}
        />
      );
    });

    test("should render", () => {
      expect(renderedElement).toBeDefined();
    });

    test("should have exactly three children", () => {
      expect(renderedElement.children().length).toBe(3);
    });

    test("should have the passed sport name displayed", () => {
      expect(renderedElement.childAt(1).text()).toBe(mockSport.desc);
    });

    test("should have the passed event name displayed", () => {
      expect(renderedElement.childAt(2).text()).toBe(mockEvent.desc);
    });
  });

  describe("with path: 'sports/mock_id/events/mock_id without input sport/event props", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    beforeEach(() => {
      renderedElement = shallow(
        <AppBreadcrumbs
          location={{ pathname: "/sports/mock_id/events/mock_id" }}
          sport={null}
          event={null}
        />
      );
    });

    test("should have exactly three children", () => {
      expect(renderedElement.children().length).toBe(3);
    });

    test("should have the fallback sport name displayed", () => {
      expect(renderedElement.childAt(1).text()).toBe("Sport");
    });

    test("should have the fallback event name displayed", () => {
      expect(renderedElement.childAt(2).text()).toBe("Event");
    });
  });
});
