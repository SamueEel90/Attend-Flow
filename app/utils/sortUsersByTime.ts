import TCardInteraction from '../types/cardInteraction';

const sortUsersByTime = (users: TCardInteraction[]): TCardInteraction[] =>
  [...users].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

export default sortUsersByTime;