const getActionArrow = (actionKey: string) => {
  const key = actionKey.toLowerCase();

  let arrow = '';
  let arrowColorClass = '';

  if (key === 'začiatok_zmeny') {
    arrow = '→'; // šípka doprava
    arrowColorClass = 'text-green-400';
  } else if (key === 'koniec_zmeny') {
    arrow = '←'; // šípka doľava
    arrowColorClass = 'text-red-400';
  } else if (key === 'začiatok_prestávky') {
    arrow = '→'; // horizontálna šípka
    arrowColorClass = 'text-yellow-400';
  } else if (key === 'koniec_prestávky') {
    arrow = '←'; // horizontálna šípka
    arrowColorClass = 'text-yellow-400';
  } else {
    arrow = '→'; // default šípka doprava
    arrowColorClass = 'text-greenPalette-50';
  }

  return { arrow, arrowColorClass };
}
export default getActionArrow