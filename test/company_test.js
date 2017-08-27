var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require("../app");
chai.use(chaiHttp);

describe('Company CRUD Tests:', function() {
    describe('GET', function () {
        var Company;

        before(function (done) {
            Company = require("../models/models").Company;
            Company.remove({}, function () {
                done();
            });

            // Company.
        });

        it('api/companies/ return 200', function (done) {
            chai.request(app)
                .get('/api/companies')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        Company
    });

    describe('Company POST', function () {

        it('api/companies/ return 201', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({
                    'name': 'testCompany2',
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });

        it('api/companies/ return same body as I sended', function (done) {

            chai.request(app)
                .post('/api/companies')
                .send({
                    'name': 'testCompany3',
                })
                .end(function (err, res) {
                    expect(res.body).to.equal(
                        {
                            'name': 'testCompany'
                        }
                    );
                    done();
                });
        });

        it('should not allow an empty name on company', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({})
                .end(function (err, res) {
                    expect(err).to.be.not.null;
                    done();
                });
        });
    });
});
