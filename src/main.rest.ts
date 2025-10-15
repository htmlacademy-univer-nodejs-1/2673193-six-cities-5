#!/usr/bin/env nodeimport { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import 'reflect-metadata';
import { RestApplication, createRestApplicaionContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';

async function bootstrap() {
  const restContainer = createRestApplicaionContainer();
  const userContainer = createUserContainer(restContainer);
  const offerContainer = createOfferContainer(userContainer);

  const app = offerContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
