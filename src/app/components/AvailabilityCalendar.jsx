import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AvailabilityCalendar = ({ availableDates, onDateClick }) => {
  const currentDate = new Date(); // Get the current date

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Availability Calendar</h3>
      <Calendar
        tileClassName={({ date, view }) => {
          const isAvailable = availableDates.includes(
            date.toISOString().split("T")[0]
          );
          return `custom-tile ${
            isAvailable ? "available-day" : "unavailable-day"
          } ${view === "month" && !isAvailable ? "grayed-out" : ""}`;
        }}
        onClickDay={onDateClick}
        calendarType="US"
        locale="en-US"
        prev2Label={null}
        next2Label={null}
        nextLabel={<span className="calendar-nav">›</span>}
        prevLabel={<span className="calendar-nav">‹</span>}
        minDate={currentDate} // Set minDate to the current date
      />
      <style jsx global>{`
        .react-calendar {
          max-width: 100%;
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .react-calendar__navigation {
          background: #e5e7eb;
          color: #111827;
        }

        .react-calendar__navigation button {
          color: #111827;
        }

        .react-calendar__month-view__days__day {
          color: #000; /* Black color for date numbers */
        }

        .react-calendar__month-view__month {
          color: #fff; /* White color for month names */
        }

        .react-calendar__month-view__month:hover {
          color: #000; /* Black color on hover for better visibility */
        }

        .react-calendar__month-view__days__day--neighboringMonth {
          color: #9ca3af; /* Gray out days from neighboring months */
        }

        .react-calendar__year-view__months__month {
            background-color: #fff !important; /* Black background for each month */
            color: #9ca3af !important; /* White color for month names */
            padding: 0.5em !important;
            cursor: pointer !important;
            transition: background-color 0.3s ease !important; /* Add color transition */
          }
        
          .react-calendar__year-view__months__month:hover {
            background-color: #9ca3af !important; /* Slightly darker black on hover */
            color: #000 !important;
          }

        .custom-tile {
          padding: 0.75em;
          text-align: center;
          font-weight: bold;
          transition: background-color 0.3s ease;
          background-color: #f0f4f8; /* Background color for the days */
        }

        .available-day {
          background-color: #34d399;
          color: #fff;
        }

        .unavailable-day {
          background-color: #d1d5db; /* Gray background for unavailable days */
          color: #fff;
        }

        .grayed-out {
          color: #9ca3af;
        }

        .react-calendar__tile--now {
          background: #e5e7eb;
        }

        .react-calendar__tile--active {
          background: #2563eb;
          color: #fff;
        }

        .calendar-nav {
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};

export default AvailabilityCalendar;










