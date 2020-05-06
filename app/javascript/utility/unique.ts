import { deserialize, Clazz } from "serializr";
import { Action } from "../state/actions";

export interface IPolymorphActionCandidate {
  type: string;
}
interface IActionChild extends Action {}

export abstract class Unique {
  private static typeMap: Map<string, Clazz<IActionChild>> = new Map();

  public static type(type: string, actionClass: Clazz<IActionChild>): string {
    if (Unique.typeMap.has(type))
      throw new Error(
        `The application tried to register the action type: ${type} more than once`
      );
    if (Array.from(Unique.typeMap.values()).indexOf(actionClass) > -1)
      throw new Error(
        `The application tried to register the action class: ${actionClass.name} more than once`
      );
    Unique.typeMap.set(type, actionClass);
    return type;
  }

  public static deserializeAction(
    candidate: IPolymorphActionCandidate
  ): IActionChild | null {
    const type: string = candidate.type;
    const clazz: Clazz<IActionChild> | undefined = Unique.typeMap.get(type);
    if (clazz) {
      return deserialize(clazz, candidate);
    }
    return null;
  }
}
