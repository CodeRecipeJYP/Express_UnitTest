var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Company CRUD', function () {
    var url = 'http://13.124.172.12:3000/';

    it('GET api/companies/ return 200', function (done) {

        chai.request(url)
            .get('api/companies')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('POST api/companies/ return 201', function (done) {

        chai.request(url)
            .post('api/companies')
            .send({
                'company_name': 'testCompany',
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });
});