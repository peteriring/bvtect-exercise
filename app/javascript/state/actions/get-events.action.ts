import { Action } from "redux";
import { Dispatch } from "react";
import { serializable, list, object } from "serializr";
import * as Models from "../../models";
import { Unique } from "../../utility";
import { BackendService } from "../../services";
import { ActionWithError, ActionWithPayload } from "./base.action";

export class GetEventsAction extends ActionWithPayload<number> {
  public static type: string = Unique.type("GetEventsAction", GetEventsAction);

  @serializable
  public payload: number;

  constructor(payload: number) {
    super(GetEventsAction.type, payload);
  }

  public createAction(): (dispatch: Dispatch<Action<any>>) => Promise<void> {
    return async (dispatch: Dispatch<Action<any>>) => {
      try {
        super.createAction()(dispatch);
        const events = await BackendService.getEvents(this.payload);
        new GetEventsAction.Success(events).createAction()(dispatch);
      } catch (error) {
        new GetEventsAction.Failure(error.message).createAction()(dispatch);
      }
    };
  }
}
export namespace GetEventsAction {
  export class Success extends ActionWithPayload<Array<Models.EventModel>> {
    public static type: string = Unique.type(
      "GetEventsAction.Success",
      Success
    );

    @serializable(list(object(Models.EventModel)))
    public payload: Array<Models.EventModel>;

    constructor(payload: Array<Models.EventModel>) {
      super(GetEventsAction.Success.type, payload);
    }
  }
  export class Failure extends ActionWithError {
    public static type: string = Unique.type(
      "GetEventsAction.Failure",
      Failure
    );

    @serializable
    public readonly error: string;

    constructor(error: string) {
      super(GetEventsAction.Failure.type, error);
    }
  }
}
