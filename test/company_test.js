var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require("../app");
var should = chai.should();
var like = require('chai-like');
chai.use(chaiHttp);
chai.use(like);


describe('Company CRUD Tests:', function() {
    var Company;
    this.timeout(10000);

    function clearCompany(done) {
        Company = require("../models/models").Company;

        new Promise(function (resolve, reject) {
            Company.find({})
                .then((companies) => new Promise(
                    (resolve, reject) => {
                        resolve("Companies : " + companies);
                    }
                ))
                // .then(console.log)
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
    }

    function postCompanyPromise(name) {
        return function () {
            return new Promise(function (resolve, reject) {
                chai.request(app)
                    .post('/api/companies')
                    .send({
                        'name': name,
                    })
                    .then(resolve);
            });
        }
    }


    before(clearCompany);

    describe('POST api/companies/:', function () {

        afterEach("reset Posted", clearCompany);


        it('should return 201', function (done) {
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


        it('should not return empty body', function (done) {
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

    describe('GET api/companies/:', function () {
        afterEach("reset Posted", clearCompany);

        it('should return 200', function (done) {
            chai.request(app)
                .get('/api/companies')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should return posted companies', function (done) {
            postCompanyPromise("testCompany")()
                .then(
                    postCompanyPromise("testCompany2")
                ).then(
                function () {
                    return new Promise(function (resolve, reject) {
                        chai.request(app)
                            .get('/api/companies')
                            .end(function (err, res) {
                                // console.log("res.body: ", res.body[0]);
                                expect(res.body[0]).to.be.like(
                                    {
                                        name: 'testCompany2',
                                    }
                                );

                                expect(res.body[1]).to.be.like(
                                    {
                                        name: 'testCompany',
                                    }
                                );

                                expect(res.body).has.lengthOf(2);
                                resolve();
                            })
                    })
                }
            ).then(function () {
                done();
            });
        });
    });


    describe('GET api/companies/:cid', function () {
        var companies;

        before("reset Posted", clearCompany);
        before("add Post", function (done) {
            postCompanyPromise("getCompany")()
                .then(
                    postCompanyPromise("getCompany2")
                )
                .then(function () {
                    done();
                });
        });

        before("get existing ids", function (done) {
            chai.request(app)
                .get('/api/companies')
                .end(function (err, res) {
                    companies = res.body;
                    console.log(companies);
                    done();
                });
        });

        it('should return 200 on existing id', function (done) {
            new Promise(function (resolve, reject) {
                chai.request(app)
                    .get('/api/companies/' + companies[0]._id)
                    .end(function (err, res) {
                        // console.log("res.body: ", res.body[0]);
                        expect(res).to.have.status(200);
                        resolve();
                    })
            })
                .then(function () {
                    return new Promise(function (resolve, reject) {
                        chai.request(app)
                            .get('/api/companies/' + companies[1]._id)
                            .end(function (err, res) {
                                // console.log("res.body: ", res.body[0]);
                                expect(res).to.have.status(200);
                                resolve();
                            });
                    });
                })
                .then(function() {
                    done();
                });
        });

        it('should return samebody', function (done) {

            new Promise(function (resolve, reject) {
                chai.request(app)
                    .get('/api/companies/' + companies[0]._id)
                    .end(function (err, res) {
                        // console.log("res.body: ", res.body[0]);
                        expect(res.body).to.deep.equal(companies[0]);
                        resolve();
                    })
            })
                .then(function () {
                    return new Promise(function (resolve, reject) {
                        chai.request(app)
                            .get('/api/companies/' + companies[1]._id)
                            .end(function (err, res) {
                                // console.log("res.body: ", res.body[0]);
                                expect(res.body).to.deep.equal(companies[1]);
                                resolve();
                            });
                    });
                })
                .then(function() {
                    done();
                });
        });
    });
});
