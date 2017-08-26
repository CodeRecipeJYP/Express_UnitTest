var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require("../app");
chai.use(chaiHttp);


describe('Company GET', function () {

    it('api/companies/ return 200', function (done) {

        chai.request(app)
            .get('/api/companies')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Company POST', function () {

    it('POST api/companies/ return 201', function (done) {

        chai.request(app)
            .post('/api/companies')
            .send({
                'company_name': 'testCompany2',
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('POST api/companies/ return same body as I sended', function (done) {

        chai.request(app)
            .post('/api/companies')
            .send({
                'company_name': 'testCompany3',
            })
            .end(function (err, res) {
                expect(res.body).to.equal(
                    {
                        'company_name': 'testCompany'
                    }
                );
                done();
            });
    });
});