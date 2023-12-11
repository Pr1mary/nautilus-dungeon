
import { CommonMessage } from "./WrapperHelper";
import wrapper from "./WrapperHelper";
import moment from "moment";

interface MemoryStruct {
    id: string,
    data: any,
    user_id: string,
    timestamp: moment.Moment,
}

export class SimpleMemoryHelper {

    memory: MemoryStruct[] = [];

    async set(id: string, data: any, user_id: string) {
        this.memory.push({
            id,
            data,
            user_id,
            timestamp: moment()
        });
        return wrapper.success()
    }

    async get(id: string) {
        const mem_data = this.memory.find(mem => mem.id === id);
        return (mem_data) ? wrapper.success(mem_data.data) : wrapper.error(new CommonMessage("Not found"));
    }

    async getByCreator(user_id: string) {
        const mem_data = this.memory.find(mem => mem.user_id === user_id);
        return (mem_data) ? wrapper.success(mem_data.data) : wrapper.error(new CommonMessage("Not found"));
    }

    async del(id: string) {
        const mem_id = this.memory.findIndex(mem => mem.id === id);
        if (mem_id === -1) return wrapper.error(new CommonMessage("Not found"));
        this.memory.splice(mem_id, 1);
        return wrapper.success();
    }


}