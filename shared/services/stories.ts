import {instance} from "@/shared/services/instance";
import {Story, StoryItem} from "@prisma/client";

export type IStory = Story & {
    items: StoryItem[];
};

export const getAll = async () => {
    const {data} = await instance.get<IStory[]>('/stories');

    return data;
}