export const roleTower = {
    run: function() {
        var tower = Game.getObjectById('60f7e5cbe2937917022a6747');
        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, 
                {
                filter: (structure) => { 
                    return (
                        ( structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax / 300 )
                        || structure.structureType == STRUCTURE_ROAD
                        || structure.structureType == STRUCTURE_STORAGE
                        || structure.structureType == STRUCTURE_TOWER
                        || structure.structureType == STRUCTURE_CONTAINER
                        || structure.structureType == STRUCTURE_SPAWN
                        || structure.structureType == STRUCTURE_LINK
                        ) && structure.hits < structure.hitsMax }
                });
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (closestHostile) {
                tower.attack(closestHostile);
            } else if (closestDamagedStructure){
                tower.repair(closestDamagedStructure);
            }
        }

        var tower2 = Game.getObjectById('60c16ce438fd760719632334');
        if (tower2) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower2.attack(closestHostile);
            }
        }

        const tower3 = Game.getObjectById('610f5e06530ca50760b72a44');
        if (tower3) {
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower3.attack(closestHostile);
            }
        }
    }
}
