import { IPolymorphActionCandidate, Unique } from "../utility";
import * as Models from "../models";
import * as Actions from "./actions";

export interface IRootState {
  sports: Array<Models.SportModel>;
  sport: Models.SportModel | null;
  events: Array<Models.EventModel>;
  event: Models.EventModel | null;
  isSportsLoading: boolean;
  isSportLoading: boolean;
  isEventsLoading: boolean;
  isEventLoading: boolean;
  error?: string;
}

export const initialRootState: IRootState = {
  sports: [],
  sport: null,
  events: [],
  event: null,
  isSportsLoading: false,
  isSportLoading: false,
  isEventsLoading: false,
  isEventLoading: false,
  error: undefined,
};

export function rootReducer(
  state: IRootState = initialRootState,
  candidate: IPolymorphActionCandidate
): IRootState {
  const action: Actions.Action | null = Unique.deserializeAction(candidate);

  if (action === null) return state;

  if (Actions.Action.isOfType(action, Actions.GetSportsAction)) {
    return { ...state, sports: [], isSportsLoading: true, error: undefined };
  }
  if (Actions.Action.isOfType(action, Actions.GetSportsAction.Success)) {
    return {
      ...state,
      sports: action.payload,
      isSportsLoading: false,
      error: undefined,
    };
  }
  if (Actions.Action.isOfType(action, Actions.GetSportsAction.Failure)) {
    return {
      ...state,
      sports: [],
      isSportsLoading: false,
      error: action.error,
    };
  }

  if (Actions.Action.isOfType(action, Actions.GetSportAction)) {
    return { ...state, sport: null, isSportLoading: true, error: undefined };
  }
  if (Actions.Action.isOfType(action, Actions.GetSportAction.Success)) {
    return {
      ...state,
      sport: action.payload,
      isSportLoading: false,
      error: undefined,
    };
  }
  if (Actions.Action.isOfType(action, Actions.GetSportAction.Failure)) {
    return {
      ...state,
      sport: null,
      isSportLoading: false,
      error: action.error,
    };
  }

  if (Actions.Action.isOfType(action, Actions.GetEventsAction)) {
    return { ...state, events: [], isEventsLoading: true, error: undefined };
  }
  if (Actions.Action.isOfType(action, Actions.GetEventsAction.Success)) {
    return {
      ...state,
      events: action.payload,
      isEventsLoading: false,
      error: undefined,
    };
  }
  if (Actions.Action.isOfType(action, Actions.GetEventsAction.Failure)) {
    return {
      ...state,
      events: [],
      isEventsLoading: false,
      error: action.error,
    };
  }

  if (Actions.Action.isOfType(action, Actions.GetEventAction)) {
    return { ...state, event: null, isEventLoading: true, error: undefined };
  }
  if (Actions.Action.isOfType(action, Actions.GetEventAction.Success)) {
    return {
      ...state,
      event: action.payload,
      isEventLoading: false,
      error: undefined,
    };
  }
  if (Actions.Action.isOfType(action, Actions.GetEventAction.Failure)) {
    return {
      ...state,
      event: null,
      isEventLoading: false,
      error: action.error,
    };
  }

  return state;
}
