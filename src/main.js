import { errorMapper } from './modules/errorMapper'
import { helperRoomResource } from './utils/helper_roomResource'

import { roleHarvester } from'./role/harvester'
import { roleUpGrader } from './role/upgrader'
import { roleBuilder } from './role/builder'
import { autoSpawningCreeps } from './utils/auto-spawning-creeps'
import { roleTower } from './role/tower'
import { roleClaimer } from './role/claimer'
import { stateScanner } from './modules/stateScanner'
import { roleDefender } from './role/defender'
import { roleRepairer } from './role/repairer'
import { guardSpawn } from './guard/spawn'
import { guardTower } from './guard/tower'
import { roleCarrier } from './role/carrier'
import { miner } from './role/miner'
import { roleLink } from './role/link'
import { roleTerminal } from './role/terminal'
import { roleCreep } from './role/creep'

export const loop = errorMapper(
    function () {
        const creepConfigs = [
            {
                role: 'guardSpawn',
                bodys: [MOVE, CARRY,CARRY],
                number: 3
            }, {
                role: 'harvester',
                bodys: [MOVE,MOVE, WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY],
                number: 2
            }, {
                role: 'builder',
                bodys: [MOVE,MOVE,MOVE, WORK,WORK,WORK, CARRY,CARRY,CARRY],
                number: 2
            }, {
                role: 'upgrader',
                bodys: [MOVE,MOVE,MOVE,MOVE, WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY],
                number: 3
            },{
                role: 'defender',
                bodys: [MOVE, ATTACK],
                number: 0
            }, {
                role: 'repairer',
                bodys: [MOVE,MOVE,MOVE, WORK,WORK,WORK, CARRY,CARRY],
                number: 1
            }, {
                role: 'carrier',
                bodys: [MOVE,MOVE, CARRY,CARRY,CARRY,CARRY],
                number: 1
            }, {
                role: 'guardTower',
                bodys: [MOVE, MOVE, CARRY,CARRY,CARRY,CARRY],
                number: 1
            }, {
                role: 'miner',
                bodys: [MOVE, WORK, CARRY],
                number: 1
            }
        ];
        autoSpawningCreeps.run(creepConfigs);
        roleTower.run();
        roleLink.run();
        roleTerminal.run();
        // roleClaimer.claim(32, 6, 'W7N13');

        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            roleCreep.run(creep);
        }

        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
      
        stateScanner();
    }
)





// if (creep.memory.role == 'guardSpawn') {
            //     guardSpawn.run(creep);
            // } else if (creep.memory.role == 'harvester') {
            //     roleHarvester.run(creep);
            // } else if (creep.memory.role == 'upgrader') {
            //     roleUpGrader.run(creep);
            // } else if (creep.memory.role == 'builder') {
            //     roleBuilder.run(creep);
            // } else if (creep.memory.role == 'defender') {
            //     roleDefender.run(creep);
            // } else if (creep.memory.role == 'repairer') {
            //     roleRepairer.run(creep);
            // } else if (creep.memory.role == 'carrier') {
            //     roleCarrier.run(creep);
            // } else if (creep.memory.role == 'guardTower') {
            //     guardTower.run(creep);
            // } else if (creep.memory.role == 'miner') {
            //     miner.run(creep);
            // }