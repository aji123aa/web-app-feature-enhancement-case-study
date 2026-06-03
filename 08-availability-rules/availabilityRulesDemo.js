/**
 * Consultant Availability Rules Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming and sample data.
 * It does not contain company source code, internal APIs, database schema,
 * proprietary product names, or confidential business logic.
 */

/**
 * Converts "HH:mm" time into total minutes.
 */
const convertTimeToMinutes = (timeValue) => {
    const [hours, minutes] = timeValue.split(":").map(Number);
    return hours * 60 + minutes;
};

/**
 * Adds minutes to a time string.
 */
const addMinutesToTime = (timeValue, minutesToAdd) => {
    const totalMinutes = convertTimeToMinutes(timeValue) + minutesToAdd;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/**
 * Checks if a date is marked unavailable.
 */
const isUnavailableDate = (bookingDate, unavailableDates) => {
    return unavailableDates.includes(bookingDate);
};

/**
 * Checks whether the daily booking limit has already been reached.
 */
const isDailyLimitReached = (bookingDate, existingBookings, dailyLimit) => {
    const bookingsForDate = existingBookings.filter(
        (booking) => booking.date === bookingDate
    );

    return bookingsForDate.length >= dailyLimit;
};

/**
 * Checks whether the selected slot is inside normal availability or extra slots.
 */
const isSlotAllowed = (bookingDate, bookingTime, availabilityRules) => {
    const bookingDay = new Date(bookingDate).toLocaleDateString("en-US", {
        weekday: "long",
    });

    const normalSlots = availabilityRules.weeklySlots.filter(
        (slot) => slot.day === bookingDay
    );

    const extraSlots = availabilityRules.extraSlots.filter(
        (slot) => slot.date === bookingDate
    );

    const allAllowedSlots = [...normalSlots, ...extraSlots];

    return allAllowedSlots.some(
        (slot) => bookingTime >= slot.startTime && bookingTime < slot.endTime
    );
};

/**
 * Checks notice period rule.
 */
const isWithinNoticePeriod = (bookingDate, bookingTime, noticePeriodHours) => {
    const selectedDateTime = new Date(`${bookingDate}T${bookingTime}:00`);
    const now = new Date();

    const minimumAllowedTime = new Date(
        now.getTime() + noticePeriodHours * 60 * 60 * 1000
    );

    return selectedDateTime < minimumAllowedTime;
};

/**
 * Checks slot visibility window.
 */
const isOutsideVisibilityWindow = (bookingDate, slotVisibilityDays) => {
    const selectedDate = new Date(`${bookingDate}T00:00:00`);
    const now = new Date();

    const maxVisibleDate = new Date(
        now.getTime() + slotVisibilityDays * 24 * 60 * 60 * 1000
    );

    return selectedDate > maxVisibleDate;
};

/**
 * Checks if selected booking conflicts with existing bookings using buffer time.
 */
const hasBufferConflict = (
    bookingDate,
    bookingTime,
    durationMinutes,
    existingBookings,
    bufferMinutes
) => {
    const selectedStart = convertTimeToMinutes(bookingTime);
    const selectedEnd = selectedStart + durationMinutes;

    return existingBookings.some((booking) => {
        if (booking.date !== bookingDate) {
            return false;
        }

        const existingStart = convertTimeToMinutes(booking.startTime);
        const existingEnd = existingStart + booking.durationMinutes;

        const blockedStart = existingStart - bufferMinutes;
        const blockedEnd = existingEnd + bufferMinutes;

        return selectedStart < blockedEnd && selectedEnd > blockedStart;
    });
};

/**
 * Main booking slot validation function.
 */
const validateBookingSlot = ({
    bookingDate,
    bookingTime,
    durationMinutes,
    availabilityRules,
    existingBookings,
}) => {
    if (!bookingDate || !bookingTime) {
        return {
            isValid: false,
            message: "Booking date and time are required.",
        };
    }

    if (isUnavailableDate(bookingDate, availabilityRules.unavailableDates)) {
        return {
            isValid: false,
            message: "The selected date is unavailable.",
        };
    }

    if (
        isDailyLimitReached(
            bookingDate,
            existingBookings,
            availabilityRules.dailyBookingLimit
        )
    ) {
        return {
            isValid: false,
            message: "Daily booking limit has been reached.",
        };
    }

    if (
        isWithinNoticePeriod(
            bookingDate,
            bookingTime,
            availabilityRules.noticePeriodHours
        )
    ) {
        return {
            isValid: false,
            message: "The selected slot does not satisfy the required notice period.",
        };
    }

    if (
        isOutsideVisibilityWindow(
            bookingDate,
            availabilityRules.slotVisibilityDays
        )
    ) {
        return {
            isValid: false,
            message: "The selected slot is outside the visible booking window.",
        };
    }

    if (!isSlotAllowed(bookingDate, bookingTime, availabilityRules)) {
        return {
            isValid: false,
            message: "The selected slot is not part of available time slots.",
        };
    }

    if (
        hasBufferConflict(
            bookingDate,
            bookingTime,
            durationMinutes,
            existingBookings,
            availabilityRules.bufferMinutes
        )
    ) {
        return {
            isValid: false,
            message: "The selected slot conflicts with an existing booking or buffer time.",
        };
    }

    return {
        isValid: true,
        message: "Booking slot is valid.",
    };
};

/**
 * Sample availability rules.
 */
const sampleAvailabilityRules = {
    unavailableDates: ["2026-06-10"],
    dailyBookingLimit: 3,
    noticePeriodHours: 24,
    slotVisibilityDays: 30,
    bufferMinutes: 30,
    weeklySlots: [
        {
            day: "Monday",
            startTime: "09:00",
            endTime: "12:00",
        },
        {
            day: "Wednesday",
            startTime: "14:00",
            endTime: "17:00",
        },
    ],
    extraSlots: [
        {
            date: "2026-06-15",
            startTime: "18:00",
            endTime: "20:00",
        },
    ],
};

/**
 * Sample existing bookings.
 */
const sampleExistingBookings = [
    {
        id: "booking-1",
        date: "2026-06-15",
        startTime: "18:30",
        durationMinutes: 60,
    },
];

/**
 * Demo validation call.
 */
const demoResult = validateBookingSlot({
    bookingDate: "2026-06-15",
    bookingTime: "19:45",
    durationMinutes: 30,
    availabilityRules: sampleAvailabilityRules,
    existingBookings: sampleExistingBookings,
});

console.log(demoResult);

export {
    convertTimeToMinutes,
    addMinutesToTime,
    isUnavailableDate,
    isDailyLimitReached,
    isSlotAllowed,
    isWithinNoticePeriod,
    isOutsideVisibilityWindow,
    hasBufferConflict,
    validateBookingSlot,
};