const data = require('../data/data.json');
const request = require('supertest');

class Method {
    constructor(){
        this.baseURL = data.baseURL;
        this.header = data.header;
        this.token = this.token;
    }    

    async login(payload) {
        const resp = await request(this.baseURL)
            .post('/auth')
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .send(payload);
        this.token = resp.body.token;
        return resp;
    }

    get generateToken () {
        return this.token;
    }

    async create(payload){
        const resp = await request(this.baseURL)
            .post(`/booking`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`)
            .send(payload);
        return resp;
    }

    async getList(params){
        const resp = await request(this.baseURL)
            .get(`/booking${params}`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`)
        return resp;
    }

    async getDetail(bookingid){
        const resp = await request(this.baseURL)
            .get(`/booking/${bookingid}`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`)
        return resp;
    }

    async updatePartial(payload, bookingid){
        const resp = await request(this.baseURL)
            .patch(`/booking/${bookingid}`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`)
            .send(payload);
        return resp;
    }

    async update(payload, bookingid){
        const resp = await request(this.baseURL)
            .put(`/booking/${bookingid}`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`)
            .send(payload);
        return resp;
    }

    async delete(bookingid){
        const resp = await request(this.baseURL)
            .delete(`/booking/${bookingid}`)
            .set('Content-Type', this.header)
            .set('Accept', this.header)
            .set('Cookie', `token=${this.token}`);
        return resp;
    }
}

module.exports = Method;