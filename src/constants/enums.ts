// src/enums/HttpStatusCodeEnum.ts

export enum HttpStatusCodeEnum {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    InternalServerError = 500,
    ServiceUnavailable = 503,
  }
  
  export const HttpStatusMessages: Record<HttpStatusCodeEnum, string> = {
    [HttpStatusCodeEnum.OK]: 'The request has succeeded.',
    [HttpStatusCodeEnum.Created]: 'The resource has been created successfully.',
    [HttpStatusCodeEnum.NoContent]: 'The request was successful, but there is no content to send back.',
    [HttpStatusCodeEnum.BadRequest]: 'The request could not be understood by the server due to malformed syntax.',
    [HttpStatusCodeEnum.Unauthorized]: 'The request requires authentication or authorization.',
    [HttpStatusCodeEnum.Forbidden]: 'The server understands the request but refuses to authorize it.',
    [HttpStatusCodeEnum.NotFound]: 'The server cannot find the requested resource.',
    [HttpStatusCodeEnum.MethodNotAllowed]: 'The HTTP method is not allowed for the resource.',
    [HttpStatusCodeEnum.Conflict]: 'Record already exists',
    [HttpStatusCodeEnum.InternalServerError]: 'An unexpected error occurred on the server.',
    [HttpStatusCodeEnum.ServiceUnavailable]: 'The server is temporarily unavailable, please try again later.',
  };
  