import React from 'react';
import { GameLayout } from '../layouts';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import { PATH } from '../consts';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GameLayout>
      <div className="w-full h-full flex flex-col items-center justify-center my-4 gap-6 z-10 p-6 rounded-lg relative">
        <Text
          fontSize={36}
          as="h1"
          color="tile64"
          className="text-center font-bold"
        >
          Sign Up

        </Text>
        <div className="w-full flex flex-col items-start gap-2">
          <Text fontSize={18} as="label" color="primary">
            Email:
          </Text>
          <Input
            placeholder="Enter your email"
            width="100%"
            fontSize={18}
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <Text fontSize={18} as="label" color="primary">
            Password:
          </Text>
          <Input
            placeholder="Enter your password"
            width="100%"
            fontSize={18}
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <Button onClick={() => {}} width="w-full" color="tile64">
          Sign Up
        </Button>
        <Text fontSize={18} as="p" color="primary" className="text-center mt-4">
          Already have an account?{' '}
          <Text
            as="label"
            fontSize={18}
            color="tile64"
            className="cursor-pointer"
            onClick={() => navigate(PATH.SIGN_IN)}
          >
            Sign In
          </Text>
        </Text>
      </div>
    </GameLayout>
  );
};
