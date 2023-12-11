
import crypto from "crypto";

export class RandomHelper {

    string(len: number){
        return crypto.randomBytes(len).toString('hex');
    }


}
