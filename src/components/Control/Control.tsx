import React, { FC } from 'react';
import { MIN_SCALE, MAX_SCALE } from '../../utils/constants';
import Button from '../Button';
import Text from '../Text';

interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (delta: number) => void;
  onChangeCol: (delta: number) => void;
}

const Control: FC<ControlProps> = ({
  rows,
  cols,
  onReset,
  onChangeRow,
  onChangeCol,
}) => (
  <div className="w-full flex justify-between">
    <Button onClick={onReset}>
      <Text fontSize={16} textTransform="capitalize">
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
            disable={rows === MIN_SCALE}
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
            disable={rows === MAX_SCALE}
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
            disable={cols === MIN_SCALE}
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
            disable={cols === MAX_SCALE}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Control;
