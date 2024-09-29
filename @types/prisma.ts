import {ProductItem,Product,Ingredient} from "@prisma/client";

export type IProduct = Product & {items : ProductItem[]; ingredients : Ingredient[]};