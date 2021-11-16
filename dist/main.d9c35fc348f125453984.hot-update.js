webpackHotUpdate("main",{

/***/ "./src/dashboard/Deposits.tsx":
/*!************************************!*\
  !*** ./src/dashboard/Deposits.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Deposits; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/kayvon/Dev/gpio-sandbox/src/dashboard/Deposits.tsx";




function preventDefault(event) {
  event.preventDefault();
}

const gpioRow = {
  top: [{
    id: 'pin1',
    name: 'pow3v3',
    state: 'out'
  }, {
    id: 'pin3',
    name: 'gpio 2',
    state: 'out'
  }, {
    id: 'pin5',
    name: 'gpio 3',
    state: 'out'
  }, {
    id: 'pin7',
    name: 'gpio 4',
    state: 'out'
  }, {
    id: 'pin9',
    name: 'gnd',
    state: 'out'
  }, {
    id: 'pin11',
    name: 'gpio 17',
    state: 'out'
  }, {
    id: 'pin13',
    name: 'gpio 27',
    state: 'out'
  }, {
    id: 'pin15',
    name: 'gpio 22',
    state: 'out'
  }, {
    id: 'pin17',
    name: 'pow3v3',
    state: 'out'
  }, {
    id: 'pin19',
    name: 'gpio 10',
    state: 'out'
  }, {
    id: 'pin21',
    name: 'gpio 9',
    state: 'out'
  }, {
    id: 'pin23',
    name: 'gpio 11',
    state: 'out'
  }, {
    id: 'pin25',
    name: 'gnd',
    state: 'out'
  }, {
    id: 'pin27',
    name: 'gpio 0',
    state: 'out'
  }, {
    id: 'pin29',
    name: 'gpio 5',
    state: 'out'
  }, {
    id: 'pin31',
    name: 'gpio 6',
    state: 'out'
  }, {
    id: 'pin33',
    name: 'gpio 13',
    state: 'out'
  }, {
    id: 'pin35',
    name: 'gpio 19',
    state: 'out'
  }, {
    id: 'pin37',
    name: 'gpio 26',
    state: 'out'
  }, {
    id: 'pin39',
    name: 'gnd',
    state: 'out'
  }],
  bottom: []
};
function Deposits() {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableContainer"], {
      component: _mui_material__WEBPACK_IMPORTED_MODULE_1__["Paper"],
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Table"], {
        sx: {
          width: '144px'
        },
        size: "small",
        "aria-label": "GPIO Pinout",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableBody"], {
          children: rows.map(row => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
            sx: {
              '&:last-child td, &:last-child th': {
                border: 0
              }
            },
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              component: "th",
              scope: "row",
              children: row.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 46,
              columnNumber: 17
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              align: "right",
              children: row.calories
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 49,
              columnNumber: 17
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              align: "right",
              children: row.fat
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 50,
              columnNumber: 17
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              align: "right",
              children: row.carbs
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 51,
              columnNumber: 17
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              align: "right",
              children: row.protein
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 52,
              columnNumber: 17
            }, this)]
          }, row.name, true, {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 15
          }, this))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
_c = Deposits;

var _c;

__webpack_require__.$Refresh$.register(_c, "Deposits");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.d9c35fc348f125453984.hot-update.js.map