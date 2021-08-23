import plan from "./plan.json"
import { work_W7N14_up } from "./W7N14/work_W7N14_up";

export const roleUpgrader = {
    run: (creep) => {
        const roomName = creep.memory.room;
        if (!creep.memory.job) {
            creep.memory.job = getJob(roomName);
            creep.memory.originJob = creep.memory.job;
        }

        switch (roomName) {
            case 'W7N14':
                do_W7N14_job(creep);
        }
    }

}

function do_W7N14_job(creep) {

    switch (creep.memory.job) {
        case 'W7N14_up':
            work_W7N14_up(creep);
            break;
    }
}

//获取job----------------------------------------------------------------------------------------
function getJob(roomName) {
    const creeps = _.filter(Game.creeps, (creep) => {
        return creep.memory.room == roomName && creep.memory.role == 'upgrader';
    });
    const jobs = plan[roomName];
    for (let job in jobs) {
        const num = getNum(creeps, job);
        if (num < jobs[job]) return job;
    }
    return null;
}

function getNum(creeps, job) {
    let n = 0;
    for (let i in creeps) {
        if (creeps[i].memory.originJob == job) n++;
    }
    return n;
}
//------------------------------------------------------------------------------------------


