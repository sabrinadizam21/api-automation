const chai = require('chai');
const expect = chai.expect;
const method = require('../method/method.js');
const { 
    createData, 
    loginData,
    updateData,
    getListData,
    getDetailData,
    updatePartialData,
    deletebyIdData
} = require('../data/auth.data.js');
chai.use(require('chai-json-schema'));
const { 
    schema_listBookingID, 
    schema_bookingDetail, 
    schema_createBooking 
} = require('../schema/schema.js');

describe('CRUD booking', () => {
    const bookingNew = new method();
    let bookingid;

    before(async () => {
        await bookingNew.login(loginData[0].payload);
    })

    // TC004 - POST: Verify success create booking
    it(createData[0].case.title, async () => {
        const resp = await bookingNew.create(createData[0].payload);
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_createBooking);
        expect(resp.body.booking.firstname).to.be.eql("Indah");
        expect(resp.body.booking.lastname).to.be.eql("Kasih");
        expect(resp.body.booking.totalprice).to.be.eql(120);
        expect(resp.body.booking.depositpaid).to.be.eql(true);
        expect(resp.body.booking.bookingdates.checkin).to.be.eql("2024-04-04");
        expect(resp.body.booking.bookingdates.checkout).to.be.eql("2024-05-04");
        expect(resp.body.booking.additionalneeds).to.be.eql("Breakfast");

        bookingid = resp.body.bookingid;
    });

    // TC005 - POST: Verify failed create booking with uncomplete body request
    it(createData[1].case.title, async () => {
        const resp = await bookingNew.create(createData[1].payload);
        expect(resp.status).to.eql(500);
    });

    // TC006 - PUT: Verify success update booking
    it(updateData[0].case.title, async () => {
        const resp = await bookingNew.update(updateData[0].payload, bookingid);
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_bookingDetail);
        expect(resp.body.firstname).to.be.eql("Indah");
        expect(resp.body.lastname).to.be.eql("Kasih");
        expect(resp.body.totalprice).to.be.eql(150);
        expect(resp.body.depositpaid).to.be.eql(false);
        expect(resp.body.bookingdates.checkin).to.be.eql("2024-04-04");
        expect(resp.body.bookingdates.checkout).to.be.eql("2024-05-04");
        expect(resp.body.additionalneeds).to.be.eql("");
    });

    // TC007 - PUT: Verify failed update booking with typo input field
    it(updateData[1].case.title, async () => {
        const resp = await bookingNew.update(updateData[1].payload, 'odxhuePhs!');
        expect(resp.status).to.eql(400);
    });

    // TC008 - GET: Verify success get list of booking IDs
    it(getListData[0].case.title, async () => {
        const resp = await bookingNew.getList('');
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_listBookingID);
    });

    // TC009 - GET: Verify success get list of booking ID with params
    it(getListData[1].case.title, async () => {
        const resp = await bookingNew.getList('?firstname=Indah&lastname=Kasih');
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_listBookingID);        
    });

    // TC010 - GET: Verify success get booking by id
    it(getDetailData[0].case.title, async () =>{
        const resp = await bookingNew.getDetail(bookingid);
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_bookingDetail);
    });

    // TC011 - GET: Verify failed get booking with invalid id
    it(getDetailData[1].case.title, async () => {
        const resp = await bookingNew.getDetail('odxhuePhs!');
        expect(resp.status).to.eql(404);
    });

    // TC012: PATCH: Verify success partial update booking
    it(updatePartialData[0].case.title, async () => {
        const resp = await bookingNew.updatePartial(updatePartialData[0].payload, bookingid);
        expect(resp.status).to.eql(200);
        expect(resp.body).to.be.jsonSchema(schema_bookingDetail);
        expect(resp.body.firstname).to.be.eql("James");
        expect(resp.body.lastname).to.be.eql("Sugandar");
    });

    // TC013 - PATCH: Verify failed partial update booking with invalid id
    it(updatePartialData[1].case.title, async () => {
        const resp = await bookingNew.updatePartial(updatePartialData[1].payload, 'abc')
        expect(resp.status).to.eql(405);
    });

    // TC014: DELETE: Verify failed delete booking
    it(deletebyIdData[0].case.title, async () => {
        const resp = await bookingNew.delete(bookingid);
        expect(resp.status).to.eql(201);
    });

    // TC015: DELETE: Verify failed delete booking using deleted id
    it(deletebyIdData[1].case.title, async () => {
        const resp = await bookingNew.delete(bookingid);
        expect(resp.status).to.eql(405);
    });
});