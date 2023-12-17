
import crypto, { randomUUID } from "crypto";
import uuid from "uuid";

export class RandomHelper {

    string(len: number){
        return crypto.randomBytes(len).toString('hex');
    }

    uuidV4(){
        const uuidv4 = randomUUID().toString();
        return uuidv4;
    }

}
