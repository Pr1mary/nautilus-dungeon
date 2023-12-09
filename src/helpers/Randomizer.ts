
import crypto from "crypto";

export class Randomizer {

    string(len: number){
        return crypto.randomBytes(len).toString('hex');
    }


}
