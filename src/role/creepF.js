export const roleCreep = {
    run: (creep) => {
        const role = creep.memory.role;
        switch (role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'carrier':
                roleCarrier.run(creep);
                break;
            case 'defender':
                roleDefender.run(creep);
                break;
        }
    }
}