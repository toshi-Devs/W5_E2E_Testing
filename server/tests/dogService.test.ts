import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getRandomDogImage } from '../services/dogService';






describe('dogService test', () => {

    const mockdogData = {
        message: 'https://images.dog.ceo/breeds/dachshund/puppy.jpg',
        status: 'success'
    };

    beforeEach(() => {
        vi.restoreAllMocks();

        global.fetch = vi.fn();
    });

    vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => mockdogData,
    } as unknown as Response);

// test 1 assigment 4
    test('GET /api/dogs/random with valid dog data', async () => {

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => mockdogData,
        } as unknown as Response);

        const response = await getRandomDogImage();

        
        expect(response.imageUrl).toBe(mockdogData.message);
        expect(response.status).toBe('success');
        expect(fetch).toHaveBeenCalledOnce();

    });
  // test 2  assigment 4
    test("GET /api/dogs/random  with negative response/non ok return", async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500
        } as unknown as Response);
        await expect(getRandomDogImage()).rejects.toThrow();
        expect(fetch).toHaveBeenCalledOnce();

    });
});