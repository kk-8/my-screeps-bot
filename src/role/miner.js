export const miner = {

    /** @param {Creep} creep **/
    run: (creep) => {
        if (creep.memory.building && creep.store[RESOURCE_LEMERGIUM] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        } else
            if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

        if (!creep.memory.building) {
            const source = creep.pos.findClosestByRange(FIND_MINERALS);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                        && structure.store.getFreeCapacity() > 0;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.moveTo(Game.flags['W7N14_rest']);
            }
        }
    }
};
