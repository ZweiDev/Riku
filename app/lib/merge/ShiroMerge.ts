import Shiro, {Vehicle} from "../../model/shiro/Shiro";

export default class ShiroMerge {

    public static mergeShiro(shiroArray: Shiro[]): Shiro {

        let vehicles: Vehicle[] = [];

        shiroArray.forEach(function (shiro) {
            if (shiro.vehicles != undefined) {
                shiro.vehicles.forEach(function (vehicle) {
                    vehicles.push(vehicle);
                });
            }
        });

        let shiro = shiroArray[0];

        shiro.vehicles = vehicles;

        return shiro;
    }
}
