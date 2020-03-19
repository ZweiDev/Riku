export default interface Shiro {
    serverResponseTime: number;
    vehicles: Vehicle[];
}

export interface Vehicle {
    location: Location;
    details: Details
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface Details {
    operator: string;
    juice: number;
    id: string
    type: VehicleType;
}

export enum VehicleType {
    CAR = 'car',
    BIKE = 'bike',
    ESCOOTER = 'escooter'
}
