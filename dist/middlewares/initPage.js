'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var options, result, hooks, pageOption, browser, page, view, html, url, type, isSetRequestInterception, interceptedRequest;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('middleware: initPage');

            options = ctx.options, result = ctx.result;
            hooks = options.hooks, pageOption = options.pageOption;
            _context.next = 5;
            return ctx.getBrowser();

          case 5:
            browser = _context.sent;
            _context.t0 = hooks.beforeCreatePage;

            if (!_context.t0) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return hooks.beforeCreatePage(browser, ctx);

          case 10:
            _context.next = 12;
            return browser.newPage();

          case 12:
            page = _context.sent;
            _context.t1 = hooks.afterCreatePage;

            if (!_context.t1) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return hooks.afterCreatePage(page, browser, ctx);

          case 17:
            view = options.view, html = options.html, url = options.url, type = options.type, isSetRequestInterception = options.isSetRequestInterception, interceptedRequest = options.interceptedRequest;
            _context.next = 20;
            return page.setRequestInterception(isSetRequestInterception);

          case 20:

            // 用于拦截一些请求
            if ((0, _lodash.isFunction)(interceptedRequest)) {
              page.on('request', interceptedRequest);
            }

            page.on('requestfailed', function (interceptedRequest) {
              result.requestError.push({
                url: interceptedRequest.url(),
                errorText: interceptedRequest.failure().errorText
              });
            });

            page.on('pageerror', function (err) {
              result.pageError = err;
            });

            page.on('load', function () {
              next();
            });

            ctx.browser = browser;
            ctx.page = page;

            if ((0, _lodash.isEmpty)(view)) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return page.setViewport(view);

          case 29:
            if (!(type === 'html')) {
              _context.next = 34;
              break;
            }

            _context.next = 32;
            return page.setContent(html);

          case 32:
            _context.next = 40;
            break;

          case 34:
            if (!(type === 'url')) {
              _context.next = 39;
              break;
            }

            _context.next = 37;
            return page.goto(url, pageOption);

          case 37:
            _context.next = 40;
            break;

          case 39:
            throw new Error('unknown type: ' + type);

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports.default;