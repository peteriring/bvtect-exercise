import { serializable, alias, primitive, object } from "serializr";

export class Scoreboard {
  public static get Empty(): Scoreboard {
    return new Scoreboard();
  }

  @serializable(alias("scrA", primitive()))
  public readonly scoreA: number;

  @serializable(alias("scrB", primitive()))
  public readonly scoreB: number;
}

export class EventModel {
  public static get Empty(): EventModel {
    return new EventModel();
  }

  @serializable
  public readonly id: number;

  @serializable
  public readonly desc: string;

  @serializable(alias("has_stream", primitive()))
  public readonly hasStream: boolean;

  @serializable(alias("oppADesc", primitive()))
  public readonly opponentADescription: string;

  @serializable(alias("oppBDesc", primitive()))
  public readonly opponentBDescription: string;

  @serializable(object(Scoreboard))
  public readonly scoreboard: Scoreboard = Scoreboard.Empty;
}
