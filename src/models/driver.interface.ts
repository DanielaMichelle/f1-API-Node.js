import { Result } from "./result.interface"
import { Team } from "./team.interface"

export interface Driver {
    id: number
    name: string
    number: number
    country: string
    podiums: number
    worldChamps: number
    birthDate: Date
    imageUrl?: string | null
    active: boolean
    createdAt: Date
    teamId: number
    team?: Team
    results?: Result[]
}