require('./common.js');
let token = "";

beforeAll(async (done) =>   {
    const response = await request(base_url)
        .post('/v1/identity/hmac')
        .set('Authorization', await generateHmac())
        .send();
    done();
    token = response.body.accessToken;
});

describe("Testing the Order Creation API", () => {
    it("tests order gets created", async () => {
        let order = {
            "orderRef": "order_" + random
        }
        const response = await  request(base_url)
            .post('/v1/order-management')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(order);
        expect(response.statusCode).toBe(201);
    });
});

describe("Testing the Order Creation negative cases", () => {
    it("tests order ref with invalid characters", async () => {
        let order = {
            "orderRef": "abc!!"+ random
        }
        const response = await  request(base_url)
            .post('/v1/order-management')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(order);
        let error_message = response.body.errors[0].errorCode;
        expect(error_message).toBe('ORDER_REF_CONTAINS_INVALID_CHARACTERS');
        expect(response.statusCode).toBe(400);
    });
});

describe("Testing the Order Creation negative cases", () => {
    it("tests order ref order ref 50 characters error", async () => {
        let order = {
            "orderRef": "abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz"
        }
        const response = await  request(base_url)
            .post('/v1/order-management')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(order);
        let error_message = response.body.errors[0].errorCode;
        expect(error_message).toBe('ORDER_REF_LENGTH_OUT_OF_RANGE');
        expect(response.statusCode).toBe(400);
    });
});
