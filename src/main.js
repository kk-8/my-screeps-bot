import { errorMapper } from './modules/errorMapper'
import { stateScanner } from './modules/stateScanner'
import helper_roomResource from './modules/helper_roomResource'

import { autoSpawningCreeps } from './creep/auto-spawning/auto-spawning-creeps'
import { roleCreep } from './creep/creep'
import { roleTower } from './structure/tower'
import { roleLink } from './structure/link'
import { roleTerminal } from './structure/terminal'


export const loop = errorMapper(
    function () {
        autoSpawningCreeps.run();
        roleTower.run();
        roleLink.run();
        roleTerminal.run();

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


