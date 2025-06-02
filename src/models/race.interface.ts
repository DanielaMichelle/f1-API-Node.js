import { Result } from "./result.interface";
import { Season } from "./season.interface";

export interface Race {
    id?: number
    name: string
    place: string
    circuit: string
    date: Date
    createdAt?: Date
    seasonId: number
    season?: Season
    results?: Result[]
}