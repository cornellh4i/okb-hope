import React from 'react';
import { useStyles } from './flex-container.style';
export var FlexContainer = function (_a) {
    var children = _a.children, _b = _a.flexDirection, flexDirection = _b === void 0 ? 'row' : _b, _c = _a.flexWrap, flexWrap = _c === void 0 ? 'wrap' : _c, _d = _a.justifyContent, justifyContent = _d === void 0 ? 'flex-start' : _d, _e = _a.alignItems, alignItems = _e === void 0 ? 'stretch' : _e, _f = _a.alignContent, alignContent = _f === void 0 ? 'stretch' : _f, className = _a.className;
    var root = useStyles({
        flexDirection: flexDirection,
        flexWrap: flexWrap,
        justifyContent: justifyContent,
        alignItems: alignItems,
        alignContent: alignContent,
    }).root;
    return React.createElement("section", { className: "" + root + (className ? " " + className : '') }, children);
};
//# sourceMappingURL=flex-container.js.map