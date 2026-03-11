import { Throttle } from '@nestjs/throttler';

//STRICT RATE FOR AUTH AND PAYMENT
export const StrictThrottle = () =>
  Throttle({
    default: {
      ttl: 1000,
      limit: 3,
    },
  });

//FOR ORDERS
export const ModerateThrottle = () =>
  Throttle({
    default: {
      ttl: 1000,
      limit: 5,
    },
  });

//RELAX FOR READ OPERATION
export const RelaxedThrottle = () =>
  Throttle({
    default: {
      ttl: 1000,
      limit: 20,
    },
  });
