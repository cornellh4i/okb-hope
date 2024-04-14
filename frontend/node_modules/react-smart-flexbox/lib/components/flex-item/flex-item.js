import React from 'react';
import { useStyles } from './flex-item.style';
export var FlexItem = function (_a) {
    var children = _a.children, _b = _a.flexGrow, flexGrow = _b === void 0 ? 0 : _b, _c = _a.flexShrink, flexShrink = _c === void 0 ? 1 : _c, _d = _a.flexBasis, flexBasis = _d === void 0 ? 'auto' : _d, _e = _a.order, order = _e === void 0 ? 0 : _e, _f = _a.alignSelf, alignSelf = _f === void 0 ? 'stretch' : _f, _g = _a.padding, padding = _g === void 0 ? 'default' : _g, className = _a.className, onClick = _a.onClick;
    var root = useStyles({ flexGrow: flexGrow, flexShrink: flexShrink, flexBasis: flexBasis, order: order, alignSelf: alignSelf, padding: padding }).root;
    return (React.createElement("article", { className: "" + root + (className ? " " + className : ''), onClick: onClick }, children));
};
//# sourceMappingURL=flex-item.js.map