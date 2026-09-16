import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInForm from './SignInForm';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await signIn({ username, password });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
