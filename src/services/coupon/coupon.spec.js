/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./coupon.service');

describe('Service - coupon', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should throw error if coupon is invalid', () => {
    return service.getCouponValue('TEST').catch((err) => {
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
      expect(err.errors[0].errorCode).toBe('INVALID_COUPON');
    });
  });

  it('should return proper coupon type and value', () => {
    return service.getCouponValue('FREETRIAL').then((coupon) => {
      expect(coupon).toBeObject();
      expect(coupon).toContainKeys(['type', 'value']);
    });
  });
});
