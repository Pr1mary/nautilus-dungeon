
import { CommonMessage } from "../../helpers/WrapperHelper";
import wrapper from "../../helpers/WrapperHelper";
import { PostgresHelper } from "../../helpers/PostgresHelper";
import { RandomHelper } from "../../helpers/RandomHelper";
import { SessionModel } from "../model/SessionModel";
import { MemberModel } from "../model/MemberModel";
import moment from "moment";
import { ResultBuilder } from "pg";

export class SessionController {

    game_session = new SessionModel();
    member_session = new MemberModel();

    pg_pool: PostgresHelper;
    table_session: string = "GameSession";
    table_member: string = "MemberSession";

    constructor(pg_pool: PostgresHelper) {
        this.pg_pool = pg_pool;
    }

    async create(user_id: string, game_code: string, group_id: string, channel_id: string) {

        if (group_id === "" || group_id === null) {
            return wrapper.error(new CommonMessage("group id can not be empty"));
        }

        this.game_session.session_id = new RandomHelper().uuidV4();
        this.game_session.session_code = new RandomHelper().string(4);
        this.game_session.group_id = group_id;
        this.game_session.channel_id = channel_id;
        this.game_session.game_code = game_code;
        this.game_session.is_started = false;
        this.game_session.is_running = false;
        this.game_session.owner_id = user_id;
        this.game_session.created_at = moment().format();
        this.game_session.updated_at = moment().format();
        this.member_session.member_id = new RandomHelper().uuidV4();
        this.member_session.user_id = user_id;
        this.member_session.session_id = this.game_session.session_id;
        this.member_session.created_at = moment().format();

        const qy_session = await this.pg_pool.query(`
        SELECT session_id
        FROM ${this.table_session}
        WHERE
        owner_id=$1 AND group_id=$2 AND channel_id=$3
        `, [user_id, group_id, channel_id]);
        if (qy_session.error) {
            return wrapper.error(new CommonMessage("Problem when searching session"));
        }
        const qy_res: ResultBuilder = qy_session.data;
        if (qy_res.rows.length > 0) {
            return wrapper.error(new CommonMessage("Session already created for this channel"));
        }

        await this.pg_pool.beginTx();
        const cmd_session = await this.pg_pool.query(`
        INSERT INTO ${this.table_session}(
            session_id, session_code, group_id,
            channel_id, game_code, is_started,
            is_running, owner_id, created_at, updated_at
            )
        VALUES (
            $1, $2, $3,
            $4, $5, $6,
            $7, $8, $9, $10
            )
        `, this.game_session.pgValues());
        const cmd_member = await this.pg_pool.query(`
        INSERT INTO ${this.table_member}(member_id, user_id, session_id, created_at)
        VALUES ($1, $2, $3, $4)
        `, this.member_session.pgValues());
        if (cmd_session.error || cmd_member.error) {
            await this.pg_pool.rollbackTx();
            return wrapper.error(new CommonMessage("Problem when creating session"));
        }
        await this.pg_pool.commitTx();

        return wrapper.success(this.game_session.session_code);
    }

    async delete(user_id: string, group_id: string, channel_id: string){

        const qy_session = await this.pg_pool.query(`
        SELECT session_id
        FROM ${this.table_session}
        WHERE
        owner_id=$1 AND group_id=$2 AND channel_id=$3
        `, [user_id, group_id, channel_id]);
        if (qy_session.error) {
            return wrapper.error(new CommonMessage("Problem when searching session"));
        }
        const qy_res: ResultBuilder = qy_session.data;
        if (qy_res.rows.length === 0) {
            return wrapper.error(new CommonMessage("Session not yet created for this channel"));
        }

        await this.pg_pool.beginTx();
        const cmd_member = await this.pg_pool.query(`
        DELETE FROM ${this.member_session}
        WHERE session_id=$1
        `, [qy_res.rows[0][0]]);
        const cmd_session = await this.pg_pool.query(`
        DELETE FROM ${this.member_session}
        WHERE session_id=$1
        `, [qy_res.rows[0][0]]);
        if (cmd_session.error || cmd_member.error) {
            await this.pg_pool.rollbackTx();
            return wrapper.error(new CommonMessage("Problem deleting session"));
        }
        await this.pg_pool.commitTx();

        return wrapper.success();

    }

}
