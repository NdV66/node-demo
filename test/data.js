const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DB = new Map();
const dataRouter = require('../src/routing/data')(DB);
const chaiHttp = require('chai-http');
const chai = require('chai');

const API = '/data';
const EXISTING_ID = 'existing-id';
const DATA = 'Narin';
const NON_EXISTING_ID = 'non-existing-id';

const ERROR_RESPONSE = { error: true };
const SUCCESS_RESPONSE = { ok: true };

chai.use(chaiHttp);
chai.should();

app.use(bodyParser.json());
app.use('/data', dataRouter);

describe('/data/{id}', () => {
    beforeEach(() => {
        DB.clear();
        DB.set(EXISTING_ID, DATA);
    });

    describe('GET', () => {
        it('Should return 404 when id not exist', done => {
            chai.request(app)
                .get(`${API}/${NON_EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.to.deep.include(ERROR_RESPONSE);
                    done();
                });
        });

        it('Should return correct data', done => {
            chai.request(app)
                .get(`${API}/${EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    res.body.should.equal(DATA);
                    done();
                });
        });
    });

    describe('PUT', () => {
        it('Should return 500 when id is in database', done => {
            chai.request(app)
                .put(`${API}/${EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.to.deep.include(ERROR_RESPONSE);
                    Array.from(DB.keys()).should.include(EXISTING_ID);
                    done();
                });
        });

        it('Should save data in database', done => {
            chai.request(app)
                .put(`${API}/${NON_EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include(SUCCESS_RESPONSE);
                    Array.from(DB.keys()).should.include(EXISTING_ID);
                    done();
                });
        });
    });

    describe('DELETE', () => {
        it('Should return 500 when id is not in database', done => {
            chai.request(app)
                .delete(`${API}/${NON_EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.to.deep.include(ERROR_RESPONSE);
                    Array.from(DB.keys()).should.not.include(NON_EXISTING_ID);
                    done();
                });
        });

        it('Should remove object from database', done => {
            chai.request(app)
                .delete(`${API}/${EXISTING_ID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include(SUCCESS_RESPONSE);
                    Array.from(DB.keys()).should.not.include(EXISTING_ID);
                    done();
                });
        });
    });
});
