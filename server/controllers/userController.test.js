import { jest, describe, it, expect, afterEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import userController from './userController.js';
import userModel from '../models/Users.js';

const app = express();
app.use(express.json());
app.use('/users', userController);

describe('User Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should get all users', async () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    jest.spyOn(userModel, 'find').mockResolvedValue(mockUsers);

    const response = await request(app).get('/users/getall');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});
