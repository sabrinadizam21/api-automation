const schema_listBookingID = {
    "type": ["array", "object"],
    "properties": {
        "bookingid": {"type": "number", "minLength": 1}
    },
    "required": ["bookingid"],
    "additionalProperties": false
};

const schema_bookingDetail = {
    "type": "object",
    "properties": {
        "firstname": {"type": "string", "minLength": 1},
        "lastname": {"type": "string", "minLength": 1},
        "totalprice": {"type": "number"},
        "depositpaid": {"type": "boolean"},
        "additionalneeds": {"type": "string"},
        "bookingdates": {
            "type": "object",
            "properties":{
                "checkin": {"type": "string", "minLength": 1},
                "checkout": {"type": "string", "minLength": 1}
            },
            "required": ["checkin", "checkout"],
            "additionalProperties": false
        },
    },
    "required": ["firstname", "lastname", "totalprice", "depositpaid", "additionalneeds", "bookingdates"],
    "additionalProperties": false
}

const schema_createBooking = {
    "type": "object",
    "properties": {
        "bookingid": {"type": "number"},
        "booking": {
            "type": "object",
            "properties": {
                "firstname": {"type": "string", "minLength": 1},
                "lastname": {"type": "string", "minLength": 1},
                "totalprice": {"type": "number"},
                "depositpaid": {"type": "boolean"},
                "additionalneeds": {"type": "string"},
                "bookingdates": {
                    "type": "object",
                    "properties":{
                        "checkin": {"type": "string", "minLength": 1},
                        "checkout": {"type": "string", "minLength": 1}
                    },
                    "required": ["checkin", "checkout"],
                    "additionalProperties": false
                },
            },
        },
        "required": ["firstname", "lastname", "totalprice", "depositpaid", "additionalneeds", "bookingdates"],
        "additionalProperties": false
    },
    "required": ["bookingid", "booking"],
    "additionalProperties": false
}

module.exports = { schema_listBookingID, schema_bookingDetail, schema_createBooking };