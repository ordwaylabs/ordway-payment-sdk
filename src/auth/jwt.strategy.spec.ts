import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    process.env.JWT_SECRET_KEY = 'as';
    jwtStrategy = new JwtStrategy();
  });

  it('should return payload with user_id and tenant_id', async () => {
    const expected = {
      user_id: 1,
      tenant_id: 2,
    };
    const actual = await jwtStrategy.validate(expected);
    expect(actual).toEqual(expected);
  });

  it('should return error when no user_id', () => {
    const expected = {
      user_id: 1,
    };
    expect(jwtStrategy.validate(expected)).rejects.toThrowError(
      'Payment method details not found',
    );
  });

  it('should return error when no tenant_id', () => {
    const expected = {
      tenant_id: 1,
    };
    expect(jwtStrategy.validate(expected)).rejects.toThrowError(
      'Payment method details not found',
    );
  });
});
