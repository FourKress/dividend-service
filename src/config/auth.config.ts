import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretOrKey: process.env.JWR_SECRET,
  expiresIn: process.env.JWR_EXPIRES_IN,
}));
