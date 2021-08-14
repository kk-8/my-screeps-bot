export const roleLink = {
    run: function () {
        const linkFrom = Game.rooms['W7N14'].lookForAt(LOOK_STRUCTURES, 45, 10)[0];
        const linkTo = Game.rooms['W7N14'].lookForAt(LOOK_STRUCTURES, 31, 24)[0];
        // console.log(linkFrom.cooldown());
        // if (linkFrom.cooldown == 0) {
        //     linkFrom.transferEnergy(linkTo);
        // }
    }
}
