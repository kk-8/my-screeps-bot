import { taskPush } from "./taskpush";
export class TaskPull {
    constructor(creep) {
        this.creep = creep;
        this.task = taskPush(creep.memory.role);
        this.originRoom = this.task.originRoom;
        this.targetRoom = this.task.targetRoom;
        this.flag = Game.flags[`${this.originRoom.name}_rest`];
        this.isbuilding = this.task.building.isbuilding;
        this.buildType = this.task.building.resourceType;
    }

    get source() {
        let source;
        const fromType = this.task.from.type;
        const filterFu = getFilter(this.task.from.filter);

        switch (fromType) {
            case FIND_SOURCES_ACTIVE:
                source = this.creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                break;
            case FIND_STRUCTURES:
                source = this.creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: filterFu });
                break;
            case FIND_HOSTILE_CREEPS:
                source = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                break;
            case FIND_MINERALS:
                source = this.creep.pos.findClosestByRange(FIND_MINERALS);
                break;
            default:
                source = null;
        }
        return source;
    }

    get target() {
        let target;
        const toType = this.task.to.type;
        const filterFu = getFilter(this.task.to.filter);

        switch (toType) {
            case FIND_CONSTRUCTION_SITES:
                target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                break;
            case FIND_STRUCTURES:
                target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: filterFu });
                break;
            case "FIND_CONTROLLER":
                target = this.creep.room.controller;
                break;
            default:
                target = null;
        }
        return target;
    }

    get fromAction() {
        const action = this.task.from.action;
        const source = this.source;
        let result;
        switch (action) {
            case 'harvest':
                result = (creep) => creep.harvest(source);
                break;
            case 'withdraw':
                const resourceType = this.task.from.parament.withdraw;
                result = (creep) => creep.withdraw(source, resourceType);
                break;
            case 'attack':
                result = (creep) => creep.attack(source);
                break;
            default:
                result = null;
        }
        return result;
    }

    get toAction() {
        const action = this.task.to.action;
        const target = this.target;
        let result;
        switch (action) {
            case 'build':
                result = (creep) => creep.build(target);
                break;
            case 'repair':
                result = (creep) => creep.repair(target);
                break;
            case 'transfer':
                const resourceType = this.task.to.parament.transfer;
                result = (creep) => creep.transfer(target, resourceType);
                break;
            case "upgradeController":
                result = (creep) => creep.upgradeController(target);
                break;
            default:
                result = null;
        }
        return result;
    }

    get roomName() {
        return '';
    }
//在done状态下运行的代码
    runDoneCode(doneStr) {
        switch (doneStr) {
            case 'to_flagRest':
                this.creep.moveTo(this.flag);
                break;
            case 'transfer_terminal':
                const terminal = this.creep.room.terminal;
                if (this.creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(terminal);
                }
                break;
        }
    }
}

//获取structure对象时需要的filter函数
function getFilter(filter) {
    let resoult;
    switch (filter) {
        case "structure_storage_nFull":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                    && structure.store.getFreeCapacity() > 0;
            }
            break;
        case "structure_storage_nEmpty":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                    && structure.store[RESOURCE_ENERGY] > 0;
            }
            break;
        case "structure_storage_energyNoOver5":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity() * 0.5;
            }
            break;
        case "structure_storage_mineNoOver3":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                    && structure.store.getUsedCapacity(RESOURCE_LEMERGIUM) < structure.store.getCapacity() * 0.3;
            }
            break;
        case "structure_container_nFull":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
            break;
        case "structure_container_nEmpty":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                    && structure.store[RESOURCE_ENERGY] > 0;
            }
            break;
        case "structure_extension,spawn_nFull":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION
                    || structure.structureType == STRUCTURE_SPAWN)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
            break;
        case "structure_rampart,wall_hitMax/300":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART
                    || structure.structureType == STRUCTURE_WALL
                ) && structure.hits < structure.hitsMax / 300;
            }
            break;
        case "structure_tower_nFull":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_TOWER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
            break;
        case "structure_terminal_nFull":
            resoult = (structure) => {
                return (structure.structureType == STRUCTURE_TERMINAL)
                    && structure.store.getFreeCapacity() > 0;
            }
            break;
        default:
            resoult = null;
    }
    return resoult;
}

//creep运行完指令后进行的状态检查
function stateCheck(role, curState) {
    let resoult
    switch (role) {
        case 'harvester':
            harvesterState(curState);
            break;
        case 'builder':
            builderState(curState);
            break;
        case 'upgrader':
            upgraderState(curState);
            break;
        case 'repairer':
            repairerState(curState);
            break;
        case 'carrier':
            carrierState(curState);
            break;
        case 'defender':
            defenderState(curState);
            break;
    }
}

//用于记录发配的任务，以便于实现每3个harvester有一个是miner；

function harvesterState(curState) {
    let r;
    switch (curState) {
        case 'collect_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'save_energy');
                }
            };
            break;
        case 'save_energy':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_energy');
                }
            };
            break;
        case 'collect_mine':
            r = (creep, source) => {
                if (creep.memory.mine) {
                    if (creep.store.getFreeCapacity() == 0) {
                        setState(creep, 'save_mine');
                    }
                } else {
                    setState(creep, 'mine_check');
                }
            };
            break;
        case 'save_mine':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_mine');
                }
            };
            break;
        case 'mine_check':
            r = (creep, source) => {
                setState(creep, creep.memory.lastState);
            };
            break;
        case 'wait':
            r = (creep, source) => {
                if (Game.rooms[creep.memory.room].memory['counter']%3 == 1) { //待定
                    setState(creep, 'collect_energy');
                } else {
                    setState(creep, 'collect_mine');
                }
            };
            break;
    }
    return r;
}

function builderState(curState) {
    let r;
    switch (curState) {
        case 'collect_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'build_sites');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            };
            break;
        case 'build_sites':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_energy');
                } else if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'repair_rampartWall_hitMax300');
                }
            };
            break;
        case 'upgrade_controller':
            r = (creep, source) => {
                if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'wait');
                }
            };
            break;
        case 'repair_rampartWall_hitMax300':
            r = (creep, source) => {
                if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'upgrade_controller');
                }
            };
            break;
        case 'wait':
            r = (creep, source) => {
                if (source) {
                    setState(creep, 'collect_energy');
                }
            };
            break;
    }
    return r;
}

function upgraderState(curState) {
    let r;
    switch (curState) {
        case 'collect_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'upgrade_controller');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'upgrade_controller':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_energy');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'wait':
            r = (creep, source) => {
                if (source) {
                    setState(creep, 'collect_energy');
                }
            }
            break;
    }
    return r;
}

function repairerState(curState) {
    let r;
    switch (curState) {
        case 'collect_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'repair_rampartWall_hitMax300');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'repair_rampartWall_hitMax300':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_energy');
                } else if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'build_sites');
                }
            }
            break;
        case 'build_sites':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'collect_energy');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'wait':
            r = (creep, source) => {
                if (source) {
                    setState(creep, 'collect_energy');
                }
            }
            break;
    }
    return r;
}

function carrierState(curState) {
    let r;
    switch (curState) {
        case 'withdraw_container_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'transfer_storage_energy');
                } else if (!source) {
                    setState(creep, 'withdraw_storage_energy');
                }
            }
            break;
        case 'withdraw_container_mine':
            r = (creep, source) => { }
            break;
        case 'withdraw_storage_energy':
            r = (creep, source) => {
                if (creep.store.getFreeCapacity() == 0) {
                    setState(creep, 'transfer_extensionSpawn');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'withdraw_storage_mine':
            r = (creep, source) => { }
            break;
        case 'transfer_storage_energy':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'withdraw_container_energy');
                } else if (!source) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'transfer_tower_energy':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'withdraw_storage_energy');
                } else if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'wait');
                }
            }
            break;
        case 'transfer_extensionSpawn':
            r = (creep, source) => {
                if (creep.store.getUsedCapacity() == 0) {
                    setState(creep, 'withdraw_storage_energy');
                } else if (!source && creep.store.getUsedCapacity() !== 0) {
                    setState(creep, 'transfer_tower_energy');
                }
            }
            break;
        case 'wait':
            r = (creep, source) => {
                if (source) {
                    setState(creep, 'withdraw_container_energy');
                }
            }
            break;

    }
    return r;
}

function defenderState(curState) { }

function setState(creep, str) {
    creep.memory.lastState = creep.memory.state;
    creep.memory.state = str;
}