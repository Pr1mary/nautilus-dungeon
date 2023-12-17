
export class SessionModel {

    session_id: string = "";
    session_code: string = "";
    group_id: string = "";
    channel_id: string = "";
    game_code: string = "";
    is_started: boolean = false;
    is_running: boolean = false;
    owner_id: string = "";
    created_at: string = "";
    updated_at: string = "";

    parser(data: any) {
        this.session_id = data["session_id"] || "";
        this.session_code = data["session_code"] || "";
        this.group_id = data["group_id"] || "";
        this.channel_id = data["group_id"] || "";
        this.game_code = data["game_code"] || "";
        this.is_started = data["is_started"] || false;
        this.is_running = data["is_running"] || false;
        this.owner_id = data["owner_id"] || "";
        this.created_at = data["created_at"] || "";
        this.updated_at = data["updated_at"] || "";
    }

    pgValues() {
        return [
            this.session_id,
            this.session_code,
            this.group_id,
            this.channel_id,
            this.game_code,
            this.is_started,
            this.is_running,
            this.owner_id,
            this.created_at,
            this.updated_at,
        ]
    }

}
