import React, { FC } from 'react';
import { MIN_SCALE } from '../../utils/constants';
import Button from '../Button';
import Text from '../Text';
import { IoGameControllerOutline } from 'react-icons/io5';

interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (delta: number) => void;
  onChangeCol: (delta: number) => void;
  maxScaleRows: number;
  maxScaleCols: number;
}

const Control: FC<ControlProps> = ({
  rows,
  cols,
  onReset,
  onChangeRow,
  onChangeCol,
  maxScaleRows,
  maxScaleCols,
}) => (
  <div className="w-full flex justify-between">
    <Button onClick={onReset}>
      <Text fontSize={16} textTransform="capitalize" className="flex items-center gap-2">
        <IoGameControllerOutline size={20} />
        new game
      </Text>
    </Button>
    <div className="flex">
      <div className="mr-6 flex flex-col items-center">
        <Text textTransform="uppercase" fontSize={13} color="primary">
          rows
        </Text>
        <div className="px-2 flex items-center">
          <Button
            mini
            onClick={() => onChangeRow(-1)}
            disabled={rows === MIN_SCALE}
          >
            -
          </Button>
          <div className="mx-3">
            <Text fontSize={16} color="primary">
              {rows}
            </Text>
          </div>
          <Button
            mini
            onClick={() => onChangeRow(1)}
            disabled={rows === maxScaleRows}
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Text textTransform="uppercase" fontSize={13} color="primary">
          cols
        </Text>
        <div className="px-2 flex items-center">
          <Button
            mini
            onClick={() => onChangeCol(-1)}
            disabled={cols === MIN_SCALE}
          >
            -
          </Button>
          <div className="mx-3">
            <Text fontSize={16} color="primary">
              {cols}
            </Text>
          </div>
          <Button
            mini
            onClick={() => onChangeCol(1)}
            disabled={cols === maxScaleCols}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Control;
