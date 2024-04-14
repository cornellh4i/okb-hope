import { FC } from 'react';
import { FlexColumnPadding } from '../../shared/types/flex-children.interface';
import { FlexGridColumnsAmount } from './interfaces/flex-grid-column.interface';
export interface IFlexColumnProps {
    columnsInXs?: FlexGridColumnsAmount;
    columnsInSm?: FlexGridColumnsAmount;
    columnsInMd?: FlexGridColumnsAmount;
    columnsInLg?: FlexGridColumnsAmount;
    columnsInXl?: FlexGridColumnsAmount;
    padding?: FlexColumnPadding;
    className?: string;
    onClick?: () => void;
}
export declare const FlexGridColumn: FC<IFlexColumnProps>;
