export const roleDefender = {
    /** @param {Creep} creep **/
    run: (creep) => {
        const Hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(Hostile) {
            if (creep.attack(Hostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Hostile);
            }
        }else{
            creep.moveTo(Game.flags['W7N14_rest']);
        }
       
    }
}