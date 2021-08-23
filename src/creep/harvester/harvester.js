import plan from "./plan.json"
import { work_W7N14_energy } from "./W7N14/work_W7N14_energy"
import { work_W7N14_lemergium } from "./W7N14/work_W7N14_lemergium";
import { work_W7N13_energy } from "./W7N14/work_W7N13_energy";

export const roleHarvester = {
    run : (creep) => {
        const roomName = creep.memory.room;
        if (!creep.memory.job) {
            creep.memory.job = getJob(roomName);
            creep.memory.originJob = creep.memory.job;
        }

        switch (roomName) {
            case 'W7N14':
                do_W7N14_job(creep);
                break;
        }
        
    }
        
}

function do_W7N14_job(creep) {
    
    switch (creep.memory.job) {
        case 'W7N14_energy':
            work_W7N14_energy(creep);
            break;
        case 'W7N14_lemergium':
            work_W7N14_lemergium(creep);
            break;
        case 'W7N13_energy':
            work_W7N13_energy(creep);
            break;
    }
}

//获取job----------------------------------------------------------------------------------------
function getJob(roomName) {
    const hars = _.filter(Game.creeps, (creep) => {
        return creep.memory.room == roomName && creep.memory.role == 'harvester';
    });
    const jobs = plan[roomName];
    for (let job in jobs) {
        const num = getNum(hars, job);
        if (num < jobs[job]) return job;
    }
    return null;
}

function getNum(hars, job) {
    let n = 0;
    for (let i in hars) {
        if (hars[i].memory.originJob == job) n++;
    }
    return n;
}
//------------------------------------------------------------------------------------------


