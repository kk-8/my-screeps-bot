export const roleClaimer = {
    claim: (x, y, roomName) => {
        const creep = Game.creeps['claimer'];
        const room = Game.rooms[roomName];
        if (!creep) {
            if (Game.spawns['Spawn1'].spawning) return;
            Game.spawns['Spawn1'].spawnCreep([MOVE, CLAIM], 'claimer');
        } else {
            if (!room) {
                creep.moveTo(new RoomPosition(x, y, roomName), { reusePath: 50 });
            }else {
                if (creep.claimController(Game.rooms[roomName].controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.rooms[roomName].controller)
                } else {
                    console.log('the room has been claimed!');
                }
            }
            
        }
    },
    build: (ObjectById) => {
        const target = Game.getObjectById(ObjectById);
        const creep = Game.creeps['builder'];
        if(!creep) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, CARRY], 'builder');
        }
        if (target) {
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { reusePath: 50 });
            }
        }
    }
}