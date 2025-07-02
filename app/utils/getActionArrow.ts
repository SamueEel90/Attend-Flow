
export function getActionArrow(actionKey: string) {
  const key = actionKey.toLowerCase();

  let arrow = '';
  let arrowColorClass = '';

  if (key === 'shift_start') {
    arrow = '→'; // šípka doprava
    arrowColorClass = 'text-green-400';
  } else if (key === 'shift_end') {
    arrow = '←'; // šípka doľava
    arrowColorClass = 'text-red-400';
  } else if (key === 'break_start') {
    arrow = '→'; // horizontálna šípka
    arrowColorClass = 'text-yellow-400';
  }  else if (key === 'break_end') {
    arrow = '←'; // horizontálna šípka
    arrowColorClass = 'text-yellow-400';
  }
  else {
    arrow = '→'; // default šípka doprava
    arrowColorClass = 'text-greenPalette-50';
  }

  return { arrow, arrowColorClass };
}
