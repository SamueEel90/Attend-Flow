import User from '../types/User';

export const sortUsersByTime = (users: User[]): User[] =>
  [...users].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );