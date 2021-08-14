export const roleTerminal = {
    run: function () {
       const terminal = Game.rooms['W7N14'].terminal;
        if (terminal.store.getFreeCapacity() > terminal.store.getCapacity()/2) return;
       const orders = Game.market.getAllOrders((order) => {
           return (order.type == ORDER_BUY && order.resourceType == RESOURCE_ENERGY &&
           order.price > 0.63);
       });
        for (let order of orders) {
            if(order.amount < terminal.store.getUsedCapacity(RESOURCE_ENERGY)-1000) {
                Game.market.deal(order.id, order.amount, 'W7N14');
            }
        }
    }
}