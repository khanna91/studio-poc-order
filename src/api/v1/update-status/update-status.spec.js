/* eslint-disable arrow-body-style */
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');
const controller = require('./update-status.controller');

jest.mock('@services/order');
const OrderService = require('@services/order'); // eslint-disable-line

describe('Test updateStatus', () => {
  const req = new MockReq({
    params: {
      orderId: '04976e84-06dc-4652-a066-efea38a992e0'
    },
    body: {
      status: 'CONFIRMED'
    }
  });
  const res = new MockRes();

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should failed to update order status', () => {
    OrderService.updateOrderStatus = jest.fn(() => Promise.reject(APIError.withCode('ORDER_NOT_FOUND')));
    return controller.updateStatus(req, res, (err) => {
      expect(err).toHaveProperty('name');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('status');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('isPublic');
      expect(err).toHaveProperty('route');
      expect(err).toHaveProperty('isOperational');
      expect(err.name).toBe('APIError');
      expect(err.status).toBe(httpStatus.BAD_REQUEST);
      expect(err.errors).toBeArray();
      expect(err.errors).not.toHaveLength(0);
      expect(err.errors[0]).toHaveProperty('errorCode');
      expect(err.errors[0].errorCode).toBe('ORDER_NOT_FOUND');
    });
  });

  test('should update the order status', () => {
    OrderService.updateOrderStatus = jest.fn(() => Promise.resolve({ id: 1, status: 'CONFIRMED' }));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');

    return controller.updateStatus(req, res)
      .then(() => {
        expect(status).toBeCalledWith(httpStatus.OK);
        expect(json).toBeCalledWith(expect.objectContaining({
          responseCode: httpStatus.OK,
          responseMessage: expect.any(String),
          response: expect.any(Object)
        }));
      });
  });
});
