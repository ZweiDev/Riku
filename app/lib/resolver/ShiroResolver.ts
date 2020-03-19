import {Search} from "../../model/riku/Riku";
import Shiro from "../../model/shiro/Shiro";
import axios from 'axios';

export default class ShiroResolver {

    constructor(public API_URL: string) {}

    public timeout: number = 5000;

    public async getCircSearch(search: Search): Promise<Shiro | null> {
        return axios.get(this.API_URL + "circ.shiro",
            {
                timeout: this.timeout,
                params: {
                    lat: search.latitude,
                    lon: search.longitude,
                    radius: search.radius,
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shiro;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getCircSearch: " + rejected);
            return null;
        });
    }

    public async getTierSearch(search: Search): Promise<Shiro | null> {
        return axios.get(this.API_URL + "tier.shiro",
            {
                timeout: this.timeout,
                params: {
                    lat: search.latitude,
                    lon: search.longitude,
                    radius: search.radius,
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shiro;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getTierSearch: " + rejected);
            return null;
        });
    }

    public async getFlinksterSearch(search: Search): Promise<Shiro | null> {
        return axios.get(this.API_URL + "flinkster.shiro",
            {
                timeout: this.timeout,
                params: {
                    lat: search.latitude,
                    lon: search.longitude,
                    radius: search.radius,
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shiro;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getFlinksterSearch: " + rejected);
            return null;
        });
    }

    public async getCallabikeSearch(search: Search): Promise<Shiro | null> {
        return axios.get(this.API_URL + "callabike.shiro",
            {
                timeout: this.timeout,
                params: {
                    lat: search.latitude,
                    lon: search.longitude,
                    radius: search.radius,
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shiro;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getCallabikeSearch: " + rejected);
            return null;
        });
    }
}
