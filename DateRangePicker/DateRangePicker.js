"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateRangePicker;
var _react = _interopRequireWildcard(require("react"));
require("./App.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Assuming you have a CSS file for styling

function DateRangePicker(_ref) {
  let {
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
    CalenderValues
  } = _ref;
  const [turnOfDate, setTurnOfDate] = (0, _react.useState)(2);
  const [hoveredDate, setHoveredDate] = (0, _react.useState)(null);
  const handleDateHover = (0, _react.useCallback)(day => {
    setHoveredDate(day);
  }, []);
  (0, _react.useEffect)(() => {
    if (selectedDate2 < selectedDate1) {
      setSelectedDate2(null);
    }
  }, [selectedDate1, selectedDate2]);
  const [currentMonth, setCurrentMonth] = (0, _react.useState)(new Date());
  const daysInMonth = (0, _react.useCallback)((year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);
  const getMonthName = (0, _react.useCallback)(month => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
  }, []);
  const getWeekdayName = (0, _react.useCallback)(dayIndex => {
    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return weekdays[dayIndex];
  }, []);
  const handleDateClick = (0, _react.useCallback)(day => {
    if (turnOfDate === 1) {
      setSelectedDate1(day);
      setTurnOfDate(2);
    } else {
      setSelectedDate2(day);
      setTurnOfDate(1);
    }
  }, [turnOfDate, setSelectedDate1, setSelectedDate2]);
  const handlePrevMonth = (0, _react.useCallback)(() => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1);
    });
  }, []);
  const handleNextMonth = (0, _react.useCallback)(() => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
    });
  }, []);
  const getFutureDate = (0, _react.useCallback)(months => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    const futureDay = currentDate.getDate();
    const futureMonth = currentDate.getMonth();
    const futureYear = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return [futureDay, monthNames[futureMonth], futureYear];
  }, []);
  const renderMonth = (0, _react.useCallback)(offset => {
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
      calendarDays.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "empty-".concat(i),
        className: "calendar-day empty"
      }));
    }
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);
      const isBetweenSelectedDates = selectedDate1 && selectedDate2 && currentDate > selectedDate1 && currentDate < selectedDate2;
      const isBetweenHoveredDates = selectedDate1 && hoveredDate && currentDate > selectedDate1 && currentDate < hoveredDate;
      const isSelectedDate1 = selectedDate1 && selectedDate1.getDate() === i && selectedDate1.getMonth() === month && selectedDate1.getFullYear() === year;
      const isSelectedDate2 = selectedDate2 && selectedDate2.getDate() === i && selectedDate2.getMonth() === month && selectedDate2.getFullYear() === year;
      let futureDate = numberOfMonthsToShow != undefined && getFutureDate(numberOfMonthsToShow);
      let isDateDisable = currentDate.setHours(0, 0, 0, 0) > new Date(futureDate[0] + "-" + futureDate[1] + "-" + futureDate[2]);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      calendarDays.push( /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: "calendar-day ".concat(isToday ? "today" : "", " ").concat(isSelectedDate1 || isSelectedDate2 ? "selected" : "", " ").concat(isBetweenSelectedDates || isBetweenHoveredDates ? "between-dates" : "", " ").concat(DisableBeforeDates ? (currentDate < new Date().setHours(0, 0, 0, 0) || isDateDisable) && "disable-date" : "", " ").concat(disableDatesBeforeSelectedDate && currentDate < selectedDate1 ? "disable-date" : ""),
        onClick: () => handleDateClick(currentDate),
        onMouseEnter: () => handleDateHover(currentDate),
        onMouseLeave: () => handleDateHover(null)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "date"
      }, i), CalenderValues === null || CalenderValues === void 0 ? void 0 : CalenderValues.map(item => {
        const date = Object.keys(item)[0];
        const value = Object.values(item)[0];
        const [d, m, y] = date.split("-");
        if (parseInt(d) === i && parseInt(m) === month + 1 && parseInt(y) === year) {
          return /*#__PURE__*/_react.default.createElement("div", {
            key: date,
            className: "value"
          }, value || "--");
        }
        return null;
      }), !CalenderValues.some(item => parseInt(Object.keys(item)[0].split("-")[0]) === i && parseInt(Object.keys(item)[0].split("-")[1]) === month + 1 && parseInt(Object.keys(item)[0].split("-")[2]) === year) && /*#__PURE__*/_react.default.createElement("div", {
        className: "value"
      }, "--")));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "month"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "calendar-header"
    }, offset === 1 && /*#__PURE__*/_react.default.createElement("span", null), offset === 0 && /*#__PURE__*/_react.default.createElement("span", {
      className: "navigation-buttons back-arrow",
      onClick: handlePrevMonth,
      style: {
        visibility: !DisableBeforeMonths ? "visible" : getMonthName(new Date().getMonth()) === monthName && new Date().getFullYear() === year ? "hidden" : "visible"
      }
    }), /*#__PURE__*/_react.default.createElement("span", null, monthName, " ", year), offset === 1 && /*#__PURE__*/_react.default.createElement("span", {
      className: "navigation-buttons forward-arrow",
      onClick: handleNextMonth,
      style: {
        visibility: numberOfMonthsToShow == undefined ? "visible" : getFutureDate(numberOfMonthsToShow)[1] === monthName && getFutureDate(numberOfMonthsToShow)[2] === year ? "hidden" : "visible"
      }
    }), offset === 0 && /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "calendar-days"
    }, Array.from({
      length: 7
    }).map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: "calendar-day ".concat(index < 7 ? "weekday" : "")
    }, getWeekdayName(index))), calendarDays));
  }, [currentMonth, daysInMonth, getMonthName, handleDateClick, handleDateHover, handleNextMonth, handlePrevMonth, hoveredDate, selectedDate1, selectedDate2, DisableBeforeDates, disableDatesBeforeSelectedDate, CalenderValues, numberOfMonthsToShow, getFutureDate]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "app-container"
  }, show && /*#__PURE__*/_react.default.createElement("div", {
    className: showBackgroundDull ? "popup-shadow1" : "popup-shadow2",
    onClick: () => {
      closeWhenClickOutside && setShow(false);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "popup",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "top-strip"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "today-date"
  }, HeadingMessage), showCloseButton && /*#__PURE__*/_react.default.createElement("div", {
    className: "close-button",
    onClick: () => setShow(false)
  }, /*#__PURE__*/_react.default.createElement("span", null, "\xD7"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-container"
  }, renderMonth(0), renderMonth(1)))));
}
