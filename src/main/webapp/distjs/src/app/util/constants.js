"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "WHITTAM_REST_URL", {
        get: function () { return "http://10.0.0.84:8080/whittam-ropes/"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "WHITTAM_WEBSOCKET_URL", {
        get: function () { return "ws://10.0.0.84:8080/whittam-ropes/order-added"; },
        enumerable: true,
        configurable: true
    });
    ;
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map