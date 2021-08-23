export const work_W7N14_energy = (creep) => {
    const state = creep.memory.state;
    switch (state) {
        case 'wait':
        case 'collect_energy':
            work_collect_energy(creep);
            break;
        case 'save_energy':
            work_save_energy(creep);
            break;
    }
}

//状态1-------------
function work_collect_energy(creep) {
    const id = creep.memory.sourceId || getSourceId(creep);
    const source = Game.getObjectById(id);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
    stateCheck('collect_energy', creep);
}
//获取目标
function getSourceId(creep) {
    const har_swap = creep.room.memory.har_swap;
    const index = har_swap.counter % 2;
    const source = har_swap.targets[index];

    creep.room.memory.har_swap.counter++;
    creep.memory.sourceId = source.id;

    return source.id;
}
//状态2-----------------
function work_save_energy(creep) {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK }});
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    stateCheck('save_energy', creep);
}
//状态检查
function stateCheck(curState, creep) {
    switch (curState) {
        case 'collect_energy':
            if (creep.store.getFreeCapacity() == 0) {
                setState(creep, 'save_energy');
            }
            break;
        case 'save_energy':
            if (creep.store.getUsedCapacity() == 0) {
                setState(creep, 'collect_energy');
            }
            break;
    }
}
//设置状态
function setState(creep, state) {
    creep.memory.lastState = creep.memory.state;
    creep.memory.state = state;
}