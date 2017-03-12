"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var SecureHttpService = (function () {
    function SecureHttpService(http) {
        this.http = http;
    }
    SecureHttpService.prototype.get = function (url, queryParams) {
        return this.getWithHeaders(url, queryParams, new http_1.Headers());
    };
    SecureHttpService.prototype.getWithHeaders = function (url, queryParams, headers) {
        var requestOptionsArgs = {
            search: queryParams,
            headers: headers
        };
        return this.http.get(url, requestOptionsArgs)
            .map(function (res) {
            try {
                return res.json();
            }
            catch (err) {
                return res;
            }
        }).catch(function (err, caught) {
            return Rx_1.Observable.throw(err);
        });
    };
    SecureHttpService.prototype.post = function (url, bodyJson) {
        return this.postWithHeaders(url, bodyJson, new http_1.Headers());
    };
    SecureHttpService.prototype.postWithHeaders = function (url, bodyJson, headers) {
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, bodyJson, options)
            .map(function (res) {
            return res;
        })
            .catch(function (err, caught) {
            return Rx_1.Observable.throw(err);
        });
    };
    SecureHttpService.prototype.delete = function (url, queryParams, bodyJson) {
        return this.deleteWithHeaders(url, queryParams, bodyJson, new http_1.Headers());
    };
    SecureHttpService.prototype.deleteWithHeaders = function (url, queryParams, bodyJson, headers) {
        var requestOptionsArgs = {
            search: queryParams,
            headers: headers,
            body: bodyJson
        };
        return this.http.delete(url, requestOptionsArgs)
            .map(function (res) {
            return res;
        }).catch(function (err, caught) {
            return Rx_1.Observable.throw(err);
        });
    };
    SecureHttpService.prototype.put = function (url, queryParams, bodyJson) {
        return this.putWithHeaders(url, queryParams, bodyJson, new http_1.Headers());
    };
    SecureHttpService.prototype.putWithHeaders = function (url, queryParams, bodyJson, headers) {
        var options = new http_1.RequestOptions({ headers: headers, search: queryParams });
        return this.http.put(url, bodyJson, options)
            .map(function (res) {
            return res;
        }).catch(function (err, caught) {
            return Rx_1.Observable.throw(err);
        });
    };
    SecureHttpService.prototype.patchWithHeaders = function (url, bodyJson, headers) {
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.patch(url, bodyJson, options)
            .map(function (res) {
            return res.json();
        })
            .catch(function (err, caught) {
            return Rx_1.Observable.throw(err);
        });
    };
    return SecureHttpService;
}());
SecureHttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SecureHttpService);
exports.SecureHttpService = SecureHttpService;
//# sourceMappingURL=secure.http.service.js.map