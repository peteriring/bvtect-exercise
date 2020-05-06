import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Loader } from "../../app/javascript/components/Loader";

describe("Loader", () => {
  describe("with isLoading: false", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    let props: any;
    beforeEach(() => {
      renderedElement = shallow(<Loader isLoading={false} />);
      props = renderedElement.props();
    });

    test("should render", () => {
      expect(renderedElement).toBeDefined();
    });

    test("should not render", () => {
      expect(props.open).toBe(false);
    });
  });
  describe("with isLoading: true", () => {
    let renderedElement: ShallowWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    let props: any;
    beforeEach(() => {
      renderedElement = shallow(<Loader isLoading={true} />);
      props = renderedElement.props();
    });

    test("should render", () => {
      expect(renderedElement).toBeDefined();
    });

    test("should render", () => {
      expect(props.open).toBe(true);
    });
  });
});
