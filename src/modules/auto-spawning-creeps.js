import { taskPush } from "../task/taskpush";

export const autoSpawningCreeps = {
    run: function () {

        for (let i in Game.spawns) {
            const spawn = Game.spawns[i];
            if (spawn.spawning) {
                 //状态显示
                let spawningCreep = Game.creeps[spawn.spawning.name];
                spawn.room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1,
                    Game.spawns['Spawn1'].pos.y,
                    { align: 'left', opacity: 0.8 }
                );
                continue;
            }
            //当前房间
            const room = spawn.room;
            //当前房间的creepConfig数组
            const configArr = creepConfigs[room.name];

            //追踪当前房间内creeps各role的数量
            for (let config of configArr) {
                let arr = _.filter(Game.creeps, (creep) => {
                    return creep.memory.role === config.role && creep.memory.room === room.name; //爬所属房间等于当前房间。
                });
                traceCreNum(room, config.role, arr.length);
            }


            //首要spawn的creep的所属房间的当前数量
            const firstCreepNum = room.memory[`${configArr[0].role}`];
            if (firstCreepNum >= configArr[0].number) {

                //检查当前房间的creep数量
                for (let config of configArr) {
                    let arr = _.filter(Game.creeps, (creep) => {
                        return creep.memory.role === config.role && creep.memory.room === room.name;
                    });
                    if (arr.length < config.number) {
                        newCreep(spawn, config);
                        break;
                    }
                }

            }else {
                newCreep(spawn, configArr[0]);
            }
            
        }
        

        //清除死亡的creep的memory
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing no-existing creep memory:' + name);
            }
        }
    }
}

const creepConfigs = {
    'W7N14': [
        {
            role: 'guardSpawn',
            bodys: [MOVE, CARRY, CARRY],
            number: 3
        }, {
            role: 'harvester',
            bodys: [MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY],
            number: 2
        }, {
            role: 'builder',
            bodys: [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY],
            number: 1
        }, {
            role: 'upgrader',
            bodys: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
            number: 3
        }, {
            role: 'defender',
            bodys: [MOVE, ATTACK],
            number: 0
        }, {
            role: 'repairer',
            bodys: [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY],
            number: 1
        }, {
            role: 'carrier',
            bodys: [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            number: 1
        }, {
            role: 'guardTower',
            bodys: [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            number: 1
        }, {
            role: 'miner',
            bodys: [MOVE, WORK, CARRY],
            number: 1
        }
    ]
};


function newCreep(spawn, config) {
    const newName = config.role + Game.time;
    console.log(`Spawning new ${config.role}:` + newName);
    spawn.spawnCreep(config.bodys, newName,
        {
            memory: {
                role: config.role,
                task: taskPush(config.role),
                room: spawn.room.name,
                state: 'wait'
            }
        });

    //所属房间creep数量加一
    let n = 0;
    if (spawn.room.memory[config.role]) n = spawn.room.memory[config.role];
    traceCreNum(spawn.room, config.role, n+1);
}

function traceCreNum(room, role, num) {
    room.memory[role] = num;
}



