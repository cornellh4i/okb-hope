import { createUseStyles } from 'react-jss';
import { getFlexColumnPadding } from '../../shared/helpers/flex-children.helper';
export var useStyles = createUseStyles({
    root: {
        flex: function (_a) {
            var flexGrow = _a.flexGrow, flexShrink = _a.flexShrink, flexBasis = _a.flexBasis;
            return flexGrow + " " + flexShrink + " " + flexBasis;
        },
        order: function (_a) {
            var order = _a.order;
            return order;
        },
        alignSelf: function (_a) {
            var alignSelf = _a.alignSelf;
            return alignSelf;
        },
        padding: function (_a) {
            var _b = _a.padding, padding = _b === void 0 ? 'default' : _b;
            return getFlexColumnPadding(padding);
        },
    },
});
//# sourceMappingURL=flex-item.style.js.map