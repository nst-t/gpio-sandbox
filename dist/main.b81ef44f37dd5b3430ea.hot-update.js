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
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/index.js");
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material */ "./node_modules/@mui/icons-material/esm/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/kayvon/Dev/gpio-sandbox/src/dashboard/Deposits.tsx";






function preventDefault(event) {
  event.preventDefault();
}

const gpio = [[{
  id: '1',
  name: 'pow3v3',
  state: null,
  type: 'ground'
}, {
  id: '2',
  name: 'pow5v',
  state: 'out',
  type: 'power'
}], [{
  id: '3',
  name: 'gpio 2',
  state: 'out',
  type: 'io'
}, {
  id: '4',
  name: 'pow5v',
  state: 'out',
  type: 'power'
}], [{
  id: '5',
  name: 'gpio 3',
  state: 'out',
  type: 'io'
}, {
  id: '6',
  name: 'gnd',
  state: 'out',
  type: 'ground'
}], [{
  id: '7',
  name: 'gpio 4',
  state: 'out',
  type: 'io'
}, {
  id: '8',
  name: 'gpio uart',
  state: 'out',
  type: 'io'
}], [{
  id: '9',
  name: 'gnd',
  state: null,
  type: 'ground'
}, {
  id: '10',
  name: 'gpio uart',
  state: 'out',
  type: 'io'
}], [{
  id: '11',
  name: 'gpio 17',
  state: 'out',
  type: 'io'
}, {
  id: '12',
  name: 'gpio pcm',
  state: 'out',
  type: 'io'
}], [{
  id: '13',
  name: 'gpio 27',
  state: 'out',
  type: 'io'
}, {
  id: '14',
  name: 'gnd',
  state: 'out',
  type: 'ground'
}], [{
  id: '15',
  name: 'gpio 22',
  state: 'out',
  type: 'io'
}, {
  id: '16',
  name: 'gpio',
  state: 'out',
  type: 'io'
}], [{
  id: '17',
  name: 'pow3v3',
  state: null,
  type: 'power'
}, {
  id: '18',
  name: 'gpio',
  state: 'out',
  type: 'io'
}], [{
  id: '19',
  name: 'gpio 10',
  state: 'out',
  type: 'io'
}, {
  id: '20',
  name: 'gnd',
  state: 'out',
  type: 'io'
}], [{
  id: '21',
  name: 'gpio 9',
  state: 'out',
  type: 'io'
}, {
  id: '22',
  name: 'gpio',
  state: 'out',
  type: 'io'
}], [{
  id: '23',
  name: 'gpio 11',
  state: 'out',
  type: 'io'
}, {
  id: '24',
  name: 'gpio spi',
  state: 'out',
  type: 'io'
}], [{
  id: '25',
  name: 'gnd',
  state: null,
  type: 'ground'
}, {
  id: '26',
  name: 'gpio spi',
  state: 'out',
  type: 'io'
}], [{
  id: '27',
  name: 'gpio 0',
  state: 'out',
  type: 'io'
}, {
  id: '28',
  name: 'gpio i2c',
  state: 'out',
  type: 'io'
}], [{
  id: '29',
  name: 'gpio 5',
  state: 'out',
  type: 'io'
}, {
  id: '30',
  name: 'gnd',
  state: 'out',
  type: 'ground'
}], [{
  id: '31',
  name: 'gpio 6',
  state: 'out',
  type: 'io'
}, {
  id: '32',
  name: 'gpio',
  state: 'out',
  type: 'io'
}], [{
  id: '33',
  name: 'gpio 13',
  state: 'out',
  type: 'io'
}, {
  id: '34',
  name: 'gnd',
  state: 'out',
  type: 'ground'
}], [{
  id: '35',
  name: 'gpio 19',
  state: 'out',
  type: 'io'
}, {
  id: '36',
  name: 'gpio',
  state: 'out',
  type: 'io'
}], [{
  id: '37',
  name: 'gpio 26',
  state: 'out',
  type: 'io'
}, {
  id: '38',
  name: 'gpio pcm',
  state: 'out',
  type: 'io'
}], [{
  id: '39',
  name: 'gnd',
  state: null,
  type: 'ground'
}, {
  id: '40',
  name: 'gpio pcm',
  state: 'out',
  type: 'io'
}]];
const PinIcon = Object(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__["styled"])(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__["CircleTwoTone"])({});
function Deposits() {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableContainer"], {
      component: _mui_material__WEBPACK_IMPORTED_MODULE_1__["Paper"],
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Table"], {
        size: "small",
        "aria-label": "GPIO Pinout",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableBody"], {
          children: gpio.map(row => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
            sx: {
              '&:last-child td, &:last-child th': {
                border: 0
              }
            },
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              component: "td",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
                fontSize: 10,
                children: row[0].name
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 53,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 52,
              columnNumber: 15
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              sx: {
                borderRight: 1,
                backgroundColor: 'background'
              },
              align: "right",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(PinIcon, {
                type: row[0].type
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 55,
                columnNumber: 95
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 15
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              align: "left",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(PinIcon, {
                type: row[0].type
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 56,
                columnNumber: 39
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 56,
              columnNumber: 15
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
              component: "td",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
                fontSize: 10,
                children: row[1].name
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 58,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 57,
              columnNumber: 15
            }, this)]
          }, `${row[0].id}:${row[1].id}`, true, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 13
          }, this))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 7
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 21
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
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
//# sourceMappingURL=main.b81ef44f37dd5b3430ea.hot-update.js.map