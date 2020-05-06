import axios from "axios";
import { deserialize } from "serializr";
import * as Models from "../models";

export abstract class BackendService {
  public static async getSports(): Promise<Array<Models.SportModel>> {
    const response = await axios.get("/api/sports");
    return response.data.map((sport: any) =>
      deserialize(Models.SportModel, sport)
    );
  }

  public static async getSport(id: number): Promise<Models.SportModel> {
    const response = await axios.get(`/api/sports/${id}`);
    return deserialize(Models.SportModel, response.data);
  }

  public static async getEvents(id: number): Promise<Array<Models.EventModel>> {
    const response = await axios.get(`/api/sports/${id}/events`);
    return response.data.map((sport: any) =>
      deserialize(Models.EventModel, sport)
    );
  }

  public static async getEvent(
    sportId: number,
    eventId: number
  ): Promise<Models.EventModel> {
    const response = await axios.get(
      `/api/sports/${sportId}/events/${eventId}`
    );
    return deserialize(Models.EventModel, response.data);
  }
}
