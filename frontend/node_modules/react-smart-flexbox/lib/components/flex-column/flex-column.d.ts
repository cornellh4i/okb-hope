import { FC } from 'react';
import { FlexColumnPadding } from '../../shared/types/flex-children.interface';
import { FlexColumnsAmount } from './interfaces/flex-column.interface';
export interface IFlexColumnProps {
    xs: FlexColumnsAmount;
    sm: FlexColumnsAmount;
    md: FlexColumnsAmount;
    lg: FlexColumnsAmount;
    xl: FlexColumnsAmount;
    padding?: FlexColumnPadding;
    className?: string;
    onClick?: () => void;
}
export declare const FlexColumn: FC<IFlexColumnProps>;
