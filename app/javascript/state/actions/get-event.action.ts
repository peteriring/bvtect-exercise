import { Action } from "redux";
import { Dispatch } from "react";
import { serializable, object } from "serializr";
import * as Models from "../../models";
import { Unique } from "../../utility";
import { BackendService } from "../../services";
import { ActionWithError, ActionWithPayload } from "./base.action";

export class GetEventActionPayload {
  @serializable
  public readonly sportId: number;

  @serializable
  public readonly eventId: number;

  constructor(sportId: number, eventId: number) {
    this.sportId = sportId;
    this.eventId = eventId;
  }
}
export class GetEventAction extends ActionWithPayload<GetEventActionPayload> {
  public static type: string = Unique.type("GetEventAction", GetEventAction);

  @serializable(object(GetEventActionPayload))
  public payload: GetEventActionPayload;

  constructor(payload: GetEventActionPayload) {
    super(GetEventAction.type, payload);
  }

  public createAction(): (dispatch: Dispatch<Action<any>>) => Promise<void> {
    return async (dispatch: Dispatch<Action<any>>) => {
      try {
        super.createAction()(dispatch);
        const events = await BackendService.getEvent(
          this.payload.sportId,
          this.payload.eventId
        );
        new GetEventAction.Success(events).createAction()(dispatch);
      } catch (error) {
        new GetEventAction.Failure(error.message).createAction()(dispatch);
      }
    };
  }
}
export namespace GetEventAction {
  export class Success extends ActionWithPayload<Models.EventModel> {
    public static type: string = Unique.type("GetEventAction.Success", Success);

    @serializable(object(Models.EventModel))
    public payload: Models.EventModel;

    constructor(payload: Models.EventModel) {
      super(GetEventAction.Success.type, payload);
    }
  }
  export class Failure extends ActionWithError {
    public static type: string = Unique.type("GetEventAction.Failure", Failure);

    @serializable
    public readonly error: string;

    constructor(error: string) {
      super(GetEventAction.Failure.type, error);
    }
  }
}
