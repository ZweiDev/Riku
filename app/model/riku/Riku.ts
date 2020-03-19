import Shiro from "../shiro/Shiro";

export default interface Riku {
    search: Search;
    result: Shiro
}

export interface Search {
   latitude: number;
   longitude: number;
   radius: number;
   sources: Source[];
}

export enum Source {
    FLINKSTER = 'flinkster',
    CALLABIKE = 'callabike',
    TIER = 'tier',
    CIRC = 'circ'
}
