import axios from "axios";
import { serialize } from "serializr";

import * as Actions from "../../app/javascript/state/actions";
import * as Models from "../../app/javascript/models";
import { Unique } from "../../app/javascript/utility";

import { MockDispatch, IActionChild } from "../MockDispatch";

jest.mock("axios");

describe("Actions", () => {
  describe("for [GetSportsAction]", () => {
    describe("[Success]", () => {
      const data = [serialize(Models.SportModel.Empty)];
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.resolve({ data })
        );
        await new Actions.GetSportsAction().createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          success,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(success).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetSportsAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(success, Actions.GetSportsAction.Success)
        ).toBe(true);
      });
    });
    describe("[Failure]", () => {
      const message = "Mocked Error Message";
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.reject(new Error(message))
        );
        await new Actions.GetSportsAction().createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          failure,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(failure).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetSportsAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(failure, Actions.GetSportsAction.Failure)
        ).toBe(true);
        expect((failure as Actions.GetSportsAction.Failure).error).toBe(
          message
        );
      });
    });
  });

  describe("for [GetSportAction]", () => {
    describe("[Success]", () => {
      const data = serialize(Models.SportModel.Empty);
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.resolve({ data })
        );
        await new Actions.GetSportAction(1).createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          success,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(success).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetSportAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(success, Actions.GetSportAction.Success)
        ).toBe(true);
      });
    });
    describe("[Failure]", () => {
      const message = "Mocked Error Message";
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.reject(new Error(message))
        );
        await new Actions.GetSportAction(1).createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          failure,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(failure).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetSportAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(failure, Actions.GetSportAction.Failure)
        ).toBe(true);
        expect((failure as Actions.GetSportAction.Failure).error).toBe(message);
      });
    });
  });

  describe("for [GetEventsAction]", () => {
    describe("[Success]", () => {
      const data = [serialize(Models.EventModel.Empty)];
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.resolve({ data })
        );
        await new Actions.GetEventsAction(1).createAction()(
          dispatcher.dispatch
        );
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          success,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(success).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetEventsAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(success, Actions.GetEventsAction.Success)
        ).toBe(true);
      });
    });
    describe("[Failure]", () => {
      const message = "Mocked Error Message";
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.reject(new Error(message))
        );
        await new Actions.GetEventsAction(1).createAction()(
          dispatcher.dispatch
        );
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          failure,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(failure).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetEventsAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(failure, Actions.GetEventsAction.Failure)
        ).toBe(true);
        expect((failure as Actions.GetEventsAction.Failure).error).toBe(
          message
        );
      });
    });
  });

  describe("for [GetEventAction]", () => {
    describe("[Success]", () => {
      const data = serialize(Models.EventModel.Empty);
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.resolve({ data })
        );
        await new Actions.GetEventAction(
          new Actions.GetEventActionPayload(1, 1)
        ).createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          success,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(success).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetEventAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(success, Actions.GetEventAction.Success)
        ).toBe(true);
      });
    });
    describe("[Failure]", () => {
      const message = "Mocked Error Message";
      const dispatcher: MockDispatch = new MockDispatch();
      beforeEach(async () => {
        (axios.get as any).mockImplementationOnce(() =>
          Promise.reject(new Error(message))
        );
        await new Actions.GetEventAction(
          new Actions.GetEventActionPayload(1, 1)
        ).createAction()(dispatcher.dispatch);
      });

      test("should dispatch actions in the right order", () => {
        expect(dispatcher.actionList.length).toBe(2);
        const [
          action,
          failure,
        ]: Array<IActionChild | null> = dispatcher.actionList.map((action) =>
          Unique.deserializeAction(action)
        );
        expect(action).not.toBeNull();
        expect(failure).not.toBeNull();
        expect(Actions.Action.isOfType(action, Actions.GetEventAction)).toBe(
          true
        );
        expect(
          Actions.Action.isOfType(failure, Actions.GetEventAction.Failure)
        ).toBe(true);
        expect((failure as Actions.GetEventAction.Failure).error).toBe(message);
      });
    });
  });
});
