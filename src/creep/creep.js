import { roleBuilder } from "./builder/builder"
import { roleCarrier } from "./carrier/carrier"
import { roleDefender } from "./defender/defender";
import { roleHarvester } from "./harvester/harvester"
import { roleRepairer } from "./repairer/repairer";
import { roleUpgrader } from "./upgrader/upgrader"
export const roleCreep = {
    run: (creep) => {
        // const task = new TaskPull(creep);

        // if (task.isbuilding) {
        //     if (creep.memory.building && creep.store[task.buildType] == 0) {
        //         creep.memory.building = false;
        //         creep.say('🔄 harvest');
        //     } else
        //         if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        //             creep.memory.building = true;
        //             creep.say('🚧 build');
        //         }
        // }

        // if (!creep.memory.building) {
        //     const source = task.source 
        //     const action = task.fromAction 
        //     if (source) {
        //         if (action(creep) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(source);
        //         }
        //     }
        // }else {
        //     const target = task.target 
        //     const action = task.toAction 
        //     if (target) {
        //         if (action(creep) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(target);
        //         }
        //     }else {
        //         task.runDoneCode(task.task.to.done);
        //     }

        // }

        switch (creep.memory.role) { 
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'carrier':
                roleCarrier.run(creep);
                break;
            case 'defender':
                roleDefender.run(creep);
                break;
        }
        
    }
}


