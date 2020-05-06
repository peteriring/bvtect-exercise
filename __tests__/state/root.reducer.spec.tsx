import {
  rootReducer,
  initialRootState,
  IRootState,
} from "../../app/javascript/state";
import * as Actions from "../../app/javascript/state/actions";
import * as Models from "../../app/javascript/models";
import { Unique } from "../../app/javascript/utility";
import { serializable } from "serializr";

class MockUnknownAction extends Actions.Action {
  public static type: string = Unique.type(
    "MockUnknownAction",
    MockUnknownAction
  );

  @serializable
  public readonly type: string;

  constructor() {
    super(MockUnknownAction.type);
  }
}

describe("rootReducer", () => {
  describe("for [MockUnknownAction]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = rootReducer(
        initialRootState,
        new MockUnknownAction().serialize()
      );
    });

    test("should not modify state", () => {
      expect(state).toEqual(initialRootState);
    });
  });

  describe("for [GetSportsAction]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = rootReducer(
        initialRootState,
        new Actions.GetSportsAction().serialize()
      );
    });

    test("should return with the expected state", () => {
      expect(state.error).toBeUndefined();
      expect(state.sports).toEqual([]);
      expect(state.isSportsLoading).toEqual(true);
    });
    describe("[Success]", () => {
      const payload = [Models.SportModel.Empty, Models.SportModel.Empty];
      let successState: IRootState;
      beforeEach(() => {
        successState = rootReducer(
          state,
          new Actions.GetSportsAction.Success(payload).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(successState.error).toBeUndefined();
        expect(successState.sports).toEqual(payload);
        expect(successState.isSportsLoading).toEqual(false);
      });
    });
    describe("[Failure]", () => {
      const message = "an issue occured";
      let failureState: IRootState;
      beforeEach(() => {
        failureState = rootReducer(
          state,
          new Actions.GetSportsAction.Failure(message).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(failureState.error).toEqual(message);
        expect(failureState.sports).toEqual([]);
        expect(failureState.isSportsLoading).toEqual(false);
      });
    });
  });

  describe("for [GetSportAction]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = rootReducer(
        initialRootState,
        new Actions.GetSportAction(1).serialize()
      );
    });

    test("should return with the expected state", () => {
      expect(state.error).toBeUndefined();
      expect(state.sport).toEqual(null);
      expect(state.isSportLoading).toEqual(true);
    });
    describe("[Success]", () => {
      const payload = Models.SportModel.Empty;
      let successState: IRootState;
      beforeEach(() => {
        successState = rootReducer(
          state,
          new Actions.GetSportAction.Success(payload).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(successState.error).toBeUndefined();
        expect(successState.sport).toEqual(payload);
        expect(successState.isSportLoading).toEqual(false);
      });
    });
    describe("[Failure]", () => {
      const message = "an issue occured";
      let failureState: IRootState;
      beforeEach(() => {
        failureState = rootReducer(
          state,
          new Actions.GetSportAction.Failure(message).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(failureState.error).toEqual(message);
        expect(failureState.sport).toEqual(null);
        expect(failureState.isSportLoading).toEqual(false);
      });
    });
  });

  describe("for [GetEventsAction]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = rootReducer(
        initialRootState,
        new Actions.GetEventsAction(1).serialize()
      );
    });

    test("should return with the expected state", () => {
      expect(state.error).toBeUndefined();
      expect(state.events).toEqual([]);
      expect(state.isEventsLoading).toEqual(true);
    });
    describe("[Success]", () => {
      const payload = [Models.EventModel.Empty, Models.EventModel.Empty];
      let successState: IRootState;
      beforeEach(() => {
        successState = rootReducer(
          state,
          new Actions.GetEventsAction.Success(payload).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(successState.error).toBeUndefined();
        expect(successState.events).toEqual(payload);
        expect(successState.isEventsLoading).toEqual(false);
      });
    });
    describe("[Failure]", () => {
      const message = "an issue occured";
      let failureState: IRootState;
      beforeEach(() => {
        failureState = rootReducer(
          state,
          new Actions.GetEventsAction.Failure(message).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(failureState.error).toEqual(message);
        expect(failureState.events).toEqual([]);
        expect(failureState.isEventsLoading).toEqual(false);
      });
    });
  });

  describe("for [GetEventAction]", () => {
    let state: IRootState;
    beforeEach(() => {
      state = rootReducer(
        initialRootState,
        new Actions.GetEventAction(
          new Actions.GetEventActionPayload(1, 1)
        ).serialize()
      );
    });

    test("should return with the expected state", () => {
      expect(state.error).toBeUndefined();
      expect(state.event).toEqual(null);
      expect(state.isEventLoading).toEqual(true);
    });
    describe("[Success]", () => {
      const payload = Models.EventModel.Empty;
      let successState: IRootState;
      beforeEach(() => {
        successState = rootReducer(
          state,
          new Actions.GetEventAction.Success(payload).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(successState.error).toBeUndefined();
        expect(successState.event).toEqual(payload);
        expect(successState.isEventLoading).toEqual(false);
      });
    });
    describe("[Failure]", () => {
      const message = "an issue occured";
      let failureState: IRootState;
      beforeEach(() => {
        failureState = rootReducer(
          state,
          new Actions.GetEventAction.Failure(message).serialize()
        );
      });

      test("should return with the expected state", () => {
        expect(failureState.error).toEqual(message);
        expect(failureState.event).toEqual(null);
        expect(failureState.isEventLoading).toEqual(false);
      });
    });
  });
});
