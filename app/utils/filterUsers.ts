import User from '../types/User';

const filterUsers = (
  users: User[],
  selectedDateString: string,
  searchTerm: string,
  selectedAction: string
): User[] =>
  users.filter((user) => {
    const userDate = new Date(user.timestamp).toISOString().split('T')[0];
    const matchesDate = userDate === selectedDateString;
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAction =
      selectedAction === '' ||
      (selectedAction === 'break'
        ? user.action === 'break_start' || user.action === 'break_end'
        : user.action === selectedAction);

    return matchesDate && matchesSearch && matchesAction;
  });
export default filterUsers;