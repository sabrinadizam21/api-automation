const loginData = [
    {
        case: {
            title: 'TC001 - POST: Verify successfully login'
        },
        payload: {
            username : "admin",
            password : "password123"
        }
    },
    {
        case: {
            title: 'TC002 - POST: Verify failed login with empty input'
        },
        payload: {
            username : "",
            password : ""
        }
    },
    {
        case: {
            title: 'TC003 - POST: Failed login - input with invalid type'
        },
        payload: {
            username : 13,
            password : true
        }
    }
]

const createData = [
    {
        case: {
            title: 'TC004 - POST: Verify success create booking'
        },
        payload: {
            firstname : "Indah",
            lastname : "Kasih",
            totalprice : 120,
            depositpaid : true,
            bookingdates : {
                checkin : "2024-04-04",
                checkout : "2024-05-04"
            },
            additionalneeds : "Breakfast"
        }
    },
    {
        case: {
            title: 'TC005 - POST: Verify failed create booking with uncomplete body request'
        },
        payload: {
            totalprice : 130,
            depositpaid : true,
            bookingdates : {
                checkin : "2025-04-04",
                checkout : "2026-05-04"
            },
            additionalneeds : "Breakfast"
        }
    }
]

const updateData = [
    {
        case: {
            title: "TC006 - PUT: Verify success update booking",
        },
        payload: {
            firstname : "Indah",
            lastname : "Kasih",
            totalprice : 150,
            depositpaid : false,
            bookingdates : {
                checkin : "2024-04-04",
                checkout : "2024-05-04"
            },
            additionalneeds : ""
        }
    },
    {
        case: {
            title: "TC007 - PUT: Verify failed update booking with typo input field",
        },
        payload: {
            firstname : "Indah",
            lastname : "Kasih",
            totalprice : 150,
            depositpaid : false,
            booingdates : {
                checkin : "2025-04-04",
                checkout : "2026-05-04"
            },
            additionalneeds : "Breakfast"
        }
    }
]

const getListData = [
    {
        case:{
            title: "TC008 - GET: Verify success get list of booking IDs"
        }
    },
    {
        case:{
            title: "TC009 - GET: Verify success get list of booking ID with params"
        }
    }
]

const getDetailData= [
    {
        case:{
            title: "TC010 - GET: Verify success get booking by id"
        }
    },
    {
        case:{
            title: "TC011 - GET: Verify failed get booking with invalid id"
        }
    }
]

const updatePartialData = [
    {
        case:{
            title: "TC012 - PATCH: Verify success partial update booking"
        },
        payload: {
            firstname : "James",
            lastname : "Sugandar",
        }
    },
    {
        case:{
            title: "TC013 - PATCH: Verify failed partial update booking with invalid id"
        },
        payload: {
            firstname : "James",
            lastname : "Sugandar",
        }
    }
]
const deletebyIdData = [
    {
        case:{
            title: "TC014: DELETE: Verify failed delete booking"
        }
    },
    {
        case:{
            title: "TC015: DELETE: Verify failed delete booking using deleted id"
        }
    }
]

module.exports = { loginData, createData, updateData, updatePartialData, deletebyIdData, getListData, getDetailData };