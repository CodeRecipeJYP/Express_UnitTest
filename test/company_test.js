var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

var url = 'http://13.124.172.12:3000/';

describe('Company GET', function () {

    it('GET api/companies/ return 200', function (done) {

        chai.request(url)
            .get('api/companies')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Company POST', function () {

    it('POST api/companies/ return 201', function (done) {

        chai.request(url)
            .post('api/companies')
            .send({
                'company_name': 'testCompany2',
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('POST api/companies/ return same body as I sended', function (done) {

        chai.request(url)
            .post('api/companies')
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