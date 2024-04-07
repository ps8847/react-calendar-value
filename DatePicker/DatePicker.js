"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./App.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Assuming you have a CSS file for styling

function DatePicker(_ref) {
  let {
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
    CalenderValues
  } = _ref;
  const [currentMonth, setCurrentMonth] = (0, _react.useState)(selectedDate instanceof Date ? selectedDate : new Date());
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getMonthName = month => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
  const getWeekdayName = dayIndex => ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][dayIndex];
  const handleDateClick = (0, _react.useCallback)(day => {
    setSelectedDate(selectedDate => {
      return day.getTime() === (selectedDate && selectedDate.getTime()) ? null : day;
    });
  }, [setSelectedDate]);
  const handlePrevMonth = (0, _react.useCallback)(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  }, []);
  const handleNextMonth = (0, _react.useCallback)(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
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
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Return date in format: Day Month Year
    return [futureDay, monthNames[futureMonth], futureYear];
  }
  const renderMonth = (0, _react.useCallback)(offset => {
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
      calendarDays.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "empty-".concat(i),
        className: "calendar-day empty"
      }));
    }
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);
      const isSelectedDate = selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const futureDate = numberOfMonthsToShow !== undefined && getFutureDate(numberOfMonthsToShow);
      calendarDays.push( /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: "calendar-day ".concat(isToday ? "today" : "", " ").concat(isSelectedDate ? "selected" : "", " ").concat(DisableBeforeDates ? (currentDate < new Date().setHours(0, 0, 0, 0) || currentDate > new Date(futureDate[2], futureDate[1], futureDate[0]).setHours(0, 0, 0, 0)) && "disable-date" : "", " ").concat(disableDatesBeforeSelectedDate && currentDate < selectedDate ? "disable-date" : ""),
        onClick: () => handleDateClick(currentDate)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "date"
      }, i), CalenderValues === null || CalenderValues === void 0 ? void 0 : CalenderValues.map(item => {
        const [date, value] = Object.entries(item)[0];
        const [d, m, y] = date.split("-");
        if (parseInt(d) === i && parseInt(m) === month + 1 && parseInt(y) === year) {
          return /*#__PURE__*/_react.default.createElement("div", {
            key: date,
            className: "value"
          }, value || "--");
        }
        return null;
      }), !(CalenderValues !== null && CalenderValues !== void 0 && CalenderValues.some(item => parseInt(Object.keys(item)[0].split("-")[0]) === i && parseInt(Object.keys(item)[0].split("-")[1]) === month + 1 && parseInt(Object.keys(item)[0].split("-")[2]) === year)) ? /*#__PURE__*/_react.default.createElement("div", {
        className: "value"
      }, CalenderValues == undefined || CalenderValues == null ? "" : "--") : null));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "month"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "calendar-header"
    }, offset === 1 && /*#__PURE__*/_react.default.createElement("span", null), offset === 0 && /*#__PURE__*/_react.default.createElement("span", {
      className: "navigation-buttons back-arrow",
      onClick: handlePrevMonth,
      style: {
        visibility: !DisableBeforeMonths ? "visible" : getMonthName(new Date().getMonth()) === monthName && new Date().getFullYear() === year && "hidden"
      } // Hide back arrow conditionally
    }), /*#__PURE__*/_react.default.createElement("span", null, monthName, " ", year), offset === 1 && /*#__PURE__*/_react.default.createElement("span", {
      className: "navigation-buttons forward-arrow",
      onClick: handleNextMonth,
      style: {
        visibility: numberOfMonthsToShow === undefined ? "visible" : getFutureDate(numberOfMonthsToShow)[1] === monthName && getFutureDate(numberOfMonthsToShow)[2] === year && "hidden"
      } // Hide back arrow conditionally
    }), offset === 0 && /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "calendar-days"
    }, Array.from({
      length: 7
    }).map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: "calendar-day ".concat(index < 7 ? "weekday" : "")
    }, getWeekdayName(index))), calendarDays));
  }, [currentMonth, DisableBeforeDates, DisableBeforeMonths, handleDateClick, handleNextMonth, handlePrevMonth, numberOfMonthsToShow, selectedDate, CalenderValues, disableDatesBeforeSelectedDate]);
  const futureDate = (0, _react.useMemo)(() => getFutureDate(numberOfMonthsToShow), [numberOfMonthsToShow]);
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
var _default = exports.default = /*#__PURE__*/_react.default.memo(DatePicker);
