import { DoesUserExistsGuard } from './does-user-exists.guard';

describe('DoesUserExistsGuard', () => {
  it('should be defined', () => {
    expect(new DoesUserExistsGuard()).toBeDefined();
  });
});
