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
    const id = creep.memory.target || getTargetId(creep, 'get_energy');
    const source = Game.getObjectById(id);
    if (source) {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    stateCheck('get_energy', creep, source);
}
//状态2-----------------
function work_put_Spawn(creep) {
    const ids = creep.memory.target || getTargetId(creep, 'put_Spawn');
    const index = creep.memory.targetIndex;
    const target = Game.getObjectById(ids[index]);
    if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        //查看是否完成若完成目标下标自增1
        if (target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) creep.memory.targetIndex++;

        stateCheck('put_Spawn', creep, target);
    }
    //当所有任务都完成时进行状态检查并设置目标为空
    if (creep.memory.targetIndex == ids.length) stateCheck('put_Spawn', creep, null);
    
}
//状态3-----------------
function work_put_Town(creep) {
    const ids = creep.memory.target || getTargetId(creep, 'put_Town');
    const index = creep.memory.targetIndex;
    const target = Game.getObjectById(ids[index]);
    if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        //查看是否完成若完成目标下标自增1
        if (target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) creep.memory.targetIndex++;

        stateCheck('put_Spawn', creep, target);
    }
    //当所有任务都完成时进行状态检查并设置目标为空
    if (creep.memory.targetIndex == ids.length) stateCheck('put_Town', creep, null);

}

//状态检查
function stateCheck(curState, creep, source) {
    switch (curState) {
        case 'get_energy':
            if (creep.store.getFreeCapacity() == 0) {
                const state = creep.memory.lastState || 'put_Spawn';
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
                setJob(creep, 'W7N14_store');
            }
            break;
    }
}
//设置状态
function setState(creep, state) {
    creep.memory.lastState = creep.memory.state;
    creep.memory.state = state;
    creep.memory.target = null;
}

//变更job
function setJob(creep, job) {
    creep.memory.job = job;
    creep.memory.state = 'wait';
    creep.memory.target = null;
}
function jobBack(creep) {
    creep.memory.job = creep.memory.originJob;
    creep.memory.state = 'wait';
    creep.memory.target = null;
}

//判断job
function isSelfJob(creep) {
    return creep.memory.originJob == 'W7N14_guard';
}

//获取目标
function getTargetId(creep, state) {
    let out;
    switch(state) {
        case 'get_energy':
            out = creep.room.storage.id;
            break;
        case 'put_Spawn':
            out = creep.room.find(FIND_STRUCTURES, {
                filter:
                    (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION)
                        && s.store.getFreeCapacity(RESOURCE_ENERGY) !== 0
            }).map(i => i.id);
            break;
        case 'put_Town':
            out = creep.room.find(FIND_STRUCTURES, {
                filter:
                    (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) !== 0
            }).map(i => i.id);
            break;
    }
    creep.memory.target = out;
    creep.memory.targetIndex = 0;
    return out;
}