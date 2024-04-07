import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./App.css"; // Assuming you have a CSS file for styling

function DatePicker({
  show,
  setShow,
  DisableBeforeDates,
  showCloseButton,
  DisableBeforeMonths,
  setSelectedDate,
  selectedDate,
  HeadingMessage,
  showBackgroundDull,
  closeWhenClickOutside,
  numberOfMonthsToShow,
  disableDatesBeforeSelectedDate,
  CalenderValues,
}) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate instanceof Date ? selectedDate : new Date()
  );

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getMonthName = (month) =>
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][month];
  const getWeekdayName = (dayIndex) =>
    ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][dayIndex];

  const handleDateClick = useCallback(
    (day) => {
      setSelectedDate((selectedDate) => {
        return day.getTime() === (selectedDate && selectedDate.getTime())
          ? null
          : day;
      });
    },
    [setSelectedDate]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
    );
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
    );
  }, []);

  function getFutureDate(months) {
    // Get current date
    var currentDate = new Date();

    // Calculate future month
    currentDate.setMonth(currentDate.getMonth() + months);

    // Get day, month, and year
    var futureDay = currentDate.getDate();
    var futureMonth = currentDate.getMonth();
    var futureYear = currentDate.getFullYear();

    // Array of month names
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Return date in format: Day Month Year
    return [futureDay, monthNames[futureMonth], futureYear];
  }

  const renderMonth = useCallback(
    (offset) => {
      let year = currentMonth.getFullYear();
      let month = currentMonth.getMonth() + offset;
      // Adjust year and month if necessary
      if (month < 0) {
        month = 11;
        year -= 1;
      } else if (month > 11) {
        month = 0;
        year += 1;
      }

      const totalDays = daysInMonth(year, month);
      const monthName = getMonthName(month);

      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const offsetDays = (firstDayOfMonth + 6) % 7;

      const calendarDays = [];
      for (let i = 0; i < offsetDays; i++) {
        calendarDays.push(
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        );
      }

      for (let i = 1; i <= totalDays; i++) {
        const currentDate = new Date(year, month, i);
        const isSelectedDate =
          selectedDate &&
          selectedDate.getDate() === i &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year;
        const isToday =
          currentDate.toDateString() === new Date().toDateString();
        const futureDate =
          numberOfMonthsToShow !== undefined &&
          getFutureDate(numberOfMonthsToShow);

        calendarDays.push(
          <div
            key={i}
            className={`calendar-day ${isToday ? "today" : ""} ${
              isSelectedDate ? "selected" : ""
            } ${
              DisableBeforeDates
                ? (currentDate < new Date().setHours(0, 0, 0, 0) ||
                    currentDate >
                      new Date(
                        futureDate[2],
                        futureDate[1],
                        futureDate[0]
                      ).setHours(0, 0, 0, 0)) &&
                  "disable-date"
                : ""
            } ${
              disableDatesBeforeSelectedDate && currentDate < selectedDate
                ? "disable-date"
                : ""
            }`}
            onClick={() => handleDateClick(currentDate)}
          >
            <div className="date">{i}</div>
            {CalenderValues?.map((item) => {
              const [date, value] = Object.entries(item)[0];
              const [d, m, y] = date.split("-");
              if (
                parseInt(d) === i &&
                parseInt(m) === month + 1 &&
                parseInt(y) === year
              ) {
                return (
                  <div key={date} className="value">
                    {value || "--"}
                  </div>
                );
              }
              return null;
            })}
{!CalenderValues?.some(
    (item) =>
        parseInt(Object.keys(item)[0].split("-")[0]) === i &&
        parseInt(Object.keys(item)[0].split("-")[1]) === month + 1 &&
        parseInt(Object.keys(item)[0].split("-")[2]) === year
) ? <div className="value">{(CalenderValues == undefined || CalenderValues == null) ? "" : "--"}</div> : null}

          </div>
        );
      }

      return (
        <div className="month">
          <div className="calendar-header">
            {offset === 1 && <span></span>}
            {offset === 0 && (
              <span
                className="navigation-buttons back-arrow"
                onClick={handlePrevMonth}
                style={{
                  visibility: !DisableBeforeMonths
                    ? "visible"
                    : getMonthName(new Date().getMonth()) === monthName &&
                      new Date().getFullYear() === year &&
                      "hidden",
                }} // Hide back arrow conditionally
              ></span>
            )}
            <span>
              {monthName} {year}
            </span>
            {offset === 1 && (
              <span
                className="navigation-buttons forward-arrow"
                onClick={handleNextMonth}
                style={{
                  visibility:
                    numberOfMonthsToShow === undefined
                      ? "visible"
                      : getFutureDate(numberOfMonthsToShow)[1] === monthName &&
                        getFutureDate(numberOfMonthsToShow)[2] === year &&
                        "hidden",
                }} // Hide back arrow conditionally
              ></span>
            )}
            {offset === 0 && <span></span>}
          </div>
          <div className="calendar-days">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={`calendar-day ${index < 7 ? "weekday" : ""}`}
              >
                {getWeekdayName(index)}
              </div>
            ))}
            {calendarDays}
          </div>
        </div>
      );
    },
    [
      currentMonth,
      DisableBeforeDates,
      DisableBeforeMonths,
      handleDateClick,
      handleNextMonth,
      handlePrevMonth,
      numberOfMonthsToShow,
      selectedDate,
      CalenderValues,
      disableDatesBeforeSelectedDate,
    ]
  );

  const futureDate = useMemo(
    () => getFutureDate(numberOfMonthsToShow),
    [numberOfMonthsToShow]
  );

  return (
    <div className="app-container">
      {show && (
        <div
          className={showBackgroundDull ? "popup-shadow1" : "popup-shadow2"}
          onClick={() => {
            closeWhenClickOutside && setShow(false);
          }}
        >
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="top-strip">
              <div className="today-date">{HeadingMessage}</div>
              {showCloseButton && (
                <div className="close-button" onClick={() => setShow(false)}>
                  <span>&times;</span>
                </div>
              )}
            </div>
            <div className="calendar-container">
              {renderMonth(0)}
              {renderMonth(1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(DatePicker);
