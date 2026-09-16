import { useState } from 'react';
import AuthStorage from '../utils/authStorage';

const useAuthStorage = () => {
  const [authStorage] = useState(() => new AuthStorage());

  return authStorage;
};

export default useAuthStorage;