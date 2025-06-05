import { Driver } from "./driver.interface";
import { Race } from "./race.interface";

export interface Result {
    id: number
    position: number
    points: number
    time: string
    createdAt: Date
    driverId: number
    driver?: Driver
    raceId: number
    race?: Race
}