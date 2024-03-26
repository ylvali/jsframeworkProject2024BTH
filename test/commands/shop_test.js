// TESTING THE API ROUTES
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

// POST addProduct
describe('POST /shop/addProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/addProduct")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// POST seeProduct
describe('POST /shop/seeProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/seeProduct")
            .send({productName: 'prodX'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// Missing body argument
describe('POST /shop/seeProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/seeProduct")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// POST checkDepot
describe('POST /shop/checkDepot', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/checkDepot")
            .send({email: 'testX'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// Missing argument
describe('POST /shop/checkDepot', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/checkDepot")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});


// POST addMoney
describe('POST /shop/addMoney', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/addMoney")
            .send({email: 'testX'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// Missing argument
describe('POST /shop/addMoney', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/addMoney")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// POST sellProduct
describe('POST /shop/sellProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/sellProduct")
            .send({email: 'testX', productName: 'prodX'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// missing argument
describe('POST /shop/sellProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/sellProduct")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// POST buyProduct
describe('POST /shop/buyProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/buyProduct")
            .send({email: 'testX', productName: 'prodX'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("object");
                done();
            });
    });
});

// Missing argument
describe('POST /shop/sellProduct', () => {
    it('200 DONE', (done) => {
        chai.request(server)
            .post("/shop/sellProduct")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});