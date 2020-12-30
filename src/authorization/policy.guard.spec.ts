import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Request } from 'express';
import { RolesService } from '../roles/roles.service';
import { Permission } from '../permissions/entities/permission.entity';
import { PolicyGuard } from './policy.guard';
import { HttpArgumentsHost, Type } from '@nestjs/common/interfaces';
import { User } from '../users/entities/user.entity';
import { PermissionSet } from '../permissions/permission-set';
import { Condition } from './condition';

describe('PolicyGuard', () => {
  function createTestModule(
    permissions: Permission[],
    condition?: Type<Condition>,
  ) {
    return Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: RolesService,
          useValue: {
            createForUser(user: User): Promise<PermissionSet> {
              if (user.id === 'uid-1') {
                return Promise.resolve(
                  new PermissionSet([new Permission('read')]),
                );
              }
              return Promise.resolve(
                new PermissionSet([new Permission('write')]),
              );
            },
          },
        },
        {
          provide: 'GUARD',
          useClass: PolicyGuard(permissions, condition),
        },
      ],
    }).compile();
  }

  it('canActivate should return false if user has NOT permission', async () => {
    const expectedPermissions = [new Permission('write')];
    const app = (
      await createTestModule(expectedPermissions)
    ).createNestApplication();
    await app.init();
    const policyGuard = app.get('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-1',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeFalsy();
  });

  it('canActivate should return true if user has permission', async () => {
    const expectedPermissions = [new Permission('write')];
    const app = (
      await createTestModule(expectedPermissions)
    ).createNestApplication();
    await app.init();
    const policyGuard = app.get('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-2',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeTruthy();
  });

  it('canActivate should return false if user has permission, but condition fails', async () => {
    const AlwaysFalseCondition = class implements Condition {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      evaluate(req: Request): Promise<boolean> {
        return Promise.resolve(false);
      }
    };
    const expectedPermissions = [new Permission('read')];
    const app = (
      await createTestModule(expectedPermissions, AlwaysFalseCondition)
    ).createNestApplication();
    await app.init();
    const policyGuard = app.get('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-1',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeFalsy();
  });

  it('canActivate should return true if user has permission and condition is fulfillled', async () => {
    const AlwaysTrueCondition = class implements Condition {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      evaluate(req: Request): Promise<boolean> {
        return Promise.resolve(true);
      }
    };
    const expectedPermissions = [new Permission('write')];
    const app = (
      await createTestModule(expectedPermissions, AlwaysTrueCondition)
    ).createNestApplication();
    await app.init();
    const policyGuard = app.get('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-2',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeTruthy();
  });
});
