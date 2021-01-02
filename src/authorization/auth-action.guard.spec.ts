import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Permission } from './permissions/permission';
import { AuthActionGuard } from './auth-action.guard';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { User } from '../users/entities/user.entity';
import { Condition } from './condition';
import { AuthzService } from './authz.service';
import { ConditionsService } from './conditions.service';

@Injectable()
class AlwaysTrueCondition extends Condition {
  constructor(conditionsService: ConditionsService) {
    super(conditionsService);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(ctx: ExecutionContext): Promise<boolean> {
    return Promise.resolve(true);
  }
}

@Injectable()
class AlwaysFalseCondition extends Condition {
  constructor(conditionsService: ConditionsService) {
    super(conditionsService);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(ctx: ExecutionContext): Promise<boolean> {
    return Promise.resolve(false);
  }
}

describe('PolicyGuard', () => {
  function createTestModule(permissions: string[]) {
    return Test.createTestingModule({
      imports: [],
      providers: [
        ConditionsService,
        AlwaysFalseCondition,
        AlwaysTrueCondition,
        {
          provide: AuthzService,
          inject: [ConditionsService],
          useFactory: (conditionsService: ConditionsService) => {
            return {
              findPermissionsForUser(user: User): Promise<Permission[]> {
                switch (user.id) {
                  case 'uid-1':
                    return Promise.resolve([new Permission('read')]);
                  case 'uid-2':
                    return Promise.resolve([new Permission('write')]);
                  case 'uid-3':
                    return Promise.resolve([
                      new Permission(
                        'write',
                        conditionsService.find(AlwaysFalseCondition.name),
                      ),
                    ]);
                  case 'uid-4':
                    return Promise.resolve([
                      new Permission(
                        'write',
                        conditionsService.find(AlwaysTrueCondition.name),
                      ),
                    ]);
                }
              },
            };
          },
        },
        {
          provide: 'GUARD',
          useClass: AuthActionGuard(permissions),
        },
      ],
    }).compile();
  }

  it('canActivate should return false if user has NOT permission', async () => {
    const app = (await createTestModule(['write'])).createNestApplication();
    await app.init();
    const policyGuard = await app.resolve('GUARD');
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
    const app = (await createTestModule(['write'])).createNestApplication();
    await app.init();
    const policyGuard = await app.resolve('GUARD');
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
    const app = (await createTestModule(['read'])).createNestApplication();
    await app.init();
    const policyGuard = await app.resolve('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-3',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeFalsy();
  });

  it('canActivate should return true if user has permission and condition is fulfillled', async () => {
    const app = (await createTestModule(['write'])).createNestApplication();
    await app.init();
    const policyGuard = app.get('GUARD');
    const context = createMock<ExecutionContext>({
      switchToHttp: () =>
        createMock<HttpArgumentsHost>({
          getRequest: () => ({
            user: {
              id: 'uid-4',
            },
          }),
        }),
    });

    expect(await policyGuard.canActivate(context)).toBeTruthy();
  });
});
