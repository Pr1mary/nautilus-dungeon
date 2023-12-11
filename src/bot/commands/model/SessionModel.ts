
import { CommonMessage } from "../../../helpers/WrapperHelper";
import wrapper from "../../../helpers/WrapperHelper";

export class SessionModel {

    created_by: string = "";
    game_code: string = "";
    session_id: string = "";
    selected: boolean = false;
    is_started: boolean = false;
    is_running: boolean = false;
    member: string[] = [];
    count: number = 0;

    constructor(user_id: string, game_code: string, session_id: string) {
        this.created_by = user_id;
        this.game_code = game_code;
        this.session_id = session_id;
        this.member.push(user_id);
    }

    start() {
        if (this.is_running) return wrapper.error(new CommonMessage("Session already started"));
        this.is_started = true;
        this.is_running = true;
        return wrapper.success(new CommonMessage("Session started"));
    }

    pause() {
        if (!this.is_running && this.is_started) return wrapper.error(new CommonMessage("Session already paused"));
        this.is_running = false;
        return wrapper.success(new CommonMessage("Session paused"));
    }

    stop() {
        if (!this.is_started) return wrapper.error(new CommonMessage("Session already stopped"));
        this.is_started = false;
        this.is_running = false;
        this.count = 0;
        return wrapper.success(new CommonMessage("Session stopped"));
    }

    update() {
        if (!this.is_running) return wrapper.error(new CommonMessage("Session not started"));
        this.count++;
        return wrapper.success(new CommonMessage("Data updated"));
    }

    join(user_id: string) {
        if (this.is_started) return wrapper.error(new CommonMessage("Session already started"));
        if (this.member.indexOf(user_id) !== -1) return wrapper.error(new CommonMessage("Already joined"));
        this.member.push(user_id);
        return wrapper.success(new CommonMessage("Member added"));
    }

    leave(user_id: string) {
        if (this.is_started) return wrapper.error(new CommonMessage("Session already started"));
        const member_id = this.member.indexOf(user_id);
        if (member_id === -1) return wrapper.error(new CommonMessage("Member not found"));
        this.member.splice(member_id, 1);
        return wrapper.success(new CommonMessage("Member removed"));
    }

    select() {
        if (this.selected) return wrapper.error(new CommonMessage("Session already selected"));
        this.selected = true;
        return wrapper.success(new CommonMessage("Session selected"));
    }

    deselect() {
        if (!this.selected) return wrapper.error(new CommonMessage("Session already deselected"));
        this.selected = false;
        return wrapper.success(new CommonMessage("Session deselected"));
    }

}
