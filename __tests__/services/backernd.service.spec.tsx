import axios from "axios";
import { serialize } from "serializr";

import { BackendService } from "../../app/javascript/services";
import * as Models from "../../app/javascript/models";

jest.mock("axios");

describe("BackendService", () => {
  describe("[getSports]", () => {
    const data = [serialize(Models.SportModel.Empty)];
    let result: Array<Models.SportModel>;
    beforeEach(async () => {
      (axios.get as any).mockImplementationOnce(() =>
        Promise.resolve({ data })
      );
      result = await BackendService.getSports();
    });

    it("fetches successfully data from an API", async () => {
      result.forEach((res: Models.SportModel) => {
        expect(res).toEqual(Models.SportModel.Empty);
        expect(res instanceof Models.SportModel).toBeTruthy();
      });
    });
  });

  describe("[getSport]", () => {
    const data = serialize(Models.SportModel.Empty);
    let result: Models.SportModel;
    beforeEach(async () => {
      (axios.get as any).mockImplementationOnce(() =>
        Promise.resolve({ data })
      );
      result = await BackendService.getSport(1);
    });

    it("fetches successfully data from an API", async () => {
      expect(result).toEqual(Models.SportModel.Empty);
      expect(result instanceof Models.SportModel).toBeTruthy();
    });
  });

  describe("[getEvents]", () => {
    const data = [serialize(Models.EventModel.Empty)];
    let result: Array<Models.EventModel>;
    beforeEach(async () => {
      (axios.get as any).mockImplementationOnce(() =>
        Promise.resolve({ data })
      );
      result = await BackendService.getEvents(1);
    });

    it("fetches successfully data from an API", async () => {
      result.forEach((res: Models.EventModel) => {
        expect(res).toEqual(Models.EventModel.Empty);
        expect(res instanceof Models.EventModel).toBeTruthy();
      });
    });
  });

  describe("[getEvent]", () => {
    const data = serialize(Models.EventModel.Empty);
    let result: Models.EventModel;
    beforeEach(async () => {
      (axios.get as any).mockImplementationOnce(() =>
        Promise.resolve({ data })
      );
      result = await BackendService.getEvent(1, 1);
    });

    it("fetches successfully data from an API", async () => {
      expect(result).toEqual(Models.EventModel.Empty);
      expect(result instanceof Models.EventModel).toBeTruthy();
    });
  });
});
