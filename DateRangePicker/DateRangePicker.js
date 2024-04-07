import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css"; // Assuming you have a CSS file for styling

export default function DateRangePicker({
  show,
  setShow,
  DisableBeforeDates,
  showCloseButton,
  DisableBeforeMonths,
  setSelectedDate1,
  selectedDate1,
  setSelectedDate2,
  selectedDate2,
  HeadingMessage,
  showBackgroundDull,
  closeWhenClickOutside,
  numberOfMonthsToShow,
  disableDatesBeforeSelectedDate,
  CalenderValues,
}) {
  const [turnOfDate, setTurnOfDate] = useState(2);
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDateHover = useCallback((day) => {
    setHoveredDate(day);
  }, []);

  useEffect(() => {
    if (selectedDate2 < selectedDate1) {
      setSelectedDate2(null);
    }
  }, [selectedDate1, selectedDate2]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useCallback((year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getMonthName = useCallback((month) => {
    const monthNames = [
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
    return monthNames[month];
  }, []);

  const getWeekdayName = useCallback((dayIndex) => {
    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return weekdays[dayIndex];
  }, []);

  const handleDateClick = useCallback(
    (day) => {
      if (turnOfDate === 1) {
        setSelectedDate1(day);
        setTurnOfDate(2);
      } else {
        setSelectedDate2(day);
        setTurnOfDate(1);
      }
    },
    [turnOfDate, setSelectedDate1, setSelectedDate2]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      return new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() - 1,
        1
      );
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      return new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + 1,
        1
      );
    });
  }, []);

  const getFutureDate = useCallback((months) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    const futureDay = currentDate.getDate();
    const futureMonth = currentDate.getMonth();
    const futureYear = currentDate.getFullYear();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return [futureDay, monthNames[futureMonth], futureYear];
  }, []);

  const renderMonth = useCallback((offset) => {
    let year = currentMonth.getFullYear();
    let month = currentMonth.getMonth() + offset;

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
      const isBetweenSelectedDates =
        selectedDate1 &&
        selectedDate2 &&
        currentDate > selectedDate1 &&
        currentDate < selectedDate2;
      const isBetweenHoveredDates =
        selectedDate1 &&
        hoveredDate &&
        currentDate > selectedDate1 &&
        currentDate < hoveredDate;
      const isSelectedDate1 =
        selectedDate1 &&
        selectedDate1.getDate() === i &&
        selectedDate1.getMonth() === month &&
        selectedDate1.getFullYear() === year;
      const isSelectedDate2 =
        selectedDate2 &&
        selectedDate2.getDate() === i &&
        selectedDate2.getMonth() === month &&
        selectedDate2.getFullYear() === year;

      let futureDate =
        numberOfMonthsToShow != undefined && getFutureDate(numberOfMonthsToShow);
      let isDateDisable =
        currentDate.setHours(0, 0, 0, 0) >
        new Date(
          futureDate[0] + "-" + futureDate[1] + "-" + futureDate[2]
        );

      const isToday = currentDate.toDateString() === new Date().toDateString();

      calendarDays.push(
        <div
          key={i}
          className={`calendar-day ${
            isToday ? "today" : ""
          } ${isSelectedDate1 || isSelectedDate2 ? "selected" : ""} ${
            isBetweenSelectedDates || isBetweenHoveredDates ? "between-dates" : ""
          } ${
            DisableBeforeDates
              ? (currentDate < new Date().setHours(0, 0, 0, 0) || isDateDisable) &&
                "disable-date"
              : ""
          } ${
            disableDatesBeforeSelectedDate && currentDate < selectedDate1
              ? "disable-date"
              : ""
          }`}
          onClick={() => handleDateClick(currentDate)}
          onMouseEnter={() => handleDateHover(currentDate)}
          onMouseLeave={() => handleDateHover(null)}
        >
          <div className="date">{i}</div>
          {CalenderValues?.map((item) => {
            const date = Object.keys(item)[0];
            const value = Object.values(item)[0];
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
          {!CalenderValues.some(
            (item) =>
              parseInt(Object.keys(item)[0].split("-")[0]) === i &&
              parseInt(Object.keys(item)[0].split("-")[1]) === month + 1 &&
              parseInt(Object.keys(item)[0].split("-")[2]) === year
          ) && <div className="value">--</div>}
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
                    new Date().getFullYear() === year
                  ? "hidden"
                  : "visible",
              }}
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
                  numberOfMonthsToShow == undefined
                    ? "visible"
                    : getFutureDate(numberOfMonthsToShow)[1] === monthName &&
                      getFutureDate(numberOfMonthsToShow)[2] === year
                    ? "hidden"
                    : "visible",
              }}
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
  }, [
    currentMonth,
    daysInMonth,
    getMonthName,
    handleDateClick,
    handleDateHover,
    handleNextMonth,
    handlePrevMonth,
    hoveredDate,
    selectedDate1,
    selectedDate2,
    DisableBeforeDates,
    disableDatesBeforeSelectedDate,
    CalenderValues,
    numberOfMonthsToShow,
    getFutureDate,
  ]);

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
