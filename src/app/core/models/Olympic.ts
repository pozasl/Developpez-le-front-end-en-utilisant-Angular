import { Participation } from "./Participation"

// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

/**
 * Olympic games'country type
 */
export interface Olympic {
  id: number,
  country: string,
  participations: Participation[]
}

