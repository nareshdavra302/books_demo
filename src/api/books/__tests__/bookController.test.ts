import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/utils/commonRespose';
import { app } from '@/server';

describe('books API endpoints', () => {
  it('GET / - success', async () => {
    const response = await request(app).get('/books');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.message).toEqual('Books found');
  });

  it('GET / - success', async () => {
    const response = await request(app).get('/books?title=mur');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect
    expect(result.message).toEqual('Books found');
  });


  it('GET / - success', async () => {
    const response = await request(app).get('/books/1');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.message).toEqual('Book found');
  });
});