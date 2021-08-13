export const roleRepairer = {
    /** @param {Creep} creep **/
    run: (creep) => {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        } else
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

        if (!creep.memory.building) {
            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            let DamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART
                            // || structure.structureType == STRUCTURE_ROAD
                            || structure.structureType == STRUCTURE_WALL
                        ) && structure.hits < structure.hitsMax/300 }
                });
            if (DamagedStructure) {
                if (creep.repair(DamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(DamagedStructure);
                }
            } else {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}