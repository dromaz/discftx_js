"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublicEndpoint = exports.getWsUrl = exports.getRestBaseUrl = exports.programKey = exports.programId = exports.serializeParamPayload = exports.serializeParams = void 0;
;
;
function serializeParams(params = {}, strict_validation = false) {
    return Object.keys(params)
        .sort()
        .map(key => {
        const value = params[key];
        if (strict_validation === true && typeof value === 'undefined') {
            throw new Error('Failed to sign API request due to undefined parameter');
        }
        return `${key}=${value}`;
    })
        .join('&');
}
exports.serializeParams = serializeParams;
;
function serializeParamPayload(isGetRequest, params, strictParamValidation) {
    if (!params) {
        return '';
    }
    if (!isGetRequest) {
        return JSON.stringify(params);
    }
    if (typeof params === 'string') {
        return '?' + params;
    }
    return '?' + serializeParams(params, strictParamValidation);
}
exports.serializeParamPayload = serializeParamPayload;
;
exports.programId = 'ftxnodeapi';
exports.programKey = 'externalReferralProgram';
function getRestBaseUrl(restClientOptions) {
    if (restClientOptions.baseUrl) {
        return restClientOptions.baseUrl;
    }
    if (restClientOptions.domain === 'ftxus') {
        return 'https://ftx.us/api';
    }
    return 'https://ftx.com/api';
}
exports.getRestBaseUrl = getRestBaseUrl;
;
function getWsUrl(options) {
    if (options.wsUrl) {
        return options.wsUrl;
    }
    if (options.domain === 'ftxus') {
        return 'wss://ftx.us/ws/';
    }
    return 'wss://ftx.com/ws/';
}
exports.getWsUrl = getWsUrl;
;
function isPublicEndpoint(endpoint) {
    if (endpoint.startsWith('https')) {
        return true;
    }
    if (endpoint.startsWith('v2/public')) {
        return true;
    }
    if (endpoint.startsWith('public/linear')) {
        return true;
    }
    return false;
}
exports.isPublicEndpoint = isPublicEndpoint;
;
//# sourceMappingURL=requestUtils.js.map