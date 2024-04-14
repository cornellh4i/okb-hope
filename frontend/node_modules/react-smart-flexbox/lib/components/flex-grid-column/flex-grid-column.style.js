var _a;
import { createUseStyles } from 'react-jss';
import { getFlexColumnPadding } from '../../shared/helpers/flex-children.helper';
import { LG, MD, SM, XL } from '../../shared/style/breakpoints';
import { getFlexGridColumnValue } from './flex-grid-column.helper';
export var useStyles = createUseStyles({
    root: (_a = {
            flex: function (_a) {
                var _b = _a.columnsInXs, columnsInXs = _b === void 0 ? '1' : _b;
                return getFlexGridColumnValue(columnsInXs);
            },
            padding: function (_a) {
                var _b = _a.padding, padding = _b === void 0 ? 'default' : _b;
                return getFlexColumnPadding(padding);
            }
        },
        _a[SM] = {
            flex: function (_a) {
                var _b = _a.columnsInSm, columnsInSm = _b === void 0 ? '2' : _b;
                return getFlexGridColumnValue(columnsInSm);
            },
        },
        _a[MD] = {
            flex: function (_a) {
                var _b = _a.columnsInMd, columnsInMd = _b === void 0 ? '3' : _b;
                return getFlexGridColumnValue(columnsInMd);
            },
        },
        _a[LG] = {
            flex: function (_a) {
                var _b = _a.columnsInLg, columnsInLg = _b === void 0 ? '4' : _b;
                return getFlexGridColumnValue(columnsInLg);
            },
        },
        _a[XL] = {
            flex: function (_a) {
                var _b = _a.columnsInXl, columnsInXl = _b === void 0 ? '6' : _b;
                return getFlexGridColumnValue(columnsInXl);
            },
        },
        _a),
});
//# sourceMappingURL=flex-grid-column.style.js.map