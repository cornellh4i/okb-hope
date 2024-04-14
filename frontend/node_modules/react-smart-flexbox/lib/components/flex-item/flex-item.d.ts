import { FC } from 'react';
import { FlexColumnPadding } from '../../shared/types/flex-children.interface';
import { AlignSelf } from './interfaces/flex-item.interface';
export interface IFlexItemProps {
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    order?: number;
    alignSelf?: AlignSelf;
    padding?: FlexColumnPadding;
    className?: string;
    onClick?: () => void;
}
export declare const FlexItem: FC<IFlexItemProps>;
