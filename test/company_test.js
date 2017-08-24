var chai = require('chai');
var expect = chai.expect;
var should = require('should');
var request = require('supertest');

describe('Company CRUD', function () {
    // Test spec (unit test)
    it('GET api/companies/ return all of companies', function (done) {
        var url = 'http://13.124.172.12:3000/';

        request(url)
            .get('api/companies')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    })
});