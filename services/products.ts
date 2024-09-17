import {instance} from "@/services/instance";
import {Product} from ".prisma/client";
import {ApiRoutes} from "@/services/constants";

export const search = async (query: string) : Promise<Product[]> => {
    const {data} = await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}});

    return data;
}