// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {};
    var methods = [
        "assert",
        "clear",
        "count",
        "debug",
        "dir",
        "dirxml",
        "error",
        "exception",
        "group",
        "groupCollapsed",
        "groupEnd",
        "info",
        "log",
        "markTimeline",
        "profile",
        "profileEnd",
        "table",
        "time",
        "timeEnd",
        "timeline",
        "timelineEnd",
        "timeStamp",
        "trace",
        "warn",
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

// Place any jQuery/helper plugins in here.

/*!
 * The Final Countdown for jQuery v2.0.4 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2014 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (a) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : a(jQuery);
})(function (a) {
    "use strict";
    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g))
            return (
                String(a).match(/^[0-9]*$/) && (a = Number(a)),
                String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
                new Date(a)
            );
        throw new Error("Couldn't cast `" + a + "` to a date object.");
    }
    function c(a) {
        return function (b) {
            var c = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (c)
                for (var e = 0, f = c.length; f > e; ++e) {
                    var g = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        i = new RegExp(g[0]),
                        j = g[1] || "",
                        k = g[3] || "",
                        l = null;
                    (g = g[2]),
                        h.hasOwnProperty(g) && ((l = h[g]), (l = Number(a[l]))),
                        null !== l &&
                            ("!" === j && (l = d(k, l)),
                            "" === j && 10 > l && (l = "0" + l.toString()),
                            (b = b.replace(i, l.toString())));
                }
            return (b = b.replace(/%%/, "%"));
        };
    }
    function d(a, b) {
        var c = "s",
            d = "";
        return (
            a &&
                ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
                1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
            1 === Math.abs(b) ? d : c
        );
    }
    var e = 100,
        f = [],
        g = [];
    g.push(/^[0-9]*$/.source),
        g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
        g.push(
            /[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source
        ),
        (g = new RegExp(g.join("|")));
    var h = {
            Y: "years",
            m: "months",
            w: "weeks",
            d: "days",
            D: "totalDays",
            H: "hours",
            M: "minutes",
            S: "seconds",
        },
        i = function (b, c, d) {
            (this.el = b),
                (this.$el = a(b)),
                (this.interval = null),
                (this.offset = {}),
                (this.instanceNumber = f.length),
                f.push(this),
                this.$el.data("countdown-instance", this.instanceNumber),
                d &&
                    (this.$el.on("update.countdown", d),
                    this.$el.on("stoped.countdown", d),
                    this.$el.on("finish.countdown", d)),
                this.setFinalDate(c),
                this.start();
        };
    a.extend(i.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(),
                (this.interval = setInterval(function () {
                    a.update.call(a);
                }, e));
        },
        stop: function () {
            clearInterval(this.interval),
                (this.interval = null),
                this.dispatchEvent("stoped");
        },
        pause: function () {
            this.stop.call(this);
        },
        resume: function () {
            this.start.call(this);
        },
        remove: function () {
            this.stop(),
                (f[this.instanceNumber] = null),
                delete this.$el.data().countdownInstance;
        },
        setFinalDate: function (a) {
            this.finalDate = b(a);
        },
        update: function () {
            return 0 === this.$el.closest("html").length
                ? void this.remove()
                : ((this.totalSecsLeft =
                      this.finalDate.getTime() - new Date().getTime()),
                  (this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3)),
                  (this.totalSecsLeft =
                      this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft),
                  (this.offset = {
                      seconds: this.totalSecsLeft % 60,
                      minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                      hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                      days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                      totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                      weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                      months: Math.floor(
                          this.totalSecsLeft / 60 / 60 / 24 / 30
                      ),
                      years: Math.floor(
                          this.totalSecsLeft / 60 / 60 / 24 / 365
                      ),
                  }),
                  void (0 === this.totalSecsLeft
                      ? (this.stop(), this.dispatchEvent("finish"))
                      : this.dispatchEvent("update")));
        },
        dispatchEvent: function (b) {
            var d = a.Event(b + ".countdown");
            (d.finalDate = this.finalDate),
                (d.offset = a.extend({}, this.offset)),
                (d.strftime = c(this.offset)),
                this.$el.trigger(d);
        },
    }),
        (a.fn.countdown = function () {
            var b = Array.prototype.slice.call(arguments, 0);
            return this.each(function () {
                var c = a(this).data("countdown-instance");
                if (void 0 !== c) {
                    var d = f[c],
                        e = b[0];
                    i.prototype.hasOwnProperty(e)
                        ? d[e].apply(d, b.slice(1))
                        : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
                        ? (d.setFinalDate.call(d, e), d.start())
                        : a.error(
                              "Method %s does not exist on jQuery.countdown".replace(
                                  /\%s/gi,
                                  e
                              )
                          );
                } else new i(this, b[0], b[1]);
            });
        });
});

/*! jQuery UI - v1.11.4 - 2015-12-03
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, button.js, slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : e(jQuery);
})(function (e) {
    function t(t, s) {
        var n,
            a,
            o,
            r = t.nodeName.toLowerCase();
        return "area" === r
            ? ((n = t.parentNode),
              (a = n.name),
              t.href && a && "map" === n.nodeName.toLowerCase()
                  ? ((o = e("img[usemap='#" + a + "']")[0]), !!o && i(o))
                  : !1)
            : (/^(input|select|textarea|button|object)$/.test(r)
                  ? !t.disabled
                  : "a" === r
                  ? t.href || s
                  : s) && i(t);
    }
    function i(t) {
        return (
            e.expr.filters.visible(t) &&
            !e(t)
                .parents()
                .addBack()
                .filter(function () {
                    return "hidden" === e.css(this, "visibility");
                }).length
        );
    }
    (e.ui = e.ui || {}),
        e.extend(e.ui, {
            version: "1.11.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38,
            },
        }),
        e.fn.extend({
            scrollParent: function (t) {
                var i = this.css("position"),
                    s = "absolute" === i,
                    n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    a = this.parents()
                        .filter(function () {
                            var t = e(this);
                            return s && "static" === t.css("position")
                                ? !1
                                : n.test(
                                      t.css("overflow") +
                                          t.css("overflow-y") +
                                          t.css("overflow-x")
                                  );
                        })
                        .eq(0);
                return "fixed" !== i && a.length
                    ? a
                    : e(this[0].ownerDocument || document);
            },
            uniqueId: (function () {
                var e = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++e);
                    });
                };
            })(),
            removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
                });
            },
        }),
        e.extend(e.expr[":"], {
            data: e.expr.createPseudo
                ? e.expr.createPseudo(function (t) {
                      return function (i) {
                          return !!e.data(i, t);
                      };
                  })
                : function (t, i, s) {
                      return !!e.data(t, s[3]);
                  },
            focusable: function (i) {
                return t(i, !isNaN(e.attr(i, "tabindex")));
            },
            tabbable: function (i) {
                var s = e.attr(i, "tabindex"),
                    n = isNaN(s);
                return (n || s >= 0) && t(i, !n);
            },
        }),
        e("<a>").outerWidth(1).jquery ||
            e.each(["Width", "Height"], function (t, i) {
                function s(t, i, s, a) {
                    return (
                        e.each(n, function () {
                            (i -= parseFloat(e.css(t, "padding" + this)) || 0),
                                s &&
                                    (i -=
                                        parseFloat(
                                            e.css(t, "border" + this + "Width")
                                        ) || 0),
                                a &&
                                    (i -=
                                        parseFloat(e.css(t, "margin" + this)) ||
                                        0);
                        }),
                        i
                    );
                }
                var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                    a = i.toLowerCase(),
                    o = {
                        innerWidth: e.fn.innerWidth,
                        innerHeight: e.fn.innerHeight,
                        outerWidth: e.fn.outerWidth,
                        outerHeight: e.fn.outerHeight,
                    };
                (e.fn["inner" + i] = function (t) {
                    return void 0 === t
                        ? o["inner" + i].call(this)
                        : this.each(function () {
                              e(this).css(a, s(this, t) + "px");
                          });
                }),
                    (e.fn["outer" + i] = function (t, n) {
                        return "number" != typeof t
                            ? o["outer" + i].call(this, t)
                            : this.each(function () {
                                  e(this).css(a, s(this, t, !0, n) + "px");
                              });
                    });
            }),
        e.fn.addBack ||
            (e.fn.addBack = function (e) {
                return this.add(
                    null == e ? this.prevObject : this.prevObject.filter(e)
                );
            }),
        e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
            (e.fn.removeData = (function (t) {
                return function (i) {
                    return arguments.length
                        ? t.call(this, e.camelCase(i))
                        : t.call(this);
                };
            })(e.fn.removeData)),
        (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
        e.fn.extend({
            focus: (function (t) {
                return function (i, s) {
                    return "number" == typeof i
                        ? this.each(function () {
                              var t = this;
                              setTimeout(function () {
                                  e(t).focus(), s && s.call(t);
                              }, i);
                          })
                        : t.apply(this, arguments);
                };
            })(e.fn.focus),
            disableSelection: (function () {
                var e =
                    "onselectstart" in document.createElement("div")
                        ? "selectstart"
                        : "mousedown";
                return function () {
                    return this.bind(e + ".ui-disableSelection", function (e) {
                        e.preventDefault();
                    });
                };
            })(),
            enableSelection: function () {
                return this.unbind(".ui-disableSelection");
            },
            zIndex: function (t) {
                if (void 0 !== t) return this.css("zIndex", t);
                if (this.length)
                    for (
                        var i, s, n = e(this[0]);
                        n.length && n[0] !== document;

                    ) {
                        if (
                            ((i = n.css("position")),
                            ("absolute" === i ||
                                "relative" === i ||
                                "fixed" === i) &&
                                ((s = parseInt(n.css("zIndex"), 10)),
                                !isNaN(s) && 0 !== s))
                        )
                            return s;
                        n = n.parent();
                    }
                return 0;
            },
        }),
        (e.ui.plugin = {
            add: function (t, i, s) {
                var n,
                    a = e.ui[t].prototype;
                for (n in s)
                    (a.plugins[n] = a.plugins[n] || []),
                        a.plugins[n].push([i, s[n]]);
            },
            call: function (e, t, i, s) {
                var n,
                    a = e.plugins[t];
                if (
                    a &&
                    (s ||
                        (e.element[0].parentNode &&
                            11 !== e.element[0].parentNode.nodeType))
                )
                    for (n = 0; a.length > n; n++)
                        e.options[a[n][0]] && a[n][1].apply(e.element, i);
            },
        });
    var s = 0,
        n = Array.prototype.slice;
    (e.cleanData = (function (t) {
        return function (i) {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++)
                try {
                    (s = e._data(n, "events")),
                        s && s.remove && e(n).triggerHandler("remove");
                } catch (o) {}
            t(i);
        };
    })(e.cleanData)),
        (e.widget = function (t, i, s) {
            var n,
                a,
                o,
                r,
                h = {},
                l = t.split(".")[0];
            return (
                (t = t.split(".")[1]),
                (n = l + "-" + t),
                s || ((s = i), (i = e.Widget)),
                (e.expr[":"][n.toLowerCase()] = function (t) {
                    return !!e.data(t, n);
                }),
                (e[l] = e[l] || {}),
                (a = e[l][t]),
                (o = e[l][t] =
                    function (e, t) {
                        return this._createWidget
                            ? (arguments.length && this._createWidget(e, t),
                              void 0)
                            : new o(e, t);
                    }),
                e.extend(o, a, {
                    version: s.version,
                    _proto: e.extend({}, s),
                    _childConstructors: [],
                }),
                (r = new i()),
                (r.options = e.widget.extend({}, r.options)),
                e.each(s, function (t, s) {
                    return e.isFunction(s)
                        ? ((h[t] = (function () {
                              var e = function () {
                                      return i.prototype[t].apply(
                                          this,
                                          arguments
                                      );
                                  },
                                  n = function (e) {
                                      return i.prototype[t].apply(this, e);
                                  };
                              return function () {
                                  var t,
                                      i = this._super,
                                      a = this._superApply;
                                  return (
                                      (this._super = e),
                                      (this._superApply = n),
                                      (t = s.apply(this, arguments)),
                                      (this._super = i),
                                      (this._superApply = a),
                                      t
                                  );
                              };
                          })()),
                          void 0)
                        : ((h[t] = s), void 0);
                }),
                (o.prototype = e.widget.extend(
                    r,
                    { widgetEventPrefix: a ? r.widgetEventPrefix || t : t },
                    h,
                    {
                        constructor: o,
                        namespace: l,
                        widgetName: t,
                        widgetFullName: n,
                    }
                )),
                a
                    ? (e.each(a._childConstructors, function (t, i) {
                          var s = i.prototype;
                          e.widget(
                              s.namespace + "." + s.widgetName,
                              o,
                              i._proto
                          );
                      }),
                      delete a._childConstructors)
                    : i._childConstructors.push(o),
                e.widget.bridge(t, o),
                o
            );
        }),
        (e.widget.extend = function (t) {
            for (
                var i, s, a = n.call(arguments, 1), o = 0, r = a.length;
                r > o;
                o++
            )
                for (i in a[o])
                    (s = a[o][i]),
                        a[o].hasOwnProperty(i) &&
                            void 0 !== s &&
                            (t[i] = e.isPlainObject(s)
                                ? e.isPlainObject(t[i])
                                    ? e.widget.extend({}, t[i], s)
                                    : e.widget.extend({}, s)
                                : s);
            return t;
        }),
        (e.widget.bridge = function (t, i) {
            var s = i.prototype.widgetFullName || t;
            e.fn[t] = function (a) {
                var o = "string" == typeof a,
                    r = n.call(arguments, 1),
                    h = this;
                return (
                    o
                        ? this.each(function () {
                              var i,
                                  n = e.data(this, s);
                              return "instance" === a
                                  ? ((h = n), !1)
                                  : n
                                  ? e.isFunction(n[a]) && "_" !== a.charAt(0)
                                      ? ((i = n[a].apply(n, r)),
                                        i !== n && void 0 !== i
                                            ? ((h =
                                                  i && i.jquery
                                                      ? h.pushStack(i.get())
                                                      : i),
                                              !1)
                                            : void 0)
                                      : e.error(
                                            "no such method '" +
                                                a +
                                                "' for " +
                                                t +
                                                " widget instance"
                                        )
                                  : e.error(
                                        "cannot call methods on " +
                                            t +
                                            " prior to initialization; " +
                                            "attempted to call method '" +
                                            a +
                                            "'"
                                    );
                          })
                        : (r.length &&
                              (a = e.widget.extend.apply(null, [a].concat(r))),
                          this.each(function () {
                              var t = e.data(this, s);
                              t
                                  ? (t.option(a || {}), t._init && t._init())
                                  : e.data(this, s, new i(a, this));
                          })),
                    h
                );
            };
        }),
        (e.Widget = function () {}),
        (e.Widget._childConstructors = []),
        (e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: { disabled: !1, create: null },
            _createWidget: function (t, i) {
                (i = e(i || this.defaultElement || this)[0]),
                    (this.element = e(i)),
                    (this.uuid = s++),
                    (this.eventNamespace = "." + this.widgetName + this.uuid),
                    (this.bindings = e()),
                    (this.hoverable = e()),
                    (this.focusable = e()),
                    i !== this &&
                        (e.data(i, this.widgetFullName, this),
                        this._on(!0, this.element, {
                            remove: function (e) {
                                e.target === i && this.destroy();
                            },
                        }),
                        (this.document = e(
                            i.style ? i.ownerDocument : i.document || i
                        )),
                        (this.window = e(
                            this.document[0].defaultView ||
                                this.document[0].parentWindow
                        ))),
                    (this.options = e.widget.extend(
                        {},
                        this.options,
                        this._getCreateOptions(),
                        t
                    )),
                    this._create(),
                    this._trigger("create", null, this._getCreateEventData()),
                    this._init();
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function () {
                this._destroy(),
                    this.element
                        .unbind(this.eventNamespace)
                        .removeData(this.widgetFullName)
                        .removeData(e.camelCase(this.widgetFullName)),
                    this.widget()
                        .unbind(this.eventNamespace)
                        .removeAttr("aria-disabled")
                        .removeClass(
                            this.widgetFullName +
                                "-disabled " +
                                "ui-state-disabled"
                        ),
                    this.bindings.unbind(this.eventNamespace),
                    this.hoverable.removeClass("ui-state-hover"),
                    this.focusable.removeClass("ui-state-focus");
            },
            _destroy: e.noop,
            widget: function () {
                return this.element;
            },
            option: function (t, i) {
                var s,
                    n,
                    a,
                    o = t;
                if (0 === arguments.length)
                    return e.widget.extend({}, this.options);
                if ("string" == typeof t)
                    if (
                        ((o = {}),
                        (s = t.split(".")),
                        (t = s.shift()),
                        s.length)
                    ) {
                        for (
                            n = o[t] = e.widget.extend({}, this.options[t]),
                                a = 0;
                            s.length - 1 > a;
                            a++
                        )
                            (n[s[a]] = n[s[a]] || {}), (n = n[s[a]]);
                        if (((t = s.pop()), 1 === arguments.length))
                            return void 0 === n[t] ? null : n[t];
                        n[t] = i;
                    } else {
                        if (1 === arguments.length)
                            return void 0 === this.options[t]
                                ? null
                                : this.options[t];
                        o[t] = i;
                    }
                return this._setOptions(o), this;
            },
            _setOptions: function (e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this;
            },
            _setOption: function (e, t) {
                return (
                    (this.options[e] = t),
                    "disabled" === e &&
                        (this.widget().toggleClass(
                            this.widgetFullName + "-disabled",
                            !!t
                        ),
                        t &&
                            (this.hoverable.removeClass("ui-state-hover"),
                            this.focusable.removeClass("ui-state-focus"))),
                    this
                );
            },
            enable: function () {
                return this._setOptions({ disabled: !1 });
            },
            disable: function () {
                return this._setOptions({ disabled: !0 });
            },
            _on: function (t, i, s) {
                var n,
                    a = this;
                "boolean" != typeof t && ((s = i), (i = t), (t = !1)),
                    s
                        ? ((i = n = e(i)),
                          (this.bindings = this.bindings.add(i)))
                        : ((s = i), (i = this.element), (n = this.widget())),
                    e.each(s, function (s, o) {
                        function r() {
                            return t ||
                                (a.options.disabled !== !0 &&
                                    !e(this).hasClass("ui-state-disabled"))
                                ? ("string" == typeof o ? a[o] : o).apply(
                                      a,
                                      arguments
                                  )
                                : void 0;
                        }
                        "string" != typeof o &&
                            (r.guid = o.guid = o.guid || r.guid || e.guid++);
                        var h = s.match(/^([\w:-]*)\s*(.*)$/),
                            l = h[1] + a.eventNamespace,
                            u = h[2];
                        u ? n.delegate(u, l, r) : i.bind(l, r);
                    });
            },
            _off: function (t, i) {
                (i =
                    (i || "").split(" ").join(this.eventNamespace + " ") +
                    this.eventNamespace),
                    t.unbind(i).undelegate(i),
                    (this.bindings = e(this.bindings.not(t).get())),
                    (this.focusable = e(this.focusable.not(t).get())),
                    (this.hoverable = e(this.hoverable.not(t).get()));
            },
            _delay: function (e, t) {
                function i() {
                    return ("string" == typeof e ? s[e] : e).apply(
                        s,
                        arguments
                    );
                }
                var s = this;
                return setTimeout(i, t || 0);
            },
            _hoverable: function (t) {
                (this.hoverable = this.hoverable.add(t)),
                    this._on(t, {
                        mouseenter: function (t) {
                            e(t.currentTarget).addClass("ui-state-hover");
                        },
                        mouseleave: function (t) {
                            e(t.currentTarget).removeClass("ui-state-hover");
                        },
                    });
            },
            _focusable: function (t) {
                (this.focusable = this.focusable.add(t)),
                    this._on(t, {
                        focusin: function (t) {
                            e(t.currentTarget).addClass("ui-state-focus");
                        },
                        focusout: function (t) {
                            e(t.currentTarget).removeClass("ui-state-focus");
                        },
                    });
            },
            _trigger: function (t, i, s) {
                var n,
                    a,
                    o = this.options[t];
                if (
                    ((s = s || {}),
                    (i = e.Event(i)),
                    (i.type = (
                        t === this.widgetEventPrefix
                            ? t
                            : this.widgetEventPrefix + t
                    ).toLowerCase()),
                    (i.target = this.element[0]),
                    (a = i.originalEvent))
                )
                    for (n in a) n in i || (i[n] = a[n]);
                return (
                    this.element.trigger(i, s),
                    !(
                        (e.isFunction(o) &&
                            o.apply(this.element[0], [i].concat(s)) === !1) ||
                        i.isDefaultPrevented()
                    )
                );
            },
        }),
        e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) {
            e.Widget.prototype["_" + t] = function (s, n, a) {
                "string" == typeof n && (n = { effect: n });
                var o,
                    r = n
                        ? n === !0 || "number" == typeof n
                            ? i
                            : n.effect || i
                        : t;
                (n = n || {}),
                    "number" == typeof n && (n = { duration: n }),
                    (o = !e.isEmptyObject(n)),
                    (n.complete = a),
                    n.delay && s.delay(n.delay),
                    o && e.effects && e.effects.effect[r]
                        ? s[t](n)
                        : r !== t && s[r]
                        ? s[r](n.duration, n.easing, a)
                        : s.queue(function (i) {
                              e(this)[t](), a && a.call(s[0]), i();
                          });
            };
        }),
        e.widget;
    var a = !1;
    e(document).mouseup(function () {
        a = !1;
    }),
        e.widget("ui.mouse", {
            version: "1.11.4",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0,
            },
            _mouseInit: function () {
                var t = this;
                this.element
                    .bind("mousedown." + this.widgetName, function (e) {
                        return t._mouseDown(e);
                    })
                    .bind("click." + this.widgetName, function (i) {
                        return !0 ===
                            e.data(
                                i.target,
                                t.widgetName + ".preventClickEvent"
                            )
                            ? (e.removeData(
                                  i.target,
                                  t.widgetName + ".preventClickEvent"
                              ),
                              i.stopImmediatePropagation(),
                              !1)
                            : void 0;
                    }),
                    (this.started = !1);
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName),
                    this._mouseMoveDelegate &&
                        this.document
                            .unbind(
                                "mousemove." + this.widgetName,
                                this._mouseMoveDelegate
                            )
                            .unbind(
                                "mouseup." + this.widgetName,
                                this._mouseUpDelegate
                            );
            },
            _mouseDown: function (t) {
                if (!a) {
                    (this._mouseMoved = !1),
                        this._mouseStarted && this._mouseUp(t),
                        (this._mouseDownEvent = t);
                    var i = this,
                        s = 1 === t.which,
                        n =
                            "string" == typeof this.options.cancel &&
                            t.target.nodeName
                                ? e(t.target).closest(this.options.cancel)
                                      .length
                                : !1;
                    return s && !n && this._mouseCapture(t)
                        ? ((this.mouseDelayMet = !this.options.delay),
                          this.mouseDelayMet ||
                              (this._mouseDelayTimer = setTimeout(function () {
                                  i.mouseDelayMet = !0;
                              }, this.options.delay)),
                          this._mouseDistanceMet(t) &&
                          this._mouseDelayMet(t) &&
                          ((this._mouseStarted = this._mouseStart(t) !== !1),
                          !this._mouseStarted)
                              ? (t.preventDefault(), !0)
                              : (!0 ===
                                    e.data(
                                        t.target,
                                        this.widgetName + ".preventClickEvent"
                                    ) &&
                                    e.removeData(
                                        t.target,
                                        this.widgetName + ".preventClickEvent"
                                    ),
                                (this._mouseMoveDelegate = function (e) {
                                    return i._mouseMove(e);
                                }),
                                (this._mouseUpDelegate = function (e) {
                                    return i._mouseUp(e);
                                }),
                                this.document
                                    .bind(
                                        "mousemove." + this.widgetName,
                                        this._mouseMoveDelegate
                                    )
                                    .bind(
                                        "mouseup." + this.widgetName,
                                        this._mouseUpDelegate
                                    ),
                                t.preventDefault(),
                                (a = !0),
                                !0))
                        : !0;
                }
            },
            _mouseMove: function (t) {
                if (this._mouseMoved) {
                    if (
                        e.ui.ie &&
                        (!document.documentMode || 9 > document.documentMode) &&
                        !t.button
                    )
                        return this._mouseUp(t);
                    if (!t.which) return this._mouseUp(t);
                }
                return (
                    (t.which || t.button) && (this._mouseMoved = !0),
                    this._mouseStarted
                        ? (this._mouseDrag(t), t.preventDefault())
                        : (this._mouseDistanceMet(t) &&
                              this._mouseDelayMet(t) &&
                              ((this._mouseStarted =
                                  this._mouseStart(this._mouseDownEvent, t) !==
                                  !1),
                              this._mouseStarted
                                  ? this._mouseDrag(t)
                                  : this._mouseUp(t)),
                          !this._mouseStarted)
                );
            },
            _mouseUp: function (t) {
                return (
                    this.document
                        .unbind(
                            "mousemove." + this.widgetName,
                            this._mouseMoveDelegate
                        )
                        .unbind(
                            "mouseup." + this.widgetName,
                            this._mouseUpDelegate
                        ),
                    this._mouseStarted &&
                        ((this._mouseStarted = !1),
                        t.target === this._mouseDownEvent.target &&
                            e.data(
                                t.target,
                                this.widgetName + ".preventClickEvent",
                                !0
                            ),
                        this._mouseStop(t)),
                    (a = !1),
                    !1
                );
            },
            _mouseDistanceMet: function (e) {
                return (
                    Math.max(
                        Math.abs(this._mouseDownEvent.pageX - e.pageX),
                        Math.abs(this._mouseDownEvent.pageY - e.pageY)
                    ) >= this.options.distance
                );
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet;
            },
            _mouseStart: function () {},
            _mouseDrag: function () {},
            _mouseStop: function () {},
            _mouseCapture: function () {
                return !0;
            },
        });
    var o,
        r = "ui-button ui-widget ui-state-default ui-corner-all",
        h =
            "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        l = function () {
            var t = e(this);
            setTimeout(function () {
                t.find(":ui-button").button("refresh");
            }, 1);
        },
        u = function (t) {
            var i = t.name,
                s = t.form,
                n = e([]);
            return (
                i &&
                    ((i = i.replace(/'/g, "\\'")),
                    (n = s
                        ? e(s).find("[name='" + i + "'][type=radio]")
                        : e(
                              "[name='" + i + "'][type=radio]",
                              t.ownerDocument
                          ).filter(function () {
                              return !this.form;
                          }))),
                n
            );
        };
    e.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: { primary: null, secondary: null },
        },
        _create: function () {
            this.element
                .closest("form")
                .unbind("reset" + this.eventNamespace)
                .bind("reset" + this.eventNamespace, l),
                "boolean" != typeof this.options.disabled
                    ? (this.options.disabled = !!this.element.prop("disabled"))
                    : this.element.prop("disabled", this.options.disabled),
                this._determineButtonType(),
                (this.hasTitle = !!this.buttonElement.attr("title"));
            var t = this,
                i = this.options,
                s = "checkbox" === this.type || "radio" === this.type,
                n = s ? "" : "ui-state-active";
            null === i.label &&
                (i.label =
                    "input" === this.type
                        ? this.buttonElement.val()
                        : this.buttonElement.php()),
                this._hoverable(this.buttonElement),
                this.buttonElement
                    .addClass(r)
                    .attr("role", "button")
                    .bind("mouseenter" + this.eventNamespace, function () {
                        i.disabled ||
                            (this === o && e(this).addClass("ui-state-active"));
                    })
                    .bind("mouseleave" + this.eventNamespace, function () {
                        i.disabled || e(this).removeClass(n);
                    })
                    .bind("click" + this.eventNamespace, function (e) {
                        i.disabled &&
                            (e.preventDefault(), e.stopImmediatePropagation());
                    }),
                this._on({
                    focus: function () {
                        this.buttonElement.addClass("ui-state-focus");
                    },
                    blur: function () {
                        this.buttonElement.removeClass("ui-state-focus");
                    },
                }),
                s &&
                    this.element.bind(
                        "change" + this.eventNamespace,
                        function () {
                            t.refresh();
                        }
                    ),
                "checkbox" === this.type
                    ? this.buttonElement.bind(
                          "click" + this.eventNamespace,
                          function () {
                              return i.disabled ? !1 : void 0;
                          }
                      )
                    : "radio" === this.type
                    ? this.buttonElement.bind(
                          "click" + this.eventNamespace,
                          function () {
                              if (i.disabled) return !1;
                              e(this).addClass("ui-state-active"),
                                  t.buttonElement.attr("aria-pressed", "true");
                              var s = t.element[0];
                              u(s)
                                  .not(s)
                                  .map(function () {
                                      return e(this).button("widget")[0];
                                  })
                                  .removeClass("ui-state-active")
                                  .attr("aria-pressed", "false");
                          }
                      )
                    : (this.buttonElement
                          .bind("mousedown" + this.eventNamespace, function () {
                              return i.disabled
                                  ? !1
                                  : (e(this).addClass("ui-state-active"),
                                    (o = this),
                                    t.document.one("mouseup", function () {
                                        o = null;
                                    }),
                                    void 0);
                          })
                          .bind("mouseup" + this.eventNamespace, function () {
                              return i.disabled
                                  ? !1
                                  : (e(this).removeClass("ui-state-active"),
                                    void 0);
                          })
                          .bind("keydown" + this.eventNamespace, function (t) {
                              return i.disabled
                                  ? !1
                                  : ((t.keyCode === e.ui.keyCode.SPACE ||
                                        t.keyCode === e.ui.keyCode.ENTER) &&
                                        e(this).addClass("ui-state-active"),
                                    void 0);
                          })
                          .bind(
                              "keyup" +
                                  this.eventNamespace +
                                  " blur" +
                                  this.eventNamespace,
                              function () {
                                  e(this).removeClass("ui-state-active");
                              }
                          ),
                      this.buttonElement.is("a") &&
                          this.buttonElement.keyup(function (t) {
                              t.keyCode === e.ui.keyCode.SPACE &&
                                  e(this).click();
                          })),
                this._setOption("disabled", i.disabled),
                this._resetButton();
        },
        _determineButtonType: function () {
            var e, t, i;
            (this.type = this.element.is("[type=checkbox]")
                ? "checkbox"
                : this.element.is("[type=radio]")
                ? "radio"
                : this.element.is("input")
                ? "input"
                : "button"),
                "checkbox" === this.type || "radio" === this.type
                    ? ((e = this.element.parents().last()),
                      (t = "label[for='" + this.element.attr("id") + "']"),
                      (this.buttonElement = e.find(t)),
                      this.buttonElement.length ||
                          ((e = e.length
                              ? e.siblings()
                              : this.element.siblings()),
                          (this.buttonElement = e.filter(t)),
                          this.buttonElement.length ||
                              (this.buttonElement = e.find(t))),
                      this.element.addClass("ui-helper-hidden-accessible"),
                      (i = this.element.is(":checked")),
                      i && this.buttonElement.addClass("ui-state-active"),
                      this.buttonElement.prop("aria-pressed", i))
                    : (this.buttonElement = this.element);
        },
        widget: function () {
            return this.buttonElement;
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"),
                this.buttonElement
                    .removeClass(r + " ui-state-active " + h)
                    .removeAttr("role")
                    .removeAttr("aria-pressed")
                    .php(this.buttonElement.find(".ui-button-text").php()),
                this.hasTitle || this.buttonElement.removeAttr("title");
        },
        _setOption: function (e, t) {
            return (
                this._super(e, t),
                "disabled" === e
                    ? (this.widget().toggleClass("ui-state-disabled", !!t),
                      this.element.prop("disabled", !!t),
                      t &&
                          ("checkbox" === this.type || "radio" === this.type
                              ? this.buttonElement.removeClass("ui-state-focus")
                              : this.buttonElement.removeClass(
                                    "ui-state-focus ui-state-active"
                                )),
                      void 0)
                    : (this._resetButton(), void 0)
            );
        },
        refresh: function () {
            var t = this.element.is("input, button")
                ? this.element.is(":disabled")
                : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t),
                "radio" === this.type
                    ? u(this.element[0]).each(function () {
                          e(this).is(":checked")
                              ? e(this)
                                    .button("widget")
                                    .addClass("ui-state-active")
                                    .attr("aria-pressed", "true")
                              : e(this)
                                    .button("widget")
                                    .removeClass("ui-state-active")
                                    .attr("aria-pressed", "false");
                      })
                    : "checkbox" === this.type &&
                      (this.element.is(":checked")
                          ? this.buttonElement
                                .addClass("ui-state-active")
                                .attr("aria-pressed", "true")
                          : this.buttonElement
                                .removeClass("ui-state-active")
                                .attr("aria-pressed", "false"));
        },
        _resetButton: function () {
            if ("input" === this.type)
                return (
                    this.options.label && this.element.val(this.options.label),
                    void 0
                );
            var t = this.buttonElement.removeClass(h),
                i = e("<span></span>", this.document[0])
                    .addClass("ui-button-text")
                    .php(this.options.label)
                    .appendTo(t.empty())
                    .text(),
                s = this.options.icons,
                n = s.primary && s.secondary,
                a = [];
            s.primary || s.secondary
                ? (this.options.text &&
                      a.push(
                          "ui-button-text-icon" +
                              (n ? "s" : s.primary ? "-primary" : "-secondary")
                      ),
                  s.primary &&
                      t.prepend(
                          "<span class='ui-button-icon-primary ui-icon " +
                              s.primary +
                              "'></span>"
                      ),
                  s.secondary &&
                      t.append(
                          "<span class='ui-button-icon-secondary ui-icon " +
                              s.secondary +
                              "'></span>"
                      ),
                  this.options.text ||
                      (a.push(
                          n ? "ui-button-icons-only" : "ui-button-icon-only"
                      ),
                      this.hasTitle || t.attr("title", e.trim(i))))
                : a.push("ui-button-text-only"),
                t.addClass(a.join(" "));
        },
    }),
        e.widget("ui.buttonset", {
            version: "1.11.4",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)",
            },
            _create: function () {
                this.element.addClass("ui-buttonset");
            },
            _init: function () {
                this.refresh();
            },
            _setOption: function (e, t) {
                "disabled" === e && this.buttons.button("option", e, t),
                    this._super(e, t);
            },
            refresh: function () {
                var t = "rtl" === this.element.css("direction"),
                    i = this.element.find(this.options.items),
                    s = i.filter(":ui-button");
                i.not(":ui-button").button(),
                    s.button("refresh"),
                    (this.buttons = i
                        .map(function () {
                            return e(this).button("widget")[0];
                        })
                        .removeClass(
                            "ui-corner-all ui-corner-left ui-corner-right"
                        )
                        .filter(":first")
                        .addClass(t ? "ui-corner-right" : "ui-corner-left")
                        .end()
                        .filter(":last")
                        .addClass(t ? "ui-corner-left" : "ui-corner-right")
                        .end()
                        .end());
            },
            _destroy: function () {
                this.element.removeClass("ui-buttonset"),
                    this.buttons
                        .map(function () {
                            return e(this).button("widget")[0];
                        })
                        .removeClass("ui-corner-left ui-corner-right")
                        .end()
                        .button("destroy");
            },
        }),
        e.ui.button,
        e.widget("ui.slider", e.ui.mouse, {
            version: "1.11.4",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null,
            },
            numPages: 5,
            _create: function () {
                (this._keySliding = !1),
                    (this._mouseSliding = !1),
                    (this._animateOff = !0),
                    (this._handleIndex = null),
                    this._detectOrientation(),
                    this._mouseInit(),
                    this._calculateNewMax(),
                    this.element.addClass(
                        "ui-slider ui-slider-" +
                            this.orientation +
                            " ui-widget" +
                            " ui-widget-content" +
                            " ui-corner-all"
                    ),
                    this._refresh(),
                    this._setOption("disabled", this.options.disabled),
                    (this._animateOff = !1);
            },
            _refresh: function () {
                this._createRange(),
                    this._createHandles(),
                    this._setupEvents(),
                    this._refreshValue();
            },
            _createHandles: function () {
                var t,
                    i,
                    s = this.options,
                    n = this.element
                        .find(".ui-slider-handle")
                        .addClass("ui-state-default ui-corner-all"),
                    a =
                        "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                    o = [];
                for (
                    i = (s.values && s.values.length) || 1,
                        n.length > i &&
                            (n.slice(i).remove(), (n = n.slice(0, i))),
                        t = n.length;
                    i > t;
                    t++
                )
                    o.push(a);
                (this.handles = n.add(e(o.join("")).appendTo(this.element))),
                    (this.handle = this.handles.eq(0)),
                    this.handles.each(function (t) {
                        e(this).data("ui-slider-handle-index", t);
                    });
            },
            _createRange: function () {
                var t = this.options,
                    i = "";
                t.range
                    ? (t.range === !0 &&
                          (t.values
                              ? t.values.length && 2 !== t.values.length
                                  ? (t.values = [t.values[0], t.values[0]])
                                  : e.isArray(t.values) &&
                                    (t.values = t.values.slice(0))
                              : (t.values = [
                                    this._valueMin(),
                                    this._valueMin(),
                                ])),
                      this.range && this.range.length
                          ? this.range
                                .removeClass(
                                    "ui-slider-range-min ui-slider-range-max"
                                )
                                .css({ left: "", bottom: "" })
                          : ((this.range = e("<div></div>").appendTo(
                                this.element
                            )),
                            (i =
                                "ui-slider-range ui-widget-header ui-corner-all")),
                      this.range.addClass(
                          i +
                              ("min" === t.range || "max" === t.range
                                  ? " ui-slider-range-" + t.range
                                  : "")
                      ))
                    : (this.range && this.range.remove(), (this.range = null));
            },
            _setupEvents: function () {
                this._off(this.handles),
                    this._on(this.handles, this._handleEvents),
                    this._hoverable(this.handles),
                    this._focusable(this.handles);
            },
            _destroy: function () {
                this.handles.remove(),
                    this.range && this.range.remove(),
                    this.element.removeClass(
                        "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
                    ),
                    this._mouseDestroy();
            },
            _mouseCapture: function (t) {
                var i,
                    s,
                    n,
                    a,
                    o,
                    r,
                    h,
                    l,
                    u = this,
                    d = this.options;
                return d.disabled
                    ? !1
                    : ((this.elementSize = {
                          width: this.element.outerWidth(),
                          height: this.element.outerHeight(),
                      }),
                      (this.elementOffset = this.element.offset()),
                      (i = { x: t.pageX, y: t.pageY }),
                      (s = this._normValueFromMouse(i)),
                      (n = this._valueMax() - this._valueMin() + 1),
                      this.handles.each(function (t) {
                          var i = Math.abs(s - u.values(t));
                          (n > i ||
                              (n === i &&
                                  (t === u._lastChangedValue ||
                                      u.values(t) === d.min))) &&
                              ((n = i), (a = e(this)), (o = t));
                      }),
                      (r = this._start(t, o)),
                      r === !1
                          ? !1
                          : ((this._mouseSliding = !0),
                            (this._handleIndex = o),
                            a.addClass("ui-state-active").focus(),
                            (h = a.offset()),
                            (l = !e(t.target)
                                .parents()
                                .addBack()
                                .is(".ui-slider-handle")),
                            (this._clickOffset = l
                                ? { left: 0, top: 0 }
                                : {
                                      left: t.pageX - h.left - a.width() / 2,
                                      top:
                                          t.pageY -
                                          h.top -
                                          a.height() / 2 -
                                          (parseInt(
                                              a.css("borderTopWidth"),
                                              10
                                          ) || 0) -
                                          (parseInt(
                                              a.css("borderBottomWidth"),
                                              10
                                          ) || 0) +
                                          (parseInt(a.css("marginTop"), 10) ||
                                              0),
                                  }),
                            this.handles.hasClass("ui-state-hover") ||
                                this._slide(t, o, s),
                            (this._animateOff = !0),
                            !0));
            },
            _mouseStart: function () {
                return !0;
            },
            _mouseDrag: function (e) {
                var t = { x: e.pageX, y: e.pageY },
                    i = this._normValueFromMouse(t);
                return this._slide(e, this._handleIndex, i), !1;
            },
            _mouseStop: function (e) {
                return (
                    this.handles.removeClass("ui-state-active"),
                    (this._mouseSliding = !1),
                    this._stop(e, this._handleIndex),
                    this._change(e, this._handleIndex),
                    (this._handleIndex = null),
                    (this._clickOffset = null),
                    (this._animateOff = !1),
                    !1
                );
            },
            _detectOrientation: function () {
                this.orientation =
                    "vertical" === this.options.orientation
                        ? "vertical"
                        : "horizontal";
            },
            _normValueFromMouse: function (e) {
                var t, i, s, n, a;
                return (
                    "horizontal" === this.orientation
                        ? ((t = this.elementSize.width),
                          (i =
                              e.x -
                              this.elementOffset.left -
                              (this._clickOffset ? this._clickOffset.left : 0)))
                        : ((t = this.elementSize.height),
                          (i =
                              e.y -
                              this.elementOffset.top -
                              (this._clickOffset ? this._clickOffset.top : 0))),
                    (s = i / t),
                    s > 1 && (s = 1),
                    0 > s && (s = 0),
                    "vertical" === this.orientation && (s = 1 - s),
                    (n = this._valueMax() - this._valueMin()),
                    (a = this._valueMin() + s * n),
                    this._trimAlignValue(a)
                );
            },
            _start: function (e, t) {
                var i = { handle: this.handles[t], value: this.value() };
                return (
                    this.options.values &&
                        this.options.values.length &&
                        ((i.value = this.values(t)),
                        (i.values = this.values())),
                    this._trigger("start", e, i)
                );
            },
            _slide: function (e, t, i) {
                var s, n, a;
                this.options.values && this.options.values.length
                    ? ((s = this.values(t ? 0 : 1)),
                      2 === this.options.values.length &&
                          this.options.range === !0 &&
                          ((0 === t && i > s) || (1 === t && s > i)) &&
                          (i = s),
                      i !== this.values(t) &&
                          ((n = this.values()),
                          (n[t] = i),
                          (a = this._trigger("slide", e, {
                              handle: this.handles[t],
                              value: i,
                              values: n,
                          })),
                          (s = this.values(t ? 0 : 1)),
                          a !== !1 && this.values(t, i)))
                    : i !== this.value() &&
                      ((a = this._trigger("slide", e, {
                          handle: this.handles[t],
                          value: i,
                      })),
                      a !== !1 && this.value(i));
            },
            _stop: function (e, t) {
                var i = { handle: this.handles[t], value: this.value() };
                this.options.values &&
                    this.options.values.length &&
                    ((i.value = this.values(t)), (i.values = this.values())),
                    this._trigger("stop", e, i);
            },
            _change: function (e, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = { handle: this.handles[t], value: this.value() };
                    this.options.values &&
                        this.options.values.length &&
                        ((i.value = this.values(t)),
                        (i.values = this.values())),
                        (this._lastChangedValue = t),
                        this._trigger("change", e, i);
                }
            },
            value: function (e) {
                return arguments.length
                    ? ((this.options.value = this._trimAlignValue(e)),
                      this._refreshValue(),
                      this._change(null, 0),
                      void 0)
                    : this._value();
            },
            values: function (t, i) {
                var s, n, a;
                if (arguments.length > 1)
                    return (
                        (this.options.values[t] = this._trimAlignValue(i)),
                        this._refreshValue(),
                        this._change(null, t),
                        void 0
                    );
                if (!arguments.length) return this._values();
                if (!e.isArray(arguments[0]))
                    return this.options.values && this.options.values.length
                        ? this._values(t)
                        : this.value();
                for (
                    s = this.options.values, n = arguments[0], a = 0;
                    s.length > a;
                    a += 1
                )
                    (s[a] = this._trimAlignValue(n[a])), this._change(null, a);
                this._refreshValue();
            },
            _setOption: function (t, i) {
                var s,
                    n = 0;
                switch (
                    ("range" === t &&
                        this.options.range === !0 &&
                        ("min" === i
                            ? ((this.options.value = this._values(0)),
                              (this.options.values = null))
                            : "max" === i &&
                              ((this.options.value = this._values(
                                  this.options.values.length - 1
                              )),
                              (this.options.values = null))),
                    e.isArray(this.options.values) &&
                        (n = this.options.values.length),
                    "disabled" === t &&
                        this.element.toggleClass("ui-state-disabled", !!i),
                    this._super(t, i),
                    t)
                ) {
                    case "orientation":
                        this._detectOrientation(),
                            this.element
                                .removeClass(
                                    "ui-slider-horizontal ui-slider-vertical"
                                )
                                .addClass("ui-slider-" + this.orientation),
                            this._refreshValue(),
                            this.handles.css(
                                "horizontal" === i ? "bottom" : "left",
                                ""
                            );
                        break;
                    case "value":
                        (this._animateOff = !0),
                            this._refreshValue(),
                            this._change(null, 0),
                            (this._animateOff = !1);
                        break;
                    case "values":
                        for (
                            this._animateOff = !0, this._refreshValue(), s = 0;
                            n > s;
                            s += 1
                        )
                            this._change(null, s);
                        this._animateOff = !1;
                        break;
                    case "step":
                    case "min":
                    case "max":
                        (this._animateOff = !0),
                            this._calculateNewMax(),
                            this._refreshValue(),
                            (this._animateOff = !1);
                        break;
                    case "range":
                        (this._animateOff = !0),
                            this._refresh(),
                            (this._animateOff = !1);
                }
            },
            _value: function () {
                var e = this.options.value;
                return (e = this._trimAlignValue(e));
            },
            _values: function (e) {
                var t, i, s;
                if (arguments.length)
                    return (
                        (t = this.options.values[e]),
                        (t = this._trimAlignValue(t))
                    );
                if (this.options.values && this.options.values.length) {
                    for (
                        i = this.options.values.slice(), s = 0;
                        i.length > s;
                        s += 1
                    )
                        i[s] = this._trimAlignValue(i[s]);
                    return i;
                }
                return [];
            },
            _trimAlignValue: function (e) {
                if (this._valueMin() >= e) return this._valueMin();
                if (e >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    i = (e - this._valueMin()) % t,
                    s = e - i;
                return (
                    2 * Math.abs(i) >= t && (s += i > 0 ? t : -t),
                    parseFloat(s.toFixed(5))
                );
            },
            _calculateNewMax: function () {
                var e = this.options.max,
                    t = this._valueMin(),
                    i = this.options.step,
                    s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
                (e = s + t),
                    (this.max = parseFloat(e.toFixed(this._precision())));
            },
            _precision: function () {
                var e = this._precisionOf(this.options.step);
                return (
                    null !== this.options.min &&
                        (e = Math.max(e, this._precisionOf(this.options.min))),
                    e
                );
            },
            _precisionOf: function (e) {
                var t = "" + e,
                    i = t.indexOf(".");
                return -1 === i ? 0 : t.length - i - 1;
            },
            _valueMin: function () {
                return this.options.min;
            },
            _valueMax: function () {
                return this.max;
            },
            _refreshValue: function () {
                var t,
                    i,
                    s,
                    n,
                    a,
                    o = this.options.range,
                    r = this.options,
                    h = this,
                    l = this._animateOff ? !1 : r.animate,
                    u = {};
                this.options.values && this.options.values.length
                    ? this.handles.each(function (s) {
                          (i =
                              100 *
                              ((h.values(s) - h._valueMin()) /
                                  (h._valueMax() - h._valueMin()))),
                              (u[
                                  "horizontal" === h.orientation
                                      ? "left"
                                      : "bottom"
                              ] = i + "%"),
                              e(this)
                                  .stop(1, 1)
                                  [l ? "animate" : "css"](u, r.animate),
                              h.options.range === !0 &&
                                  ("horizontal" === h.orientation
                                      ? (0 === s &&
                                            h.range
                                                .stop(1, 1)
                                                [l ? "animate" : "css"](
                                                    { left: i + "%" },
                                                    r.animate
                                                ),
                                        1 === s &&
                                            h.range[l ? "animate" : "css"](
                                                { width: i - t + "%" },
                                                {
                                                    queue: !1,
                                                    duration: r.animate,
                                                }
                                            ))
                                      : (0 === s &&
                                            h.range
                                                .stop(1, 1)
                                                [l ? "animate" : "css"](
                                                    { bottom: i + "%" },
                                                    r.animate
                                                ),
                                        1 === s &&
                                            h.range[l ? "animate" : "css"](
                                                { height: i - t + "%" },
                                                {
                                                    queue: !1,
                                                    duration: r.animate,
                                                }
                                            ))),
                              (t = i);
                      })
                    : ((s = this.value()),
                      (n = this._valueMin()),
                      (a = this._valueMax()),
                      (i = a !== n ? 100 * ((s - n) / (a - n)) : 0),
                      (u[
                          "horizontal" === this.orientation ? "left" : "bottom"
                      ] = i + "%"),
                      this.handle
                          .stop(1, 1)
                          [l ? "animate" : "css"](u, r.animate),
                      "min" === o &&
                          "horizontal" === this.orientation &&
                          this.range
                              .stop(1, 1)
                              [l ? "animate" : "css"](
                                  { width: i + "%" },
                                  r.animate
                              ),
                      "max" === o &&
                          "horizontal" === this.orientation &&
                          this.range[l ? "animate" : "css"](
                              { width: 100 - i + "%" },
                              { queue: !1, duration: r.animate }
                          ),
                      "min" === o &&
                          "vertical" === this.orientation &&
                          this.range
                              .stop(1, 1)
                              [l ? "animate" : "css"](
                                  { height: i + "%" },
                                  r.animate
                              ),
                      "max" === o &&
                          "vertical" === this.orientation &&
                          this.range[l ? "animate" : "css"](
                              { height: 100 - i + "%" },
                              { queue: !1, duration: r.animate }
                          ));
            },
            _handleEvents: {
                keydown: function (t) {
                    var i,
                        s,
                        n,
                        a,
                        o = e(t.target).data("ui-slider-handle-index");
                    switch (t.keyCode) {
                        case e.ui.keyCode.HOME:
                        case e.ui.keyCode.END:
                        case e.ui.keyCode.PAGE_UP:
                        case e.ui.keyCode.PAGE_DOWN:
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (
                                (t.preventDefault(),
                                !this._keySliding &&
                                    ((this._keySliding = !0),
                                    e(t.target).addClass("ui-state-active"),
                                    (i = this._start(t, o)),
                                    i === !1))
                            )
                                return;
                    }
                    switch (
                        ((a = this.options.step),
                        (s = n =
                            this.options.values && this.options.values.length
                                ? this.values(o)
                                : this.value()),
                        t.keyCode)
                    ) {
                        case e.ui.keyCode.HOME:
                            n = this._valueMin();
                            break;
                        case e.ui.keyCode.END:
                            n = this._valueMax();
                            break;
                        case e.ui.keyCode.PAGE_UP:
                            n = this._trimAlignValue(
                                s +
                                    (this._valueMax() - this._valueMin()) /
                                        this.numPages
                            );
                            break;
                        case e.ui.keyCode.PAGE_DOWN:
                            n = this._trimAlignValue(
                                s -
                                    (this._valueMax() - this._valueMin()) /
                                        this.numPages
                            );
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                            if (s === this._valueMax()) return;
                            n = this._trimAlignValue(s + a);
                            break;
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (s === this._valueMin()) return;
                            n = this._trimAlignValue(s - a);
                    }
                    this._slide(t, o, n);
                },
                keyup: function (t) {
                    var i = e(t.target).data("ui-slider-handle-index");
                    this._keySliding &&
                        ((this._keySliding = !1),
                        this._stop(t, i),
                        this._change(t, i),
                        e(t.target).removeClass("ui-state-active"));
                },
            },
        });
});

/**
 * sticky-sidebar - A JavaScript plugin for making smart and high performance.
 * @version v3.3.0
 * @link https://github.com/abouolia/sticky-sidebar
 * @author Ahmed Bouhuolia
 * @license The MIT License (MIT)
 **/
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? e()
        : "function" == typeof define && define.amd
        ? define(e)
        : e();
})(0, function () {
    "use strict";
    function t(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
    }
    var e = (function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(t, n.key, n);
                }
            }
            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e;
            };
        })(),
        i = (function () {
            var i = ".stickySidebar",
                n = {
                    topSpacing: 0,
                    bottomSpacing: 0,
                    containerSelector: !1,
                    innerWrapperSelector: ".inner-wrapper-sticky",
                    stickyClass: "is-affixed",
                    resizeSensor: !0,
                    minWidth: !1,
                };
            return (function () {
                function s(e) {
                    var i = this,
                        o =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {};
                    if (
                        (t(this, s),
                        (this.options = s.extend(n, o)),
                        (this.sidebar =
                            "string" == typeof e
                                ? document.querySelector(e)
                                : e),
                        void 0 === this.sidebar)
                    )
                        throw new Error(
                            "There is no specific sidebar element."
                        );
                    (this.sidebarInner = !1),
                        (this.container = this.sidebar.parentElement),
                        (this.affixedType = "STATIC"),
                        (this.direction = "down"),
                        (this.support = { transform: !1, transform3d: !1 }),
                        (this._initialized = !1),
                        (this._reStyle = !1),
                        (this._breakpoint = !1),
                        (this._resizeListeners = []),
                        (this.dimensions = {
                            translateY: 0,
                            topSpacing: 0,
                            lastTopSpacing: 0,
                            bottomSpacing: 0,
                            lastBottomSpacing: 0,
                            sidebarHeight: 0,
                            sidebarWidth: 0,
                            containerTop: 0,
                            containerHeight: 0,
                            viewportHeight: 0,
                            viewportTop: 0,
                            lastViewportTop: 0,
                        }),
                        ["handleEvent"].forEach(function (t) {
                            i[t] = i[t].bind(i);
                        }),
                        this.initialize();
                }
                return (
                    e(
                        s,
                        [
                            {
                                key: "initialize",
                                value: function () {
                                    var t = this;
                                    if (
                                        (this._setSupportFeatures(),
                                        this.options.innerWrapperSelector &&
                                            ((this.sidebarInner =
                                                this.sidebar.querySelector(
                                                    this.options
                                                        .innerWrapperSelector
                                                )),
                                            null === this.sidebarInner &&
                                                (this.sidebarInner = !1)),
                                        !this.sidebarInner)
                                    ) {
                                        var e = document.createElement("div");
                                        for (
                                            e.setAttribute(
                                                "class",
                                                "inner-wrapper-sticky"
                                            ),
                                                this.sidebar.appendChild(e);
                                            this.sidebar.firstChild != e;

                                        )
                                            e.appendChild(
                                                this.sidebar.firstChild
                                            );
                                        this.sidebarInner =
                                            this.sidebar.querySelector(
                                                ".inner-wrapper-sticky"
                                            );
                                    }
                                    if (this.options.containerSelector) {
                                        var i = document.querySelectorAll(
                                            this.options.containerSelector
                                        );
                                        if (
                                            ((i =
                                                Array.prototype.slice.call(
                                                    i
                                                )).forEach(function (e, i) {
                                                e.contains(t.sidebar) &&
                                                    (t.container = e);
                                            }),
                                            !i.length)
                                        )
                                            throw new Error(
                                                "The container does not contains on the sidebar."
                                            );
                                    }
                                    "function" !=
                                        typeof this.options.topSpacing &&
                                        (this.options.topSpacing =
                                            parseInt(this.options.topSpacing) ||
                                            0),
                                        "function" !=
                                            typeof this.options.bottomSpacing &&
                                            (this.options.bottomSpacing =
                                                parseInt(
                                                    this.options.bottomSpacing
                                                ) || 0),
                                        this._widthBreakpoint(),
                                        this.calcDimensions(),
                                        this.stickyPosition(),
                                        this.bindEvents(),
                                        (this._initialized = !0);
                                },
                            },
                            {
                                key: "bindEvents",
                                value: function () {
                                    window.addEventListener("resize", this, {
                                        passive: !0,
                                    }),
                                        window.addEventListener(
                                            "scroll",
                                            this,
                                            { passive: !0 }
                                        ),
                                        this.sidebar.addEventListener(
                                            "update" + i,
                                            this
                                        ),
                                        this.options.resizeSensor &&
                                            "undefined" !=
                                                typeof ResizeSensor &&
                                            (new ResizeSensor(
                                                this.sidebarInner,
                                                this.handleEvent
                                            ),
                                            new ResizeSensor(
                                                this.container,
                                                this.handleEvent
                                            ));
                                },
                            },
                            {
                                key: "handleEvent",
                                value: function (t) {
                                    this.updateSticky(t);
                                },
                            },
                            {
                                key: "calcDimensions",
                                value: function () {
                                    if (!this._breakpoint) {
                                        var t = this.dimensions;
                                        (t.containerTop = s.offsetRelative(
                                            this.container
                                        ).top),
                                            (t.containerHeight =
                                                this.container.clientHeight),
                                            (t.containerBottom =
                                                t.containerTop +
                                                t.containerHeight),
                                            (t.sidebarHeight =
                                                this.sidebarInner.offsetHeight),
                                            (t.sidebarWidth =
                                                this.sidebar.offsetWidth),
                                            (t.viewportHeight =
                                                window.innerHeight),
                                            this._calcDimensionsWithScroll();
                                    }
                                },
                            },
                            {
                                key: "_calcDimensionsWithScroll",
                                value: function () {
                                    var t = this.dimensions;
                                    (t.sidebarLeft = s.offsetRelative(
                                        this.sidebar
                                    ).left),
                                        (t.viewportTop =
                                            document.documentElement
                                                .scrollTop ||
                                            document.body.scrollTop),
                                        (t.viewportBottom =
                                            t.viewportTop + t.viewportHeight),
                                        (t.viewportLeft =
                                            document.documentElement
                                                .scrollLeft ||
                                            document.body.scrollLeft),
                                        (t.topSpacing =
                                            this.options.topSpacing),
                                        (t.bottomSpacing =
                                            this.options.bottomSpacing),
                                        "function" == typeof t.topSpacing &&
                                            (t.topSpacing =
                                                parseInt(
                                                    t.topSpacing(this.sidebar)
                                                ) || 0),
                                        "function" == typeof t.bottomSpacing &&
                                            (t.bottomSpacing =
                                                parseInt(
                                                    t.bottomSpacing(
                                                        this.sidebar
                                                    )
                                                ) || 0),
                                        "VIEWPORT-TOP" === this.affixedType
                                            ? t.topSpacing < t.lastTopSpacing &&
                                              ((t.translateY +=
                                                  t.lastTopSpacing -
                                                  t.topSpacing),
                                              (this._reStyle = !0))
                                            : "VIEWPORT-BOTTOM" ===
                                                  this.affixedType &&
                                              t.bottomSpacing <
                                                  t.lastBottomSpacing &&
                                              ((t.translateY +=
                                                  t.lastBottomSpacing -
                                                  t.bottomSpacing),
                                              (this._reStyle = !0)),
                                        (t.lastTopSpacing = t.topSpacing),
                                        (t.lastBottomSpacing = t.bottomSpacing);
                                },
                            },
                            {
                                key: "isSidebarFitsViewport",
                                value: function () {
                                    return (
                                        this.dimensions.sidebarHeight <
                                        this.dimensions.viewportHeight
                                    );
                                },
                            },
                            {
                                key: "observeScrollDir",
                                value: function () {
                                    var t = this.dimensions;
                                    if (t.lastViewportTop !== t.viewportTop) {
                                        var e =
                                            "down" === this.direction
                                                ? Math.min
                                                : Math.max;
                                        t.viewportTop ===
                                            e(
                                                t.viewportTop,
                                                t.lastViewportTop
                                            ) &&
                                            (this.direction =
                                                "down" === this.direction
                                                    ? "up"
                                                    : "down");
                                    }
                                },
                            },
                            {
                                key: "getAffixType",
                                value: function () {
                                    var t = this.dimensions,
                                        e = !1;
                                    this._calcDimensionsWithScroll();
                                    var i = t.sidebarHeight + t.containerTop,
                                        n = t.viewportTop + t.topSpacing,
                                        s = t.viewportBottom - t.bottomSpacing;
                                    return (
                                        "up" === this.direction
                                            ? n <= t.containerTop
                                                ? ((t.translateY = 0),
                                                  (e = "STATIC"))
                                                : n <=
                                                  t.translateY + t.containerTop
                                                ? ((t.translateY =
                                                      n - t.containerTop),
                                                  (e = "VIEWPORT-TOP"))
                                                : !this.isSidebarFitsViewport() &&
                                                  t.containerTop <= n &&
                                                  (e = "VIEWPORT-UNBOTTOM")
                                            : this.isSidebarFitsViewport()
                                            ? t.sidebarHeight + n >=
                                              t.containerBottom
                                                ? ((t.translateY =
                                                      t.containerBottom - i),
                                                  (e = "CONTAINER-BOTTOM"))
                                                : n >= t.containerTop &&
                                                  ((t.translateY =
                                                      n - t.containerTop),
                                                  (e = "VIEWPORT-TOP"))
                                            : t.containerBottom <= s
                                            ? ((t.translateY =
                                                  t.containerBottom - i),
                                              (e = "CONTAINER-BOTTOM"))
                                            : i + t.translateY <= s
                                            ? ((t.translateY = s - i),
                                              (e = "VIEWPORT-BOTTOM"))
                                            : t.containerTop + t.translateY <=
                                                  n &&
                                              (e = "VIEWPORT-UNBOTTOM"),
                                        (t.translateY = Math.max(
                                            0,
                                            t.translateY
                                        )),
                                        (t.translateY = Math.min(
                                            t.containerHeight,
                                            t.translateY
                                        )),
                                        (t.lastViewportTop = t.viewportTop),
                                        e
                                    );
                                },
                            },
                            {
                                key: "_getStyle",
                                value: function (t) {
                                    if (void 0 !== t) {
                                        var e = { inner: {}, outer: {} },
                                            i = this.dimensions;
                                        switch (t) {
                                            case "VIEWPORT-TOP":
                                                e.inner = {
                                                    position: "fixed",
                                                    top: i.topSpacing,
                                                    left:
                                                        i.sidebarLeft -
                                                        i.viewportLeft,
                                                    width: i.sidebarWidth,
                                                };
                                                break;
                                            case "VIEWPORT-BOTTOM":
                                                e.inner = {
                                                    position: "fixed",
                                                    top: "auto",
                                                    left: i.sidebarLeft,
                                                    bottom: i.bottomSpacing,
                                                    width: i.sidebarWidth,
                                                };
                                                break;
                                            case "CONTAINER-BOTTOM":
                                            case "VIEWPORT-UNBOTTOM":
                                                var n = this._getTranslate(
                                                    0,
                                                    i.translateY + "px"
                                                );
                                                e.inner = n
                                                    ? { transform: n }
                                                    : {
                                                          position: "absolute",
                                                          top: i.translateY,
                                                          width: i.sidebarWidth,
                                                      };
                                        }
                                        switch (t) {
                                            case "VIEWPORT-TOP":
                                            case "VIEWPORT-BOTTOM":
                                            case "VIEWPORT-UNBOTTOM":
                                            case "CONTAINER-BOTTOM":
                                                e.outer = {
                                                    height: i.sidebarHeight,
                                                    position: "relative",
                                                };
                                        }
                                        return (
                                            (e.outer = s.extend(
                                                { height: "", position: "" },
                                                e.outer
                                            )),
                                            (e.inner = s.extend(
                                                {
                                                    position: "relative",
                                                    top: "",
                                                    left: "",
                                                    bottom: "",
                                                    width: "",
                                                    transform:
                                                        this._getTranslate(),
                                                },
                                                e.inner
                                            )),
                                            e
                                        );
                                    }
                                },
                            },
                            {
                                key: "stickyPosition",
                                value: function (t) {
                                    if (!this._breakpoint) {
                                        t = this._reStyle || t || !1;
                                        var e = this.getAffixType(),
                                            n = this._getStyle(e);
                                        if ((this.affixedType != e || t) && e) {
                                            var o =
                                                "affix." +
                                                e
                                                    .toLowerCase()
                                                    .replace("viewport-", "") +
                                                i;
                                            s.eventTrigger(this.sidebar, o),
                                                "STATIC" === e
                                                    ? s.removeClass(
                                                          this.sidebar,
                                                          this.options
                                                              .stickyClass
                                                      )
                                                    : s.addClass(
                                                          this.sidebar,
                                                          this.options
                                                              .stickyClass
                                                      );
                                            for (var r in n.outer)
                                                this.sidebar.style[r] =
                                                    n.outer[r];
                                            for (var a in n.inner) {
                                                var c =
                                                    "number" ==
                                                    typeof n.inner[a]
                                                        ? "px"
                                                        : "";
                                                this.sidebarInner.style[a] =
                                                    n.inner[a] + c;
                                            }
                                            var p =
                                                "affixed." +
                                                e
                                                    .toLowerCase()
                                                    .replace("viewport-", "") +
                                                i;
                                            s.eventTrigger(this.sidebar, p);
                                        } else
                                            this._initialized &&
                                                (this.sidebarInner.style.left =
                                                    n.inner.left);
                                        this.affixedType = e;
                                    }
                                },
                            },
                            {
                                key: "_widthBreakpoint",
                                value: function () {
                                    window.innerWidth <= this.options.minWidth
                                        ? ((this._breakpoint = !0),
                                          (this.affixedType = "STATIC"),
                                          this.sidebar.removeAttribute("style"),
                                          s.removeClass(
                                              this.sidebar,
                                              this.options.stickyClass
                                          ),
                                          this.sidebarInner.removeAttribute(
                                              "style"
                                          ))
                                        : (this._breakpoint = !1);
                                },
                            },
                            {
                                key: "updateSticky",
                                value: function () {
                                    var t = this,
                                        e =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                    this._running ||
                                        ((this._running = !0),
                                        (function (e) {
                                            requestAnimationFrame(function () {
                                                switch (e) {
                                                    case "scroll":
                                                        t._calcDimensionsWithScroll(),
                                                            t.observeScrollDir(),
                                                            t.stickyPosition();
                                                        break;
                                                    case "resize":
                                                    default:
                                                        t._widthBreakpoint(),
                                                            t.calcDimensions(),
                                                            t.stickyPosition(
                                                                !0
                                                            );
                                                }
                                                t._running = !1;
                                            });
                                        })(e.type));
                                },
                            },
                            {
                                key: "_setSupportFeatures",
                                value: function () {
                                    var t = this.support;
                                    (t.transform = s.supportTransform()),
                                        (t.transform3d = s.supportTransform(
                                            !0
                                        ));
                                },
                            },
                            {
                                key: "_getTranslate",
                                value: function () {
                                    var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : 0,
                                        e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : 0,
                                        i =
                                            arguments.length > 2 &&
                                            void 0 !== arguments[2]
                                                ? arguments[2]
                                                : 0;
                                    return this.support.transform3d
                                        ? "translate3d(" +
                                              t +
                                              ", " +
                                              e +
                                              ", " +
                                              i +
                                              ")"
                                        : !!this.support.translate &&
                                              "translate(" + t + ", " + e + ")";
                                },
                            },
                            {
                                key: "destroy",
                                value: function () {
                                    window.removeEventListener("resize", this),
                                        window.removeEventListener(
                                            "scroll",
                                            this
                                        ),
                                        this.sidebar.classList.remove(
                                            this.options.stickyClass
                                        ),
                                        (this.sidebar.style.minHeight = ""),
                                        this.sidebar.removeEventListener(
                                            "update" + i,
                                            this
                                        );
                                    var t = { inner: {}, outer: {} };
                                    (t.inner = {
                                        position: "",
                                        top: "",
                                        left: "",
                                        bottom: "",
                                        width: "",
                                        transform: "",
                                    }),
                                        (t.outer = {
                                            height: "",
                                            position: "",
                                        });
                                    for (var e in t.outer)
                                        this.sidebar.style[e] = t.outer[e];
                                    for (var n in t.inner)
                                        this.sidebarInner.style[n] = t.inner[n];
                                    this.options.resizeSensor &&
                                        "undefined" != typeof ResizeSensor &&
                                        (ResizeSensor.detach(
                                            this.sidebarInner,
                                            this.handleEvent
                                        ),
                                        ResizeSensor.detach(
                                            this.container,
                                            this.handleEvent
                                        ));
                                },
                            },
                        ],
                        [
                            {
                                key: "supportTransform",
                                value: function (t) {
                                    var e = !1,
                                        i = t ? "perspective" : "transform",
                                        n =
                                            i.charAt(0).toUpperCase() +
                                            i.slice(1),
                                        s = ["Webkit", "Moz", "O", "ms"],
                                        o =
                                            document.createElement(
                                                "support"
                                            ).style;
                                    return (
                                        (i + " " + s.join(n + " ") + n)
                                            .split(" ")
                                            .forEach(function (t, i) {
                                                if (void 0 !== o[t])
                                                    return (e = t), !1;
                                            }),
                                        e
                                    );
                                },
                            },
                            {
                                key: "eventTrigger",
                                value: function (t, e, i) {
                                    try {
                                        var n = new CustomEvent(e, {
                                            detail: i,
                                        });
                                    } catch (t) {
                                        (n =
                                            document.createEvent(
                                                "CustomEvent"
                                            )).initCustomEvent(e, !0, !0, i);
                                    }
                                    t.dispatchEvent(n);
                                },
                            },
                            {
                                key: "extend",
                                value: function (t, e) {
                                    var i = {};
                                    for (var n in t)
                                        void 0 !== e[n]
                                            ? (i[n] = e[n])
                                            : (i[n] = t[n]);
                                    return i;
                                },
                            },
                            {
                                key: "offsetRelative",
                                value: function (t) {
                                    var e = { left: 0, top: 0 };
                                    do {
                                        var i = t.offsetTop,
                                            n = t.offsetLeft;
                                        isNaN(i) || (e.top += i),
                                            isNaN(n) || (e.left += n),
                                            (t =
                                                "BODY" === t.tagName
                                                    ? t.parentElement
                                                    : t.offsetParent);
                                    } while (t);
                                    return e;
                                },
                            },
                            {
                                key: "addClass",
                                value: function (t, e) {
                                    s.hasClass(t, e) ||
                                        (t.classList
                                            ? t.classList.add(e)
                                            : (t.className += " " + e));
                                },
                            },
                            {
                                key: "removeClass",
                                value: function (t, e) {
                                    s.hasClass(t, e) &&
                                        (t.classList
                                            ? t.classList.remove(e)
                                            : (t.className =
                                                  t.className.replace(
                                                      new RegExp(
                                                          "(^|\\b)" +
                                                              e
                                                                  .split(" ")
                                                                  .join("|") +
                                                              "(\\b|$)",
                                                          "gi"
                                                      ),
                                                      " "
                                                  )));
                                },
                            },
                            {
                                key: "hasClass",
                                value: function (t, e) {
                                    return t.classList
                                        ? t.classList.contains(e)
                                        : new RegExp(
                                              "(^| )" + e + "( |$)",
                                              "gi"
                                          ).test(t.className);
                                },
                            },
                        ]
                    ),
                    s
                );
            })();
        })();
    (window.StickySidebar = i),
        (function () {
            if ("undefined" != typeof window) {
                var t = window.$ || window.jQuery || window.Zepto;
                if (t) {
                    (t.fn.stickySidebar = function (e) {
                        return this.each(function () {
                            var n = t(this),
                                s = t(this).data("stickySidebar");
                            if (
                                (s ||
                                    ((s = new i(
                                        this,
                                        "object" == typeof e && e
                                    )),
                                    n.data("stickySidebar", s)),
                                "string" == typeof e)
                            ) {
                                if (
                                    void 0 === s[e] &&
                                    -1 ===
                                        ["destroy", "updateSticky"].indexOf(e)
                                )
                                    throw new Error(
                                        'No method named "' + e + '"'
                                    );
                                s[e]();
                            }
                        });
                    }),
                        (t.fn.stickySidebar.Constructor = i);
                    var e = t.fn.stickySidebar;
                    t.fn.stickySidebar.noConflict = function () {
                        return (t.fn.stickySidebar = e), this;
                    };
                }
            }
        })();
});

/*!
 * jQuery meanMenu v2.0.8
 * @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
 *
 */
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 *
 * Find more information at http://www.meanthemes.com/plugins/meanmenu/
 *
 */
(function ($) {
    "use strict";
    $.fn.meanmenu = function (options) {
        var defaults = {
            meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
            meanMenuContainer: "body", // Choose where meanmenu will be placed within the HTML
            meanMenuClose: "X", // single character you want to represent the close menu button
            meanMenuCloseSize: "18px", // set font size of close button
            meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
            meanRevealPosition: "", // left right or center positions
            meanRevealPositionDistance: "0", // Tweak the position of the menu
            meanRevealColour: "", // override CSS colours for the reveal background
            meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
            meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
            meanShowChildren: true, // true to show children in the menu, false to hide them
            meanExpandableChildren: true, // true to allow expand/collapse children
            meanExpand: "+", // single character you want to represent the expand for ULs
            meanContract: "-", // single character you want to represent the contract for ULs
            meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
            onePage: false, // set to true for one page sites
            meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
            removeElements: "", // set to hide page elements
        };
        options = $.extend(defaults, options);

        // get browser width
        var currentWidth =
            window.innerWidth || document.documentElement.clientWidth;

        return this.each(function () {
            var meanMenu = options.meanMenuTarget;
            var meanContainer = options.meanMenuContainer;
            var meanMenuClose = options.meanMenuClose;
            var meanMenuCloseSize = options.meanMenuCloseSize;
            var meanMenuOpen = options.meanMenuOpen;
            var meanRevealPosition = options.meanRevealPosition;
            var meanRevealPositionDistance = options.meanRevealPositionDistance;
            var meanRevealColour = options.meanRevealColour;
            var meanScreenWidth = options.meanScreenWidth;
            var meanNavPush = options.meanNavPush;
            var meanRevealClass = ".meanmenu-reveal";
            var meanShowChildren = options.meanShowChildren;
            var meanExpandableChildren = options.meanExpandableChildren;
            var meanExpand = options.meanExpand;
            var meanContract = options.meanContract;
            var meanRemoveAttrs = options.meanRemoveAttrs;
            var onePage = options.onePage;
            var meanDisplay = options.meanDisplay;
            var removeElements = options.removeElements;

            //detect known mobile/tablet usage
            var isMobile = false;
            if (
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/Blackberry/i) ||
                navigator.userAgent.match(/Windows Phone/i)
            ) {
                isMobile = true;
            }

            if (
                navigator.userAgent.match(/MSIE 8/i) ||
                navigator.userAgent.match(/MSIE 7/i)
            ) {
                // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
                jQuery("html").css("overflow-y", "scroll");
            }

            var meanRevealPos = "";
            var meanCentered = function () {
                if (meanRevealPosition === "center") {
                    var newWidth =
                        window.innerWidth ||
                        document.documentElement.clientWidth;
                    var meanCenter = newWidth / 2 - 22 + "px";
                    meanRevealPos = "left:" + meanCenter + ";right:auto;";

                    if (!isMobile) {
                        jQuery(".meanmenu-reveal").css("left", meanCenter);
                    } else {
                        jQuery(".meanmenu-reveal").animate({
                            left: meanCenter,
                        });
                    }
                }
            };

            var menuOn = false;
            var meanMenuExist = false;

            if (meanRevealPosition === "right") {
                meanRevealPos =
                    "right:" + meanRevealPositionDistance + ";left:auto;";
            }
            if (meanRevealPosition === "left") {
                meanRevealPos =
                    "left:" + meanRevealPositionDistance + ";right:auto;";
            }
            // run center function
            meanCentered();

            // set all styles for mean-reveal
            var $navreveal = "";

            var meanInner = function () {
                // get last class name
                if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
                    $navreveal.php(meanMenuClose);
                } else {
                    $navreveal.php(meanMenuOpen);
                }
            };

            // re-instate original nav (and call this on window.width functions)
            var meanOriginal = function () {
                jQuery(".mean-bar,.mean-push").remove();
                jQuery(meanContainer).removeClass("mean-container");
                jQuery(meanMenu).css("display", meanDisplay);
                menuOn = false;
                meanMenuExist = false;
                jQuery(removeElements).removeClass("mean-remove");
            };

            // navigation reveal
            var showMeanMenu = function () {
                var meanStyles =
                    "background:" +
                    meanRevealColour +
                    ";color:" +
                    meanRevealColour +
                    ";" +
                    meanRevealPos;
                if (currentWidth <= meanScreenWidth) {
                    jQuery(removeElements).addClass("mean-remove");
                    meanMenuExist = true;
                    // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
                    jQuery(meanContainer).addClass("mean-container");
                    jQuery(".mean-container").prepend(
                        '<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' +
                            meanStyles +
                            '">Show Navigation</a><nav class="mean-nav"></nav></div>'
                    );

                    //push meanMenu navigation into .mean-nav
                    var meanMenuContents = jQuery(meanMenu).php();
                    jQuery(".mean-nav").php(meanMenuContents);

                    // remove all classes from EVERYTHING inside meanmenu nav
                    if (meanRemoveAttrs) {
                        jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(
                            function () {
                                // First check if this has mean-remove class
                                if (jQuery(this).is(".mean-remove")) {
                                    jQuery(this).attr("class", "mean-remove");
                                } else {
                                    jQuery(this).removeAttr("class");
                                }
                                jQuery(this).removeAttr("id");
                            }
                        );
                    }

                    // push in a holder div (this can be used if removal of nav is causing layout issues)
                    jQuery(meanMenu).before('<div class="mean-push" />');
                    jQuery(".mean-push").css("margin-top", meanNavPush);

                    // hide current navigation and reveal mean nav link
                    jQuery(meanMenu).hide();
                    jQuery(".meanmenu-reveal").show();

                    // turn 'X' on or off
                    jQuery(meanRevealClass).php(meanMenuOpen);
                    $navreveal = jQuery(meanRevealClass);

                    //hide mean-nav ul
                    jQuery(".mean-nav ul").hide();

                    // hide sub nav
                    if (meanShowChildren) {
                        // allow expandable sub nav(s)
                        if (meanExpandableChildren) {
                            jQuery(".mean-nav ul ul").each(function () {
                                if (jQuery(this).children().length) {
                                    jQuery(this, "li:first")
                                        .parent()
                                        .append(
                                            '<a class="mean-expand" href="#" style="font-size: ' +
                                                meanMenuCloseSize +
                                                '">' +
                                                meanExpand +
                                                "</a>"
                                        );
                                }
                            });
                            jQuery(".mean-expand").on("click", function (e) {
                                e.preventDefault();
                                if (jQuery(this).hasClass("mean-clicked")) {
                                    jQuery(this).text(meanExpand);
                                    jQuery(this)
                                        .prev("ul")
                                        .slideUp(300, function () {});
                                } else {
                                    jQuery(this).text(meanContract);
                                    jQuery(this)
                                        .prev("ul")
                                        .slideDown(300, function () {});
                                }
                                jQuery(this).toggleClass("mean-clicked");
                            });
                        } else {
                            jQuery(".mean-nav ul ul").show();
                        }
                    } else {
                        jQuery(".mean-nav ul ul").hide();
                    }

                    // add last class to tidy up borders
                    jQuery(".mean-nav ul li").last().addClass("mean-last");
                    $navreveal.removeClass("meanclose");
                    jQuery($navreveal).click(function (e) {
                        e.preventDefault();
                        if (menuOn === false) {
                            $navreveal.css("text-align", "center");
                            $navreveal.css("text-indent", "0");
                            $navreveal.css("font-size", meanMenuCloseSize);
                            jQuery(".mean-nav ul:first").slideDown();
                            menuOn = true;
                        } else {
                            jQuery(".mean-nav ul:first").slideUp();
                            menuOn = false;
                        }
                        $navreveal.toggleClass("meanclose");
                        meanInner();
                        jQuery(removeElements).addClass("mean-remove");
                    });

                    // for one page websites, reset all variables...
                    if (onePage) {
                        jQuery(".mean-nav ul > li > a:first-child").on(
                            "click",
                            function () {
                                jQuery(".mean-nav ul:first").slideUp();
                                menuOn = false;
                                jQuery($navreveal)
                                    .toggleClass("meanclose")
                                    .php(meanMenuOpen);
                            }
                        );
                    }
                } else {
                    meanOriginal();
                }
            };

            if (!isMobile) {
                // reset menu on resize above meanScreenWidth
                jQuery(window).resize(function () {
                    currentWidth =
                        window.innerWidth ||
                        document.documentElement.clientWidth;
                    if (currentWidth > meanScreenWidth) {
                        meanOriginal();
                    } else {
                        meanOriginal();
                    }
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    } else {
                        meanOriginal();
                    }
                });
            }

            jQuery(window).resize(function () {
                // get browser width
                currentWidth =
                    window.innerWidth || document.documentElement.clientWidth;

                if (!isMobile) {
                    meanOriginal();
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    }
                } else {
                    meanCentered();
                    if (currentWidth <= meanScreenWidth) {
                        if (meanMenuExist === false) {
                            showMeanMenu();
                        }
                    } else {
                        meanOriginal();
                    }
                }
            });

            // run main menuMenu function on load
            showMeanMenu();
        });
    };
})(jQuery);

/*-------------------------------------------------------------
    03. Scrollup Jquery
---------------------------------------------------------------*/
!(function (l, o, e) {
    "use strict";
    (l.fn.scrollUp = function (o) {
        l.data(e.body, "scrollUp") ||
            (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
    }),
        (l.fn.scrollUp.init = function (r) {
            var s,
                t,
                c,
                i,
                n,
                a,
                d,
                p = (l.fn.scrollUp.settings = l.extend(
                    {},
                    l.fn.scrollUp.defaults,
                    r
                )),
                f = !1;
            switch (
                ((d = p.scrollTrigger
                    ? l(p.scrollTrigger)
                    : l("<a/>", { id: p.scrollName, href: "#top" })),
                p.scrollTitle && d.attr("title", p.scrollTitle),
                d.appendTo("body"),
                p.scrollImg || p.scrollTrigger || d.php(p.scrollText),
                d.css({ display: "none", position: "fixed", zIndex: p.zIndex }),
                p.activeOverlay &&
                    l("<div/>", { id: p.scrollName + "-active" })
                        .css({
                            position: "absolute",
                            top: p.scrollDistance + "px",
                            width: "100%",
                            borderTop: "1px dotted" + p.activeOverlay,
                            zIndex: p.zIndex,
                        })
                        .appendTo("body"),
                p.animation)
            ) {
                case "fade":
                    (s = "fadeIn"), (t = "fadeOut"), (c = p.animationSpeed);
                    break;
                case "slide":
                    (s = "slideDown"), (t = "slideUp"), (c = p.animationSpeed);
                    break;
                default:
                    (s = "show"), (t = "hide"), (c = 0);
            }
            (i =
                "top" === p.scrollFrom
                    ? p.scrollDistance
                    : l(e).height() - l(o).height() - p.scrollDistance),
                (n = l(o).scroll(function () {
                    l(o).scrollTop() > i
                        ? f || (d[s](c), (f = !0))
                        : f && (d[t](c), (f = !1));
                })),
                p.scrollTarget
                    ? "number" == typeof p.scrollTarget
                        ? (a = p.scrollTarget)
                        : "string" == typeof p.scrollTarget &&
                          (a = Math.floor(l(p.scrollTarget).offset().top))
                    : (a = 0),
                d.click(function (o) {
                    o.preventDefault(),
                        l("html, body").animate(
                            { scrollTop: a },
                            p.scrollSpeed,
                            p.easingType
                        );
                });
        }),
        (l.fn.scrollUp.defaults = {
            scrollName: "scrollUp",
            scrollDistance: 300,
            scrollFrom: "top",
            scrollSpeed: 300,
            easingType: "linear",
            animation: "fade",
            animationSpeed: 200,
            scrollTrigger: !1,
            scrollTarget: !1,
            scrollText: "Scroll to top",
            scrollTitle: !1,
            scrollImg: !1,
            activeOverlay: !1,
            zIndex: 2147483647,
        }),
        (l.fn.scrollUp.destroy = function (r) {
            l.removeData(e.body, "scrollUp"),
                l("#" + l.fn.scrollUp.settings.scrollName).remove(),
                l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
                l.fn.jquery.split(".")[1] >= 7
                    ? l(o).off("scroll", r)
                    : l(o).unbind("scroll", r);
        }),
        (l.scrollUp = l.fn.scrollUp);
})(jQuery, window, document);

/*========= Wow Js =========*/
/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/ (function () {
    var a,
        b,
        c,
        d,
        e,
        f = function (a, b) {
            return function () {
                return a.apply(b, arguments);
            };
        },
        g =
            [].indexOf ||
            function (a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1;
            };
    (b = (function () {
        function a() {}
        return (
            (a.prototype.extend = function (a, b) {
                var c, d;
                for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
                return a;
            }),
            (a.prototype.isMobile = function (a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    a
                );
            }),
            (a.prototype.createEvent = function (a, b, c, d) {
                var e;
                return (
                    null == b && (b = !1),
                    null == c && (c = !1),
                    null == d && (d = null),
                    null != document.createEvent
                        ? ((e = document.createEvent("CustomEvent")),
                          e.initCustomEvent(a, b, c, d))
                        : null != document.createEventObject
                        ? ((e = document.createEventObject()),
                          (e.eventType = a))
                        : (e.eventName = a),
                    e
                );
            }),
            (a.prototype.emitEvent = function (a, b) {
                return null != a.dispatchEvent
                    ? a.dispatchEvent(b)
                    : b in (null != a)
                    ? a[b]()
                    : "on" + b in (null != a)
                    ? a["on" + b]()
                    : void 0;
            }),
            (a.prototype.addEvent = function (a, b, c) {
                return null != a.addEventListener
                    ? a.addEventListener(b, c, !1)
                    : null != a.attachEvent
                    ? a.attachEvent("on" + b, c)
                    : (a[b] = c);
            }),
            (a.prototype.removeEvent = function (a, b, c) {
                return null != a.removeEventListener
                    ? a.removeEventListener(b, c, !1)
                    : null != a.detachEvent
                    ? a.detachEvent("on" + b, c)
                    : delete a[b];
            }),
            (a.prototype.innerHeight = function () {
                return "innerHeight" in window
                    ? window.innerHeight
                    : document.documentElement.clientHeight;
            }),
            a
        );
    })()),
        (c =
            this.WeakMap ||
            this.MozWeakMap ||
            (c = (function () {
                function a() {
                    (this.keys = []), (this.values = []);
                }
                return (
                    (a.prototype.get = function (a) {
                        var b, c, d, e, f;
                        for (
                            f = this.keys, b = d = 0, e = f.length;
                            e > d;
                            b = ++d
                        )
                            if (((c = f[b]), c === a)) return this.values[b];
                    }),
                    (a.prototype.set = function (a, b) {
                        var c, d, e, f, g;
                        for (
                            g = this.keys, c = e = 0, f = g.length;
                            f > e;
                            c = ++e
                        )
                            if (((d = g[c]), d === a))
                                return void (this.values[c] = b);
                        return this.keys.push(a), this.values.push(b);
                    }),
                    a
                );
            })())),
        (a =
            this.MutationObserver ||
            this.WebkitMutationObserver ||
            this.MozMutationObserver ||
            (a = (function () {
                function a() {
                    "undefined" != typeof console &&
                        null !== console &&
                        console.warn(
                            "MutationObserver is not supported by your browser."
                        ),
                        "undefined" != typeof console &&
                            null !== console &&
                            console.warn(
                                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                            );
                }
                return (
                    (a.notSupported = !0),
                    (a.prototype.observe = function () {}),
                    a
                );
            })())),
        (d =
            this.getComputedStyle ||
            function (a, b) {
                return (
                    (this.getPropertyValue = function (b) {
                        var c;
                        return (
                            "float" === b && (b = "styleFloat"),
                            e.test(b) &&
                                b.replace(e, function (a, b) {
                                    return b.toUpperCase();
                                }),
                            (null != (c = a.currentStyle) ? c[b] : void 0) ||
                                null
                        );
                    }),
                    this
                );
            }),
        (e = /(\-([a-z]){1})/g),
        (this.WOW = (function () {
            function e(a) {
                null == a && (a = {}),
                    (this.scrollCallback = f(this.scrollCallback, this)),
                    (this.scrollHandler = f(this.scrollHandler, this)),
                    (this.resetAnimation = f(this.resetAnimation, this)),
                    (this.start = f(this.start, this)),
                    (this.scrolled = !0),
                    (this.config = this.util().extend(a, this.defaults)),
                    null != a.scrollContainer &&
                        (this.config.scrollContainer = document.querySelector(
                            a.scrollContainer
                        )),
                    (this.animationNameCache = new c()),
                    (this.wowEvent = this.util().createEvent(
                        this.config.boxClass
                    ));
            }
            return (
                (e.prototype.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0,
                    callback: null,
                    scrollContainer: null,
                }),
                (e.prototype.init = function () {
                    var a;
                    return (
                        (this.element = window.document.documentElement),
                        "interactive" === (a = document.readyState) ||
                        "complete" === a
                            ? this.start()
                            : this.util().addEvent(
                                  document,
                                  "DOMContentLoaded",
                                  this.start
                              ),
                        (this.finished = [])
                    );
                }),
                (e.prototype.start = function () {
                    var b, c, d, e;
                    if (
                        ((this.stopped = !1),
                        (this.boxes = function () {
                            var a, c, d, e;
                            for (
                                d = this.element.querySelectorAll(
                                    "." + this.config.boxClass
                                ),
                                    e = [],
                                    a = 0,
                                    c = d.length;
                                c > a;
                                a++
                            )
                                (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        (this.all = function () {
                            var a, c, d, e;
                            for (
                                d = this.boxes, e = [], a = 0, c = d.length;
                                c > a;
                                a++
                            )
                                (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        this.boxes.length)
                    )
                        if (this.disabled()) this.resetStyle();
                        else
                            for (
                                e = this.boxes, c = 0, d = e.length;
                                d > c;
                                c++
                            )
                                (b = e[c]), this.applyStyle(b, !0);
                    return (
                        this.disabled() ||
                            (this.util().addEvent(
                                this.config.scrollContainer || window,
                                "scroll",
                                this.scrollHandler
                            ),
                            this.util().addEvent(
                                window,
                                "resize",
                                this.scrollHandler
                            ),
                            (this.interval = setInterval(
                                this.scrollCallback,
                                50
                            ))),
                        this.config.live
                            ? new a(
                                  (function (a) {
                                      return function (b) {
                                          var c, d, e, f, g;
                                          for (
                                              g = [], c = 0, d = b.length;
                                              d > c;
                                              c++
                                          )
                                              (f = b[c]),
                                                  g.push(
                                                      function () {
                                                          var a, b, c, d;
                                                          for (
                                                              c =
                                                                  f.addedNodes ||
                                                                  [],
                                                                  d = [],
                                                                  a = 0,
                                                                  b = c.length;
                                                              b > a;
                                                              a++
                                                          )
                                                              (e = c[a]),
                                                                  d.push(
                                                                      this.doSync(
                                                                          e
                                                                      )
                                                                  );
                                                          return d;
                                                      }.call(a)
                                                  );
                                          return g;
                                      };
                                  })(this)
                              ).observe(document.body, {
                                  childList: !0,
                                  subtree: !0,
                              })
                            : void 0
                    );
                }),
                (e.prototype.stop = function () {
                    return (
                        (this.stopped = !0),
                        this.util().removeEvent(
                            this.config.scrollContainer || window,
                            "scroll",
                            this.scrollHandler
                        ),
                        this.util().removeEvent(
                            window,
                            "resize",
                            this.scrollHandler
                        ),
                        null != this.interval
                            ? clearInterval(this.interval)
                            : void 0
                    );
                }),
                (e.prototype.sync = function (b) {
                    return a.notSupported ? this.doSync(this.element) : void 0;
                }),
                (e.prototype.doSync = function (a) {
                    var b, c, d, e, f;
                    if ((null == a && (a = this.element), 1 === a.nodeType)) {
                        for (
                            a = a.parentNode || a,
                                e = a.querySelectorAll(
                                    "." + this.config.boxClass
                                ),
                                f = [],
                                c = 0,
                                d = e.length;
                            d > c;
                            c++
                        )
                            (b = e[c]),
                                g.call(this.all, b) < 0
                                    ? (this.boxes.push(b),
                                      this.all.push(b),
                                      this.stopped || this.disabled()
                                          ? this.resetStyle()
                                          : this.applyStyle(b, !0),
                                      f.push((this.scrolled = !0)))
                                    : f.push(void 0);
                        return f;
                    }
                }),
                (e.prototype.show = function (a) {
                    return (
                        this.applyStyle(a),
                        (a.className =
                            a.className + " " + this.config.animateClass),
                        null != this.config.callback && this.config.callback(a),
                        this.util().emitEvent(a, this.wowEvent),
                        this.util().addEvent(
                            a,
                            "animationend",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "oanimationend",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "webkitAnimationEnd",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "MSAnimationEnd",
                            this.resetAnimation
                        ),
                        a
                    );
                }),
                (e.prototype.applyStyle = function (a, b) {
                    var c, d, e;
                    return (
                        (d = a.getAttribute("data-wow-duration")),
                        (c = a.getAttribute("data-wow-delay")),
                        (e = a.getAttribute("data-wow-iteration")),
                        this.animate(
                            (function (f) {
                                return function () {
                                    return f.customStyle(a, b, d, c, e);
                                };
                            })(this)
                        )
                    );
                }),
                (e.prototype.animate = (function () {
                    return "requestAnimationFrame" in window
                        ? function (a) {
                              return window.requestAnimationFrame(a);
                          }
                        : function (a) {
                              return a();
                          };
                })()),
                (e.prototype.resetStyle = function () {
                    var a, b, c, d, e;
                    for (
                        d = this.boxes, e = [], b = 0, c = d.length;
                        c > b;
                        b++
                    )
                        (a = d[b]), e.push((a.style.visibility = "visible"));
                    return e;
                }),
                (e.prototype.resetAnimation = function (a) {
                    var b;
                    return a.type.toLowerCase().indexOf("animationend") >= 0
                        ? ((b = a.target || a.srcElement),
                          (b.className = b.className
                              .replace(this.config.animateClass, "")
                              .trim()))
                        : void 0;
                }),
                (e.prototype.customStyle = function (a, b, c, d, e) {
                    return (
                        b && this.cacheAnimationName(a),
                        (a.style.visibility = b ? "hidden" : "visible"),
                        c && this.vendorSet(a.style, { animationDuration: c }),
                        d && this.vendorSet(a.style, { animationDelay: d }),
                        e &&
                            this.vendorSet(a.style, {
                                animationIterationCount: e,
                            }),
                        this.vendorSet(a.style, {
                            animationName: b
                                ? "none"
                                : this.cachedAnimationName(a),
                        }),
                        a
                    );
                }),
                (e.prototype.vendors = ["moz", "webkit"]),
                (e.prototype.vendorSet = function (a, b) {
                    var c, d, e, f;
                    d = [];
                    for (c in b)
                        (e = b[c]),
                            (a["" + c] = e),
                            d.push(
                                function () {
                                    var b, d, g, h;
                                    for (
                                        g = this.vendors,
                                            h = [],
                                            b = 0,
                                            d = g.length;
                                        d > b;
                                        b++
                                    )
                                        (f = g[b]),
                                            h.push(
                                                (a[
                                                    "" +
                                                        f +
                                                        c
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        c.substr(1)
                                                ] = e)
                                            );
                                    return h;
                                }.call(this)
                            );
                    return d;
                }),
                (e.prototype.vendorCSS = function (a, b) {
                    var c, e, f, g, h, i;
                    for (
                        h = d(a),
                            g = h.getPropertyCSSValue(b),
                            f = this.vendors,
                            c = 0,
                            e = f.length;
                        e > c;
                        c++
                    )
                        (i = f[c]),
                            (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
                    return g;
                }),
                (e.prototype.animationName = function (a) {
                    var b;
                    try {
                        b = this.vendorCSS(a, "animation-name").cssText;
                    } catch (c) {
                        b = d(a).getPropertyValue("animation-name");
                    }
                    return "none" === b ? "" : b;
                }),
                (e.prototype.cacheAnimationName = function (a) {
                    return this.animationNameCache.set(
                        a,
                        this.animationName(a)
                    );
                }),
                (e.prototype.cachedAnimationName = function (a) {
                    return this.animationNameCache.get(a);
                }),
                (e.prototype.scrollHandler = function () {
                    return (this.scrolled = !0);
                }),
                (e.prototype.scrollCallback = function () {
                    var a;
                    return !this.scrolled ||
                        ((this.scrolled = !1),
                        (this.boxes = function () {
                            var b, c, d, e;
                            for (
                                d = this.boxes, e = [], b = 0, c = d.length;
                                c > b;
                                b++
                            )
                                (a = d[b]),
                                    a &&
                                        (this.isVisible(a)
                                            ? this.show(a)
                                            : e.push(a));
                            return e;
                        }.call(this)),
                        this.boxes.length || this.config.live)
                        ? void 0
                        : this.stop();
                }),
                (e.prototype.offsetTop = function (a) {
                    for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
                    for (b = a.offsetTop; (a = a.offsetParent); )
                        b += a.offsetTop;
                    return b;
                }),
                (e.prototype.isVisible = function (a) {
                    var b, c, d, e, f;
                    return (
                        (c =
                            a.getAttribute("data-wow-offset") ||
                            this.config.offset),
                        (f =
                            (this.config.scrollContainer &&
                                this.config.scrollContainer.scrollTop) ||
                            window.pageYOffset),
                        (e =
                            f +
                            Math.min(
                                this.element.clientHeight,
                                this.util().innerHeight()
                            ) -
                            c),
                        (d = this.offsetTop(a)),
                        (b = d + a.clientHeight),
                        e >= d && b >= f
                    );
                }),
                (e.prototype.util = function () {
                    return null != this._util
                        ? this._util
                        : (this._util = new b());
                }),
                (e.prototype.disabled = function () {
                    return (
                        !this.config.mobile &&
                        this.util().isMobile(navigator.userAgent)
                    );
                }),
                e
            );
        })());
}.call(this));

/*-------------------------------------------------------------
  06. Chosen
---------------------------------------------------------------*/

/* Chosen v1.5.1 | (c) 2011-2016 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function () {
    var a,
        AbstractChosen,
        Chosen,
        SelectParser,
        b,
        c = {}.hasOwnProperty,
        d = function (a, b) {
            function d() {
                this.constructor = a;
            }
            for (var e in b) c.call(b, e) && (a[e] = b[e]);
            return (
                (d.prototype = b.prototype),
                (a.prototype = new d()),
                (a.__super__ = b.prototype),
                a
            );
        };
    (SelectParser = (function () {
        function SelectParser() {
            (this.options_index = 0), (this.parsed = []);
        }
        return (
            (SelectParser.prototype.add_node = function (a) {
                return "OPTGROUP" === a.nodeName.toUpperCase()
                    ? this.add_group(a)
                    : this.add_option(a);
            }),
            (SelectParser.prototype.add_group = function (a) {
                var b, c, d, e, f, g;
                for (
                    b = this.parsed.length,
                        this.parsed.push({
                            array_index: b,
                            group: !0,
                            label: this.escapeExpression(a.label),
                            title: a.title ? a.title : void 0,
                            children: 0,
                            disabled: a.disabled,
                            classes: a.className,
                        }),
                        f = a.childNodes,
                        g = [],
                        d = 0,
                        e = f.length;
                    e > d;
                    d++
                )
                    (c = f[d]), g.push(this.add_option(c, b, a.disabled));
                return g;
            }),
            (SelectParser.prototype.add_option = function (a, b, c) {
                return "OPTION" === a.nodeName.toUpperCase()
                    ? ("" !== a.text
                          ? (null != b && (this.parsed[b].children += 1),
                            this.parsed.push({
                                array_index: this.parsed.length,
                                options_index: this.options_index,
                                value: a.value,
                                text: a.text,
                                html: a.innerHTML,
                                title: a.title ? a.title : void 0,
                                selected: a.selected,
                                disabled: c === !0 ? c : a.disabled,
                                group_array_index: b,
                                group_label:
                                    null != b ? this.parsed[b].label : null,
                                classes: a.className,
                                style: a.style.cssText,
                            }))
                          : this.parsed.push({
                                array_index: this.parsed.length,
                                options_index: this.options_index,
                                empty: !0,
                            }),
                      (this.options_index += 1))
                    : void 0;
            }),
            (SelectParser.prototype.escapeExpression = function (a) {
                var b, c;
                return null == a || a === !1
                    ? ""
                    : /[\&\<\>\"\'\`]/.test(a)
                    ? ((b = {
                          "<": "&lt;",
                          ">": "&gt;",
                          '"': "&quot;",
                          "'": "&#x27;",
                          "`": "&#x60;",
                      }),
                      (c = /&(?!\w+;)|[\<\>\"\'\`]/g),
                      a.replace(c, function (a) {
                          return b[a] || "&amp;";
                      }))
                    : a;
            }),
            SelectParser
        );
    })()),
        (SelectParser.select_to_array = function (a) {
            var b, c, d, e, f;
            for (
                c = new SelectParser(), f = a.childNodes, d = 0, e = f.length;
                e > d;
                d++
            )
                (b = f[d]), c.add_node(b);
            return c.parsed;
        }),
        (AbstractChosen = (function () {
            function AbstractChosen(a, b) {
                (this.form_field = a),
                    (this.options = null != b ? b : {}),
                    AbstractChosen.browser_is_supported() &&
                        ((this.is_multiple = this.form_field.multiple),
                        this.set_default_text(),
                        this.set_default_values(),
                        this.setup(),
                        this.set_up_html(),
                        this.register_observers(),
                        this.on_ready());
            }
            return (
                (AbstractChosen.prototype.set_default_values = function () {
                    var a = this;
                    return (
                        (this.click_test_action = function (b) {
                            return a.test_active_click(b);
                        }),
                        (this.activate_action = function (b) {
                            return a.activate_field(b);
                        }),
                        (this.active_field = !1),
                        (this.mouse_on_container = !1),
                        (this.results_showing = !1),
                        (this.result_highlighted = null),
                        (this.allow_single_deselect =
                            null != this.options.allow_single_deselect &&
                            null != this.form_field.options[0] &&
                            "" === this.form_field.options[0].text
                                ? this.options.allow_single_deselect
                                : !1),
                        (this.disable_search_threshold =
                            this.options.disable_search_threshold || 0),
                        (this.disable_search =
                            this.options.disable_search || !1),
                        (this.enable_split_word_search =
                            null != this.options.enable_split_word_search
                                ? this.options.enable_split_word_search
                                : !0),
                        (this.group_search =
                            null != this.options.group_search
                                ? this.options.group_search
                                : !0),
                        (this.search_contains =
                            this.options.search_contains || !1),
                        (this.single_backstroke_delete =
                            null != this.options.single_backstroke_delete
                                ? this.options.single_backstroke_delete
                                : !0),
                        (this.max_selected_options =
                            this.options.max_selected_options || 1 / 0),
                        (this.inherit_select_classes =
                            this.options.inherit_select_classes || !1),
                        (this.display_selected_options =
                            null != this.options.display_selected_options
                                ? this.options.display_selected_options
                                : !0),
                        (this.display_disabled_options =
                            null != this.options.display_disabled_options
                                ? this.options.display_disabled_options
                                : !0),
                        (this.include_group_label_in_selected =
                            this.options.include_group_label_in_selected || !1),
                        (this.max_shown_results =
                            this.options.max_shown_results ||
                            Number.POSITIVE_INFINITY)
                    );
                }),
                (AbstractChosen.prototype.set_default_text = function () {
                    return (
                        this.form_field.getAttribute("data-placeholder")
                            ? (this.default_text =
                                  this.form_field.getAttribute(
                                      "data-placeholder"
                                  ))
                            : this.is_multiple
                            ? (this.default_text =
                                  this.options.placeholder_text_multiple ||
                                  this.options.placeholder_text ||
                                  AbstractChosen.default_multiple_text)
                            : (this.default_text =
                                  this.options.placeholder_text_single ||
                                  this.options.placeholder_text ||
                                  AbstractChosen.default_single_text),
                        (this.results_none_found =
                            this.form_field.getAttribute(
                                "data-no_results_text"
                            ) ||
                            this.options.no_results_text ||
                            AbstractChosen.default_no_result_text)
                    );
                }),
                (AbstractChosen.prototype.choice_label = function (a) {
                    return this.include_group_label_in_selected &&
                        null != a.group_label
                        ? "<b class='group-name'>" +
                              a.group_label +
                              "</b>" +
                              a.php
                        : a.php;
                }),
                (AbstractChosen.prototype.mouse_enter = function () {
                    return (this.mouse_on_container = !0);
                }),
                (AbstractChosen.prototype.mouse_leave = function () {
                    return (this.mouse_on_container = !1);
                }),
                (AbstractChosen.prototype.input_focus = function (a) {
                    var b = this;
                    if (this.is_multiple) {
                        if (!this.active_field)
                            return setTimeout(function () {
                                return b.container_mousedown();
                            }, 50);
                    } else if (!this.active_field) return this.activate_field();
                }),
                (AbstractChosen.prototype.input_blur = function (a) {
                    var b = this;
                    return this.mouse_on_container
                        ? void 0
                        : ((this.active_field = !1),
                          setTimeout(function () {
                              return b.blur_test();
                          }, 100));
                }),
                (AbstractChosen.prototype.results_option_build = function (a) {
                    var b, c, d, e, f, g, h;
                    for (
                        b = "",
                            e = 0,
                            h = this.results_data,
                            f = 0,
                            g = h.length;
                        g > f &&
                        ((c = h[f]),
                        (d = ""),
                        (d = c.group
                            ? this.result_add_group(c)
                            : this.result_add_option(c)),
                        "" !== d && (e++, (b += d)),
                        (null != a ? a.first : void 0) &&
                            (c.selected && this.is_multiple
                                ? this.choice_build(c)
                                : c.selected &&
                                  !this.is_multiple &&
                                  this.single_set_selected_text(
                                      this.choice_label(c)
                                  )),
                        !(e >= this.max_shown_results));
                        f++
                    );
                    return b;
                }),
                (AbstractChosen.prototype.result_add_option = function (a) {
                    var b, c;
                    return a.search_match && this.include_option_in_results(a)
                        ? ((b = []),
                          a.disabled ||
                              (a.selected && this.is_multiple) ||
                              b.push("active-result"),
                          !a.disabled ||
                              (a.selected && this.is_multiple) ||
                              b.push("disabled-result"),
                          a.selected && b.push("result-selected"),
                          null != a.group_array_index && b.push("group-option"),
                          "" !== a.classes && b.push(a.classes),
                          (c = document.createElement("li")),
                          (c.className = b.join(" ")),
                          (c.style.cssText = a.style),
                          c.setAttribute(
                              "data-option-array-index",
                              a.array_index
                          ),
                          (c.innerHTML = a.search_text),
                          a.title && (c.title = a.title),
                          this.outerHTML(c))
                        : "";
                }),
                (AbstractChosen.prototype.result_add_group = function (a) {
                    var b, c;
                    return (a.search_match || a.group_match) &&
                        a.active_options > 0
                        ? ((b = []),
                          b.push("group-result"),
                          a.classes && b.push(a.classes),
                          (c = document.createElement("li")),
                          (c.className = b.join(" ")),
                          (c.innerHTML = a.search_text),
                          a.title && (c.title = a.title),
                          this.outerHTML(c))
                        : "";
                }),
                (AbstractChosen.prototype.results_update_field = function () {
                    return (
                        this.set_default_text(),
                        this.is_multiple || this.results_reset_cleanup(),
                        this.result_clear_highlight(),
                        this.results_build(),
                        this.results_showing ? this.winnow_results() : void 0
                    );
                }),
                (AbstractChosen.prototype.reset_single_select_options =
                    function () {
                        var a, b, c, d, e;
                        for (
                            d = this.results_data, e = [], b = 0, c = d.length;
                            c > b;
                            b++
                        )
                            (a = d[b]),
                                a.selected
                                    ? e.push((a.selected = !1))
                                    : e.push(void 0);
                        return e;
                    }),
                (AbstractChosen.prototype.results_toggle = function () {
                    return this.results_showing
                        ? this.results_hide()
                        : this.results_show();
                }),
                (AbstractChosen.prototype.results_search = function (a) {
                    return this.results_showing
                        ? this.winnow_results()
                        : this.results_show();
                }),
                (AbstractChosen.prototype.winnow_results = function () {
                    var a, b, c, d, e, f, g, h, i, j, k, l;
                    for (
                        this.no_results_clear(),
                            d = 0,
                            f = this.get_search_text(),
                            a = f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
                            i = new RegExp(a, "i"),
                            c = this.get_search_regex(a),
                            l = this.results_data,
                            j = 0,
                            k = l.length;
                        k > j;
                        j++
                    )
                        (b = l[j]),
                            (b.search_match = !1),
                            (e = null),
                            this.include_option_in_results(b) &&
                                (b.group &&
                                    ((b.group_match = !1),
                                    (b.active_options = 0)),
                                null != b.group_array_index &&
                                    this.results_data[b.group_array_index] &&
                                    ((e =
                                        this.results_data[b.group_array_index]),
                                    0 === e.active_options &&
                                        e.search_match &&
                                        (d += 1),
                                    (e.active_options += 1)),
                                (b.search_text = b.group ? b.label : b.php),
                                (!b.group || this.group_search) &&
                                    ((b.search_match = this.search_string_match(
                                        b.search_text,
                                        c
                                    )),
                                    b.search_match && !b.group && (d += 1),
                                    b.search_match
                                        ? (f.length &&
                                              ((g = b.search_text.search(i)),
                                              (h =
                                                  b.search_text.substr(
                                                      0,
                                                      g + f.length
                                                  ) +
                                                  "</em>" +
                                                  b.search_text.substr(
                                                      g + f.length
                                                  )),
                                              (b.search_text =
                                                  h.substr(0, g) +
                                                  "<em>" +
                                                  h.substr(g))),
                                          null != e && (e.group_match = !0))
                                        : null != b.group_array_index &&
                                          this.results_data[b.group_array_index]
                                              .search_match &&
                                          (b.search_match = !0)));
                    return (
                        this.result_clear_highlight(),
                        1 > d && f.length
                            ? (this.update_results_content(""),
                              this.no_results(f))
                            : (this.update_results_content(
                                  this.results_option_build()
                              ),
                              this.winnow_results_set_highlight())
                    );
                }),
                (AbstractChosen.prototype.get_search_regex = function (a) {
                    var b;
                    return (
                        (b = this.search_contains ? "" : "^"),
                        new RegExp(b + a, "i")
                    );
                }),
                (AbstractChosen.prototype.search_string_match = function (
                    a,
                    b
                ) {
                    var c, d, e, f;
                    if (b.test(a)) return !0;
                    if (
                        this.enable_split_word_search &&
                        (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) &&
                        ((d = a.replace(/\[|\]/g, "").split(" ")), d.length)
                    )
                        for (e = 0, f = d.length; f > e; e++)
                            if (((c = d[e]), b.test(c))) return !0;
                }),
                (AbstractChosen.prototype.choices_count = function () {
                    var a, b, c, d;
                    if (null != this.selected_option_count)
                        return this.selected_option_count;
                    for (
                        this.selected_option_count = 0,
                            d = this.form_field.options,
                            b = 0,
                            c = d.length;
                        c > b;
                        b++
                    )
                        (a = d[b]),
                            a.selected && (this.selected_option_count += 1);
                    return this.selected_option_count;
                }),
                (AbstractChosen.prototype.choices_click = function (a) {
                    return (
                        a.preventDefault(),
                        this.results_showing || this.is_disabled
                            ? void 0
                            : this.results_show()
                    );
                }),
                (AbstractChosen.prototype.keyup_checker = function (a) {
                    var b, c;
                    switch (
                        ((b = null != (c = a.which) ? c : a.keyCode),
                        this.search_field_scale(),
                        b)
                    ) {
                        case 8:
                            if (
                                this.is_multiple &&
                                this.backstroke_length < 1 &&
                                this.choices_count() > 0
                            )
                                return this.keydown_backstroke();
                            if (!this.pending_backstroke)
                                return (
                                    this.result_clear_highlight(),
                                    this.results_search()
                                );
                            break;
                        case 13:
                            if ((a.preventDefault(), this.results_showing))
                                return this.result_select(a);
                            break;
                        case 27:
                            return (
                                this.results_showing && this.results_hide(), !0
                            );
                        case 9:
                        case 38:
                        case 40:
                        case 16:
                        case 91:
                        case 17:
                        case 18:
                            break;
                        default:
                            return this.results_search();
                    }
                }),
                (AbstractChosen.prototype.clipboard_event_checker = function (
                    a
                ) {
                    var b = this;
                    return setTimeout(function () {
                        return b.results_search();
                    }, 50);
                }),
                (AbstractChosen.prototype.container_width = function () {
                    return null != this.options.width
                        ? this.options.width
                        : "" + this.form_field.offsetWidth + "px";
                }),
                (AbstractChosen.prototype.include_option_in_results = function (
                    a
                ) {
                    return this.is_multiple &&
                        !this.display_selected_options &&
                        a.selected
                        ? !1
                        : !this.display_disabled_options && a.disabled
                        ? !1
                        : a.empty
                        ? !1
                        : !0;
                }),
                (AbstractChosen.prototype.search_results_touchstart = function (
                    a
                ) {
                    return (
                        (this.touch_started = !0),
                        this.search_results_mouseover(a)
                    );
                }),
                (AbstractChosen.prototype.search_results_touchmove = function (
                    a
                ) {
                    return (
                        (this.touch_started = !1),
                        this.search_results_mouseout(a)
                    );
                }),
                (AbstractChosen.prototype.search_results_touchend = function (
                    a
                ) {
                    return this.touch_started
                        ? this.search_results_mouseup(a)
                        : void 0;
                }),
                (AbstractChosen.prototype.outerHTML = function (a) {
                    var b;
                    return a.outerHTML
                        ? a.outerHTML
                        : ((b = document.createElement("div")),
                          b.appendChild(a),
                          b.innerHTML);
                }),
                (AbstractChosen.browser_is_supported = function () {
                    return /iP(od|hone)/i.test(window.navigator.userAgent)
                        ? !1
                        : /Android/i.test(window.navigator.userAgent) &&
                          /Mobile/i.test(window.navigator.userAgent)
                        ? !1
                        : /IEMobile/i.test(window.navigator.userAgent)
                        ? !1
                        : /Windows Phone/i.test(window.navigator.userAgent)
                        ? !1
                        : /BlackBerry/i.test(window.navigator.userAgent)
                        ? !1
                        : /BB10/i.test(window.navigator.userAgent)
                        ? !1
                        : "Microsoft Internet Explorer" ===
                          window.navigator.appName
                        ? document.documentMode >= 8
                        : !0;
                }),
                (AbstractChosen.default_multiple_text = "Select Some Options"),
                (AbstractChosen.default_single_text = "Select an Option"),
                (AbstractChosen.default_no_result_text = "No results match"),
                AbstractChosen
            );
        })()),
        (a = jQuery),
        a.fn.extend({
            chosen: function (b) {
                return AbstractChosen.browser_is_supported()
                    ? this.each(function (c) {
                          var d, e;
                          return (
                              (d = a(this)),
                              (e = d.data("chosen")),
                              "destroy" === b
                                  ? void (e instanceof Chosen && e.destroy())
                                  : void (
                                        e instanceof Chosen ||
                                        d.data("chosen", new Chosen(this, b))
                                    )
                          );
                      })
                    : this;
            },
        }),
        (Chosen = (function (c) {
            function Chosen() {
                return (b = Chosen.__super__.constructor.apply(
                    this,
                    arguments
                ));
            }
            return (
                d(Chosen, c),
                (Chosen.prototype.setup = function () {
                    return (
                        (this.form_field_jq = a(this.form_field)),
                        (this.current_selectedIndex =
                            this.form_field.selectedIndex),
                        (this.is_rtl =
                            this.form_field_jq.hasClass("chosen-rtl"))
                    );
                }),
                (Chosen.prototype.set_up_html = function () {
                    var b, c;
                    return (
                        (b = ["chosen-container"]),
                        b.push(
                            "chosen-container-" +
                                (this.is_multiple ? "multi" : "single")
                        ),
                        this.inherit_select_classes &&
                            this.form_field.className &&
                            b.push(this.form_field.className),
                        this.is_rtl && b.push("chosen-rtl"),
                        (c = {
                            class: b.join(" "),
                            style: "width: " + this.container_width() + ";",
                            title: this.form_field.title,
                        }),
                        this.form_field.id.length &&
                            (c.id =
                                this.form_field.id.replace(/[^\w]/g, "_") +
                                "_chosen"),
                        (this.container = a("<div />", c)),
                        this.is_multiple
                            ? this.container.php(
                                  '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' +
                                      this.default_text +
                                      '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'
                              )
                            : this.container.php(
                                  '<a class="chosen-single chosen-default"><span>' +
                                      this.default_text +
                                      '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'
                              ),
                        this.form_field_jq.hide().after(this.container),
                        (this.dropdown = this.container
                            .find("div.chosen-drop")
                            .first()),
                        (this.search_field = this.container
                            .find("input")
                            .first()),
                        (this.search_results = this.container
                            .find("ul.chosen-results")
                            .first()),
                        this.search_field_scale(),
                        (this.search_no_results = this.container
                            .find("li.no-results")
                            .first()),
                        this.is_multiple
                            ? ((this.search_choices = this.container
                                  .find("ul.chosen-choices")
                                  .first()),
                              (this.search_container = this.container
                                  .find("li.search-field")
                                  .first()))
                            : ((this.search_container = this.container
                                  .find("div.chosen-search")
                                  .first()),
                              (this.selected_item = this.container
                                  .find(".chosen-single")
                                  .first())),
                        this.results_build(),
                        this.set_tab_index(),
                        this.set_label_behavior()
                    );
                }),
                (Chosen.prototype.on_ready = function () {
                    return this.form_field_jq.trigger("chosen:ready", {
                        chosen: this,
                    });
                }),
                (Chosen.prototype.register_observers = function () {
                    var a = this;
                    return (
                        this.container.bind("touchstart.chosen", function (b) {
                            return a.container_mousedown(b), b.preventDefault();
                        }),
                        this.container.bind("touchend.chosen", function (b) {
                            return a.container_mouseup(b), b.preventDefault();
                        }),
                        this.container.bind("mousedown.chosen", function (b) {
                            a.container_mousedown(b);
                        }),
                        this.container.bind("mouseup.chosen", function (b) {
                            a.container_mouseup(b);
                        }),
                        this.container.bind("mouseenter.chosen", function (b) {
                            a.mouse_enter(b);
                        }),
                        this.container.bind("mouseleave.chosen", function (b) {
                            a.mouse_leave(b);
                        }),
                        this.search_results.bind(
                            "mouseup.chosen",
                            function (b) {
                                a.search_results_mouseup(b);
                            }
                        ),
                        this.search_results.bind(
                            "mouseover.chosen",
                            function (b) {
                                a.search_results_mouseover(b);
                            }
                        ),
                        this.search_results.bind(
                            "mouseout.chosen",
                            function (b) {
                                a.search_results_mouseout(b);
                            }
                        ),
                        this.search_results.bind(
                            "mousewheel.chosen DOMMouseScroll.chosen",
                            function (b) {
                                a.search_results_mousewheel(b);
                            }
                        ),
                        this.search_results.bind(
                            "touchstart.chosen",
                            function (b) {
                                a.search_results_touchstart(b);
                            }
                        ),
                        this.search_results.bind(
                            "touchmove.chosen",
                            function (b) {
                                a.search_results_touchmove(b);
                            }
                        ),
                        this.search_results.bind(
                            "touchend.chosen",
                            function (b) {
                                a.search_results_touchend(b);
                            }
                        ),
                        this.form_field_jq.bind(
                            "chosen:updated.chosen",
                            function (b) {
                                a.results_update_field(b);
                            }
                        ),
                        this.form_field_jq.bind(
                            "chosen:activate.chosen",
                            function (b) {
                                a.activate_field(b);
                            }
                        ),
                        this.form_field_jq.bind(
                            "chosen:open.chosen",
                            function (b) {
                                a.container_mousedown(b);
                            }
                        ),
                        this.form_field_jq.bind(
                            "chosen:close.chosen",
                            function (b) {
                                a.input_blur(b);
                            }
                        ),
                        this.search_field.bind("blur.chosen", function (b) {
                            a.input_blur(b);
                        }),
                        this.search_field.bind("keyup.chosen", function (b) {
                            a.keyup_checker(b);
                        }),
                        this.search_field.bind("keydown.chosen", function (b) {
                            a.keydown_checker(b);
                        }),
                        this.search_field.bind("focus.chosen", function (b) {
                            a.input_focus(b);
                        }),
                        this.search_field.bind("cut.chosen", function (b) {
                            a.clipboard_event_checker(b);
                        }),
                        this.search_field.bind("paste.chosen", function (b) {
                            a.clipboard_event_checker(b);
                        }),
                        this.is_multiple
                            ? this.search_choices.bind(
                                  "click.chosen",
                                  function (b) {
                                      a.choices_click(b);
                                  }
                              )
                            : this.container.bind("click.chosen", function (a) {
                                  a.preventDefault();
                              })
                    );
                }),
                (Chosen.prototype.destroy = function () {
                    return (
                        a(this.container[0].ownerDocument).unbind(
                            "click.chosen",
                            this.click_test_action
                        ),
                        this.search_field[0].tabIndex &&
                            (this.form_field_jq[0].tabIndex =
                                this.search_field[0].tabIndex),
                        this.container.remove(),
                        this.form_field_jq.removeData("chosen"),
                        this.form_field_jq.show()
                    );
                }),
                (Chosen.prototype.search_field_disabled = function () {
                    return (
                        (this.is_disabled = this.form_field_jq[0].disabled),
                        this.is_disabled
                            ? (this.container.addClass("chosen-disabled"),
                              (this.search_field[0].disabled = !0),
                              this.is_multiple ||
                                  this.selected_item.unbind(
                                      "focus.chosen",
                                      this.activate_action
                                  ),
                              this.close_field())
                            : (this.container.removeClass("chosen-disabled"),
                              (this.search_field[0].disabled = !1),
                              this.is_multiple
                                  ? void 0
                                  : this.selected_item.bind(
                                        "focus.chosen",
                                        this.activate_action
                                    ))
                    );
                }),
                (Chosen.prototype.container_mousedown = function (b) {
                    return this.is_disabled ||
                        (b &&
                            "mousedown" === b.type &&
                            !this.results_showing &&
                            b.preventDefault(),
                        null != b &&
                            a(b.target).hasClass("search-choice-close"))
                        ? void 0
                        : (this.active_field
                              ? this.is_multiple ||
                                !b ||
                                (a(b.target)[0] !== this.selected_item[0] &&
                                    !a(b.target).parents("a.chosen-single")
                                        .length) ||
                                (b.preventDefault(), this.results_toggle())
                              : (this.is_multiple && this.search_field.val(""),
                                a(this.container[0].ownerDocument).bind(
                                    "click.chosen",
                                    this.click_test_action
                                ),
                                this.results_show()),
                          this.activate_field());
                }),
                (Chosen.prototype.container_mouseup = function (a) {
                    return "ABBR" !== a.target.nodeName || this.is_disabled
                        ? void 0
                        : this.results_reset(a);
                }),
                (Chosen.prototype.search_results_mousewheel = function (a) {
                    var b;
                    return (
                        a.originalEvent &&
                            (b =
                                a.originalEvent.deltaY ||
                                -a.originalEvent.wheelDelta ||
                                a.originalEvent.detail),
                        null != b
                            ? (a.preventDefault(),
                              "DOMMouseScroll" === a.type && (b = 40 * b),
                              this.search_results.scrollTop(
                                  b + this.search_results.scrollTop()
                              ))
                            : void 0
                    );
                }),
                (Chosen.prototype.blur_test = function (a) {
                    return !this.active_field &&
                        this.container.hasClass("chosen-container-active")
                        ? this.close_field()
                        : void 0;
                }),
                (Chosen.prototype.close_field = function () {
                    return (
                        a(this.container[0].ownerDocument).unbind(
                            "click.chosen",
                            this.click_test_action
                        ),
                        (this.active_field = !1),
                        this.results_hide(),
                        this.container.removeClass("chosen-container-active"),
                        this.clear_backstroke(),
                        this.show_search_field_default(),
                        this.search_field_scale()
                    );
                }),
                (Chosen.prototype.activate_field = function () {
                    return (
                        this.container.addClass("chosen-container-active"),
                        (this.active_field = !0),
                        this.search_field.val(this.search_field.val()),
                        this.search_field.focus()
                    );
                }),
                (Chosen.prototype.test_active_click = function (b) {
                    var c;
                    return (
                        (c = a(b.target).closest(".chosen-container")),
                        c.length && this.container[0] === c[0]
                            ? (this.active_field = !0)
                            : this.close_field()
                    );
                }),
                (Chosen.prototype.results_build = function () {
                    return (
                        (this.parsing = !0),
                        (this.selected_option_count = null),
                        (this.results_data = SelectParser.select_to_array(
                            this.form_field
                        )),
                        this.is_multiple
                            ? this.search_choices
                                  .find("li.search-choice")
                                  .remove()
                            : this.is_multiple ||
                              (this.single_set_selected_text(),
                              this.disable_search ||
                              this.form_field.options.length <=
                                  this.disable_search_threshold
                                  ? ((this.search_field[0].readOnly = !0),
                                    this.container.addClass(
                                        "chosen-container-single-nosearch"
                                    ))
                                  : ((this.search_field[0].readOnly = !1),
                                    this.container.removeClass(
                                        "chosen-container-single-nosearch"
                                    ))),
                        this.update_results_content(
                            this.results_option_build({ first: !0 })
                        ),
                        this.search_field_disabled(),
                        this.show_search_field_default(),
                        this.search_field_scale(),
                        (this.parsing = !1)
                    );
                }),
                (Chosen.prototype.result_do_highlight = function (a) {
                    var b, c, d, e, f;
                    if (a.length) {
                        if (
                            (this.result_clear_highlight(),
                            (this.result_highlight = a),
                            this.result_highlight.addClass("highlighted"),
                            (d = parseInt(
                                this.search_results.css("maxHeight"),
                                10
                            )),
                            (f = this.search_results.scrollTop()),
                            (e = d + f),
                            (c =
                                this.result_highlight.position().top +
                                this.search_results.scrollTop()),
                            (b = c + this.result_highlight.outerHeight()),
                            b >= e)
                        )
                            return this.search_results.scrollTop(
                                b - d > 0 ? b - d : 0
                            );
                        if (f > c) return this.search_results.scrollTop(c);
                    }
                }),
                (Chosen.prototype.result_clear_highlight = function () {
                    return (
                        this.result_highlight &&
                            this.result_highlight.removeClass("highlighted"),
                        (this.result_highlight = null)
                    );
                }),
                (Chosen.prototype.results_show = function () {
                    return this.is_multiple &&
                        this.max_selected_options <= this.choices_count()
                        ? (this.form_field_jq.trigger("chosen:maxselected", {
                              chosen: this,
                          }),
                          !1)
                        : (this.container.addClass("chosen-with-drop"),
                          (this.results_showing = !0),
                          this.search_field.focus(),
                          this.search_field.val(this.search_field.val()),
                          this.winnow_results(),
                          this.form_field_jq.trigger(
                              "chosen:showing_dropdown",
                              { chosen: this }
                          ));
                }),
                (Chosen.prototype.update_results_content = function (a) {
                    return this.search_results.php(a);
                }),
                (Chosen.prototype.results_hide = function () {
                    return (
                        this.results_showing &&
                            (this.result_clear_highlight(),
                            this.container.removeClass("chosen-with-drop"),
                            this.form_field_jq.trigger(
                                "chosen:hiding_dropdown",
                                { chosen: this }
                            )),
                        (this.results_showing = !1)
                    );
                }),
                (Chosen.prototype.set_tab_index = function (a) {
                    var b;
                    return this.form_field.tabIndex
                        ? ((b = this.form_field.tabIndex),
                          (this.form_field.tabIndex = -1),
                          (this.search_field[0].tabIndex = b))
                        : void 0;
                }),
                (Chosen.prototype.set_label_behavior = function () {
                    var b = this;
                    return (
                        (this.form_field_label =
                            this.form_field_jq.parents("label")),
                        !this.form_field_label.length &&
                            this.form_field.id.length &&
                            (this.form_field_label = a(
                                "label[for='" + this.form_field.id + "']"
                            )),
                        this.form_field_label.length > 0
                            ? this.form_field_label.bind(
                                  "click.chosen",
                                  function (a) {
                                      return b.is_multiple
                                          ? b.container_mousedown(a)
                                          : b.activate_field();
                                  }
                              )
                            : void 0
                    );
                }),
                (Chosen.prototype.show_search_field_default = function () {
                    return this.is_multiple &&
                        this.choices_count() < 1 &&
                        !this.active_field
                        ? (this.search_field.val(this.default_text),
                          this.search_field.addClass("default"))
                        : (this.search_field.val(""),
                          this.search_field.removeClass("default"));
                }),
                (Chosen.prototype.search_results_mouseup = function (b) {
                    var c;
                    return (
                        (c = a(b.target).hasClass("active-result")
                            ? a(b.target)
                            : a(b.target).parents(".active-result").first()),
                        c.length
                            ? ((this.result_highlight = c),
                              this.result_select(b),
                              this.search_field.focus())
                            : void 0
                    );
                }),
                (Chosen.prototype.search_results_mouseover = function (b) {
                    var c;
                    return (
                        (c = a(b.target).hasClass("active-result")
                            ? a(b.target)
                            : a(b.target).parents(".active-result").first()),
                        c ? this.result_do_highlight(c) : void 0
                    );
                }),
                (Chosen.prototype.search_results_mouseout = function (b) {
                    return a(b.target).hasClass("active-result")
                        ? this.result_clear_highlight()
                        : void 0;
                }),
                (Chosen.prototype.choice_build = function (b) {
                    var c,
                        d,
                        e = this;
                    return (
                        (c = a("<li />", { class: "search-choice" }).php(
                            "<span>" + this.choice_label(b) + "</span>"
                        )),
                        b.disabled
                            ? c.addClass("search-choice-disabled")
                            : ((d = a("<a />", {
                                  class: "search-choice-close",
                                  "data-option-array-index": b.array_index,
                              })),
                              d.bind("click.chosen", function (a) {
                                  return e.choice_destroy_link_click(a);
                              }),
                              c.append(d)),
                        this.search_container.before(c)
                    );
                }),
                (Chosen.prototype.choice_destroy_link_click = function (b) {
                    return (
                        b.preventDefault(),
                        b.stopPropagation(),
                        this.is_disabled
                            ? void 0
                            : this.choice_destroy(a(b.target))
                    );
                }),
                (Chosen.prototype.choice_destroy = function (a) {
                    return this.result_deselect(
                        a[0].getAttribute("data-option-array-index")
                    )
                        ? (this.show_search_field_default(),
                          this.is_multiple &&
                              this.choices_count() > 0 &&
                              this.search_field.val().length < 1 &&
                              this.results_hide(),
                          a.parents("li").first().remove(),
                          this.search_field_scale())
                        : void 0;
                }),
                (Chosen.prototype.results_reset = function () {
                    return (
                        this.reset_single_select_options(),
                        (this.form_field.options[0].selected = !0),
                        this.single_set_selected_text(),
                        this.show_search_field_default(),
                        this.results_reset_cleanup(),
                        this.form_field_jq.trigger("change"),
                        this.active_field ? this.results_hide() : void 0
                    );
                }),
                (Chosen.prototype.results_reset_cleanup = function () {
                    return (
                        (this.current_selectedIndex =
                            this.form_field.selectedIndex),
                        this.selected_item.find("abbr").remove()
                    );
                }),
                (Chosen.prototype.result_select = function (a) {
                    var b, c;
                    return this.result_highlight
                        ? ((b = this.result_highlight),
                          this.result_clear_highlight(),
                          this.is_multiple &&
                          this.max_selected_options <= this.choices_count()
                              ? (this.form_field_jq.trigger(
                                    "chosen:maxselected",
                                    { chosen: this }
                                ),
                                !1)
                              : (this.is_multiple
                                    ? b.removeClass("active-result")
                                    : this.reset_single_select_options(),
                                b.addClass("result-selected"),
                                (c =
                                    this.results_data[
                                        b[0].getAttribute(
                                            "data-option-array-index"
                                        )
                                    ]),
                                (c.selected = !0),
                                (this.form_field.options[
                                    c.options_index
                                ].selected = !0),
                                (this.selected_option_count = null),
                                this.is_multiple
                                    ? this.choice_build(c)
                                    : this.single_set_selected_text(
                                          this.choice_label(c)
                                      ),
                                ((a.metaKey || a.ctrlKey) &&
                                    this.is_multiple) ||
                                    this.results_hide(),
                                this.show_search_field_default(),
                                (this.is_multiple ||
                                    this.form_field.selectedIndex !==
                                        this.current_selectedIndex) &&
                                    this.form_field_jq.trigger("change", {
                                        selected:
                                            this.form_field.options[
                                                c.options_index
                                            ].value,
                                    }),
                                (this.current_selectedIndex =
                                    this.form_field.selectedIndex),
                                a.preventDefault(),
                                this.search_field_scale()))
                        : void 0;
                }),
                (Chosen.prototype.single_set_selected_text = function (a) {
                    return (
                        null == a && (a = this.default_text),
                        a === this.default_text
                            ? this.selected_item.addClass("chosen-default")
                            : (this.single_deselect_control_build(),
                              this.selected_item.removeClass("chosen-default")),
                        this.selected_item.find("span").php(a)
                    );
                }),
                (Chosen.prototype.result_deselect = function (a) {
                    var b;
                    return (
                        (b = this.results_data[a]),
                        this.form_field.options[b.options_index].disabled
                            ? !1
                            : ((b.selected = !1),
                              (this.form_field.options[
                                  b.options_index
                              ].selected = !1),
                              (this.selected_option_count = null),
                              this.result_clear_highlight(),
                              this.results_showing && this.winnow_results(),
                              this.form_field_jq.trigger("change", {
                                  deselected:
                                      this.form_field.options[b.options_index]
                                          .value,
                              }),
                              this.search_field_scale(),
                              !0)
                    );
                }),
                (Chosen.prototype.single_deselect_control_build = function () {
                    return this.allow_single_deselect
                        ? (this.selected_item.find("abbr").length ||
                              this.selected_item
                                  .find("span")
                                  .first()
                                  .after(
                                      '<abbr class="search-choice-close"></abbr>'
                                  ),
                          this.selected_item.addClass(
                              "chosen-single-with-deselect"
                          ))
                        : void 0;
                }),
                (Chosen.prototype.get_search_text = function () {
                    return a("<div/>")
                        .text(a.trim(this.search_field.val()))
                        .php();
                }),
                (Chosen.prototype.winnow_results_set_highlight = function () {
                    var a, b;
                    return (
                        (b = this.is_multiple
                            ? []
                            : this.search_results.find(
                                  ".result-selected.active-result"
                              )),
                        (a = b.length
                            ? b.first()
                            : this.search_results
                                  .find(".active-result")
                                  .first()),
                        null != a ? this.result_do_highlight(a) : void 0
                    );
                }),
                (Chosen.prototype.no_results = function (b) {
                    var c;
                    return (
                        (c = a(
                            '<li class="no-results">' +
                                this.results_none_found +
                                ' "<span></span>"</li>'
                        )),
                        c.find("span").first().php(b),
                        this.search_results.append(c),
                        this.form_field_jq.trigger("chosen:no_results", {
                            chosen: this,
                        })
                    );
                }),
                (Chosen.prototype.no_results_clear = function () {
                    return this.search_results.find(".no-results").remove();
                }),
                (Chosen.prototype.keydown_arrow = function () {
                    var a;
                    return this.results_showing && this.result_highlight
                        ? (a = this.result_highlight
                              .nextAll("li.active-result")
                              .first())
                            ? this.result_do_highlight(a)
                            : void 0
                        : this.results_show();
                }),
                (Chosen.prototype.keyup_arrow = function () {
                    var a;
                    return this.results_showing || this.is_multiple
                        ? this.result_highlight
                            ? ((a =
                                  this.result_highlight.prevAll(
                                      "li.active-result"
                                  )),
                              a.length
                                  ? this.result_do_highlight(a.first())
                                  : (this.choices_count() > 0 &&
                                        this.results_hide(),
                                    this.result_clear_highlight()))
                            : void 0
                        : this.results_show();
                }),
                (Chosen.prototype.keydown_backstroke = function () {
                    var a;
                    return this.pending_backstroke
                        ? (this.choice_destroy(
                              this.pending_backstroke.find("a").first()
                          ),
                          this.clear_backstroke())
                        : ((a = this.search_container
                              .siblings("li.search-choice")
                              .last()),
                          a.length && !a.hasClass("search-choice-disabled")
                              ? ((this.pending_backstroke = a),
                                this.single_backstroke_delete
                                    ? this.keydown_backstroke()
                                    : this.pending_backstroke.addClass(
                                          "search-choice-focus"
                                      ))
                              : void 0);
                }),
                (Chosen.prototype.clear_backstroke = function () {
                    return (
                        this.pending_backstroke &&
                            this.pending_backstroke.removeClass(
                                "search-choice-focus"
                            ),
                        (this.pending_backstroke = null)
                    );
                }),
                (Chosen.prototype.keydown_checker = function (a) {
                    var b, c;
                    switch (
                        ((b = null != (c = a.which) ? c : a.keyCode),
                        this.search_field_scale(),
                        8 !== b &&
                            this.pending_backstroke &&
                            this.clear_backstroke(),
                        b)
                    ) {
                        case 8:
                            this.backstroke_length =
                                this.search_field.val().length;
                            break;
                        case 9:
                            this.results_showing &&
                                !this.is_multiple &&
                                this.result_select(a),
                                (this.mouse_on_container = !1);
                            break;
                        case 13:
                            this.results_showing && a.preventDefault();
                            break;
                        case 32:
                            this.disable_search && a.preventDefault();
                            break;
                        case 38:
                            a.preventDefault(), this.keyup_arrow();
                            break;
                        case 40:
                            a.preventDefault(), this.keydown_arrow();
                    }
                }),
                (Chosen.prototype.search_field_scale = function () {
                    var b, c, d, e, f, g, h, i, j;
                    if (this.is_multiple) {
                        for (
                            d = 0,
                                h = 0,
                                f =
                                    "position:absolute; left: -1000px; top: -1000px; display:none;",
                                g = [
                                    "font-size",
                                    "font-style",
                                    "font-weight",
                                    "font-family",
                                    "line-height",
                                    "text-transform",
                                    "letter-spacing",
                                ],
                                i = 0,
                                j = g.length;
                            j > i;
                            i++
                        )
                            (e = g[i]),
                                (f += e + ":" + this.search_field.css(e) + ";");
                        return (
                            (b = a("<div />", { style: f })),
                            b.text(this.search_field.val()),
                            a("body").append(b),
                            (h = b.width() + 25),
                            b.remove(),
                            (c = this.container.outerWidth()),
                            h > c - 10 && (h = c - 10),
                            this.search_field.css({ width: h + "px" })
                        );
                    }
                }),
                Chosen
            );
        })(AbstractChosen));
}.call(this));

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
    "use strict";
    e.fn.counterUp = function (t) {
        var n = e.extend({ time: 400, delay: 10 }, t);
        return this.each(function () {
            var t = e(this),
                r = n,
                i = function () {
                    var e = [],
                        n = r.time / r.delay,
                        i = t.text(),
                        s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i),
                        u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt((i / n) * f);
                        u && (l = parseFloat((i / n) * f).toFixed(a));
                        if (s)
                            while (/(\d+)(\d{3})/.test(l.toString()))
                                l = l
                                    .toString()
                                    .replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l);
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function () {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length)
                            setTimeout(t.data("counterup-func"), r.delay);
                        else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null);
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay);
                };
            t.waypoint(i, { offset: "100%", triggerOnce: !0 });
        });
    };
})(jQuery);

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
    var t =
            [].indexOf ||
            function (t) {
                for (var e = 0, n = this.length; e < n; e++) {
                    if (e in this && this[e] === t) return e;
                }
                return -1;
            },
        e = [].slice;
    (function (t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return e(n, t);
            });
        } else {
            return e(t.jQuery, t);
        }
    })(this, function (n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = { horizontal: {}, vertical: {} };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = (function () {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
                this.waypoints = { horizontal: {}, vertical: {} };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function () {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function () {
                            e.doScroll();
                            return (e.didScroll = false);
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle);
                    }
                });
                t.bind(p, function () {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function () {
                            n[m]("refresh");
                            return (e.didResize = false);
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle);
                    }
                });
            }
            t.prototype.doScroll = function () {
                var t,
                    e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                    },
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh");
                }
                n.each(t, function (t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function (t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e);
                        } else if (
                            r.newScroll < (i = e.offset) &&
                            i <= r.oldScroll
                        ) {
                            return l.push(e);
                        }
                    });
                    l.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    if (!o) {
                        l.reverse();
                    }
                    return n.each(l, function (t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i]);
                        }
                    });
                });
                return (this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll,
                });
            };
            t.prototype.refresh = function () {
                var t,
                    e,
                    r,
                    i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left",
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r
                            ? n[m]("viewportHeight")
                            : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top",
                    },
                };
                return n.each(t, function (t, e) {
                    return n.each(i.waypoints[t], function (t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element)
                            ? 0
                            : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil((e.contextDimension * i) / 100);
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (
                            (r.options.onlyOnScroll && l != null) ||
                            !r.enabled
                        ) {
                            return;
                        }
                        if (
                            l !== null &&
                            l < (s = e.oldScroll) &&
                            s <= r.offset
                        ) {
                            return r.trigger([e.backward]);
                        } else if (
                            l !== null &&
                            l > (f = e.oldScroll) &&
                            f >= r.offset
                        ) {
                            return r.trigger([e.forward]);
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward]);
                        }
                    });
                });
            };
            t.prototype.checkEmpty = function () {
                if (
                    n.isEmptyObject(this.waypoints.horizontal) &&
                    n.isEmptyObject(this.waypoints.vertical)
                ) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id];
                }
            };
            return t;
        })();
        l = (function () {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height();
                        }
                        return t - n(this).outerHeight();
                    };
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i);
            }
            t.prototype.trigger = function (t) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            t.prototype.disable = function () {
                return (this.enabled = false);
            };
            t.prototype.enable = function () {
                this.context.refresh();
                return (this.enabled = true);
            };
            t.prototype.destroy = function () {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            t.getWaypointsByElement = function (t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return [];
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function (t) {
                    return e[t];
                });
            };
            return t;
        })();
        d = {
            init: function (t, e) {
                var r;
                if (e == null) {
                    e = {};
                }
                if ((r = e.handler) == null) {
                    e.handler = t;
                }
                this.each(function () {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i);
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i);
                    }
                    return new l(t, r, e);
                });
                n[m]("refresh");
                return this;
            },
            disable: function () {
                return d._invoke(this, "disable");
            },
            enable: function () {
                return d._invoke(this, "enable");
            },
            destroy: function () {
                return d._invoke(this, "destroy");
            },
            prev: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1]);
                    }
                });
            },
            next: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1]);
                    }
                });
            },
            _traverse: function (t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical";
                }
                if (e == null) {
                    e = r;
                }
                l = h.aggregate(e);
                o = [];
                this.each(function () {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t]);
                });
                return this.pushStack(o);
            },
            _invoke: function (t, e) {
                t.each(function () {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function (t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            },
        };
        n.fn[g] = function () {
            var t, r;
            (r = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (d[r]) {
                return d[r].apply(this, t);
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r]);
            } else if (!r) {
                return n.error(
                    "jQuery Waypoints needs a callback function or handler option."
                );
            } else {
                return n.error(
                    "The " + r + " method does not exist in jQuery Waypoints."
                );
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false,
        };
        h = {
            refresh: function () {
                return n.each(a, function (t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function () {
                var t;
                return (t = r.innerHeight) != null ? t : i.height();
            },
            aggregate: function (t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
                }
                if (!e) {
                    return [];
                }
                r = { horizontal: [], vertical: [] };
                n.each(r, function (t, i) {
                    n.each(e[t], function (t, e) {
                        return i.push(e);
                    });
                    i.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    r[t] = n.map(i, function (t) {
                        return t.element;
                    });
                    return (r[t] = n.unique(r[t]));
                });
                return r;
            },
            above: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset > t.oldScroll.x;
                });
            },
            enable: function () {
                return h._invoke("enable");
            },
            disable: function () {
                return h._invoke("disable");
            },
            destroy: function () {
                return h._invoke("destroy");
            },
            extendFn: function (t, e) {
                return (d[t] = e);
            },
            _invoke: function (t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function (e, n) {
                    n[t]();
                    return true;
                });
            },
            _filter: function (t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return [];
                }
                o = [];
                n.each(i.waypoints[e], function (t, e) {
                    if (r(i, e)) {
                        return o.push(e);
                    }
                });
                o.sort(function (t, e) {
                    return t.offset - e.offset;
                });
                return n.map(o, function (t) {
                    return t.element;
                });
            },
        };
        n[m] = function () {
            var t, n;
            (n = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (h[n]) {
                return h[n].apply(null, t);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
        return i.load(function () {
            return n[m]("refresh");
        });
    });
}.call(this));

/*
 Slick Slider
 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
/* global window, document, define, jQuery, setInterval, clearInterval */
!(function (i) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], i)
        : "undefined" != typeof exports
        ? (module.exports = i(require("jquery")))
        : i(jQuery);
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    ((e = (function () {
        var e = 0;
        return function (t, o) {
            var s,
                n = this;
            (n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow:
                    '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow:
                    '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                i.extend(n, n.initials),
                (n.activeBreakpoint = null),
                (n.animType = null),
                (n.animProp = null),
                (n.breakpoints = []),
                (n.breakpointSettings = []),
                (n.cssTransitions = !1),
                (n.focussed = !1),
                (n.interrupted = !1),
                (n.hidden = "hidden"),
                (n.paused = !0),
                (n.positionProp = null),
                (n.respondTo = null),
                (n.rowCount = 1),
                (n.shouldClick = !0),
                (n.$slider = i(t)),
                (n.$slidesCache = null),
                (n.transformType = null),
                (n.transitionType = null),
                (n.visibilityChange = "visibilitychange"),
                (n.windowWidth = 0),
                (n.windowTimer = null),
                (s = i(t).data("slick") || {}),
                (n.options = i.extend({}, n.defaults, o, s)),
                (n.currentSlide = n.options.initialSlide),
                (n.originalSettings = n.options),
                void 0 !== document.mozHidden
                    ? ((n.hidden = "mozHidden"),
                      (n.visibilityChange = "mozvisibilitychange"))
                    : void 0 !== document.webkitHidden &&
                      ((n.hidden = "webkitHidden"),
                      (n.visibilityChange = "webkitvisibilitychange")),
                (n.autoPlay = i.proxy(n.autoPlay, n)),
                (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
                (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
                (n.changeSlide = i.proxy(n.changeSlide, n)),
                (n.clickHandler = i.proxy(n.clickHandler, n)),
                (n.selectHandler = i.proxy(n.selectHandler, n)),
                (n.setPosition = i.proxy(n.setPosition, n)),
                (n.swipeHandler = i.proxy(n.swipeHandler, n)),
                (n.dragHandler = i.proxy(n.dragHandler, n)),
                (n.keyHandler = i.proxy(n.keyHandler, n)),
                (n.instanceUid = e++),
                (n.phpExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                n.registerBreakpoints(),
                n.init(!0);
        };
    })()).prototype.activateADA = function () {
        this.$slideTrack
            .find(".slick-active")
            .attr({ "aria-hidden": "false" })
            .find("a, input, button, select")
            .attr({ tabindex: "0" });
    }),
        (e.prototype.addSlide = e.prototype.slickAdd =
            function (e, t, o) {
                var s = this;
                if ("boolean" == typeof t) (o = t), (t = null);
                else if (t < 0 || t >= s.slideCount) return !1;
                s.unload(),
                    "number" == typeof t
                        ? 0 === t && 0 === s.$slides.length
                            ? i(e).appendTo(s.$slideTrack)
                            : o
                            ? i(e).insertBefore(s.$slides.eq(t))
                            : i(e).insertAfter(s.$slides.eq(t))
                        : !0 === o
                        ? i(e).prependTo(s.$slideTrack)
                        : i(e).appendTo(s.$slideTrack),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    s.$slides.each(function (e, t) {
                        i(t).attr("data-slick-index", e);
                    }),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
        (e.prototype.animateHeight = function () {
            var i = this;
            if (
                1 === i.options.slidesToShow &&
                !0 === i.options.adaptiveHeight &&
                !1 === i.options.vertical
            ) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({ height: e }, i.options.speed);
            }
        }),
        (e.prototype.animateSlide = function (e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                !1 === s.transformsEnabled
                    ? !1 === s.options.vertical
                        ? s.$slideTrack.animate(
                              { left: e },
                              s.options.speed,
                              s.options.easing,
                              t
                          )
                        : s.$slideTrack.animate(
                              { top: e },
                              s.options.speed,
                              s.options.easing,
                              t
                          )
                    : !1 === s.cssTransitions
                    ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                      i({ animStart: s.currentLeft }).animate(
                          { animStart: e },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)),
                                      !1 === s.options.vertical
                                          ? ((o[s.animType] =
                                                "translate(" + i + "px, 0px)"),
                                            s.$slideTrack.css(o))
                                          : ((o[s.animType] =
                                                "translate(0px," + i + "px)"),
                                            s.$slideTrack.css(o));
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (e = Math.ceil(e)),
                      !1 === s.options.vertical
                          ? (o[s.animType] =
                                "translate3d(" + e + "px, 0px, 0px)")
                          : (o[s.animType] =
                                "translate3d(0px," + e + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t &&
                "object" == typeof t &&
                t.each(function () {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                });
        }),
        (e.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            !1 === e.options.fade
                ? (t[e.transitionType] =
                      e.transformType +
                      " " +
                      e.options.speed +
                      "ms " +
                      e.options.cssEase)
                : (t[e.transitionType] =
                      "opacity " + e.options.speed + "ms " + e.options.cssEase),
                !1 === e.options.fade
                    ? e.$slideTrack.css(t)
                    : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(),
                i.slideCount > i.options.slidesToShow &&
                    (i.autoPlayTimer = setInterval(
                        i.autoPlayIterator,
                        i.options.autoplaySpeed
                    ));
        }),
        (e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (!1 === i.options.infinite &&
                    (1 === i.direction &&
                    i.currentSlide + 1 === i.slideCount - 1
                        ? (i.direction = 0)
                        : 0 === i.direction &&
                          ((e = i.currentSlide - i.options.slidesToScroll),
                          i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows &&
                ((e.$prevArrow = i(e.options.prevArrow).addClass(
                    "slick-arrow"
                )),
                (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
                e.slideCount > e.options.slidesToShow
                    ? (e.$prevArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      e.$nextArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      e.phpExpr.test(e.options.prevArrow) &&
                          e.$prevArrow.prependTo(e.options.appendArrows),
                      e.phpExpr.test(e.options.nextArrow) &&
                          e.$nextArrow.appendTo(e.options.appendArrows),
                      !0 !== e.options.infinite &&
                          e.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"))
                    : e.$prevArrow
                          .add(e.$nextArrow)
                          .addClass("slick-hidden")
                          .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
            var e,
                t,
                o = this;
            if (!0 === o.options.dots) {
                for (
                    o.$slider.addClass("slick-dotted"),
                        t = i("<ul />").addClass(o.options.dotsClass),
                        e = 0;
                    e <= o.getDotCount();
                    e += 1
                )
                    t.append(
                        i("<li />").append(
                            o.options.customPaging.call(this, o, e)
                        )
                    );
                (o.$dots = t.appendTo(o.options.appendDots)),
                    o.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (e.prototype.buildOut = function () {
            var e = this;
            (e.$slides = e.$slider
                .children(e.options.slide + ":not(.slick-cloned)")
                .addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.$slides.each(function (e, t) {
                    i(t)
                        .attr("data-slick-index", e)
                        .data("originalStyling", i(t).attr("style") || "");
                }),
                e.$slider.addClass("slick-slider"),
                (e.$slideTrack =
                    0 === e.slideCount
                        ? i('<div class="slick-track"/>').appendTo(e.$slider)
                        : e.$slides
                              .wrapAll('<div class="slick-track"/>')
                              .parent()),
                (e.$list = e.$slideTrack
                    .wrap('<div class="slick-list"/>')
                    .parent()),
                e.$slideTrack.css("opacity", 0),
                (!0 !== e.options.centerMode &&
                    !0 !== e.options.swipeToSlide) ||
                    (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider)
                    .not("[src]")
                    .addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses(
                    "number" == typeof e.currentSlide ? e.currentSlide : 0
                ),
                !0 === e.options.draggable && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
            var i,
                e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            if (
                ((o = document.createDocumentFragment()),
                (n = l.$slider.children()),
                l.options.rows > 1)
            ) {
                for (
                    r = l.options.slidesPerRow * l.options.rows,
                        s = Math.ceil(n.length / r),
                        i = 0;
                    i < s;
                    i++
                ) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c));
                        }
                        d.appendChild(a);
                    }
                    o.appendChild(d);
                }
                l.$slider.empty().append(o),
                    l.$slider
                        .children()
                        .children()
                        .children()
                        .css({
                            width: 100 / l.options.slidesPerRow + "%",
                            display: "inline-block",
                        });
            }
        }),
        (e.prototype.checkResponsive = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if (
                ("window" === r.respondTo
                    ? (n = a)
                    : "slider" === r.respondTo
                    ? (n = d)
                    : "min" === r.respondTo && (n = Math.min(a, d)),
                r.options.responsive &&
                    r.options.responsive.length &&
                    null !== r.options.responsive)
            ) {
                s = null;
                for (o in r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) &&
                        (!1 === r.originalSettings.mobileFirst
                            ? n < r.breakpoints[o] && (s = r.breakpoints[o])
                            : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s
                    ? null !== r.activeBreakpoint
                        ? (s !== r.activeBreakpoint || t) &&
                          ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s]
                              ? r.unslick(s)
                              : ((r.options = i.extend(
                                    {},
                                    r.originalSettings,
                                    r.breakpointSettings[s]
                                )),
                                !0 === e &&
                                    (r.currentSlide = r.options.initialSlide),
                                r.refresh(e)),
                          (l = s))
                        : ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s]
                              ? r.unslick(s)
                              : ((r.options = i.extend(
                                    {},
                                    r.originalSettings,
                                    r.breakpointSettings[s]
                                )),
                                !0 === e &&
                                    (r.currentSlide = r.options.initialSlide),
                                r.refresh(e)),
                          (l = s))
                    : null !== r.activeBreakpoint &&
                      ((r.activeBreakpoint = null),
                      (r.options = r.originalSettings),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e),
                      (l = s)),
                    e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
            }
        }),
        (e.prototype.changeSlide = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = i(e.currentTarget);
            switch (
                (l.is("a") && e.preventDefault(),
                l.is("li") || (l = l.closest("li")),
                (n = r.slideCount % r.options.slidesToScroll != 0),
                (o = n
                    ? 0
                    : (r.slideCount - r.currentSlide) %
                      r.options.slidesToScroll),
                e.data.message)
            ) {
                case "previous":
                    (s =
                        0 === o
                            ? r.options.slidesToScroll
                            : r.options.slidesToShow - o),
                        r.slideCount > r.options.slidesToShow &&
                            r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 === o ? r.options.slidesToScroll : o),
                        r.slideCount > r.options.slidesToShow &&
                            r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d =
                        0 === e.data.index
                            ? 0
                            : e.data.index ||
                              l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t),
                        l.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (e.prototype.checkNavigable = function (i) {
            var e, t;
            if (
                ((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1])
            )
                i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
            return i;
        }),
        (e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots &&
                null !== e.$dots &&
                (i("li", e.$dots)
                    .off("click.slick", e.changeSlide)
                    .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
                    .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                !0 === e.options.accessibility &&
                    e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow &&
                        e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow &&
                        e.$nextArrow.off("click.slick", e.changeSlide),
                    !0 === e.options.accessibility &&
                        (e.$prevArrow &&
                            e.$prevArrow.off("keydown.slick", e.keyHandler),
                        e.$nextArrow &&
                            e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off(
                    "touchcancel.slick mouseleave.slick",
                    e.swipeHandler
                ),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility &&
                    e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .off("click.slick", e.selectHandler),
                i(window).off(
                    "orientationchange.slick.slick-" + e.instanceUid,
                    e.orientationChange
                ),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off(
                    "dragstart",
                    e.preventDefault
                ),
                i(window).off(
                    "load.slick.slick-" + e.instanceUid,
                    e.setPosition
                );
        }),
        (e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
            var i,
                e = this;
            e.options.rows > 1 &&
                ((i = e.$slides.children().children()).removeAttr("style"),
                e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick &&
                (i.stopImmediatePropagation(),
                i.stopPropagation(),
                i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    t.phpExpr.test(t.options.prevArrow) &&
                        t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    t.phpExpr.test(t.options.nextArrow) &&
                        t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass(
                            "slick-slide slick-active slick-center slick-visible slick-current"
                        )
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            i(this).attr(
                                "style",
                                i(this).data("originalStyling")
                            );
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
            var e = this,
                t = {};
            (t[e.transitionType] = ""),
                !1 === e.options.fade
                    ? e.$slideTrack.css(t)
                    : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
                  t.$slides
                      .eq(i)
                      .animate(
                          { opacity: 1 },
                          t.options.speed,
                          t.options.easing,
                          e
                      ))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions
                ? e.$slides
                      .eq(i)
                      .animate(
                          { opacity: 0, zIndex: e.options.zIndex - 2 },
                          e.options.speed,
                          e.options.easing
                      )
                : (e.applyTransition(i),
                  e.$slides
                      .eq(i)
                      .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter =
            function (i) {
                var e = this;
                null !== i &&
                    ((e.$slidesCache = e.$slides),
                    e.unload(),
                    e.$slideTrack.children(this.options.slide).detach(),
                    e.$slidesCache.filter(i).appendTo(e.$slideTrack),
                    e.reinit());
            }),
        (e.prototype.focusHandler = function () {
            var e = this;
            e.$slider
                .off("focus.slick blur.slick")
                .on("focus.slick blur.slick", "*", function (t) {
                    t.stopImmediatePropagation();
                    var o = i(this);
                    setTimeout(function () {
                        e.options.pauseOnFocus &&
                            ((e.focussed = o.is(":focus")), e.autoPlay());
                    }, 0);
                });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
            function () {
                return this.currentSlide;
            }),
        (e.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else
                    for (; e < i.slideCount; )
                        ++o,
                            (e = t + i.options.slidesToScroll),
                            (t +=
                                i.options.slidesToScroll <=
                                i.options.slidesToShow
                                    ? i.options.slidesToScroll
                                    : i.options.slidesToShow);
            else if (!0 === i.options.centerMode) o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount; )
                    ++o,
                        (e = t + i.options.slidesToScroll),
                        (t +=
                            i.options.slidesToScroll <= i.options.slidesToShow
                                ? i.options.slidesToScroll
                                : i.options.slidesToShow);
            else
                o =
                    1 +
                    Math.ceil(
                        (i.slideCount - i.options.slidesToShow) /
                            i.options.slidesToScroll
                    );
            return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
            var e,
                t,
                o,
                s,
                n = this,
                r = 0;
            return (
                (n.slideOffset = 0),
                (t = n.$slides.first().outerHeight(!0)),
                !0 === n.options.infinite
                    ? (n.slideCount > n.options.slidesToShow &&
                          ((n.slideOffset =
                              n.slideWidth * n.options.slidesToShow * -1),
                          (s = -1),
                          !0 === n.options.vertical &&
                              !0 === n.options.centerMode &&
                              (2 === n.options.slidesToShow
                                  ? (s = -1.5)
                                  : 1 === n.options.slidesToShow && (s = -2)),
                          (r = t * n.options.slidesToShow * s)),
                      n.slideCount % n.options.slidesToScroll != 0 &&
                          i + n.options.slidesToScroll > n.slideCount &&
                          n.slideCount > n.options.slidesToShow &&
                          (i > n.slideCount
                              ? ((n.slideOffset =
                                    (n.options.slidesToShow -
                                        (i - n.slideCount)) *
                                    n.slideWidth *
                                    -1),
                                (r =
                                    (n.options.slidesToShow -
                                        (i - n.slideCount)) *
                                    t *
                                    -1))
                              : ((n.slideOffset =
                                    (n.slideCount % n.options.slidesToScroll) *
                                    n.slideWidth *
                                    -1),
                                (r =
                                    (n.slideCount % n.options.slidesToScroll) *
                                    t *
                                    -1))))
                    : i + n.options.slidesToShow > n.slideCount &&
                      ((n.slideOffset =
                          (i + n.options.slidesToShow - n.slideCount) *
                          n.slideWidth),
                      (r = (i + n.options.slidesToShow - n.slideCount) * t)),
                n.slideCount <= n.options.slidesToShow &&
                    ((n.slideOffset = 0), (r = 0)),
                !0 === n.options.centerMode &&
                n.slideCount <= n.options.slidesToShow
                    ? (n.slideOffset =
                          (n.slideWidth * Math.floor(n.options.slidesToShow)) /
                              2 -
                          (n.slideWidth * n.slideCount) / 2)
                    : !0 === n.options.centerMode && !0 === n.options.infinite
                    ? (n.slideOffset +=
                          n.slideWidth *
                              Math.floor(n.options.slidesToShow / 2) -
                          n.slideWidth)
                    : !0 === n.options.centerMode &&
                      ((n.slideOffset = 0),
                      (n.slideOffset +=
                          n.slideWidth *
                          Math.floor(n.options.slidesToShow / 2))),
                (e =
                    !1 === n.options.vertical
                        ? i * n.slideWidth * -1 + n.slideOffset
                        : i * t * -1 + r),
                !0 === n.options.variableWidth &&
                    ((o =
                        n.slideCount <= n.options.slidesToShow ||
                        !1 === n.options.infinite
                            ? n.$slideTrack.children(".slick-slide").eq(i)
                            : n.$slideTrack
                                  .children(".slick-slide")
                                  .eq(i + n.options.slidesToShow)),
                    (e =
                        !0 === n.options.rtl
                            ? o[0]
                                ? -1 *
                                  (n.$slideTrack.width() -
                                      o[0].offsetLeft -
                                      o.width())
                                : 0
                            : o[0]
                            ? -1 * o[0].offsetLeft
                            : 0),
                    !0 === n.options.centerMode &&
                        ((o =
                            n.slideCount <= n.options.slidesToShow ||
                            !1 === n.options.infinite
                                ? n.$slideTrack.children(".slick-slide").eq(i)
                                : n.$slideTrack
                                      .children(".slick-slide")
                                      .eq(i + n.options.slidesToShow + 1)),
                        (e =
                            !0 === n.options.rtl
                                ? o[0]
                                    ? -1 *
                                      (n.$slideTrack.width() -
                                          o[0].offsetLeft -
                                          o.width())
                                    : 0
                                : o[0]
                                ? -1 * o[0].offsetLeft
                                : 0),
                        (e += (n.$list.width() - o.outerWidth()) / 2))),
                e
            );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption =
            function (i) {
                return this.options[i];
            }),
        (e.prototype.getNavigableIndexes = function () {
            var i,
                e = this,
                t = 0,
                o = 0,
                s = [];
            for (
                !1 === e.options.infinite
                    ? (i = e.slideCount)
                    : ((t = -1 * e.options.slidesToScroll),
                      (o = -1 * e.options.slidesToScroll),
                      (i = 2 * e.slideCount));
                t < i;

            )
                s.push(t),
                    (t = o + e.options.slidesToScroll),
                    (o +=
                        e.options.slidesToScroll <= e.options.slidesToShow
                            ? e.options.slidesToScroll
                            : e.options.slidesToShow);
            return s;
        }),
        (e.prototype.getSlick = function () {
            return this;
        }),
        (e.prototype.getSlideCount = function () {
            var e,
                t,
                o = this;
            return (
                (t =
                    !0 === o.options.centerMode
                        ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
                        : 0),
                !0 === o.options.swipeToSlide
                    ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                          if (
                              n.offsetLeft - t + i(n).outerWidth() / 2 >
                              -1 * o.swipeLeft
                          )
                              return (e = n), !1;
                      }),
                      Math.abs(
                          i(e).attr("data-slick-index") - o.currentSlide
                      ) || 1)
                    : o.options.slidesToScroll
            );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo =
            function (i, e) {
                this.changeSlide(
                    { data: { message: "index", index: parseInt(i) } },
                    e
                );
            }),
        (e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") ||
                (i(t.$slider).addClass("slick-initialized"),
                t.buildRows(),
                t.buildOut(),
                t.setProps(),
                t.startLoad(),
                t.loadSlider(),
                t.initializeEvents(),
                t.updateArrows(),
                t.updateDots(),
                t.checkResponsive(!0),
                t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount;
                });
            e.$slides
                .add(e.$slideTrack.find(".slick-cloned"))
                .attr({ "aria-hidden": "true", tabindex: "-1" })
                .find("a, input, button, select")
                .attr({ tabindex: "-1" }),
                null !== e.$dots &&
                    (e.$slides
                        .not(e.$slideTrack.find(".slick-cloned"))
                        .each(function (t) {
                            var s = o.indexOf(t);
                            i(this).attr({
                                role: "tabpanel",
                                id: "slick-slide" + e.instanceUid + t,
                                tabindex: -1,
                            }),
                                -1 !== s &&
                                    i(this).attr({
                                        "aria-describedby":
                                            "slick-slide-control" +
                                            e.instanceUid +
                                            s,
                                    });
                        }),
                    e.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (s) {
                            var n = o[s];
                            i(this).attr({ role: "presentation" }),
                                i(this)
                                    .find("button")
                                    .first()
                                    .attr({
                                        role: "tab",
                                        id:
                                            "slick-slide-control" +
                                            e.instanceUid +
                                            s,
                                        "aria-controls":
                                            "slick-slide" + e.instanceUid + n,
                                        "aria-label": s + 1 + " of " + t,
                                        "aria-selected": null,
                                        tabindex: "-1",
                                    });
                        })
                        .eq(e.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (
                var s = e.currentSlide, n = s + e.options.slidesToShow;
                s < n;
                s++
            )
                e.$slides.eq(s).attr("tabindex", 0);
            e.activateADA();
        }),
        (e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow
                    .off("click.slick")
                    .on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow
                    .off("click.slick")
                    .on("click.slick", { message: "next" }, i.changeSlide),
                !0 === i.options.accessibility &&
                    (i.$prevArrow.on("keydown.slick", i.keyHandler),
                    i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots &&
                (i("li", e.$dots).on(
                    "click.slick",
                    { message: "index" },
                    e.changeSlide
                ),
                !0 === e.options.accessibility &&
                    e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots &&
                    !0 === e.options.pauseOnDotsHover &&
                    i("li", e.$dots)
                        .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
                        .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover &&
                (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on(
                    "touchstart.slick mousedown.slick",
                    { action: "start" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchmove.slick mousemove.slick",
                    { action: "move" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchend.slick mouseup.slick",
                    { action: "end" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchcancel.slick mouseleave.slick",
                    { action: "end" },
                    e.swipeHandler
                ),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                !0 === e.options.accessibility &&
                    e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .on("click.slick", e.selectHandler),
                i(window).on(
                    "orientationchange.slick.slick-" + e.instanceUid,
                    i.proxy(e.orientationChange, e)
                ),
                i(window).on(
                    "resize.slick.slick-" + e.instanceUid,
                    i.proxy(e.resize, e)
                ),
                i("[draggable!=true]", e.$slideTrack).on(
                    "dragstart",
                    e.preventDefault
                ),
                i(window).on(
                    "load.slick.slick-" + e.instanceUid,
                    e.setPosition
                ),
                i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.show(), i.$nextArrow.show()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && !0 === e.options.accessibility
                    ? e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "next" : "previous",
                          },
                      })
                    : 39 === i.keyCode &&
                      !0 === e.options.accessibility &&
                      e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "previous" : "next",
                          },
                      }));
        }),
        (e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s =
                            i(this).attr("data-sizes") ||
                            n.$slider.attr("data-sizes"),
                        r = document.createElement("img");
                    (r.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                e
                                    .attr("src", t)
                                    .animate({ opacity: 1 }, 200, function () {
                                        e.removeAttr(
                                            "data-lazy data-srcset data-sizes"
                                        ).removeClass("slick-loading");
                                    }),
                                n.$slider.trigger("lazyLoaded", [n, e, t]);
                        });
                    }),
                        (r.onerror = function () {
                            e
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                                n.$slider.trigger("lazyLoadError", [n, e, t]);
                        }),
                        (r.src = t);
                });
            }
            var t,
                o,
                s,
                n = this;
            if (
                (!0 === n.options.centerMode
                    ? !0 === n.options.infinite
                        ? (s =
                              (o =
                                  n.currentSlide +
                                  (n.options.slidesToShow / 2 + 1)) +
                              n.options.slidesToShow +
                              2)
                        : ((o = Math.max(
                              0,
                              n.currentSlide - (n.options.slidesToShow / 2 + 1)
                          )),
                          (s =
                              n.options.slidesToShow / 2 +
                              1 +
                              2 +
                              n.currentSlide))
                    : ((o = n.options.infinite
                          ? n.options.slidesToShow + n.currentSlide
                          : n.currentSlide),
                      (s = Math.ceil(o + n.options.slidesToShow)),
                      !0 === n.options.fade &&
                          (o > 0 && o--, s <= n.slideCount && s++)),
                (t = n.$slider.find(".slick-slide").slice(o, s)),
                "anticipated" === n.options.lazyLoad)
            )
                for (
                    var r = o - 1,
                        l = s,
                        d = n.$slider.find(".slick-slide"),
                        a = 0;
                    a < n.options.slidesToScroll;
                    a++
                )
                    r < 0 && (r = n.slideCount - 1),
                        (t = (t = t.add(d.eq(r))).add(d.eq(l))),
                        r--,
                        l++;
            e(t),
                n.slideCount <= n.options.slidesToShow
                    ? e(n.$slider.find(".slick-slide"))
                    : n.currentSlide >= n.slideCount - n.options.slidesToShow
                    ? e(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(0, n.options.slidesToShow)
                      )
                    : 0 === n.currentSlide &&
                      e(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(-1 * n.options.slidesToShow)
                      );
        }),
        (e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(),
                i.$slideTrack.css({ opacity: 1 }),
                i.$slider.removeClass("slick-loading"),
                i.initUI(),
                "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext =
            function () {
                this.changeSlide({ data: { message: "next" } });
            }),
        (e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause =
            function () {
                var i = this;
                i.autoPlayClear(), (i.paused = !0);
            }),
        (e.prototype.play = e.prototype.slickPlay =
            function () {
                var i = this;
                i.autoPlay(),
                    (i.options.autoplay = !0),
                    (i.paused = !1),
                    (i.focussed = !1),
                    (i.interrupted = !1);
            }),
        (e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked ||
                (t.$slider.trigger("afterChange", [t, e]),
                (t.animating = !1),
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                (t.swipeLeft = null),
                t.options.autoplay && t.autoPlay(),
                !0 === t.options.accessibility &&
                    (t.initADA(),
                    t.options.focusOnChange &&
                        i(t.$slides.get(t.currentSlide))
                            .attr("tabindex", 0)
                            .focus()));
        }),
        (e.prototype.prev = e.prototype.slickPrev =
            function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
        (e.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t,
                o,
                s,
                n,
                r,
                l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length
                ? ((t = d.first()),
                  (o = t.attr("data-lazy")),
                  (s = t.attr("data-srcset")),
                  (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
                  ((r = document.createElement("img")).onload = function () {
                      s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                          t
                              .attr("src", o)
                              .removeAttr("data-lazy data-srcset data-sizes")
                              .removeClass("slick-loading"),
                          !0 === l.options.adaptiveHeight && l.setPosition(),
                          l.$slider.trigger("lazyLoaded", [l, t, o]),
                          l.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      e < 3
                          ? setTimeout(function () {
                                l.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (t
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                            l.$slider.trigger("lazyLoadError", [l, t, o]),
                            l.progressiveLazyLoad());
                  }),
                  (r.src = o))
                : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite &&
                    s.currentSlide > o &&
                    (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                i.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                e ||
                    s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
            var e,
                t,
                o,
                s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                        for (t = n[e].breakpoint; o >= 0; )
                            s.breakpoints[o] &&
                                s.breakpoints[o] === t &&
                                s.breakpoints.splice(o, 1),
                                o--;
                        s.breakpoints.push(t),
                            (s.breakpointSettings[t] = n[e].settings);
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (e.prototype.reinit = function () {
            var e = this;
            (e.$slides = e.$slideTrack
                .children(e.options.slide)
                .addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.currentSlide >= e.slideCount &&
                    0 !== e.currentSlide &&
                    (e.currentSlide =
                        e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .on("click.slick", e.selectHandler),
                e.setSlideClasses(
                    "number" == typeof e.currentSlide ? e.currentSlide : 0
                ),
                e.setPosition(),
                e.focusHandler(),
                (e.paused = !e.options.autoplay),
                e.autoPlay(),
                e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth &&
                (clearTimeout(e.windowDelay),
                (e.windowDelay = window.setTimeout(function () {
                    (e.windowWidth = i(window).width()),
                        e.checkResponsive(),
                        e.unslicked || e.setPosition();
                }, 50)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove =
            function (i, e, t) {
                var o = this;
                if (
                    ((i =
                        "boolean" == typeof i
                            ? !0 === (e = i)
                                ? 0
                                : o.slideCount - 1
                            : !0 === e
                            ? --i
                            : i),
                    o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                )
                    return !1;
                o.unload(),
                    !0 === t
                        ? o.$slideTrack.children().remove()
                        : o.$slideTrack
                              .children(this.options.slide)
                              .eq(i)
                              .remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
        (e.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                !1 === o.transformsEnabled
                    ? o.$slideTrack.css(s)
                    : ((s = {}),
                      !1 === o.cssTransitions
                          ? ((s[o.animType] =
                                "translate(" + e + ", " + t + ")"),
                            o.$slideTrack.css(s))
                          : ((s[o.animType] =
                                "translate3d(" + e + ", " + t + ", 0px)"),
                            o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical
                ? !0 === i.options.centerMode &&
                  i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(
                      i.$slides.first().outerHeight(!0) * i.options.slidesToShow
                  ),
                  !0 === i.options.centerMode &&
                      i.$list.css({
                          padding: i.options.centerPadding + " 0px",
                      })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                !1 === i.options.vertical && !1 === i.options.variableWidth
                    ? ((i.slideWidth = Math.ceil(
                          i.listWidth / i.options.slidesToShow
                      )),
                      i.$slideTrack.width(
                          Math.ceil(
                              i.slideWidth *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ))
                    : !0 === i.options.variableWidth
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)),
                      i.$slideTrack.height(
                          Math.ceil(
                              i.$slides.first().outerHeight(!0) *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ));
            var e =
                i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth &&
                i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
            var e,
                t = this;
            t.$slides.each(function (o, s) {
                (e = t.slideWidth * o * -1),
                    !0 === t.options.rtl
                        ? i(s).css({
                              position: "relative",
                              right: e,
                              top: 0,
                              zIndex: t.options.zIndex - 2,
                              opacity: 0,
                          })
                        : i(s).css({
                              position: "relative",
                              left: e,
                              top: 0,
                              zIndex: t.options.zIndex - 2,
                              opacity: 0,
                          });
            }),
                t.$slides
                    .eq(t.currentSlide)
                    .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
            var i = this;
            if (
                1 === i.options.slidesToShow &&
                !0 === i.options.adaptiveHeight &&
                !1 === i.options.vertical
            ) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e);
            }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption =
            function () {
                var e,
                    t,
                    o,
                    s,
                    n,
                    r = this,
                    l = !1;
                if (
                    ("object" === i.type(arguments[0])
                        ? ((o = arguments[0]),
                          (l = arguments[1]),
                          (n = "multiple"))
                        : "string" === i.type(arguments[0]) &&
                          ((o = arguments[0]),
                          (s = arguments[1]),
                          (l = arguments[2]),
                          "responsive" === arguments[0] &&
                          "array" === i.type(arguments[1])
                              ? (n = "responsive")
                              : void 0 !== arguments[1] && (n = "single")),
                    "single" === n)
                )
                    r.options[o] = s;
                else if ("multiple" === n)
                    i.each(o, function (i, e) {
                        r.options[i] = e;
                    });
                else if ("responsive" === n)
                    for (t in s)
                        if ("array" !== i.type(r.options.responsive))
                            r.options.responsive = [s[t]];
                        else {
                            for (e = r.options.responsive.length - 1; e >= 0; )
                                r.options.responsive[e].breakpoint ===
                                    s[t].breakpoint &&
                                    r.options.responsive.splice(e, 1),
                                    e--;
                            r.options.responsive.push(s[t]);
                        }
                l && (r.unload(), r.reinit());
            }),
        (e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(),
                i.setHeight(),
                !1 === i.options.fade
                    ? i.setCSS(i.getLeft(i.currentSlide))
                    : i.setFade(),
                i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
                "top" === i.positionProp
                    ? i.$slider.addClass("slick-vertical")
                    : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition &&
                    void 0 === e.MozTransition &&
                    void 0 === e.msTransition) ||
                    (!0 === i.options.useCSS && (i.cssTransitions = !0)),
                i.options.fade &&
                    ("number" == typeof i.options.zIndex
                        ? i.options.zIndex < 3 && (i.options.zIndex = 3)
                        : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform &&
                    ((i.animType = "OTransform"),
                    (i.transformType = "-o-transform"),
                    (i.transitionType = "OTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.MozTransform &&
                    ((i.animType = "MozTransform"),
                    (i.transformType = "-moz-transform"),
                    (i.transitionType = "MozTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.MozPerspective &&
                        (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"),
                    (i.transformType = "-webkit-transform"),
                    (i.transitionType = "webkitTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.msTransform &&
                    ((i.animType = "msTransform"),
                    (i.transformType = "-ms-transform"),
                    (i.transitionType = "msTransition"),
                    void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform &&
                    !1 !== i.animType &&
                    ((i.animType = "transform"),
                    (i.transformType = "transform"),
                    (i.transitionType = "transition")),
                (i.transformsEnabled =
                    i.options.useTransform &&
                    null !== i.animType &&
                    !1 !== i.animType);
        }),
        (e.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s,
                n = this;
            if (
                ((t = n.$slider
                    .find(".slick-slide")
                    .removeClass("slick-active slick-center slick-current")
                    .attr("aria-hidden", "true")),
                n.$slides.eq(i).addClass("slick-current"),
                !0 === n.options.centerMode)
            ) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                (e = Math.floor(n.options.slidesToShow / 2)),
                    !0 === n.options.infinite &&
                        (i >= e && i <= n.slideCount - 1 - e
                            ? n.$slides
                                  .slice(i - e + r, i + e + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + i),
                              t
                                  .slice(o - e + 1 + r, o + e + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === i
                            ? t
                                  .eq(t.length - 1 - n.options.slidesToShow)
                                  .addClass("slick-center")
                            : i === n.slideCount - 1 &&
                              t
                                  .eq(n.options.slidesToShow)
                                  .addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center");
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow
                    ? n.$slides
                          .slice(i, i + n.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= n.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = n.slideCount % n.options.slidesToShow),
                      (o =
                          !0 === n.options.infinite
                              ? n.options.slidesToShow + i
                              : i),
                      n.options.slidesToShow == n.options.slidesToScroll &&
                      n.slideCount - i < n.options.slidesToShow
                          ? t
                                .slice(o - (n.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" !== n.options.lazyLoad &&
                "anticipated" !== n.options.lazyLoad) ||
                n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
            var e,
                t,
                o,
                s = this;
            if (
                (!0 === s.options.fade && (s.options.centerMode = !1),
                !0 === s.options.infinite &&
                    !1 === s.options.fade &&
                    ((t = null), s.slideCount > s.options.slidesToShow))
            ) {
                for (
                    o =
                        !0 === s.options.centerMode
                            ? s.options.slidesToShow + 1
                            : s.options.slidesToShow,
                        e = s.slideCount;
                    e > s.slideCount - o;
                    e -= 1
                )
                    (t = e - 1),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    (t = e),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        i(this).attr("id", "");
                    });
            }
        }),
        (e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
            var t = this,
                o = i(e.target).is(".slick-slide")
                    ? i(e.target)
                    : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            s || (s = 0),
                t.slideCount <= t.options.slidesToShow
                    ? t.slideHandler(s, !1, !0)
                    : t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l,
                d = null,
                a = this;
            if (
                ((e = e || !1),
                !(
                    (!0 === a.animating && !0 === a.options.waitForAnimate) ||
                    (!0 === a.options.fade && a.currentSlide === i)
                ))
            )
                if (
                    (!1 === e && a.asNavFor(i),
                    (o = i),
                    (d = a.getLeft(o)),
                    (r = a.getLeft(a.currentSlide)),
                    (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
                    !1 === a.options.infinite &&
                        !1 === a.options.centerMode &&
                        (i < 0 ||
                            i > a.getDotCount() * a.options.slidesToScroll))
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else if (
                    !1 === a.options.infinite &&
                    !0 === a.options.centerMode &&
                    (i < 0 || i > a.slideCount - a.options.slidesToScroll)
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else {
                    if (
                        (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        (s =
                            o < 0
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? a.slideCount -
                                      (a.slideCount % a.options.slidesToScroll)
                                    : a.slideCount + o
                                : o >= a.slideCount
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? 0
                                    : o - a.slideCount
                                : o),
                        (a.animating = !0),
                        a.$slider.trigger("beforeChange", [
                            a,
                            a.currentSlide,
                            s,
                        ]),
                        (n = a.currentSlide),
                        (a.currentSlide = s),
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor &&
                            (l = (l = a.getNavTarget()).slick("getSlick"))
                                .slideCount <= l.options.slidesToShow &&
                            l.setSlideClasses(a.currentSlide),
                        a.updateDots(),
                        a.updateArrows(),
                        !0 === a.options.fade)
                    )
                        return (
                            !0 !== t
                                ? (a.fadeSlideOut(n),
                                  a.fadeSlide(s, function () {
                                      a.postSlide(s);
                                  }))
                                : a.postSlide(s),
                            void a.animateHeight()
                        );
                    !0 !== t
                        ? a.animateSlide(d, function () {
                              a.postSlide(s);
                          })
                        : a.postSlide(s);
                }
        }),
        (e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.hide(), i.$nextArrow.hide()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
            var i,
                e,
                t,
                o,
                s = this;
            return (
                (i = s.touchObject.startX - s.touchObject.curX),
                (e = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(e, i)),
                (o = Math.round((180 * t) / Math.PI)) < 0 &&
                    (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o <= 360 && o >= 315
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o >= 135 && o <= 225
                    ? !1 === s.options.rtl
                        ? "right"
                        : "left"
                    : !0 === s.options.verticalSwiping
                    ? o >= 35 && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (e.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
                return (o.scrolling = !1), !1;
            if (
                ((o.interrupted = !1),
                (o.shouldClick = !(o.touchObject.swipeLength > 10)),
                void 0 === o.touchObject.curX)
            )
                return !1;
            if (
                (!0 === o.touchObject.edgeHit &&
                    o.$slider.trigger("edge", [o, o.swipeDirection()]),
                o.touchObject.swipeLength >= o.touchObject.minSwipe)
            ) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide + o.getSlideCount()
                              )
                            : o.currentSlide + o.getSlideCount()),
                            (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide - o.getSlideCount()
                              )
                            : o.currentSlide - o.getSlideCount()),
                            (o.currentDirection = 1);
                }
                "vertical" != t &&
                    (o.slideHandler(e),
                    (o.touchObject = {}),
                    o.$slider.trigger("swipe", [o, t]));
            } else
                o.touchObject.startX !== o.touchObject.curX &&
                    (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
            var e = this;
            if (
                !(
                    !1 === e.options.swipe ||
                    ("ontouchend" in document && !1 === e.options.swipe) ||
                    (!1 === e.options.draggable &&
                        -1 !== i.type.indexOf("mouse"))
                )
            )
                switch (
                    ((e.touchObject.fingerCount =
                        i.originalEvent && void 0 !== i.originalEvent.touches
                            ? i.originalEvent.touches.length
                            : 1),
                    (e.touchObject.minSwipe =
                        e.listWidth / e.options.touchThreshold),
                    !0 === e.options.verticalSwiping &&
                        (e.touchObject.minSwipe =
                            e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (e.prototype.swipeMove = function (i) {
            var e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            return (
                (n =
                    void 0 !== i.originalEvent
                        ? i.originalEvent.touches
                        : null),
                !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                    ((e = l.getLeft(l.currentSlide)),
                    (l.touchObject.curX =
                        void 0 !== n ? n[0].pageX : i.clientX),
                    (l.touchObject.curY =
                        void 0 !== n ? n[0].pageY : i.clientY),
                    (l.touchObject.swipeLength = Math.round(
                        Math.sqrt(
                            Math.pow(
                                l.touchObject.curX - l.touchObject.startX,
                                2
                            )
                        )
                    )),
                    (r = Math.round(
                        Math.sqrt(
                            Math.pow(
                                l.touchObject.curY - l.touchObject.startY,
                                2
                            )
                        )
                    )),
                    !l.options.verticalSwiping && !l.swiping && r > 4
                        ? ((l.scrolling = !0), !1)
                        : (!0 === l.options.verticalSwiping &&
                              (l.touchObject.swipeLength = r),
                          (t = l.swipeDirection()),
                          void 0 !== i.originalEvent &&
                              l.touchObject.swipeLength > 4 &&
                              ((l.swiping = !0), i.preventDefault()),
                          (s =
                              (!1 === l.options.rtl ? 1 : -1) *
                              (l.touchObject.curX > l.touchObject.startX
                                  ? 1
                                  : -1)),
                          !0 === l.options.verticalSwiping &&
                              (s =
                                  l.touchObject.curY > l.touchObject.startY
                                      ? 1
                                      : -1),
                          (o = l.touchObject.swipeLength),
                          (l.touchObject.edgeHit = !1),
                          !1 === l.options.infinite &&
                              ((0 === l.currentSlide && "right" === t) ||
                                  (l.currentSlide >= l.getDotCount() &&
                                      "left" === t)) &&
                              ((o =
                                  l.touchObject.swipeLength *
                                  l.options.edgeFriction),
                              (l.touchObject.edgeHit = !0)),
                          !1 === l.options.vertical
                              ? (l.swipeLeft = e + o * s)
                              : (l.swipeLeft =
                                    e +
                                    o * (l.$list.height() / l.listWidth) * s),
                          !0 === l.options.verticalSwiping &&
                              (l.swipeLeft = e + o * s),
                          !0 !== l.options.fade &&
                              !1 !== l.options.touchMove &&
                              (!0 === l.animating
                                  ? ((l.swipeLeft = null), !1)
                                  : void l.setCSS(l.swipeLeft))))
            );
        }),
        (e.prototype.swipeStart = function (i) {
            var e,
                t = this;
            if (
                ((t.interrupted = !0),
                1 !== t.touchObject.fingerCount ||
                    t.slideCount <= t.options.slidesToShow)
            )
                return (t.touchObject = {}), !1;
            void 0 !== i.originalEvent &&
                void 0 !== i.originalEvent.touches &&
                (e = i.originalEvent.touches[0]),
                (t.touchObject.startX = t.touchObject.curX =
                    void 0 !== e ? e.pageX : i.clientX),
                (t.touchObject.startY = t.touchObject.curY =
                    void 0 !== e ? e.pageY : i.clientY),
                (t.dragging = !0);
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
            function () {
                var i = this;
                null !== i.$slidesCache &&
                    (i.unload(),
                    i.$slideTrack.children(this.options.slide).detach(),
                    i.$slidesCache.appendTo(i.$slideTrack),
                    i.reinit());
            }),
        (e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow &&
                    e.phpExpr.test(e.options.prevArrow) &&
                    e.$prevArrow.remove(),
                e.$nextArrow &&
                    e.phpExpr.test(e.options.nextArrow) &&
                    e.$nextArrow.remove(),
                e.$slides
                    .removeClass(
                        "slick-slide slick-active slick-visible slick-current"
                    )
                    .attr("aria-hidden", "true")
                    .css("width", "");
        }),
        (e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    !i.options.infinite &&
                    (i.$prevArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    i.$nextArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    0 === i.currentSlide
                        ? (i.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$nextArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : i.currentSlide >=
                              i.slideCount - i.options.slidesToShow &&
                          !1 === i.options.centerMode
                        ? (i.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - 1 &&
                          !0 === i.options.centerMode &&
                          (i.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay &&
                (document[i.hidden]
                    ? (i.interrupted = !0)
                    : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
            var i,
                t,
                o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++)
                if (
                    ("object" == typeof s || void 0 === s
                        ? (o[i].slick = new e(o[i], s))
                        : (t = o[i].slick[s].apply(o[i].slick, n)),
                    void 0 !== t)
                )
                    return t;
            return o;
        });
});

// tilt js for hover 3d
("use strict");
var _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
              return typeof t;
          }
        : function (t) {
              return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
          };
!(function (t) {
    "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : "object" ===
              ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
          module.exports
        ? (module.exports = function (i, s) {
              return (
                  void 0 === s &&
                      (s =
                          "undefined" != typeof window
                              ? require("jquery")
                              : require("jquery")(i)),
                  t(s),
                  s
              );
          })
        : t(jQuery);
})(function (t) {
    return (
        (t.fn.tilt = function (i) {
            var s = function () {
                    this.ticking ||
                        (requestAnimationFrame(g.bind(this)),
                        (this.ticking = !0));
                },
                e = function () {
                    var i = this;
                    t(this).on("mousemove", o),
                        t(this).on("mouseenter", a),
                        this.settings.reset && t(this).on("mouseleave", l),
                        this.settings.glare &&
                            t(window).on("resize", d.bind(i));
                },
                n = function () {
                    var i = this;
                    void 0 !== this.timeout && clearTimeout(this.timeout),
                        t(this).css({
                            transition:
                                this.settings.speed +
                                "ms " +
                                this.settings.easing,
                        }),
                        this.settings.glare &&
                            this.glareElement.css({
                                transition:
                                    "opacity " +
                                    this.settings.speed +
                                    "ms " +
                                    this.settings.easing,
                            }),
                        (this.timeout = setTimeout(function () {
                            t(i).css({ transition: "" }),
                                i.settings.glare &&
                                    i.glareElement.css({ transition: "" });
                        }, this.settings.speed));
                },
                a = function (i) {
                    (this.ticking = !1),
                        t(this).css({ "will-change": "transform" }),
                        n.call(this),
                        t(this).trigger("tilt.mouseEnter");
                },
                r = function (i) {
                    return (
                        "undefined" == typeof i &&
                            (i = {
                                pageX:
                                    t(this).offset().left +
                                    t(this).outerWidth() / 2,
                                pageY:
                                    t(this).offset().top +
                                    t(this).outerHeight() / 2,
                            }),
                        { x: i.pageX, y: i.pageY }
                    );
                },
                o = function (t) {
                    (this.mousePositions = r(t)), s.call(this);
                },
                l = function () {
                    n.call(this),
                        (this.reset = !0),
                        s.call(this),
                        t(this).trigger("tilt.mouseLeave");
                },
                h = function () {
                    var i = t(this).outerWidth(),
                        s = t(this).outerHeight(),
                        e = t(this).offset().left,
                        n = t(this).offset().top,
                        a = (this.mousePositions.x - e) / i,
                        r = (this.mousePositions.y - n) / s,
                        o = (
                            this.settings.maxTilt / 2 -
                            a * this.settings.maxTilt
                        ).toFixed(2),
                        l = (
                            r * this.settings.maxTilt -
                            this.settings.maxTilt / 2
                        ).toFixed(2),
                        h =
                            Math.atan2(
                                this.mousePositions.x - (e + i / 2),
                                -(this.mousePositions.y - (n + s / 2))
                            ) *
                            (180 / Math.PI);
                    return {
                        tiltX: o,
                        tiltY: l,
                        percentageX: 100 * a,
                        percentageY: 100 * r,
                        angle: h,
                    };
                },
                g = function () {
                    return (
                        (this.transforms = h.call(this)),
                        this.reset
                            ? ((this.reset = !1),
                              t(this).css(
                                  "transform",
                                  "perspective(" +
                                      this.settings.perspective +
                                      "px) rotateX(0deg) rotateY(0deg)"
                              ),
                              void (
                                  this.settings.glare &&
                                  (this.glareElement.css(
                                      "transform",
                                      "rotate(180deg) translate(-50%, -50%)"
                                  ),
                                  this.glareElement.css("opacity", "0"))
                              ))
                            : (t(this).css(
                                  "transform",
                                  "perspective(" +
                                      this.settings.perspective +
                                      "px) rotateX(" +
                                      ("x" === this.settings.disableAxis
                                          ? 0
                                          : this.transforms.tiltY) +
                                      "deg) rotateY(" +
                                      ("y" === this.settings.disableAxis
                                          ? 0
                                          : this.transforms.tiltX) +
                                      "deg) scale3d(" +
                                      this.settings.scale +
                                      "," +
                                      this.settings.scale +
                                      "," +
                                      this.settings.scale +
                                      ")"
                              ),
                              this.settings.glare &&
                                  (this.glareElement.css(
                                      "transform",
                                      "rotate(" +
                                          this.transforms.angle +
                                          "deg) translate(-50%, -50%)"
                                  ),
                                  this.glareElement.css(
                                      "opacity",
                                      "" +
                                          (this.transforms.percentageY *
                                              this.settings.maxGlare) /
                                              100
                                  )),
                              t(this).trigger("change", [this.transforms]),
                              void (this.ticking = !1))
                    );
                },
                c = function () {
                    var i = this.settings.glarePrerender;
                    if (
                        (i ||
                            t(this).append(
                                '<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'
                            ),
                        (this.glareElementWrapper =
                            t(this).find(".js-tilt-glare")),
                        (this.glareElement = t(this).find(
                            ".js-tilt-glare-inner"
                        )),
                        !i)
                    ) {
                        var s = {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                        };
                        this.glareElementWrapper
                            .css(s)
                            .css({
                                overflow: "hidden",
                                "pointer-events": "none",
                            }),
                            this.glareElement.css({
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                "background-image":
                                    "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                                width: "" + 2 * t(this).outerWidth(),
                                height: "" + 2 * t(this).outerWidth(),
                                transform:
                                    "rotate(180deg) translate(-50%, -50%)",
                                "transform-origin": "0% 0%",
                                opacity: "0",
                            });
                    }
                },
                d = function () {
                    this.glareElement.css({
                        width: "" + 2 * t(this).outerWidth(),
                        height: "" + 2 * t(this).outerWidth(),
                    });
                };
            return (
                (t.fn.tilt.destroy = function () {
                    t(this).each(function () {
                        t(this).find(".js-tilt-glare").remove(),
                            t(this).css({ "will-change": "", transform: "" }),
                            t(this).off("mousemove mouseenter mouseleave");
                    });
                }),
                (t.fn.tilt.getValues = function () {
                    var i = [];
                    return (
                        t(this).each(function () {
                            (this.mousePositions = r.call(this)),
                                i.push(h.call(this));
                        }),
                        i
                    );
                }),
                (t.fn.tilt.reset = function () {
                    t(this).each(function () {
                        var i = this;
                        (this.mousePositions = r.call(this)),
                            (this.settings = t(this).data("settings")),
                            l.call(this),
                            setTimeout(function () {
                                i.reset = !1;
                            }, this.settings.transition);
                    });
                }),
                this.each(function () {
                    var s = this;
                    (this.settings = t.extend(
                        {
                            maxTilt: t(this).is("[data-tilt-max]")
                                ? t(this).data("tilt-max")
                                : 20,
                            perspective: t(this).is("[data-tilt-perspective]")
                                ? t(this).data("tilt-perspective")
                                : 300,
                            easing: t(this).is("[data-tilt-easing]")
                                ? t(this).data("tilt-easing")
                                : "cubic-bezier(.03,.98,.52,.99)",
                            scale: t(this).is("[data-tilt-scale]")
                                ? t(this).data("tilt-scale")
                                : "1",
                            speed: t(this).is("[data-tilt-speed]")
                                ? t(this).data("tilt-speed")
                                : "400",
                            transition:
                                !t(this).is("[data-tilt-transition]") ||
                                t(this).data("tilt-transition"),
                            disableAxis: t(this).is("[data-tilt-disable-axis]")
                                ? t(this).data("tilt-disable-axis")
                                : null,
                            axis: t(this).is("[data-tilt-axis]")
                                ? t(this).data("tilt-axis")
                                : null,
                            reset:
                                !t(this).is("[data-tilt-reset]") ||
                                t(this).data("tilt-reset"),
                            glare:
                                !!t(this).is("[data-tilt-glare]") &&
                                t(this).data("tilt-glare"),
                            maxGlare: t(this).is("[data-tilt-maxglare]")
                                ? t(this).data("tilt-maxglare")
                                : 1,
                        },
                        i
                    )),
                        null !== this.settings.axis &&
                            (console.warn(
                                "Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"
                            ),
                            (this.settings.disableAxis = this.settings.axis)),
                        (this.init = function () {
                            t(s).data("settings", s.settings),
                                s.settings.glare && c.call(s),
                                e.call(s);
                        }),
                        this.init();
                })
            );
        }),
        t("[data-tilt]").tilt(),
        !0
    );
});

/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
!(function (t, i, e, s) {
    function o(i, e) {
        var h = this;
        "object" == typeof e &&
            (delete e.refresh, delete e.render, t.extend(this, e)),
            (this.$element = t(i)),
            !this.imageSrc &&
                this.$element.is("img") &&
                (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        if (
            (r.length < 1 && r.push("center"),
            1 == r.length && r.push(r[0]),
            ("top" == r[0] ||
                "bottom" == r[0] ||
                "left" == r[1] ||
                "right" == r[1]) &&
                (r = [r[1], r[0]]),
            this.positionX != s && (r[0] = this.positionX.toLowerCase()),
            this.positionY != s && (r[1] = this.positionY.toLowerCase()),
            (h.positionX = r[0]),
            (h.positionY = r[1]),
            "left" != this.positionX &&
                "right" != this.positionX &&
                (this.positionX = isNaN(parseInt(this.positionX))
                    ? "center"
                    : parseInt(this.positionX)),
            "top" != this.positionY &&
                "bottom" != this.positionY &&
                (this.positionY = isNaN(parseInt(this.positionY))
                    ? "center"
                    : parseInt(this.positionY)),
            (this.position =
                this.positionX +
                (isNaN(this.positionX) ? "" : "px") +
                " " +
                this.positionY +
                (isNaN(this.positionY) ? "" : "px")),
            navigator.userAgent.match(/(iPod|iPhone|iPad)/))
        )
            return (
                this.imageSrc &&
                    this.iosFix &&
                    !this.$element.is("img") &&
                    this.$element.css({
                        backgroundImage: "url(" + this.imageSrc + ")",
                        backgroundSize: "cover",
                        backgroundPosition: this.position,
                    }),
                this
            );
        if (navigator.userAgent.match(/(Android)/))
            return (
                this.imageSrc &&
                    this.androidFix &&
                    !this.$element.is("img") &&
                    this.$element.css({
                        backgroundImage: "url(" + this.imageSrc + ")",
                        backgroundSize: "cover",
                        backgroundPosition: this.position,
                    }),
                this
            );
        this.$mirror = t("<div />").prependTo("body");
        var a = this.$element.find(">.parallax-slider"),
            n = !1;
        0 == a.length
            ? (this.$slider = t("<img />").prependTo(this.$mirror))
            : ((this.$slider = a.prependTo(this.$mirror)), (n = !0)),
            this.$mirror
                .addClass("parallax-mirror")
                .css({
                    visibility: "hidden",
                    zIndex: this.zIndex,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                }),
            this.$slider.addClass("parallax-slider").one("load", function () {
                (h.naturalHeight && h.naturalWidth) ||
                    ((h.naturalHeight = this.naturalHeight || this.height || 1),
                    (h.naturalWidth = this.naturalWidth || this.width || 1)),
                    (h.aspectRatio = h.naturalWidth / h.naturalHeight),
                    o.isSetup || o.setup(),
                    o.sliders.push(h),
                    (o.isFresh = !1),
                    o.requestRender();
            }),
            n || (this.$slider[0].src = this.imageSrc),
            ((this.naturalHeight && this.naturalWidth) ||
                this.$slider[0].complete ||
                a.length > 0) &&
                this.$slider.trigger("load");
    }
    function h(s) {
        return this.each(function () {
            var h = t(this),
                r = "object" == typeof s && s;
            this == i || this == e || h.is("body")
                ? o.configure(r)
                : h.data("px.parallax")
                ? "object" == typeof s && t.extend(h.data("px.parallax"), r)
                : ((r = t.extend({}, h.data(), r)),
                  h.data("px.parallax", new o(this, r))),
                "string" == typeof s &&
                    ("destroy" == s ? o.destroy(this) : o[s]());
        });
    }
    !(function () {
        for (
            var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0;
            s < e.length && !i.requestAnimationFrame;
            ++s
        )
            (i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"]),
                (i.cancelAnimationFrame =
                    i[e[s] + "CancelAnimationFrame"] ||
                    i[e[s] + "CancelRequestAnimationFrame"]);
        i.requestAnimationFrame ||
            (i.requestAnimationFrame = function (e) {
                var s = new Date().getTime(),
                    o = Math.max(0, 16 - (s - t)),
                    h = i.setTimeout(function () {
                        e(s + o);
                    }, o);
                return (t = s + o), h;
            }),
            i.cancelAnimationFrame ||
                (i.cancelAnimationFrame = function (t) {
                    clearTimeout(t);
                });
    })(),
        t.extend(o.prototype, {
            speed: 0.2,
            bleed: 0,
            zIndex: -100,
            iosFix: !0,
            androidFix: !0,
            position: "center",
            overScrollFix: !1,
            refresh: function () {
                (this.boxWidth = this.$element.outerWidth()),
                    (this.boxHeight =
                        this.$element.outerHeight() + 2 * this.bleed),
                    (this.boxOffsetTop =
                        this.$element.offset().top - this.bleed),
                    (this.boxOffsetLeft = this.$element.offset().left),
                    (this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight);
                var t = o.winHeight,
                    i = o.docHeight,
                    e = Math.min(this.boxOffsetTop, i - t),
                    s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
                    h = (this.boxHeight + (e - s) * (1 - this.speed)) | 0,
                    r = ((this.boxOffsetTop - e) * (1 - this.speed)) | 0;
                if (h * this.aspectRatio >= this.boxWidth) {
                    (this.imageWidth = (h * this.aspectRatio) | 0),
                        (this.imageHeight = h),
                        (this.offsetBaseTop = r);
                    var a = this.imageWidth - this.boxWidth;
                    this.offsetLeft =
                        "left" == this.positionX
                            ? 0
                            : "right" == this.positionX
                            ? -a
                            : isNaN(this.positionX)
                            ? (-a / 2) | 0
                            : Math.max(this.positionX, -a);
                } else {
                    (this.imageWidth = this.boxWidth),
                        (this.imageHeight =
                            (this.boxWidth / this.aspectRatio) | 0),
                        (this.offsetLeft = 0);
                    var a = this.imageHeight - h;
                    this.offsetBaseTop =
                        "top" == this.positionY
                            ? r
                            : "bottom" == this.positionY
                            ? r - a
                            : isNaN(this.positionY)
                            ? (r - a / 2) | 0
                            : r + Math.max(this.positionY, -a);
                }
            },
            render: function () {
                var t = o.scrollTop,
                    i = o.scrollLeft,
                    e = this.overScrollFix ? o.overScroll : 0,
                    s = t + o.winHeight;
                this.boxOffsetBottom > t && this.boxOffsetTop <= s
                    ? ((this.visibility = "visible"),
                      (this.mirrorTop = this.boxOffsetTop - t),
                      (this.mirrorLeft = this.boxOffsetLeft - i),
                      (this.offsetTop =
                          this.offsetBaseTop -
                          this.mirrorTop * (1 - this.speed)))
                    : (this.visibility = "hidden"),
                    this.$mirror.css({
                        transform: "translate3d(0px, 0px, 0px)",
                        visibility: this.visibility,
                        top: this.mirrorTop - e,
                        left: this.mirrorLeft,
                        height: this.boxHeight,
                        width: this.boxWidth,
                    }),
                    this.$slider.css({
                        transform: "translate3d(0px, 0px, 0px)",
                        position: "absolute",
                        top: this.offsetTop,
                        left: this.offsetLeft,
                        height: this.imageHeight,
                        width: this.imageWidth,
                        maxWidth: "none",
                    });
            },
        }),
        t.extend(o, {
            scrollTop: 0,
            scrollLeft: 0,
            winHeight: 0,
            winWidth: 0,
            docHeight: 1 << 30,
            docWidth: 1 << 30,
            sliders: [],
            isReady: !1,
            isFresh: !1,
            isBusy: !1,
            setup: function () {
                if (!this.isReady) {
                    var s = t(e),
                        h = t(i),
                        r = function () {
                            (o.winHeight = h.height()),
                                (o.winWidth = h.width()),
                                (o.docHeight = s.height()),
                                (o.docWidth = s.width());
                        },
                        a = function () {
                            var t = h.scrollTop(),
                                i = o.docHeight - o.winHeight,
                                e = o.docWidth - o.winWidth;
                            (o.scrollTop = Math.max(0, Math.min(i, t))),
                                (o.scrollLeft = Math.max(
                                    0,
                                    Math.min(e, h.scrollLeft())
                                )),
                                (o.overScroll = Math.max(
                                    t - i,
                                    Math.min(t, 0)
                                ));
                        };
                    h
                        .on("resize.px.parallax load.px.parallax", function () {
                            r(), (o.isFresh = !1), o.requestRender();
                        })
                        .on("scroll.px.parallax load.px.parallax", function () {
                            a(), o.requestRender();
                        }),
                        r(),
                        a(),
                        (this.isReady = !0);
                }
            },
            configure: function (i) {
                "object" == typeof i &&
                    (delete i.refresh,
                    delete i.render,
                    t.extend(this.prototype, i));
            },
            refresh: function () {
                t.each(this.sliders, function () {
                    this.refresh();
                }),
                    (this.isFresh = !0);
            },
            render: function () {
                this.isFresh || this.refresh(),
                    t.each(this.sliders, function () {
                        this.render();
                    });
            },
            requestRender: function () {
                var t = this;
                this.isBusy ||
                    ((this.isBusy = !0),
                    i.requestAnimationFrame(function () {
                        t.render(), (t.isBusy = !1);
                    }));
            },
            destroy: function (e) {
                var s,
                    h = t(e).data("px.parallax");
                for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1)
                    this.sliders[s] == h && this.sliders.splice(s, 1);
                t(e).data("px.parallax", !1),
                    0 === this.sliders.length &&
                        (t(i).off(
                            "scroll.px.parallax resize.px.parallax load.px.parallax"
                        ),
                        (this.isReady = !1),
                        (o.isSetup = !1));
            },
        });
    var r = t.fn.parallax;
    (t.fn.parallax = h),
        (t.fn.parallax.Constructor = o),
        (t.fn.parallax.noConflict = function () {
            return (t.fn.parallax = r), this;
        }),
        t(e).on("ready.px.parallax.data-api", function () {
            t('[data-parallax="scroll"]').parallax();
        });
})(jQuery, window, document);

/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function" !== typeof Object.create &&
    (Object.create = function (d) {
        function h() {}
        h.prototype = d;
        return new h();
    });
(function (d, h, l, m) {
    var k = {
        init: function (b, a) {
            var c = this;
            c.elem = a;
            c.$elem = d(a);
            c.imageSrc = c.$elem.data("zoom-image")
                ? c.$elem.data("zoom-image")
                : c.$elem.attr("src");
            c.options = d.extend({}, d.fn.elevateZoom.options, b);
            c.options.tint &&
                ((c.options.lensColour = "none"),
                (c.options.lensOpacity = "1"));
            "inner" == c.options.zoomType && (c.options.showLens = !1);
            c.$elem.parent().removeAttr("title").removeAttr("alt");
            c.zoomImage = c.imageSrc;
            c.refresh(1);
            d("#" + c.options.gallery + " a").click(function (a) {
                c.options.galleryActiveClass &&
                    (d("#" + c.options.gallery + " a").removeClass(
                        c.options.galleryActiveClass
                    ),
                    d(this).addClass(c.options.galleryActiveClass));
                a.preventDefault();
                d(this).data("zoom-image")
                    ? (c.zoomImagePre = d(this).data("zoom-image"))
                    : (c.zoomImagePre = d(this).data("image"));
                c.swaptheimage(d(this).data("image"), c.zoomImagePre);
                return !1;
            });
        },
        refresh: function (b) {
            var a = this;
            setTimeout(function () {
                a.fetch(a.imageSrc);
            }, b || a.options.refresh);
        },
        fetch: function (b) {
            var a = this,
                c = new Image();
            c.onload = function () {
                a.largeWidth = c.width;
                a.largeHeight = c.height;
                a.startZoom();
                a.currentImage = a.imageSrc;
                a.options.onZoomedImageLoaded(a.$elem);
            };
            c.src = b;
        },
        startZoom: function () {
            var b = this;
            b.nzWidth = b.$elem.width();
            b.nzHeight = b.$elem.height();
            b.isWindowActive = !1;
            b.isLensActive = !1;
            b.isTintActive = !1;
            b.overWindow = !1;
            b.options.imageCrossfade &&
                ((b.zoomWrap = b.$elem.wrap(
                    '<div style="height:' +
                        b.nzHeight +
                        "px;width:" +
                        b.nzWidth +
                        'px;" class="zoomWrapper" />'
                )),
                b.$elem.css("position", "absolute"));
            b.zoomLock = 1;
            b.scrollingLock = !1;
            b.changeBgSize = !1;
            b.currentZoomLevel = b.options.zoomLevel;
            b.nzOffset = b.$elem.offset();
            b.widthRatio = b.largeWidth / b.currentZoomLevel / b.nzWidth;
            b.heightRatio = b.largeHeight / b.currentZoomLevel / b.nzHeight;
            "window" == b.options.zoomType &&
                (b.zoomWindowStyle =
                    "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " +
                    String(b.options.zoomWindowBgColour) +
                    ";width: " +
                    String(b.options.zoomWindowWidth) +
                    "px;height: " +
                    String(b.options.zoomWindowHeight) +
                    "px;float: left;background-size: " +
                    b.largeWidth / b.currentZoomLevel +
                    "px " +
                    b.largeHeight / b.currentZoomLevel +
                    "px;display: none;z-index:100;border: " +
                    String(b.options.borderSize) +
                    "px solid " +
                    b.options.borderColour +
                    ";background-repeat: no-repeat;position: absolute;");
            if ("inner" == b.options.zoomType) {
                var a = b.$elem.css("border-left-width");
                b.zoomWindowStyle =
                    "overflow: hidden;margin-left: " +
                    String(a) +
                    ";margin-top: " +
                    String(a) +
                    ";background-position: 0px 0px;width: " +
                    String(b.nzWidth) +
                    "px;height: " +
                    String(b.nzHeight) +
                    "px;float: left;display: none;cursor:" +
                    b.options.cursor +
                    ";px solid " +
                    b.options.borderColour +
                    ";background-repeat: no-repeat;position: absolute;";
            }
            "window" == b.options.zoomType &&
                ((lensHeight =
                    b.nzHeight < b.options.zoomWindowWidth / b.widthRatio
                        ? b.nzHeight
                        : String(b.options.zoomWindowHeight / b.heightRatio)),
                (lensWidth =
                    b.largeWidth < b.options.zoomWindowWidth
                        ? b.nzWidth
                        : b.options.zoomWindowWidth / b.widthRatio),
                (b.lensStyle =
                    "background-position: 0px 0px;width: " +
                    String(b.options.zoomWindowWidth / b.widthRatio) +
                    "px;height: " +
                    String(b.options.zoomWindowHeight / b.heightRatio) +
                    "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" +
                    b.options.lensOpacity +
                    ";filter: alpha(opacity = " +
                    100 * b.options.lensOpacity +
                    "); zoom:1;width:" +
                    lensWidth +
                    "px;height:" +
                    lensHeight +
                    "px;background-color:" +
                    b.options.lensColour +
                    ";cursor:" +
                    b.options.cursor +
                    ";border: " +
                    b.options.lensBorderSize +
                    "px solid " +
                    b.options.lensBorderColour +
                    ";background-repeat: no-repeat;position: absolute;"));
            b.tintStyle =
                "display: block;position: absolute;background-color: " +
                b.options.tintColour +
                ";filter:alpha(opacity=0);opacity: 0;width: " +
                b.nzWidth +
                "px;height: " +
                b.nzHeight +
                "px;";
            b.lensRound = "";
            "lens" == b.options.zoomType &&
                (b.lensStyle =
                    "background-position: 0px 0px;float: left;display: none;border: " +
                    String(b.options.borderSize) +
                    "px solid " +
                    b.options.borderColour +
                    ";width:" +
                    String(b.options.lensSize) +
                    "px;height:" +
                    String(b.options.lensSize) +
                    "px;background-repeat: no-repeat;position: absolute;");
            "round" == b.options.lensShape &&
                (b.lensRound =
                    "border-top-left-radius: " +
                    String(b.options.lensSize / 2 + b.options.borderSize) +
                    "px;border-top-right-radius: " +
                    String(b.options.lensSize / 2 + b.options.borderSize) +
                    "px;border-bottom-left-radius: " +
                    String(b.options.lensSize / 2 + b.options.borderSize) +
                    "px;border-bottom-right-radius: " +
                    String(b.options.lensSize / 2 + b.options.borderSize) +
                    "px;");
            b.zoomContainer = d(
                '<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' +
                    b.nzOffset.left +
                    "px;top:" +
                    b.nzOffset.top +
                    "px;height:" +
                    b.nzHeight +
                    "px;width:" +
                    b.nzWidth +
                    'px;"></div>'
            );
            d("body").append(b.zoomContainer);
            b.options.containLensZoom &&
                "lens" == b.options.zoomType &&
                b.zoomContainer.css("overflow", "hidden");
            "inner" != b.options.zoomType &&
                ((b.zoomLens = d(
                    "<div class='zoomLens' style='" +
                        b.lensStyle +
                        b.lensRound +
                        "'>&nbsp;</div>"
                )
                    .appendTo(b.zoomContainer)
                    .click(function () {
                        b.$elem.trigger("click");
                    })),
                b.options.tint &&
                    ((b.tintContainer = d("<div/>").addClass("tintContainer")),
                    (b.zoomTint = d(
                        "<div class='zoomTint' style='" +
                            b.tintStyle +
                            "'></div>"
                    )),
                    b.zoomLens.wrap(b.tintContainer),
                    (b.zoomTintcss = b.zoomLens.after(b.zoomTint)),
                    (b.zoomTintImage = d(
                        '<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' +
                            b.nzWidth +
                            "px; height: " +
                            b.nzHeight +
                            'px;" src="' +
                            b.imageSrc +
                            '">'
                    )
                        .appendTo(b.zoomLens)
                        .click(function () {
                            b.$elem.trigger("click");
                        }))));
            isNaN(b.options.zoomWindowPosition)
                ? (b.zoomWindow = d(
                      "<div style='z-index:999;left:" +
                          b.windowOffsetLeft +
                          "px;top:" +
                          b.windowOffsetTop +
                          "px;" +
                          b.zoomWindowStyle +
                          "' class='zoomWindow'>&nbsp;</div>"
                  )
                      .appendTo("body")
                      .click(function () {
                          b.$elem.trigger("click");
                      }))
                : (b.zoomWindow = d(
                      "<div style='z-index:999;left:" +
                          b.windowOffsetLeft +
                          "px;top:" +
                          b.windowOffsetTop +
                          "px;" +
                          b.zoomWindowStyle +
                          "' class='zoomWindow'>&nbsp;</div>"
                  )
                      .appendTo(b.zoomContainer)
                      .click(function () {
                          b.$elem.trigger("click");
                      }));
            b.zoomWindowContainer = d("<div/>")
                .addClass("zoomWindowContainer")
                .css("width", b.options.zoomWindowWidth);
            b.zoomWindow.wrap(b.zoomWindowContainer);
            "lens" == b.options.zoomType &&
                b.zoomLens.css({
                    backgroundImage: "url('" + b.imageSrc + "')",
                });
            "window" == b.options.zoomType &&
                b.zoomWindow.css({
                    backgroundImage: "url('" + b.imageSrc + "')",
                });
            "inner" == b.options.zoomType &&
                b.zoomWindow.css({
                    backgroundImage: "url('" + b.imageSrc + "')",
                });
            b.$elem.bind("touchmove", function (a) {
                a.preventDefault();
                b.setPosition(
                    a.originalEvent.touches[0] ||
                        a.originalEvent.changedTouches[0]
                );
            });
            b.zoomContainer.bind("touchmove", function (a) {
                "inner" == b.options.zoomType && b.showHideWindow("show");
                a.preventDefault();
                b.setPosition(
                    a.originalEvent.touches[0] ||
                        a.originalEvent.changedTouches[0]
                );
            });
            b.zoomContainer.bind("touchend", function (a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint &&
                    "inner" != b.options.zoomType &&
                    b.showHideTint("hide");
            });
            b.$elem.bind("touchend", function (a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint &&
                    "inner" != b.options.zoomType &&
                    b.showHideTint("hide");
            });
            b.options.showLens &&
                (b.zoomLens.bind("touchmove", function (a) {
                    a.preventDefault();
                    b.setPosition(
                        a.originalEvent.touches[0] ||
                            a.originalEvent.changedTouches[0]
                    );
                }),
                b.zoomLens.bind("touchend", function (a) {
                    b.showHideWindow("hide");
                    b.options.showLens && b.showHideLens("hide");
                    b.options.tint &&
                        "inner" != b.options.zoomType &&
                        b.showHideTint("hide");
                }));
            b.$elem.bind("mousemove", function (a) {
                !1 == b.overWindow && b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)
                    b.setPosition(a), (b.currentLoc = a);
                b.lastX = a.clientX;
                b.lastY = a.clientY;
            });
            b.zoomContainer.bind("mousemove", function (a) {
                !1 == b.overWindow && b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)
                    b.setPosition(a), (b.currentLoc = a);
                b.lastX = a.clientX;
                b.lastY = a.clientY;
            });
            "inner" != b.options.zoomType &&
                b.zoomLens.bind("mousemove", function (a) {
                    if (b.lastX !== a.clientX || b.lastY !== a.clientY)
                        b.setPosition(a), (b.currentLoc = a);
                    b.lastX = a.clientX;
                    b.lastY = a.clientY;
                });
            b.options.tint &&
                "inner" != b.options.zoomType &&
                b.zoomTint.bind("mousemove", function (a) {
                    if (b.lastX !== a.clientX || b.lastY !== a.clientY)
                        b.setPosition(a), (b.currentLoc = a);
                    b.lastX = a.clientX;
                    b.lastY = a.clientY;
                });
            "inner" == b.options.zoomType &&
                b.zoomWindow.bind("mousemove", function (a) {
                    if (b.lastX !== a.clientX || b.lastY !== a.clientY)
                        b.setPosition(a), (b.currentLoc = a);
                    b.lastX = a.clientX;
                    b.lastY = a.clientY;
                });
            b.zoomContainer
                .add(b.$elem)
                .mouseenter(function () {
                    !1 == b.overWindow && b.setElements("show");
                })
                .mouseleave(function () {
                    b.scrollLock || b.setElements("hide");
                });
            "inner" != b.options.zoomType &&
                b.zoomWindow
                    .mouseenter(function () {
                        b.overWindow = !0;
                        b.setElements("hide");
                    })
                    .mouseleave(function () {
                        b.overWindow = !1;
                    });
            b.minZoomLevel = b.options.minZoomLevel
                ? b.options.minZoomLevel
                : 2 * b.options.scrollZoomIncrement;
            b.options.scrollZoom &&
                b.zoomContainer
                    .add(b.$elem)
                    .bind(
                        "mousewheel DOMMouseScroll MozMousePixelScroll",
                        function (a) {
                            b.scrollLock = !0;
                            clearTimeout(d.data(this, "timer"));
                            d.data(
                                this,
                                "timer",
                                setTimeout(function () {
                                    b.scrollLock = !1;
                                }, 250)
                            );
                            var e =
                                a.originalEvent.wheelDelta ||
                                -1 * a.originalEvent.detail;
                            a.stopImmediatePropagation();
                            a.stopPropagation();
                            a.preventDefault();
                            0 < e / 120
                                ? b.currentZoomLevel >= b.minZoomLevel &&
                                  b.changeZoomLevel(
                                      b.currentZoomLevel -
                                          b.options.scrollZoomIncrement
                                  )
                                : b.options.maxZoomLevel
                                ? b.currentZoomLevel <=
                                      b.options.maxZoomLevel &&
                                  b.changeZoomLevel(
                                      parseFloat(b.currentZoomLevel) +
                                          b.options.scrollZoomIncrement
                                  )
                                : b.changeZoomLevel(
                                      parseFloat(b.currentZoomLevel) +
                                          b.options.scrollZoomIncrement
                                  );
                            return !1;
                        }
                    );
        },
        setElements: function (b) {
            if (!this.options.zoomEnabled) return !1;
            "show" == b &&
                this.isWindowSet &&
                ("inner" == this.options.zoomType &&
                    this.showHideWindow("show"),
                "window" == this.options.zoomType &&
                    this.showHideWindow("show"),
                this.options.showLens && this.showHideLens("show"),
                this.options.tint &&
                    "inner" != this.options.zoomType &&
                    this.showHideTint("show"));
            "hide" == b &&
                ("window" == this.options.zoomType &&
                    this.showHideWindow("hide"),
                this.options.tint || this.showHideWindow("hide"),
                this.options.showLens && this.showHideLens("hide"),
                this.options.tint && this.showHideTint("hide"));
        },
        setPosition: function (b) {
            if (!this.options.zoomEnabled) return !1;
            this.nzHeight = this.$elem.height();
            this.nzWidth = this.$elem.width();
            this.nzOffset = this.$elem.offset();
            this.options.tint &&
                "inner" != this.options.zoomType &&
                (this.zoomTint.css({ top: 0 }), this.zoomTint.css({ left: 0 }));
            this.options.responsive &&
                !this.options.scrollZoom &&
                this.options.showLens &&
                ((lensHeight =
                    this.nzHeight <
                    this.options.zoomWindowWidth / this.widthRatio
                        ? this.nzHeight
                        : String(
                              this.options.zoomWindowHeight / this.heightRatio
                          )),
                (lensWidth =
                    this.largeWidth < this.options.zoomWindowWidth
                        ? this.nzWidth
                        : this.options.zoomWindowWidth / this.widthRatio),
                (this.widthRatio = this.largeWidth / this.nzWidth),
                (this.heightRatio = this.largeHeight / this.nzHeight),
                "lens" != this.options.zoomType &&
                    ((lensHeight =
                        this.nzHeight <
                        this.options.zoomWindowWidth / this.widthRatio
                            ? this.nzHeight
                            : String(
                                  this.options.zoomWindowHeight /
                                      this.heightRatio
                              )),
                    (lensWidth =
                        this.options.zoomWindowWidth <
                        this.options.zoomWindowWidth
                            ? this.nzWidth
                            : this.options.zoomWindowWidth / this.widthRatio),
                    this.zoomLens.css("width", lensWidth),
                    this.zoomLens.css("height", lensHeight),
                    this.options.tint &&
                        (this.zoomTintImage.css("width", this.nzWidth),
                        this.zoomTintImage.css("height", this.nzHeight))),
                "lens" == this.options.zoomType &&
                    this.zoomLens.css({
                        width: String(this.options.lensSize) + "px",
                        height: String(this.options.lensSize) + "px",
                    }));
            this.zoomContainer.css({ top: this.nzOffset.top });
            this.zoomContainer.css({ left: this.nzOffset.left });
            this.mouseLeft = parseInt(b.pageX - this.nzOffset.left);
            this.mouseTop = parseInt(b.pageY - this.nzOffset.top);
            "window" == this.options.zoomType &&
                ((this.Etoppos = this.mouseTop < this.zoomLens.height() / 2),
                (this.Eboppos =
                    this.mouseTop >
                    this.nzHeight -
                        this.zoomLens.height() / 2 -
                        2 * this.options.lensBorderSize),
                (this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2),
                (this.Eroppos =
                    this.mouseLeft >
                    this.nzWidth -
                        this.zoomLens.width() / 2 -
                        2 * this.options.lensBorderSize));
            "inner" == this.options.zoomType &&
                ((this.Etoppos =
                    this.mouseTop < this.nzHeight / 2 / this.heightRatio),
                (this.Eboppos =
                    this.mouseTop >
                    this.nzHeight - this.nzHeight / 2 / this.heightRatio),
                (this.Eloppos =
                    this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio),
                (this.Eroppos =
                    this.mouseLeft >
                    this.nzWidth -
                        this.nzWidth / 2 / this.widthRatio -
                        2 * this.options.lensBorderSize));
            0 >= this.mouseLeft ||
            0 > this.mouseTop ||
            this.mouseLeft > this.nzWidth ||
            this.mouseTop > this.nzHeight
                ? this.setElements("hide")
                : (this.options.showLens &&
                      ((this.lensLeftPos = String(
                          this.mouseLeft - this.zoomLens.width() / 2
                      )),
                      (this.lensTopPos = String(
                          this.mouseTop - this.zoomLens.height() / 2
                      ))),
                  this.Etoppos && (this.lensTopPos = 0),
                  this.Eloppos &&
                      (this.tintpos =
                          this.lensLeftPos =
                          this.windowLeftPos =
                              0),
                  "window" == this.options.zoomType &&
                      (this.Eboppos &&
                          (this.lensTopPos = Math.max(
                              this.nzHeight -
                                  this.zoomLens.height() -
                                  2 * this.options.lensBorderSize,
                              0
                          )),
                      this.Eroppos &&
                          (this.lensLeftPos =
                              this.nzWidth -
                              this.zoomLens.width() -
                              2 * this.options.lensBorderSize)),
                  "inner" == this.options.zoomType &&
                      (this.Eboppos &&
                          (this.lensTopPos = Math.max(
                              this.nzHeight - 2 * this.options.lensBorderSize,
                              0
                          )),
                      this.Eroppos &&
                          (this.lensLeftPos =
                              this.nzWidth -
                              this.nzWidth -
                              2 * this.options.lensBorderSize)),
                  "lens" == this.options.zoomType &&
                      ((this.windowLeftPos = String(
                          -1 *
                              ((b.pageX - this.nzOffset.left) *
                                  this.widthRatio -
                                  this.zoomLens.width() / 2)
                      )),
                      (this.windowTopPos = String(
                          -1 *
                              ((b.pageY - this.nzOffset.top) *
                                  this.heightRatio -
                                  this.zoomLens.height() / 2)
                      )),
                      this.zoomLens.css({
                          backgroundPosition:
                              this.windowLeftPos +
                              "px " +
                              this.windowTopPos +
                              "px",
                      }),
                      this.changeBgSize &&
                          (this.nzHeight > this.nzWidth
                              ? ("lens" == this.options.zoomType &&
                                    this.zoomLens.css({
                                        "background-size":
                                            this.largeWidth /
                                                this.newvalueheight +
                                            "px " +
                                            this.largeHeight /
                                                this.newvalueheight +
                                            "px",
                                    }),
                                this.zoomWindow.css({
                                    "background-size":
                                        this.largeWidth / this.newvalueheight +
                                        "px " +
                                        this.largeHeight / this.newvalueheight +
                                        "px",
                                }))
                              : ("lens" == this.options.zoomType &&
                                    this.zoomLens.css({
                                        "background-size":
                                            this.largeWidth /
                                                this.newvaluewidth +
                                            "px " +
                                            this.largeHeight /
                                                this.newvaluewidth +
                                            "px",
                                    }),
                                this.zoomWindow.css({
                                    "background-size":
                                        this.largeWidth / this.newvaluewidth +
                                        "px " +
                                        this.largeHeight / this.newvaluewidth +
                                        "px",
                                })),
                          (this.changeBgSize = !1)),
                      this.setWindowPostition(b)),
                  this.options.tint &&
                      "inner" != this.options.zoomType &&
                      this.setTintPosition(b),
                  "window" == this.options.zoomType &&
                      this.setWindowPostition(b),
                  "inner" == this.options.zoomType &&
                      this.setWindowPostition(b),
                  this.options.showLens &&
                      (this.fullwidth &&
                          "lens" != this.options.zoomType &&
                          (this.lensLeftPos = 0),
                      this.zoomLens.css({
                          left: this.lensLeftPos + "px",
                          top: this.lensTopPos + "px",
                      })));
        },
        showHideWindow: function (b) {
            "show" != b ||
                this.isWindowActive ||
                (this.options.zoomWindowFadeIn
                    ? this.zoomWindow
                          .stop(!0, !0, !1)
                          .fadeIn(this.options.zoomWindowFadeIn)
                    : this.zoomWindow.show(),
                (this.isWindowActive = !0));
            "hide" == b &&
                this.isWindowActive &&
                (this.options.zoomWindowFadeOut
                    ? this.zoomWindow
                          .stop(!0, !0)
                          .fadeOut(this.options.zoomWindowFadeOut)
                    : this.zoomWindow.hide(),
                (this.isWindowActive = !1));
        },
        showHideLens: function (b) {
            "show" != b ||
                this.isLensActive ||
                (this.options.lensFadeIn
                    ? this.zoomLens
                          .stop(!0, !0, !1)
                          .fadeIn(this.options.lensFadeIn)
                    : this.zoomLens.show(),
                (this.isLensActive = !0));
            "hide" == b &&
                this.isLensActive &&
                (this.options.lensFadeOut
                    ? this.zoomLens
                          .stop(!0, !0)
                          .fadeOut(this.options.lensFadeOut)
                    : this.zoomLens.hide(),
                (this.isLensActive = !1));
        },
        showHideTint: function (b) {
            "show" != b ||
                this.isTintActive ||
                (this.options.zoomTintFadeIn
                    ? this.zoomTint
                          .css({ opacity: this.options.tintOpacity })
                          .animate()
                          .stop(!0, !0)
                          .fadeIn("slow")
                    : (this.zoomTint
                          .css({ opacity: this.options.tintOpacity })
                          .animate(),
                      this.zoomTint.show()),
                (this.isTintActive = !0));
            "hide" == b &&
                this.isTintActive &&
                (this.options.zoomTintFadeOut
                    ? this.zoomTint
                          .stop(!0, !0)
                          .fadeOut(this.options.zoomTintFadeOut)
                    : this.zoomTint.hide(),
                (this.isTintActive = !1));
        },
        setLensPostition: function (b) {},
        setWindowPostition: function (b) {
            var a = this;
            if (isNaN(a.options.zoomWindowPosition))
                (a.externalContainer = d("#" + a.options.zoomWindowPosition)),
                    (a.externalContainerWidth = a.externalContainer.width()),
                    (a.externalContainerHeight = a.externalContainer.height()),
                    (a.externalContainerOffset = a.externalContainer.offset()),
                    (a.windowOffsetTop = a.externalContainerOffset.top),
                    (a.windowOffsetLeft = a.externalContainerOffset.left);
            else
                switch (a.options.zoomWindowPosition) {
                    case 1:
                        a.windowOffsetTop = a.options.zoomWindowOffety;
                        a.windowOffsetLeft = +a.nzWidth;
                        break;
                    case 2:
                        a.options.zoomWindowHeight > a.nzHeight &&
                            ((a.windowOffsetTop =
                                -1 *
                                (a.options.zoomWindowHeight / 2 -
                                    a.nzHeight / 2)),
                            (a.windowOffsetLeft = a.nzWidth));
                        break;
                    case 3:
                        a.windowOffsetTop =
                            a.nzHeight -
                            a.zoomWindow.height() -
                            2 * a.options.borderSize;
                        a.windowOffsetLeft = a.nzWidth;
                        break;
                    case 4:
                        a.windowOffsetTop = a.nzHeight;
                        a.windowOffsetLeft = a.nzWidth;
                        break;
                    case 5:
                        a.windowOffsetTop = a.nzHeight;
                        a.windowOffsetLeft =
                            a.nzWidth -
                            a.zoomWindow.width() -
                            2 * a.options.borderSize;
                        break;
                    case 6:
                        a.options.zoomWindowHeight > a.nzHeight &&
                            ((a.windowOffsetTop = a.nzHeight),
                            (a.windowOffsetLeft =
                                -1 *
                                (a.options.zoomWindowWidth / 2 -
                                    a.nzWidth / 2 +
                                    2 * a.options.borderSize)));
                        break;
                    case 7:
                        a.windowOffsetTop = a.nzHeight;
                        a.windowOffsetLeft = 0;
                        break;
                    case 8:
                        a.windowOffsetTop = a.nzHeight;
                        a.windowOffsetLeft =
                            -1 *
                            (a.zoomWindow.width() + 2 * a.options.borderSize);
                        break;
                    case 9:
                        a.windowOffsetTop =
                            a.nzHeight -
                            a.zoomWindow.height() -
                            2 * a.options.borderSize;
                        a.windowOffsetLeft =
                            -1 *
                            (a.zoomWindow.width() + 2 * a.options.borderSize);
                        break;
                    case 10:
                        a.options.zoomWindowHeight > a.nzHeight &&
                            ((a.windowOffsetTop =
                                -1 *
                                (a.options.zoomWindowHeight / 2 -
                                    a.nzHeight / 2)),
                            (a.windowOffsetLeft =
                                -1 *
                                (a.zoomWindow.width() +
                                    2 * a.options.borderSize)));
                        break;
                    case 11:
                        a.windowOffsetTop = a.options.zoomWindowOffety;
                        a.windowOffsetLeft =
                            -1 *
                            (a.zoomWindow.width() + 2 * a.options.borderSize);
                        break;
                    case 12:
                        a.windowOffsetTop =
                            -1 *
                            (a.zoomWindow.height() + 2 * a.options.borderSize);
                        a.windowOffsetLeft =
                            -1 *
                            (a.zoomWindow.width() + 2 * a.options.borderSize);
                        break;
                    case 13:
                        a.windowOffsetTop =
                            -1 *
                            (a.zoomWindow.height() + 2 * a.options.borderSize);
                        a.windowOffsetLeft = 0;
                        break;
                    case 14:
                        a.options.zoomWindowHeight > a.nzHeight &&
                            ((a.windowOffsetTop =
                                -1 *
                                (a.zoomWindow.height() +
                                    2 * a.options.borderSize)),
                            (a.windowOffsetLeft =
                                -1 *
                                (a.options.zoomWindowWidth / 2 -
                                    a.nzWidth / 2 +
                                    2 * a.options.borderSize)));
                        break;
                    case 15:
                        a.windowOffsetTop =
                            -1 *
                            (a.zoomWindow.height() + 2 * a.options.borderSize);
                        a.windowOffsetLeft =
                            a.nzWidth -
                            a.zoomWindow.width() -
                            2 * a.options.borderSize;
                        break;
                    case 16:
                        a.windowOffsetTop =
                            -1 *
                            (a.zoomWindow.height() + 2 * a.options.borderSize);
                        a.windowOffsetLeft = a.nzWidth;
                        break;
                    default:
                        (a.windowOffsetTop = a.options.zoomWindowOffety),
                            (a.windowOffsetLeft = a.nzWidth);
                }
            a.isWindowSet = !0;
            a.windowOffsetTop += a.options.zoomWindowOffety;
            a.windowOffsetLeft += a.options.zoomWindowOffetx;
            a.zoomWindow.css({ top: a.windowOffsetTop });
            a.zoomWindow.css({ left: a.windowOffsetLeft });
            "inner" == a.options.zoomType &&
                (a.zoomWindow.css({ top: 0 }), a.zoomWindow.css({ left: 0 }));
            a.windowLeftPos = String(
                -1 *
                    ((b.pageX - a.nzOffset.left) * a.widthRatio -
                        a.zoomWindow.width() / 2)
            );
            a.windowTopPos = String(
                -1 *
                    ((b.pageY - a.nzOffset.top) * a.heightRatio -
                        a.zoomWindow.height() / 2)
            );
            a.Etoppos && (a.windowTopPos = 0);
            a.Eloppos && (a.windowLeftPos = 0);
            a.Eboppos &&
                (a.windowTopPos =
                    -1 *
                    (a.largeHeight / a.currentZoomLevel -
                        a.zoomWindow.height()));
            a.Eroppos &&
                (a.windowLeftPos =
                    -1 *
                    (a.largeWidth / a.currentZoomLevel - a.zoomWindow.width()));
            a.fullheight && (a.windowTopPos = 0);
            a.fullwidth && (a.windowLeftPos = 0);
            if ("window" == a.options.zoomType || "inner" == a.options.zoomType)
                1 == a.zoomLock &&
                    (1 >= a.widthRatio && (a.windowLeftPos = 0),
                    1 >= a.heightRatio && (a.windowTopPos = 0)),
                    a.largeHeight < a.options.zoomWindowHeight &&
                        (a.windowTopPos = 0),
                    a.largeWidth < a.options.zoomWindowWidth &&
                        (a.windowLeftPos = 0),
                    a.options.easing
                        ? (a.xp || (a.xp = 0),
                          a.yp || (a.yp = 0),
                          a.loop ||
                              (a.loop = setInterval(function () {
                                  a.xp +=
                                      (a.windowLeftPos - a.xp) /
                                      a.options.easingAmount;
                                  a.yp +=
                                      (a.windowTopPos - a.yp) /
                                      a.options.easingAmount;
                                  a.scrollingLock
                                      ? (clearInterval(a.loop),
                                        (a.xp = a.windowLeftPos),
                                        (a.yp = a.windowTopPos),
                                        (a.xp =
                                            -1 *
                                            ((b.pageX - a.nzOffset.left) *
                                                a.widthRatio -
                                                a.zoomWindow.width() / 2)),
                                        (a.yp =
                                            -1 *
                                            ((b.pageY - a.nzOffset.top) *
                                                a.heightRatio -
                                                a.zoomWindow.height() / 2)),
                                        a.changeBgSize &&
                                            (a.nzHeight > a.nzWidth
                                                ? ("lens" ==
                                                      a.options.zoomType &&
                                                      a.zoomLens.css({
                                                          "background-size":
                                                              a.largeWidth /
                                                                  a.newvalueheight +
                                                              "px " +
                                                              a.largeHeight /
                                                                  a.newvalueheight +
                                                              "px",
                                                      }),
                                                  a.zoomWindow.css({
                                                      "background-size":
                                                          a.largeWidth /
                                                              a.newvalueheight +
                                                          "px " +
                                                          a.largeHeight /
                                                              a.newvalueheight +
                                                          "px",
                                                  }))
                                                : ("lens" !=
                                                      a.options.zoomType &&
                                                      a.zoomLens.css({
                                                          "background-size":
                                                              a.largeWidth /
                                                                  a.newvaluewidth +
                                                              "px " +
                                                              a.largeHeight /
                                                                  a.newvalueheight +
                                                              "px",
                                                      }),
                                                  a.zoomWindow.css({
                                                      "background-size":
                                                          a.largeWidth /
                                                              a.newvaluewidth +
                                                          "px " +
                                                          a.largeHeight /
                                                              a.newvaluewidth +
                                                          "px",
                                                  })),
                                            (a.changeBgSize = !1)),
                                        a.zoomWindow.css({
                                            backgroundPosition:
                                                a.windowLeftPos +
                                                "px " +
                                                a.windowTopPos +
                                                "px",
                                        }),
                                        (a.scrollingLock = !1),
                                        (a.loop = !1))
                                      : (a.changeBgSize &&
                                            (a.nzHeight > a.nzWidth
                                                ? ("lens" ==
                                                      a.options.zoomType &&
                                                      a.zoomLens.css({
                                                          "background-size":
                                                              a.largeWidth /
                                                                  a.newvalueheight +
                                                              "px " +
                                                              a.largeHeight /
                                                                  a.newvalueheight +
                                                              "px",
                                                      }),
                                                  a.zoomWindow.css({
                                                      "background-size":
                                                          a.largeWidth /
                                                              a.newvalueheight +
                                                          "px " +
                                                          a.largeHeight /
                                                              a.newvalueheight +
                                                          "px",
                                                  }))
                                                : ("lens" !=
                                                      a.options.zoomType &&
                                                      a.zoomLens.css({
                                                          "background-size":
                                                              a.largeWidth /
                                                                  a.newvaluewidth +
                                                              "px " +
                                                              a.largeHeight /
                                                                  a.newvaluewidth +
                                                              "px",
                                                      }),
                                                  a.zoomWindow.css({
                                                      "background-size":
                                                          a.largeWidth /
                                                              a.newvaluewidth +
                                                          "px " +
                                                          a.largeHeight /
                                                              a.newvaluewidth +
                                                          "px",
                                                  })),
                                            (a.changeBgSize = !1)),
                                        a.zoomWindow.css({
                                            backgroundPosition:
                                                a.xp + "px " + a.yp + "px",
                                        }));
                              }, 16)))
                        : (a.changeBgSize &&
                              (a.nzHeight > a.nzWidth
                                  ? ("lens" == a.options.zoomType &&
                                        a.zoomLens.css({
                                            "background-size":
                                                a.largeWidth /
                                                    a.newvalueheight +
                                                "px " +
                                                a.largeHeight /
                                                    a.newvalueheight +
                                                "px",
                                        }),
                                    a.zoomWindow.css({
                                        "background-size":
                                            a.largeWidth / a.newvalueheight +
                                            "px " +
                                            a.largeHeight / a.newvalueheight +
                                            "px",
                                    }))
                                  : ("lens" == a.options.zoomType &&
                                        a.zoomLens.css({
                                            "background-size":
                                                a.largeWidth / a.newvaluewidth +
                                                "px " +
                                                a.largeHeight /
                                                    a.newvaluewidth +
                                                "px",
                                        }),
                                    a.largeHeight / a.newvaluewidth <
                                    a.options.zoomWindowHeight
                                        ? a.zoomWindow.css({
                                              "background-size":
                                                  a.largeWidth /
                                                      a.newvaluewidth +
                                                  "px " +
                                                  a.largeHeight /
                                                      a.newvaluewidth +
                                                  "px",
                                          })
                                        : a.zoomWindow.css({
                                              "background-size":
                                                  a.largeWidth /
                                                      a.newvalueheight +
                                                  "px " +
                                                  a.largeHeight /
                                                      a.newvalueheight +
                                                  "px",
                                          })),
                              (a.changeBgSize = !1)),
                          a.zoomWindow.css({
                              backgroundPosition:
                                  a.windowLeftPos +
                                  "px " +
                                  a.windowTopPos +
                                  "px",
                          }));
        },
        setTintPosition: function (b) {
            this.nzOffset = this.$elem.offset();
            this.tintpos = String(
                -1 * (b.pageX - this.nzOffset.left - this.zoomLens.width() / 2)
            );
            this.tintposy = String(
                -1 * (b.pageY - this.nzOffset.top - this.zoomLens.height() / 2)
            );
            this.Etoppos && (this.tintposy = 0);
            this.Eloppos && (this.tintpos = 0);
            this.Eboppos &&
                (this.tintposy =
                    -1 *
                    (this.nzHeight -
                        this.zoomLens.height() -
                        2 * this.options.lensBorderSize));
            this.Eroppos &&
                (this.tintpos =
                    -1 *
                    (this.nzWidth -
                        this.zoomLens.width() -
                        2 * this.options.lensBorderSize));
            this.options.tint &&
                (this.fullheight && (this.tintposy = 0),
                this.fullwidth && (this.tintpos = 0),
                this.zoomTintImage.css({ left: this.tintpos + "px" }),
                this.zoomTintImage.css({ top: this.tintposy + "px" }));
        },
        swaptheimage: function (b, a) {
            var c = this,
                e = new Image();
            c.options.loadingIcon &&
                ((c.spinner = d(
                    "<div style=\"background: url('" +
                        c.options.loadingIcon +
                        "') no-repeat center;height:" +
                        c.nzHeight +
                        "px;width:" +
                        c.nzWidth +
                        'px;z-index: 2000;position: absolute; background-position: center center;"></div>'
                )),
                c.$elem.after(c.spinner));
            c.options.onImageSwap(c.$elem);
            e.onload = function () {
                c.largeWidth = e.width;
                c.largeHeight = e.height;
                c.zoomImage = a;
                c.zoomWindow.css({
                    "background-size":
                        c.largeWidth + "px " + c.largeHeight + "px",
                });
                c.zoomWindow.css({
                    "background-size":
                        c.largeWidth + "px " + c.largeHeight + "px",
                });
                c.swapAction(b, a);
            };
            e.src = a;
        },
        swapAction: function (b, a) {
            var c = this,
                e = new Image();
            e.onload = function () {
                c.nzHeight = e.height;
                c.nzWidth = e.width;
                c.options.onImageSwapComplete(c.$elem);
                c.doneCallback();
            };
            e.src = b;
            c.currentZoomLevel = c.options.zoomLevel;
            c.options.maxZoomLevel = !1;
            "lens" == c.options.zoomType &&
                c.zoomLens.css({ backgroundImage: "url('" + a + "')" });
            "window" == c.options.zoomType &&
                c.zoomWindow.css({ backgroundImage: "url('" + a + "')" });
            "inner" == c.options.zoomType &&
                c.zoomWindow.css({ backgroundImage: "url('" + a + "')" });
            c.currentImage = a;
            if (c.options.imageCrossfade) {
                var f = c.$elem,
                    g = f.clone();
                c.$elem.attr("src", b);
                c.$elem.after(g);
                g.stop(!0).fadeOut(c.options.imageCrossfade, function () {
                    d(this).remove();
                });
                c.$elem.width("auto").removeAttr("width");
                c.$elem.height("auto").removeAttr("height");
                f.fadeIn(c.options.imageCrossfade);
                c.options.tint &&
                    "inner" != c.options.zoomType &&
                    ((f = c.zoomTintImage),
                    (g = f.clone()),
                    c.zoomTintImage.attr("src", a),
                    c.zoomTintImage.after(g),
                    g.stop(!0).fadeOut(c.options.imageCrossfade, function () {
                        d(this).remove();
                    }),
                    f.fadeIn(c.options.imageCrossfade),
                    c.zoomTint.css({ height: c.$elem.height() }),
                    c.zoomTint.css({ width: c.$elem.width() }));
                c.zoomContainer.css("height", c.$elem.height());
                c.zoomContainer.css("width", c.$elem.width());
                "inner" != c.options.zoomType ||
                    c.options.constrainType ||
                    (c.zoomWrap.parent().css("height", c.$elem.height()),
                    c.zoomWrap.parent().css("width", c.$elem.width()),
                    c.zoomWindow.css("height", c.$elem.height()),
                    c.zoomWindow.css("width", c.$elem.width()));
            } else
                c.$elem.attr("src", b),
                    c.options.tint &&
                        (c.zoomTintImage.attr("src", a),
                        c.zoomTintImage.attr("height", c.$elem.height()),
                        c.zoomTintImage.css({ height: c.$elem.height() }),
                        c.zoomTint.css({ height: c.$elem.height() })),
                    c.zoomContainer.css("height", c.$elem.height()),
                    c.zoomContainer.css("width", c.$elem.width());
            c.options.imageCrossfade &&
                (c.zoomWrap.css("height", c.$elem.height()),
                c.zoomWrap.css("width", c.$elem.width()));
            c.options.constrainType &&
                ("height" == c.options.constrainType &&
                    (c.zoomContainer.css("height", c.options.constrainSize),
                    c.zoomContainer.css("width", "auto"),
                    c.options.imageCrossfade
                        ? (c.zoomWrap.css("height", c.options.constrainSize),
                          c.zoomWrap.css("width", "auto"),
                          (c.constwidth = c.zoomWrap.width()))
                        : (c.$elem.css("height", c.options.constrainSize),
                          c.$elem.css("width", "auto"),
                          (c.constwidth = c.$elem.width())),
                    "inner" == c.options.zoomType &&
                        (c.zoomWrap
                            .parent()
                            .css("height", c.options.constrainSize),
                        c.zoomWrap.parent().css("width", c.constwidth),
                        c.zoomWindow.css("height", c.options.constrainSize),
                        c.zoomWindow.css("width", c.constwidth)),
                    c.options.tint &&
                        (c.tintContainer.css("height", c.options.constrainSize),
                        c.tintContainer.css("width", c.constwidth),
                        c.zoomTint.css("height", c.options.constrainSize),
                        c.zoomTint.css("width", c.constwidth),
                        c.zoomTintImage.css("height", c.options.constrainSize),
                        c.zoomTintImage.css("width", c.constwidth))),
                "width" == c.options.constrainType &&
                    (c.zoomContainer.css("height", "auto"),
                    c.zoomContainer.css("width", c.options.constrainSize),
                    c.options.imageCrossfade
                        ? (c.zoomWrap.css("height", "auto"),
                          c.zoomWrap.css("width", c.options.constrainSize),
                          (c.constheight = c.zoomWrap.height()))
                        : (c.$elem.css("height", "auto"),
                          c.$elem.css("width", c.options.constrainSize),
                          (c.constheight = c.$elem.height())),
                    "inner" == c.options.zoomType &&
                        (c.zoomWrap.parent().css("height", c.constheight),
                        c.zoomWrap
                            .parent()
                            .css("width", c.options.constrainSize),
                        c.zoomWindow.css("height", c.constheight),
                        c.zoomWindow.css("width", c.options.constrainSize)),
                    c.options.tint &&
                        (c.tintContainer.css("height", c.constheight),
                        c.tintContainer.css("width", c.options.constrainSize),
                        c.zoomTint.css("height", c.constheight),
                        c.zoomTint.css("width", c.options.constrainSize),
                        c.zoomTintImage.css("height", c.constheight),
                        c.zoomTintImage.css(
                            "width",
                            c.options.constrainSize
                        ))));
        },
        doneCallback: function () {
            this.options.loadingIcon && this.spinner.hide();
            this.nzOffset = this.$elem.offset();
            this.nzWidth = this.$elem.width();
            this.nzHeight = this.$elem.height();
            this.currentZoomLevel = this.options.zoomLevel;
            this.widthRatio = this.largeWidth / this.nzWidth;
            this.heightRatio = this.largeHeight / this.nzHeight;
            "window" == this.options.zoomType &&
                ((lensHeight =
                    this.nzHeight <
                    this.options.zoomWindowWidth / this.widthRatio
                        ? this.nzHeight
                        : String(
                              this.options.zoomWindowHeight / this.heightRatio
                          )),
                (lensWidth =
                    this.options.zoomWindowWidth < this.options.zoomWindowWidth
                        ? this.nzWidth
                        : this.options.zoomWindowWidth / this.widthRatio),
                this.zoomLens &&
                    (this.zoomLens.css("width", lensWidth),
                    this.zoomLens.css("height", lensHeight)));
        },
        getCurrentImage: function () {
            return this.zoomImage;
        },
        getGalleryList: function () {
            var b = this;
            b.gallerylist = [];
            b.options.gallery
                ? d("#" + b.options.gallery + " a").each(function () {
                      var a = "";
                      d(this).data("zoom-image")
                          ? (a = d(this).data("zoom-image"))
                          : d(this).data("image") &&
                            (a = d(this).data("image"));
                      a == b.zoomImage
                          ? b.gallerylist.unshift({
                                href: "" + a + "",
                                title: d(this).find("img").attr("title"),
                            })
                          : b.gallerylist.push({
                                href: "" + a + "",
                                title: d(this).find("img").attr("title"),
                            });
                  })
                : b.gallerylist.push({
                      href: "" + b.zoomImage + "",
                      title: d(this).find("img").attr("title"),
                  });
            return b.gallerylist;
        },
        changeZoomLevel: function (b) {
            this.scrollingLock = !0;
            this.newvalue = parseFloat(b).toFixed(2);
            newvalue = parseFloat(b).toFixed(2);
            maxheightnewvalue =
                this.largeHeight /
                ((this.options.zoomWindowHeight / this.nzHeight) *
                    this.nzHeight);
            maxwidthtnewvalue =
                this.largeWidth /
                ((this.options.zoomWindowWidth / this.nzWidth) * this.nzWidth);
            "inner" != this.options.zoomType &&
                (maxheightnewvalue <= newvalue
                    ? ((this.heightRatio =
                          this.largeHeight / maxheightnewvalue / this.nzHeight),
                      (this.newvalueheight = maxheightnewvalue),
                      (this.fullheight = !0))
                    : ((this.heightRatio =
                          this.largeHeight / newvalue / this.nzHeight),
                      (this.newvalueheight = newvalue),
                      (this.fullheight = !1)),
                maxwidthtnewvalue <= newvalue
                    ? ((this.widthRatio =
                          this.largeWidth / maxwidthtnewvalue / this.nzWidth),
                      (this.newvaluewidth = maxwidthtnewvalue),
                      (this.fullwidth = !0))
                    : ((this.widthRatio =
                          this.largeWidth / newvalue / this.nzWidth),
                      (this.newvaluewidth = newvalue),
                      (this.fullwidth = !1)),
                "lens" == this.options.zoomType &&
                    (maxheightnewvalue <= newvalue
                        ? ((this.fullwidth = !0),
                          (this.newvaluewidth = maxheightnewvalue))
                        : ((this.widthRatio =
                              this.largeWidth / newvalue / this.nzWidth),
                          (this.newvaluewidth = newvalue),
                          (this.fullwidth = !1))));
            "inner" == this.options.zoomType &&
                ((maxheightnewvalue = parseFloat(
                    this.largeHeight / this.nzHeight
                ).toFixed(2)),
                (maxwidthtnewvalue = parseFloat(
                    this.largeWidth / this.nzWidth
                ).toFixed(2)),
                newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue),
                newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue),
                maxheightnewvalue <= newvalue
                    ? ((this.heightRatio =
                          this.largeHeight / newvalue / this.nzHeight),
                      (this.newvalueheight =
                          newvalue > maxheightnewvalue
                              ? maxheightnewvalue
                              : newvalue),
                      (this.fullheight = !0))
                    : ((this.heightRatio =
                          this.largeHeight / newvalue / this.nzHeight),
                      (this.newvalueheight =
                          newvalue > maxheightnewvalue
                              ? maxheightnewvalue
                              : newvalue),
                      (this.fullheight = !1)),
                maxwidthtnewvalue <= newvalue
                    ? ((this.widthRatio =
                          this.largeWidth / newvalue / this.nzWidth),
                      (this.newvaluewidth =
                          newvalue > maxwidthtnewvalue
                              ? maxwidthtnewvalue
                              : newvalue),
                      (this.fullwidth = !0))
                    : ((this.widthRatio =
                          this.largeWidth / newvalue / this.nzWidth),
                      (this.newvaluewidth = newvalue),
                      (this.fullwidth = !1)));
            scrcontinue = !1;
            "inner" == this.options.zoomType &&
                (this.nzWidth > this.nzHeight &&
                    (this.newvaluewidth <= maxwidthtnewvalue
                        ? (scrcontinue = !0)
                        : ((scrcontinue = !1),
                          (this.fullwidth = this.fullheight = !0))),
                this.nzHeight > this.nzWidth &&
                    (this.newvaluewidth <= maxwidthtnewvalue
                        ? (scrcontinue = !0)
                        : ((scrcontinue = !1),
                          (this.fullwidth = this.fullheight = !0))));
            "inner" != this.options.zoomType && (scrcontinue = !0);
            scrcontinue &&
                ((this.zoomLock = 0),
                (this.changeZoom = !0),
                this.options.zoomWindowHeight / this.heightRatio <=
                    this.nzHeight &&
                    ((this.currentZoomLevel = this.newvalueheight),
                    "lens" != this.options.zoomType &&
                        "inner" != this.options.zoomType &&
                        ((this.changeBgSize = !0),
                        this.zoomLens.css({
                            height:
                                String(
                                    this.options.zoomWindowHeight /
                                        this.heightRatio
                                ) + "px",
                        })),
                    "lens" == this.options.zoomType ||
                        "inner" == this.options.zoomType) &&
                    (this.changeBgSize = !0),
                this.options.zoomWindowWidth / this.widthRatio <=
                    this.nzWidth &&
                    ("inner" != this.options.zoomType &&
                        this.newvaluewidth > this.newvalueheight &&
                        (this.currentZoomLevel = this.newvaluewidth),
                    "lens" != this.options.zoomType &&
                        "inner" != this.options.zoomType &&
                        ((this.changeBgSize = !0),
                        this.zoomLens.css({
                            width:
                                String(
                                    this.options.zoomWindowWidth /
                                        this.widthRatio
                                ) + "px",
                        })),
                    "lens" == this.options.zoomType ||
                        "inner" == this.options.zoomType) &&
                    (this.changeBgSize = !0),
                "inner" == this.options.zoomType &&
                    ((this.changeBgSize = !0),
                    this.nzWidth > this.nzHeight &&
                        (this.currentZoomLevel = this.newvaluewidth),
                    this.nzHeight > this.nzWidth &&
                        (this.currentZoomLevel = this.newvaluewidth)));
            this.setPosition(this.currentLoc);
        },
        closeAll: function () {
            self.zoomWindow && self.zoomWindow.hide();
            self.zoomLens && self.zoomLens.hide();
            self.zoomTint && self.zoomTint.hide();
        },
        changeState: function (b) {
            "enable" == b && (this.options.zoomEnabled = !0);
            "disable" == b && (this.options.zoomEnabled = !1);
        },
    };
    d.fn.elevateZoom = function (b) {
        return this.each(function () {
            var a = Object.create(k);
            a.init(b, this);
            d.data(this, "elevateZoom", a);
        });
    };
    d.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: 0.1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: d.noop,
        onZoomedImageLoaded: function () {},
        onImageSwap: d.noop,
        onImageSwapComplete: d.noop,
    };
})(jQuery, window, document);
