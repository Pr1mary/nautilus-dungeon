
import { CommonMessage } from "./WrapperHelper";
import wrapper from "./WrapperHelper";
// import { Sequelize } from "sequelize";
import { Pool, PoolClient } from "pg";

export class PostgresHelper {

    pool: Pool;
    client: PoolClient | null;

    constructor(host: string, user: string, password: string,
        database: string, port: number) {
        this.pool = new Pool({
            host,
            user,
            password,
            database,
            port,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        this.client = null;
    }

    async close() {
        try {
            await this.pool.end();
            return wrapper.success();
        } catch (error) {
            return wrapper.error(new CommonMessage("close pool error"));
        }
    }

    async query(qy: string, val?: any[]) {
        try {
            const res = (this.client !== null) ?
                await this.client.query(qy, val)
                : await this.pool.query(qy, val);
            return wrapper.success(res);
        } catch (error: any) {
            return wrapper.error(new CommonMessage(`Error: ${error.message}`));
        }
    }

    async beginTx() {
        try {
            if (this.client === null) {
                this.client = await this.pool.connect();
                this.client.query('BEGIN');
            }
            return wrapper.success();
        } catch (error) {
            return wrapper.error(new CommonMessage("begin tx error"));
        }
    }

    async commitTx() {
        try {
            if (this.client !== null) {
                this.client.query('COMMIT');
                this.client.release();
                this.client = null;
            }
            return wrapper.success();
        } catch (error) {
            return wrapper.error(new CommonMessage("commit tx error"));
        }
    }

    async rollbackTx() {
        try{
            if (this.client !== null) {
                this.client.query('ROLLBACK');
                this.client.release();
                this.client = null;
            }
            return wrapper.success();
        }catch(error){
            return wrapper.error(new CommonMessage("rollback tx error"));
        }
    }
}