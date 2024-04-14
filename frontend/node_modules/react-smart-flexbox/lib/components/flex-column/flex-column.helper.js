var MAX_WIDTH = 100;
var MAX_COLUMNS = 12;
export var getFlexColumnValue = function (dividend) {
    return "0 0 " + (MAX_WIDTH / MAX_COLUMNS) * parseInt(dividend, 10) + "%";
};
//# sourceMappingURL=flex-column.helper.js.map