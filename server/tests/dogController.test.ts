import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';



vi.mock('../services/dogService');

describe('dogController', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

// test 3 assigment 4
 test('should repsonde with true status and image url of dog', async () => {
    const mockdogserviceData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };
  const serviceSpy = vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockdogserviceData);
  
  const apirequest = {} as any;
  const apiresponse = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis() ,
  } as any

  await getDogImage(apirequest , apiresponse );

   expect(apiresponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockdogserviceData,
    });

    expect(serviceSpy).toHaveBeenCalledOnce();
  });
});