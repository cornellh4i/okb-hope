var _a;
import { createUseStyles } from 'react-jss';
import { getFlexColumnPadding } from '../../shared/helpers/flex-children.helper';
import { LG, MD, SM, XL } from '../../shared/style/breakpoints';
import { getFlexColumnValue } from './flex-column.helper';
export var useStyles = createUseStyles({
    root: (_a = {
            flex: function (_a) {
                var xs = _a.xs;
                return getFlexColumnValue(xs);
            },
            padding: function (_a) {
                var _b = _a.padding, padding = _b === void 0 ? 'default' : _b;
                return getFlexColumnPadding(padding);
            }
        },
        _a[SM] = {
            flex: function (_a) {
                var sm = _a.sm;
                return getFlexColumnValue(sm);
            },
        },
        _a[MD] = {
            flex: function (_a) {
                var md = _a.md;
                return getFlexColumnValue(md);
            },
        },
        _a[LG] = {
            flex: function (_a) {
                var lg = _a.lg;
                return getFlexColumnValue(lg);
            },
        },
        _a[XL] = {
            flex: function (_a) {
                var xl = _a.xl;
                return getFlexColumnValue(xl);
            },
        },
        _a),
});
//# sourceMappingURL=flex-column.style.js.map