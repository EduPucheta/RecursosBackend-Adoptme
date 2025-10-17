import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Adoptions Router', () => {
    describe('GET /api/adoptions', () => {
        it('should return all adoptions', async () => {
            const response = await requester.get('/api/adoptions');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.be.an('array');
        });
    });

    let userId;
    let petId;
    let adoptionId;
    let initialAdoptionsCount = 0;

    before(async () => {
        // Get initial adoptions count
        const initialAdoptions = await requester.get('/api/adoptions');
        initialAdoptionsCount = initialAdoptions.body.payload.length;

        const user = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test.user' + Date.now() + '@example.com',
            password: 'password123'
        };
        let response = await requester.post('/api/sessions/register').send(user);
        userId = response.body.payload;

        const pet = {
            name: 'Test Pet',
            specie: 'Dog',
            birthDate: '2022-01-01'
        };
        response = await requester.post('/api/pets').send(pet);
        petId = response.body.payload._id;
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('should create an adoption', async () => {
            const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Pet adopted');

            // Verify adoption was created
            const adoptions = await requester.get('/api/adoptions');
            expect(adoptions.body.payload.length).to.equal(initialAdoptionsCount + 1);
            adoptionId = adoptions.body.payload.find(ad => ad.pet === petId)._id;
        });

        it('should return 404 if user not found', async () => {
            const invalidUserId = new mongoose.Types.ObjectId().toHexString();
            const response = await requester.post(`/api/adoptions/${invalidUserId}/${petId}`);
            expect(response.status).to.equal(404);
        });

        it('should return 404 if pet not found', async () => {
            const invalidPetId = new mongoose.Types.ObjectId().toHexString();
            const response = await requester.post(`/api/adoptions/${userId}/${invalidPetId}`);
            expect(response.status).to.equal(404);
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('should return an adoption by id', async () => {
            const response = await requester.get(`/api/adoptions/${adoptionId}`);
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property('_id', adoptionId);
        });

        it('should return 404 if adoption not found', async () => {
            const invalidAdoptionId = new mongoose.Types.ObjectId().toHexString();
            const response = await requester.get(`/api/adoptions/${invalidAdoptionId}`);
            expect(response.status).to.equal(404);
        });
    });
});
