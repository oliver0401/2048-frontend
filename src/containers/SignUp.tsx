import React from 'react';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import { PATH } from '../consts';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMainContext } from '../context/MainContext';

export const SignUpContainer: React.FC = () => {
  const navigate = useNavigate();
  const { handleSignUp } = useMainContext();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required Email'),
      username: Yup.string().required('Required Name'),
      password: Yup.string().required('Required Password'),
    }),
    onSubmit: async (values, actions) => {
      try {
        await handleSignUp(values);
        actions.resetForm();
        navigate(PATH.SIGN_IN);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full flex flex-col items-center justify-center my-4 gap-6 z-10 p-6 rounded-lg relative"
    >
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
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : undefined
          }
          {...formik.getFieldProps('email')}
        />
      </div>
      <div className="w-full flex flex-col items-start gap-2">
        <Text fontSize={18} as="label" color="primary">
          Name:
        </Text>
        <Input
          placeholder="Enter your name"
          width="100%"
          fontSize={18}
          className="border-2 border-gray-300 rounded-md p-2"
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : undefined
          }
          {...formik.getFieldProps('username')}
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
          type="password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : undefined
          }
          {...formik.getFieldProps('password')}
        />
      </div>
      <Button width="w-full" color="tile64" type="submit">
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
    </form>
  );
};
