import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { SportPlaceholder } from "../../app/javascript/components/SportPlaceholder";

describe("SportPlaceholder", () => {
  let renderedElement: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  beforeEach(() => {
    renderedElement = shallow(<SportPlaceholder />);
  });

  test("should render", () => {
    expect(renderedElement).toBeDefined();
  });
});
