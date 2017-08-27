var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require("../app");
var should = chai.should();
chai.use(chaiHttp);

describe('Company CRUD Tests:', function() {
    this.timeout(10000);

    var clearCompany = (done) => {
        Company = require("../models/models").Company;

        new Promise(function (resolve, reject) {
            Company.find({})
                .then((companies) => new Promise(
                    (resolve, reject) => {
                        resolve("Companies : " + companies);
                    }
                ))
                .then(console.log)
                .then(resolve);
        })
            .then(() => {
                return new Promise(function (resolve, reject) {
                    Company.remove({}, function () {
                        resolve();
                    });
                });
            })
            .then(done);
    };

    describe('GET', function () {
        var Company;

        before(clearCompany);

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
        afterEach("reset Posted", clearCompany);


        it('api/companies/ return 201', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({
                    'name': 'testCompany',
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });


        it('api/companies/ return not empty body', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({
                    'name': 'testCompany',
                })
                .end(function (err, res) {
                    expect(res.body).to.be.not.null;
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

        it('should an empty name on company return errorcode 400', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({})
                .end(function (err, res) {
                    expect(err).to.have.status(400);
                    done();
                });
        });

        it('should an empty name on company return errormessage "You must contain the name."', function (done) {
            chai.request(app)
                .post('/api/companies')
                .send({})
                .end(function (err, res) {
                    expect(res.body.error.message).to.equal("You must contain the name.");
                    done();
                });
        });
    });
});
