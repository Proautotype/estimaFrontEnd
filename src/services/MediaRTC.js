class MediaRTC{
    CONSTRAINTS = {audio:false,video:false};
    MD = navigator.mediaDevices;
    async getConnectedDevices(type){
        try {
            const devices = await this.MD.enumerateDevices();
            return devices.filter(device => device.kind === type)
        } catch (error) {
            console.log(error)
        }
    }
    listenNewDevices(type = ""){
        this.MD.addEventListener('devicechange',(event)=>{
            this.getConnectedDevices(type)
        });
    }
}

export default MediaRTC;