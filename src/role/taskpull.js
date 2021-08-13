export class TaskPull {
    constructor(creep) {
        this.creep = creep;
        this.task = creep.memory.task;
        this.originRoom = this.task.originRoom;
        this.targetRoom = this.task.targetRoom;
        this.flag = Game.flags[`${this.originRoom.name}_rest`];
        this.isbuilding = this.task.building.isbuilding;
        this.buildType = this.task.building.resourceType;
    }
    get source() {
        let source;
        const fromType = this.task.from.type;
        const filterFu = this.getFilter(this.task.from.filter);

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
        const filterFu = this.getFilter(this.task.to.filter);

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

    getFilter(filter) {
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
