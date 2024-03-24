import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/utils/commonRespose';
import { app } from '@/server';

describe('Health Check API endpoints', () => {
  it('GET / - success', async () => {
    const response = await request(app).get('/health');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.data).toBeNull();
    expect(result.message).toEqual('Service is healthy');
  });
});