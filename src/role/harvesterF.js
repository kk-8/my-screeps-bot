export const roleHarvester = {
    run : (creep) => {
        switch (creep.memory.job) {
            case 'harvest_energy':
                harvestEnergy(creep);
                break;
            case 'harvest_mine':
                break;
        }
    }
        
}

function harvestEnergy(creep) {
    const task = getTask(creep);

    if (creep.room.name == task.roomName) {
            const source = task.source
            const action = task.action
            if (source) {
                if (action(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            stateCheck(creep.memory.role, creep.memory.state);
        }else {
            creep.moveTo(new RoomPosition(25, 25, task.roomName), { reusePath : 50});
        }
}

function getTask(state) {
    switch (state) {
        case '':
            break;
    }
}



