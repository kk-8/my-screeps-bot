export const work_W7N14_lemergium = (creep) => {
    const state = creep.memory.state;
    switch (state) {
        case 'wait':
        case 'collect_mine':
            work_collect_mine(creep);
            break;
        case 'save_mine':
            work_save_mine(creep);
            break;
    }
}

//状态1-------------
function work_collect_mine(creep) {
    const source = creep.pos.findClosestByRange(FIND_MINERALS);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
    stateCheck('collect_mine', creep);
}
//状态2-----------------
function work_save_mine(creep) {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
    if (creep.transfer(target, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    stateCheck('save_mine', creep);
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
