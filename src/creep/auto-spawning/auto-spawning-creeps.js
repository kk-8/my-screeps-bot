import creepConfigs from "./creepConfigs.json"
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

            //检查当前房间的creep数量,不够就spawning
            for (let config of configArr) {
                let arr = _.filter(Game.creeps, (creep) => {
                    return creep.memory.role === config.role && creep.memory.room === room.name;
                });
                if (arr.length < config.number) {
                    newCreep(spawn, config);
                    break;
                }
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

function newCreep(spawn, config) {
    const newName = config.role + Game.time;
    console.log(`Spawning new ${config.role}:` + newName);
    spawn.spawnCreep(config.bodys, newName,
        {
            memory: {
                role: config.role,
                room: spawn.room.name,
                state: 'wait',
            },
            energyStructures: spawn.room.memory.energyStructures
        });

    //所属房间creep数量加一
    const n = spawn.room.memory[config.role] || 0;
    traceCreNum(spawn.room, config.role, n+1);
}

function traceCreNum(room, role, num) {
    room.memory[role] = num;
}



