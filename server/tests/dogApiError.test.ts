import { beforeEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest';
import express from 'express';
import * as dogController from '../controllers/dogController';
import dogRoutes from "../routes/dogRoutes"

vi.mock('../controllers/dogController');
const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);


describe('Dog Routes  Get /api/dogs/random', () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    // test 5 assigment 4
    test("it should return 500 with false and error message", async () => {

        vi.spyOn(dogController, 'getDogImage').mockImplementation(async (_req, res) => {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch dog image: Network error',
            });
        });
        const res = await request(app).get('/api/dogs/random');

        expect(res.status).toBe(500);
        expect(res.body).toEqual({
            success: false,
            error: 'Failed to fetch dog image: Network error',
        });
    });
});