import { Action as ReduxAction } from "redux";
import { Dispatch } from "react";
import { serializable, list, object } from "serializr";
import * as Models from "../../models";
import { Unique } from "../../utility";
import { BackendService } from "../../services";
import { Action, ActionWithError, ActionWithPayload } from "./base.action";

export class GetSportsAction extends Action {
  public static type: string = Unique.type("GetSportsAction", GetSportsAction);

  @serializable
  public readonly type: string;

  constructor() {
    super(GetSportsAction.type);
  }

  public createAction(): (
    dispatch: Dispatch<ReduxAction<any>>
  ) => Promise<void> {
    return async (dispatch: Dispatch<ReduxAction<any>>) => {
      try {
        super.createAction()(dispatch);
        const sports = await BackendService.getSports();
        new GetSportsAction.Success(sports).createAction()(dispatch);
      } catch (error) {
        new GetSportsAction.Failure(error.message).createAction()(dispatch);
      }
    };
  }
}
export namespace GetSportsAction {
  export class Success extends ActionWithPayload<Array<Models.SportModel>> {
    public static type: string = Unique.type(
      "GetSportsAction.Success",
      Success
    );

    @serializable(list(object(Models.SportModel)))
    public payload: Array<Models.SportModel>;

    constructor(payload: Array<Models.SportModel>) {
      super(GetSportsAction.Success.type, payload);
    }
  }
  export class Failure extends ActionWithError {
    public static type: string = Unique.type(
      "GetSportsAction.Failure",
      Failure
    );

    @serializable
    public readonly error: string;

    constructor(error: string) {
      super(GetSportsAction.Failure.type, error);
    }
  }
}
