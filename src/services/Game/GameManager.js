export class GameManager{
    GID = 0;
    INFO="";
    NUMBER_OF_PLAYERS=0;
    TITLE = "";
    ROOM = "";
    OWNER = "";
    MEMBERS = {};
    Register(gid,info,nop,title,room,owner){
        this.GID = gid;
        this.INFO = info;
        this.NUMBER_OF_PLAYERS = nop;
        this.ROOM = room;
        this.OWNER = owner;
        this.TITLE = title;
    }
}