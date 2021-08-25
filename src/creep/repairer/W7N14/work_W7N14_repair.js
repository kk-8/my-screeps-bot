export const work_W7N14_repair = (creep) => {
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
    if (creep.room.name == 'W7N14') {
        const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        stateCheck('get', creep, source);
    } else {
        creep.moveTo(new RoomPosition(25, 25, 'W7N14'));
    }
}
//状态2-----------------
function work_put(creep) {
    if (creep.room.name == 'W7N14') {
        const target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: 
            (s) => s.structureType == STRUCTURE_RAMPART && s.hits < s.hitsMax/300 });
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }

        stateCheck('put', creep, target);
    } else {
        creep.moveTo(new RoomPosition(25, 25, 'W7N14'));
    }
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
            }else if (!source) {
                setJob(creep, 'W7N13_repair');
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
    return creep.memory.originJob == 'W7N14_repair';
}