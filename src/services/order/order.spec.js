/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./order.service');

jest.mock('../../models');
const { Order } = require('../../models');

// ProfileLink.findOne = jest.fn(() => Promise.resolve(undefined));

describe('Service - create order', () => {
  const body = {};

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to create new order', () => {
    Order.create = jest.fn(() => Promise.resolve({ id: 1 }));
    service.create(body).then((order) => {
      expect(order).toBeObject();
    });
  });

  it('should throw error while creating order', () => {
    Order.create = jest.fn(() => Promise.reject(new Error('DBFAIL')));
    service.create(body).catch((err) => {
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
      expect(err.errors[0].errorCode).toBe('ORDER_NOT_CREATED');
    });
  });
});

describe('Service - get order', () => {
  const orderId = '04976e84-06dc-4652-a066-efea38a992e0';

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to retrive order', () => {
    Order.findById = jest.fn(() => Promise.resolve({ id: 1 }));
    service.get(orderId).then((order) => {
      expect(order).toBeObject();
    });
  });

  it('should throw error while retriving order', () => {
    Order.findById = jest.fn(() => Promise.resolve(null));
    service.get(orderId).catch((err) => {
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
});

describe('Service - update order status', () => {
  const orderId = '04976e84-06dc-4652-a066-efea38a992e0';
  const status = 'CONFIRMED';

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to update order status', () => {
    Order.findById = jest.fn(() => Promise.resolve({ id: 1, save: () => Promise.resolve({ id: 1 }) }));
    service.updateOrderStatus(orderId, status).then((order) => {
      expect(order).toBeObject();
    });
  });

  it('should throw error while retriving order', () => {
    Order.findById = jest.fn(() => Promise.resolve(null));
    service.updateOrderStatus(orderId, status).catch((err) => {
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

  it('should throw error while updating the order', () => {
    Order.findById = jest.fn(() => Promise.resolve({ id: 1, save: () => Promise.reject(new Error('DBFAIL')) }));
    service.updateOrderStatus(orderId, status).catch((err) => {
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
      expect(err.errors[0].errorCode).toBe('ORDER_NOT_UPDATED');
    });
  });
});
