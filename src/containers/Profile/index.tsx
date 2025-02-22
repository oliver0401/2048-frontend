import React from 'react';
import Text from '../../components/Text';
import { useMainContext } from '../../context/MainContext';
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import { useClipboard } from '../../hooks/useClipboard';
import Button from '../../components/Button';
import { PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { RenderField } from './RenderField';
export const ProfileContainer: React.FC = () => {
  const { user } = useMainContext();
  const navigate = useNavigate();
  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument size={20} />,
    <HiOutlineClipboardDocumentCheck size={20} />,
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-start items-start p-10">
      {RenderField({ label: 'Username', value: user?.username })}
      {RenderField({
        label: 'Address',
        value: (
          <div
            onClick={onClick}
            className="flex items-center justify-center"
          >
            <Text as="span" color="primary" fontSize={18} className="font-mono">
              {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
            </Text>
            <div
              className="flex items-center justify-center"
            >
              {content}
            </div>
          </div>
        ),
      })}
      {RenderField({
        label: 'Grid Size',
        value: `${user?.rows || '-1'} x ${user?.cols || '-1'}`,
      })}
      {RenderField({ label: 'Max Score', value: user?.maxScore })}
      {RenderField({ label: 'Max Tile', value: user?.maxTile })}
      {RenderField({ label: 'Max Moves', value: user?.maxMoves })}
      <Button
        onClick={() => navigate(PATH.GAME)}
        className="group w-full flex items-center justify-center gap-2"
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to Game
      </Button>
    </div>
  );
};
