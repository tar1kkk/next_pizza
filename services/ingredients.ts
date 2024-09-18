import {instance} from "@/services/instance";

import {ApiRoutes} from "@/services/constants";
import {Ingredient} from ".prisma/client";

export const getAll = async () : Promise<Ingredient[]> => {
    const {data} = await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

    return data;
}