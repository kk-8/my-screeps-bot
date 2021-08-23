export const work_W7N14_guard = (creep) => {
    const state = creep.memory.state;
    switch (state) {
        case 'wait':
        case 'get_energy':
            work_get_energy(creep);
            break;
        case 'put_Spawn':
            work_put_Spawn(creep);
            break;
        case 'put_Town':
            work_put_Town(creep);
            break;
    }
}

//状态1-------------
function work_get_energy(creep) {
    const source = creep.room.storage;
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
    stateCheck('get_energy', creep, source);
}
//状态2-----------------
function work_put_Spawn(creep) {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter: 
        (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) !== 0 });
    if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
    stateCheck('put_Spawn', creep, target);
}
//状态3-----------------
function work_put_Town(creep) {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter:
        (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) !== 0 });
    if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
    stateCheck('put_Town', creep, target);
}

//状态检查
function stateCheck(curState, creep, source) {
    switch (curState) {
        case 'get_energy':
            if (creep.store.getFreeCapacity() == 0) {
                const state = creep.memory.lastState == 'wait' ? 'put_Spawn' : creep.memory.lastState;
                setState(creep, state);
            }
            break;
        case 'put_Spawn':
            if (creep.store.getUsedCapacity() == 0) {
                setState(creep, 'get_energy');
            }else if(!source) {
                setState(creep, 'put_Town');
            }
            break;
        case 'put_Town':
            if (creep.store.getUsedCapacity() == 0) {
                setState(creep, 'get_energy');
            }else if(!source) {
                setState(creep, 'put_Spawn');
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
    return creep.memory.originJob == 'W7N14_guard';
}