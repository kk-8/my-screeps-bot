export const roleLink = {
    run: function () {
        const link1 = Game.getObjectById('6106280b9d8d18d2781afa21'); //storage旁边的
        const link2 = Game.getObjectById('6122553c7059e477cab97283'); //上面energy旁边的
        const link3 = Game.getObjectById('61229079d8dc4838ee25fd3d'); //下面energy旁边的
        if (link2.cooldown == 0) {
            //获取要传输的数量
            link2.transferEnergy(link1);
        }
    }
}
