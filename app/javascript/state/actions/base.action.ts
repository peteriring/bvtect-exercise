import { serialize, serializable } from "serializr";
import { Action as ReduxAction } from "redux";
import { Dispatch } from "react";

type GuardedType<T extends { new (...args: any[]): any }> = T extends {
  new (...args: any[]): infer U;
}
  ? U
  : never;

export abstract class Action {
  @serializable
  public readonly type: string;

  public static isOfType<T extends { new (...args: any[]): any; type: string }>(
    candidate: Action | null,
    actionClass: T
  ): candidate is GuardedType<T> {
    return !!candidate && candidate instanceof actionClass;
  }

  constructor(type: string) {
    this.type = type;
  }

  public serialize(): ReduxAction<any> {
    return serialize(this);
  }

  public createAction(
    ...args: any[]
  ): (dispatch: Dispatch<ReduxAction<any>>) => Promise<void> | void {
    return (dispatch: Dispatch<ReduxAction<any>>) => {
      dispatch(serialize(this));
    };
  }
}

export abstract class ActionWithPayload<T> extends Action {
  public readonly payload: T;

  constructor(type: string, payload: T) {
    super(type);
    this.payload = payload;
  }
}

export abstract class ActionWithError extends Action {
  @serializable
  public readonly error: string;

  constructor(type: string, error: string) {
    super(type);
    this.error = error;
  }
}
