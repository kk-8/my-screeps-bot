import { getTask } from "../role/task";

export const autoSpawningCreeps = {
    run: function (creepConfigs) {
        //状态显示
        if (Game.spawns['Spawn1'].spawning) {
            let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 }
            );
            return 
        }

        let arr = _.filter(Game.creeps, (creep) => { return creep.memory.role === creepConfigs[0].role });
        if (arr.length < creepConfigs[0].number) {
            let newName = `${creepConfigs[0].role}` + Game.time;
            console.log(`Spawning new ${creepConfigs[0].role}:` + newName);
            Game.spawns['Spawn1'].spawnCreep(creepConfigs[0].bodys, newName, { memory: { role: creepConfigs[0].role, 
                                                                                         task: getTask(creepConfigs[0].role)
                                                                                        }
                                                                             });
        }else{
            for (let i = 1; i < creepConfigs.length; i++) {
                let arr = _.filter(Game.creeps, (creep) => { return creep.memory.role === creepConfigs[i].role });
                if (arr.length < creepConfigs[i].number && !Game.spawns['Spawn1'].spawning) {
                    let newName = `${creepConfigs[i].role}` + Game.time;
                    console.log(`Spawning new ${creepConfigs[i].role}:` + newName);
                    Game.spawns['Spawn1'].spawnCreep(creepConfigs[i].bodys, newName, { memory: { role: creepConfigs[i].role,
                                                                                                 task: getTask(creepConfigs[i].role) 
                                                                                                } 
                                                                                     });
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