
import { MaterialIcons } from '@expo/vector-icons';

export interface ShiftStatusStyles {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
}

function setCardBackgroundColor (action: string): ShiftStatusStyles {
  const actionKey = action.toLowerCase();

  switch (actionKey) {
    case 'začiatok_zmeny':
      return {
        backgroundColor: 'bg-green-800/20',
        borderColor: 'border-l-4 border-green-500',
        textColor: 'text-green-400',
        label: 'Začiatok zmeny',
        icon: 'login',
      };
    case 'koniec_zmeny':
      return {
        backgroundColor: 'bg-red-800/20',
        borderColor: 'border-l-4 border-red-500',
        textColor: 'text-red-400',
        label: 'Koniec zmeny',
        icon: 'logout',
      };
    case 'začiatok_prestávky':
      return {
        backgroundColor: 'bg-yellow-800/20',
        borderColor: 'border-l-4 border-yellow-500',
        textColor: 'text-yellow-400',
        label: 'Začiatok prestávky',
        icon: 'free-breakfast',
      };
    case 'koniec_prestávky':
      return {
        backgroundColor: 'bg-amber-800/20',
        borderColor: 'border-l-4 border-amber-500',
        textColor: 'text-amber-400',
        label: 'Koniec prestávky',
        icon: 'coffee',
      };
    default:
      return {
        backgroundColor: 'bg-blue-800/20',
        borderColor: 'border-l-4 border-blue-500',
        textColor: 'text-blue-400',
        label: 'Aktivita',
        icon: 'more-time',
      };
  }
}
export default setCardBackgroundColor;