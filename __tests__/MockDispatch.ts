import { Action } from "../app/javascript/state/actions";

export interface IActionChild extends Action {}

export class MockDispatch {
  public readonly actionList: Array<IActionChild> = [];

  public dispatch = (action: IActionChild): void => {
    this.actionList.push(action);
  };
}
