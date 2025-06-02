import { Race } from './race.interface'

export interface Season {
    id?: number
    year: number
    name: string
    createdAt?: Date
    races?: Race[]
}