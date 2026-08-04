import { useState } from 'react';
import { WEEKDAY_LABELS, MONTH_LABELS, toDateKey, isSameDay, isPastDay } from '../utils/date.js';

const CLOSED_WEEKDAY = 0; // Domingo

// Quantos meses à frente o cliente pode navegar para agendar
const MAX_MONTHS_AHEAD = 2;

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate);
  const startWeekday = first.getDay();
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startWeekday);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    days.push(day);
  }
  return days;
}

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));

  const days = buildMonthGrid(visibleMonth);
  const canGoBack = visibleMonth > startOfMonth(today);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + MAX_MONTHS_AHEAD, 1);
  const canGoForward = visibleMonth < maxMonth;

  function changeMonth(delta) {
    setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function isDisabled(day) {
    return (
      day.getMonth() !== visibleMonth.getMonth() ||
      day.getDay() === CLOSED_WEEKDAY ||
      isPastDay(day)
    );
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          type="button"
          className="calendar__nav"
          onClick={() => changeMonth(-1)}
          disabled={!canGoBack}
          aria-label="Mês anterior"
        >
          ‹
        </button>
        <span className="calendar__title">
          {MONTH_LABELS[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
        </span>
        <button
          type="button"
          className="calendar__nav"
          onClick={() => changeMonth(1)}
          disabled={!canGoForward}
          aria-label="Próximo mês"
        >
          ›
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="calendar__grid">
        {days.map((day) => {
          const disabled = isDisabled(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const outOfMonth = day.getMonth() !== visibleMonth.getMonth();
          return (
            <button
              type="button"
              key={toDateKey(day)}
              className={[
                'calendar__day',
                outOfMonth ? 'calendar__day--muted' : '',
                disabled ? 'calendar__day--disabled' : '',
                selected ? 'calendar__day--selected' : '',
              ].join(' ').trim()}
              disabled={disabled}
              onClick={() => onSelectDate(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <p className="calendar__legend">
        Atendemos de <strong>segunda a sábado</strong>, das <strong>8h às 17h</strong>.
      </p>
    </div>
  );
}
