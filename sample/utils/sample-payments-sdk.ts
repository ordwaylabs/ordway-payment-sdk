import { Logger } from '@nestjs/common';
import axios from 'axios';
import { config } from 'dotenv';
import { InvalidRequestParameters } from '../errors/invalid-request-parameters';
import { PaymentFailed } from '../errors/payment-failed';
import { PaymentGatewayNotReachable } from '../errors/payment-gateway-not-reachable';
import { PaymentMethodNotFound } from '../errors/payment-method-not-found';
import { cloneDeep } from 'lodash';
import { inspect } from 'util';
import { RequestForbidden } from '../errors/request-forbidden';

config();

export enum RequestTypes {
  post = 'post',
  get = 'get',
  delete = 'delete',
}

function getSamplePaymentsUrl(testMode: boolean): string {
  if (testMode === false) {
    return process.env.SAMPLE_PAYMENTS_URL;
  }
  return process.env.SAMPLE_PAYMENTS_TEST_URL;
}

export function getSamplePayOrganizationId(testMode: boolean): string {
  if (testMode === false) {
    return process.env.SAMPLE_PAYMENTS_PARTNER_ORG_ID;
  }
  return process.env.SAMPLE_PAYMENTS_PARTNER_ORG_ID_TEST;
}

export function getSamplePayTokenId(testMode: boolean): string {
  if (testMode === false) {
    return process.env.SAMPLE_PAYMENTS_PARTNER_TOKEN;
  }
  return process.env.SAMPLE_PAYMENTS_PARTNER_TOKEN_TEST;
}

export function mapError(err) {
  Logger.error(
    err?.status ?? err?.statusCode,
    err?.statusText ?? '',
    err?.data ?? err?.messages,
  );
  switch (err?.status ?? err?.statusCode) {
    case 401:
      return new PaymentMethodNotFound(err.data ?? err.messages);
    case 400:
      return new InvalidRequestParameters(
        mapErrorObject(err.data ?? err.messages),
      );
    case 406:
      return new InvalidRequestParameters(
        mapErrorObject(err.data ?? err.messages),
      );
    case 500:
      return new PaymentFailed(err.data ?? err.messages);
    case 503:
      return new PaymentGatewayNotReachable(
        err.messages,
        undefined,
        err.statusText,
      );
    case 404:
      return new PaymentGatewayNotReachable(
        err.messages,
        undefined,
        err.statusText,
      );
    case 403:
      return new RequestForbidden(mapErrorObject(err.data ?? err.messages));
  }
}

function mapErrorObject(error) {
  let errors: {};
  if (typeof error == 'object') {
    if (error.issues) {
      errors = error.issues?.map((issue) => {
        if (issue.path.length === 0) {
          return {
            message: issue.message,
            code: issue.code,
          };
        } else {
          return {
            [issue.path[issue.path.length - 1]]: { message: issue.message },
            code: issue.code,
          };
        }
      });
    } else if (error.errors) {
      errors = error.errors.map((err) => {
        return {
          message: err.message,
          code: err.path,
        };
      });
    } else if (error.pathIssues) {
      errors = error.pathIssues?.map((issue) => {
        if (issue?.field && issue.details) {
          return `${issue.field} => ${issue.details}`;
        }
      });
      errors = errors || error?.message;
      errors = { code: error?.code, message: errors };
    } else if (error?.metadata) {
      errors = {
        code: error.code,
        message: error.metadata.message || error?.message,
      };
    } else {
      errors = error;
    }
  } else {
    errors = [
      {
        message: error,
        code: undefined,
      },
    ];
  }
  return errors;
}

function getHeaderForSamplePayments(testMode: boolean) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const Authorization = getSamplePayTokenId(testMode);

  return { ...headers, Authorization };
}

function getQueryString(data) {
  let queryStrings: string | string[] = Object.entries(data).map((v) =>
    v[1] !== undefined ? v.join('=') : undefined,
  );
  queryStrings = queryStrings.filter((str) => str !== undefined);
  return queryStrings.join('&');
}

function sanitize(data: any) {
  const cloneData = cloneDeep(data);
  if (cloneData?.paymentMethod) {
    if (cloneData.paymentMethod?.creditCard) {
      cloneData.paymentMethod.creditCard.number =
        cloneData.paymentMethod.creditCard.number?.slice(-4);
      delete cloneData.paymentMethod.creditCard.cvc;
    }
  }
  if (cloneData?.card) {
    cloneData.card.number = cloneData.card.number?.slice(-4);
    delete cloneData.card.cvc;
  }
  if (cloneData?.ach) {
    cloneData.ach.accountNumber = cloneData.ach.accountNumber?.slice(-4);
    cloneData.ach.routingNumber = cloneData.ach.routingNumber?.slice(-4);
  }
  return JSON.stringify(cloneData);
}

export async function sendSampleRequest(
  method: RequestTypes,
  url: string,
  testMode = false,
  data = {},
) {
  const config = { headers: getHeaderForSamplePayments(testMode) };
  const absoluteUrl = `${getSamplePaymentsUrl(testMode)}${url}`;
  Logger.debug(
    `sending request to sample via ${method}, for ${absoluteUrl}, with params ${JSON.stringify(
      data,
    )}`,
  );
  let response;
  try {
    switch (method) {
      case RequestTypes.get:
        const queryString = getQueryString(data);
        const urlWithQueryString = queryString
          ? `${absoluteUrl}?${queryString}`
          : absoluteUrl;
        response = await axios.get(urlWithQueryString, config);
        break;
      case RequestTypes.post:
        response = await axios.post(absoluteUrl, data, config);
        break;
      case RequestTypes.delete:
        response = await axios.delete(absoluteUrl, config);
        break;
    }
  } catch (err) {
    if (err.response?.status !== 304) {
      throw mapError(err.response);
    }
  }
  Logger.debug(
    `response returned via ${method} for ${absoluteUrl}, is: ${inspect(
      response?.data,
    )}`,
  );
  return response?.data;
}
