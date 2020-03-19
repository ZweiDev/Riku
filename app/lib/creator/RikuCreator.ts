import Riku, {Search, Source} from "../../model/riku/Riku";
import Shiro from "../../model/shiro/Shiro";
import ShiroResolver from "../resolver/ShiroResolver";
import ShiroMerge from "../merge/ShiroMerge";

export default class RikuCreator {
    constructor(private API_URL: string) {}

    private shiroResolver: ShiroResolver = new ShiroResolver(this.API_URL);


    public async createRiku(search: Search): Promise<Riku | null> {
        this.shiroResolver.timeout = 5000;

        return this.rikuCreation(search);
    }

    public async createRikuHandshaked(search: Search): Promise<Riku | null> {
        this.shiroResolver.timeout = 1500;

        return this.rikuCreation(search);
    }

    private async rikuCreation(search: Search): Promise<Riku | null>  {
        let promiseArray: Promise<Shiro | null>[] = [];

        if (search.sources.indexOf(Source.TIER) != -1) {
            promiseArray.push(this.shiroResolver.getTierSearch(search));
        }

        if (search.sources.indexOf(Source.CIRC) != -1) {
            promiseArray.push(this.shiroResolver.getCircSearch(search));
        }

        if (search.sources.indexOf(Source.FLINKSTER) != -1) {
            promiseArray.push(this.shiroResolver.getFlinksterSearch(search));
        }

        if (search.sources.indexOf(Source.CALLABIKE) != -1) {
            promiseArray.push(this.shiroResolver.getCallabikeSearch(search));
        }

        let sources: Shiro | null = await Promise.all(promiseArray).then(result => {
            let shiroArray: Shiro[] = [];
            result.forEach(source => {
                console.log(source);
                if (source != null) shiroArray.push(source)
            });

            try {
                return ShiroMerge.mergeShiro(shiroArray);
            } catch (e) {
                console.error("ShuviCreator Error: " + e);
                return null;
            }
        }).catch(err => {
            console.error(err);
            return null;
        });

        return {
            search: search,
            result: sources
        }
    }
}
