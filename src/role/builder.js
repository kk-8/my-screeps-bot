export const roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        if(creep.memory.building) {
            const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                creep.moveTo(Game.flags['W7N14_rest']);
            }
        }else{
            let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};