var $TdzfH$peerjsjsbinarypack = require("peerjs-js-binarypack");
var $TdzfH$webrtcadapter = require("webrtc-adapter");
var $TdzfH$eventemitter3 = require("eventemitter3");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $f1d1a6b5c376b066$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Peer", () => $976f9b679211b81e$exports.Peer);
$parcel$export(module.exports, "util", () => $6c02be62bb157391$export$7debb50ef11d5e0b);


var $c2c6b21388937aac$var$webRTCAdapter = //@ts-ignore
($parcel$interopDefault($TdzfH$webrtcadapter)).default || ($parcel$interopDefault($TdzfH$webrtcadapter));
var $c2c6b21388937aac$export$25be9502477c137d = new /** @class */ (function() {
    function class_1() {
        this.isIOS = [
            "iPad",
            "iPhone",
            "iPod"
        ].includes(navigator.platform);
        this.supportedBrowsers = [
            "firefox",
            "chrome",
            "safari"
        ];
        this.minFirefoxVersion = 59;
        this.minChromeVersion = 72;
        this.minSafariVersion = 605;
    }
    class_1.prototype.isWebRTCSupported = function() {
        return typeof RTCPeerConnection !== "undefined";
    };
    class_1.prototype.isBrowserSupported = function() {
        var browser = this.getBrowser();
        var version = this.getVersion();
        var validBrowser = this.supportedBrowsers.includes(browser);
        if (!validBrowser) return false;
        if (browser === "chrome") return version >= this.minChromeVersion;
        if (browser === "firefox") return version >= this.minFirefoxVersion;
        if (browser === "safari") return !this.isIOS && version >= this.minSafariVersion;
        return false;
    };
    class_1.prototype.getBrowser = function() {
        return $c2c6b21388937aac$var$webRTCAdapter.browserDetails.browser;
    };
    class_1.prototype.getVersion = function() {
        return $c2c6b21388937aac$var$webRTCAdapter.browserDetails.version || 0;
    };
    class_1.prototype.isUnifiedPlanSupported = function() {
        var browser = this.getBrowser();
        var version = $c2c6b21388937aac$var$webRTCAdapter.browserDetails.version || 0;
        if (browser === "chrome" && version < this.minChromeVersion) return false;
        if (browser === "firefox" && version >= this.minFirefoxVersion) return true;
        if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return false;
        var tempPc;
        var supported = false;
        try {
            tempPc = new RTCPeerConnection();
            tempPc.addTransceiver("audio");
            supported = true;
        } catch (e) {} finally{
            if (tempPc) tempPc.close();
        }
        return supported;
    };
    class_1.prototype.toString = function() {
        return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
    };
    return class_1;
}())();


var $6c02be62bb157391$var$DEFAULT_CONFIG = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: [
                "turn:eu-0.turn.peerjs.com:3478",
                "turn:us-0.turn.peerjs.com:3478", 
            ],
            username: "peerjs",
            credential: "peerjsp"
        }, 
    ],
    sdpSemantics: "unified-plan"
};
var $6c02be62bb157391$var$Util = /** @class */ function() {
    function Util() {
        this.CLOUD_HOST = "0.peerjs.com";
        this.CLOUD_PORT = 443;
        // Browsers that need chunking:
        this.chunkedBrowsers = {
            Chrome: 1,
            chrome: 1
        };
        this.chunkedMTU = 16300; // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
        // Returns browser-agnostic default config
        this.defaultConfig = $6c02be62bb157391$var$DEFAULT_CONFIG;
        this.browser = $c2c6b21388937aac$export$25be9502477c137d.getBrowser();
        this.browserVersion = $c2c6b21388937aac$export$25be9502477c137d.getVersion();
        // Lists which features are supported
        this.supports = function() {
            var supported = {
                browser: $c2c6b21388937aac$export$25be9502477c137d.isBrowserSupported(),
                webRTC: $c2c6b21388937aac$export$25be9502477c137d.isWebRTCSupported(),
                audioVideo: false,
                data: false,
                binaryBlob: false,
                reliable: false
            };
            if (!supported.webRTC) return supported;
            var pc;
            try {
                pc = new RTCPeerConnection($6c02be62bb157391$var$DEFAULT_CONFIG);
                supported.audioVideo = true;
                var dc = void 0;
                try {
                    dc = pc.createDataChannel("_PEERJSTEST", {
                        ordered: true
                    });
                    supported.data = true;
                    supported.reliable = !!dc.ordered;
                    // Binary test
                    try {
                        dc.binaryType = "blob";
                        supported.binaryBlob = !$c2c6b21388937aac$export$25be9502477c137d.isIOS;
                    } catch (e) {}
                } catch (e) {} finally{
                    if (dc) dc.close();
                }
            } catch (e) {} finally{
                if (pc) pc.close();
            }
            return supported;
        }();
        this.pack = ($parcel$interopDefault($TdzfH$peerjsjsbinarypack)).pack;
        this.unpack = ($parcel$interopDefault($TdzfH$peerjsjsbinarypack)).unpack;
        // Binary stuff
        this._dataCount = 1;
    }
    Util.prototype.noop = function() {};
    // Ensure alphanumeric ids
    Util.prototype.validateId = function(id) {
        // Allow empty ids
        return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
    };
    Util.prototype.chunk = function(blob) {
        var chunks = [];
        var size = blob.size;
        var total = Math.ceil(size / $6c02be62bb157391$export$7debb50ef11d5e0b.chunkedMTU);
        var index = 0;
        var start = 0;
        while(start < size){
            var end = Math.min(size, start + $6c02be62bb157391$export$7debb50ef11d5e0b.chunkedMTU);
            var b = blob.slice(start, end);
            var chunk = {
                __peerData: this._dataCount,
                n: index,
                data: b,
                total: total
            };
            chunks.push(chunk);
            start = end;
            index++;
        }
        this._dataCount++;
        return chunks;
    };
    Util.prototype.blobToArrayBuffer = function(blob, cb) {
        var fr = new FileReader();
        fr.onload = function(evt) {
            if (evt.target) cb(evt.target.result);
        };
        fr.readAsArrayBuffer(blob);
        return fr;
    };
    Util.prototype.binaryStringToArrayBuffer = function(binary) {
        var byteArray = new Uint8Array(binary.length);
        for(var i = 0; i < binary.length; i++)byteArray[i] = binary.charCodeAt(i) & 0xff;
        return byteArray.buffer;
    };
    Util.prototype.randomToken = function() {
        return Math.random().toString(36).slice(2);
    };
    Util.prototype.isSecure = function() {
        return location.protocol === "https:";
    };
    return Util;
}();
var $6c02be62bb157391$export$7debb50ef11d5e0b = new $6c02be62bb157391$var$Util();


var $976f9b679211b81e$exports = {};

$parcel$export($976f9b679211b81e$exports, "Peer", () => $976f9b679211b81e$export$ecd1fc136c422448, (v) => $976f9b679211b81e$export$ecd1fc136c422448 = v);


var $c25b565240b6a41d$exports = {};

$parcel$export($c25b565240b6a41d$exports, "LogLevel", () => $c25b565240b6a41d$export$243e62d78d3b544d, (v) => $c25b565240b6a41d$export$243e62d78d3b544d = v);
$parcel$export($c25b565240b6a41d$exports, "default", () => $c25b565240b6a41d$export$2e2bcd8739ae039, (v) => $c25b565240b6a41d$export$2e2bcd8739ae039 = v);
var $c25b565240b6a41d$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $c25b565240b6a41d$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $c25b565240b6a41d$var$LOG_PREFIX = "PeerJS: ";
var $c25b565240b6a41d$export$243e62d78d3b544d;
(function($c25b565240b6a41d$export$243e62d78d3b544d) {
    $c25b565240b6a41d$export$243e62d78d3b544d[$c25b565240b6a41d$export$243e62d78d3b544d["Disabled"] = 0] = "Disabled";
    $c25b565240b6a41d$export$243e62d78d3b544d[$c25b565240b6a41d$export$243e62d78d3b544d["Errors"] = 1] = "Errors";
    $c25b565240b6a41d$export$243e62d78d3b544d[$c25b565240b6a41d$export$243e62d78d3b544d["Warnings"] = 2] = "Warnings";
    $c25b565240b6a41d$export$243e62d78d3b544d[$c25b565240b6a41d$export$243e62d78d3b544d["All"] = 3] = "All";
})($c25b565240b6a41d$export$243e62d78d3b544d || ($c25b565240b6a41d$export$243e62d78d3b544d = {}));
var $c25b565240b6a41d$var$Logger = /** @class */ function() {
    function Logger() {
        this._logLevel = $c25b565240b6a41d$export$243e62d78d3b544d.Disabled;
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function() {
            return this._logLevel;
        },
        set: function(logLevel) {
            this._logLevel = logLevel;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.log = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.All) this._print.apply(this, $c25b565240b6a41d$var$__spreadArray([
            $c25b565240b6a41d$export$243e62d78d3b544d.All
        ], $c25b565240b6a41d$var$__read(args), false));
    };
    Logger.prototype.warn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.Warnings) this._print.apply(this, $c25b565240b6a41d$var$__spreadArray([
            $c25b565240b6a41d$export$243e62d78d3b544d.Warnings
        ], $c25b565240b6a41d$var$__read(args), false));
    };
    Logger.prototype.error = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.Errors) this._print.apply(this, $c25b565240b6a41d$var$__spreadArray([
            $c25b565240b6a41d$export$243e62d78d3b544d.Errors
        ], $c25b565240b6a41d$var$__read(args), false));
    };
    Logger.prototype.setLogFunction = function(fn) {
        this._print = fn;
    };
    Logger.prototype._print = function(logLevel) {
        var rest = [];
        for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
        var copy = $c25b565240b6a41d$var$__spreadArray([
            $c25b565240b6a41d$var$LOG_PREFIX
        ], $c25b565240b6a41d$var$__read(rest), false);
        for(var i in copy)if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
        if (logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.All) console.log.apply(console, $c25b565240b6a41d$var$__spreadArray([], $c25b565240b6a41d$var$__read(copy), false));
        else if (logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.Warnings) console.warn.apply(console, $c25b565240b6a41d$var$__spreadArray([
            "WARNING"
        ], $c25b565240b6a41d$var$__read(copy), false));
        else if (logLevel >= $c25b565240b6a41d$export$243e62d78d3b544d.Errors) console.error.apply(console, $c25b565240b6a41d$var$__spreadArray([
            "ERROR"
        ], $c25b565240b6a41d$var$__read(copy), false));
    };
    return Logger;
}();
var $c25b565240b6a41d$export$2e2bcd8739ae039 = new $c25b565240b6a41d$var$Logger();


var $a86db8d850e55bcf$exports = {};

$parcel$export($a86db8d850e55bcf$exports, "Socket", () => $a86db8d850e55bcf$export$4798917dbf149b79, (v) => $a86db8d850e55bcf$export$4798917dbf149b79 = v);


var $2f2cc37b22a0b29a$export$3157d57b4135e3bc;
(function($2f2cc37b22a0b29a$export$3157d57b4135e3bc) {
    $2f2cc37b22a0b29a$export$3157d57b4135e3bc["Data"] = "data";
    $2f2cc37b22a0b29a$export$3157d57b4135e3bc["Media"] = "media";
})($2f2cc37b22a0b29a$export$3157d57b4135e3bc || ($2f2cc37b22a0b29a$export$3157d57b4135e3bc = {}));
var $2f2cc37b22a0b29a$export$9547aaa2e39030ff;
(function($2f2cc37b22a0b29a$export$9547aaa2e39030ff) {
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["BrowserIncompatible"] = "browser-incompatible";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["Disconnected"] = "disconnected";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["InvalidID"] = "invalid-id";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["InvalidKey"] = "invalid-key";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["Network"] = "network";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["PeerUnavailable"] = "peer-unavailable";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["SslUnavailable"] = "ssl-unavailable";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["ServerError"] = "server-error";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["SocketError"] = "socket-error";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["SocketClosed"] = "socket-closed";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["UnavailableID"] = "unavailable-id";
    $2f2cc37b22a0b29a$export$9547aaa2e39030ff["WebRTC"] = "webrtc";
})($2f2cc37b22a0b29a$export$9547aaa2e39030ff || ($2f2cc37b22a0b29a$export$9547aaa2e39030ff = {}));
var $2f2cc37b22a0b29a$export$89f507cf986a947;
(function($2f2cc37b22a0b29a$export$89f507cf986a947) {
    $2f2cc37b22a0b29a$export$89f507cf986a947["Binary"] = "binary";
    $2f2cc37b22a0b29a$export$89f507cf986a947["BinaryUTF8"] = "binary-utf8";
    $2f2cc37b22a0b29a$export$89f507cf986a947["JSON"] = "json";
})($2f2cc37b22a0b29a$export$89f507cf986a947 || ($2f2cc37b22a0b29a$export$89f507cf986a947 = {}));
var $2f2cc37b22a0b29a$export$3b5c4a4b6354f023;
(function($2f2cc37b22a0b29a$export$3b5c4a4b6354f023) {
    $2f2cc37b22a0b29a$export$3b5c4a4b6354f023["Message"] = "message";
    $2f2cc37b22a0b29a$export$3b5c4a4b6354f023["Disconnected"] = "disconnected";
    $2f2cc37b22a0b29a$export$3b5c4a4b6354f023["Error"] = "error";
    $2f2cc37b22a0b29a$export$3b5c4a4b6354f023["Close"] = "close";
})($2f2cc37b22a0b29a$export$3b5c4a4b6354f023 || ($2f2cc37b22a0b29a$export$3b5c4a4b6354f023 = {}));
var $2f2cc37b22a0b29a$export$adb4a1754da6f10d;
(function($2f2cc37b22a0b29a$export$adb4a1754da6f10d) {
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Heartbeat"] = "HEARTBEAT";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Candidate"] = "CANDIDATE";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Offer"] = "OFFER";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Answer"] = "ANSWER";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Open"] = "OPEN";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Error"] = "ERROR";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["IdTaken"] = "ID-TAKEN";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["InvalidKey"] = "INVALID-KEY";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Leave"] = "LEAVE";
    $2f2cc37b22a0b29a$export$adb4a1754da6f10d["Expire"] = "EXPIRE";
})($2f2cc37b22a0b29a$export$adb4a1754da6f10d || ($2f2cc37b22a0b29a$export$adb4a1754da6f10d = {}));


var $059935620e5e661f$exports = {};
$059935620e5e661f$exports = JSON.parse("{\"name\":\"peerjs\",\"version\":\"1.4.7\",\"keywords\":[\"peerjs\",\"webrtc\",\"p2p\",\"rtc\"],\"description\":\"PeerJS client\",\"homepage\":\"https://peerjs.com\",\"bugs\":{\"url\":\"https://github.com/peers/peerjs/issues\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/peers/peerjs\"},\"license\":\"MIT\",\"contributors\":[\"Michelle Bu <michelle@michellebu.com>\",\"afrokick <devbyru@gmail.com>\",\"ericz <really.ez@gmail.com>\",\"Jairo <kidandcat@gmail.com>\",\"Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>\",\"Jairo Caro-Accino Viciana <jairo@galax.be>\",\"Carlos Caballero <carlos.caballero.gonzalez@gmail.com>\",\"hc <hheennrryy@gmail.com>\",\"Muhammad Asif <capripio@gmail.com>\",\"PrashoonB <prashoonbhattacharjee@gmail.com>\",\"Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>\",\"akotynski <aleksanderkotbury@gmail.com>\",\"lmb <i@lmb.io>\",\"Jairooo <jairocaro@msn.com>\",\"Moritz Stückler <moritz.stueckler@gmail.com>\",\"Simon <crydotsnakegithub@gmail.com>\",\"Denis Lukov <denismassters@gmail.com>\",\"Philipp Hancke <fippo@andyet.net>\",\"Hans Oksendahl <hansoksendahl@gmail.com>\",\"Jess <jessachandler@gmail.com>\",\"khankuan <khankuan@gmail.com>\",\"DUODVK <kurmanov.work@gmail.com>\",\"XiZhao <kwang1imsa@gmail.com>\",\"Matthias Lohr <matthias@lohr.me>\",\"=frank tree <=frnktrb@googlemail.com>\",\"Andre Eckardt <aeckardt@outlook.com>\",\"Chris Cowan <agentme49@gmail.com>\",\"Alex Chuev <alex@chuev.com>\",\"alxnull <alxnull@e.mail.de>\",\"Yemel Jardi <angel.jardi@gmail.com>\",\"Ben Parnell <benjaminparnell.94@gmail.com>\",\"Benny Lichtner <bennlich@gmail.com>\",\"fresheneesz <bitetrudpublic@gmail.com>\",\"bob.barstead@exaptive.com <bob.barstead@exaptive.com>\",\"chandika <chandika@gmail.com>\",\"emersion <contact@emersion.fr>\",\"Christopher Van <cvan@users.noreply.github.com>\",\"eddieherm <edhermoso@gmail.com>\",\"Eduardo Pinho <enet4mikeenet@gmail.com>\",\"Evandro Zanatta <ezanatta@tray.net.br>\",\"Gardner Bickford <gardner@users.noreply.github.com>\",\"Gian Luca <gianluca.cecchi@cynny.com>\",\"PatrickJS <github@gdi2290.com>\",\"jonnyf <github@jonathanfoss.co.uk>\",\"Hizkia Felix <hizkifw@gmail.com>\",\"Hristo Oskov <hristo.oskov@gmail.com>\",\"Isaac Madwed <i.madwed@gmail.com>\",\"Ilya Konanykhin <ilya.konanykhin@gmail.com>\",\"jasonbarry <jasbarry@me.com>\",\"Jonathan Burke <jonathan.burke.1311@googlemail.com>\",\"Josh Hamit <josh.hamit@gmail.com>\",\"Jordan Austin <jrax86@gmail.com>\",\"Joel Wetzell <jwetzell@yahoo.com>\",\"xizhao <kevin.wang@cloudera.com>\",\"Alberto Torres <kungfoobar@gmail.com>\",\"Jonathan Mayol <mayoljonathan@gmail.com>\",\"Jefferson Felix <me@jsfelix.dev>\",\"Rolf Erik Lekang <me@rolflekang.com>\",\"Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>\",\"Pepijn de Vos <pepijndevos@gmail.com>\",\"JooYoung <qkdlql@naver.com>\",\"Tobias Speicher <rootcommander@gmail.com>\",\"Steve Blaurock <sblaurock@gmail.com>\",\"Kyrylo Shegeda <shegeda@ualberta.ca>\",\"Diwank Singh Tomer <singh@diwank.name>\",\"Sören Balko <Soeren.Balko@gmail.com>\",\"Arpit Solanki <solankiarpit1997@gmail.com>\",\"Yuki Ito <yuki@gnnk.net>\",\"Artur Zayats <zag2art@gmail.com>\"],\"funding\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"collective\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"files\":[\"dist/*\"],\"sideEffects\":[\"lib/global.ts\",\"lib/supports.ts\"],\"main\":\"dist/bundler.cjs\",\"module\":\"dist/bundler.mjs\",\"browser-minified\":\"dist/peerjs.min.js\",\"browser-unminified\":\"dist/peerjs.js\",\"types\":\"dist/types.d.ts\",\"engines\":{\"node\":\">= 10\"},\"targets\":{\"types\":{\"source\":\"lib/exports.ts\"},\"main\":{\"source\":\"lib/exports.ts\",\"sourceMap\":{\"inlineSources\":true}},\"module\":{\"source\":\"lib/exports.ts\",\"includeNodeModules\":[\"eventemitter3\"],\"sourceMap\":{\"inlineSources\":true}},\"browser-minified\":{\"context\":\"browser\",\"outputFormat\":\"global\",\"optimize\":true,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"},\"browser-unminified\":{\"context\":\"browser\",\"outputFormat\":\"global\",\"optimize\":false,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"}},\"scripts\":{\"contributors\":\"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\\"chore(contributors): update and sort contributors list\\\"\",\"check\":\"tsc --noEmit\",\"watch\":\"parcel watch\",\"build\":\"rm -rf dist && parcel build\",\"prepublishOnly\":\"npm run build\",\"test\":\"mocha -r ts-node/register -r jsdom-global/register test/**/*.ts\",\"format\":\"prettier --write .\",\"semantic-release\":\"semantic-release\"},\"devDependencies\":{\"@parcel/config-default\":\"^2.5.0\",\"@parcel/packager-ts\":\"^2.5.0\",\"@parcel/transformer-typescript-tsc\":\"^2.5.0\",\"@parcel/transformer-typescript-types\":\"^2.5.0\",\"@semantic-release/changelog\":\"^6.0.1\",\"@semantic-release/git\":\"^10.0.1\",\"@types/chai\":\"^4.3.0\",\"@types/mocha\":\"^9.1.0\",\"@types/node\":\"^17.0.18\",\"chai\":\"^4.3.6\",\"git-authors-cli\":\"^1.0.40\",\"jsdom\":\"^19.0.0\",\"jsdom-global\":\"^3.0.2\",\"mocha\":\"^9.2.0\",\"mock-socket\":\"8.0.5\",\"parcel\":\"^2.5.0\",\"parcel-transformer-tsc-sourcemaps\":\"^1.0.2\",\"prettier\":\"^2.6.2\",\"semantic-release\":\"^19.0.2\",\"standard\":\"^16.0.4\",\"ts-node\":\"^10.5.0\",\"typescript\":\"^4.5.5\"},\"dependencies\":{\"@swc/helpers\":\"^0.3.13\",\"eventemitter3\":\"^4.0.7\",\"peerjs-js-binarypack\":\"1.0.1\",\"webrtc-adapter\":\"^7.7.1\"}}");


var $a86db8d850e55bcf$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $a86db8d850e55bcf$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $a86db8d850e55bcf$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $a86db8d850e55bcf$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * An abstraction on top of WebSockets to provide fastest
 * possible connection for peers.
 */ var $a86db8d850e55bcf$export$4798917dbf149b79 = /** @class */ function(_super) {
    $a86db8d850e55bcf$var$__extends($a86db8d850e55bcf$export$4798917dbf149b79, _super);
    function $a86db8d850e55bcf$export$4798917dbf149b79(secure, host, port, path, key, pingInterval) {
        if (pingInterval === void 0) pingInterval = 5000;
        var _this = _super.call(this) || this;
        _this.pingInterval = pingInterval;
        _this._disconnected = true;
        _this._messagesQueue = [];
        var wsProtocol = secure ? "wss://" : "ws://";
        _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
        return _this;
    }
    $a86db8d850e55bcf$export$4798917dbf149b79.prototype.start = function(id, token) {
        var _this = this;
        this._id = id;
        var wsUrl = "".concat(this._baseUrl, "&id=").concat(id, "&token=").concat(token);
        if (!!this._socket || !this._disconnected) return;
        this._socket = new WebSocket(wsUrl + "&version=" + $059935620e5e661f$exports.version);
        this._disconnected = false;
        this._socket.onmessage = function(event) {
            var data;
            try {
                data = JSON.parse(event.data);
                $c25b565240b6a41d$exports.default.log("Server message received:", data);
            } catch (e) {
                $c25b565240b6a41d$exports.default.log("Invalid server message", event.data);
                return;
            }
            _this.emit($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Message, data);
        };
        this._socket.onclose = function(event) {
            if (_this._disconnected) return;
            $c25b565240b6a41d$exports.default.log("Socket closed.", event);
            _this._cleanup();
            _this._disconnected = true;
            _this.emit($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Disconnected);
        };
        // Take care of the queue of connections if necessary and make sure Peer knows
        // socket is open.
        this._socket.onopen = function() {
            if (_this._disconnected) return;
            _this._sendQueuedMessages();
            $c25b565240b6a41d$exports.default.log("Socket open");
            _this._scheduleHeartbeat();
        };
    };
    $a86db8d850e55bcf$export$4798917dbf149b79.prototype._scheduleHeartbeat = function() {
        var _this = this;
        this._wsPingTimer = setTimeout(function() {
            _this._sendHeartbeat();
        }, this.pingInterval);
    };
    $a86db8d850e55bcf$export$4798917dbf149b79.prototype._sendHeartbeat = function() {
        if (!this._wsOpen()) {
            $c25b565240b6a41d$exports.default.log("Cannot send heartbeat, because socket closed");
            return;
        }
        var message = JSON.stringify({
            type: $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Heartbeat
        });
        this._socket.send(message);
        this._scheduleHeartbeat();
    };
    /** Is the websocket currently open? */ $a86db8d850e55bcf$export$4798917dbf149b79.prototype._wsOpen = function() {
        return !!this._socket && this._socket.readyState === 1;
    };
    /** Send queued messages. */ $a86db8d850e55bcf$export$4798917dbf149b79.prototype._sendQueuedMessages = function() {
        var e_1, _a;
        //Create copy of queue and clear it,
        //because send method push the message back to queue if smth will go wrong
        var copiedQueue = $a86db8d850e55bcf$var$__spreadArray([], $a86db8d850e55bcf$var$__read(this._messagesQueue), false);
        this._messagesQueue = [];
        try {
            for(var copiedQueue_1 = $a86db8d850e55bcf$var$__values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()){
                var message = copiedQueue_1_1.value;
                this.send(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1.return)) _a.call(copiedQueue_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    /** Exposed send for DC & Peer. */ $a86db8d850e55bcf$export$4798917dbf149b79.prototype.send = function(data) {
        if (this._disconnected) return;
        // If we didn't get an ID yet, we can't yet send anything so we should queue
        // up these messages.
        if (!this._id) {
            this._messagesQueue.push(data);
            return;
        }
        if (!data.type) {
            this.emit($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Error, "Invalid message");
            return;
        }
        if (!this._wsOpen()) return;
        var message = JSON.stringify(data);
        this._socket.send(message);
    };
    $a86db8d850e55bcf$export$4798917dbf149b79.prototype.close = function() {
        if (this._disconnected) return;
        this._cleanup();
        this._disconnected = true;
    };
    $a86db8d850e55bcf$export$4798917dbf149b79.prototype._cleanup = function() {
        if (this._socket) {
            this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
            this._socket.close();
            this._socket = undefined;
        }
        clearTimeout(this._wsPingTimer);
    };
    return $a86db8d850e55bcf$export$4798917dbf149b79;
}($TdzfH$eventemitter3.EventEmitter);


var $9b5cc8dbdd0aa809$exports = {};

$parcel$export($9b5cc8dbdd0aa809$exports, "MediaConnection", () => $9b5cc8dbdd0aa809$export$4a84e95a2324ac29, (v) => $9b5cc8dbdd0aa809$export$4a84e95a2324ac29 = v);


var $3b7b9afef381ead8$exports = {};

$parcel$export($3b7b9afef381ead8$exports, "Negotiator", () => $3b7b9afef381ead8$export$89e6bb5ad64bf4a, (v) => $3b7b9afef381ead8$export$89e6bb5ad64bf4a = v);



var $3b7b9afef381ead8$var$__assign = undefined && undefined.__assign || function() {
    $3b7b9afef381ead8$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $3b7b9afef381ead8$var$__assign.apply(this, arguments);
};
var $3b7b9afef381ead8$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $3b7b9afef381ead8$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
/**
 * Manages all negotiations between Peers.
 */ var $3b7b9afef381ead8$export$89e6bb5ad64bf4a = /** @class */ function() {
    function $3b7b9afef381ead8$export$89e6bb5ad64bf4a(connection) {
        this.connection = connection;
    }
    /** Returns a PeerConnection object set up correctly (for data, media). */ $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype.startConnection = function(options) {
        var peerConnection = this._startPeerConnection();
        // Set the connection's PC.
        this.connection.peerConnection = peerConnection;
        if (this.connection.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
        // What do we need to do now?
        if (options.originator) {
            if (this.connection.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Data) {
                var dataConnection = this.connection;
                var config = {
                    ordered: !!options.reliable
                };
                var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
                dataConnection.initialize(dataChannel);
            }
            this._makeOffer();
        } else this.handleSDP("OFFER", options.sdp);
    };
    /** Start a PC. */ $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._startPeerConnection = function() {
        $c25b565240b6a41d$exports.default.log("Creating RTCPeerConnection.");
        var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
        this._setupListeners(peerConnection);
        return peerConnection;
    };
    /** Set up various WebRTC listeners. */ $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._setupListeners = function(peerConnection) {
        var _this = this;
        var peerId = this.connection.peer;
        var connectionId = this.connection.connectionId;
        var connectionType = this.connection.type;
        var provider = this.connection.provider;
        // ICE CANDIDATES.
        $c25b565240b6a41d$exports.default.log("Listening for ICE candidates.");
        peerConnection.onicecandidate = function(evt) {
            if (!evt.candidate || !evt.candidate.candidate) return;
            $c25b565240b6a41d$exports.default.log("Received ICE candidates for ".concat(peerId, ":"), evt.candidate);
            provider.socket.send({
                type: $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Candidate,
                payload: {
                    candidate: evt.candidate,
                    type: connectionType,
                    connectionId: connectionId
                },
                dst: peerId
            });
        };
        peerConnection.oniceconnectionstatechange = function() {
            switch(peerConnection.iceConnectionState){
                case "failed":
                    $c25b565240b6a41d$exports.default.log("iceConnectionState is failed, closing connections to " + peerId);
                    _this.connection.emit("error", new Error("Negotiation of connection to " + peerId + " failed."));
                    _this.connection.close();
                    break;
                case "closed":
                    $c25b565240b6a41d$exports.default.log("iceConnectionState is closed, closing connections to " + peerId);
                    _this.connection.emit("error", new Error("Connection to " + peerId + " closed."));
                    _this.connection.close();
                    break;
                case "disconnected":
                    $c25b565240b6a41d$exports.default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
                    break;
                case "completed":
                    peerConnection.onicecandidate = $6c02be62bb157391$export$7debb50ef11d5e0b.noop;
                    break;
            }
            _this.connection.emit("iceStateChanged", peerConnection.iceConnectionState);
        };
        // DATACONNECTION.
        $c25b565240b6a41d$exports.default.log("Listening for data channel");
        // Fired between offer and answer, so options should already be saved
        // in the options hash.
        peerConnection.ondatachannel = function(evt) {
            $c25b565240b6a41d$exports.default.log("Received data channel");
            var dataChannel = evt.channel;
            var connection = provider.getConnection(peerId, connectionId);
            connection.initialize(dataChannel);
        };
        // MEDIACONNECTION.
        $c25b565240b6a41d$exports.default.log("Listening for remote stream");
        peerConnection.ontrack = function(evt) {
            $c25b565240b6a41d$exports.default.log("Received remote stream");
            var stream = evt.streams[0];
            var connection = provider.getConnection(peerId, connectionId);
            if (connection.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Media) {
                var mediaConnection = connection;
                _this._addStreamToMediaConnection(stream, mediaConnection);
            }
        };
    };
    $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype.cleanup = function() {
        $c25b565240b6a41d$exports.default.log("Cleaning up PeerConnection to " + this.connection.peer);
        var peerConnection = this.connection.peerConnection;
        if (!peerConnection) return;
        this.connection.peerConnection = null;
        //unsubscribe from all PeerConnection's events
        peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function() {};
        var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
        var dataChannelNotClosed = false;
        if (this.connection.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Data) {
            var dataConnection = this.connection;
            var dataChannel = dataConnection.dataChannel;
            if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
        }
        if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
    };
    $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._makeOffer = function() {
        return $3b7b9afef381ead8$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
            return $3b7b9afef381ead8$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createOffer(this.connection.options.constraints)
                        ];
                    case 2:
                        offer = _a.sent();
                        $c25b565240b6a41d$exports.default.log("Created offer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(offer)
                        ];
                    case 4:
                        _a.sent();
                        $c25b565240b6a41d$exports.default.log("Set localDescription:", offer, "for:".concat(this.connection.peer));
                        payload = {
                            sdp: offer,
                            type: this.connection.type,
                            connectionId: this.connection.connectionId,
                            metadata: this.connection.metadata,
                            browser: $6c02be62bb157391$export$7debb50ef11d5e0b.browser
                        };
                        if (this.connection.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Data) {
                            dataConnection = this.connection;
                            payload = $3b7b9afef381ead8$var$__assign($3b7b9afef381ead8$var$__assign({}, payload), {
                                label: dataConnection.label,
                                reliable: dataConnection.reliable,
                                serialization: dataConnection.serialization
                            });
                        }
                        provider.socket.send({
                            type: $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Offer,
                            payload: payload,
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_2 = _a.sent();
                        // TODO: investigate why _makeOffer is being called from the answer
                        if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                            provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_2);
                            $c25b565240b6a41d$exports.default.log("Failed to setLocalDescription, ", err_2);
                        }
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_1 = _a.sent();
                        provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_1_1);
                        $c25b565240b6a41d$exports.default.log("Failed to createOffer, ", err_1_1);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._makeAnswer = function() {
        return $3b7b9afef381ead8$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, answer, err_3, err_1_2;
            return $3b7b9afef381ead8$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createAnswer()
                        ];
                    case 2:
                        answer = _a.sent();
                        $c25b565240b6a41d$exports.default.log("Created answer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(answer)
                        ];
                    case 4:
                        _a.sent();
                        $c25b565240b6a41d$exports.default.log("Set localDescription:", answer, "for:".concat(this.connection.peer));
                        provider.socket.send({
                            type: $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Answer,
                            payload: {
                                sdp: answer,
                                type: this.connection.type,
                                connectionId: this.connection.connectionId,
                                browser: $6c02be62bb157391$export$7debb50ef11d5e0b.browser
                            },
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_3 = _a.sent();
                        provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_3);
                        $c25b565240b6a41d$exports.default.log("Failed to setLocalDescription, ", err_3);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_2 = _a.sent();
                        provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_1_2);
                        $c25b565240b6a41d$exports.default.log("Failed to create answer, ", err_1_2);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle an SDP. */ $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype.handleSDP = function(type, sdp) {
        return $3b7b9afef381ead8$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, self, err_4;
            return $3b7b9afef381ead8$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        sdp = new RTCSessionDescription(sdp);
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        $c25b565240b6a41d$exports.default.log("Setting remote description", sdp);
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setRemoteDescription(sdp)
                        ];
                    case 2:
                        _a.sent();
                        $c25b565240b6a41d$exports.default.log("Set remoteDescription:".concat(type, " for:").concat(this.connection.peer));
                        if (!(type === "OFFER")) return [
                            3 /*break*/ ,
                            4
                        ];
                        return [
                            4 /*yield*/ ,
                            self._makeAnswer()
                        ];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_4 = _a.sent();
                        provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_4);
                        $c25b565240b6a41d$exports.default.log("Failed to setRemoteDescription, ", err_4);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle a candidate. */ $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype.handleCandidate = function(ice) {
        return $3b7b9afef381ead8$var$__awaiter(this, void 0, Promise, function() {
            var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
            return $3b7b9afef381ead8$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        $c25b565240b6a41d$exports.default.log("handleCandidate:", ice);
                        candidate = ice.candidate;
                        sdpMLineIndex = ice.sdpMLineIndex;
                        sdpMid = ice.sdpMid;
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.addIceCandidate(new RTCIceCandidate({
                                sdpMid: sdpMid,
                                sdpMLineIndex: sdpMLineIndex,
                                candidate: candidate
                            }))
                        ];
                    case 2:
                        _a.sent();
                        $c25b565240b6a41d$exports.default.log("Added ICE candidate for:".concat(this.connection.peer));
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 3:
                        err_5 = _a.sent();
                        provider.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.WebRTC, err_5);
                        $c25b565240b6a41d$exports.default.log("Failed to handleCandidate, ", err_5);
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 4:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._addTracksToConnection = function(stream, peerConnection) {
        $c25b565240b6a41d$exports.default.log("add tracks from stream ".concat(stream.id, " to peer connection"));
        if (!peerConnection.addTrack) return $c25b565240b6a41d$exports.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
        stream.getTracks().forEach(function(track) {
            peerConnection.addTrack(track, stream);
        });
    };
    $3b7b9afef381ead8$export$89e6bb5ad64bf4a.prototype._addStreamToMediaConnection = function(stream, mediaConnection) {
        $c25b565240b6a41d$exports.default.log("add stream ".concat(stream.id, " to media connection ").concat(mediaConnection.connectionId));
        mediaConnection.addStream(stream);
    };
    return $3b7b9afef381ead8$export$89e6bb5ad64bf4a;
}();



var $816db5763b2092b1$exports = {};

$parcel$export($816db5763b2092b1$exports, "BaseConnection", () => $816db5763b2092b1$export$23a2a68283c24d80, (v) => $816db5763b2092b1$export$23a2a68283c24d80 = v);

var $816db5763b2092b1$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $816db5763b2092b1$export$23a2a68283c24d80 = /** @class */ function(_super) {
    $816db5763b2092b1$var$__extends($816db5763b2092b1$export$23a2a68283c24d80, _super);
    function $816db5763b2092b1$export$23a2a68283c24d80(peer, provider, options) {
        var _this = _super.call(this) || this;
        _this.peer = peer;
        _this.provider = provider;
        _this.options = options;
        _this._open = false;
        _this.metadata = options.metadata;
        return _this;
    }
    Object.defineProperty($816db5763b2092b1$export$23a2a68283c24d80.prototype, "open", {
        get: function() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    return $816db5763b2092b1$export$23a2a68283c24d80;
}($TdzfH$eventemitter3.EventEmitter);


var $9b5cc8dbdd0aa809$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $9b5cc8dbdd0aa809$var$__assign = undefined && undefined.__assign || function() {
    $9b5cc8dbdd0aa809$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $9b5cc8dbdd0aa809$var$__assign.apply(this, arguments);
};
var $9b5cc8dbdd0aa809$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps the streaming interface between two Peers.
 */ var $9b5cc8dbdd0aa809$export$4a84e95a2324ac29 = /** @class */ function(_super) {
    $9b5cc8dbdd0aa809$var$__extends($9b5cc8dbdd0aa809$export$4a84e95a2324ac29, _super);
    function $9b5cc8dbdd0aa809$export$4a84e95a2324ac29(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this._localStream = _this.options._stream;
        _this.connectionId = _this.options.connectionId || $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.ID_PREFIX + $6c02be62bb157391$export$7debb50ef11d5e0b.randomToken();
        _this._negotiator = new $3b7b9afef381ead8$exports.Negotiator(_this);
        if (_this._localStream) _this._negotiator.startConnection({
            _stream: _this._localStream,
            originator: true
        });
        return _this;
    }
    Object.defineProperty($9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype, "type", {
        get: function() {
            return $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Media;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype, "localStream", {
        get: function() {
            return this._localStream;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype, "remoteStream", {
        get: function() {
            return this._remoteStream;
        },
        enumerable: false,
        configurable: true
    });
    $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype.addStream = function(remoteStream) {
        $c25b565240b6a41d$exports.default.log("Receiving stream", remoteStream);
        this._remoteStream = remoteStream;
        _super.prototype.emit.call(this, "stream", remoteStream); // Should we call this `open`?
    };
    $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype.handleMessage = function(message) {
        var type = message.type;
        var payload = message.payload;
        switch(message.type){
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Answer:
                // Forward to negotiator
                this._negotiator.handleSDP(type, payload.sdp);
                this._open = true;
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                $c25b565240b6a41d$exports.default.warn("Unrecognized message type:".concat(type, " from peer:").concat(this.peer));
                break;
        }
    };
    $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype.answer = function(stream, options) {
        var e_1, _a;
        if (options === void 0) options = {};
        if (this._localStream) {
            $c25b565240b6a41d$exports.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
            return;
        }
        this._localStream = stream;
        if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
        this._negotiator.startConnection($9b5cc8dbdd0aa809$var$__assign($9b5cc8dbdd0aa809$var$__assign({}, this.options._payload), {
            _stream: stream
        }));
        // Retrieve lost messages stored because PeerConnection not set up.
        var messages = this.provider._getMessages(this.connectionId);
        try {
            for(var messages_1 = $9b5cc8dbdd0aa809$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                var message = messages_1_1.value;
                this.handleMessage(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        this._open = true;
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.prototype.close = function() {
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        this._localStream = null;
        this._remoteStream = null;
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.options && this.options._stream) this.options._stream = null;
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, "close");
    };
    $9b5cc8dbdd0aa809$export$4a84e95a2324ac29.ID_PREFIX = "mc_";
    return $9b5cc8dbdd0aa809$export$4a84e95a2324ac29;
}($816db5763b2092b1$exports.BaseConnection);


var $92db9a3ba21db2a0$exports = {};

$parcel$export($92db9a3ba21db2a0$exports, "DataConnection", () => $92db9a3ba21db2a0$export$d365f7ad9d7df9c9, (v) => $92db9a3ba21db2a0$export$d365f7ad9d7df9c9 = v);





var $3ff0aafdb373378c$exports = {};

$parcel$export($3ff0aafdb373378c$exports, "EncodingQueue", () => $3ff0aafdb373378c$export$c6913ae0ed687038, (v) => $3ff0aafdb373378c$export$c6913ae0ed687038 = v);


var $3ff0aafdb373378c$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $3ff0aafdb373378c$export$c6913ae0ed687038 = /** @class */ function(_super) {
    $3ff0aafdb373378c$var$__extends($3ff0aafdb373378c$export$c6913ae0ed687038, _super);
    function $3ff0aafdb373378c$export$c6913ae0ed687038() {
        var _this = _super.call(this) || this;
        _this.fileReader = new FileReader();
        _this._queue = [];
        _this._processing = false;
        _this.fileReader.onload = function(evt) {
            _this._processing = false;
            if (evt.target) _this.emit("done", evt.target.result);
            _this.doNextTask();
        };
        _this.fileReader.onerror = function(evt) {
            $c25b565240b6a41d$exports.default.error("EncodingQueue error:", evt);
            _this._processing = false;
            _this.destroy();
            _this.emit("error", evt);
        };
        return _this;
    }
    Object.defineProperty($3ff0aafdb373378c$export$c6913ae0ed687038.prototype, "queue", {
        get: function() {
            return this._queue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3ff0aafdb373378c$export$c6913ae0ed687038.prototype, "size", {
        get: function() {
            return this.queue.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3ff0aafdb373378c$export$c6913ae0ed687038.prototype, "processing", {
        get: function() {
            return this._processing;
        },
        enumerable: false,
        configurable: true
    });
    $3ff0aafdb373378c$export$c6913ae0ed687038.prototype.enque = function(blob) {
        this.queue.push(blob);
        if (this.processing) return;
        this.doNextTask();
    };
    $3ff0aafdb373378c$export$c6913ae0ed687038.prototype.destroy = function() {
        this.fileReader.abort();
        this._queue = [];
    };
    $3ff0aafdb373378c$export$c6913ae0ed687038.prototype.doNextTask = function() {
        if (this.size === 0) return;
        if (this.processing) return;
        this._processing = true;
        this.fileReader.readAsArrayBuffer(this.queue.shift());
    };
    return $3ff0aafdb373378c$export$c6913ae0ed687038;
}($TdzfH$eventemitter3.EventEmitter);


var $92db9a3ba21db2a0$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $92db9a3ba21db2a0$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps a DataChannel between two Peers.
 */ var $92db9a3ba21db2a0$export$d365f7ad9d7df9c9 = /** @class */ function(_super) {
    $92db9a3ba21db2a0$var$__extends($92db9a3ba21db2a0$export$d365f7ad9d7df9c9, _super);
    function $92db9a3ba21db2a0$export$d365f7ad9d7df9c9(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this.stringify = JSON.stringify;
        _this.parse = JSON.parse;
        _this._buffer = [];
        _this._bufferSize = 0;
        _this._buffering = false;
        _this._chunkedData = {};
        _this._encodingQueue = new $3ff0aafdb373378c$exports.EncodingQueue();
        _this.connectionId = _this.options.connectionId || $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.ID_PREFIX + $6c02be62bb157391$export$7debb50ef11d5e0b.randomToken();
        _this.label = _this.options.label || _this.connectionId;
        _this.serialization = _this.options.serialization || $2f2cc37b22a0b29a$export$89f507cf986a947.Binary;
        _this.reliable = !!_this.options.reliable;
        _this._encodingQueue.on("done", function(ab) {
            _this._bufferedSend(ab);
        });
        _this._encodingQueue.on("error", function() {
            $c25b565240b6a41d$exports.default.error("DC#".concat(_this.connectionId, ": Error occured in encoding from blob to arraybuffer, close DC"));
            _this.close();
        });
        _this._negotiator = new $3b7b9afef381ead8$exports.Negotiator(_this);
        _this._negotiator.startConnection(_this.options._payload || {
            originator: true
        });
        return _this;
    }
    Object.defineProperty($92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype, "type", {
        get: function() {
            return $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype, "dataChannel", {
        get: function() {
            return this._dc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype, "bufferSize", {
        get: function() {
            return this._bufferSize;
        },
        enumerable: false,
        configurable: true
    });
    /** Called by the Negotiator when the DataChannel is ready. */ $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype.initialize = function(dc) {
        this._dc = dc;
        this._configureDataChannel();
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._configureDataChannel = function() {
        var _this = this;
        if (!$6c02be62bb157391$export$7debb50ef11d5e0b.supports.binaryBlob || $6c02be62bb157391$export$7debb50ef11d5e0b.supports.reliable) this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = function() {
            $c25b565240b6a41d$exports.default.log("DC#".concat(_this.connectionId, " dc connection success"));
            _this._open = true;
            _this.emit("open");
        };
        this.dataChannel.onmessage = function(e) {
            $c25b565240b6a41d$exports.default.log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
            _this._handleDataMessage(e);
        };
        this.dataChannel.onclose = function() {
            $c25b565240b6a41d$exports.default.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
            _this.close();
        };
    };
    // Handles a DataChannel message.
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._handleDataMessage = function(_a) {
        var _this = this;
        var data = _a.data;
        var datatype = data.constructor;
        var isBinarySerialization = this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.Binary || this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.BinaryUTF8;
        var deserializedData = data;
        if (isBinarySerialization) {
            if (datatype === Blob) {
                // Datatype should never be blob
                $6c02be62bb157391$export$7debb50ef11d5e0b.blobToArrayBuffer(data, function(ab) {
                    var unpackedData = $6c02be62bb157391$export$7debb50ef11d5e0b.unpack(ab);
                    _this.emit("data", unpackedData);
                });
                return;
            } else if (datatype === ArrayBuffer) deserializedData = $6c02be62bb157391$export$7debb50ef11d5e0b.unpack(data);
            else if (datatype === String) {
                // String fallback for binary data for browsers that don't support binary yet
                var ab1 = $6c02be62bb157391$export$7debb50ef11d5e0b.binaryStringToArrayBuffer(data);
                deserializedData = $6c02be62bb157391$export$7debb50ef11d5e0b.unpack(ab1);
            }
        } else if (this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.JSON) deserializedData = this.parse(data);
        // Check if we've chunked--if so, piece things back together.
        // We're guaranteed that this isn't 0.
        if (deserializedData.__peerData) {
            this._handleChunk(deserializedData);
            return;
        }
        _super.prototype.emit.call(this, "data", deserializedData);
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._handleChunk = function(data) {
        var id = data.__peerData;
        var chunkInfo = this._chunkedData[id] || {
            data: [],
            count: 0,
            total: data.total
        };
        chunkInfo.data[data.n] = data.data;
        chunkInfo.count++;
        this._chunkedData[id] = chunkInfo;
        if (chunkInfo.total === chunkInfo.count) {
            // Clean up before making the recursive call to `_handleDataMessage`.
            delete this._chunkedData[id];
            // We've received all the chunks--time to construct the complete data.
            var data_1 = new Blob(chunkInfo.data);
            this._handleDataMessage({
                data: data_1
            });
        }
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype.close = function() {
        this._buffer = [];
        this._bufferSize = 0;
        this._chunkedData = {};
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.dataChannel) {
            this.dataChannel.onopen = null;
            this.dataChannel.onmessage = null;
            this.dataChannel.onclose = null;
            this._dc = null;
        }
        if (this._encodingQueue) {
            this._encodingQueue.destroy();
            this._encodingQueue.removeAllListeners();
            this._encodingQueue = null;
        }
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, "close");
    };
    /** Allows user to send data. */ $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype.send = function(data, chunked) {
        if (!this.open) {
            _super.prototype.emit.call(this, "error", new Error("Connection is not open. You should listen for the `open` event before sending messages."));
            return;
        }
        if (this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.JSON) this._bufferedSend(this.stringify(data));
        else if (this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.Binary || this.serialization === $2f2cc37b22a0b29a$export$89f507cf986a947.BinaryUTF8) {
            var blob = $6c02be62bb157391$export$7debb50ef11d5e0b.pack(data);
            if (!chunked && blob.size > $6c02be62bb157391$export$7debb50ef11d5e0b.chunkedMTU) {
                this._sendChunks(blob);
                return;
            }
            if (!$6c02be62bb157391$export$7debb50ef11d5e0b.supports.binaryBlob) // We only do this if we really need to (e.g. blobs are not supported),
            // because this conversion is costly.
            this._encodingQueue.enque(blob);
            else this._bufferedSend(blob);
        } else this._bufferedSend(data);
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._bufferedSend = function(msg) {
        if (this._buffering || !this._trySend(msg)) {
            this._buffer.push(msg);
            this._bufferSize = this._buffer.length;
        }
    };
    // Returns true if the send succeeds.
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._trySend = function(msg) {
        var _this = this;
        if (!this.open) return false;
        if (this.dataChannel.bufferedAmount > $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.MAX_BUFFERED_AMOUNT) {
            this._buffering = true;
            setTimeout(function() {
                _this._buffering = false;
                _this._tryBuffer();
            }, 50);
            return false;
        }
        try {
            this.dataChannel.send(msg);
        } catch (e) {
            $c25b565240b6a41d$exports.default.error("DC#:".concat(this.connectionId, " Error when sending:"), e);
            this._buffering = true;
            this.close();
            return false;
        }
        return true;
    };
    // Try to send the first message in the buffer.
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._tryBuffer = function() {
        if (!this.open) return;
        if (this._buffer.length === 0) return;
        var msg = this._buffer[0];
        if (this._trySend(msg)) {
            this._buffer.shift();
            this._bufferSize = this._buffer.length;
            this._tryBuffer();
        }
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype._sendChunks = function(blob) {
        var e_1, _a;
        var blobs = $6c02be62bb157391$export$7debb50ef11d5e0b.chunk(blob);
        $c25b565240b6a41d$exports.default.log("DC#".concat(this.connectionId, " Try to send ").concat(blobs.length, " chunks..."));
        try {
            for(var blobs_1 = $92db9a3ba21db2a0$var$__values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()){
                var blob_1 = blobs_1_1.value;
                this.send(blob_1, true);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) _a.call(blobs_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.prototype.handleMessage = function(message) {
        var payload = message.payload;
        switch(message.type){
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Answer:
                this._negotiator.handleSDP(message.type, payload.sdp);
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                $c25b565240b6a41d$exports.default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
                break;
        }
    };
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.ID_PREFIX = "dc_";
    $92db9a3ba21db2a0$export$d365f7ad9d7df9c9.MAX_BUFFERED_AMOUNT = 8388608;
    return $92db9a3ba21db2a0$export$d365f7ad9d7df9c9;
}($816db5763b2092b1$exports.BaseConnection);



var $067535f02cda23a2$exports = {};

$parcel$export($067535f02cda23a2$exports, "API", () => $067535f02cda23a2$export$2c4e825dc9120f87, (v) => $067535f02cda23a2$export$2c4e825dc9120f87 = v);



var $067535f02cda23a2$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $067535f02cda23a2$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $067535f02cda23a2$export$2c4e825dc9120f87 = /** @class */ function() {
    function $067535f02cda23a2$export$2c4e825dc9120f87(_options) {
        this._options = _options;
    }
    $067535f02cda23a2$export$2c4e825dc9120f87.prototype._buildRequest = function(method) {
        var protocol = this._options.secure ? "https" : "http";
        var _a = this._options, host = _a.host, port = _a.port, path = _a.path, key = _a.key;
        var url = new URL("".concat(protocol, "://").concat(host, ":").concat(port).concat(path).concat(key, "/").concat(method));
        // TODO: Why timestamp, why random?
        url.searchParams.set("ts", "".concat(Date.now()).concat(Math.random()));
        url.searchParams.set("version", $059935620e5e661f$exports.version);
        return fetch(url.href, {
            referrerPolicy: this._options.referrerPolicy
        });
    };
    /** Get a unique ID from the server via XHR and initialize with it. */ $067535f02cda23a2$export$2c4e825dc9120f87.prototype.retrieveId = function() {
        return $067535f02cda23a2$var$__awaiter(this, void 0, Promise, function() {
            var response, error_1, pathError;
            return $067535f02cda23a2$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("id")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) throw new Error("Error. Status:".concat(response.status));
                        return [
                            2 /*return*/ ,
                            response.text()
                        ];
                    case 2:
                        error_1 = _a.sent();
                        $c25b565240b6a41d$exports.default.error("Error retrieving ID", error_1);
                        pathError = "";
                        if (this._options.path === "/" && this._options.host !== $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
                        throw new Error("Could not get an ID from the server." + pathError);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** @deprecated */ $067535f02cda23a2$export$2c4e825dc9120f87.prototype.listAllPeers = function() {
        return $067535f02cda23a2$var$__awaiter(this, void 0, Promise, function() {
            var response, helpfulError, error_2;
            return $067535f02cda23a2$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("peers")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            if (response.status === 401) {
                                helpfulError = "";
                                if (this._options.host === $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                                else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                                throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                            }
                            throw new Error("Error. Status:".concat(response.status));
                        }
                        return [
                            2 /*return*/ ,
                            response.json()
                        ];
                    case 2:
                        error_2 = _a.sent();
                        $c25b565240b6a41d$exports.default.error("Error retrieving list peers", error_2);
                        throw new Error("Could not get list peers from the server." + error_2);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    return $067535f02cda23a2$export$2c4e825dc9120f87;
}();


var $976f9b679211b81e$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $976f9b679211b81e$var$__assign = undefined && undefined.__assign || function() {
    $976f9b679211b81e$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $976f9b679211b81e$var$__assign.apply(this, arguments);
};
var $976f9b679211b81e$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $976f9b679211b81e$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $976f9b679211b81e$var$PeerOptions = /** @class */ function() {
    function PeerOptions() {}
    return PeerOptions;
}();
/**
 * A peer who can initiate connections with other peers.
 */ var $976f9b679211b81e$export$ecd1fc136c422448 = /** @class */ function(_super) {
    $976f9b679211b81e$var$__extends($976f9b679211b81e$export$ecd1fc136c422448, _super);
    function $976f9b679211b81e$export$ecd1fc136c422448(id1, options) {
        var _this = _super.call(this) || this;
        _this._id = null;
        _this._lastServerId = null;
        // States.
        _this._destroyed = false; // Connections have been killed
        _this._disconnected = false; // Connection to PeerServer killed but P2P connections still active
        _this._open = false; // Sockets and such are not yet open.
        _this._connections = new Map(); // All connections for this peer.
        _this._lostMessages = new Map(); // src => [list of messages]
        var userId;
        // Deal with overloading
        if (id1 && id1.constructor == Object) options = id1;
        else if (id1) userId = id1.toString();
        // Configurize options
        options = $976f9b679211b81e$var$__assign({
            debug: 0,
            host: $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_HOST,
            port: $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_PORT,
            path: "/",
            key: $976f9b679211b81e$export$ecd1fc136c422448.DEFAULT_KEY,
            token: $6c02be62bb157391$export$7debb50ef11d5e0b.randomToken(),
            config: $6c02be62bb157391$export$7debb50ef11d5e0b.defaultConfig,
            referrerPolicy: "strict-origin-when-cross-origin"
        }, options);
        _this._options = options;
        // Detect relative URL host.
        if (_this._options.host === "/") _this._options.host = window.location.hostname;
        // Set path correctly.
        if (_this._options.path) {
            if (_this._options.path[0] !== "/") _this._options.path = "/" + _this._options.path;
            if (_this._options.path[_this._options.path.length - 1] !== "/") _this._options.path += "/";
        }
        // Set whether we use SSL to same as current host
        if (_this._options.secure === undefined && _this._options.host !== $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = $6c02be62bb157391$export$7debb50ef11d5e0b.isSecure();
        else if (_this._options.host == $6c02be62bb157391$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = true;
        // Set a custom log function if present
        if (_this._options.logFunction) $c25b565240b6a41d$exports.default.setLogFunction(_this._options.logFunction);
        $c25b565240b6a41d$exports.default.logLevel = _this._options.debug || 0;
        _this._api = new $067535f02cda23a2$exports.API(options);
        _this._socket = _this._createServerConnection();
        // Sanity checks
        // Ensure WebRTC supported
        if (!$6c02be62bb157391$export$7debb50ef11d5e0b.supports.audioVideo && !$6c02be62bb157391$export$7debb50ef11d5e0b.supports.data) {
            _this._delayedAbort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.BrowserIncompatible, "The current browser does not support WebRTC");
            return _this;
        }
        // Ensure alphanumeric id
        if (!!userId && !$6c02be62bb157391$export$7debb50ef11d5e0b.validateId(userId)) {
            _this._delayedAbort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.InvalidID, "ID \"".concat(userId, "\" is invalid"));
            return _this;
        }
        if (userId) _this._initialize(userId);
        else _this._api.retrieveId().then(function(id) {
            return _this._initialize(id);
        }).catch(function(error) {
            return _this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.ServerError, error);
        });
        return _this;
    }
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "id", {
        /**
         * The brokering ID of this peer
         */ get: function() {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "options", {
        get: function() {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "open", {
        get: function() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "socket", {
        get: function() {
            return this._socket;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "connections", {
        /**
         * A hash of all connections associated with this peer, keyed by the remote peer's ID.
         * @deprecated
         * Return type will change from Object to Map<string,[]>
         */ get: function() {
            var e_1, _a;
            var plainConnections = Object.create(null);
            try {
                for(var _b = $976f9b679211b81e$var$__values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()){
                    var _d = $976f9b679211b81e$var$__read(_c.value, 2), k = _d[0], v = _d[1];
                    plainConnections[k] = v;
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            return plainConnections;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "destroyed", {
        /**
         * true if this peer and all of its connections can no longer be used.
         */ get: function() {
            return this._destroyed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($976f9b679211b81e$export$ecd1fc136c422448.prototype, "disconnected", {
        /**
         * false if there is an active connection to the PeerServer.
         */ get: function() {
            return this._disconnected;
        },
        enumerable: false,
        configurable: true
    });
    $976f9b679211b81e$export$ecd1fc136c422448.prototype._createServerConnection = function() {
        var _this = this;
        var socket = new $a86db8d850e55bcf$exports.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
        socket.on($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Message, function(data) {
            _this._handleMessage(data);
        });
        socket.on($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Error, function(error) {
            _this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.SocketError, error);
        });
        socket.on($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Disconnected, function() {
            if (_this.disconnected) return;
            _this.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.Network, "Lost connection to server.");
            _this.disconnect();
        });
        socket.on($2f2cc37b22a0b29a$export$3b5c4a4b6354f023.Close, function() {
            if (_this.disconnected) return;
            _this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.SocketClosed, "Underlying socket is already closed.");
        });
        return socket;
    };
    /** Initialize a connection with the server. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._initialize = function(id) {
        this._id = id;
        this.socket.start(id, this._options.token);
    };
    /** Handles messages from the server. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._handleMessage = function(message) {
        var e_2, _a;
        var type = message.type;
        var payload = message.payload;
        var peerId = message.src;
        switch(type){
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Open:
                this._lastServerId = this.id;
                this._open = true;
                this.emit("open", this.id);
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Error:
                this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.ServerError, payload.msg);
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.IdTaken:
                this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.UnavailableID, "ID \"".concat(this.id, "\" is taken"));
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.InvalidKey:
                this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.InvalidKey, "API KEY \"".concat(this._options.key, "\" is invalid"));
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Leave:
                $c25b565240b6a41d$exports.default.log("Received leave message from ".concat(peerId));
                this._cleanupPeer(peerId);
                this._connections.delete(peerId);
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Expire:
                this.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.PeerUnavailable, "Could not connect to peer ".concat(peerId));
                break;
            case $2f2cc37b22a0b29a$export$adb4a1754da6f10d.Offer:
                // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection) {
                    connection.close();
                    $c25b565240b6a41d$exports.default.warn("Offer received for existing Connection ID:".concat(connectionId));
                }
                // Create a new connection.
                if (payload.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Media) {
                    var mediaConnection = new $9b5cc8dbdd0aa809$exports.MediaConnection(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata
                    });
                    connection = mediaConnection;
                    this._addConnection(peerId, connection);
                    this.emit("call", mediaConnection);
                } else if (payload.type === $2f2cc37b22a0b29a$export$3157d57b4135e3bc.Data) {
                    var dataConnection = new $92db9a3ba21db2a0$exports.DataConnection(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata,
                        label: payload.label,
                        serialization: payload.serialization,
                        reliable: payload.reliable
                    });
                    connection = dataConnection;
                    this._addConnection(peerId, connection);
                    this.emit("connection", dataConnection);
                } else {
                    $c25b565240b6a41d$exports.default.warn("Received malformed connection type:".concat(payload.type));
                    return;
                }
                // Find messages.
                var messages = this._getMessages(connectionId);
                try {
                    for(var messages_1 = $976f9b679211b81e$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                        var message_1 = messages_1_1.value;
                        connection.handleMessage(message_1);
                    }
                } catch (e_2_1) {
                    e_2 = {
                        error: e_2_1
                    };
                } finally{
                    try {
                        if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                    } finally{
                        if (e_2) throw e_2.error;
                    }
                }
                break;
            default:
                if (!payload) {
                    $c25b565240b6a41d$exports.default.warn("You received a malformed message from ".concat(peerId, " of type ").concat(type));
                    return;
                }
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection && connection.peerConnection) // Pass it on.
                connection.handleMessage(message);
                else if (connectionId) // Store for possible later use
                this._storeMessage(connectionId, message);
                else $c25b565240b6a41d$exports.default.warn("You received an unrecognized message:", message);
                break;
        }
    };
    /** Stores messages without a set up connection, to be claimed later. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._storeMessage = function(connectionId, message) {
        if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
        this._lostMessages.get(connectionId).push(message);
    };
    /** Retrieve messages from lost message store */ //TODO Change it to private
    $976f9b679211b81e$export$ecd1fc136c422448.prototype._getMessages = function(connectionId) {
        var messages = this._lostMessages.get(connectionId);
        if (messages) {
            this._lostMessages.delete(connectionId);
            return messages;
        }
        return [];
    };
    /**
     * Connects to the remote peer specified by id and returns a data connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param options for specifying details about Peer Connection
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.connect = function(peer, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            $c25b565240b6a41d$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
            this.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        var dataConnection = new $92db9a3ba21db2a0$exports.DataConnection(peer, this, options);
        this._addConnection(peer, dataConnection);
        return dataConnection;
    };
    /**
     * Calls the remote peer specified by id and returns a media connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param stream The caller's media stream
     * @param options Metadata associated with the connection, passed in by whoever initiated the connection.
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.call = function(peer, stream, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            $c25b565240b6a41d$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
            this.emitError($2f2cc37b22a0b29a$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        if (!stream) {
            $c25b565240b6a41d$exports.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
            return;
        }
        var mediaConnection = new $9b5cc8dbdd0aa809$exports.MediaConnection(peer, this, $976f9b679211b81e$var$__assign($976f9b679211b81e$var$__assign({}, options), {
            _stream: stream
        }));
        this._addConnection(peer, mediaConnection);
        return mediaConnection;
    };
    /** Add a data/media connection to this peer. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._addConnection = function(peerId, connection) {
        $c25b565240b6a41d$exports.default.log("add connection ".concat(connection.type, ":").concat(connection.connectionId, " to peerId:").concat(peerId));
        if (!this._connections.has(peerId)) this._connections.set(peerId, []);
        this._connections.get(peerId).push(connection);
    };
    //TODO should be private
    $976f9b679211b81e$export$ecd1fc136c422448.prototype._removeConnection = function(connection) {
        var connections = this._connections.get(connection.peer);
        if (connections) {
            var index = connections.indexOf(connection);
            if (index !== -1) connections.splice(index, 1);
        }
        //remove from lost messages
        this._lostMessages.delete(connection.connectionId);
    };
    /** Retrieve a data/media connection for this peer. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.getConnection = function(peerId, connectionId) {
        var e_3, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return null;
        try {
            for(var connections_1 = $976f9b679211b81e$var$__values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()){
                var connection = connections_1_1.value;
                if (connection.connectionId === connectionId) return connection;
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (connections_1_1 && !connections_1_1.done && (_a = connections_1.return)) _a.call(connections_1);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        return null;
    };
    $976f9b679211b81e$export$ecd1fc136c422448.prototype._delayedAbort = function(type, message) {
        var _this = this;
        setTimeout(function() {
            _this._abort(type, message);
        }, 0);
    };
    /**
     * Emits an error message and destroys the Peer.
     * The Peer is not destroyed if it's in a disconnected state, in which case
     * it retains its disconnected state and its existing connections.
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._abort = function(type, message) {
        $c25b565240b6a41d$exports.default.error("Aborting!");
        this.emitError(type, message);
        if (!this._lastServerId) this.destroy();
        else this.disconnect();
    };
    /** Emits a typed error message. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.emitError = function(type, err) {
        $c25b565240b6a41d$exports.default.error("Error:", err);
        var error;
        if (typeof err === "string") error = new Error(err);
        else error = err;
        error.type = type;
        this.emit("error", error);
    };
    /**
     * Destroys the Peer: closes all active connections as well as the connection
     *  to the server.
     * Warning: The peer can no longer create or accept connections after being
     *  destroyed.
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.destroy = function() {
        if (this.destroyed) return;
        $c25b565240b6a41d$exports.default.log("Destroy peer with ID:".concat(this.id));
        this.disconnect();
        this._cleanup();
        this._destroyed = true;
        this.emit("close");
    };
    /** Disconnects every connection on this peer. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._cleanup = function() {
        var e_4, _a;
        try {
            for(var _b = $976f9b679211b81e$var$__values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()){
                var peerId = _c.value;
                this._cleanupPeer(peerId);
                this._connections.delete(peerId);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        this.socket.removeAllListeners();
    };
    /** Closes all connections to this peer. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype._cleanupPeer = function(peerId) {
        var e_5, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return;
        try {
            for(var connections_2 = $976f9b679211b81e$var$__values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()){
                var connection = connections_2_1.value;
                connection.close();
            }
        } catch (e_5_1) {
            e_5 = {
                error: e_5_1
            };
        } finally{
            try {
                if (connections_2_1 && !connections_2_1.done && (_a = connections_2.return)) _a.call(connections_2);
            } finally{
                if (e_5) throw e_5.error;
            }
        }
    };
    /**
     * Disconnects the Peer's connection to the PeerServer. Does not close any
     *  active connections.
     * Warning: The peer can no longer create or accept connections after being
     *  disconnected. It also cannot reconnect to the server.
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.disconnect = function() {
        if (this.disconnected) return;
        var currentId = this.id;
        $c25b565240b6a41d$exports.default.log("Disconnect peer with ID:".concat(currentId));
        this._disconnected = true;
        this._open = false;
        this.socket.close();
        this._lastServerId = currentId;
        this._id = null;
        this.emit("disconnected", currentId);
    };
    /** Attempts to reconnect with the same ID. */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.reconnect = function() {
        if (this.disconnected && !this.destroyed) {
            $c25b565240b6a41d$exports.default.log("Attempting reconnection to server with ID ".concat(this._lastServerId));
            this._disconnected = false;
            this._initialize(this._lastServerId);
        } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
        else if (!this.disconnected && !this.open) // Do nothing. We're still connecting the first time.
        $c25b565240b6a41d$exports.default.error("In a hurry? We're still trying to make the initial connection!");
        else throw new Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
    };
    /**
     * Get a list of available peer IDs. If you're running your own server, you'll
     * want to set allow_discovery: true in the PeerServer options. If you're using
     * the cloud server, email team@peerjs.com to get the functionality enabled for
     * your key.
     */ $976f9b679211b81e$export$ecd1fc136c422448.prototype.listAllPeers = function(cb) {
        var _this = this;
        if (cb === void 0) cb = function(_) {};
        this._api.listAllPeers().then(function(peers) {
            return cb(peers);
        }).catch(function(error) {
            return _this._abort($2f2cc37b22a0b29a$export$9547aaa2e39030ff.ServerError, error);
        });
    };
    $976f9b679211b81e$export$ecd1fc136c422448.DEFAULT_KEY = "peerjs";
    return $976f9b679211b81e$export$ecd1fc136c422448;
}($TdzfH$eventemitter3.EventEmitter);


var $f1d1a6b5c376b066$export$2e2bcd8739ae039 = $976f9b679211b81e$exports.Peer;


//# sourceMappingURL=bundler.cjs.map
