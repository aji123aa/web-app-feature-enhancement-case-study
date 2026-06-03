/**
 * One-to-One Consultation Enhancement Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming and sample data.
 * It does not contain company source code, internal APIs, database schema,
 * proprietary product names, or confidential business logic.
 */

/**
 * Generic booking status values used in the demo.
 */
const BOOKING_STATUS = {
    DRAFT: "draft",
    PENDING_REVIEW: "pending_consultant_review",
    NEEDS_MORE_DETAILS: "needs_more_details",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
};

/**
 * Sample booking request.
 */
const sampleBookingRequest = {
    id: "booking-101",
    userId: "user-101",
    consultantId: "consultant-501",
    selectedDate: "2026-06-20",
    selectedTime: "10:00",
    durationMinutes: 60,
    topic: "Project guidance session",
    userRequirements: {
        goal: "Need guidance on improving project workflow",
        background: "Beginner-level understanding",
    },
    status: BOOKING_STATUS.PENDING_REVIEW,
    meetingLink: null,
    codeOfConductAccepted: false,
    followUpOfBookingId: null,
};

/**
 * Consultant accepts the booking after review.
 */
const acceptBookingRequest = (booking) => {
    if (booking.status !== BOOKING_STATUS.PENDING_REVIEW) {
        return {
            success: false,
            message: "Only pending booking requests can be accepted.",
            booking,
        };
    }

    return {
        success: true,
        message: "Booking accepted by consultant.",
        booking: {
            ...booking,
            status: BOOKING_STATUS.ACCEPTED,
            meetingLink: "https://meeting.example.com/demo-session",
        },
    };
};

/**
 * Consultant rejects the booking with a reason.
 */
const rejectBookingRequest = (booking, reason) => {
    if (booking.status !== BOOKING_STATUS.PENDING_REVIEW) {
        return {
            success: false,
            message: "Only pending booking requests can be rejected.",
            booking,
        };
    }

    return {
        success: true,
        message: "Booking rejected by consultant.",
        booking: {
            ...booking,
            status: BOOKING_STATUS.REJECTED,
            rejectionReason: reason,
        },
    };
};

/**
 * Consultant asks the user for more details before accepting.
 */
const requestMoreDetails = (booking, question) => {
    if (booking.status !== BOOKING_STATUS.PENDING_REVIEW) {
        return {
            success: false,
            message: "Additional details can be requested only for pending bookings.",
            booking,
        };
    }

    return {
        success: true,
        message: "More details requested from user.",
        booking: {
            ...booking,
            status: BOOKING_STATUS.NEEDS_MORE_DETAILS,
            additionalQuestion: question,
        },
    };
};

/**
 * User submits additional information requested by the consultant.
 */
const submitAdditionalDetails = (booking, answer) => {
    if (booking.status !== BOOKING_STATUS.NEEDS_MORE_DETAILS) {
        return {
            success: false,
            message: "This booking is not waiting for additional details.",
            booking,
        };
    }

    return {
        success: true,
        message: "Additional details submitted successfully.",
        booking: {
            ...booking,
            status: BOOKING_STATUS.PENDING_REVIEW,
            additionalAnswer: answer,
        },
    };
};

/**
 * User accepts code of conduct before joining the meeting.
 */
const acceptCodeOfConduct = (booking) => {
    if (booking.status !== BOOKING_STATUS.ACCEPTED) {
        return {
            success: false,
            message: "Code of conduct can be accepted only for accepted bookings.",
            booking,
        };
    }

    return {
        success: true,
        message: "Code of conduct accepted. Meeting can be joined.",
        booking: {
            ...booking,
            codeOfConductAccepted: true,
        },
    };
};

/**
 * Validates whether the user can join the meeting.
 */
const canJoinMeeting = (booking) => {
    if (booking.status !== BOOKING_STATUS.ACCEPTED) {
        return {
            allowed: false,
            message: "Meeting can be joined only after booking acceptance.",
        };
    }

    if (!booking.meetingLink) {
        return {
            allowed: false,
            message: "Meeting link is not available.",
        };
    }

    if (!booking.codeOfConductAccepted) {
        return {
            allowed: false,
            message: "Please accept the code of conduct before joining.",
        };
    }

    return {
        allowed: true,
        message: "User can join the meeting.",
    };
};

/**
 * Creates a follow-up consultation request linked to an existing booking.
 */
const createFollowUpRequest = (completedBooking, followUpDetails) => {
    if (completedBooking.status !== BOOKING_STATUS.COMPLETED) {
        return {
            success: false,
            message: "Follow-up can be requested only after completing the original session.",
            followUpBooking: null,
        };
    }

    return {
        success: true,
        message: "Follow-up request created successfully.",
        followUpBooking: {
            id: "booking-follow-up-201",
            userId: completedBooking.userId,
            consultantId: completedBooking.consultantId,
            selectedDate: followUpDetails.selectedDate,
            selectedTime: followUpDetails.selectedTime,
            durationMinutes: followUpDetails.durationMinutes,
            topic: followUpDetails.topic,
            status: BOOKING_STATUS.PENDING_REVIEW,
            followUpOfBookingId: completedBooking.id,
        },
    };
};

/**
 * Demo flow.
 */
const moreDetailsResult = requestMoreDetails(
    sampleBookingRequest,
    "Please describe the main problem you want to solve."
);

console.log("Step 1:", moreDetailsResult.message);

const additionalDetailsResult = submitAdditionalDetails(
    moreDetailsResult.booking,
    "I need help organizing feature tasks and improving the project workflow."
);

console.log("Step 2:", additionalDetailsResult.message);

const acceptanceResult = acceptBookingRequest(additionalDetailsResult.booking);

console.log("Step 3:", acceptanceResult.message);

const joinCheckBeforeConduct = canJoinMeeting(acceptanceResult.booking);

console.log("Step 4:", joinCheckBeforeConduct.message);

const conductResult = acceptCodeOfConduct(acceptanceResult.booking);

console.log("Step 5:", conductResult.message);

const joinCheckAfterConduct = canJoinMeeting(conductResult.booking);

console.log("Step 6:", joinCheckAfterConduct.message);

export {
    BOOKING_STATUS,
    acceptBookingRequest,
    rejectBookingRequest,
    requestMoreDetails,
    submitAdditionalDetails,
    acceptCodeOfConduct,
    canJoinMeeting,
    createFollowUpRequest,
};