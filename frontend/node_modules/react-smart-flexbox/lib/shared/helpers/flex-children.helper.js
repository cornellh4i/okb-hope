import { PADDING_1, PADDING_2, PADDING_3 } from '../style/gutters';
export var getFlexColumnPadding = function (padding) {
    switch (padding) {
        case 'large': {
            return PADDING_3;
        }
        case 'medium': {
            return PADDING_2;
        }
        case 'small': {
            return PADDING_1;
        }
        default: {
            return null;
        }
    }
};
//# sourceMappingURL=flex-children.helper.js.map