import { errorMapper } from './modules/errorMapper'
import { helperRoomResource } from './modules/helper_roomResource'

import { autoSpawningCreeps } from './modules/auto-spawning-creeps'
import { roleTower } from './structure/tower'
import { roleClaimer } from './role/claimer'
import { stateScanner } from './modules/stateScanner'
import { roleLink } from './structure/link'
import { roleTerminal } from './structure/terminal'
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
                bodys: [MOVE, MOVE, WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY],
                number: 2
            }, {
                role: 'builder',
                bodys: [MOVE,MOVE,MOVE, WORK,WORK,WORK, CARRY,CARRY,CARRY],
                number: 1
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
        autoSpawningCreeps.run();
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




