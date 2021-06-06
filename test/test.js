process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../app/models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('User', () => {
    beforeEach((done) => {
        Book.remove({}, (err) => {
           done();
        });
    });
  /*
  * Test the /POST route
  */
  describe('/auth/login user', () => {
      it('it should not log in a user without email field', (done) => {
          let user = {
              password: 'password'
          }
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('email');
              done();
            });
      });

  });

    describe('/auth/register user', () => {
        it('it should not sign up a user without email field', (done) => {
            let user = {
                password: 'password'
            }
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                done();
            });
        });

    });
});
