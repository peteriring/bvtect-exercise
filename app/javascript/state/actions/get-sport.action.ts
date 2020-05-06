import { Action } from "redux";
import { Dispatch } from "react";
import { serializable, object } from "serializr";
import * as Models from "../../models";
import { Unique } from "../../utility";
import { BackendService } from "../../services";
import { ActionWithError, ActionWithPayload } from "./base.action";

export class GetSportAction extends ActionWithPayload<number> {
  public static type: string = Unique.type("GetSportAction", GetSportAction);

  @serializable
  public payload: number;

  constructor(id: number) {
    super(GetSportAction.type, id);
  }

  public createAction(): (dispatch: Dispatch<Action<any>>) => Promise<void> {
    return async (dispatch: Dispatch<Action<any>>) => {
      try {
        super.createAction()(dispatch);
        const sport = await BackendService.getSport(this.payload);
        new GetSportAction.Success(sport).createAction()(dispatch);
      } catch (error) {
        new GetSportAction.Failure(error.message).createAction()(dispatch);
      }
    };
  }
}
export namespace GetSportAction {
  export class Success extends ActionWithPayload<Models.SportModel> {
    public static type: string = Unique.type("GetSportAction.Success", Success);

    @serializable(object(Models.SportModel))
    public payload: Models.SportModel;

    constructor(payload: Models.SportModel) {
      super(GetSportAction.Success.type, payload);
    }
  }
  export class Failure extends ActionWithError {
    public static type: string = Unique.type("GetSportAction.Failure", Failure);

    @serializable
    public readonly error: string;

    constructor(error: string) {
      super(GetSportAction.Failure.type, error);
    }
  }
}
