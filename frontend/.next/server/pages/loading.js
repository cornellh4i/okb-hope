"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/loading";
exports.ids = ["pages/loading"];
exports.modules = {

/***/ "./src/pages/loading.tsx":
/*!*******************************!*\
  !*** ./src/pages/loading.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Loading)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Loading() {\n    const [isFirstLoad, setIsFirstLoad] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // New state to manage the loading display\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (window.location.search.includes(\"init=true\")) {\n            // On initial load, the page will be blank. Perform actions then reload.\n            window.history.replaceState(null, \"\", \"/loading\"); // Clean the URL to remove query parameters\n            window.location.reload(); // Force reload\n        } else {\n            // After reloading, setIsFirstLoad to false to show the \"Loading...\" text\n            setIsFirstLoad(false); // This changes the state to render the \"Loading...\" message\n            setTimeout(()=>router.replace(\"/\"), 1000);\n        }\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            display: \"flex\",\n            justifyContent: \"center\",\n            alignItems: \"center\",\n            height: \"100vh\"\n        },\n        children: [\n            !isFirstLoad && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"/Users/sese/Desktop/OKB-HOPE/okb-hope/frontend/src/pages/loading.tsx\",\n                lineNumber: 22,\n                columnNumber: 24\n            }, this),\n            \" \"\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sese/Desktop/OKB-HOPE/okb-hope/frontend/src/pages/loading.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvbG9hZGluZy50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNEM7QUFDSjtBQUV6QixTQUFTRyxVQUFVO0lBQ2hDLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHSiwrQ0FBUUEsQ0FBQyxJQUFJLEdBQUcsMENBQTBDO0lBQ2hHLE1BQU1LLFNBQVNKLHNEQUFTQTtJQUV4QkYsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLElBQUlPLE9BQU9DLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUMsY0FBYztZQUNoRCx3RUFBd0U7WUFDeEVILE9BQU9JLE9BQU8sQ0FBQ0MsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLGFBQWEsMkNBQTJDO1lBQzlGTCxPQUFPQyxRQUFRLENBQUNLLE1BQU0sSUFBSSxlQUFlO1FBQzNDLE9BQU87WUFDTCx5RUFBeUU7WUFDekVSLGVBQWUsS0FBSyxHQUFHLDREQUE0RDtZQUNuRlMsV0FBVyxJQUFNUixPQUFPUyxPQUFPLENBQUMsTUFBTTtRQUN4QyxDQUFDO0lBQ0gsR0FBRztRQUFDVDtLQUFPO0lBRVgscUJBQ0UsOERBQUNVO1FBQUlDLE9BQU87WUFBRUMsU0FBUztZQUFRQyxnQkFBZ0I7WUFBVUMsWUFBWTtZQUFVQyxRQUFRO1FBQVE7O1lBQzVGLENBQUNqQiw2QkFBZSw4REFBQ2tCOzBCQUFFOzs7Ozs7WUFBZTs7Ozs7OztBQUd6QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvbG9hZGluZy50c3g/M2Y4NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9hZGluZygpIHtcbiAgY29uc3QgW2lzRmlyc3RMb2FkLCBzZXRJc0ZpcnN0TG9hZF0gPSB1c2VTdGF0ZSh0cnVlKTsgLy8gTmV3IHN0YXRlIHRvIG1hbmFnZSB0aGUgbG9hZGluZyBkaXNwbGF5XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoXCJpbml0PXRydWVcIikpIHtcbiAgICAgIC8vIE9uIGluaXRpYWwgbG9hZCwgdGhlIHBhZ2Ugd2lsbCBiZSBibGFuay4gUGVyZm9ybSBhY3Rpb25zIHRoZW4gcmVsb2FkLlxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCAnL2xvYWRpbmcnKTsgLy8gQ2xlYW4gdGhlIFVSTCB0byByZW1vdmUgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAvLyBGb3JjZSByZWxvYWRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWZ0ZXIgcmVsb2FkaW5nLCBzZXRJc0ZpcnN0TG9hZCB0byBmYWxzZSB0byBzaG93IHRoZSBcIkxvYWRpbmcuLi5cIiB0ZXh0XG4gICAgICBzZXRJc0ZpcnN0TG9hZChmYWxzZSk7IC8vIFRoaXMgY2hhbmdlcyB0aGUgc3RhdGUgdG8gcmVuZGVyIHRoZSBcIkxvYWRpbmcuLi5cIiBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJvdXRlci5yZXBsYWNlKCcvJyksIDEwMDApO1xuICAgIH1cbiAgfSwgW3JvdXRlcl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMHZoJyB9fT5cbiAgICAgIHshaXNGaXJzdExvYWQgJiYgPHA+TG9hZGluZy4uLjwvcD59IHsvKiBDb25kaXRpb25hbGx5IHJlbmRlciB0aGUgXCJMb2FkaW5nLi4uXCIgbWVzc2FnZSAqL31cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkxvYWRpbmciLCJpc0ZpcnN0TG9hZCIsInNldElzRmlyc3RMb2FkIiwicm91dGVyIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJpbmNsdWRlcyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJyZWxvYWQiLCJzZXRUaW1lb3V0IiwicmVwbGFjZSIsImRpdiIsInN0eWxlIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImhlaWdodCIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/loading.tsx\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/loading.tsx"));
module.exports = __webpack_exports__;

})();