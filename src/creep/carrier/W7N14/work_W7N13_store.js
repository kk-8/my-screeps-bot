export const work_W7N13_store = (creep) => {
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
    if (creep.room.name !== 'W7N13') {
        creep.moveTo(new RoomPosition(25, 25, 'W7N13'));
    }else {
        const source = creep.pos.findClosestByRange(FIND_STRUCTURES,
            { filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) !== 0 });
        if (creep.withdraw(source, typeCheck(source)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        stateCheck('get', creep, source);
    }
}
//状态2-----------------
function work_put(creep) {
    const link = Game.getObjectById('61229079d8dc4838ee25fd3d'); //获取控制器旁边的link
    const storage = Game.getObjectById('6105695657f6d24b51c80f56'); //获取storage;
    const target = link.store.getFreeCapacity(RESOURCE_ENERGY) !== 0 ? link : storage;
    if (target) {
        if (creep.transfer(target, typeCheck(creep)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
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
            } else if (!source) {
                jobBack(creep);
            }
            break;
        case 'put':
            if (creep.store.getUsedCapacity() == 0) {
                setState(creep, 'get');
                jobBack(creep);
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
    return creep.memory.originJob == 'W7N13_store';
}