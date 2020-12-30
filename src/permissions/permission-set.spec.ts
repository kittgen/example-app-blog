import { Permission } from './entities/permission.entity';
import { PermissionSet } from './permission-set';

describe('PermissionSet', () => {
  it('should check for permission', () => {
    const permissions = new PermissionSet([
      new Permission('foo'),
      new Permission('bar'),
    ]);

    expect(permissions.hasAll([new Permission('foo')])).toBeTruthy();
    expect(permissions.hasAll([new Permission('bar')])).toBeTruthy();
    expect(permissions.hasAll([new Permission('baz')])).toBeFalsy();
    expect(
      permissions.hasAll([new Permission('foo'), new Permission('bar')]),
    ).toBeTruthy();
    expect(
      permissions.hasAll([
        new Permission('foo'),
        new Permission('bar'),
        new Permission('baz'),
      ]),
    ).toBeFalsy();
  });

  it('should add a permission', () => {
    const permissions = new PermissionSet();

    permissions.add(new Permission('foo'));

    expect(permissions.hasAll([new Permission('foo')])).toBeTruthy();
  });
});
