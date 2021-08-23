export const work_W7N13_defend = (creep) => {
    const state = creep.memory.state;
    switch (state) {
        case 'wait':
            work_wait(creep);
        case 'attack':
            work_attack(creep);
            break;
    }
}

//状态1-------------
function work_wait(creep) {
    const pos = new RoomPosition(22, 6, 'W7N13');
    if (creep.pos !== pos) {
        creep.moveTo(pos);
    }
    const hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
    stateCheck('wait', creep, hostileCreeps);
}
//状态2-----------------
function work_attack(creep) {
    const hostileCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (creep.attack(hostileCreep) === ERR_NOT_IN_RANGE) {
        creep.moveTo(hostileCreep);
    }
    stateCheck('attack', creep, hostileCreep);
}
//状态检查
function stateCheck(curState, creep, source) {
    switch (curState) {
        case 'attack':
            if (!source) {
                setState(creep, 'wait');
            }
            break;
        case 'wait':
            if (source) {
                setState(creep, 'attack');
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
    return creep.memory.originJob == 'W7N14_defend';
}