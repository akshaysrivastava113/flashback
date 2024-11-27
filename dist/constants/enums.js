"use strict";
// src/enums/HttpStatusCodeEnum.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusMessages = exports.HttpStatusCodeEnum = void 0;
var HttpStatusCodeEnum;
(function (HttpStatusCodeEnum) {
    HttpStatusCodeEnum[HttpStatusCodeEnum["OK"] = 200] = "OK";
    HttpStatusCodeEnum[HttpStatusCodeEnum["Created"] = 201] = "Created";
    HttpStatusCodeEnum[HttpStatusCodeEnum["NoContent"] = 204] = "NoContent";
    HttpStatusCodeEnum[HttpStatusCodeEnum["BadRequest"] = 400] = "BadRequest";
    HttpStatusCodeEnum[HttpStatusCodeEnum["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCodeEnum[HttpStatusCodeEnum["Forbidden"] = 403] = "Forbidden";
    HttpStatusCodeEnum[HttpStatusCodeEnum["NotFound"] = 404] = "NotFound";
    HttpStatusCodeEnum[HttpStatusCodeEnum["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatusCodeEnum[HttpStatusCodeEnum["Conflict"] = 409] = "Conflict";
    HttpStatusCodeEnum[HttpStatusCodeEnum["InternalServerError"] = 500] = "InternalServerError";
    HttpStatusCodeEnum[HttpStatusCodeEnum["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(HttpStatusCodeEnum || (exports.HttpStatusCodeEnum = HttpStatusCodeEnum = {}));
exports.HttpStatusMessages = {
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
