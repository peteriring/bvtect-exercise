import { Unique } from "../../app/javascript/utility";
import * as Actions from "../../app/javascript/state/actions";

const mockUniqueTypeTest = () => {
  const type = "ActionType";
  class Action1 extends Actions.Action {
    public static type: string = Unique.type(type, Action1);
    constructor() {
      super(Action1.type);
    }
  }
  class Action2 extends Actions.Action {
    public static type: string = Unique.type(type, Action2);
    constructor() {
      super(Action2.type);
    }
  }

  return [Action1, Action2];
};
const mockUniqueValueTest = () => {
  const type = "ActionType";
  class Action1 extends Actions.Action {
    public static type: string = Unique.type("ActionType1", Action1);
    constructor() {
      super(Action1.type);
    }
  }
  class Action2 extends Actions.Action {
    public static type: string = Unique.type("ActionType2", Action1);
    constructor() {
      super(Action2.type);
    }
  }

  return [Action1, Action2];
};

describe("Unique", () => {
  test("should not register two of the same actiontype", () => {
    expect(mockUniqueTypeTest).toThrowError();
  });
  test("should not register two of the same actions with different types", () => {
    expect(mockUniqueValueTest).toThrowError();
  });
});
