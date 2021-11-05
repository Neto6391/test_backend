import { DoesUserEditOrDeleteProjectGuard } from './does-user-edit-or-delete-project.guard';

describe('DoesUserEditOrDeleteProjectGuard', () => {
  it('should be defined', () => {
    expect(new DoesUserEditOrDeleteProjectGuard()).toBeDefined();
  });
});
