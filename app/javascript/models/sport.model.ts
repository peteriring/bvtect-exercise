import { serializable } from "serializr";

export class SportModel {
  public static get Empty(): SportModel {
    return new SportModel();
  }

  @serializable
  public readonly id: number;

  @serializable
  public readonly desc: string;

  @serializable
  public readonly pos: number;

  @serializable
  public readonly hasUpcomingEvents: boolean;
}
