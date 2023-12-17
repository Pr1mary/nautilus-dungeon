
export class MemberModel {
    member_id: string = ""
    user_id: string = "";
    session_id: string = "";
    created_at: string = "";

    parser(data: any) {
        this.member_id = data["member_id"] || "";
        this.user_id = data["user_id"] || "";
        this.session_id = data["session_id"] || "";
        this.created_at = data["created_at"] || "";
    }

    pgValues() {
        return [
            this.member_id,
            this.user_id,
            this.session_id,
            this.created_at,
        ]
    }
}
