import { TaskPull } from "../task/taskpull";
export const roleCreep = {
    run: (creep) => {
        const task = new TaskPull(creep);

        if (task.isbuilding) {
            if (creep.memory.building && creep.store[task.buildType] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            } else
                if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                    creep.memory.building = true;
                    creep.say('🚧 build');
                }
        }

        if (!creep.memory.building) {
            const source = task.source 
            const action = task.fromAction 
            if (source) {
                if (action(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }else {
            const target = task.target 
            const action = task.toAction 
            if (target) {
                if (action(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else {
                task.runDoneCode(task.task.to.done);
            }

        }

        // if (creep.room.name == task.roomName) {
        //     const source = task.source
        //     const action = task.action
        //     if (source) {
        //         if (action(creep) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(source);
        //         }
        //     }
        //     stateCheck(creep.memory.role, creep.memory.state);
        // }else {
        //     creep.moveTo(new RoomPosition(25, 25, task.roomName), { reusePath : 50});
        // }
        
    }
}


