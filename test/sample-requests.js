/* global it, describe, done */

var chai = require('chai');
//var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server/server');

chai.use(chaiHttp);

describe('checking login endpoint', function() {
	it('should get status 200 response', function() {
		chai.request(server)
			.get('/login')
			.end(function(err,res) {
				res.should.have.status(200);
				done();
			});
	});
});