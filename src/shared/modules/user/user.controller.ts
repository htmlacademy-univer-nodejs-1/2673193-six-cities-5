import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Response } from 'express';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDto } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController..');

    this.addRoute({ path: '/login', method: HttpMethod.POST, handler: this.login });
    this.addRoute({ path: '/login', method: HttpMethod.GET, handler: this.check });
    this.addRoute({ path: '/register', method: HttpMethod.POST, handler: this.create });
  }

  public async create(
    { body }: CreateUserRequest, res: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (existUser) {
      const existUserError = new Error(`User with email ${body.email} already exists`);
      this.error(res, StatusCodes.CONFLICT, { error: existUserError });
      return this.logger.error(existUserError.message, existUserError);
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDto(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest, _res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      const existUserError = new Error(`User with email ${body.email} not found`);
      this.error(_res, StatusCodes.UNAUTHORIZED, { error: existUserError });
      return this.logger.error(existUserError.message, existUserError);
    }

    return this.logger.error('Not implemented', new Error('Not implemented'));
  }

  public async check(
    { body }: LoginUserRequest, res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      const existUserError = new Error(`User with email ${body.email} not found`);
      this.error(res, StatusCodes.UNAUTHORIZED, { error: existUserError });
      return this.logger.error(existUserError.message, existUserError);
    }

    this.ok(res, fillDto(UserRdo, existUser));
    return this.logger.error('Not implemented', new Error('Not implemented'));
  }
}
