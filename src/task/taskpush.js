/** @param {String} role */
export const taskPush = (role)=> {
    const room = Game.spawns['Spawn1'].room;
    let re;
    switch (role) {
        case 'guardSpawn':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: withdraw_storage_energy,
                to: transfer_extensionSpawn,
            };
            break;
        case 'harvester':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: harvest_source_active,
                to: transfer_contain,
            };                                     
            break;
        case 'builder':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: harvest_source_active,
                to: build_constructionSites,
            };
            break;
        case 'upgrader':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: harvest_source_active,
                to: upgrade_Controller,
            };
            break;
        case 'defender':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: false,
                    resourceType: null
                },
                from: attack_hostileCreeps,
                to: empty,
            };
            break;
        case 'repairer':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: harvest_source_active,
                to: repair_rampartWall_hitMax300,
            };
            break;
        case 'carrier':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: withdraw_container_energy,
                to: transfer_storage_energy,
            };
            break;
        case 'guardTower':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_ENERGY
                },
                from: withdraw_storage_energy,
                to: transfer_tower,
            };
            break;
        case 'miner':
            re = {
                originRoom: room,
                targetRoom: room,
                building: {
                    isbuilding: true,
                    resourceType: RESOURCE_LEMERGIUM
                },
                from: harvest_mine,
                to: transfer_storage_lemergium,
            };
            break;
        default :
    }
    return re;
}

const harvest_source_active = {
    type: FIND_SOURCES_ACTIVE,
    filter: null,
    action: 'harvest',
    parament: null,
    done: "to_flagRest"
};

const harvest_mine = {
    type: FIND_MINERALS,
    filter: null,
    action: 'harvest',
    parament: null,
    done: "to_flagRest"
};

const transfer_storage_energy = {
    type: FIND_STRUCTURES,
    filter: "structure_storage_energyNoOver5",
    action: "transfer",
    parament: { transfer: RESOURCE_ENERGY },
    done: "transfer_terminal"
};

const transfer_storage_lemergium = {
    type: FIND_STRUCTURES,
    filter: "structure_storage_mineNoOver3",
    action: "transfer",
    parament: { transfer: RESOURCE_LEMERGIUM },
    done: "to_flagRest"
};

const transfer_extensionSpawn = {
    type: FIND_STRUCTURES,
    filter: "structure_extension,spawn_nFull",
    action: "transfer",
    parament: { transfer: RESOURCE_ENERGY },
    done: "to_flagRest"
};

const transfer_contain = {
    type: FIND_STRUCTURES,
    filter: "structure_container_nFull",
    action: "transfer",
    parament: { transfer: RESOURCE_ENERGY },
    done: "transfer_terminal"
};

const transfer_tower = {
    type: FIND_STRUCTURES,
    filter: "structure_tower_nFull",
    action: "transfer",
    parament: { transfer: RESOURCE_ENERGY },
    done: "to_flagRest"
};

const withdraw_storage_energy = {
    type: FIND_STRUCTURES,
    filter: "structure_storage_nEmpty",
    action: 'withdraw',
    parament: { withdraw: RESOURCE_ENERGY },
    done: "to_flagRest"
};

const withdraw_container_energy = {
    type: FIND_STRUCTURES,
    filter: "structure_container_nEmpty",
    action: 'withdraw',
    parament: { withdraw: RESOURCE_ENERGY },
    done: "to_flagRest"
};

const build_constructionSites = {
    type: FIND_CONSTRUCTION_SITES,
    filter: null,
    action: "build",
    parament: null,
    done: "to_flagRest"
};

const upgrade_Controller = {
    type: "FIND_CONTROLLER",
    filter: null,
    action: "upgradeController",
    parament: null,
    done: "to_flagRest"
};

const attack_hostileCreeps = {
    type: FIND_HOSTILE_CREEPS,
    filter: null,
    action: 'attack',
    parament: null,
    done: "to_flagRest"
};

const repair_rampartWall_hitMax300 = {
    type: FIND_STRUCTURES,
    filter: "structure_rampart,wall_hitMax/300",
    action: "repair",
    parament: null,
    done: "to_flagRest"
};

const empty = {
    type: null,
    filter: null,
    action: null,
    parament: null,
    done: null
};

// re = {
//     type: FIND_HOSTILE_CREEPS,
//     filter: null,
//     action: 'attack',
//     parament: null,
// }