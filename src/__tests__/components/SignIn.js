/* global describe, it, expect, jest */
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInForm from '../../components/SignInForm';

describe('SignIn', () => {
  it('calls onSubmit with entered username and password', async () => {
    const onSubmit = jest.fn();

    const { getByPlaceholderText, getByText } = await render(
      <SignInForm onSubmit={onSubmit} />,
    );

    await fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    await fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    await fireEvent.press(getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'kalle',
        password: 'password',
      }),
      expect.anything(),
    );
  });
});