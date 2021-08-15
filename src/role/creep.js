import { TaskPull } from "../task/taskpull";
export const roleCreep = {
    run: (creep) => {
        const task = new TaskPull(creep);

        const state = creep.memory.state;
        if (state == undefined || state == 'from') {
            const source = task.source;
            const action = task.fromAction;
            if (source) {
                if (action(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }

            task.stateTo('fromTo')(creep, source);
        }else if (state == 'to') {
            const target = task.target;
            const action = task.toAction;
            if (target) {
                if (action(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

            task.stateTo('toTo')(creep, target);
        }else if (state == 'wait') {
            if (creep.pos !== task.flag) {
                creep.moveTo(task.flag);
            }

            const source = task.source;
            task.stateTo('waitTo')(source);
        }



        // switch (creep.memory.state) {
        //     case undefined:
        //     case 'from':
        //         const source = task.source;
        //         const action = task.fromAction;
        //         if (source) {
        //             if (action(creep) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(source);
        //             }
        //         }

        //         task.stateTo('fromTo')(creep, source);
        //         break;
        //     case 'to':
        //         const target = task.target;
        //         const action = task.toAction;
        //         if (target) {
        //             if (action(creep) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(target);
        //             }
        //         } 

        //         task.stateTo('toTo')(creep, target);
        //         break;
        //     case 'wait':
        //         creep.moveTo(task.flag);

        //         task.stateTo('waitTo')(source);
        //         break;
        // }
        
    }
}




// if (getFromType(creep) == FIND_SOURCES_ACTIVE) {
            //     const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // } else if (getFromType(creep) == FIND_STRUCTURES) {
            //     const source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //         filter: new Function('structure', getFromFilter(creep)[0])
            //     });
            //     if (source) {
            //         if (creep.withdraw(source, getFromFilter(creep)[1]) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(source);
            //         }
            //     } else {
            //         creep.moveTo(flag);
            //     }
            // } else if (getFromType(creep) == FIND_HOSTILE_CREEPS) {
            //     const Hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //     if (Hostile) {
            //         if (creep.attack(Hostile) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(Hostile);
            //         }
            //     } else {
            //         creep.moveTo(flag);
            //     }
            // } else if (getFromType(creep) == FIND_MINERALS) {
            //     const source = creep.pos.findClosestByRange(FIND_MINERALS);
            //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(source);
            //     }
            // }


            // if (getToType(creep) == FIND_CONSTRUCTION_SITES) {
            //     const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            //     if (target) {
            //         if (creep.build(target) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            //         }
            //     } else {
            //         creep.moveTo(flag);
            //     }
            // } else if (getToType(creep) == FIND_STRUCTURES) {
            //     const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //         filter: new Function('structure', getToFilter(creep)[0])
            //     });

            //     if (target) {
            //         if (getToFilter(creep)[1]) {
            //             if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(target);
            //             }
            //         }else {
            //             if (creep.transfer(target, getToFilter(creep)[2]) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(target);
            //             }
            //         }
            //     } else {
            //         if (getDoneFilter(creep)[0]) {
            //             const terminal = Game.rooms[originRoom.name].terminal;
            //             if (creep.transfer(terminal, getDoneFilter(creep)[1]) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
            //             }
            //         }else {
            //             creep.moveTo(flag);
            //         }
            //     }
            // } else if (getToType(creep) == "FIND_CONTROLLER") {
            //     if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(creep.room.controller);
            //     }
            // }




/*const task = creep.memory.task;
const originRoom = task.originRoom;
const flag = Game.flags[`${originRoom.name}_rest`];
const isbuilding = task.building.isbuilding;
const buildType = task.building.resourceType;
*/



// function getSource(creep) {
        //     let source;
        //     const fromType = task.from.type;
        //     const filterFu = getFilter(task.from.filter);

        //     switch (fromType) {
        //         case FIND_SOURCES_ACTIVE:
        //             source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        //             break;
        //         case FIND_STRUCTURES:
        //             source = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: filterFu});
        //             break;
        //         case FIND_HOSTILE_CREEPS:
        //             source = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //             break;
        //         case FIND_MINERALS:
        //             source = creep.pos.findClosestByRange(FIND_MINERALS);
        //             break;
        //         default:
        //             source = null;
        //     }
        //     return source;
        // }

        // function getTarget(creep) {
        //     let target;
        //     const toType = task.to.type;
        //     const filterFu = getFilter(task.to.filter);

        //     switch (toType) {
        //         case FIND_CONSTRUCTION_SITES:
        //             target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        //             break;
        //         case FIND_STRUCTURES:
        //             target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: filterFu});
        //             break;
        //         case "FIND_CONTROLLER":
        //             target = creep.room.controller;
        //             break;
        //         default:
        //             target = null;
        //     }
        //     return target;
        // }

        // function getFromAction(source) {
        //     const action = task.from.action;
        //     let result;
        //     switch (action) {
        //         case 'harvest':
        //             result = (creep) => creep.harvest(source);
        //             break;
        //         case 'withdraw':
        //             const resourceType = creep.memory.task.from.parament.withdraw;
        //             result = (creep) => creep.withdraw(source, resourceType);
        //             break;
        //         case 'attack':
        //             result = (creep) => creep.attack(source);
        //             break;
        //         default:
        //             result = null;
        //     }
        //     return result;
        // }

        // function getToAction(target) {
        //     const action = task.to.action;
        //     let result;
        //     switch (action) {
        //         case 'build':
        //             result = (creep) => creep.build(target);
        //             break;
        //         case 'repair':
        //             result = (creep) => creep.repair(target);
        //             break;
        //         case 'transfer':
        //             const resourceType = creep.memory.task.to.parament.transfer;
        //             result = (creep) => creep.transfer(target, resourceType);
        //             break;
        //         case "upgradeController":
        //             result = (creep) => creep.upgradeController(target);
        //             break;
        //         default:
        //             result = null;
        //     }
        //     return result;
        // }

        // // function getFilter(filter) {
        // //     let resoult;
        // //     switch (filter) {
        // //         case "structure_storage_nFull":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_STORAGE)
        // //                     && structure.store.getFreeCapacity() > 0;
        // //             }
        // //             break;
        // //         case "structure_storage_nEmpty":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_STORAGE)
        // //                     && structure.store[RESOURCE_ENERGY] > 0;
        // //             }
        // //             break;
        // //         case "structure_container_nFull":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_CONTAINER)
        // //                     && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        // //             }
        // //             break;
        // //         case "structure_container_nEmpty":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_CONTAINER)
        // //                     && structure.store[RESOURCE_ENERGY] > 0;
        // //             }
        // //             break;
        // //         case "structure_extension,spawn_nFull":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_EXTENSION
        // //                     || structure.structureType == STRUCTURE_SPAWN)
        // //                     && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        // //             }
        // //             break;
        // //         case "structure_rampart,wall_hitMax/300":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_RAMPART
        // //                     || structure.structureType == STRUCTURE_WALL
        // //                 ) && structure.hits < structure.hitsMax / 300;
        // //             }
        // //             break;
        // //         case "structure_tower_nFull":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_TOWER)
        // //                     && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        // //             }
        // //             break;
        // //         case "structure_terminal_nFull":
        // //             resoult = (structure) => {
        // //                 return (structure.structureType == STRUCTURE_TERMINAL)
        // //                     && structure.store.getFreeCapacity() > 0;
        // //             }
        // //             break;
        // //         default:
        // //             resoult = null;
        // //     }
        // //     return resoult;
        // // }

        // function runDoneCode(doneStr, creep) {
        //     switch(doneStr) {
        //         case 'to_flagRest':
        //             creep.moveTo(flag);
        //             break;
        //         case 'transfer_terminal':
        //             const terminal = creep.room.terminal;
        //             if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(terminal);
        //             }
        //             break;
        //     }
        // }



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