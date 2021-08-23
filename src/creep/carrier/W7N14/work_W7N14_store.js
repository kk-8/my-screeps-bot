export const work_W7N14_store = (creep) => {
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
    const link = Game.getObjectById('6106280b9d8d18d2781afa21'); //storage旁边的link
    const source = link.store.getUsedCapacity(RESOURCE_ENERGY) == 0 ? null : link;
    if (source) {
        if (creep.withdraw(source, typeCheck(source)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    stateCheck('get', creep, source);
}
//状态2-----------------
function work_put(creep) {
    const a = Game.rooms['W7N14'].storage.store;
    const target = a.getUsedCapacity(RESOURCE_ENERGY) < a.getCapacity() * 0.5 ? creep.room.storage : creep.room.terminal;
    if (creep.transfer(target, typeCheck(creep)) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    stateCheck('put', creep, target);
}
//辅助函数，类型检查
function typeCheck(source) {
    if (source) {
        const store = source.store;
        return Object.keys(store)[0];
    }
}
//状态检查
function stateCheck(curState, creep, source) {
    switch (curState) {
        case 'get':
            if (creep.store.getFreeCapacity() == 0) {
                setState(creep, 'put');
            }else if (!source) {
                setJob(creep, 'W7N13_store');
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
    return creep.memory.originJob == 'W7N14_store';
}