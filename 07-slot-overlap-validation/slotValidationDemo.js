/**
 * Availability Slot Overlap Validation Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming and sample data.
 * It does not contain company source code, internal APIs, database schema,
 * proprietary product names, or confidential business logic.
 */

/**
 * Converts a time string like "09:30" into total minutes.
 */
const convertTimeToMinutes = (timeValue) => {
    const [hours, minutes] = timeValue.split(":").map(Number);
    return hours * 60 + minutes;
};

/**
 * Checks whether the slot has valid start and end time.
 */
const isValidSlotRange = (slot) => {
    const startMinutes = convertTimeToMinutes(slot.startTime);
    const endMinutes = convertTimeToMinutes(slot.endTime);

    return startMinutes < endMinutes;
};

/**
 * Checks whether two time slots overlap.
 *
 * Example:
 * Slot A: 10:00 - 11:00
 * Slot B: 10:30 - 11:30
 * Result: Overlap exists
 */
const doSlotsOverlap = (firstSlot, secondSlot) => {
    const firstStart = convertTimeToMinutes(firstSlot.startTime);
    const firstEnd = convertTimeToMinutes(firstSlot.endTime);

    const secondStart = convertTimeToMinutes(secondSlot.startTime);
    const secondEnd = convertTimeToMinutes(secondSlot.endTime);

    return firstStart < secondEnd && secondStart < firstEnd;
};

/**
 * Checks whether the exact same slot already exists.
 */
const isDuplicateSlot = (existingSlots, newSlot) => {
    return existingSlots.some(
        (slot) =>
            slot.day === newSlot.day &&
            slot.startTime === newSlot.startTime &&
            slot.endTime === newSlot.endTime
    );
};

/**
 * Validates a new availability slot before saving.
 */
const validateNewAvailabilitySlot = (existingSlots, newSlot) => {
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
        return {
            isValid: false,
            message: "Day, start time, and end time are required.",
        };
    }

    if (!isValidSlotRange(newSlot)) {
        return {
            isValid: false,
            message: "Start time must be earlier than end time.",
        };
    }

    if (isDuplicateSlot(existingSlots, newSlot)) {
        return {
            isValid: false,
            message: "This availability slot already exists.",
        };
    }

    const overlappingSlot = existingSlots.find(
        (slot) => slot.day === newSlot.day && doSlotsOverlap(slot, newSlot)
    );

    if (overlappingSlot) {
        return {
            isValid: false,
            message: `Slot overlaps with existing slot ${overlappingSlot.startTime} - ${overlappingSlot.endTime} on ${overlappingSlot.day}.`,
        };
    }

    return {
        isValid: true,
        message: "Availability slot is valid.",
    };
};

/**
 * Sample existing availability slots.
 */
const existingAvailabilitySlots = [
    {
        id: 1,
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
    },
    {
        id: 2,
        day: "Monday",
        startTime: "11:00",
        endTime: "12:00",
    },
    {
        id: 3,
        day: "Tuesday",
        startTime: "14:00",
        endTime: "15:00",
    },
];

/**
 * Sample test cases.
 */
const testSlots = [
    {
        day: "Monday",
        startTime: "10:00",
        endTime: "11:00",
    },
    {
        day: "Monday",
        startTime: "09:30",
        endTime: "10:30",
    },
    {
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
    },
    {
        day: "Wednesday",
        startTime: "16:00",
        endTime: "15:30",
    },
];

/**
 * Demo output.
 */
testSlots.forEach((slot) => {
    const result = validateNewAvailabilitySlot(existingAvailabilitySlots, slot);

    console.log({
        slot,
        result,
    });
});

/**
 * Exported for reuse in other demo files.
 */
export {
    convertTimeToMinutes,
    isValidSlotRange,
    doSlotsOverlap,
    isDuplicateSlot,
    validateNewAvailabilitySlot,
};