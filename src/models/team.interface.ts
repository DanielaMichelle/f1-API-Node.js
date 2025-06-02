import { Driver } from "./driver.interface"

export interface Team {
    id?: number
    name: string
    fullName: string
    country: string
    teamChief: string
    entryYear: number
    worldChamps?: number
    active?: boolean
    logoUrl?: string
    createdAt?: Date
    drivers?: Driver[]
}