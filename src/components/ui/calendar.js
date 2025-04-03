export const Calendar = ({ selected, onSelect }) => (
  <input
    type='date'
    value={selected.toISOString().substr(0, 10)}
    onChange={(e) => onSelect(new Date(e.target.value))}
  />
);