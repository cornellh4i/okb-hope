# react-smart-flexbox
Implementation of CSS flexbox in react with react-jss. It is written in TypeScript.

# Install
```
npm install react-smart-flexbox --save
yarn add react-smart-flexbox
```
```js
import {
  FlexContainer,
  FlexItem,
  FlexColumn,
  FlexGridColumn
} from 'react-smart-flexbox';
```

# Components

## FlexContainer
A flex parent element. It must wrap `FlexItem`, `FlexColumn` or `FlexGridColumn`.

### Props
All props are optional and have a default value.

#### flexDirection
Establishes the main-axis, thus defining the direction flex items are placed in the flex container.

It must be `row`, `row-reverse`, `column` or `column-reverse`.

Default value is `row`.

#### flexWrap
Establishes if the flex item fits or not onto one line.

It must be `nowrap`, `wrap` or `wrap-reverse`.

Default value is `wrap`.

#### justifyContent
Defines the flex item alignment along the main axis.

It must be `flex-start`, `center`, `flex-end`, `space-between`, `space-around` or `space-evenly`.

Default value is `flex-start`.

#### alignItems
Defines the flex item alignment along the cross axis on the current row.

It must be `stretch`, `flex-start`, `center`, `flex-end` or `baseline`.

Default value is `stretch`.

#### alignContent
Defines the flex item alignment along the cross axis.

It must be `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` or `stretch`.

Default value is `stretch`.

#### className
Sets the className value of the flex parent.

It must be a `string`.

Example:
```js
<FlexContainer
  flexDirection="row"
  flexWrap="wrap"
  justifyContent="flex-start"
  alignItems="stretch"
  alignContent="stretch">
  // children
</FlexContainer>
```

## FlexItem
A flex item element.

### Props
All props are optional and have a default value.

#### flexGrow
Defines the ability for a flex item to grow if necessary. It'll grow based on the remaining space in the flex container.

It must be a positive `number`.

Default value is `0`.

#### flexShrink
Defines the ability for a flex item to shrink if necessary.

It must be a positive `number`.

Default value is `1`.

#### flexBasis
Defines the default size of a flex item before the remaining space is distributed based on the main axis.

It must be a `string`. Can be length (e.g. 20%, 5rem, etc.) or a keyword.

Default value is `auto`.

#### order
Controls the order in which they appear in the flex container.

It must be a `number`.

Default value is `0`.

#### alignSelf
Allows overwriting the alignItems value set in the flex container.

It must be `stretch`, `flex-start`, `center`, `flex-end` or `baseline`.

Default value is `stretch`.

#### padding
Sets the padding of the column.

It must be `small`, `medium`, `large` or `default`.

Default value is `default`.

#### className
Sets the className value of the flex item.

It must be a `string`.

#### onClick
Sets the onClick value of the flex item.

Example:
```js
<FlexItem
  flexGrow={0}
  flexShrink={1}
  flexBasis="auto"
  order={0}
  alignSelf="stretch"
  padding="default">
  // children
</FlexItem>
```

## FlexColumn
A flex item element.

Allows to specify the width of the column.

The numbers of columns per row is `12`.

### Props
All props are required except the padding.

#### xs
Sets the width of the column in mobile devices.

It must be `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` or `12`.

#### sm
Sets the width of the column when the device has `min-width=576px`.

It must be `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` or `12`.

#### md
Sets the width of the column when the device has `min-width=768px`.

It must be `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` or `12`.

#### lg
Sets the width of the column when the device has `min-width=992px`.

It must be `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` or `12`.

#### xl
Sets the width of the column when the device has `min-width=1200px`.

It must be `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` or `12`.

#### padding
Sets the padding of the column.

It must be `small`, `medium`, `large` or `default`.

Default value is `default`.

#### className
Sets the className value of the flex item.

It must be a `string`.

#### onClick
Sets the onClick value of the flex item.

Example:
```js
<FlexColumn
  xs="12"
  sm="6"
  md="4"
  lg="3"
  xl="2"
  padding="default">
  // children
</FlexColumn>
```

## FlexGridColumn
A flex item element.

Allows to specify the number of columns to display per row.

The max numbers of columns to display per row is `6`.

### Props
All props are optional and have a default value.

#### columnsInXs
Sets the number of columns to display per row in mobile devices.

It must be `1`, `2`, `3`, `4` or `6`.

Default value is `1`.

#### columnsInSm
Sets the number of columns to display per row when the device has `min-width=576px`.

It must be `1`, `2`, `3`, `4` or `6`.

Default value is `2`.

#### columnsInMd
Sets the number of columns to display per row when the device has `min-width=768px`.

It must be `1`, `2`, `3`, `4` or `6`.

Default value is `3`.

#### columnsInLg
Sets the number of columns to display per row when the device has `min-width=992px`.

It must be `1`, `2`, `3`, `4` or `6`.

Default value is `4`.

#### columnsInXl
Sets the number of columns to display per row when the device has `min-width=1200px`.

It must be `1`, `2`, `3`, `4` or `6`.

Default value is `6`.

#### padding
Sets the padding of the column.

It must be `small`, `medium`, `large` or `default`.

Default value is `default`.

#### className
Sets the className value of the flex item.

It must be a `string`.

#### onClick
Sets the onClick value of the flex item.

Example:
```js
<FlexGridColumn
  columnsInXs="1"
  columnsInSm="2"
  columnsInMd="3"
  columnsInLg="4"
  columnsInXl="6"
  padding="default">
  // children
</FlexGridColumn>
```
