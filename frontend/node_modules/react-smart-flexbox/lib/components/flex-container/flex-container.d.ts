import { FC } from 'react';
import { AlignContent, AlignItems, FlexDirection, FlexWrap, JustifyContent } from '../../shared/types/flex-parent.interface';
export interface IFlexContainerProps {
    flexDirection?: FlexDirection;
    flexWrap?: FlexWrap;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    alignContent?: AlignContent;
    className?: string;
}
export declare const FlexContainer: FC<IFlexContainerProps>;
