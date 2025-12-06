import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  UploadFileMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { NextFunction, Request, Response } from 'express';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDto } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController..');

    this.addRoute({
      path: '/register',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.POST,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({ path: '/login', method: HttpMethod.GET, handler: this.check });
    this.addRoute({ path: '/logout', method: HttpMethod.POST, handler: this.logout });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.POST,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest, res: Response, _next: NextFunction
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT, `User with email "${body.email}" already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDto(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest, _res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED, `User with email ${body.email} not found`,
        'UserController'
      );
      throw new HttpError(
        StatusCodes.NOT_IMPLEMENTED, 'Not implemented',
        'UserController',
      );
    }
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

  public async logout(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    this.ok(res, { message: 'Logged out succesfully' });
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
