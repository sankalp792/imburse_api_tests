require('./common.js');
let instruction = "";
let orderRef = "order_" + random;
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

describe("Testing the Instruction Creation", () => {
    it("tests instruction gets created", async () => {
        instruction = {
            "instructionRef": "instruction_"+random,
            "customerRef": "customer_"+random,
            "direction": "CREDIT",
            "amount": "200.00",
            "currency": "GBP",
            "country": "GB",
            "settledByDate": "2020-06-24",
            "schemeId": constants.SCHEME_ID,
            "metadata": {
                "key1": "value1",
                "key2": "value2",
                "key3": "value3"
            }
        }
        const response = await  request(base_url)
            .post('/v1/order-management/'+orderRef+'/instruction')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(instruction);
        expect(response.statusCode).toBe(201);
    });
});

describe("Testing the Create Instruction negative test cases", () => {
    it("tests instruction customer reference is required", async () => {
        instruction = {
            "instructionRef": "instruction_"+random,
            "direction": "CREDIT",
            "amount": "200.00",
            "currency": "GBP",
            "country": "GB",
            "settledByDate": "2020-06-24",
            "schemeId": constants.SCHEME_ID,
            "metadata": {
                "key1": "value1",
                "key2": "value2",
                "key3": "value3"
            }
        }
        const response = await  request(base_url)
            .post('/v1/order-management/'+orderRef+'/instruction')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(instruction);

        let error_message = response.body.errors[0].errorCode;
        expect(error_message).toBe('CUSTOMER_REF_IS_REQUIRED');
        expect(response.statusCode).toBe(400);
    });
});

describe("Testing the Create Instruction negative test cases", () => {
    it("tests instruction currency is required", async () => {
        instruction = {
            "instructionRef": "instruction_"+random,
            "customerRef": "customer_"+random,
            "direction": "CREDIT",
            "amount": "200.00",
            "country": "GB",
            "settledByDate": "2020-06-24",
            "schemeId": constants.SCHEME_ID,
            "metadata": {
                "key1": "value1",
                "key2": "value2",
                "key3": "value3"
            }
        }
        const response = await  request(base_url)
            .post('/v1/order-management/'+orderRef+'/instruction')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(instruction);

        let error_message = response.body.errors[0].errorCode;
        expect(error_message).toBe('CURRENCY_IS_REQUIRED');
        expect(response.statusCode).toBe(400);
    });
});

describe("Testing the Create Instruction negative test cases", () => {
    it("tests instruction scheme id not recognised", async () => {
        instruction = {
            "instructionRef": "instruction_"+random,
            "customerRef": "customer_"+random,
            "direction": "CREDIT",
            "currency": "GBP",
            "amount": "200.00",
            "country": "GB",
            "settledByDate": "2020-06-24",
            "schemeId": "ABCD",
            "metadata": {
                "key1": "value1",
                "key2": "value2",
                "key3": "value3"
            }
        }
        const response = await  request(base_url)
            .post('/v1/order-management/'+orderRef+'/instruction')
            .set('Authorization', 'bearer ' + token)
            .set('x-account-id', constants.ACCOUNT_ID)
            .set('x-tenant-id', constants.TENANT_ID)
            .set('Accept','application/json')
            .send(instruction);

        let error_message = response.body.errors[0].errorCode;
        expect(error_message).toBe('SCHEME_ID_NOT_RECOGNISED');
        expect(response.statusCode).toBe(400);
    });
});