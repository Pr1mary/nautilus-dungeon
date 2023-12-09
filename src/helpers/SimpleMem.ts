
import wrapper from "./WrapperHelper";
import moment from "moment";

interface MemoryStruct {
    id: string,
    data: any,
    timestamp: moment.Moment,
}

export class SimpleMemoryHelper {

    memory: MemoryStruct[] = [];

    async set(id: string, data: any) {
        this.memory.push({
            id,
            data,
            timestamp: moment()
        });
        return wrapper.success()
    }

    async get(id: string) {
        const mem_data = this.memory.find(mem => mem.id === id);
        return (mem_data) ? wrapper.success(mem_data.data) : wrapper.error();
    }

    async del(id: string) {
        const mem_data = this.memory.findIndex(mem => mem.id === id);
        return (mem_data === -1) ? wrapper.error() : wrapper.success();
    }


}