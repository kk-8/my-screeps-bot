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
                from: {
                    type: FIND_STRUCTURES,
                    filter: "structure_storage_nEmpty",
                    action: 'withdraw',
                    parament: { withdraw: RESOURCE_ENERGY },
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_extension,spawn_nFull",
                    action: "transfer",
                    parament: { transfer: RESOURCE_ENERGY },
                    done: "to_flagRest"
                },
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
                from: {
                    type: FIND_SOURCES_ACTIVE,
                    filter: null,
                    action: 'harvest',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_container_nFull",
                    action: "transfer",
                    parament: { transfer: RESOURCE_ENERGY },
                    done: "transfer_terminal"
                },
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
                from: {
                    type: FIND_SOURCES_ACTIVE,
                    filter: null,
                    action: 'harvest',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_CONSTRUCTION_SITES,
                    filter: null,
                    action: "build",
                    parament: null,
                    done: "to_flagRest"
                },
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
                from: {
                    type: FIND_SOURCES_ACTIVE,
                    filter: null,
                    action: 'harvest',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: "FIND_CONTROLLER",
                    filter: null,
                    action: "upgradeController",
                    parament: null,
                    done: "to_flagRest"
                },
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
                from: {
                    type: FIND_HOSTILE_CREEPS,
                    filter: null,
                    action: 'attack',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: null,
                    filter: null,
                    action: null,
                    parament: null,
                    done: null
                },
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
                from: {
                    type: FIND_SOURCES_ACTIVE,
                    filter: null,
                    action: 'harvest',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_rampart,wall_hitMax/300",
                    action: "repair",
                    parament: null,
                    done: "to_flagRest"
                },
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
                from: {
                    type: FIND_STRUCTURES,
                    filter: "structure_container_nEmpty",
                    action: 'withdraw',
                    parament: { withdraw: RESOURCE_ENERGY },
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_storage_nFull",
                    action: "transfer",
                    parament: { transfer: RESOURCE_ENERGY },
                    done: "transfer_terminal"
                },
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
                from: {
                    type: FIND_STRUCTURES,
                    filter: "structure_storage_nEmpty",
                    action: 'withdraw',
                    parament: { withdraw: RESOURCE_ENERGY },
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_tower_nFull",
                    action: "transfer",
                    parament: { transfer: RESOURCE_ENERGY },
                    done: "to_flagRest"
                },
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
                from: {
                    type: FIND_MINERALS,
                    filter: null,
                    action: 'harvest',
                    parament: null,
                    done: "to_flagRest"
                },
                to: {
                    type: FIND_STRUCTURES,
                    filter: "structure_storage_nFull",
                    action: "transfer",
                    parament: { transfer: RESOURCE_LEMERGIUM },
                    done: "to_flagRest"
                },
            };
            break;
        default :
    }
    return re;
}
/**
 * re = {
    originRoom: room,  //起始房间
    targetRoom: room,  //任务房间
    building: {
        isbuilding: true,               //是否需要状态转化
        resourceType: RESOURCE_ENERGY  //依据存储的类型资源进行转化
    },
    from: {
        type: FIND_SOURCES_ACTIVE,          //任务一目标类型
        filter: [null, null]            //[0]FIND_STRUCTURES类型中.filter()的回调函数，
    },                                   //[1].withdraw()方法中的类型参数
    to: {
        type: FIND_STRUCTURES,                     //任务二目标类型
        filter: [() => { }, false, RESOURCE_ENERGY]  //[0]FIND_STRUCTURES类型中.filter()的回调函数
    },                                          //[1]true : repaire(); false : transfer(),[2].transfer()方法中的类型参数
    done: {
        filter: [true, RESOURCE_ENERGY]      //[0]true : 把多余的能量放进terminal中; false : 回到flag处
    }                                      //[1].transfer()方法中的类型参数
};
 */