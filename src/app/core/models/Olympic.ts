import { Participation } from "./Participation"
/**
 * Olympic games'country type
 */
export interface Olympic {
  id: number,
  country: string,
  participations: Participation[]
}

