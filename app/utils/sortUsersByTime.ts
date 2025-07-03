import User from '../types/User';

const sortUsersByTime = (users: User[]): User[] =>
  [...users].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
export default sortUsersByTime;