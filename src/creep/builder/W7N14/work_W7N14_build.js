export const work_W7N14_build = (creep) => {
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
    }else {
        creep.moveTo(new RoomPosition(25, 25, 'W7N14'));
    }
    
}
//状态2-----------------
function work_put(creep) {
    const target = Game.getObjectById(getTargetId());
   if (target) {
       if (target.room.name === creep.room.name) {
           if (target) {
               if (creep.build(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(target);
               }
           }
       } else {
           creep.moveTo(new RoomPosition(25, 25, target.room.name));
       }
   }
    stateCheck('put', creep, target);
}
function getTargetId() {
    for(let i in Game.constructionSites) {
        return i;
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
                setJob(creep, 'W7N14_upgrade');
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
    return creep.memory.originJob == 'W7N14_build';
}