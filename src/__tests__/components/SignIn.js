/* global describe, it, expect, jest */
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  it('calls onSubmit with entered username and password', async () => {
    const onSubmit = jest.fn();

    render(<SignInForm onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'kalle',
        password: 'password',
      }),
      expect.anything(),
      expect.anything(),
    );
  });
});