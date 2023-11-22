import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import awsLambdaFastify = require('aws-lambda-fastify');

import bootstrapServer, { NestApp } from '../main';

let cachedNestApp: NestApp;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrapServer();
  }
  const proxy = awsLambdaFastify.default(cachedNestApp.instance);
  return proxy(event, context);
};
