import TCardInteraction from '../types/cardInteraction';

const filterUsers = (
  users: TCardInteraction[],
  selectedDateString: string,
  searchTerm: string,
  selectedAction: string
): TCardInteraction[] =>
  users.filter((user) => {
    const userDate = new Date(user.timestamp).toISOString().split('T')[0];
    const matchesDate = userDate === selectedDateString;
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Upravené podľa možných hodnôt action v TCardInteraction
    const matchesAction =
      selectedAction === '' ||
      (selectedAction === 'break'
        ? user.action === 'začiatok_prestávky' || user.action === 'koniec_prestávky'
        : user.action === selectedAction);

    return matchesDate && matchesSearch && matchesAction;
  });

export default filterUsers;
