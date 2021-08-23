export const work_W7N14_up = (creep) => {
    const state = creep.memory.state;
    switch (state) {
        case 'wait':
        case 'get':
            work_get(creep);
            break;
        case 'put':
            work_put(creep);
            break;
    }
}

//状态1-------------
function work_get(creep) {
    const source = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK }});
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
    stateCheck('get', creep, source);
}
//状态2-----------------
function work_put(creep) {
    const target = creep.room.controller;
    if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    stateCheck('put', creep, target);
}
//状态检查
function stateCheck(curState, creep, source) {
    switch (curState) {
        case 'get':
            if (creep.store.getFreeCapacity() == 0) {
                setState(creep, 'put');
            }
            break;
        case 'put':
            if (creep.store.getUsedCapacity() == 0) {
                setState(creep, 'get');
            } 
            break;
    }
}
//设置状态
function setState(creep, state) {
    creep.memory.lastState = creep.memory.state;
    creep.memory.state = state;
}

//变更job
function setJob(creep, job) {
    creep.memory.job = job;
    creep.memory.state = 'wait';
}
function jobBack(creep) {
    creep.memory.job = creep.memory.originJob;
    creep.memory.state = 'wait';
}

//判断job
function isSelfJob(creep) {
    return creep.memory.originJob == 'W7N14_up';
}