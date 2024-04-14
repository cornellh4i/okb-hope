import { createUseStyles } from 'react-jss';
export var useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexFlow: function (_a) {
            var flexDirection = _a.flexDirection, flexWrap = _a.flexWrap;
            return flexDirection + " " + flexWrap;
        },
        justifyContent: function (_a) {
            var justifyContent = _a.justifyContent;
            return justifyContent;
        },
        alignItems: function (_a) {
            var alignItems = _a.alignItems;
            return alignItems;
        },
        alignContent: function (_a) {
            var alignContent = _a.alignContent;
            return alignContent;
        },
    },
});
//# sourceMappingURL=flex-container.style.js.map