/* ==== INCLUDE: /js/blocks.js ==== */

LazyLoad = function(a) {
    function h(b, c) {
        var e, d = a.createElement(b);
        for (e in c) c.hasOwnProperty(e) && d.setAttribute(e, c[e]);
        return d
    }

    function i(a) {
        var c, g, b = d[a];
        b && (c = b.callback, g = b.urls, g.shift(), e = 0, g.length || (c && c.call(b.context, b.obj), d[a] = null, f[a].length && k(a)))
    }

    function j() {
        var c = navigator.userAgent;
        b = {
            async: a.createElement("script").async === !0
        }, (b.webkit = /AppleWebKit\//.test(c)) || (b.ie = /MSIE|Trident/.test(c)) || (b.opera = /Opera/.test(c)) || (b.gecko = /Gecko\//.test(c)) || (b.unknown = !0)
    }

    function k(e, g, k, n, o) {
        var s, t, u, v, w, x, p = function() {
                i(e)
            },
            q = "css" === e,
            r = [];
        if (b || j(), g)
            if (g = "string" == typeof g ? [g] : g.concat(), q || b.async || b.gecko || b.opera) f[e].push({
                urls: g,
                callback: k,
                obj: n,
                context: o
            });
            else
                for (s = 0, t = g.length; s < t; ++s) f[e].push({
                    urls: [g[s]],
                    callback: s === t - 1 ? k : null,
                    obj: n,
                    context: o
                });
        if (!d[e] && (v = d[e] = f[e].shift())) {
            for (c || (c = a.head || a.getElementsByTagName("head")[0]), w = v.urls.concat(), s = 0, t = w.length; s < t; ++s) x = w[s], q ? u = b.gecko ? h("style") : h("link", {
                href: x,
                rel: "stylesheet"
            }) : (u = h("script", {
                src: x
            }), u.async = !1), u.className = "lazyload", u.setAttribute("charset", "utf-8"), b.ie && !q && "onreadystatechange" in u && !("draggable" in u) ? u.onreadystatechange = function() {
                /loaded|complete/.test(u.readyState) && (u.onreadystatechange = null, p())
            } : q && (b.gecko || b.webkit) ? b.webkit ? (v.urls[s] = u.href, m()) : (u.innerHTML = '@import "' + x + '";', l(u)) : u.onload = u.onerror = p, r.push(u);
            for (s = 0, t = r.length; s < t; ++s) c.appendChild(r[s])
        }
    }

    function l(a) {
        var b;
        try {
            b = !!a.sheet.cssRules
        } catch (c) {
            return e += 1, void(e < 200 ? setTimeout(function() {
                l(a)
            }, 50) : b && i("css"))
        }
        i("css")
    }

    function m() {
        var b, a = d.css;
        if (a) {
            for (b = g.length; --b >= 0;)
                if (g[b].href === a.urls[0]) {
                    i("css");
                    break
                }
            e += 1, a && (e < 200 ? setTimeout(m, 50) : i("css"))
        }
    }
    var b, c, d = {},
        e = 0,
        f = {
            css: [],
            js: []
        },
        g = a.styleSheets;
    return {
        css: function(a, b, c, d) {
            k("css", a, b, c, d)
        },
        js: function(a, b, c, d) {
            k("js", a, b, c, d)
        }
    }
}(this.document);

window.nanoid = (t = 21) => {
    let e = "",
        r = crypto.getRandomValues(new Uint8Array(t));
    for (; t--;) {
        let n = 63 & r[t];
        e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? "_" : "-"
    }
    return e
};

! function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = n || self).TypeIt = t()
}(this, (function() {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        } : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        })(t)
    }
    var t = {
            strings: [],
            speed: 100,
            cursor: !0,
            cursorChar: "|",
            cursorSpeed: 1e3,
            deleteSpeed: null,
            lifeLike: !0,
            breakLines: !0,
            startDelay: 250,
            startDelete: !1,
            nextStringDelay: 750,
            loop: !1,
            loopDelay: 750,
            html: !0,
            waitUntilVisible: !1,
            beforeString: function() {},
            afterString: function() {},
            beforeStep: function() {},
            afterStep: function() {},
            afterComplete: function() {}
        },
        e = function(n) {
            return n.map((function(n) {
                return void 0 === n[1] && n.push(null), void 0 === n[2] && n.push({}), n
            }))
        },
        r = function(n, t) {
            return Object.assign({}, n, t)
        },
        i = function(n) {
            return Array.isArray(n)
        },
        o = function(n, t) {
            return n[2] = r(n[2], t) || t, n
        },
        u = function(n, t) {
            return i(n[0]) ? n.map((function(n) {
                return o(n, t)
            })) : o(n, t)
        },
        c = function(n, t, e, r) {
            r = r || !1, e = e || {};
            var o = !i(n),
                c = n.length;
            return (n = o ? new Array(n).fill(0) : n).map((function(n, i) {
                if (o) return t;
                var a = [t, n, e];
                return r && (0 === i && (a = u(a, {
                    isFirst: !0
                })), i + 1 === c && (a = u(a, {
                    isLast: !0
                }))), a
            }))
        };

    function a(n) {
        this.insert = function(n, e) {
            t.splice(n, 0, e)
        }, this.add = function(n, u, a) {
            return n = i(n) ? n : [n, null], a = a || !1, u = u || 1, i(n[0]) || (n = c(u, n)), n = e(n).map((function(n) {
                return n[2] = r(n[2], {
                    id: o
                }), o++, n
            })), t = a ? n.concat(t) : t.concat(n), this
        }, this.set = function(n, e) {
            t[n] = e
        }, this.reset = function() {
            t = t.map((function(n) {
                return n[2].executed = !1, n
            }))
        }, this.getItems = function() {
            return (t = e(t)).filter((function(n) {
                return !n[2].executed
            }))
        }, this.setMeta = function(n, e) {
            var i = t.findIndex((function(t) {
                return t[2].id === n
            }));
            t[i][2] = r(t[i][2], e)
        };
        var t = [],
            o = 0;
        this.add(n)
    }
    var f = function(n) {
            return Array.from(n)
        },
        s = function(n) {
            var t = [];
            return t.concat.apply(t, n)
        },
        l = function(n) {
            var t = document.implementation.createHTMLDocument("");
            return t.body.innerHTML = n, t.body
        },
        d = function n(t, e, r) {
            e = e || null, r = void 0 !== r && r;
            var i = f(t.childNodes).map((function(t) {
                return 3 === (e = t).nodeType || "BR" === e.tagName ? t : n(t);
                var e
            }));
            return i = s(i), e && (i = i.filter((function(n) {
                return !e.contains(n)
            }))), r ? i.reverse() : i
        },
        p = function(n) {
            return "BODY" === n.tagName
        },
        h = function(n, t) {
            t = t || null;
            var e = n instanceof HTMLElement;
            return {
                node: t,
                isTopLevelText: (!t || p(t.parentNode)) && !e,
                isHTMLElement: e,
                content: n
            }
        };

    function v(n) {
        var t, e = l(n);
        return t = d(e).map((function(n) {
            return n.nodeValue ? f(n.nodeValue).map((function(t) {
                return h(t, n)
            })) : h(n)
        })), s(t)
    }

    function y(n, t) {
        return (t = void 0 === t || t) ? v(n) : f(n).map((function(n) {
            return h(n)
        }))
    }
    var m = function(n) {
            return document.createElement(n)
        },
        g = function(n, t) {
            var e = m("style");
            e.id = t || "", e.appendChild(document.createTextNode(n)), document.head.appendChild(e)
        },
        b = function(n) {
            return i(n) || (n = [n / 2, n / 2]), {
                before: n[0],
                after: n[1],
                total: n[0] + n[1]
            }
        },
        S = function(n, t) {
            return Math.abs(Math.random() * (n + t - (n - t)) + (n - t))
        };
    var N = function(n) {
            return ["textarea", "input"].indexOf(n.tagName.toLowerCase()) > -1
        },
        T = function(n, t) {
            var e = t.querySelectorAll("*");
            return [t].concat(f(e).reverse()).find((function(t) {
                return t.cloneNode().outerHTML === n.outerHTML
            }))
        },
        L = function(n, t, e, r) {
            e = e || null;
            var i = t.isHTMLElement,
                o = i ? t.content : document.createTextNode(t.content);
            if (N(n)) n.value = "".concat(n.value).concat(t.content);
            else {
                if (!t.isTopLevelText && !i) {
                    var u = t.node.parentNode,
                        c = T(u.cloneNode(), n);
                    if (function(n, t) {
                            if (!n) return !1;
                            var e = n.nextSibling;
                            return !e || e.isEqualNode(t)
                        }(c, e)) n = c;
                    else if ((o = u.cloneNode()).innerText = t.content, !p(u.parentNode)) {
                        for (var a = u.parentNode, f = a.cloneNode(), s = T(f, n); !s && !p(a);) f.innerHTML = o.outerHTML, o = f, f = a.parentNode.cloneNode(), a = a.parentNode, s = T(f, n);
                        n = s || n
                    }
                }
                var l = d(n, e, !0)[r - 1],
                    h = l ? l.parentNode : n;
                h.insertBefore(o, h.contains(e) ? e : null)
            }
        },
        M = function(n) {
            var t;
            return null == n || null === (t = n.parentNode) || void 0 === t ? void 0 : t.removeChild(n)
        };
    var x = function(n, t, e) {
            var r, i = "string" == typeof n,
                o = !1,
                u = -1 * n;
            return i && (u = (r = "END" === n.toUpperCase()) ? -1 : 1, o = r ? t + u > 0 : t + u < e.length), {
                isString: i,
                numberOfSteps: u,
                canKeepMoving: o
            }
        },
        w = function(n) {
            var t, e = ["font", "lineHeight", "color"],
                r = m("SPAN"),
                i = (t = n, window.getComputedStyle(t, null));
            for (var o in i) e.indexOf(o) > -1 && i[o] && (r.style[o] = i[o]);
            return r.style.cssText
        };

    function D(n, t, e) {
        return e ? t ? t(n) : n : (n && n.then || (n = Promise.resolve(n)), t ? n.then(t) : n)
    }

    function H(n) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(n.apply(this, t))
            } catch (n) {
                return Promise.reject(n)
            }
        }
    }

    function E() {}

    function C(n, t) {
        if (!t) return n && n.then ? n.then(E) : Promise.resolve()
    }

    function A(n, t) {
        var e = n();
        return e && e.then ? e.then(t) : t(e)
    }

    function k(n, t, e) {
        if (!n.s) {
            if (e instanceof O) {
                if (!e.s) return void(e.o = k.bind(null, n, t));
                1 & t && (t = e.s), e = e.v
            }
            if (e && e.then) return void e.then(k.bind(null, n, t), k.bind(null, n, 2));
            n.s = t, n.v = e;
            var r = n.o;
            r && r(n)
        }
    }
    var O = function() {
        function n() {}
        return n.prototype.then = function(t, e) {
            var r = new n,
                i = this.s;
            if (i) {
                var o = 1 & i ? t : e;
                if (o) {
                    try {
                        k(r, 1, o(this.v))
                    } catch (n) {
                        k(r, 2, n)
                    }
                    return r
                }
                return this
            }
            return this.o = function(n) {
                try {
                    var i = n.v;
                    1 & n.s ? k(r, 1, t ? t(i) : i) : e ? k(r, 1, e(i)) : k(r, 2, i)
                } catch (n) {
                    k(r, 2, n)
                }
            }, r
        }, n
    }();

    function P(n, t) {
        return n && n.then ? n.then(t) : t(n)
    }
    return function(e, o) {
        var u = this,
            s = this;
        o = o || {};
        var p = function(n, t, e) {
                return n = i(n[0]) ? n : [n], an.add(n, t),
                    function(n) {
                        var t = (n = n || {}).delay;
                        t && an.add([U, t])
                    }(e), s
            },
            T = function(t) {
                return t = "object" === n(t) ? t : {}, [
                    [Q, t, {
                        force: !0
                    }],
                    [Q, en, {
                        force: !0
                    }]
                ]
            },
            z = function() {
                return X ? f(W.value) : d(W, fn, !0)
            },
            B = function(n, t) {
                t = t || 1;
                var e = en.nextStringDelay;
                an.insert(n, [U, e.before]), an.insert(n + t + 1, [U, e.after])
            },
            I = H((function() {
                if (fn) {
                    var n = "[data-typeit-id='".concat(cn, "'] .ti-cursor");
                    g("@keyframes blink-".concat(cn, " { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ").concat(n, " { animation: blink-").concat(cn, " ").concat(en.cursorSpeed / 1e3, "s infinite; } ").concat(n, ".with-delay { animation-delay: 500ms; } ").concat(n, ".disabled { animation: none; }"), cn), W.appendChild(fn);
                    var t = "loaded" === document.fonts.status;
                    return D(t || document.fonts.ready, (function(n) {
                        var t = fn.getBoundingClientRect().width / 2;
                        fn.style.margin = "0 -".concat(t + 2, "px 0 -").concat(t - 2, "px")
                    }), t)
                }
            })),
            R = function(n) {
                fn && (fn.classList.toggle("disabled", n), fn.classList.toggle("with-delay", !n))
            },
            q = H((function(n, t) {
                return $.push(setTimeout(n, t)), D()
            })),
            j = H((function(n) {
                var t = _;
                return D(t && F(_), (function(t) {
                    return an.reset(), an.set(0, [U, n.before]), C(G(!0))
                }), !t)
            })),
            V = H((function() {
                tn.started = !0;
                var n, t = an.getItems();
                return P(function(n, t) {
                    try {
                        var e = n()
                    } catch (n) {
                        return t(n)
                    }
                    return e && e.then ? e.then(void 0, t) : e
                }((function() {
                    return P(function(n, t, e) {
                        var r, i, o = -1;
                        return function u(c) {
                            try {
                                for (; ++o < n.length && (!e || !e());)
                                    if ((c = t(o)) && c.then) {
                                        if (!((a = c) instanceof O && 1 & a.s)) return void c.then(u, i || (i = k.bind(null, r = new O, 2)));
                                        c = c.v
                                    }
                                r ? k(r, 1, c) : r = c
                            } catch (n) {
                                k(r || (r = new O), 2, n)
                            }
                            var a
                        }(), r
                    }(t, (function(e) {
                        if (tn.frozen || tn.destroyed) throw "";
                        var r, i, o, c, a = t[e],
                            f = a[2];
                        return n = [a, u], f.freezeCursor && R(!0), r = en.speed, i = en.deleteSpeed, o = en.lifeLike, c = (i = null !== i ? i : r / 3) / 2, Z = o ? [S(r, r / 2), S(i, c)] : [r, i], A((function() {
                            var t;
                            if (null == f ? void 0 : f.isFirst) return C((t = en).beforeString.apply(t, n))
                        }), (function() {
                            var t;
                            return D((t = en).beforeStep.apply(t, n), (function() {
                                return D(a[0].call(u, a[1], f), (function() {
                                    return A((function() {
                                        var t, e;
                                        if (null === (t = a[2]) || void 0 === t ? void 0 : t.isLast) return C((e = en).afterString.apply(e, n))
                                    }), (function() {
                                        var t;
                                        return D((t = en).afterStep.apply(t, n), (function() {
                                            an.setMeta(f.id, {
                                                executed: !0
                                            }), R(!1)
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }), (function() {
                        return !1
                    })), (function(t) {
                        var e;
                        return tn.completed = !0, D((e = en).afterComplete.apply(e, n), (function() {
                            if (!en.loop) throw "";
                            var n = en.loopDelay;
                            q((function() {
                                return D(j(n), (function() {
                                    V()
                                }))
                            }), n.after)
                        }))
                    }))
                }), E), (function(n) {
                    return u
                }))
            })),
            U = function(n) {
                return new Promise((function(t) {
                    q((function() {
                        return t()
                    }), n || 0)
                }))
            },
            F = function n(t) {
                var e = z(),
                    r = x(t, _, e);
                return _ += r.numberOfSteps, new Promise((function(t) {
                    q(H((function() {
                        return function(n, t, e, r) {
                            if (e) {
                                var i = r,
                                    o = t[(i = i > t.length ? t.length : i) - 1];
                                (n = o ? o.parentNode : n).insertBefore(e, o || null)
                            }
                        }(W, z(), fn, _), A((function() {
                            if (r.isString && r.canKeepMoving) return C(n(r.numberOfSteps > 0 ? "START" : "END"))
                        }), (function() {
                            return t()
                        }))
                    })), Z[0])
                }))
            },
            K = function(n) {
                return new Promise((function(t) {
                    q((function() {
                        return L(W, n, fn, _), t()
                    }), Z[0])
                }))
            },
            Q = H((function(n) {
                en = r(en, n)
            })),
            Y = H((function() {
                X ? W.value = "" : z().forEach((function(n) {
                    M(n)
                }))
            })),
            G = function n(t) {
                return t = !0 === t, new Promise((function(e) {
                    q(H((function() {
                        var r = !1,
                            i = z();
                        return i.length && (X ? W.value = W.value.slice(0, -1) : M(i[_])), f(W.querySelectorAll("*")).forEach((function(n) {
                            if (!n.innerHTML && "BR" !== n.tagName) {
                                for (var t = n; 1 === t.parentNode.childNodes.length && t.parentNode.childNodes[0].isEqualNode(t);) t = t.parentNode;
                                M(t)
                            }
                        })), A((function() {
                            if (t && i.length - 1 > 0) return D(n(!0), (function() {
                                return r = !0, e()
                            }))
                        }), (function(n) {
                            return r ? n : e()
                        }))
                    })), Z[1])
                }))
            };
        this.break = function(n) {
            return p([K, h(m("BR"))], 1, n)
        }, this.delete = function(n, t) {
            var e = T(t);
            return p([e[0]].concat([].concat(Array(Math.abs(n) || 1)).fill().map((function() {
                return [G, !n, nn]
            })), [e[1]]), 1, t)
        }, this.empty = function() {
            return p(Y, 1, arguments)
        }, this.exec = function(n, t) {
            var e = T(t);
            return p([e[0],
                [n, null], e[1]
            ], 1, t)
        }, this.move = function(n, t) {
            var e = x(n, _, z()),
                r = T(t),
                i = e.isString ? n : Math.sign(n);
            return p([r[0]].concat([].concat(Array(Math.abs(n) || 1)).fill().map((function() {
                return [F, i, nn]
            })), [r[1]]), 1, t)
        }, this.options = function(n) {
            return p([Q, n], 1, n)
        }, this.pause = function(n, t) {
            return p([U, n], 1, t)
        }, this.type = function(n, t) {
            var e = T(t),
                r = y(n, en.html),
                i = [e[0]].concat(c(r, K, nn, !0), [e[1]]);
            return p(i, 1, t)
        }, this.is = function(n) {
            return tn[n]
        }, this.destroy = function(n) {
            n = void 0 === n || n, $.forEach((function(n) {
                clearTimeout(n)
            })), $ = [], n && M(fn), tn.destroyed = !0
        }, this.freeze = function() {
            tn.frozen = !0
        }, this.unfreeze = function() {
            tn.frozen = !1, V()
        }, this.reset = function() {
            for (var n in !this.is("destroyed") && this.destroy(), an.reset(), _ = 0, tn) tn[n] = !1;
            return X ? W.value = "" : W.innerHTML = "", this
        }, this.go = function() {
            return tn.started ? this : (I(), en.waitUntilVisible ? (function(n, t) {
                new IntersectionObserver((function(e, r) {
                    e.forEach((function(e) {
                        e.isIntersecting && (t(), r.unobserve(n))
                    }))
                }), {
                    threshold: 1
                }).observe(n)
            }(W, V.bind(this)), this) : (V(), this))
        }, this.getQueue = function() {
            return an
        }, this.getOptions = function() {
            return en
        }, this.getElement = function() {
            return W
        };
        var J, W = "string" == typeof(J = e) ? document.querySelector(J) : J,
            X = N(W),
            Z = [],
            $ = [],
            _ = 0,
            nn = {
                freezeCursor: !0
            },
            tn = {
                started: !1,
                completed: !1,
                frozen: !1,
                destroyed: !1
            },
            en = r(t, o);
        en = r(en, {
            html: !X && en.html,
            nextStringDelay: b(en.nextStringDelay),
            loopDelay: b(en.loopDelay)
        });
        var rn, on, un, cn = Math.random().toString().substring(2, 9),
            an = new a([U, en.startDelay]);
        W.setAttribute("data-typeit-id", cn), g("[data-typeit-id]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}[data-typeit-id]"), en.strings = (un = en.strings, rn = i(un) ? un : [un], (on = function(n) {
            return n.innerHTML.replace(/<\!--.*?-->/g, "").trim()
        }(W)) ? (W.innerHTML = "", en.startDelete ? (v(on).forEach((function(n) {
            L(W, n, fn, _)
        })), an.add([G, !0]), B(1), rn) : [on.trim()].concat(rn)) : rn);
        var fn = function() {
            if (X || !en.cursor) return null;
            var n = m("span");
            return n.innerHTML = l(en.cursorChar).innerHTML, n.className = "ti-cursor", n.style.cssText = "display:inline;".concat(w(W)), n
        }();
        en.strings.length && function() {
            var n = en.strings.filter((function(n) {
                return !!n
            }));
            n.forEach((function(t, e) {
                var r = y(t, en.html);
                an.add(c(r, K, nn, !0));
                var i = an.getItems().length;
                if (e + 1 !== n.length) {
                    if (en.breakLines) {
                        var o = h(m("BR"));
                        return an.add([K, o, nn]), void B(i)
                    }
                    an.add(c(r, G, nn)), B(i, t.length)
                }
            }))
        }()
    }
}));

! function() {
    "use strict";

    function o() {
        var o = window,
            t = document;
        if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) {
            var l, e = o.HTMLElement || o.Element,
                r = 468,
                i = {
                    scroll: o.scroll || o.scrollTo,
                    scrollBy: o.scrollBy,
                    elementScroll: e.prototype.scroll || n,
                    scrollIntoView: e.prototype.scrollIntoView
                },
                s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
                c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
            o.scroll = o.scrollTo = function() {
                void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset))
            }, o.scrollBy = function() {
                void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset)))
            }, e.prototype.scroll = e.prototype.scrollTo = function() {
                if (void 0 !== arguments[0])
                    if (!0 !== f(arguments[0])) {
                        var o = arguments[0].left,
                            t = arguments[0].top;
                        h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t)
                    } else {
                        if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                        i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                    }
            }, e.prototype.scrollBy = function() {
                void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior
                }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
            }, e.prototype.scrollIntoView = function() {
                if (!0 !== f(arguments[0])) {
                    var l = function(o) {
                            for (; o !== t.body && !1 === (e = p(l = o, "Y") && a(l, "Y"), r = p(l, "X") && a(l, "X"), e || r);) o = o.parentNode || o.host;
                            var l, e, r;
                            return o
                        }(this),
                        e = l.getBoundingClientRect(),
                        r = this.getBoundingClientRect();
                    l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({
                        left: e.left,
                        top: e.top,
                        behavior: "smooth"
                    })) : o.scrollBy({
                        left: r.left,
                        top: r.top,
                        behavior: "smooth"
                    })
                } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
            }
        }

        function n(o, t) {
            this.scrollLeft = o, this.scrollTop = t
        }

        function f(o) {
            if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
            if ("object" == typeof o && "smooth" === o.behavior) return !1;
            throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.")
        }

        function p(o, t) {
            return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0
        }

        function a(t, l) {
            var e = o.getComputedStyle(t, null)["overflow" + l];
            return "auto" === e || "scroll" === e
        }

        function d(t) {
            var l, e, i, c, n = (s() - t.startTime) / r;
            c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t))
        }

        function h(l, e, r) {
            var c, f, p, a, h = s();
            l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({
                scrollable: c,
                method: a,
                startTime: h,
                startX: f,
                startY: p,
                x: e,
                y: r
            })
        }
    }
    "object" == typeof exports && "undefined" != typeof module ? module.exports = {
        polyfill: o
    } : o()
}();
/**
 * @popperjs/core v2.4.4 - MIT License
 */

"use strict";
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
}(this, (function(e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function n(e) {
        return "[object Window]" !== e.toString() ? (e = e.ownerDocument) ? e.defaultView : window : e
    }

    function r(e) {
        return {
            scrollLeft: (e = n(e)).pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }

    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function s(e) {
        return (o(e) ? e.ownerDocument : e.document).documentElement
    }

    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }

    function c(e) {
        return n(e).getComputedStyle(e)
    }

    function p(e) {
        return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
    }

    function l(e, o, c) {
        void 0 === c && (c = !1);
        var l = s(o);
        e = t(e);
        var u = i(o),
            d = {
                scrollLeft: 0,
                scrollTop: 0
            },
            m = {
                x: 0,
                y: 0
            };
        return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? {
            scrollLeft: o.scrollLeft,
            scrollTop: o.scrollTop
        } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), {
            x: e.left + d.scrollLeft - m.x,
            y: e.top + d.scrollTop - m.y,
            width: e.width,
            height: e.height
        }
    }

    function u(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }

    function d(e) {
        return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
    }

    function m(e, t) {
        void 0 === t && (t = []);
        var r = function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t))
        }(e);
        e = "body" === a(r);
        var o = n(r);
        return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r)))
    }

    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null;
        if (e = e.offsetParent) {
            var t = s(e);
            if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t
        }
        return e
    }

    function g(e) {
        for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r);
        if (r && "body" === a(r) && "static" === c(r).position) return t;
        if (!r) e: {
            for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
                if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) {
                    r = e;
                    break e
                }
                e = e.parentNode
            }
            r = null
        }
        return r || t
    }

    function b(e) {
        var t = new Map,
            n = new Set,
            r = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
                    n.has(r) || (r = t.get(r)) && e(r)
                })), r.push(o)
            }(e)
        })), r
    }

    function v(e) {
        var t;
        return function() {
            return t || (t = new Promise((function(n) {
                Promise.resolve().then((function() {
                    t = void 0, n(e())
                }))
            }))), t
        }
    }

    function y(e) {
        return e.split("-")[0]
    }

    function O(e, t) {
        var n = !(!t.getRootNode || !t.getRootNode().host);
        if (e.contains(t)) return !0;
        if (n)
            do {
                if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host
            } while (t);
        return !1
    }

    function x(e) {
        return Object.assign(Object.assign({}, e), {}, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function w(e, o) {
        if ("viewport" === o) {
            o = n(e);
            var a = s(e);
            o = o.visualViewport;
            var p = a.clientWidth;
            a = a.clientHeight;
            var l = 0,
                u = 0;
            o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = x(e = {
                width: p,
                height: a,
                x: l + f(e),
                y: u
            })
        } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = x({
            width: p,
            height: a,
            x: u,
            y: l
        }));
        return e
    }

    function j(e, t, n) {
        return t = "clippingParents" === t ? function(e) {
            var t = m(d(e)),
                n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e;
            return o(n) ? t.filter((function(e) {
                return o(e) && O(e, n) && "body" !== a(e)
            })) : []
        }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function(t, n) {
            return n = w(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t
        }), w(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n
    }

    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }

    function E(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case "top":
                o = {
                    x: o,
                    y: t.y - n.height
                };
                break;
            case "bottom":
                o = {
                    x: o,
                    y: t.y + t.height
                };
                break;
            case "right":
                o = {
                    x: t.x + t.width,
                    y: i
                };
                break;
            case "left":
                o = {
                    x: t.x - n.width,
                    y: i
                };
                break;
            default:
                o = {
                    x: t.x,
                    y: t.y
                }
        }
        if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case "start":
                o[r] = Math.floor(o[r]) - Math.floor(t[i] / 2 - n[i] / 2);
                break;
            case "end":
                o[r] = Math.floor(o[r]) + Math.ceil(t[i] / 2 - n[i] / 2)
        }
        return o
    }

    function D(e) {
        return Object.assign(Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }), e)
    }

    function P(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t
        }), {})
    }

    function k(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var c = r.altBoundary,
            p = void 0 !== c && c;
        r = D("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, q));
        var l = e.elements.reference;
        c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({
            reference: f = t(l),
            element: c,
            strategy: "absolute",
            placement: n
        }), c = x(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f;
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var d = e[n];
            Object.keys(u).forEach((function(e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t
            }))
        }
        return u
    }

    function L() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function B(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e;
        return function(e, t, i) {
            function a() {
                f.forEach((function(e) {
                    return e()
                })), f = []
            }
            void 0 === i && (i = r);
            var s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign(Object.assign({}, V), r),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                f = [],
                c = !1,
                p = {
                    state: s,
                    setOptions: function(i) {
                        return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = {
                            reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
                            popper: m(t)
                        }, i = function(e) {
                            var t = b(e);
                            return N.reduce((function(e, n) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === n
                                })))
                            }), [])
                        }(function(e) {
                            var t = e.reduce((function(e, t) {
                                var n = e[t.name];
                                return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                                    options: Object.assign(Object.assign({}, n.options), t.options),
                                    data: Object.assign(Object.assign({}, n.data), t.data)
                                }) : t, e
                            }), {});
                            return Object.keys(t).map((function(e) {
                                return t[e]
                            }))
                        }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) {
                            return e.enabled
                        })), s.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                n = e.options;
                            n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({
                                state: s,
                                name: t,
                                instance: p,
                                options: n
                            }), f.push(t || function() {}))
                        })), p.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference;
                            if (L(t, e = e.popper))
                                for (s.rects = {
                                        reference: l(t, g(e), "fixed" === s.options.strategy),
                                        popper: u(e)
                                    }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                        return s.modifiersData[e.name] = Object.assign({}, e.data)
                                    })), t = 0; t < s.orderedModifiers.length; t++)
                                    if (!0 === s.reset) s.reset = !1, t = -1;
                                    else {
                                        var n = s.orderedModifiers[t];
                                        e = n.fn;
                                        var r = n.options;
                                        r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                                            state: s,
                                            options: r,
                                            name: n,
                                            instance: p
                                        }) || s)
                                    }
                        }
                    },
                    update: v((function() {
                        return new Promise((function(e) {
                            p.forceUpdate(), e(s)
                        }))
                    })),
                    destroy: function() {
                        a(), c = !0
                    }
                };
            return L(e, t) ? (p.setOptions(i).then((function(e) {
                !c && i.onFirstUpdate && i.onFirstUpdate(e)
            })), p) : p
        }
    }

    function W(e) {
        var t, r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive,
            l = window.devicePixelRatio || 1;
        e = Math.round(a.x * l) / l || 0, l = Math.round(a.y * l) / l || 0;
        var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var d, m = "left",
            h = "top",
            b = window;
        if (p) {
            var v = g(r);
            v === n(r) && (v = s(r)), "top" === i && (h = "bottom", l -= v.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= v.clientWidth - o.width, e *= c ? 1 : -1)
        }
        return r = Object.assign({
            position: f
        }, p && _), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (b.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t))
    }

    function A(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return U[e]
        }))
    }

    function H(e) {
        return e.replace(/start|end/g, (function(e) {
            return z[e]
        }))
    }

    function T(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function R(e) {
        return ["top", "right", "bottom", "left"].some((function(t) {
            return 0 <= e[t]
        }))
    }
    var q = ["top", "bottom", "right", "left"],
        C = q.reduce((function(e, t) {
            return e.concat([t + "-start", t + "-end"])
        }), []),
        S = [].concat(q, ["auto"]).reduce((function(e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }), []),
        N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        V = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        },
        I = {
            passive: !0
        },
        _ = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        },
        U = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        z = {
            start: "end",
            end: "start"
        },
        F = [{
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function(e) {
                        e.addEventListener("scroll", r.update, I)
                    })), a && s.addEventListener("resize", r.update, I),
                    function() {
                        i && f.forEach((function(e) {
                            e.removeEventListener("scroll", r.update, I)
                        })), a && s.removeEventListener("resize", r.update, I)
                    }
            },
            data: {}
        }, {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state;
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        }, {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e, n = void 0 === (n = n.adaptive) || n, e = {
                    placement: y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: e
                }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: n
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1
                })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        }, {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {};
                            e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                return e[t] = "", e
                            }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) {
                                r.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        }, {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = S.reduce((function(e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, {
                                placement: n
                            })) : r;
                        return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
                            x: s,
                            y: o
                        } : {
                            x: o,
                            y: s
                        }, e[n] = i, e
                    }), {}))[t.placement],
                    i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
            }
        }, {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                if (e = e.name, !t.modifiersData[e]._skip) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements;
                    p = y(n = t.options.placement), i = i || (p !== n && l ? function(e) {
                        if ("auto" === y(e)) return [];
                        var t = A(e);
                        return [H(e), t, H(t)]
                    }(n) : [A(n)]);
                    var d = [n].concat(i).reduce((function(e, n) {
                        return e.concat("auto" === y(n) ? function(e, t) {
                            void 0 === t && (t = {});
                            var n = t.boundary,
                                r = t.rootBoundary,
                                o = t.padding,
                                i = t.flipVariations,
                                a = t.allowedAutoPlacements,
                                s = void 0 === a ? S : a,
                                f = t.placement.split("-")[1];
                            0 === (i = (t = f ? i ? C : C.filter((function(e) {
                                return e.split("-")[1] === f
                            })) : q).filter((function(e) {
                                return 0 <= s.indexOf(e)
                            }))).length && (i = t);
                            var c = i.reduce((function(t, i) {
                                return t[i] = k(e, {
                                    placement: i,
                                    boundary: n,
                                    rootBoundary: r,
                                    padding: o
                                })[y(i)], t
                            }), {});
                            return Object.keys(c).sort((function(e, t) {
                                return c[e] - c[t]
                            }))
                        }(t, {
                            placement: n,
                            boundary: s,
                            rootBoundary: f,
                            padding: a,
                            flipVariations: l,
                            allowedAutoPlacements: u
                        }) : n)
                    }), []);
                    n = t.rects.reference, i = t.rects.popper;
                    var m = new Map;
                    p = !0;
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var b = d[g],
                            v = y(b),
                            O = "start" === b.split("-")[1],
                            x = 0 <= ["top", "bottom"].indexOf(v),
                            w = x ? "width" : "height",
                            j = k(t, {
                                placement: b,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: c,
                                padding: a
                            });
                        if (O = x ? O ? "right" : "left" : O ? "bottom" : "top", n[w] > i[w] && (O = A(O)), w = A(O), x = [], r && x.push(0 >= j[v]), o && x.push(0 >= j[O], 0 >= j[w]), x.every((function(e) {
                                return e
                            }))) {
                            h = b, p = !1;
                            break
                        }
                        m.set(b, x)
                    }
                    if (p)
                        for (r = function(e) {
                                var t = d.find((function(t) {
                                    if (t = m.get(t)) return t.slice(0, e).every((function(e) {
                                        return e
                                    }))
                                }));
                                if (t) return h = t, "break"
                            }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--);
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        }, {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                n = k(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary
                }), a = y(t.placement);
                var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a);
                a = "x" === p ? "y" : "x";
                var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, {
                        placement: t.placement
                    })) : s;
                if (s = {
                        x: 0,
                        y: 0
                    }, l) {
                    if (o) {
                        var b = "y" === p ? "top" : "left",
                            v = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p];
                        var x = l[p] + n[b],
                            w = l[p] - n[v],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O];
                        f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : {
                            width: 0,
                            height: 0
                        };
                        var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        b = D[b], v = D[v], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - b - h : E - m - b - h, c = c ? -d[O] / 2 + j + m + v + h : f + m + v + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(x, h) : x, Math.min(o, i ? Math.max(w, c) : w)), l[p] = i, s[p] = i - o
                    }
                    r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s
                }
            },
            requiresIfExists: ["offset"]
        }, {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, n = e.state;
                e = e.name;
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i);
                if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.element;
                if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {
                        padding: D("number" != typeof n ? n : P(n, q))
                    })
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        }, {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = k(t, {
                        elementContext: "reference"
                    }),
                    a = k(t, {
                        altBoundary: !0
                    });
                n = T(i, n), r = T(a, r, o), o = R(n), a = R(r), t.modifiersData[e] = {
                    referenceClippingOffsets: n,
                    popperEscapeOffsets: r,
                    isReferenceHidden: o,
                    hasPopperEscaped: a
                }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-reference-hidden": o,
                    "data-popper-escaped": a
                })
            }
        }],
        X = B({
            defaultModifiers: F
        });
    e.createPopper = X, e.defaultModifiers = F, e.detectOverflow = k, e.popperGenerator = B, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));;

window.mrp_open_new_window = function(url, width, height, name) {

    function optimalWindowHeight(desired) {
        if (desired && desired < screen.availHeight) {
            return desired;
        }

        var h = 500;
        if (screen.availHeight > 600) {
            h = 700;
        }
        if (screen.availHeight > 800) {
            h = 800;
        }
        return h;
    }

    if (!height) {
        height = optimalWindowHeight();
    }

    var left = parseInt((screen.availWidth / 2) - (width / 2));
    var top = parseInt((screen.availHeight / 2) - (height / 2));

    if (!name) {
        name = "" + parseInt((Math.random() * 100000));
    }
    var w = window.open(url, name, "width=" + width + ",height=" + height +
        ",scrollbars=1,location=1,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top);

    if (w == null) {
        alert("Please enable popups in your browser");
    } else {
        w.focus();
    }

    return w;
};

// DOMParser patch for IOS Safari
(function(DOMParser) {
    "use strict";

    var proto = DOMParser.prototype,
        nativeParse = proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser()).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}

    proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var doc = document.implementation.createHTMLDocument("");
            if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                doc.documentElement.innerHTML = markup;
            } else {
                doc.body.innerHTML = markup;
            }
            return doc;
        } else {
            return nativeParse.apply(this, arguments);
        }
    };
}(DOMParser));

function get_if_exist(obj) {
    if (!obj) {
        return undefined;
    }
    return arguments.length == 1 || (obj[arguments[1]] && get_if_exist.apply(this, [obj[arguments[1]]].concat([].slice.call(arguments, 2))));
}

const _G = {
    reinitHandlers: [],
    isMobile: () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
}

;
(function() {
    _G.visibilityService = (function() {

        const options = {
            threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8]
        }

        const observer = new IntersectionObserver(entries => {
            (entries || []).forEach(entry => {
                if (typeof entry.target.__visibility === 'function') {

                    const isLikelyMobile = window.innerWidth < window.innerHeight
                    const defaultVisibilityRatio = isLikelyMobile ? 0.01 : 0.2;

                    const ratio = getComputedStyle(entry.target)
                        .getPropertyValue('--visibility-ratio') || defaultVisibilityRatio;

                    if (entry.intersectionRatio >= ratio /* && !document.querySelector('html').classList.contains('editing') */ ) {
                        entry.target.__visibility(entry)
                    }
                }
            })
        }, options)

        const observe = (el, callback) => {
            el.__visibility = callback
            observer.observe(el)
        }

        const unobserve = (el) => {
            observer.unobserve(el)
        }

        return {
            observe,
            unobserve,
        }
    })()
})()


function _initBlocks() {
    for (let m of (window.block_code_modules || [])) {
        try {
            m && m.init && m.init(m.id, m)
        } catch (err) {
            console.log('Error initing module', m.id, err)
        }
    }
}

function _destroyBlocks() {
    for (let m of (window.block_code_modules || [])) {
        try {
            m && m.destroy && m.destroy()
        } catch (err) {
            console.log('Error destroying module', m.id, err)
        }
    }
}

_G.parallaxService = (function() {

    const BASE_SPEED = 0.7

    let stopped = false
    const elements = []
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target._parallaxVisible = entry.isIntersecting
            recalc(entry.target)
        })
    }, {
        // blank options
    })

    window.addEventListener('scroll', (ev) => {
        requestAnimationFrame(() => {
            recalcAll()
        })

    }, {
        passive: true
    })

    const calcShift = (elem) => {
        /*
         * calculates a number -1..0..1 where 0 is dead center of the element in viewport
         * -1 is when the element touches with its top the top edge of the viewport
         * 1 is when the element touches with its bottom the bottom edge of the viewport
         *
         * */
        const rect = elem.parentElement.getBoundingClientRect()
        const bgRect = elem.getBoundingClientRect()
        const elemFreeHeight = window.innerHeight - rect.height
        const bgFreeHeight = window.innerHeight - bgRect.height
        const shapeCenterY = rect.top + (rect.height / 2)
        const viewportCenterY = window.innerHeight / 2
        const delta = viewportCenterY - shapeCenterY

        // adjusting speed is necessary for containers that are shorter than
        // viewport height and have bg element with some spare space top and
        // bottom to allow for differential scroll speeds. If these conditions
        // are not met, we fall back to the base speed. Otherwise, we calculate the
        // ideal speed based on the amount of spare image space and size of
        // container. The idea is that the top of bg image reach the top
        // of the viewport at exactly the same time as the container to avoid exposing
        // any areas uncovered by the image.
        const shouldAdjustSpeed = bgRect.height < window.innerHeight &&
            rect.height < window.innerHeight &&
            bgRect.height >= rect.height

        const baseSpeed = shouldAdjustSpeed ?
            bgFreeHeight / elemFreeHeight :
            BASE_SPEED

        const translateValue = (1 - baseSpeed) * delta

        // console.log( delta, acceleration, adjustedRatio,  translateValue )

        return translateValue.toFixed(4)
    }

    const recalcAll = () => {
        if (stopped) {
            return
        }
        elements.forEach(elem => {
            recalc(elem)
        })
    }

    const recalc = (elem) => {
        if (stopped) {
            return
        }
        if (elem._parallaxVisible) {
            elem.style.transform = 'translate(0,' + calcShift(elem) + 'px)' +
                (elem.classList.contains('blur') ? ' scale(1.1)' : '')
        }
    }

    const add = (elem) => {
        if (!elem) {
            return
        }
        elem._parallaxVisible = false
        elements.push(elem)
        observer.observe(elem)
        recalc(elem)
    }

    const remove = (elem) => {
        const index = elements.indexOf(elem)
        if (index !== -1) {
            elements.splice(index, 1)
        }
        observer.unobserve(elem)
    }

    const setStopped = (flag) => {
        stopped = flag
    }

    const refresh = () => {
        recalcAll()
    }

    const cleanup = () => {
        // cleanup potentially stale elements, i.e. detached from DOM
        // may happen after a block was re-inserted in the editor
        elements.slice().filter(elem => {
            if (!document.body.contains(elem)) {
                remove(elem)
            }
        })
    }

    return {
        setStopped,
        refresh,
        add,
        remove,
        cleanup,
    }
})()

_G.fxService = (function() {

    let queue = []
    let revealLaunched = null

    function cleanupFastScrolled() {
        // const snapshot = queue.map( el => {
        //     let rect = el.getBoundingClientRect()
        //     let top = rect.top
        //     let bottom = rect.bottom
        //     return {
        //         el,
        //         top,
        //         bottom,
        //         scrolledOutOfView: bottom < 0,
        //     }
        // })
        // console.log( 'REVEAL', snapshot )
        while (queue.length > 0) {
            let el = queue.at(0)
            if (!el) {
                break;
            }
            let rect = el.getBoundingClientRect()
            if (rect.bottom < 0) {
                queue.shift().classList.remove('fx')
            } else {
                break;
            }
        }
    }

    function revealStaggered() {
        if (revealLaunched !== null) {
            return
        }
        if (queue.length === 0) {
            return
        }
        revealLaunched = setInterval(() => {
            if (queue.length === 0) {
                clearInterval(revealLaunched)
                revealLaunched = null
                return
            }
            cleanupFastScrolled()
            queue.shift().classList.remove('fx')
        }, 100)
    }

    function initElem(el) {
        if (!el || el.__fx_inited) {
            return
        }

        if (el.closest('.managed-fx')) {
            return
        }

        el.__fx_inited = true
        _G.visibilityService.observe(el, result => {

            if (!el.classList.contains('fx')) {
                return // probably already revealed
            }
            queue.push(el)
            revealStaggered()
            _G.visibilityService.unobserve(el)
        })
    }

    function init() {
        document.querySelectorAll('.fx').forEach(initElem)
    }

    return {
        init,
        initElem
    }
})()


document.addEventListener('DOMContentLoaded', () => {

    if (window.customOnLoads) {
        window.customOnLoads.forEach(f => {
            try {
                if (typeof f === 'function') {
                    f()
                }
            } catch (ex) {
                console.error('ERROR: failed to run customOnLoad: ', ex);
            }
        })
    }

    function initVideo(v) {
        if (v.__videoInited) {
            return
        }
        v.__videoInited = true
        v.addEventListener('pause', () => {
            v.__paused = true
        })
        _G.visibilityService.observe(v, result => {
            if (result.isIntersecting) {
                if (v.__paused) {
                    return
                }
                v.muted = true
                v.play()
                if (v.getAttribute("data-speed")) {
                    v.playbackRate = parseFloat(v.getAttribute("data-speed"))
                }
                // if( document.querySelector('html').classList.contains('editing') ) {
                //v.pause()
                // }
            }
        })
    }

    _G.fxService.init()
    _G.reinitHandlers.push(id => {
        document.getElementById(id).querySelectorAll('.fx').forEach(el => {
            _G.fxService.initElem(el)
        })
        document.querySelectorAll('video[data-autoplay="true"]').forEach(initVideo)
    })


    document.querySelectorAll('.with-scroll-parallax').forEach(elem => {
        _G.parallaxService.add(elem)
    })
    document.querySelectorAll('.with-smart-bg.with-bg-video video').forEach((v => {
        v.muted = true
        v.play()
    }))

    document.querySelectorAll('video.video[data-autoplay="true"]').forEach(initVideo)

    document.addEventListener('editor.on', () => {})

    _G.quickMessage = (msg, options = {}) => {
        const m = document.createElement('div')
        m.classList.add('quick-message')
        if (options.error) {
            m.classList.add('error')
        }
        m.style.opacity = '0'
        m.innerText = msg
        document.body.appendChild(m)
        setTimeout(() => {
            m.style.opacity = '1'
        }, 10)
        setTimeout(() => {
            m.style.opacity = '0'
            m.addEventListener('transitionend', () => {
                m.remove()
            }, {
                once: true
            })
        }, 3000)
        m.addEventListener('click', ev => {
            m.style.opacity = '0'
            m.addEventListener('transitionend', () => {
                m.remove()
            }, {
                once: true
            })
        }, {
            once: true
        })
    }

    _G.applyRipple = function(event, button) {

        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`
        const rect = button.getBoundingClientRect()
        circle.style.left = `${event.clientX - (rect.left + radius)}px`
        circle.style.top = `${event.clientY - (rect.top + radius)}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]
        if (ripple) {
            ripple.remove()
        }

        button.appendChild(circle)

        circle.addEventListener('animationend', () => {
            circle.remove()
        }, {
            once: true
        })
    }

    _G.createFragment = htmlStr => {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    function scrollToBlock(id) {
        console.log('will scroll to ', id)
        const elem = document.querySelector(id)
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
            history.pushState({}, '', id)
            // window.location.hash = id
        }
    }

    document.addEventListener('click', event => {
        if (event.target && (event.target.matches('.block-layout .button') || event.target.matches('.block-layout .button *'))) {
            const button = event.target.closest('.button')
            if (button) {
                _G.applyRipple(event, button)
                if (button.tagName === 'BUTTON') {
                    const form = button.closest('form')
                    if (form && form.getAttribute('action') &&
                        form.getAttribute('action').indexOf('#bid_') === 0) {
                        event.stopPropagation()
                        event.preventDefault()
                        scrollToBlock(form.getAttribute('action'))
                    }
                }
            }
        }
        if (event.target && (event.target.matches('.block-layout a') || event.target.matches('.block-layout a *'))) {
            const link = event.target.closest('a')
            if (link && link.getAttribute('href') && link.getAttribute('href').indexOf('#bid_') === 0) {
                event.stopPropagation()
                event.preventDefault()
                scrollToBlock(link.getAttribute('href'))
            }
        }
    })
})

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function openTranslate(toLang) {
    toLang = toLang || "en";
    window.open("https://" + window.location.hostname.replaceAll("-", "--")
        .replaceAll(".", "-") + ".translate.goog" + window.location.pathname +
        "?_x_tr_sl=auto&_x_tr_tl=" + toLang + "&_x_tr_hl=en&_x_tr_pto=wapp' target='_blank'>Translate Page")
}

function mrp_basic_auth_logout(safelocation) {
    const c = '';
    var a, b = "You should be logged out now.";
    try {
        a = document.execCommand("ClearAuthenticationCache", 'false')
    } catch (d) {}
    a || ((a = window.XMLHttpRequest ? new window.XMLHttpRequest : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : void 0) ?
        (a.open("HEAD", c || location.href, !0, "logout", (new Date).getTime().toString()), a.send(""), a = 1) : a = void 0);
    a || (b = "Your browser is too old or too weird to support log out functionality. Close all windows and restart the browser.");
    // alert(b)
    document.body.innerHTML = '';
    setTimeout(() => {
        const url = window.location.href;
        const fake = btoa('logout:logout')
        // history.replaceState({}, '', url + '?t' + Date.now() );
        window.location = safelocation || 'https://private-office.myrealpage.com'
        // fetch( url, {
        //     headers: {
        //         'Authorization': 'Basic fake'
        //     }
        // })
        // .finally( () => {
        //
        // });
    }, 1000)
}

/* ==== INCLUDE: /js/responsive-containers-mod.js ==== */

/*
MIT Licensed.
Copyright (c) 2011 Andy Hume (http://andyhume.net, andyhume@gmail.com).
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(win) {

    if (window.responsiveContainersLoaded) {
        return;
    }

    window.responsiveContainersLoaded = true;

    var doc = win.document,
        els = [],
        check_data_attributes = true,
        loaded = false;


    if (window.mrp_v2_ready) {
        window.mrp_v2_ready(function() {
            _gmrp.$(document).on("mrp.responsify.containers mrp.popup.close",
                function(e) {
                    //console.log( "mrp.ajax-idx.show" );
                    for (var i = 0; i < els.length; ++i) {
                        delete els[i].cq_rules;
                    }
                    els = [];
                    //var b = new Date().getTime();
                    findContainerQueries();
                    applyRules();
                    //console.log( ( new Date().getTime() - b  ) + "ms" );
                }
            );
        });
    }

    function add(elements, query, value, class_name) {
        var split_value = /([0-9]*)(px|em)/.exec(value);
        for (var i = 0, j = elements.length; i < j; ++i) {
            var el = elements[i];
            el.cq_rules = el.cq_rules || [];
            el.cq_rules.push([null, query, split_value[1], split_value[2], class_name]);
            els.push(el);
        }
        if (loaded) { // if we're not 'loaded' yet, domLoaded will run applyRules() for us.
            applyRules();
        }
    }

    function ignoreDataAttributes() {
        check_data_attributes = false;
    }

    function findContainerQueries() {
        if (check_data_attributes) {
            // Find data-squery attributes.
            var nodes = [];
            if (doc.querySelectorAll) {
                var nodes = doc.querySelectorAll("[data-squery]");
            } else {
                // If no query selectors.
                var e = doc.getElementsByTagName("*");
                for (var i = 0, j = e.length; i < j; ++i) {
                    if (e[i].getAttribute("data-squery")) {
                        nodes.push(e[i]);
                    }
                }
            }
            // Parse the data-squery attribute and store resulting rules on the element.
            for (var i = 0, j = nodes.length; i < j; ++i) {
                var el = nodes[i];
                if (el.cq_rules && el.cq_rules.length > 0) {
                    continue;
                }
                var cq_rules = [];
                var raw_rules = el.getAttribute("data-squery").split(" ");
                for (var k = 0, l = raw_rules.length; k < l; ++k) {
                    var rule = /(.*):([0-9]*)(px|em)=(.*)/.exec(raw_rules[k]);
                    if (rule) {
                        cq_rules.push(rule);
                    }
                }
                el.cq_rules = el.cq_rules || [];
                el.cq_rules = el.cq_rules.concat(cq_rules);
                els.push(el);
            }
        }
    }

    function applyRules() {
        // For each element, apply the rules to the class name.
        console.log("els:", els.length);
        for (var i = 0, j = els.length; i < j; ++i) {
            el = els[i];
            console.log("els.cq_rules:", el.cq_rules.length);
            for (var k = 0, l = el.cq_rules.length; k < l; ++k) {
                var rule = el.cq_rules[k];

                // Get a target width value in pixels.
                var width = parseInt(rule[2]);
                if (rule[3] === "em") {
                    width = emsToPixels(parseFloat(rule[2]), el);
                }

                // Calculate the width of the target without the class added.
                var defaultWidth = getDefaultWidth(el, rule[4]);
                // Test current width against target width and add/remove class values.
                if (compareFunction[rule[1]](defaultWidth, width)) {
                    window._gmrp && _gmrp.$ && _gmrp.$(document).trigger("mrp.resp.container.change", "+" + rule[4]);
                    if (el.className.indexOf(rule[4]) < 0) {
                        el.className += " " + rule[4];
                    }
                } else {
                    window._gmrp && _gmrp.$ && _gmrp.$(document).trigger("mrp.resp.container.change", "-" + rule[4]);
                    var class_name = el.className.replace(new RegExp('(^| )' + rule[4] + '( |$)'), '$1');
                    class_name = class_name.replace(/ $/, '');
                    el.className = class_name;
                }
            }
        }
    }

    var compareFunction = {
        "min-width": function(a, b) {
            return a > b;
        },
        "max-width": function(a, b) {
            return a < b;
        }
    }

    function contentReady() {
        if (loaded) {
            return;
        }
        loaded = true;
        findContainerQueries();
        applyRules();
        if (win.addEventListener) {
            win.addEventListener("resize", applyRules, false);

        }
        // Allow for resizing text after the page has loaded.
        var current_em = emsToPixels(1, doc.body);
        win.setInterval(function() {
            var new_em = emsToPixels(1, doc.body);
            if (new_em !== current_em) {
                applyRules();
                current_em = new_em;
            }
        }, 2000);
    }

    function memoize(f) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            f.memoize = f.memoize || {};
            return (args in f.memoize) ? f.memoize[args] : f.memoize[args] = f.apply(this, args);
        };
    }

    var emsToPixels = memoize(function(em, scope) {
        var test = doc.createElement("div");
        test.style.fontSize = "1em";
        test.style.margin = "0";
        test.style.padding = "0";
        test.style.border = "none";
        test.style.width = "1em";
        scope.appendChild(test);
        var val = test.offsetWidth;
        scope.removeChild(test);
        return Math.round(val * em);
    });

    var getDefaultWidth = function(el, class_name) {
        if (true) {
            // we don't need to be fancy, simple width is ok, all the resp containers are flexible
            return el.offsetWidth;
        }
        //console.log( "hit width", el );
        var test = el.cloneNode(true);
        test.className = (" " + test.className + " ").replace(" " + class_name + " ", " ");
        test.style.height = 0;
        test.style.visibility = "hidden";
        test.style.overflow = "hidden";
        test.style.clear = "both";
        var parent = el.parentNode;
        parent.insertBefore(test, el);
        var val = test.offsetWidth;
        parent.removeChild(test);
        return val;
    }

    if (window.addEventListener) {
        console.log("installing mrpRescanResponsifyContainers listener");
        window.addEventListener("mrpRescanResponsifyContainers", function() {
            console.log("mrpRescanResponsifyContainers");
            findContainerQueries();
            applyRules();
        }, false);
    } else if (window.attachEvent) {
        window.attachEvent("mrpRescanResponsifyContainers", function() {
            findContainerQueries();
            applyRules();
        });
    }

    if (/loaded|complete|interactive/.test(doc.readyState)) {
        contentReady();
    } else if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", contentReady, false);
        // or
        win.addEventListener("load", contentReady, false);
    }
    // If old IE
    else if (doc.attachEvent) {
        doc.attachEvent("onreadystatechange", contentReady);
        // or
        win.attachEvent("onload", contentReady);
    }


    win["SelectorQueries"] = {
        "add": add,
        "ignoreDataAttributes": ignoreDataAttributes
    }

})(this);



/* ==== INCLUDE: /js/blocks/sticky-menu.js ==== */


document.addEventListener('DOMContentLoaded', function() {

    function initBlock(id) {
        const block = document.getElementById(id)
        if (block.querySelector('.sticky-menu')) {
            init(block.querySelector('.sticky-menu'))
        }
    }

    function isMenuVisible(el) {
        var rect = el.getBoundingClientRect();

        if (rect.top < 0) {
            return false;
        } else {
            return true;
        }
    }

    function floatMenu(el) {
        if (el.querySelector('.sticky').classList.contains('floated')) {
            return
        }
        if (document.querySelector('html').classList.contains('editing')) {
            return unfloatMenu(el)
        }
        el.querySelector('.sticky').style.opacity = '1'
        el.querySelector('.sticky').classList.add('floating', 'floated', 'elevation3')
        el.classList.add('sticky-on')
    }

    function unfloatMenu(el) {
        if (!el.querySelector('.sticky').classList.contains('floated')) {
            return
        }
        el.querySelector('.sticky').classList.remove('floating', 'floated', 'elevation3')
        el.classList.remove('sticky-on')
    }

    function init(el) {
        if (!el || !el.querySelector('.sticky')) {
            return
        }

        window.addEventListener('scroll', function() {
            isMenuVisible(el) ? unfloatMenu(el) : floatMenu(el)
        }, {
            passive: true
        })


        if (!isMenuVisible(el)) {
            floatMenu(el)
        }

        document.addEventListener('editor.on', function() {
            unfloatMenu(el)
        })
        document.addEventListener('editor.off', function() {
            if (!isMenuVisible(el)) {
                floatMenu(el)
            }
        })
    }

    document.querySelectorAll('.sticky-menu').forEach(function(el) {
        init(el)
    })

    _G.reinitHandlers.push(initBlock)
})


/* ==== INCLUDE: /js/blocks/hmenu.js ==== */

document.addEventListener('DOMContentLoaded', ev => {

        document.body.addEventListener('click', ev => {

            if (document.querySelector('html').classList.contains('editing')) {
                return
            }
            if (!ev.target.matches('.hmenu li.has-submenu, .hmenu li.has-submenu > *')) {
                return
            }
            const el = ev.target.closest('li')
            ev.preventDefault()
            ev.stopPropagation()

            document.querySelectorAll('.hmenu li.open').forEach(open => {
                if (open.contains(el)) {
                    return
                }
                open.classList.remove('open')
                open.classList.remove('visible')
            })
            if (el.classList.contains('open')) {
                // toggle
                el.classList.remove('open');
                el.classList.remove('visible');
                return;
            }
            // open -> does display: block which acquires dimension for popper
            el.classList.add('open')
            setTimeout(() => {
                // then we fade it in
                el.classList.add('visible')
            }, 100)

            if (el.__popper) {
                el.__popper.update()
                return
            }

            console.log('placement', el.closest('ul').classList.contains('mrp-menu-level-0') ? 'bottom-start' : 'right-start')

            el.__popper = Popper.createPopper(el, el.querySelector('ul'), {
                placement: el.closest('ul').classList.contains('mrp-menu-level-0') ? 'bottom-start' : 'right-start',
            })
        })

        document.body.addEventListener('keydown', ev => {
            if (ev.key === 'Enter') {
                if (!ev.target.closest('li.has-submenu')) {
                    return
                }
                ev.stopPropagation()
                ev.preventDefault()
                ev.target.closest('li.has-submenu').click()
            } else if (ev.key === 'Escape') {
                document.querySelectorAll('.hmenu li.open').forEach(el => {
                    el.classList.remove('open')
                    el.classList.remove('visible')
                })
            }
        })

        document.body.addEventListener('click', ev => {
            if (ev.target.closest('li.has-submenu')) {
                return
            }
            document.querySelectorAll('.hmenu li.open').forEach(el => {
                el.classList.remove('open')
                el.classList.remove('visible')
            })
        })

        document.querySelectorAll('.hmenu').forEach(menu => {
            menu.querySelectorAll('.hmenu li.has-submenu').forEach(item => {
                item.addEventListener('click', ev => {

                })

            })
        })
    })


    /* ==== INCLUDE: /js/blocks/vmenu.js ==== */

    /*!
     * Mmenu Light
     * mmenujs.com/mmenu-light
     *
     * Copyright (c) Fred Heusschen
     * www.frebsite.nl
     *
     * License: CC-BY-4.0
     * http://creativecommons.org/licenses/by/4.0/
     */

    ! function(t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var s = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports
        }
        n.m = t, n.c = e, n.d = function(t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var s in t) n.d(i, s, function(e) {
                    return t[e]
                }.bind(null, s));
            return i
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 0)
    }([function(t, e, n) {
        "use strict";
        n.r(e);
        var i = function() {
                function t(t) {
                    var e = this;
                    this.listener = function(t) {
                        (t.matches ? e.matchFns : e.unmatchFns).forEach((function(t) {
                            t()
                        }))
                    }, this.toggler = window.matchMedia(t), this.toggler.addListener(this.listener), this.matchFns = [], this.unmatchFns = []
                }
                return t.prototype.add = function(t, e) {
                    this.matchFns.push(t), this.unmatchFns.push(e), (this.toggler.matches ? t : e)()
                }, t
            }(),
            s = function(t) {
                return Array.prototype.slice.call(t)
            },
            o = function(t, e) {
                return s((e || document).querySelectorAll(t))
            },
            r = ("ontouchstart" in window || navigator.msMaxTouchPoints, navigator.userAgent.indexOf("MSIE") > -1 || navigator.appVersion.indexOf("Trident/") > -1),
            a = "mm-spn",
            c = function() {
                function t(t, e, n, i, s) {
                    this.node = t, this.title = e, this.slidingSubmenus = i, this.selectedClass = n, this.node.classList.add(a), r && (this.slidingSubmenus = !1), this.node.classList.add(a + "--" + s), this.node.classList.add(a + "--" + (this.slidingSubmenus ? "navbar" : "vertical")), this._setSelectedl(), this._initAnchors()
                }
                return Object.defineProperty(t.prototype, "prefix", {
                    get: function() {
                        return a
                    },
                    enumerable: !1,
                    configurable: !0
                }), t.prototype.openPanel = function(t) {
                    var e = t.parentElement;
                    if (this.slidingSubmenus) {
                        var n = t.dataset.mmSpnTitle;
                        e === this.node ? this.node.classList.add(a + "--main") : (this.node.classList.remove(a + "--main"), n || s(e.children).forEach((function(t) {
                            t.matches("a, span") && (n = t.textContent)
                        }))), n || (n = this.title), this.node.dataset.mmSpnTitle = n, o(".mm-spn--open", this.node).forEach((function(t) {
                            t.classList.remove(a + "--open"), t.classList.remove(a + "--parent")
                        })), t.classList.add(a + "--open"), t.classList.remove(a + "--parent");
                        for (var i = t.parentElement.closest("ul"); i;) i.classList.add(a + "--open"), i.classList.add(a + "--parent"), i = i.parentElement.closest("ul")
                    } else {
                        var r = t.matches(".mm-spn--open");
                        r ? e.classList.remove(a + "--open-parent") : e.classList.add(a + "--open-parent"), t.classList[r ? "remove" : "add"](a + "--open");
                        for (var c = t.parentElement.closest("ul"); c;) c.classList.add(a + "--open"), c = c.parentElement.closest("ul")
                    }
                }, t.prototype._setSelectedl = function() {
                    var t = o("." + this.selectedClass, this.node),
                        e = t[t.length - 1],
                        n = null;
                    e && (n = e.closest("ul")), n || (n = this.node.querySelector("ul")), this.openPanel(n)
                }, t.prototype._initAnchors = function() {
                    var t = this;
                    this.node.addEventListener("click", (function(e) {
                        var n = e.target,
                            i = !1;
                        (i = (i = (i = i || function(t) {
                            return !!t.matches("a")
                        }(n)) || function(e) {
                            var n;
                            return !!(n = e.closest("span") ? e.parentElement : !!e.closest("li") && e) && (s(n.children).forEach((function(e) {
                                e.matches("ul") && t.openPanel(e)
                            })), !0)
                        }(n)) || function(e) {
                            var n = o(".mm-spn--open", e),
                                i = n[n.length - 1];
                            if (i) {
                                var s = i.parentElement.closest("ul");
                                if (s) return t.openPanel(s), !0
                            }
                            return !1
                        }(n)) && e.stopImmediatePropagation()
                    }))
                }, t
            }(),
            d = function() {
                function t(t, e) {
                    var n = this;
                    void 0 === t && (t = null), this.wrapper = document.createElement("div"), this.wrapper.classList.add("mm-ocd"), this.wrapper.classList.add("mm-ocd--" + e), this.content = document.createElement("div"), this.content.classList.add("mm-ocd__content"), this.wrapper.append(this.content), this.backdrop = document.createElement("div"), this.backdrop.classList.add("mm-ocd__backdrop"), this.wrapper.append(this.backdrop), document.body.append(this.wrapper), t && this.content.append(t);
                    var i = function(t) {
                        n.close(), t.stopImmediatePropagation()
                    };
                    this.backdrop.addEventListener("touchstart", i, {
                        passive: !0
                    }), this.backdrop.addEventListener("mousedown", i, {
                        passive: !0
                    })
                }
                return Object.defineProperty(t.prototype, "prefix", {
                    get: function() {
                        return "mm-ocd"
                    },
                    enumerable: !1,
                    configurable: !0
                }), t.prototype.open = function() {
                    this.wrapper.classList.add("mm-ocd--open"), document.querySelector('html').classList.add("mm-ocd-opened")
                }, t.prototype.close = function() {
                    this.wrapper.classList.remove("mm-ocd--open"), document.querySelector('html').classList.remove("mm-ocd-opened")
                }, t
            }(),
            l = function() {
                function t(t, e) {
                    void 0 === e && (e = "all"), this.menu = t, this.toggler = new i(e)
                }
                return t.prototype.navigation = function(t) {
                    var e = this;
                    if (!this.navigator) {
                        var n = (t = t || {}).title,
                            i = void 0 === n ? "Menu" : n,
                            s = t.selectedClass,
                            o = void 0 === s ? "Selected" : s,
                            r = t.slidingSubmenus,
                            a = void 0 === r || r,
                            d = t.theme,
                            l = void 0 === d ? "light" : d;
                        this.navigator = new c(this.menu, i, o, a, l), this.toggler.add((function() {
                            return e.menu.classList.add(e.navigator.prefix)
                        }), (function() {
                            return e.menu.classList.remove(e.navigator.prefix)
                        }))
                    }
                    return this.navigator
                }, t.prototype.offcanvas = function(t) {
                    var e = this;
                    if (!this.drawer) {
                        var n = (t = t || {}).position,
                            i = void 0 === n ? "left" : n;
                        this.drawer = new d(null, i);
                        var s = document.createComment("original menu location");
                        this.menu.after(s), this.toggler.add((function() {
                            e.drawer.content.append(e.menu)
                        }), (function() {
                            e.drawer.close(), s.after(e.menu)
                        }))
                    }
                    return this.drawer
                }, t
            }();
        e.default = l;
        window.MmenuLight = l
    }]);

;
(function() {

    const menus = {}

    const init = (id) => {
        // re-entrant

        if (id) {
            // re-init
            // first destroy all existing (after apply in-place changes) constructs
            document.querySelectorAll('[data-rel="' + id + '"]').forEach(existing => {
                existing.remove()
            })
        }

        document.querySelectorAll('.vmenu').forEach((el, index) => {
            if (el.classList.contains('inited')) {
                return
            }
            el.classList.add('inited')

            const blockId = el.closest('.block-layout').getAttribute('id')



            const menu = new MmenuLight(el, 'all')
            const navigation = menu.navigation({
                selected: 'selected',
                slidingSubmenus: 'true' === el.getAttribute('data-slide'),
                theme: 'true' === el.getAttribute('data-dark') ? 'dark' : 'light',
                title: ''
            })

            const drawer = menu.offcanvas({
                position: 'right' === el.getAttribute('data-position') ? 'right' : 'left',
            })

            drawer.wrapper.setAttribute('data-rel', blockId)

            el.classList.remove('initial')

            // if id was given to us in init(id), then we are reiniting
            if (id && index === 0) {
                menus[blockId] = []
            }
            if (!menus[blockId]) {
                // array for potentially multiple per block
                menus[blockId] = []
            }
            menus[blockId].push({
                navigation,
                drawer
            })
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        init()

        document.addEventListener('editor.on', () => {
            Reflect.ownKeys(menus).forEach(m => {
                const handlers = menus[m]
                handlers.forEach(h => {
                    try {
                        h.drawer.close()
                    } catch (e) {}
                })
            })
        })

        document.addEventListener('keydown', ev => {
            if (ev.key === 'Escape') {
                Reflect.ownKeys(menus).forEach(m => {
                    const handlers = menus[m]
                    handlers.forEach(h => {
                        try {
                            h.drawer.close()
                        } catch (e) {}
                    })
                })
            }
        })

        document.addEventListener('click', ev => {
            if (ev.target && ev.target &&
                ev.target.closest('.vmenu-opener')) {

                if (document.querySelector('html').classList.contains('editing')) {
                    return
                }
                const blockId = ev.target.closest('.block-layout').getAttribute('id')
                const index = parseInt(ev.target.closest('.vmenu-opener').getAttribute('data-index')) || 0
                const handlers = menus[blockId]
                if (Array.isArray(handlers) && handlers[index]) {
                    handlers[index].drawer.open()
                    if (handlers[index].navigation.slidingSubmenus) {
                        handlers[index].navigation.openPanel(handlers[index].navigation.node.querySelector('ul'))
                    }
                    handlers[index].drawer.content.querySelector('.vmenu').focus()
                }
            }
        })
    })

    _G.reinitHandlers.push(init)

})()


/* ==== INCLUDE: /js/blocks/omnibox-v2_1.js ==== */

;
(function() {

    function Typeahead(el, accountId) {

        if (el.__typeahead) {
            // already inited
            return
        }

        el.__typeahead = true

        const MIN_CHARS_MSG = 'Enter at least 3 characters...'

        // const typeaheadURL = el.getAttribute('data-typeahead')
        const typeaheadURL = '/wps/rest/api/' + accountId + '/typeahead?'

        el.getAttribute('data-with-ticker') === 'true' && (function() {

            const text = el.getAttribute('placeholder') || ''
            if (!text) {
                return
            }

            const ticker = document.createElement('div')
            ticker.style.position = 'absolute'
            ticker.style.width = ticker.style.height = '0'
            ticker.style.overflow = 'hidden'
            ticker.setAttribute('data-ticker', text)
            ticker.innerText = ''
            el.setAttribute('placeholder', '')
            const typing = window.TypeIt && new window.TypeIt(ticker, {
                //waitUntilVisible: true,
                cursor: '',
                speed: 50,
                afterStep: (step, queue, instance) => {
                    el.setAttribute('placeholder', ticker.textContent)
                }
            })
            _G.visibilityService.observe(el, result => {
                if (result.isIntersecting && !document.querySelector('html').classList.contains('editing')) {
                    typing.pause(1000).type(text).go()
                    _G.visibilityService.unobserve(el)
                }
            })

        })()

        const popup = document.createElement("div")
        popup.setAttribute("class", "typeahead elevation8")
        el.parentElement.appendChild(popup)

        const popper = Popper.createPopper(el, popup, {
            placement: 'bottom-start',
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            }, ],
        })

        const doFetch = debounce((val, onData, onError) => {

            const soldCheckbox = el.form.querySelector('input[name=solds]')
            const isForSolds = soldCheckbox && soldCheckbox.checked || false
            const listingType = isForSolds ? 'AUTO_SOLD' :
                (el.form.querySelector('input[name=listingType]').value || 'AUTO')


            fetch(typeaheadURL + 'listingType' + encodeURIComponent(listingType) +
                    '&q=' + encodeURIComponent(val))
                .then(response => response.json())
                .then(json => {
                    onData(json)
                })
                .catch(err => {
                    onError(err)
                })
        }, 300)

        const createTypeaheadMessage = msg => {
            popup.innerHTML = ''
            const out = document.createElement('div')
            out.setAttribute('class', 'message')
            out.innerText = msg
            popup.appendChild(out)
            showTypeahead()
        }

        const createTypeaheadEntry = row => {
            const out = document.createElement('div')
            out.setAttribute('class', 'entry')
            out.setAttribute('data-value', row[0])
            out.setAttribute('data-label', row[1])

            out.addEventListener('mouseenter', () => {
                focusEntry(out)
            })
            out.innerText = row[1]
            return out
        }

        const createTypeahead = data => {
            popup.innerHTML = ''
            if (data.length === 0) {
                return createTypeaheadMessage('Hm, nothing found...')
            }
            data.forEach(record => {
                popup.appendChild(createTypeaheadEntry(record))
            })
            if (!popup.classList.contains('visible')) {
                showTypeahead()
            }
            focusFirst()
        }

        const showTypeahead = () => {
            popup.classList.add('visible')
            popper.forceUpdate()
        }

        const hideTypeahead = () => {
            popup.classList.remove('visible')
        }

        const currentSelection = () => {
            return popup.querySelector('.focused')
        }

        const focusFirst = () => {
            const first = popup.firstElementChild
            if (first && first.classList.contains('entry')) {
                return first.classList.add('focused')
            }
        }

        const focusNext = () => {
            const current = currentSelection()
            if (!current) {
                focusFirst()
            } else {
                current.classList.remove('focused')
                const next = current.nextElementSibling
                if (!next) {
                    focusFirst()
                } else if (next.classList.contains('entry')) {
                    next.classList.add('focused')
                }
            }
        }

        const focusPrev = () => {
            const current = currentSelection()
            if (!current) {
                return
            }
            current.classList.remove('focused')
            const prev = current.previousElementSibling
            if (!prev) {
                const last = popup.lastElementChild
                if (last && last.classList.contains('entry')) {
                    last.classList.add('focused')
                }
            } else if (prev.classList.contains('entry')) {
                prev.classList.add('focused')
            }
        }

        const focusEntry = entry => {
            const current = currentSelection()
            current && current.classList.remove('focused')
            entry.classList.add('focused')
        }

        const isValueAddressOrMlsNum = value => {
            return value && (value.startsWith('addr:') || value.startsWith('mls:'))
        }

        const selectItem = item => {
            if (!item || !item.classList.contains('entry')) {
                return
            }

            el.value = ''

            const label = item.getAttribute('data-label')
            const value = item.getAttribute('data-value')
            const isAddressOrMlsNum = isValueAddressOrMlsNum(value)

            const data = {
                label,
                value,
                isAddressOrMlsNum,
            }
            listeners.forEach(l => {
                try {
                    l(data)
                } catch (e) {
                    console.warn('WARNING: error in listener', e)
                }
            })

            item.remove()
        }

        // event handling

        popup.addEventListener('click', ev => {
            if (ev.target && ev.target.classList.contains('entry')) {
                selectItem(ev.target)
                hideTypeahead()
                // setTimeout(() => {
                el.focus()
                // }, 100)
            }
        })

        const processKey = ev => {
            if (ev.key === 'Escape') {
                el.value = ''
                return hideTypeahead()
            } else if (ev.key === 'ArrowDown') {
                ev.preventDefault()
                if (popup.classList.contains('visible')) {
                    focusNext()
                } else {
                    if (popup.querySelectorAll('.entry').length === 0) {
                        return createTypeaheadMessage(MIN_CHARS_MSG)
                    }
                    showTypeahead()
                }
            } else if (ev.key === 'ArrowUp') {
                ev.preventDefault()
                focusPrev()
            } else if (ev.key === 'Enter') {
                ev.preventDefault()
                ev.stopPropagation()
                if (!popup.classList.contains('visible')) {
                    // popup is not visible, submit the form
                    return ev.target.form.submit()
                }
                const sel = currentSelection()
                if (sel) {
                    selectItem(sel)
                    hideTypeahead()
                } else {
                    return ev.target.form.submit()
                }
            }
        }
        el.addEventListener('keydown', processKey)

        const submitButton = el.closest('form').querySelector('[type=submit]')
        if (submitButton) {
            submitButton.addEventListener('click', ev => {
                ev.preventDefault();
                ev.stopPropagation();
                if (!popup.classList.contains('visible') && el.value) {
                    // popup is not visible, submit the form
                    // if no suggestion was found (perhaps, due to latency)
                    // but the text was entered, assume it was an MLS number
                    const mlsNum = document.createElement('div')
                    mlsNum.setAttribute('data-value', 'mls:' + el.value)
                    mlsNum.setAttribute('data-label', el.value)
                    mlsNum.classList.add('entry')
                    selectItem(mlsNum)
                    hideTypeahead()
                    return ev.target.closest('[type=submit]').form.submit()
                }
                const sel = currentSelection()
                if (sel) {
                    selectItem(sel)
                    hideTypeahead()
                } else if (el.value) {
                    // if no suggestion was found (perhaps, due to latency)
                    // but the text was entered, assume it was an MLS number
                    const mlsNum = document.createElement('div')
                    mlsNum.setAttribute('data-value', 'mls:' + el.value)
                    mlsNum.setAttribute('data-label', el.value)
                    mlsNum.classList.add('entry')
                    selectItem(mlsNum)
                    hideTypeahead()
                }
                return ev.target.closest('[type=submit]').form.submit()
            })
        }

        const processInput = ev => {

            const val = ev.target.value
            if (val && val.length > 2) {
                doFetch(val, data => {
                    createTypeahead(data)
                }, err => {
                    console.log('err', err)
                })
            } else {
                createTypeaheadMessage(MIN_CHARS_MSG)
                //hideTypeahead()
            }
        }

        el.addEventListener('input', processInput)

        const click = ev => {
            if (!popup.classList.contains('visible') && popup.children.length > 0) {
                popup.classList.add('visible')
                popper.forceUpdate()
            }
        }
        el.addEventListener('mousedown', click)


        const clickAway = ev => {
            if (ev.target && ev.target.contains(el)) {
                return
            }
            if (ev.target && ev.target.contains(popup)) {
                return
            }
            if (ev.target && ev.target.closest('.typeahead')) {
                return
            }
            if (ev.target && ev.target.closest('[type=submit]')) {
                return
            }
            hideTypeahead()
        }
        document.querySelector('html').addEventListener('mousedown', clickAway)


        // exported

        const listeners = []

        function onSelect(callback) {
            callback && (typeof callback === 'function') && listeners.push(callback)
        }

        function destroy() {
            el.__typeahead = false
            popper.destroy()
            el.removeEventListener('keydown', processKey)
            el.removeEventListener('input', processInput)
            el.removeEventListener('mousedown', click)
            document.removeEventListener('mousedown', clickAway)
        }

        return {
            destroy,
            onSelect,
        }
    }

    function Selections(el) {

        let selections = []

        el.querySelectorAll('input[type=hidden]').forEach(preset => {
            const name = preset.getAttribute('name')
            const value = preset.getAttribute('value')
            const label = preset.getAttribute('data-label')

            selections.push({
                name,
                value,
                label
            })

            preset.remove()
        })

        const render = () => {
            el.innerHTML = ''
            selections.forEach(s => {
                const pill = document.createElement('span')
                pill.classList.add('selection-pill')
                const cancel = document.createElement('img')
                cancel.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\'/%3e%3c/svg%3e'
                cancel.setAttribute('aria-role', 'button')
                cancel.classList.add('cancel')
                cancel.innerText = '×'
                pill.appendChild(cancel)

                cancel.addEventListener('click', ev => {
                    ev.preventDefault()
                    remove(s.name, s.value)
                })
                const label = document.createElement('span')
                label.classList.add('label')
                label.innerText = s.label
                pill.appendChild(label)

                const hidden = document.createElement('input')
                hidden.setAttribute('type', 'hidden')
                hidden.setAttribute('name', s.name)
                hidden.setAttribute('value', s.value)
                el.appendChild(hidden)
                el.appendChild(pill)
            })

            if (selections.length > 3) {
                const pill = document.createElement('span')
                pill.classList.add('selection-pill', 'clear-all')
                const cancel = document.createElement('img')
                cancel.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\'/%3e%3c/svg%3e'
                cancel.setAttribute('aria-role', 'button')
                cancel.classList.add('cancel')
                cancel.innerText = '×'
                pill.appendChild(cancel)

                pill.addEventListener('click', ev => {
                    ev.preventDefault()
                    clear()
                })
                const label = document.createElement('span')
                label.classList.add('label')
                label.innerText = 'Clear all'
                pill.appendChild(label)

                el.appendChild(pill)
            }
        }

        const clear = () => {
            selections = []
            render()
        }

        const clearNonMlsOrAddress = () => {
            selections = selections.filter(s => {
                return s.name === 'omni' && s.isAddressOrMlsNum === true
            })
        }

        const find = (name, value) => {
            return selections.find(s => (
                s.name === name && s.value === value
            ))
        }

        const add = (name, data) => {
            if (find(name, data.value)) {
                return
            }
            let label = data.label
            if (data.isAddressOrMlsNum === true) {
                label = label.replace(/,.+$/, '')
            }
            selections.push({
                name,
                ...data,
                label,
            })
            render()
        }

        const remove = (name, value = null) => {
            selections = selections.filter(s => {
                return !(s.name === name && (value === null ? true : s.value === value))
            })
            render()
        }

        const change = (data, multipleOk = false) => {

            if (data.value === null) {
                selections = selections.filter(s => {
                    return s.name !== data.name
                })
                return render()
            }

            const found = selections.find(s => (s.name === data.name && (multipleOk ? s.value === data.value : true)))
            if (found) {
                found.value = data.value
                found.label = data.label
                render()
            } else {
                add(data.name, data)
            }
        }

        const unset = (name, value) => {

        }

        const values = () => {
            return JSON.parse(JSON.stringify(selections))
        }

        render()

        return {
            clear,
            clearNonMlsOrAddress,
            add,
            remove,
            change,
            values,
        }
    }

    let meta
    let metaPromise

    function Metadata(accountId, listingType, context) {
        if (metaPromise) {
            return metaPromise
        }
        if (meta) {
            return Promise.resolve(meta)
        }
        return new Promise((resolve, reject) => {
            const url = '/wps/-/noframe~true/' + context + '/' + accountId + '/idx.browse?ibf_json=true&'

            setTimeout(() => {

                fetch(url + '&listingType=' + encodeURIComponent(listingType))
                    .then(response => response.json())
                    .then(json => {
                        meta = json
                        metaPromise = null
                        resolve(json)
                    })
                    .catch(err => {
                        metaPromise = null
                        reject(err)
                    })

            }, 0)
        })
    }

    function BaseControl(meta) {
        const out = document.createElement('div')
        out.classList.add('control')
        const heading = document.createElement('div')
        heading.classList.add('heading')
        const title = document.createElement('div')
        title.classList.add('title')
        const expandToggle = document.createElement('div')
        expandToggle.classList.add('toggle')
        const icon = document.createElement('img')
        icon.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'%3e %3cpolygon fill=\'var(--ci-primary-color%2c currentColor)\' points=\'440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240\' class=\'ci-primary\'/%3e %3c/svg%3e'
        icon.setAttribute('aria-label', 'Show/Hide control')
        icon.setAttribute('aria-role', 'button')
        icon.setAttribute('alt', 'Show/Hide control')
        expandToggle.appendChild(icon)

        heading.appendChild(title)
        heading.appendChild(expandToggle)

        const contentOuter = document.createElement('div')
        contentOuter.classList.add('content-outer')
        const contentInner = document.createElement('div')
        contentInner.classList.add('content-inner')

        contentOuter.appendChild(contentInner)

        out.appendChild(heading)
        out.appendChild(contentOuter)

        out.querySelector('.title').innerText = meta.label

        heading.addEventListener('click', () => {
            if (heading.classList.contains('fixed')) {
                return
            }
            if (icon.classList.contains('expanded')) {
                icon.classList.remove('expanded')
                contentOuter.style.height = '0px'
            } else {
                icon.classList.add('expanded')
                const h = contentInner.getBoundingClientRect().height
                contentOuter.style.height = h + 'px'
            }
            // setTimeout(() => {
            //     contentOuter.closest('.control-panel').popper.update()
            // }, 100 )
        })

        return out
    }

    function nFormatter(num, digits) {
        var si = [{
                value: 1,
                symbol: ""
            },
            {
                value: 1E3,
                symbol: "K"
            },
            {
                value: 1E6,
                symbol: "M"
            },
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    function PriceControl(meta, values, onChange, onClear) {

        const out = BaseControl(meta)

        const min = 0
        const max = 10000000
        let initialFrom = min
        let initialTo = max

        if (values) {
            const found = values.find(s => s.name === 'ibf_price')
            if (found) {
                const v = found.value
                if (v) {
                    const parsed = v.split("|")
                    initialFrom = parseInt(parsed[0]) || initialFrom
                    initialTo = parseInt(parsed[1]) || initialTo
                }
            }
        }

        const content = out.querySelector('.content-inner')

        const bar = document.createElement('div')
        bar.classList.add('slider')

        const formatter = {
            to: val => {
                return '$' + new Intl.NumberFormat().format(val.toFixed(0))
            },
            from: str => {
                return parseInt(val)
            }
        }


        noUiSlider.create(bar, {
            start: [initialFrom, initialTo],
            connect: true,
            range: {
                'min': [0, 1000],
                // '5%': [1000,1000],
                '5%': [100000, 10000],
                '70%': [1000000, 100000],
                '80%': [2000000, 500000],
                'max': [(initialTo || 10000000)],
            },
            ariaFormat: formatter,
        })

        const labels = document.createElement('div')
        labels.classList.add('labels')

        const from = document.createElement('div')
        from.classList.add('value')
        labels.appendChild(from)

        const to = document.createElement('div')
        to.classList.add('value')
        labels.appendChild(to)

        bar.noUiSlider.on('update', values => {
            const fromVal = parseInt(values[0])
            const toVal = parseInt(values[1])
            if (fromVal === min) {
                from.innerText = 'Any'
            } else {
                from.innerText = formatter.to(fromVal)
            }
            if (toVal === max) {
                to.innerText = 'Any'
            } else {
                to.innerText = formatter.to(toVal)
            }

            if (fromVal === min && toVal === max) {
                // console.log( 'onChange null' )
                onClear('ibf_price')
            } else {
                // console.log( 'onChange', fromVal + '-' + toVal )
                onChange({
                    name: 'ibf_price',
                    value: fromVal + '|' + toVal,
                    // label: 'Price: ' + nFormatter(fromVal,2) + '-' + nFormatter(toVal, 1)
                    label: formatter.to(fromVal) + ' - ' + formatter.to(toVal)
                }, false) // multipleOk=false
            }

        })

        content.appendChild(bar)
        content.appendChild(labels)

        return out
    }

    function MixedOptionsControl(meta, values, onChange, onClear) {
        const out = BaseControl(meta)
        const content = out.querySelector('.content-inner')

        const name = 'ibf_' + meta.name.toLowerCase()

        for (let i = 0; i < meta.groups.length; ++i) {

            const group = meta.groups[i]

            if (i > 0) {
                const subhead = document.createElement('div')
                subhead.classList.add('subhead')
                subhead.innerText = group.label
                content.appendChild(subhead)
            }

            const pane = document.createElement('div')
            pane.classList.add('checkbox-pane')
            content.appendChild(pane)

            for (const option of group.options) {
                const label = document.createElement('label')
                const checkbox = document.createElement('input')
                checkbox.setAttribute('type', 'checkbox')
                checkbox.setAttribute('value', option[0])
                const text = document.createElement('span')
                text.innerText = option[1]
                label.appendChild(checkbox)
                label.appendChild(text)
                pane.appendChild(label)

                const found = values.find(v => {
                    return v.name === name && v.value === option[0]
                })
                found && (checkbox.checked = true)

                checkbox.addEventListener('change', ev => {
                    if (ev.target.checked) {
                        onChange({
                            name,
                            label: option[1],
                            value: option[0],
                        }, true)
                    }
                })
            }
        }

        return out
    }

    function SingleOptionControl(meta, values, onChange, onClear) {
        const out = BaseControl(meta)
        const content = out.querySelector('.content-inner')

        const name = 'ibf_' + meta.name.toLowerCase()

        const pane = document.createElement('div')
        pane.classList.add('checkbox-pane')
        content.appendChild(pane)

        for (const option of meta.options) {

            if (!option[0]) {
                continue;
            }
            const label = document.createElement('label')
            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'radio')
            checkbox.setAttribute('value', option[0])
            const text = document.createElement('span')
            text.innerText = option[1]
            label.appendChild(checkbox)
            label.appendChild(text)
            pane.appendChild(label)

            const found = values.find(v => {
                return v.name === name && v.value === option[0]
            })
            found && (checkbox.checked = true)

            checkbox.addEventListener('change', ev => {

                pane.querySelectorAll('input[type=radio]').forEach(r => {
                    if (r.getAttribute('value') !== ev.target.value) {
                        r.checked = false
                    }
                })

                if (ev.target.checked) {
                    onChange({
                        name,
                        label: meta.label + ': ' + option[1],
                        value: option[0],
                    }, false)
                }
            })
        }

        return out
    }

    function Control(meta, values, onChange, onClear) {

        if (meta.type === 'PriceControl') {
            return PriceControl(meta, values, onChange, onClear)
        } else if (meta.type === 'MixedOptionsControl') {
            return MixedOptionsControl(meta, values, onChange, onClear)
        } else if (meta.type === 'SingleOptionControl') {
            return SingleOptionControl(meta, values, onChange, onClear)
        }

        return null
    }

    function ControlPanel(el, metadataFetcher, selections) {
        const what = el.getAttribute('data-omni-trigger');
        if (!what) {
            return
        }

        const popup = document.createElement("div")
        popup.setAttribute("class", "control-panel elevation8")
        el.parentElement.appendChild(popup)

        // popup.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor ultricies interdum. Suspendisse potenti. Sed consectetur, odio eget mattis commodo, metus massa tincidunt sapien, quis tincidunt sapien mi sed ipsum. Suspendisse eleifend sodales nulla, sit amet vehicula mauris bibendum vitae. Integer condimentum suscipit libero ac pharetra. In eget viverra felis. Cras odio nisi, lacinia eget semper ut, dictum vitae odio. Pellentesque at suscipit justo, id sagittis nisl.'

        const popper = Popper.createPopper(el, popup, {
            placement: 'bottom',
            modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [0, 0],
                    },
                },
                {
                    name: 'flip',
                    options: {
                        // flipVariations: false, // true by default
                        // allowedAutoPlacements: ['bottom'],
                        fallbackPlacements: ['bottom'],
                    },
                },
            ],
        })

        popup.popper = popper

        window.addEventListener('resize', () => {
            if (!_G.isMobile()) {
                hidePopup()
            }
        }, {
            passive: true
        })

        const showPopup = () => {
            popup.classList.add('visible')
            popup.classList.add('becoming')
            popper.forceUpdate()
            setTimeout(() => {
                popup.classList.remove('becoming')
            }, 10)
        }

        const hidePopup = () => {
            if (!isVisible()) {
                return
            }
            popup.addEventListener('transitionend', () => {
                popup.classList.remove('visible')
                popup.classList.remove('becoming')
            }, {
                once: true
            })
            popup.classList.add('becoming')
        }

        const isVisible = () => {
            return popup.classList.contains('visible')
        }

        const renderProgress = () => {
            const loading = document.createElement('div')
            loading.classList.add('progress')
            const ind = document.createElement('img')
            ind.setAttribute('src', 'data:image/svg+xml,%3c%3fxml version=\'1.0\' encoding=\'UTF-8\'%3f%3e%3c!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3e%3csvg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' id=\'mdi-refresh-circle\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M18 11H13L14.81 9.19A3.94 3.94 0 0 0 12 8A4 4 0 1 0 15.86 13H17.91A6 6 0 1 1 12 6A5.91 5.91 0 0 1 16.22 7.78L18 6Z\' /%3e%3c/svg%3e')
            ind.classList.add('indicator')
            loading.appendChild(ind)
            popup.innerHTML = ''
            popup.appendChild(loading)
        }

        const renderError = err => {
            const error = document.createElement('div')
            error.classList.add('error')

            const msg = document.createElement('div')
            msg.classList.add('message')
            msg.innerText = 'Sorry, an unexpected error occurred: '

            const details = document.createElement('div')
            details.classList.add('message')
            details.innerText = err.toString()

            error.appendChild(msg)
            error.appendChild(details)

            const reload = document.createElement('button')
            reload.classList.add('button')
            reload.classList.add('small')
            reload.innerText = 'Try again'

            reload.addEventListener('click', ev => {
                ev.preventDefault()
                hidePopup()
                setTimeout(() => {
                    render()
                }, 200)
            })

            error.appendChild(reload)

            popup.innerHTML = ''
            popup.appendChild(error)
        }

        const renderControls = meta => {

            const filterProp = getComputedStyle(el).getPropertyValue('--OMNI-CONTROLS')
            let filters = []
            if (filterProp) {
                filters = filterProp.split(',')
                filters = filters.map(f => f.trim())
            }
            if (filters.length == 1 && (filters[0] === '' || filters[0] === 'all')) {
                filters = []
            }

            popup.innerHTML = ''
            let numControls = 0
            meta.controls.forEach(c => {
                const skip = filters.length > 0 && filters.find(f => {
                    if (!f) return false
                    if (f.startsWith('-') && f.substring(1) === c.name) {
                        return true // skip
                    } else if (f === c.name) {
                        return false
                    } else {
                        if (filters[0].startsWith('-')) {
                            return false
                        } else {
                            return true
                        }
                    }
                })

                if (skip) {
                    return
                }

                const control = Control(c, selections.values(), selections.change, selections.remove)
                if (control) {
                    popup.appendChild(control)
                    numControls++
                }
            })
            if (numControls === 1) {
                popup.querySelector('.content-outer').style.height = 'auto'
                popup.querySelector('.heading').classList.add('fixed');
            }
        }

        const render = () => {

            let timer = setTimeout(() => {
                renderProgress()
                showPopup()
                popper.forceUpdate()
                timer = null
            }, 300)

            metadataFetcher().then(meta => {
                renderControls(meta)
            }).catch(err => {
                console.error(err)
                renderError(err)
            }).finally(() => {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                    showPopup()
                } else {
                    popper.forceUpdate()
                }
            })
        }


        el.addEventListener('click', () => {
            isVisible() ? hidePopup() : render()
        })

        const clickAway = ev => {
            // const html = document.querySelector('html')
            console.log('clickaway', ev.target)
            if (popup.contains(ev.target)) {
                return
            }
            // if (ev.target && ev.target.closest('.control-panel')) {
            //     return
            // }
            hidePopup()
        }
        document.querySelector('html').addEventListener('mousedown', clickAway)

        const debug = (event) => {
            console.log('fired', event)
        }
        document.addEventListener('touchstart', debug)
        document.addEventListener('touchmove', debug)
        document.addEventListener('touchend', debug)
        document.addEventListener('touchcancel', debug)
    }

    function OmniboxForm(el) {

        if (el.__omniInited) {
            return
        }

        el.__omniInited = true
        el.classList.add('inited')

        const accountId = parseInt(el.getAttribute('data-account')) || 0
        const context = el.getAttribute('data-context') || 'recip'
        const listingType = el.querySelector('input[name=listingType]').value || 'AUTO'

        const isImmediateSearch = el.getAttribute('data-immediate') === 'true'

        const metadataFetcher = () => {
            return Metadata(accountId, listingType, context)
        }
        // prime the meta
        metadataFetcher()

        const selections = Selections(el.querySelector('[data-rel=selections]'))

        const omniElem = el.querySelector('[data-rel=omni]')
        if (omniElem) {
            const typeahead = Typeahead(omniElem, accountId)
            typeahead.onSelect(data => {
                const toadd = {
                    ...data,
                    label: data.label,
                    value: data.value + '[' + data.label + ']',
                }
                if (data.isAddressOrMlsNum) {
                    selections.clearNonMlsOrAddress()
                    selections.add('omni', toadd)
                } else {
                    selections.add('omni', toadd)
                }

                if (isImmediateSearch) {
                    const submitButton = el.closest('form').querySelector('[type=submit]')
                    if (submitButton) {
                        submitButton.click()
                    }
                }
            })
        }

        const triggers = el.querySelectorAll('[data-omni-trigger]:not([data-omni-trigger=\"\"])').forEach(t => {
            ControlPanel(t, metadataFetcher, selections)
        })

        return {}
    }

    function init() {
        document.querySelectorAll('.omnibox-form').forEach(el => {
            OmniboxForm(el)
        })
    }

    document.addEventListener('DOMContentLoaded', init)

    _G.reinitHandlers.push(init)
})();

/* ==== INCLUDE: /js/blocks/nouislider.14.6.2.min.js ==== */

/*! nouislider - 14.6.2 - 9/16/2020 */
! function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
}(function() {
    "use strict";
    var lt = "14.6.2";

    function ut(t) {
        t.parentElement.removeChild(t)
    }

    function a(t) {
        return null != t
    }

    function ct(t) {
        t.preventDefault()
    }

    function o(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t)
    }

    function pt(t, e, r) {
        0 < r && (ht(t, e), setTimeout(function() {
            mt(t, e)
        }, r))
    }

    function ft(t) {
        return Math.max(Math.min(t, 100), 0)
    }

    function dt(t) {
        return Array.isArray(t) ? t : [t]
    }

    function e(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0
    }

    function ht(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e
    }

    function mt(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }

    function gt(t) {
        var e = void 0 !== window.pageXOffset,
            r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        }
    }

    function c(t, e) {
        return 100 / (e - t)
    }

    function p(t, e, r) {
        return 100 * e / (t[r + 1] - t[r])
    }

    function f(t, e) {
        for (var r = 1; t >= e[r];) r += 1;
        return r
    }

    function r(t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n, i, o = f(r, t),
            s = t[o - 1],
            a = t[o],
            l = e[o - 1],
            u = e[o];
        return l + (i = r, p(n = [s, a], n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u))
    }

    function n(t, e, r, n) {
        if (100 === n) return n;
        var i, o, s = f(n, t),
            a = t[s - 1],
            l = t[s];
        return r ? (l - a) / 2 < n - a ? l : a : e[s - 1] ? t[s - 1] + (i = n - t[s - 1], o = e[s - 1], Math.round(i / o) * o) : n
    }

    function s(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [e]), !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' contains invalid value.");
        if (!o(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !o(e[0])) throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric.");
        r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), r.xHighestCompleteStep.push(0)
    }

    function l(t, e, r) {
        if (e)
            if (r.xVal[t] !== r.xVal[t + 1]) {
                r.xSteps[t] = p([r.xVal[t], r.xVal[t + 1]], e, 0) / c(r.xPct[t], r.xPct[t + 1]);
                var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t],
                    i = Math.ceil(Number(n.toFixed(3)) - 1),
                    o = r.xVal[t] + r.xNumSteps[t] * i;
                r.xHighestCompleteStep[t] = o
            } else r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t]
    }

    function i(t, e, r) {
        var n;
        this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e;
        var i = [];
        for (n in t) t.hasOwnProperty(n) && i.push([t[n], n]);
        for (i.length && "object" == typeof i[0][0] ? i.sort(function(t, e) {
                return t[0][0] - e[0][0]
            }) : i.sort(function(t, e) {
                return t[0] - e[0]
            }), n = 0; n < i.length; n++) s(i[n][1], i[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) l(n, this.xNumSteps[n], this)
    }
    i.prototype.getDistance = function(t) {
        var e, r = [];
        for (e = 0; e < this.xNumSteps.length - 1; e++) {
            var n = this.xNumSteps[e];
            if (n && t / n % 1 != 0) throw new Error("noUiSlider (" + lt + "): 'limit', 'margin' and 'padding' of " + this.xPct[e] + "% range must be divisible by step.");
            r[e] = p(this.xVal, t, e)
        }
        return r
    }, i.prototype.getAbsoluteDistance = function(t, e, r) {
        var n, i = 0;
        if (t < this.xPct[this.xPct.length - 1])
            for (; t > this.xPct[i + 1];) i++;
        else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2);
        r || t !== this.xPct[i + 1] || i++;
        var o = 1,
            s = e[i],
            a = 0,
            l = 0,
            u = 0,
            c = 0;
        for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); 0 < s;) a = this.xPct[i + 1 + c] - this.xPct[i + c], 100 < e[i + c] * o + 100 - 100 * n ? (l = a * n, o = (s - 100 * n) / e[i + c], n = 1) : (l = e[i + c] * a / 100 * o, o = 0), r ? (u -= l, 1 <= this.xPct.length + c && c--) : (u += l, 1 <= this.xPct.length - c && c++), s = e[i + c] * o;
        return t + u
    }, i.prototype.toStepping = function(t) {
        return t = r(this.xVal, this.xPct, t)
    }, i.prototype.fromStepping = function(t) {
        return function(t, e, r) {
            if (100 <= r) return t.slice(-1)[0];
            var n, i = f(r, e),
                o = t[i - 1],
                s = t[i],
                a = e[i - 1],
                l = e[i];
            return n = [o, s], (r - a) * c(a, l) * (n[1] - n[0]) / 100 + n[0]
        }(this.xVal, this.xPct, t)
    }, i.prototype.getStep = function(t) {
        return t = n(this.xPct, this.xSteps, this.snap, t)
    }, i.prototype.getDefaultStep = function(t, e, r) {
        var n = f(t, this.xPct);
        return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r
    }, i.prototype.getNearbySteps = function(t) {
        var e = f(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {
                startValue: this.xVal[e],
                step: this.xNumSteps[e],
                highestStep: this.xHighestCompleteStep[e]
            }
        }
    }, i.prototype.countStepDecimals = function() {
        var t = this.xNumSteps.map(e);
        return Math.max.apply(null, t)
    }, i.prototype.convert = function(t) {
        return this.getStep(this.toStepping(t))
    };
    var u = {
            to: function(t) {
                return void 0 !== t && t.toFixed(2)
            },
            from: Number
        },
        d = {
            target: "target",
            base: "base",
            origin: "origin",
            handle: "handle",
            handleLower: "handle-lower",
            handleUpper: "handle-upper",
            touchArea: "touch-area",
            horizontal: "horizontal",
            vertical: "vertical",
            background: "background",
            connect: "connect",
            connects: "connects",
            ltr: "ltr",
            rtl: "rtl",
            textDirectionLtr: "txt-dir-ltr",
            textDirectionRtl: "txt-dir-rtl",
            draggable: "draggable",
            drag: "state-drag",
            tap: "state-tap",
            active: "active",
            tooltip: "tooltip",
            pips: "pips",
            pipsHorizontal: "pips-horizontal",
            pipsVertical: "pips-vertical",
            marker: "marker",
            markerHorizontal: "marker-horizontal",
            markerVertical: "marker-vertical",
            markerNormal: "marker-normal",
            markerLarge: "marker-large",
            markerSub: "marker-sub",
            value: "value",
            valueHorizontal: "value-horizontal",
            valueVertical: "value-vertical",
            valueNormal: "value-normal",
            valueLarge: "value-large",
            valueSub: "value-sub"
        };

    function h(t) {
        if ("object" == typeof(e = t) && "function" == typeof e.to && "function" == typeof e.from) return !0;
        var e;
        throw new Error("noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods.")
    }

    function m(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'step' is not numeric.");
        t.singleStep = e
    }

    function g(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardPageMultiplier' is not numeric.");
        t.keyboardPageMultiplier = e
    }

    function v(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardDefaultStep' is not numeric.");
        t.keyboardDefaultStep = e
    }

    function b(t, e) {
        if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new i(e, t.snap, t.singleStep)
    }

    function x(t, e) {
        if (e = dt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect.");
        t.handles = e.length, t.start = e
    }

    function S(t, e) {
        if ("boolean" != typeof(t.snap = e)) throw new Error("noUiSlider (" + lt + "): 'snap' option must be a boolean.")
    }

    function w(t, e) {
        if ("boolean" != typeof(t.animate = e)) throw new Error("noUiSlider (" + lt + "): 'animate' option must be a boolean.")
    }

    function y(t, e) {
        if ("number" != typeof(t.animationDuration = e)) throw new Error("noUiSlider (" + lt + "): 'animationDuration' option must be a number.")
    }

    function E(t, e) {
        var r, n = [!1];
        if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++) n.push(e);
            n.push(!1)
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + lt + "): 'connect' option doesn't match handle count.");
            n = e
        }
        t.connect = n
    }

    function C(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'orientation' option is invalid.")
        }
    }

    function P(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'margin' option must be numeric.");
        0 !== e && (t.margin = t.spectrum.getDistance(e))
    }

    function N(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + lt + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
    }

    function k(t, e) {
        var r;
        if (!o(e) && !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1])) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (0 !== e) {
            for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++)
                if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider (" + lt + "): 'padding' option must be a positive number(s).");
            var n = e[0] + e[1],
                i = t.spectrum.xVal[0];
            if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i)) throw new Error("noUiSlider (" + lt + "): 'padding' option must not exceed 100% of the range.")
        }
    }

    function U(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'direction' option was not recognized.")
        }
    }

    function A(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider (" + lt + "): 'behaviour' must be a string containing options.");
        var r = 0 <= e.indexOf("tap"),
            n = 0 <= e.indexOf("drag"),
            i = 0 <= e.indexOf("fixed"),
            o = 0 <= e.indexOf("snap"),
            s = 0 <= e.indexOf("hover"),
            a = 0 <= e.indexOf("unconstrained");
        if (i) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + lt + "): 'fixed' behaviour must be used with 2 handles");
            P(t, t.start[1] - t.start[0])
        }
        if (a && (t.margin || t.limit)) throw new Error("noUiSlider (" + lt + "): 'unconstrained' behaviour cannot be used with margin or limit");
        t.events = {
            tap: r || o,
            drag: n,
            fixed: i,
            snap: o,
            hover: s,
            unconstrained: a
        }
    }

    function V(t, e) {
        if (!1 !== e)
            if (!0 === e) {
                t.tooltips = [];
                for (var r = 0; r < t.handles; r++) t.tooltips.push(!0)
            } else {
                if (t.tooltips = dt(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + lt + "): must pass a formatter for all handles.");
                t.tooltips.forEach(function(t) {
                    if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + lt + "): 'tooltips' must be passed a formatter or 'false'.")
                })
            }
    }

    function D(t, e) {
        h(t.ariaFormat = e)
    }

    function M(t, e) {
        h(t.format = e)
    }

    function O(t, e) {
        if ("boolean" != typeof(t.keyboardSupport = e)) throw new Error("noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean.")
    }

    function L(t, e) {
        t.documentElement = e
    }

    function z(t, e) {
        if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e
    }

    function H(t, e) {
        if ("object" != typeof e) throw new Error("noUiSlider (" + lt + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix)
            for (var r in t.cssClasses = {}, e) e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]);
        else t.cssClasses = e
    }

    function vt(e) {
        var r = {
                margin: 0,
                limit: 0,
                padding: 0,
                animate: !0,
                animationDuration: 300,
                ariaFormat: u,
                format: u
            },
            n = {
                step: {
                    r: !1,
                    t: m
                },
                keyboardPageMultiplier: {
                    r: !1,
                    t: g
                },
                keyboardDefaultStep: {
                    r: !1,
                    t: v
                },
                start: {
                    r: !0,
                    t: x
                },
                connect: {
                    r: !0,
                    t: E
                },
                direction: {
                    r: !0,
                    t: U
                },
                snap: {
                    r: !1,
                    t: S
                },
                animate: {
                    r: !1,
                    t: w
                },
                animationDuration: {
                    r: !1,
                    t: y
                },
                range: {
                    r: !0,
                    t: b
                },
                orientation: {
                    r: !1,
                    t: C
                },
                margin: {
                    r: !1,
                    t: P
                },
                limit: {
                    r: !1,
                    t: N
                },
                padding: {
                    r: !1,
                    t: k
                },
                behaviour: {
                    r: !0,
                    t: A
                },
                ariaFormat: {
                    r: !1,
                    t: D
                },
                format: {
                    r: !1,
                    t: M
                },
                tooltips: {
                    r: !1,
                    t: V
                },
                keyboardSupport: {
                    r: !0,
                    t: O
                },
                documentElement: {
                    r: !1,
                    t: L
                },
                cssPrefix: {
                    r: !0,
                    t: z
                },
                cssClasses: {
                    r: !0,
                    t: H
                }
            },
            i = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: d,
                keyboardPageMultiplier: 5,
                keyboardDefaultStep: 10
            };
        e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach(function(t) {
            if (!a(e[t]) && void 0 === i[t]) {
                if (n[t].r) throw new Error("noUiSlider (" + lt + "): '" + t + "' is required.");
                return !0
            }
            n[t].t(r, a(e[t]) ? e[t] : i[t])
        }), r.pips = e.pips;
        var t = document.createElement("div"),
            o = void 0 !== t.style.msTransform,
            s = void 0 !== t.style.transform;
        r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform";
        return r.style = [
            ["left", "top"],
            ["right", "bottom"]
        ][r.dir][r.ort], r
    }

    function j(t, b, o) {
        var l, u, s, c, i, a, e, p, f = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            },
            d = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function() {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function() {
                            t = !0
                        }
                    });
                    window.addEventListener("test", null, e)
                } catch (t) {}
                return t
            }(),
            h = t,
            y = b.spectrum,
            x = [],
            S = [],
            m = [],
            g = 0,
            v = {},
            w = t.ownerDocument,
            E = b.documentElement || w.documentElement,
            C = w.body,
            P = -1,
            N = 0,
            k = 1,
            U = 2,
            A = "rtl" === w.dir || 1 === b.ort ? 0 : 100;

        function V(t, e) {
            var r = w.createElement("div");
            return e && ht(r, e), t.appendChild(r), r
        }

        function D(t, e) {
            var r = V(t, b.cssClasses.origin),
                n = V(r, b.cssClasses.handle);
            return V(n, b.cssClasses.touchArea), n.setAttribute("data-handle", e), b.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function(t) {
                return function(t, e) {
                    if (O() || L(e)) return !1;
                    var r = ["Left", "Right"],
                        n = ["Down", "Up"],
                        i = ["PageDown", "PageUp"],
                        o = ["Home", "End"];
                    b.dir && !b.ort ? r.reverse() : b.ort && !b.dir && (n.reverse(), i.reverse());
                    var s, a = t.key.replace("Arrow", ""),
                        l = a === i[0],
                        u = a === i[1],
                        c = a === n[0] || a === r[0] || l,
                        p = a === n[1] || a === r[1] || u,
                        f = a === o[0],
                        d = a === o[1];
                    if (!(c || p || f || d)) return !0;
                    if (t.preventDefault(), p || c) {
                        var h = b.keyboardPageMultiplier,
                            m = c ? 0 : 1,
                            g = at(e),
                            v = g[m];
                        if (null === v) return !1;
                        !1 === v && (v = y.getDefaultStep(S[e], c, b.keyboardDefaultStep)), (u || l) && (v *= h), v = Math.max(v, 1e-7), v *= c ? -1 : 1, s = x[e] + v
                    } else s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0];
                    return rt(e, y.toStepping(s), !0, !0), J("slide", e), J("update", e), J("change", e), J("set", e), !1
                }(t, e)
            })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"), 0 === e ? ht(n, b.cssClasses.handleLower) : e === b.handles - 1 && ht(n, b.cssClasses.handleUpper), r
        }

        function M(t, e) {
            return !!e && V(t, b.cssClasses.connect)
        }

        function r(t, e) {
            return !!b.tooltips[e] && V(t.firstChild, b.cssClasses.tooltip)
        }

        function O() {
            return h.hasAttribute("disabled")
        }

        function L(t) {
            return u[t].hasAttribute("disabled")
        }

        function z() {
            i && (G("update.tooltips"), i.forEach(function(t) {
                t && ut(t)
            }), i = null)
        }

        function H() {
            z(), i = u.map(r), $("update.tooltips", function(t, e, r) {
                if (i[e]) {
                    var n = t[e];
                    !0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])), i[e].innerHTML = n
                }
            })
        }

        function j(e, i, o) {
            var s = w.createElement("div"),
                a = [];
            a[N] = b.cssClasses.valueNormal, a[k] = b.cssClasses.valueLarge, a[U] = b.cssClasses.valueSub;
            var l = [];
            l[N] = b.cssClasses.markerNormal, l[k] = b.cssClasses.markerLarge, l[U] = b.cssClasses.markerSub;
            var u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical],
                c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical];

            function p(t, e) {
                var r = e === b.cssClasses.value,
                    n = r ? a : l;
                return e + " " + (r ? u : c)[b.ort] + " " + n[t]
            }
            return ht(s, b.cssClasses.pips), ht(s, 0 === b.ort ? b.cssClasses.pipsHorizontal : b.cssClasses.pipsVertical), Object.keys(e).forEach(function(t) {
                ! function(t, e, r) {
                    if ((r = i ? i(e, r) : r) !== P) {
                        var n = V(s, !1);
                        n.className = p(r, b.cssClasses.marker), n.style[b.style] = t + "%", N < r && ((n = V(s, !1)).className = p(r, b.cssClasses.value), n.setAttribute("data-value", e), n.style[b.style] = t + "%", n.innerHTML = o.to(e))
                    }
                }(t, e[t][0], e[t][1])
            }), s
        }

        function F() {
            c && (ut(c), c = null)
        }

        function R(t) {
            F();
            var m, g, v, b, e, r, x, S, w, n = t.mode,
                i = t.density || 1,
                o = t.filter || !1,
                s = function(t, e, r) {
                    if ("range" === t || "steps" === t) return y.xVal;
                    if ("count" === t) {
                        if (e < 2) throw new Error("noUiSlider (" + lt + "): 'values' (>= 2) required for mode 'count'.");
                        var n = e - 1,
                            i = 100 / n;
                        for (e = []; n--;) e[n] = n * i;
                        e.push(100), t = "positions"
                    }
                    return "positions" === t ? e.map(function(t) {
                        return y.fromStepping(r ? y.getStep(t) : t)
                    }) : "values" === t ? r ? e.map(function(t) {
                        return y.fromStepping(y.getStep(y.toStepping(t)))
                    }) : e : void 0
                }(n, t.values || !1, t.stepped || !1),
                a = (m = i, g = n, v = s, b = {}, e = y.xVal[0], r = y.xVal[y.xVal.length - 1], S = x = !1, w = 0, (v = v.slice().sort(function(t, e) {
                    return t - e
                }).filter(function(t) {
                    return !this[t] && (this[t] = !0)
                }, {}))[0] !== e && (v.unshift(e), x = !0), v[v.length - 1] !== r && (v.push(r), S = !0), v.forEach(function(t, e) {
                    var r, n, i, o, s, a, l, u, c, p, f = t,
                        d = v[e + 1],
                        h = "steps" === g;
                    if (h && (r = y.xNumSteps[e]), r || (r = d - f), !1 !== f)
                        for (void 0 === d && (d = f), r = Math.max(r, 1e-7), n = f; n <= d; n = (n + r).toFixed(7) / 1) {
                            for (u = (s = (o = y.toStepping(n)) - w) / m, p = s / (c = Math.round(u)), i = 1; i <= c; i += 1) b[(a = w + i * p).toFixed(5)] = [y.fromStepping(a), 0];
                            l = -1 < v.indexOf(n) ? k : h ? U : N, !e && x && n !== d && (l = 0), n === d && S || (b[o.toFixed(5)] = [n, l]), w = o
                        }
                }), b),
                l = t.format || {
                    to: Math.round
                };
            return c = h.appendChild(j(a, o, l))
        }

        function T() {
            var t = l.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][b.ort];
            return 0 === b.ort ? t.width || l[e] : t.height || l[e]
        }

        function B(n, i, o, s) {
            var e = function(t) {
                    return !!(t = function(t, e, r) {
                        var n, i, o = 0 === t.type.indexOf("touch"),
                            s = 0 === t.type.indexOf("mouse"),
                            a = 0 === t.type.indexOf("pointer");
                        0 === t.type.indexOf("MSPointer") && (a = !0);
                        if ("mousedown" === t.type && !t.buttons && !t.touches) return !1;
                        if (o) {
                            var l = function(t) {
                                return t.target === r || r.contains(t.target) || t.target.shadowRoot && t.target.shadowRoot.contains(r)
                            };
                            if ("touchstart" === t.type) {
                                var u = Array.prototype.filter.call(t.touches, l);
                                if (1 < u.length) return !1;
                                n = u[0].pageX, i = u[0].pageY
                            } else {
                                var c = Array.prototype.find.call(t.changedTouches, l);
                                if (!c) return !1;
                                n = c.pageX, i = c.pageY
                            }
                        }
                        e = e || gt(w), (s || a) && (n = t.clientX + e.x, i = t.clientY + e.y);
                        return t.pageOffset = e, t.points = [n, i], t.cursor = s || a, t
                    }(t, s.pageOffset, s.target || i)) && (!(O() && !s.doNotReject) && (e = h, r = b.cssClasses.tap, !((e.classList ? e.classList.contains(r) : new RegExp("\\b" + r + "\\b").test(e.className)) && !s.doNotReject) && (!(n === f.start && void 0 !== t.buttons && 1 < t.buttons) && ((!s.hover || !t.buttons) && (d || t.preventDefault(), t.calcPoint = t.points[b.ort], void o(t, s))))));
                    var e, r
                },
                r = [];
            return n.split(" ").forEach(function(t) {
                i.addEventListener(t, e, !!d && {
                    passive: !0
                }), r.push([t, e])
            }), r
        }

        function q(t) {
            var e, r, n, i, o, s, a = 100 * (t - (e = l, r = b.ort, n = e.getBoundingClientRect(), i = e.ownerDocument, o = i.documentElement, s = gt(i), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0), r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft)) / T();
            return a = ft(a), b.dir ? 100 - a : a
        }

        function X(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e)
        }

        function Y(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e);
            var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            Z(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers)
        }

        function _(t, e) {
            e.handle && (mt(e.handle, b.cssClasses.active), g -= 1), e.listeners.forEach(function(t) {
                E.removeEventListener(t[0], t[1])
            }), 0 === g && (mt(h, b.cssClasses.drag), et(), t.cursor && (C.style.cursor = "", C.removeEventListener("selectstart", ct))), e.handleNumbers.forEach(function(t) {
                J("change", t), J("set", t), J("end", t)
            })
        }

        function I(t, e) {
            if (e.handleNumbers.some(L)) return !1;
            var r;
            1 === e.handleNumbers.length && (r = u[e.handleNumbers[0]].children[0], g += 1, ht(r, b.cssClasses.active));
            t.stopPropagation();
            var n = [],
                i = B(f.move, E, Y, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    startCalcPoint: t.calcPoint,
                    baseSize: T(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: S.slice()
                }),
                o = B(f.end, E, _, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                }),
                s = B("mouseout", E, X, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                });
            n.push.apply(n, i.concat(o, s)), t.cursor && (C.style.cursor = getComputedStyle(t.target).cursor, 1 < u.length && ht(h, b.cssClasses.drag), C.addEventListener("selectstart", ct, !1)), e.handleNumbers.forEach(function(t) {
                J("start", t)
            })
        }

        function n(t) {
            t.stopPropagation();
            var i, o, s, e = q(t.calcPoint),
                r = (i = e, s = !(o = 100), u.forEach(function(t, e) {
                    if (!L(e)) {
                        var r = S[e],
                            n = Math.abs(r - i);
                        (n < o || n <= o && r < i || 100 === n && 100 === o) && (s = e, o = n)
                    }
                }), s);
            if (!1 === r) return !1;
            b.events.snap || pt(h, b.cssClasses.tap, b.animationDuration), rt(r, e, !0, !0), et(), J("slide", r, !0), J("update", r, !0), J("change", r, !0), J("set", r, !0), b.events.snap && I(t, {
                handleNumbers: [r]
            })
        }

        function W(t) {
            var e = q(t.calcPoint),
                r = y.getStep(e),
                n = y.fromStepping(r);
            Object.keys(v).forEach(function(t) {
                "hover" === t.split(".")[0] && v[t].forEach(function(t) {
                    t.call(a, n)
                })
            })
        }

        function $(t, e) {
            v[t] = v[t] || [], v[t].push(e), "update" === t.split(".")[0] && u.forEach(function(t, e) {
                J("update", e)
            })
        }

        function G(t) {
            var n = t && t.split(".")[0],
                i = n && t.substring(n.length);
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0],
                    r = t.substring(e.length);
                n && n !== e || i && i !== r || delete v[t]
            })
        }

        function J(r, n, i) {
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0];
                r === e && v[t].forEach(function(t) {
                    t.call(a, x.map(b.format.to), n, x.slice(), i || !1, S.slice(), a)
                })
            })
        }

        function K(t, e, r, n, i, o) {
            var s;
            return 1 < u.length && !b.events.unconstrained && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.margin, 0), r = Math.max(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.margin, 1), r = Math.min(r, s))), 1 < u.length && b.limit && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.limit, 0), r = Math.min(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.limit, 1), r = Math.max(r, s))), b.padding && (0 === e && (s = y.getAbsoluteDistance(0, b.padding[0], 0), r = Math.max(r, s)), e === u.length - 1 && (s = y.getAbsoluteDistance(100, b.padding[1], 1), r = Math.min(r, s))), !((r = ft(r = y.getStep(r))) === t[e] && !o) && r
        }

        function Q(t, e) {
            var r = b.ort;
            return (r ? e : t) + ", " + (r ? t : e)
        }

        function Z(t, n, r, e) {
            var i = r.slice(),
                o = [!t, t],
                s = [t, !t];
            e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function(t, e) {
                var r = K(i, t, i[t] + n, o[e], s[e], !1);
                !1 === r ? n = 0 : (n = r - i[t], i[t] = r)
            }) : o = s = [!0];
            var a = !1;
            e.forEach(function(t, e) {
                a = rt(t, r[t] + n, o[e], s[e]) || a
            }), a && e.forEach(function(t) {
                J("update", t), J("slide", t)
            })
        }

        function tt(t, e) {
            return b.dir ? 100 - t - e : t
        }

        function et() {
            m.forEach(function(t) {
                var e = 50 < S[t] ? -1 : 1,
                    r = 3 + (u.length + e * t);
                u[t].style.zIndex = r
            })
        }

        function rt(t, e, r, n, i) {
            return i || (e = K(S, t, e, r, n, !1)), !1 !== e && (function(t, e) {
                S[t] = e, x[t] = y.fromStepping(e);
                var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")";
                u[t].style[b.transformRule] = r, nt(t), nt(t + 1)
            }(t, e), !0)
        }

        function nt(t) {
            if (s[t]) {
                var e = 0,
                    r = 100;
                0 !== t && (e = S[t - 1]), t !== s.length - 1 && (r = S[t]);
                var n = r - e,
                    i = "translate(" + Q(tt(e, n) + "%", "0") + ")",
                    o = "scale(" + Q(n / 100, "1") + ")";
                s[t].style[b.transformRule] = i + " " + o
            }
        }

        function it(t, e) {
            return null === t || !1 === t || void 0 === t ? S[e] : ("number" == typeof t && (t = String(t)), t = b.format.from(t), !1 === (t = y.toStepping(t)) || isNaN(t) ? S[e] : t)
        }

        function ot(t, e, r) {
            var n = dt(t),
                i = void 0 === S[0];
            e = void 0 === e || !!e, b.animate && !i && pt(h, b.cssClasses.tap, b.animationDuration), m.forEach(function(t) {
                rt(t, it(n[t], t), !0, !1, r)
            });
            for (var o = 1 === m.length ? 0 : 1; o < m.length; ++o) m.forEach(function(t) {
                rt(t, S[t], !0, !0, r)
            });
            et(), m.forEach(function(t) {
                J("update", t), null !== n[t] && e && J("set", t)
            })
        }

        function st() {
            var t = x.map(b.format.to);
            return 1 === t.length ? t[0] : t
        }

        function at(t) {
            var e = S[t],
                r = y.getNearbySteps(e),
                n = x[t],
                i = r.thisStep.step,
                o = null;
            if (b.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
            !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (o = null);
            var s = y.countStepDecimals();
            return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), [o, i]
        }
        return ht(e = h, b.cssClasses.target), 0 === b.dir ? ht(e, b.cssClasses.ltr) : ht(e, b.cssClasses.rtl), 0 === b.ort ? ht(e, b.cssClasses.horizontal) : ht(e, b.cssClasses.vertical), ht(e, "rtl" === getComputedStyle(e).direction ? b.cssClasses.textDirectionRtl : b.cssClasses.textDirectionLtr), l = V(e, b.cssClasses.base),
            function(t, e) {
                var r = V(e, b.cssClasses.connects);
                u = [], (s = []).push(M(r, t[0]));
                for (var n = 0; n < b.handles; n++) u.push(D(e, n)), m[n] = n, s.push(M(r, t[n + 1]))
            }(b.connect, l), (p = b.events).fixed || u.forEach(function(t, e) {
                B(f.start, t.children[0], I, {
                    handleNumbers: [e]
                })
            }), p.tap && B(f.start, l, n, {}), p.hover && B(f.move, l, W, {
                hover: !0
            }), p.drag && s.forEach(function(t, e) {
                if (!1 !== t && 0 !== e && e !== s.length - 1) {
                    var r = u[e - 1],
                        n = u[e],
                        i = [t];
                    ht(t, b.cssClasses.draggable), p.fixed && (i.push(r.children[0]), i.push(n.children[0])), i.forEach(function(t) {
                        B(f.start, t, I, {
                            handles: [r, n],
                            handleNumbers: [e - 1, e]
                        })
                    })
                }
            }), ot(b.start), b.pips && R(b.pips), b.tooltips && H(), $("update", function(t, e, s, r, a) {
                m.forEach(function(t) {
                    var e = u[t],
                        r = K(S, t, 0, !0, !0, !0),
                        n = K(S, t, 100, !0, !0, !0),
                        i = a[t],
                        o = b.ariaFormat.to(s[t]);
                    r = y.fromStepping(r).toFixed(1), n = y.fromStepping(n).toFixed(1), i = y.fromStepping(i).toFixed(1), e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", o)
                })
            }), a = {
                destroy: function() {
                    for (var t in b.cssClasses) b.cssClasses.hasOwnProperty(t) && mt(h, b.cssClasses[t]);
                    for (; h.firstChild;) h.removeChild(h.firstChild);
                    delete h.noUiSlider
                },
                steps: function() {
                    return m.map(at)
                },
                on: $,
                off: G,
                get: st,
                set: ot,
                setHandle: function(t, e, r, n) {
                    if (!(0 <= (t = Number(t)) && t < m.length)) throw new Error("noUiSlider (" + lt + "): invalid handle number, got: " + t);
                    rt(t, it(e, t), !0, !0, n), J("update", t), r && J("set", t)
                },
                reset: function(t) {
                    ot(b.start, t)
                },
                __moveHandles: function(t, e, r) {
                    Z(t, e, S, r)
                },
                options: o,
                updateOptions: function(e, t) {
                    var r = st(),
                        n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                    n.forEach(function(t) {
                        void 0 !== e[t] && (o[t] = e[t])
                    });
                    var i = vt(o);
                    n.forEach(function(t) {
                        void 0 !== e[t] && (b[t] = i[t])
                    }), y = i.spectrum, b.margin = i.margin, b.limit = i.limit, b.padding = i.padding, b.pips ? R(b.pips) : F(), b.tooltips ? H() : z(), S = [], ot(e.start || r, t)
                },
                target: h,
                removePips: F,
                removeTooltips: z,
                getTooltips: function() {
                    return i
                },
                getOrigins: function() {
                    return u
                },
                pips: R
            }
    }
    return {
        __spectrum: i,
        version: lt,
        cssClasses: d,
        create: function(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + lt + "): create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider (" + lt + "): Slider was already initialized.");
            var r = j(t, vt(e), e);
            return t.noUiSlider = r
        }
    }
});

/* ==== INCLUDE: /js/blocks/maps.js ==== */


window.mapboxJsLoaded = false
window.mapboxCssLoaded = false

function initMaps() {
    _G.maps = []

    // const BG_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAZUlEQVQ4T+2TQQ7AIAgEl88WnyR+lgbSNGotCT31IEezs+IkEgDFxyGDVfM8EWHDCetbWEKWRX8grN9YasXB/HhEEwGXMpzbx5hH54IOHPIr2MrugjfQpQWSveBadZmLYN8guuAEQo5PBQyQLMoAAAAASUVORK5CYII="
    // const BG_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAL0lEQVQ4T2NkYGD4z0AmYARp/v+fdP2MjIwMo5pJCPXRACMhsEBKB0GAkehiuHIAy842AX0JUPAAAAAASUVORK5CYII="
    const BG_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAPAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgAI/8QAJRAAAQMEAQQCAwAAAAAAAAAAAQIDBAUGBxEUAAgSExUxISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN54ixFYtSxPZUyZZdvSpciiQnXn36UwtxxamEFSlKKNkkkkk/e+iXdZi+zbdwHdFQpVpUKmT2eL6pUOmssuo3KZSfFaUgjYJB0fokdWL+6zFtu40tKlVC6OPPg0iJFkM/HyleDiGUJWnaWiDogjYJHRnuT7k8cX/hW4qDQbi59Wl8b0x+DJb8/GS0tX7LbCRpKVH8n+dB//2Q=="

    const sources = document.querySelectorAll('[data-rel=block-map]')
    const promises = []

    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(entry => {
            const map = entry && entry.target && entry.target['__map']
            if (map) {
                try {
                    map.resize()
                } catch (e) {
                    console.warn('ERROR in maps', e)
                }
            }
        })
    })

    function addMarker(map, marker) {
        // console.log('to add marker', marker)
        var m = new mapboxgl.Marker({
            color: "#d9534f"
        }).setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])

        try {
            m.getElement().setAttribute('data-id', marker.id)
        } catch (e) {
            console.error(e)
        }

        if (marker.properties && marker.properties.label) {

            try {
                m.getElement().setAttribute('data-label', marker.properties.label)
            } catch (e) {
                console.error(e)
            }

            const popup = new mapboxgl.Popup({
                offset: 25,
                focusAfterOpen: false
            })
            if (marker.properties.link) {
                const link = document.createElement('a')
                link.setAttribute('href', marker.properties.link)
                link.innerText = marker.properties.label
                if (marker.properties.openInNewWindow) {
                    link.setAttribute('target', '_blank')
                }
                popup.setHTML(link.outerHTML)

                m.getElement().classList.add("has-link")
            } else {
                popup.setText(
                    `${marker.properties.label}`
                )
            }
            m.setPopup(popup)
        }
        m.addTo(map);
        if (marker.properties && !marker.properties.hideInitially) {
            m.togglePopup();
        }
        return m
    }

    function addMarkers(map, geojson) {

        // console.log( 'to add markers', geojson )
        geojson.__markers = {}
        geojson.__markerDefs = {}
        geojson.features.forEach(f => {
            if (f.geometry && f.geometry.type === 'Point') {
                const marker = addMarker(map, f)
                geojson.__markers[f.id] = marker
                geojson.__markerDefs[f.id] = f
            }
        })
    }


    function hideAllMarkers(geojson) {
        Object.keys(geojson.__markers || {}).forEach(key => {
            const m = geojson.__markers[key]
            const p = m.getPopup()
            if (p && p.isOpen()) {
                // p.remove()
                try {
                    // p.getElement().style.opacity = '0'
                    // setTimeout(() => {
                    m.togglePopup()
                    // }, 200)
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }

    function showAllMarkers(geojson) {
        Object.keys(geojson.__markers || {}).forEach(key => {
            const m = geojson.__markers[key]
            const p = m.getPopup()
            if (p && !p.isOpen()) {
                try {
                    m.togglePopup()
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }

    function restoreAllMarkers(geojson) {
        Object.keys(geojson.__markers || {}).forEach(key => {
            const m = geojson.__markers[key]
            const p = m.getPopup()
            if (p && !p.isOpen()) {
                try {
                    m.togglePopup()
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }


    if (sources.length > 0) {
        promises.push(new Promise((resolve, reject) => {
            if (window.mapboxJsLoaded) {
                window.mapboxJsLoaded = true
                return resolve()
            }
            // LazyLoad.js( "https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js", () => {
            //     resolve()
            // })
            LazyLoad.js("https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js", () => {
                resolve()
            })
            // LazyLoad.js( "https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0-beta.1/mapbox-gl.js", () => {
            //     resolve()
            // })
        }))
        promises.push(new Promise((resolve, reject) => {
            if (window.mapboxCssLoaded) {
                return resolve()
            }
            // LazyLoad.css( "https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css", () => {
            //     window.mapboxCssLoaded = true
            //     resolve()
            // })
            LazyLoad.css("https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css", () => {
                window.mapboxCssLoaded = true
                resolve()
            })
            // LazyLoad.css( "https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0-beta.1/mapbox-gl.css", () => {
            //     window.mapboxCssLoaded = true
            //     resolve()
            // })
        }))
        Promise.all(promises).then(() => {
            sources.forEach(source => {
                try {
                    const jsonSource = source.querySelector('script')
                    if (!jsonSource) {
                        return
                    }
                    const json = JSON.parse(jsonSource.innerHTML)
                    mapboxgl.accessToken = json.key
                    source.innerHTML = ''

                    // this is dumb by mapbox doesn't recognize non-numeric IDs on features
                    let id = 1
                    json.geoJson.features = json.geoJson.features.map(f => ({
                        ...f,
                        id: ++id,
                        state: {
                            hover: false
                        },
                    }))

                    console.log('geojson', json.geoJson)

                    const map = new mapboxgl.Map({
                        container: source,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [json.centerLng, json.centerLat],
                        zoom: json.zoom,
                        pitch: json.pitch,
                        scrollZoom: false,
                        attributionControl: false,
                        trackResize: true,
                        cooperativeGestures: true,
                    })
                    const nav = new mapboxgl.NavigationControl();
                    map.addControl(nav, 'top-left');
                    source['__map'] = map
                    resizeObserver.observe(source)
                    map.on('load', () => {
                        map.loadImage(BG_IMG, (error, image) => {
                            console.log('loaded image', image, error)
                            map.addImage('mrp_label_bg', image, {
                                content: [3, 3, 13, 13],
                                stretchX: [
                                    [3, 5],
                                    [10, 12]
                                ],
                                stretchY: [
                                    [3, 5],
                                    [8, 13]
                                ]
                            })

                            map.addSource('data', {
                                type: 'geojson',
                                data: json.geoJson,
                            })
                            map.addLayer({
                                id: 'line',
                                source: 'data',
                                type: 'line',
                                filter: ['==', ['geometry-type'], 'LineString'],
                                layout: {
                                    'line-cap': 'round',
                                    'line-join': 'round'
                                },
                                paint: {
                                    'line-color': '#3e81a9',
                                    'line-width': 2,
                                }
                            })
                            map.addLayer({
                                id: 'polygon-fill',
                                source: 'data',
                                type: 'fill',
                                filter: ['==', ['geometry-type'], 'Polygon'],
                                paint: {
                                    'fill-color': '#3e81a9',
                                    'fill-outline-color': '#3e81a9',
                                    // 'fill-opacity': 0.1
                                    'fill-opacity': [
                                        'case', ['==', ['feature-state', 'hover'], true],
                                        0.3,
                                        0.1
                                    ]
                                }
                            })
                            map.addLayer({
                                id: 'polygon-line',
                                source: 'data',
                                type: 'line',
                                filter: ['==', ['geometry-type'], 'Polygon'],
                                layout: {
                                    'line-cap': 'round',
                                    'line-join': 'round'
                                },
                                paint: {
                                    'line-color': '#3e81a9',
                                    // 'line-width': 2
                                    'line-width': [
                                        'case', ['==', ['feature-state', 'hover'], true],
                                        5,
                                        2
                                    ]
                                }
                            })
                            map.addLayer({
                                id: 'marker-halo',
                                source: 'data',
                                type: 'circle',
                                filter: ['==', ['geometry-type'], 'Point'],
                                paint: {
                                    'circle-radius': 9,
                                    'circle-opacity': 1,
                                    // 'circle-color': '#fff',
                                    'circle-color': 'transparent' // making transparent
                                },
                            })
                            map.addLayer({
                                id: 'marker',
                                source: 'data',
                                type: 'circle',
                                filter: ['==', ['geometry-type'], 'Point'],
                                paint: {
                                    'circle-radius': 20,
                                    'circle-opacity': 1,
                                    // 'circle-color': '#3e81a9',
                                    'circle-color': 'transparent' // making transparent
                                },
                            })
                            // map.addLayer({
                            //     id: 'marker-label',
                            //     source: 'data',
                            //     type: 'symbol',
                            //     filter: ['all', ['has', 'label'], ['!=', 'label', '']],
                            //     paint: {
                            //         'text-halo-color': '#fff',
                            //         'text-halo-width': 2,
                            //         'text-halo-blur': 2,
                            //         // 'text-color': '#3e81a9',
                            //         'text-color': '#333333',
                            //     },
                            //     layout: {
                            //         'text-field': ['get', 'label'],
                            //         'text-font': [
                            //             'Open Sans Semibold',
                            //         ],
                            //         'text-offset': [0, -3],
                            //         'text-anchor': 'bottom',
                            //         'text-size': 16,
                            //         'text-allow-overlap': true,
                            //         'text-ignore-placement': true,
                            //         'text-variable-anchor': ['bottom', 'top'],
                            //         'text-justify': 'auto',
                            //         'icon-image' : 'mrp_label_bg',
                            //         'icon-text-fit' : 'both',
                            //         'icon-text-fit-padding': [8,8,8,8],
                            //     }
                            // })
                            addMarkers(map, json.geoJson)

                            map.on('click', 'polygon-fill', e => {
                                // console.log( 'click on', e, e.features )
                                if (e.features && e.features[0]) {
                                    const props = e.features[0].properties || {}
                                    if (props.link) {
                                        if (props.openInNewWindow) {
                                            window.open(props.link, '_blank')
                                        } else {
                                            window.location = props.link
                                        }
                                    }
                                }
                            })
                            let hoverId = -1;
                            map.on('mousemove', 'polygon-fill', e => {
                                // console.log( 'hoverId', hoverId )
                                if (e.features && e.features[0]) {
                                    const props = e.features[0].properties || {}
                                    if (props.link) {
                                        if (hoverId >= 0) {
                                            map.setFeatureState({
                                                source: 'data',
                                                id: hoverId
                                            }, {
                                                hover: false
                                            })
                                        }
                                        hoverId = e.features[0].id
                                        map.setFeatureState({
                                            source: 'data',
                                            id: hoverId
                                        }, {
                                            hover: true
                                        })
                                        map.getCanvas().style.cursor = 'pointer'
                                    }
                                }
                            })
                            map.on('mouseleave', 'polygon-fill', e => {
                                // console.log( 'mouse out', e )
                                map.getCanvas().style.cursor = ''
                                if (hoverId >= 0) {
                                    map.setFeatureState({
                                        source: 'data',
                                        id: hoverId
                                    }, {
                                        hover: false
                                    })
                                    hoverId = -1
                                }
                                // console.log( 'hoverId', hoverId )
                            })
                            map.on('click', e => {
                                //showAllMarkers(json.geoJson)
                            })
                            map.on('mouseleave', 'marker', e => {
                                //showAllMarkers(json.geoJson)
                            })
                            // let hoverPopup = null;
                            map.on('mouseenter', 'marker', e => {
                                if (e.features && e.features[0]) {
                                    // console.log( 'marker', json.geoJson.__markers[e.features[0].id] )
                                    // if( hoverPopup ) {
                                    //     hoverPopup.remove()
                                    //     hoverPopup = null;
                                    // }
                                    hideAllMarkers(json.geoJson)
                                    const marker = json.geoJson.__markers[e.features[0].id]
                                    if (marker) {
                                        const popup = marker.getPopup()
                                        if (popup && !popup.isOpen()) {
                                            // popup.addTo(map)
                                            // hoverPopup = popup
                                            marker.togglePopup()
                                        }
                                    }
                                }
                            })
                            // setTimeout(() => {
                            //     map.resize()
                            // }, 1000)
                            // map.on( 'mouseleave', 'marker', e => {
                            //     if( hoverPopup ) {
                            //         hoverPopup.remove()
                            //         hoverPopup = null;
                            //     }
                            // })
                        })
                    })
                    //console.log( 'geoJSON', json )
                } catch (e) {
                    console.error('Failed to init maps', e)
                }
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMaps()

    _G.reinitHandlers.push(initMaps)
});

/* ==== INCLUDE: /js/blocks/flslider.js ==== */

;
(function() {

    class Fade {
        /**
         * @param - The selector of the element to which the fade effect is to be applied. If the selector is blank, it applies to panel element. <ko>Fade 효과를 적용할 대상의 선택자. 선택자가 공백이면 패널 엘리먼트에 적용된다.</ko>
         * @param - Effect amplication scale <ko>효과 증폭도</ko>
         * @example
         * flicking.addPlugins(new eg.Flicking.plugins.Fade("p", 1));
         */
        constructor(selector = "", scale = 1) {
            this.selector = selector;
            this.scale = scale;
            this.onMove = (e) => {
                this.move(e.currentTarget);
            };
        }
        init(flicking) {
            flicking.on("move", this.onMove);
            this.move(flicking);
        }
        update(flicking) {
            this.move(flicking);
        }
        destroy(flicking) {
            flicking.off("move", this.onMove);
        }
        move(flicking) {
            const panels = flicking.getVisiblePanels();
            const selector = this.selector;
            const scale = this.scale;
            panels.forEach(panel => {
                const progress = panel.getOutsetProgress();
                const el = panel.getElement();
                const target = selector ? el.querySelector(selector) : el;
                const opacity = Math.min(1, Math.max(0, (1 - Math.abs(progress * scale))));
                target.style.opacity = `${opacity}`;
            });
        }
    }


    const DEFAULT_OPTION = {
        duration: 5000,
        direction: "NEXT",
        stopOnHover: true,
    };
    /**
     * Plugin that allow you to automatically move to the next/previous panel, on a specific time basis
     * @ko 일정 시간마다, 자동으로 다음/이전 패널로 넘어가도록 할 수 있는 플러그인
     * @memberof eg.Flicking.plugins
     */
    class AutoPlay {
        /**
         * @param options Options for the AutoPlay instance.<ko>AutoPlay 옵션</ko>
         * @param options.duration Time to wait before moving on to the next panel.<ko>다음 패널로 움직이기까지 대기 시간</ko>
         * @param options.direction The direction in which the panel moves.<ko>패널이 움직이는 방향</ko>
         * @param options.stopOnHover Whether to stop when mouse hover upon the element.<ko>엘리먼트에 마우스를 올렸을 때 AutoPlay를 정지할지 여부</ko>
         * @example
         * flicking.addPlugins(new eg.Flicking.plugins.AutoPlay(2000, "NEXT"));
         */
        constructor(options = DEFAULT_OPTION, direction = DEFAULT_OPTION.direction) {
            /* Internal Values */
            this.flicking = null;
            this.timerId = 0;
            this.onPlay = (e) => {
                this.play(e.currentTarget);
            };
            this.onStop = () => {
                // console.log( 'clearing timer', this.timerId)
                clearTimeout(this.timerId);
            };
            this.onMouseEnter = () => {
                this.onStop();
            };
            this.onMouseLeave = () => {
                this.play(this.flicking);
            };
            if (typeof options === "number") {
                // Fallback for previous interface
                this.duration = options;
                this.direction = direction;
                this.stopOnHover = DEFAULT_OPTION.stopOnHover;
                return;
            }
            const mergedOptions = Object.assign(Object.assign({}, DEFAULT_OPTION), options);
            const {
                duration,
                direction: dir,
                stopOnHover
            } = mergedOptions;
            this.duration = duration;
            this.direction = dir;
            this.stopOnHover = stopOnHover;
        }
        init(flicking) {
            flicking.on({
                move: this.onStop,
                holdStart: this.onStop,
                select: this.onPlay,
                moveEnd: this.onPlay,
            });
            this.flicking = flicking;
            if (this.stopOnHover) {
                const targetEl = this.flicking.getElement();
                targetEl.addEventListener("mouseenter", this.onMouseEnter, false);
                targetEl.addEventListener("mouseleave", this.onMouseLeave, false);
            }
            this.play(flicking);
        }
        destroy(flicking) {
            this.onStop();
            flicking.off("moveStart", this.onStop);
            flicking.off("holdStart", this.onStop);
            flicking.off("moveEnd", this.onPlay);
            flicking.off("select", this.onPlay);
            const targetEl = flicking.getElement();
            targetEl.removeEventListener("mouseenter", this.onMouseEnter, false);
            targetEl.removeEventListener("mouseleave", this.onMouseLeave, false);
            this.flicking = null;
        }
        play(flicking) {
            this.onStop();
            this.timerId = window.setTimeout(() => {
                if (document.querySelector('html').classList.contains('editing')) {
                    return this.play(flicking)
                }
                if (flicking && flicking.viewport && flicking.viewport.viewportElement && flicking.viewport.viewportElement.parentElement &&
                    flicking.viewport.viewportElement.parentElement.hasAttribute('data-stopped')) {
                    return this.play(flicking)
                }
                //console.log( 'flicking current index', flicking.getIndex())
                //console.log( 'panel count', flicking.getVisiblePanels() )

                let visiblePanels = Math.max(1, flicking.getVisiblePanels().length - 2)
                // console.log( 'visible panels', visiblePanels)
                if (visiblePanels > 1) {
                    const index = flicking.getIndex()
                    const total = flicking.getPanelCount()
                    let nextIndex = index + visiblePanels
                    // console.log( 'play', index, total, nextIndex )
                    if (nextIndex >= total) {
                        nextIndex -= total
                    }
                    // console.log( 'final next', nextIndex)
                    flicking.moveTo(nextIndex)
                } else {
                    flicking[this.direction === "NEXT" ? "next" : "prev"]();
                }
                this.play(flicking);
            }, this.duration);
            // console.log( 'initiazing a timer', this.timerId)
        }
    }

    const Pagination = function(container) {
        var length = 0;
        var element;
        var itemTag;
        var items = [];

        return {
            update: function(flicking) {
                var prevLength = length;
                length = flicking.getPanelCount();

                if (prevLength < length) {
                    var fragment = document.createDocumentFragment();
                    for (var i = prevLength; i < length; ++i) {
                        (function(item) {
                            item.className += "pagination-item";
                            items.push(item);
                            item.addEventListener("click", function() {
                                flicking.moveTo(items.indexOf(item));
                                stopAutoPlay(flicking)
                            });
                            fragment.appendChild(item);
                        })(document.createElement(itemTag));
                    }
                    element.appendChild(fragment);
                }
                var selectedElement = element.querySelector(".selected");
                if (selectedElement) {
                    selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
                }
                items[flicking.getIndex()].className += " selected";
            },
            init: function(flicking) {
                element = typeof container === "object" ? container : document.querySelector(container);
                itemTag = element.nodeName === "UL" ? "li" : "div";

                flicking.on("moveEnd", function(e) {
                    var selectedElement = element.querySelector(".selected");
                    if (selectedElement) {
                        selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
                    }

                    items[flicking.getIndex()].className += " selected";
                });
                this.update(flicking);
            },
        };
    };
    // END OF PLUGINS


    const stopAutoPlay = (flicking) => {
        flicking && flicking.viewport && flicking.viewport.viewportElement && flicking.viewport.viewportElement.parentElement &&
            flicking.viewport.viewportElement.parentElement.setAttribute('data-stopped', '')
    }

    const intersectionObserver = new IntersectionObserver(entries => {

        //console.log( 'intersection observer', entries )

        if (document.querySelector('html').classList.contains('editing')) {
            return
        }

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.removeAttribute('data-stopped')
            } else {
                entry.target.setAttribute('data-stopped', '')
            }
        })
    })

    document.addEventListener('DOMContentLoaded', () => {

        const sliders = []


        document.addEventListener('editor.on', () => {
            sliders.forEach(s => {
                s.viewport.viewportElement.parentElement.setAttribute('data-stopped', '')
                s.disableInput()
                setTimeout(() => {
                    s.resize()
                }, 500)
            })
        })
        document.addEventListener('editor.off', () => {
            sliders.forEach(s => {
                s.viewport.viewportElement.parentElement.removeAttribute('data-stopped')
                s.enableInput()
                setTimeout(() => {
                    s.resize()
                }, 500)
            })
        })
        const init = () => {

            // reentrant


            document.querySelectorAll('.flslider-container').forEach(el => {

                if (el.classList.contains('inited')) {
                    return
                }

                // we start out stopped and wait for intersection observer
                el.setAttribute('data-stopped', '')

                const flicking = new eg.Flicking(el, {
                    circular: true,
                    collectStatistics: false,
                    gap: 10,
                    zIndex: 0,
                    autoResize: true,
                    // renderOnlyVisible: true,
                    duration: 1000,
                })

                el.parentElement.addEventListener('mouseenter', () => {
                    el.parentElement.classList.add('fl-hover')
                })
                el.parentElement.addEventListener('mouseleave', () => {
                    el.parentElement.classList.remove('fl-hover')
                })

                const paginationEl = el.parentElement.querySelector('.flslider-pagination')
                if (paginationEl) {
                    flicking.addPlugins(Pagination(paginationEl))
                }

                const navLeftEl = el.parentElement.querySelector('.flslider-nav-left')
                const navRightEl = el.parentElement.querySelector('.flslider-nav-right')
                navLeftEl && navLeftEl.addEventListener('click', () => {
                    stopAutoPlay(flicking)
                    let visiblePanels = Math.max(1, flicking.getVisiblePanels().length - 2)
                    if (visiblePanels > 1) {
                        const index = flicking.getIndex()
                        const total = flicking.getPanelCount()
                        let nextIndex = index - visiblePanels
                        // console.log( 'play', index, total, nextIndex )
                        if (nextIndex < 0) {
                            nextIndex = total - Math.abs(nextIndex)
                        }
                        // console.log( 'final next', nextIndex)
                        flicking.moveTo(nextIndex)
                    } else {
                        flicking.prev()
                    }
                })
                navRightEl && navRightEl.addEventListener('click', () => {
                    stopAutoPlay(flicking)
                    let visiblePanels = Math.max(1, flicking.getVisiblePanels().length - 2)
                    // console.log( 'visible panels', visiblePanels)
                    if (visiblePanels > 1) {
                        const index = flicking.getIndex()
                        const total = flicking.getPanelCount()
                        let nextIndex = index + visiblePanels
                        // console.log( 'play', index, total, nextIndex )
                        if (nextIndex >= total) {
                            nextIndex -= total
                        }
                        // console.log( 'final next', nextIndex)
                        flicking.moveTo(nextIndex)
                    } else {
                        flicking.next()
                    }
                })

                if (el.hasAttribute('data-autoplay')) {
                    const interval = parseInt(el.getAttribute('data-interval')) || 5
                    const autoPlay = new AutoPlay(interval * 1000, 'NEXT')
                    flicking.addPlugins(autoPlay)
                }
                if (el.hasAttribute('data-fade')) {
                    flicking.addPlugins(new Fade('', 1))
                }

                let moving

                flicking.on("moveStart", function(e) {
                    console.log(e)
                    moving = true
                });

                flicking.on("moveEnd", function(e) {
                    moving = false
                    var panel = e.panel;
                    var el = panel.getElement();
                    el.querySelectorAll('video').forEach(v => {
                        if (v.getAttribute('loop') === 'true') {
                            if (!(v.currentTime > 0 && !v.paused && !v.ended && v.readyState > 2)) {
                                v.muted = true
                                v.play()
                            }
                            // v.play()
                        }
                    })
                    console.log(e)
                })

                flicking.on("holdStart", function(e) {
                    setTimeout(() => {
                        stopAutoPlay(flicking)
                    })
                })

                // we want to disable any <a> tags while the panels are moving
                el.querySelectorAll('a').forEach(a => {
                    a.addEventListener('click', ev => {
                        const href = a.getAttribute('href')
                        if (href && moving) {
                            ev.preventDefault()
                            ev.stopPropagation()
                        }
                    })

                })

                sliders.push(flicking)

                el.classList.add('inited')

                intersectionObserver.observe(el)
            })
        }

        init()

        _G.reinitHandlers.push(init)
    })

})()

/* ==== INCLUDE: /js/blocks/flicking-3.4.7.pkgd.js ==== */

/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 3.4.7
*/
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : ((t = t || self).eg = t.eg || {}, t.eg.Flicking = e())
}(this, function() {
    "use strict";
    var i = function(t, e) {
        return (i = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
            })(t, e)
    };

    function r(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
    }

    function a(t) {
        return void 0 === t
    }
    var t = function() {
        var t = function() {
            function t() {
                this._eventHandler = {}, this.options = {}
            }
            var e = t.prototype;
            return e.trigger = function(t, e) {
                void 0 === e && (e = {});
                var n = this._eventHandler[t] || [];
                if (!(0 < n.length)) return !0;
                n = n.concat(), e.eventType = t;
                var i = !1,
                    r = [e],
                    o = 0;
                e.stop = function() {
                    i = !0
                }, e.currentTarget = this;
                for (var s = arguments.length, a = new Array(2 < s ? s - 2 : 0), l = 2; l < s; l++) a[l - 2] = arguments[l];
                for (1 <= a.length && (r = r.concat(a)), o = 0; n[o]; o++) n[o].apply(this, r);
                return !i
            }, e.once = function(r, o) {
                if ("object" == typeof r && a(o)) {
                    var t, e = r;
                    for (t in e) this.once(t, e[t]);
                    return this
                }
                if ("string" == typeof r && "function" == typeof o) {
                    var s = this;
                    this.on(r, function t() {
                        for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                        o.apply(s, n), s.off(r, t)
                    })
                }
                return this
            }, e.hasOn = function(t) {
                return !!this._eventHandler[t]
            }, e.on = function(t, e) {
                if ("object" == typeof t && a(e)) {
                    var n, i = t;
                    for (n in i) this.on(n, i[n]);
                    return this
                }
                if ("string" == typeof t && "function" == typeof e) {
                    var r = this._eventHandler[t];
                    a(r) && (this._eventHandler[t] = [], r = this._eventHandler[t]), r.push(e)
                }
                return this
            }, e.off = function(t, e) {
                if (a(t)) return this._eventHandler = {}, this;
                if (a(e)) {
                    if ("string" == typeof t) return this._eventHandler[t] = void 0, this;
                    var n, i = t;
                    for (n in i) this.off(n, i[n]);
                    return this
                }
                var r, o, s = this._eventHandler[t];
                if (s)
                    for (r = 0; void 0 !== (o = s[r]); r++)
                        if (o === e) {
                            s = s.splice(r, 1);
                            break
                        }
                return this
            }, t
        }();
        return t.VERSION = "2.1.2", t
    }();

    function o() {
        return (o = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }).apply(this, arguments)
    }

    function s(t, e) {
        t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function l(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    var u, h = "function" != typeof Object.assign ? function(t) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (null != i)
                    for (var r in i) i.hasOwnProperty(r) && (e[r] = i[r])
            }
            return e
        } : Object.assign,
        c = ["", "webkit", "Moz", "MS", "ms", "o"],
        e = "undefined" == typeof document ? {
            style: {}
        } : document.createElement("div"),
        n = "function",
        f = Math.round,
        y = Math.abs,
        b = Date.now;

    function p(t, e) {
        for (var n, i, r = e[0].toUpperCase() + e.slice(1), o = 0; o < c.length;) {
            if ((i = (n = c[o]) ? n + r : e) in t) return i;
            o++
        }
    }
    u = "undefined" == typeof window ? {} : window;
    var g = p(e.style, "touchAction"),
        d = void 0 !== g;
    var v = "compute",
        m = "manipulation",
        P = "none",
        x = "pan-x",
        E = "pan-y",
        C = function() {
            if (!d) return !1;
            var e = {},
                n = u.CSS && u.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(t) {
                return e[t] = !n || u.CSS.supports("touch-action", t)
            }), e
        }(),
        S = "ontouchstart" in u,
        w = void 0 !== p(u, "PointerEvent"),
        I = S && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        T = "touch",
        A = "mouse",
        M = 25,
        z = 1,
        O = 4,
        R = 8,
        N = 1,
        _ = 2,
        k = 4,
        H = 8,
        D = 16,
        B = _ | k,
        V = H | D,
        L = B | V,
        F = ["x", "y"],
        X = ["clientX", "clientY"];

    function j(t, e, n) {
        var i;
        if (t)
            if (t.forEach) t.forEach(e, n);
            else if (void 0 !== t.length)
            for (i = 0; i < t.length;) e.call(n, t[i], i, t), i++;
        else
            for (i in t) t.hasOwnProperty(i) && e.call(n, t[i], i, t)
    }

    function Y(t, e) {
        return typeof t === n ? t.apply(e && e[0] || void 0, e) : t
    }

    function q(t, e) {
        return -1 < t.indexOf(e)
    }
    var G = function() {
        function t(t, e) {
            this.manager = t, this.set(e)
        }
        var e = t.prototype;
        return e.set = function(t) {
            t === v && (t = this.compute()), d && this.manager.element.style && C[t] && (this.manager.element.style[g] = t), this.actions = t.toLowerCase().trim()
        }, e.update = function() {
            this.set(this.manager.options.touchAction)
        }, e.compute = function() {
            var e = [];
            return j(this.manager.recognizers, function(t) {
                    Y(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }),
                function(t) {
                    if (q(t, P)) return P;
                    var e = q(t, x),
                        n = q(t, E);
                    return e && n ? P : e || n ? e ? x : E : q(t, m) ? m : "auto"
                }(e.join(" "))
        }, e.preventDefaults = function(t) {
            var e = t.srcEvent,
                n = t.offsetDirection;
            if (this.manager.session.prevented) e.preventDefault();
            else {
                var i = this.actions,
                    r = q(i, P) && !C[P],
                    o = q(i, E) && !C[E],
                    s = q(i, x) && !C[x];
                if (r) {
                    var a = 1 === t.pointers.length,
                        l = t.distance < 2,
                        u = t.deltaTime < 250;
                    if (a && l && u) return
                }
                if (!s || !o) return r || o && n & B || s && n & V ? this.preventSrc(e) : void 0
            }
        }, e.preventSrc = function(t) {
            this.manager.session.prevented = !0, t.preventDefault()
        }, t
    }();

    function W(t, e) {
        for (; t;) {
            if (t === e) return !0;
            t = t.parentNode
        }
        return !1
    }

    function U(t) {
        var e = t.length;
        if (1 === e) return {
            x: f(t[0].clientX),
            y: f(t[0].clientY)
        };
        for (var n = 0, i = 0, r = 0; r < e;) n += t[r].clientX, i += t[r].clientY, r++;
        return {
            x: f(n / e),
            y: f(i / e)
        }
    }

    function J(t) {
        for (var e = [], n = 0; n < t.pointers.length;) e[n] = {
            clientX: f(t.pointers[n].clientX),
            clientY: f(t.pointers[n].clientY)
        }, n++;
        return {
            timeStamp: b(),
            pointers: e,
            center: U(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }

    function Q(t, e, n) {
        n || (n = F);
        var i = e[n[0]] - t[n[0]],
            r = e[n[1]] - t[n[1]];
        return Math.sqrt(i * i + r * r)
    }

    function Z(t, e, n) {
        n || (n = F);
        var i = e[n[0]] - t[n[0]],
            r = e[n[1]] - t[n[1]];
        return 180 * Math.atan2(r, i) / Math.PI
    }

    function K(t, e) {
        return t === e ? N : y(t) >= y(e) ? t < 0 ? _ : k : e < 0 ? H : D
    }

    function $(t, e, n) {
        return {
            x: e / t || 0,
            y: n / t || 0
        }
    }

    function tt(t, e) {
        var n = t.session,
            i = e.pointers,
            r = i.length;
        n.firstInput || (n.firstInput = J(e)), 1 < r && !n.firstMultiple ? n.firstMultiple = J(e) : 1 === r && (n.firstMultiple = !1);
        var o, s, a, l, u, h, c = n.firstInput,
            f = n.firstMultiple,
            p = f ? f.center : c.center,
            g = e.center = U(i);
        e.timeStamp = b(), e.deltaTime = e.timeStamp - c.timeStamp, e.angle = Z(p, g), e.distance = Q(p, g), o = n, a = (s = e).center, l = o.offsetDelta || {}, u = o.prevDelta || {}, h = o.prevInput || {}, s.eventType !== z && h.eventType !== O || (u = o.prevDelta = {
            x: h.deltaX || 0,
            y: h.deltaY || 0
        }, l = o.offsetDelta = {
            x: a.x,
            y: a.y
        }), s.deltaX = u.x + (a.x - l.x), s.deltaY = u.y + (a.y - l.y), e.offsetDirection = K(e.deltaX, e.deltaY);
        var d, v, m, P, x = $(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = x.x, e.overallVelocityY = x.y, e.overallVelocity = y(x.x) > y(x.y) ? x.x : x.y, e.scale = f ? (d = f.pointers, Q((v = i)[0], v[1], X) / Q(d[0], d[1], X)) : 1, e.rotation = f ? (m = f.pointers, Z((P = i)[1], P[0], X) + Z(m[1], m[0], X)) : 0, e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length,
            function(t, e) {
                var n, i, r, o, s = t.lastInterval || e,
                    a = e.timeStamp - s.timeStamp;
                if (e.eventType !== R && (M < a || void 0 === s.velocity)) {
                    var l = e.deltaX - s.deltaX,
                        u = e.deltaY - s.deltaY,
                        h = $(a, l, u);
                    i = h.x, r = h.y, n = y(h.x) > y(h.y) ? h.x : h.y, o = K(l, u), t.lastInterval = e
                } else n = s.velocity, i = s.velocityX, r = s.velocityY, o = s.direction;
                e.velocity = n, e.velocityX = i, e.velocityY = r, e.direction = o
            }(n, e);
        var E = t.element;
        W(e.srcEvent.target, E) && (E = e.srcEvent.target), e.target = E
    }

    function et(t, e, n) {
        var i = n.pointers.length,
            r = n.changedPointers.length,
            o = e & z && i - r == 0,
            s = e & (O | R) && i - r == 0;
        n.isFirst = !!o, n.isFinal = !!s, o && (t.session = {}), n.eventType = e, tt(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n
    }

    function nt(t) {
        return t.trim().split(/\s+/g)
    }

    function it(e, t, n) {
        j(nt(t), function(t) {
            e.addEventListener(t, n, !1)
        })
    }

    function rt(e, t, n) {
        j(nt(t), function(t) {
            e.removeEventListener(t, n, !1)
        })
    }

    function ot(t) {
        var e = t.ownerDocument || t;
        return e.defaultView || e.parentWindow || window
    }
    var st = function() {
        function t(e, t) {
            var n = this;
            this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
                Y(e.options.enable, [e]) && n.handler(t)
            }, this.init()
        }
        var e = t.prototype;
        return e.handler = function() {}, e.init = function() {
            this.evEl && it(this.element, this.evEl, this.domHandler), this.evTarget && it(this.target, this.evTarget, this.domHandler), this.evWin && it(ot(this.element), this.evWin, this.domHandler)
        }, e.destroy = function() {
            this.evEl && rt(this.element, this.evEl, this.domHandler), this.evTarget && rt(this.target, this.evTarget, this.domHandler), this.evWin && rt(ot(this.element), this.evWin, this.domHandler)
        }, t
    }();

    function at(t, e, n) {
        if (t.indexOf && !n) return t.indexOf(e);
        for (var i = 0; i < t.length;) {
            if (n && t[i][n] == e || !n && t[i] === e) return i;
            i++
        }
        return -1
    }
    var lt = {
            pointerdown: z,
            pointermove: 2,
            pointerup: O,
            pointercancel: R,
            pointerout: R
        },
        ut = {
            2: T,
            3: "pen",
            4: A,
            5: "kinect"
        },
        ht = "pointerdown",
        ct = "pointermove pointerup pointercancel";
    u.MSPointerEvent && !u.PointerEvent && (ht = "MSPointerDown", ct = "MSPointerMove MSPointerUp MSPointerCancel");
    var ft = function(n) {
        function i() {
            var t, e = i.prototype;
            return e.evEl = ht, e.evWin = ct, (t = n.apply(this, arguments) || this).store = t.manager.session.pointerEvents = [], t
        }
        return s(i, n), i.prototype.handler = function(t) {
            var e = this.store,
                n = !1,
                i = t.type.toLowerCase().replace("ms", ""),
                r = lt[i],
                o = ut[t.pointerType] || t.pointerType,
                s = o === T,
                a = at(e, t.pointerId, "pointerId");
            r & z && (0 === t.button || s) ? a < 0 && (e.push(t), a = e.length - 1) : r & (O | R) && (n = !0), a < 0 || (e[a] = t, this.callback(this.manager, r, {
                pointers: e,
                changedPointers: [t],
                pointerType: o,
                srcEvent: t
            }), n && e.splice(a, 1))
        }, i
    }(st);

    function pt(t) {
        return Array.prototype.slice.call(t, 0)
    }
    var gt = {
            touchstart: z,
            touchmove: 2,
            touchend: O,
            touchcancel: R
        },
        dt = function(e) {
            function n() {
                var t;
                return n.prototype.evTarget = "touchstart touchmove touchend touchcancel", (t = e.apply(this, arguments) || this).targetIds = {}, t
            }
            return s(n, e), n.prototype.handler = function(t) {
                var e = gt[t.type],
                    n = function(t, e) {
                        var n, i, r = pt(t.touches),
                            o = this.targetIds;
                        if (e & (2 | z) && 1 === r.length) return o[r[0].identifier] = !0, [r, r];
                        var s = pt(t.changedTouches),
                            a = [],
                            l = this.target;
                        if (i = r.filter(function(t) {
                                return W(t.target, l)
                            }), e === z)
                            for (n = 0; n < i.length;) o[i[n].identifier] = !0, n++;
                        n = 0;
                        for (; n < s.length;) o[s[n].identifier] && a.push(s[n]), e & (O | R) && delete o[s[n].identifier], n++;
                        return a.length ? [function(t, n, e) {
                            for (var i = [], r = [], o = 0; o < t.length;) {
                                var s = n ? t[o][n] : t[o];
                                at(r, s) < 0 && i.push(t[o]), r[o] = s, o++
                            }
                            return e && (i = n ? i.sort(function(t, e) {
                                return t[n] > e[n]
                            }) : i.sort()), i
                        }(i.concat(a), "identifier", !0), a] : void 0
                    }.call(this, t, e);
                n && this.callback(this.manager, e, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: T,
                    srcEvent: t
                })
            }, n
        }(st);
    var vt = {
            mousedown: z,
            mousemove: 2,
            mouseup: O
        },
        mt = function(n) {
            function i() {
                var t, e = i.prototype;
                return e.evEl = "mousedown", e.evWin = "mousemove mouseup", (t = n.apply(this, arguments) || this).pressed = !1, t
            }
            return s(i, n), i.prototype.handler = function(t) {
                var e = vt[t.type];
                e & z && 0 === t.button && (this.pressed = !0), 2 & e && 1 !== t.which && (e = O), this.pressed && (e & O && (this.pressed = !1), this.callback(this.manager, e, {
                    pointers: [t],
                    changedPointers: [t],
                    pointerType: A,
                    srcEvent: t
                }))
            }, i
        }(st),
        Pt = 2500,
        xt = 25;

    function Et(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var n = {
                    x: e.clientX,
                    y: e.clientY
                },
                i = this.lastTouches;
            this.lastTouches.push(n);
            setTimeout(function() {
                var t = i.indexOf(n); - 1 < t && i.splice(t, 1)
            }, Pt)
        }
    }
    var yt = function() {
        return function(n) {
            function t(t, e) {
                var o;
                return (o = n.call(this, t, e) || this).handler = function(t, e, n) {
                    var i = n.pointerType === T,
                        r = n.pointerType === A;
                    if (!(r && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                        if (i)(function(t, e) {
                            t & z ? (this.primaryTouch = e.changedPointers[0].identifier, Et.call(this, e)) : t & (O | R) && Et.call(this, e)
                        }).call(l(l(o)), e, n);
                        else if (r && function(t) {
                                for (var e = t.srcEvent.clientX, n = t.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
                                    var r = this.lastTouches[i],
                                        o = Math.abs(e - r.x),
                                        s = Math.abs(n - r.y);
                                    if (o <= xt && s <= xt) return !0
                                }
                                return !1
                            }.call(l(l(o)), n)) return;
                        o.callback(t, e, n)
                    }
                }, o.touch = new dt(o.manager, o.handler), o.mouse = new mt(o.manager, o.handler), o.primaryTouch = null, o.lastTouches = [], o
            }
            return s(t, n), t.prototype.destroy = function() {
                this.touch.destroy(), this.mouse.destroy()
            }, t
        }(st)
    }();

    function bt(t, e, n) {
        return !!Array.isArray(t) && (j(t, n[e], n), !0)
    }
    var Ct = 1;

    function St(t, e) {
        var n = e.manager;
        return n ? n.get(t) : t
    }

    function wt(t) {
        return 16 & t ? "cancel" : 8 & t ? "end" : 4 & t ? "move" : 2 & t ? "start" : ""
    }
    var It = function() {
            function t(t) {
                void 0 === t && (t = {}), this.options = o({
                    enable: !0
                }, t), this.id = Ct++, this.manager = null, this.state = 1, this.simultaneous = {}, this.requireFail = []
            }
            var e = t.prototype;
            return e.set = function(t) {
                return h(this.options, t), this.manager && this.manager.touchAction.update(), this
            }, e.recognizeWith = function(t) {
                if (bt(t, "recognizeWith", this)) return this;
                var e = this.simultaneous;
                return e[(t = St(t, this)).id] || (e[t.id] = t).recognizeWith(this), this
            }, e.dropRecognizeWith = function(t) {
                return bt(t, "dropRecognizeWith", this) || (t = St(t, this), delete this.simultaneous[t.id]), this
            }, e.requireFailure = function(t) {
                if (bt(t, "requireFailure", this)) return this;
                var e = this.requireFail;
                return -1 === at(e, t = St(t, this)) && (e.push(t), t.requireFailure(this)), this
            }, e.dropRequireFailure = function(t) {
                if (bt(t, "dropRequireFailure", this)) return this;
                t = St(t, this);
                var e = at(this.requireFail, t);
                return -1 < e && this.requireFail.splice(e, 1), this
            }, e.hasRequireFailures = function() {
                return 0 < this.requireFail.length
            }, e.canRecognizeWith = function(t) {
                return !!this.simultaneous[t.id]
            }, e.emit = function(e) {
                var n = this,
                    t = this.state;

                function i(t) {
                    n.manager.emit(t, e)
                }
                t < 8 && i(n.options.event + wt(t)), i(n.options.event), e.additionalEvent && i(e.additionalEvent), 8 <= t && i(n.options.event + wt(t))
            }, e.tryEmit = function(t) {
                if (this.canEmit()) return this.emit(t);
                this.state = 32
            }, e.canEmit = function() {
                for (var t = 0; t < this.requireFail.length;) {
                    if (!(33 & this.requireFail[t].state)) return !1;
                    t++
                }
                return !0
            }, e.recognize = function(t) {
                var e = h({}, t);
                if (!Y(this.options.enable, [this, e])) return this.reset(), void(this.state = 32);
                56 & this.state && (this.state = 1), this.state = this.process(e), 30 & this.state && this.tryEmit(e)
            }, e.process = function(t) {}, e.getTouchAction = function() {}, e.reset = function() {}, t
        }(),
        Tt = {
            domEvents: !1,
            touchAction: v,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };

    function At(n, i) {
        var r, o = n.element;
        o.style && (j(n.options.cssProps, function(t, e) {
            r = p(o.style, e), o.style[r] = i ? (n.oldCssProps[r] = o.style[r], t) : n.oldCssProps[r] || ""
        }), i || (n.oldCssProps = {}))
    }
    var Mt = function() {
            function t(t, e) {
                var n, i = this;
                this.options = h({}, Tt, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = new((n = this).options.inputClass || (w ? ft : I ? dt : S ? yt : mt))(n, et), this.touchAction = new G(this, this.options.touchAction), At(this, !0), j(this.options.recognizers, function(t) {
                    var e = i.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
                }, this)
            }
            var e = t.prototype;
            return e.set = function(t) {
                return h(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
            }, e.stop = function(t) {
                this.session.stopped = t ? 2 : 1
            }, e.recognize = function(t) {
                var e = this.session;
                if (!e.stopped) {
                    var n;
                    this.touchAction.preventDefaults(t);
                    var i = this.recognizers,
                        r = e.curRecognizer;
                    (!r || r && 8 & r.state) && (r = e.curRecognizer = null);
                    for (var o = 0; o < i.length;) n = i[o], 2 === e.stopped || r && n !== r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t), !r && 14 & n.state && (r = e.curRecognizer = n), o++
                }
            }, e.get = function(t) {
                if (t instanceof It) return t;
                for (var e = this.recognizers, n = 0; n < e.length; n++)
                    if (e[n].options.event === t) return e[n];
                return null
            }, e.add = function(t) {
                if (bt(t, "add", this)) return this;
                var e = this.get(t.options.event);
                return e && this.remove(e), this.recognizers.push(t), (t.manager = this).touchAction.update(), t
            }, e.remove = function(t) {
                if (bt(t, "remove", this)) return this;
                var e = this.get(t);
                if (t) {
                    var n = this.recognizers,
                        i = at(n, e); - 1 !== i && (n.splice(i, 1), this.touchAction.update())
                }
                return this
            }, e.on = function(t, e) {
                if (void 0 === t || void 0 === e) return this;
                var n = this.handlers;
                return j(nt(t), function(t) {
                    n[t] = n[t] || [], n[t].push(e)
                }), this
            }, e.off = function(t, e) {
                if (void 0 === t) return this;
                var n = this.handlers;
                return j(nt(t), function(t) {
                    e ? n[t] && n[t].splice(at(n[t], e), 1) : delete n[t]
                }), this
            }, e.emit = function(t, e) {
                var n, i, r;
                this.options.domEvents && (n = t, i = e, (r = document.createEvent("Event")).initEvent(n, !0, !0), (r.gesture = i).target.dispatchEvent(r));
                var o = this.handlers[t] && this.handlers[t].slice();
                if (o && o.length) {
                    e.type = t, e.preventDefault = function() {
                        e.srcEvent.preventDefault()
                    };
                    for (var s = 0; s < o.length;) o[s](e), s++
                }
            }, e.destroy = function() {
                this.element && At(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }, t
        }(),
        zt = function(e) {
            function t(t) {
                return void 0 === t && (t = {}), e.call(this, o({
                    pointers: 1
                }, t)) || this
            }
            s(t, e);
            var n = t.prototype;
            return n.attrTest = function(t) {
                var e = this.options.pointers;
                return 0 === e || t.pointers.length === e
            }, n.process = function(t) {
                var e = this.state,
                    n = t.eventType,
                    i = 6 & e,
                    r = this.attrTest(t);
                return i && (n & R || !r) ? 16 | e : i || r ? n & O ? 8 | e : 2 & e ? 4 | e : 2 : 32
            }, t
        }(It);
    var Ot = function(i) {
            function t(t) {
                var e;
                return void 0 === t && (t = {}), (e = i.call(this, o({
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: L
                }, t)) || this).pX = null, e.pY = null, e
            }
            s(t, i);
            var e = t.prototype;
            return e.getTouchAction = function() {
                var t = this.options.direction,
                    e = [];
                return t & B && e.push(E), t & V && e.push(x), e
            }, e.directionTest = function(t) {
                var e = this.options,
                    n = !0,
                    i = t.distance,
                    r = t.direction,
                    o = t.deltaX,
                    s = t.deltaY;
                return r & e.direction || (i = e.direction & B ? (r = 0 === o ? N : o < 0 ? _ : k, n = o !== this.pX, Math.abs(t.deltaX)) : (r = 0 === s ? N : s < 0 ? H : D, n = s !== this.pY, Math.abs(t.deltaY))), t.direction = r, n && i > e.threshold && r & e.direction
            }, e.attrTest = function(t) {
                return zt.prototype.attrTest.call(this, t) && (2 & this.state || !(2 & this.state) && this.directionTest(t))
            }, e.emit = function(t) {
                this.pX = t.deltaX, this.pY = t.deltaY;
                var e, n = (e = t.direction) === D ? "down" : e === H ? "up" : e === _ ? "left" : e === k ? "right" : "";
                n && (t.additionalEvent = this.options.event + n), i.prototype.emit.call(this, t)
            }, t
        }(zt),
        Rt = Object.setPrototypeOf || {
            __proto__: []
        }
    instanceof Array && function(t, e) {
        t.__proto__ = e
    } || function(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
    };
    var Nt, _t = Object.assign || function(t) {
        for (var e, n = 1, i = arguments.length; n < i; n++)
            for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t
    };
    Nt = "undefined" == typeof window ? {} : window;
    var kt = 1e5,
        Ht = function() {
            if ("undefined" == typeof document) return "";
            for (var t = (document.head || document.getElementsByTagName("head")[0]).style, e = ["transform", "webkitTransform", "msTransform", "mozTransform"], n = 0, i = e.length; n < i; n++)
                if (e[n] in t) return e[n];
            return ""
        }();

    function Dt(t) {
        for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
        return e
    }
    var Bt = Nt.requestAnimationFrame || Nt.webkitRequestAnimationFrame,
        Vt = Nt.cancelAnimationFrame || Nt.webkitCancelAnimationFrame;
    if (Bt && !Vt) {
        var Lt = {},
            Ft = Bt;
        Bt = function(e) {
            var n = Ft(function(t) {
                Lt[n] && e(t)
            });
            return Lt[n] = !0, n
        }, Vt = function(t) {
            delete Lt[t]
        }
    } else Bt && Vt || (Bt = function(t) {
        return Nt.setTimeout(function() {
            t(Nt.performance && Nt.performance.now && Nt.performance.now() || (new Date).getTime())
        }, 16)
    }, Vt = Nt.clearTimeout);

    function Xt(t) {
        return jt(t, function(t) {
            return Wt(t)
        })
    }

    function jt(t, e) {
        var n = {};
        for (var i in t) i && (n[i] = e(t[i], i));
        return n
    }

    function Yt(t, e) {
        var n = {};
        for (var i in t) i && e(t[i], i) && (n[i] = t[i]);
        return n
    }

    function qt(t, e) {
        for (var n in t)
            if (n && !e(t[n], n)) return !1;
        return !0
    }

    function Gt(t, n) {
        return qt(t, function(t, e) {
            return t === n[e]
        })
    }

    function Wt(t) {
        return Math.round(t * kt) / kt
    }

    function Ut(t, e, n, i) {
        var r = t,
            o = [n[0] ? e[0] : i ? e[0] - i[0] : e[0], n[1] ? e[1] : i ? e[1] + i[1] : e[1]];
        return r = Math.max(o[0], r), +Wt(r = Math.min(o[1], r))
    }

    function Jt(t, e) {
        return t < e[0] || t > e[1]
    }

    function Qt(t, e, n) {
        return n[1] && t > e[1] || n[0] && t < e[0]
    }

    function Zt(t, e, n, i) {
        var r = t,
            o = e[0],
            s = e[1],
            a = s - o;
        return n[1] && s < t && (r = (r - s) % a + o), n[0] && t < o && (r = (r - o) % a + s), i ? r : +Wt(r)
    }

    function Kt(t, e, n) {
        return Math.max(Math.min(t, n), e)
    }
    var $t = function() {
            function t(t) {
                var e = t.options,
                    n = t.itm,
                    i = t.em,
                    r = t.axm;
                this.options = e, this.itm = n, this.em = i, this.axm = r, this.animationEnd = this.animationEnd.bind(this)
            }
            var e = t.prototype;
            return e.getDuration = function(o, t, e) {
                var n, s = this;
                if (void 0 !== e) n = e;
                else {
                    var i = jt(t, function(t, e) {
                        return n = Math.abs(t - o[e]), i = s.options.deceleration, (r = Math.sqrt(n / i * 2)) < 100 ? 0 : r;
                        var n, i, r
                    });
                    n = Object.keys(i).reduce(function(t, e) {
                        return Math.max(t, i[e])
                    }, -1 / 0)
                }
                return Kt(n, this.options.minimumDuration, this.options.maximumDuration)
            }, e.createAnimationParam = function(t, e, n) {
                var i = this.axm.get(),
                    r = t,
                    o = n && n.event || null;
                return {
                    depaPos: i,
                    destPos: r,
                    duration: Kt(e, this.options.minimumDuration, this.options.maximumDuration),
                    delta: this.axm.getDelta(i, r),
                    inputEvent: o,
                    input: n && n.input || null,
                    isTrusted: !!o,
                    done: this.animationEnd
                }
            }, e.grab = function(t, e) {
                if (this._animateParam && t.length) {
                    var n = this.axm.get(t),
                        i = this.axm.map(n, function(t, e) {
                            return Zt(t, e.range, e.circular, !1)
                        });
                    qt(i, function(t, e) {
                        return n[e] === t
                    }) || this.em.triggerChange(i, !1, n, e, !!e), this._animateParam = null, this._raf && (r = this._raf, Vt(r)), this._raf = null, this.em.triggerAnimationEnd(!(!e || !e.event))
                }
                var r
            }, e.getEventInfo = function() {
                return this._animateParam && this._animateParam.input && this._animateParam.inputEvent ? {
                    input: this._animateParam.input,
                    event: this._animateParam.inputEvent
                } : null
            }, e.restore = function(t) {
                var e = this.axm.get(),
                    n = this.axm.map(e, function(t, e) {
                        return Math.min(e.range[1], Math.max(e.range[0], t))
                    });
                this.animateTo(n, this.getDuration(e, n), t)
            }, e.animationEnd = function() {
                var t = this.getEventInfo();
                this._animateParam = null;
                var e = this.axm.filter(this.axm.get(), function(t, e) {
                    return Qt(t, e.range, e.circular)
                });
                0 < Object.keys(e).length && this.setTo(this.axm.map(e, function(t, e) {
                    return Zt(t, e.range, e.circular, !1)
                })), this.itm.setInterrupt(!1), this.em.triggerAnimationEnd(!!t), this.axm.isOutside() ? this.restore(t) : this.finish(!!t)
            }, e.finish = function(t) {
                this._animateParam = null, this.itm.setInterrupt(!1), this.em.triggerFinish(t)
            }, e.animateLoop = function(s, a) {
                if (s.duration) {
                    this._animateParam = _t({}, s);
                    var l = this._animateParam,
                        u = this,
                        h = l.depaPos,
                        c = 0,
                        f = jt(h, function(t, e) {
                            return t <= l.destPos[e] ? 1 : -1
                        }),
                        p = (new Date).getTime();
                    l.startTime = p,
                        function t() {
                            u._raf = null;
                            var e = (new Date).getTime(),
                                n = u.easing((e - l.startTime) / s.duration),
                                i = jt(h, function(t, e) {
                                    return t + l.delta[e] * (n - c)
                                });
                            i = u.axm.map(i, function(t, e, n) {
                                var i = Zt(t, e.range, e.circular, !0);
                                return t !== i && (s.destPos[n] += -f[n] * (e.range[1] - e.range[0]), h[n] += -f[n] * (e.range[1] - e.range[0])), i
                            });
                            var r = !u.em.triggerChange(i, !1, Xt(h));
                            if (h = i, p = e, 1 <= (c = n)) {
                                var o = s.destPos;
                                return Gt(o, u.axm.get(Object.keys(o))) || u.em.triggerChange(o, !0, Xt(h)), void a()
                            }
                            r ? u.finish(!1) : u._raf = Bt(t)
                        }()
                } else this.em.triggerChange(s.destPos, !0), a()
            }, e.getUserControll = function(t) {
                var e = t.setTo();
                return e.destPos = this.axm.get(e.destPos), e.duration = Kt(e.duration, this.options.minimumDuration, this.options.maximumDuration), e
            }, e.animateTo = function(t, e, n) {
                var i = this,
                    r = this.createAnimationParam(t, e, n),
                    o = _t({}, r.depaPos),
                    s = this.em.triggerAnimationStart(r),
                    a = this.getUserControll(r);
                if (!s && this.axm.every(a.destPos, function(t, e) {
                        return Qt(t, e.range, e.circular)
                    }) && console.warn("You can't stop the 'animation' event when 'circular' is true."), s && !Gt(a.destPos, o)) {
                    var l = n && n.event || null;
                    this.animateLoop({
                        depaPos: o,
                        destPos: a.destPos,
                        duration: a.duration,
                        delta: this.axm.getDelta(o, a.destPos),
                        isTrusted: !!l,
                        inputEvent: l,
                        input: n && n.input || null
                    }, function() {
                        return i.animationEnd()
                    })
                }
            }, e.easing = function(t) {
                return 1 < t ? 1 : this.options.easing(t)
            }, e.setTo = function(t, e) {
                void 0 === e && (e = 0);
                var n = Object.keys(t);
                this.grab(n);
                var i = this.axm.get(n);
                if (Gt(t, i)) return this;
                this.itm.setInterrupt(!0);
                var r = Yt(t, function(t, e) {
                    return i[e] !== t
                });
                return Object.keys(r).length && (Gt(r = this.axm.map(r, function(t, e) {
                    var n = e.range,
                        i = e.circular;
                    return i && (i[0] || i[1]) ? t : Ut(t, n, i)
                }), i) || (0 < e ? this.animateTo(r, e) : (this.em.triggerChange(r), this.finish(!1)))), this
            }, e.setBy = function(n, t) {
                return void 0 === t && (t = 0), this.setTo(jt(this.axm.get(Object.keys(n)), function(t, e) {
                    return t + n[e]
                }), t)
            }, t
        }(),
        te = function() {
            function t(t) {
                this.axes = t
            }
            var e = t.prototype;
            return e.triggerHold = function(t, e) {
                this.axes.trigger("hold", {
                    pos: t,
                    input: e.input || null,
                    inputEvent: e.event || null,
                    isTrusted: !0
                })
            }, e.triggerRelease = function(t) {
                t.setTo = this.createUserControll(t.destPos, t.duration), this.axes.trigger("release", t)
            }, e.triggerChange = function(t, e, n, i, r) {
                void 0 === r && (r = !1);
                var o = this.am,
                    s = o.axm,
                    a = o.getEventInfo(),
                    l = s.moveTo(t, e, n),
                    u = i && i.event || a && a.event || null,
                    h = {
                        pos: l.pos,
                        delta: l.delta,
                        holding: r,
                        inputEvent: u,
                        isTrusted: !!u,
                        input: i && i.input || a && a.input || null,
                        set: u ? this.createUserControll(l.pos) : function() {}
                    },
                    c = this.axes.trigger("change", h);
                return u && s.set(h.set().destPos), c
            }, e.triggerAnimationStart = function(t) {
                return t.setTo = this.createUserControll(t.destPos, t.duration), this.axes.trigger("animationStart", t)
            }, e.triggerAnimationEnd = function(t) {
                void 0 === t && (t = !1), this.axes.trigger("animationEnd", {
                    isTrusted: t
                })
            }, e.triggerFinish = function(t) {
                void 0 === t && (t = !1), this.axes.trigger("finish", {
                    isTrusted: t
                })
            }, e.createUserControll = function(t, e) {
                void 0 === e && (e = 0);
                var n = {
                    destPos: _t({}, t),
                    duration: e
                };
                return function(t, e) {
                    return t && (n.destPos = _t({}, t)), void 0 !== e && (n.duration = e), n
                }
            }, e.setAnimationManager = function(t) {
                this.am = t
            }, e.destroy = function() {
                this.axes.off()
            }, t
        }(),
        ee = function() {
            function t(t) {
                this.options = t, this._prevented = !1
            }
            var e = t.prototype;
            return e.isInterrupting = function() {
                return this.options.interruptable || this._prevented
            }, e.isInterrupted = function() {
                return !this.options.interruptable && this._prevented
            }, e.setInterrupt = function(t) {
                !this.options.interruptable && (this._prevented = t)
            }, t
        }(),
        ne = function() {
            function t(t, e) {
                var n = this;
                this.axis = t, this.options = e, this._complementOptions(), this._pos = Object.keys(this.axis).reduce(function(t, e) {
                    return t[e] = n.axis[e].range[0], t
                }, {})
            }
            var e = t.prototype;
            return e._complementOptions = function() {
                var r = this;
                Object.keys(this.axis).forEach(function(i) {
                    r.axis[i] = _t({
                        range: [0, 100],
                        bounce: [0, 0],
                        circular: [!1, !1]
                    }, r.axis[i]), ["bounce", "circular"].forEach(function(t) {
                        var e = r.axis,
                            n = e[i][t];
                        /string|number|boolean/.test(typeof n) && (e[i][t] = [n, n])
                    })
                })
            }, e.getDelta = function(t, e) {
                var n = this.get(t);
                return jt(this.get(e), function(t, e) {
                    return t - n[e]
                })
            }, e.get = function(t) {
                var n = this;
                return t && Array.isArray(t) ? t.reduce(function(t, e) {
                    return e && e in n._pos && (t[e] = n._pos[e]), t
                }, {}) : _t({}, this._pos, t || {})
            }, e.moveTo = function(n, i, r) {
                void 0 === r && (r = this._pos);
                var t = jt(this._pos, function(t, e) {
                    return e in n && e in r ? n[e] - r[e] : 0
                });
                return this.set(this.map(n, function(t, e) {
                    return e ? Zt(t, e.range, e.circular, i) : 0
                })), {
                    pos: _t({}, this._pos),
                    delta: t
                }
            }, e.set = function(t) {
                for (var e in t) e && e in this._pos && (this._pos[e] = t[e])
            }, e.every = function(t, n) {
                var i = this.axis;
                return qt(t, function(t, e) {
                    return n(t, i[e], e)
                })
            }, e.filter = function(t, n) {
                var i = this.axis;
                return Yt(t, function(t, e) {
                    return n(t, i[e], e)
                })
            }, e.map = function(t, n) {
                var i = this.axis;
                return jt(t, function(t, e) {
                    return n(t, i[e], e)
                })
            }, e.isOutside = function(t) {
                return !this.every(t ? this.get(t) : this._pos, function(t, e) {
                    return !Jt(t, e.range)
                })
            }, t
        }(),
        ie = function() {
            function t(t) {
                var e = t.options,
                    n = t.itm,
                    i = t.em,
                    r = t.axm,
                    o = t.am;
                this.isOutside = !1, this.moveDistance = null, this.isStopped = !1, this.options = e, this.itm = n, this.em = i, this.axm = r, this.am = o
            }
            var e = t.prototype;
            return e.atOutside = function(t) {
                var s = this;
                if (this.isOutside) return this.axm.map(t, function(t, e) {
                    var n = e.range[0] - e.bounce[0],
                        i = e.range[1] + e.bounce[1];
                    return i < t ? i : t < n ? n : t
                });
                var a = this.am.easing(1e-5) / 1e-5;
                return this.axm.map(t, function(t, e) {
                    var n = e.range[0],
                        i = e.range[1],
                        r = e.bounce,
                        o = e.circular;
                    return o && (o[0] || o[1]) ? t : t < n ? n - s.am.easing((n - t) / (r[0] * a)) * r[0] : i < t ? i + s.am.easing((t - i) / (r[1] * a)) * r[1] : t
                })
            }, e.get = function(t) {
                return this.axm.get(t.axes)
            }, e.hold = function(t, e) {
                if (!this.itm.isInterrupted() && t.axes.length) {
                    var n = {
                        input: t,
                        event: e
                    };
                    this.isStopped = !1, this.itm.setInterrupt(!0), this.am.grab(t.axes, n), !this.moveDistance && this.em.triggerHold(this.axm.get(), n), this.isOutside = this.axm.isOutside(t.axes), this.moveDistance = this.axm.get(t.axes)
                }
            }, e.change = function(t, e, n) {
                if (!this.isStopped && this.itm.isInterrupting() && !this.axm.every(n, function(t) {
                        return 0 === t
                    })) {
                    var i, r = this.moveDistance || this.axm.get(t.axes);
                    i = jt(r, function(t, e) {
                        return t + (n[e] || 0)
                    }), this.moveDistance && (this.moveDistance = i), this.isOutside && this.axm.every(r, function(t, e) {
                        return !Jt(t, e.range)
                    }) && (this.isOutside = !1), r = this.atOutside(r), i = this.atOutside(i), !this.em.triggerChange(i, !1, r, {
                        input: t,
                        event: e
                    }, !0) && (this.isStopped = !0, this.moveDistance = null, this.am.finish(!1))
                }
            }, e.release = function(t, e, n, i) {
                if (!this.isStopped && this.itm.isInterrupting() && this.moveDistance) {
                    var r = this.axm.get(t.axes),
                        o = this.axm.get(),
                        s = this.axm.get(this.axm.map(n, function(t, e, n) {
                            return e.circular && (e.circular[0] || e.circular[1]) ? r[n] + t : Ut(r[n] + t, e.range, e.circular, e.bounce)
                        })),
                        a = this.am.getDuration(s, r, i);
                    0 === a && (s = _t({}, o));
                    var l = {
                        depaPos: o,
                        destPos: s,
                        duration: a,
                        delta: this.axm.getDelta(o, s),
                        inputEvent: e,
                        input: t,
                        isTrusted: !0
                    };
                    this.em.triggerRelease(l), this.moveDistance = null;
                    var u = this.am.getUserControll(l),
                        h = Gt(u.destPos, o),
                        c = {
                            input: t,
                            event: e
                        };
                    h || 0 === u.duration ? (!h && this.em.triggerChange(u.destPos, !1, o, c, !0), this.itm.setInterrupt(!1), this.axm.isOutside() ? this.am.restore(c) : this.em.triggerFinish(!0)) : this.am.animateTo(u.destPos, u.duration, c)
                }
            }, t
        }(),
        re = function(r) {
            function t(t, e, n) {
                void 0 === t && (t = {}), void 0 === e && (e = {});
                var i = r.call(this) || this;
                return i.axis = t, i._inputs = [], i.options = _t({
                    easing: function(t) {
                        return 1 - Math.pow(1 - t, 3)
                    },
                    interruptable: !0,
                    maximumDuration: 1 / 0,
                    minimumDuration: 0,
                    deceleration: 6e-4
                }, e), i.itm = new ee(i.options), i.axm = new ne(i.axis, i.options), i.em = new te(i), i.am = new $t(i), i.io = new ie(i), i.em.setAnimationManager(i.am), n && i.em.triggerChange(n), i
            }! function(t, e) {
                function n() {
                    this.constructor = t
                }
                Rt(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
            }(t, r);
            var e = t.prototype;
            return e.connect = function(t, e) {
                var n;
                if (n = "string" == typeof t ? t.split(" ") : t.concat(), ~this._inputs.indexOf(e) && this.disconnect(e), "hammer" in e) {
                    var i = this._inputs.filter(function(t) {
                        return t.hammer && t.element === e.element
                    });
                    i.length && (e.hammer = i[0].hammer)
                }
                return e.mapAxes(n), e.connect(this.io), this._inputs.push(e), this
            }, e.disconnect = function(t) {
                if (t) {
                    var e = this._inputs.indexOf(t);
                    0 <= e && (this._inputs[e].disconnect(), this._inputs.splice(e, 1))
                } else this._inputs.forEach(function(t) {
                    return t.disconnect()
                }), this._inputs = [];
                return this
            }, e.get = function(t) {
                return this.axm.get(t)
            }, e.setTo = function(t, e) {
                return void 0 === e && (e = 0), this.am.setTo(t, e), this
            }, e.setBy = function(t, e) {
                return void 0 === e && (e = 0), this.am.setBy(t, e), this
            }, e.isBounceArea = function(t) {
                return this.axm.isOutside(t)
            }, e.destroy = function() {
                this.disconnect(), this.em.destroy()
            }, t.VERSION = "2.5.13", t.TRANSFORM = Ht, t.DIRECTION_NONE = N, t.DIRECTION_LEFT = _, t.DIRECTION_RIGHT = k, t.DIRECTION_UP = H, t.DIRECTION_DOWN = D, t.DIRECTION_HORIZONTAL = B, t.DIRECTION_VERTICAL = V, t.DIRECTION_ALL = L, t
        }(t),
        oe = "PointerEvent" in Nt || "MSPointerEvent" in Nt,
        se = "ontouchstart" in Nt,
        ae = "_EGJS_AXES_INPUTTYPE_";

    function le(i, t) {
        return t.reduce(function(t, e, n) {
            return i[n] && (t[i[n]] = e), t
        }, {})
    }

    function ue(t, e, n) {
        return n ? !!(e === L || e & t && n & t) : !!(e & t)
    }
    var he = function() {
            function t(t, e) {
                if (this.axes = [], this.hammer = null, this.element = null, this.panRecognizer = null, void 0 === Mt) throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
                this.element = function e(t, n) {
                    var i;
                    if (void 0 === n && (n = !1), "string" == typeof t) {
                        if (t.match(/^<([a-z]+)\s*([^>]*)>/)) {
                            var r = document.createElement("div");
                            r.innerHTML = t, i = Dt(r.childNodes)
                        } else i = Dt(document.querySelectorAll(t));
                        n || (i = 1 <= i.length ? i[0] : void 0)
                    } else t === Nt ? i = t : !t.nodeName || 1 !== t.nodeType && 9 !== t.nodeType ? "jQuery" in Nt && t instanceof jQuery || t.constructor.prototype.jquery ? i = n ? t.toArray() : t.get(0) : Array.isArray(t) && (i = t.map(function(t) {
                        return e(t)
                    }), n || (i = 1 <= i.length ? i[0] : void 0)) : i = t;
                    return i
                }(t), this.options = _t({
                    inputType: ["touch", "mouse", "pointer"],
                    scale: [1, 1],
                    thresholdAngle: 45,
                    threshold: 0,
                    hammerManagerOptions: {
                        cssProps: {
                            userSelect: "none",
                            touchSelect: "none",
                            touchCallout: "none",
                            userDrag: "none"
                        }
                    }
                }, e), this.onHammerInput = this.onHammerInput.bind(this), this.onPanmove = this.onPanmove.bind(this), this.onPanend = this.onPanend.bind(this)
            }
            var e = t.prototype;
            return e.mapAxes = function(t) {
                var e = !!t[0],
                    n = !!t[1];
                this._direction = e && n ? L : e ? B : n ? V : N, this.axes = t
            }, e.connect = function(t) {
                var e = {
                    direction: this._direction,
                    threshold: this.options.threshold
                };
                if (this.hammer) this.removeRecognizer(), this.dettachEvent();
                else {
                    var n = this.element[ae];
                    n || (n = String(Math.round(Math.random() * (new Date).getTime())));
                    var i = function(t) {
                        void 0 === t && (t = []);
                        var e = !1,
                            n = !1,
                            i = !1;
                        return t.forEach(function(t) {
                            switch (t) {
                                case "mouse":
                                    n = !0;
                                    break;
                                case "touch":
                                    e = se;
                                    break;
                                case "pointer":
                                    i = oe
                            }
                        }), i ? ft : e && n ? yt : e ? dt : n ? mt : null
                    }(this.options.inputType);
                    if (!i) throw new Error("Wrong inputType parameter!");
                    this.hammer = function(t, e) {
                        try {
                            return new Mt(t, _t({}, e))
                        } catch (t) {
                            return null
                        }
                    }(this.element, _t({
                        inputClass: i
                    }, this.options.hammerManagerOptions)), this.element[ae] = n
                }
                return this.panRecognizer = new Ot(e), this.hammer.add(this.panRecognizer), this.attachEvent(t), this
            }, e.disconnect = function() {
                return this.removeRecognizer(), this.hammer && this.dettachEvent(), this._direction = N, this
            }, e.destroy = function() {
                this.disconnect(), this.hammer && 0 === this.hammer.recognizers.length && this.hammer.destroy(), delete this.element[ae], this.element = null, this.hammer = null
            }, e.enable = function() {
                return this.hammer && (this.hammer.get("pan").options.enable = !0), this
            }, e.disable = function() {
                return this.hammer && (this.hammer.get("pan").options.enable = !1), this
            }, e.isEnable = function() {
                return !(!this.hammer || !this.hammer.get("pan").options.enable)
            }, e.removeRecognizer = function() {
                this.hammer && this.panRecognizer && (this.hammer.remove(this.panRecognizer), this.panRecognizer = null)
            }, e.onHammerInput = function(t) {
                this.isEnable() && (t.isFirst ? this.observer.hold(this, t) : t.isFinal && this.onPanend(t))
            }, e.onPanmove = function(t) {
                var e = function(t, e) {
                        if (e < 0 || 90 < e) return N;
                        var n = Math.abs(t);
                        return e < n && n < 180 - e ? V : B
                    }(t.angle, this.options.thresholdAngle),
                    n = this.hammer.session.prevInput;
                t.offsetY = n ? (t.offsetX = t.deltaX - n.deltaX, t.deltaY - n.deltaY) : t.offsetX = 0;
                var i = this.getOffset([t.offsetX, t.offsetY], [ue(B, this._direction, e), ue(V, this._direction, e)]),
                    r = i.some(function(t) {
                        return 0 !== t
                    });
                r && (t.srcEvent.preventDefault(), t.srcEvent.stopPropagation()), (t.preventSystemEvent = r) && this.observer.change(this, t, le(this.axes, i))
            }, e.onPanend = function(t) {
                var e, n, i, r, o = this.getOffset([Math.abs(t.velocityX) * (t.deltaX < 0 ? -1 : 1), Math.abs(t.velocityY) * (t.deltaY < 0 ? -1 : 1)], [ue(B, this._direction), ue(V, this._direction)]);
                e = o, n = this.observer.options.deceleration, i = Math.sqrt(e[0] * e[0] + e[1] * e[1]), r = Math.abs(i / -n), o = [e[0] / 2 * r, e[1] / 2 * r], this.observer.release(this, t, le(this.axes, o))
            }, e.attachEvent = function(t) {
                this.observer = t, this.hammer.on("hammer.input", this.onHammerInput).on("panstart panmove", this.onPanmove)
            }, e.dettachEvent = function() {
                this.hammer.off("hammer.input", this.onHammerInput).off("panstart panmove", this.onPanmove), this.observer = null
            }, e.getOffset = function(t, e) {
                var n = [0, 0],
                    i = this.options.scale;
                return e[0] && (n[0] = t[0] * i[0]), e[1] && (n[1] = t[1] * i[1]), n
            }, t
        }(),
        ce = {
            SNAP: "snap",
            FREE_SCROLL: "freeScroll"
        },
        fe = {
            snap: {
                type: "snap",
                count: 1
            },
            freeScroll: {
                type: "freeScroll"
            }
        },
        pe = "undefined" != typeof document,
        ge = {
            classPrefix: "eg-flick",
            deceleration: .0075,
            horizontal: !0,
            circular: !1,
            infinite: !1,
            infiniteThreshold: 0,
            lastIndex: 1 / 0,
            threshold: 40,
            duration: 100,
            panelEffect: function(t) {
                return 1 - Math.pow(1 - t, 3)
            },
            defaultIndex: 0,
            inputType: ["touch", "mouse"],
            thresholdAngle: 45,
            bounce: 10,
            autoResize: !1,
            adaptive: !1,
            zIndex: 2e3,
            bound: !1,
            overflow: !1,
            hanger: "50%",
            anchor: "50%",
            gap: 0,
            moveType: fe.snap,
            useOffset: !1,
            isEqualSize: !1,
            isConstantSize: !1,
            renderOnlyVisible: !1,
            renderExternal: !1,
            collectStatistics: !0
        },
        de = {
            position: "relative",
            zIndex: ge.zIndex,
            overflow: "hidden"
        },
        ve = {
            width: "100%",
            height: "100%",
            willChange: "transform"
        },
        me = {
            position: "absolute"
        },
        Pe = {
            HOLD_START: "holdStart",
            HOLD_END: "holdEnd",
            MOVE_START: "moveStart",
            MOVE: "move",
            MOVE_END: "moveEnd",
            CHANGE: "change",
            RESTORE: "restore",
            SELECT: "select",
            NEED_PANEL: "needPanel",
            VISIBLE_CHANGE: "visibleChange"
        },
        xe = {
            HOLD: "hold",
            CHANGE: "change",
            RELEASE: "release",
            ANIMATION_END: "animationEnd",
            FINISH: "finish"
        },
        Ee = 0,
        ye = 1,
        be = 2,
        Ce = 3,
        Se = 4,
        we = {
            PREV: "PREV",
            NEXT: "NEXT"
        },
        Ie = {
            prev: !0,
            next: !0,
            moveTo: !0,
            getIndex: !0,
            getAllPanels: !0,
            getCurrentPanel: !0,
            getElement: !0,
            getPanel: !0,
            getPanelCount: !0,
            getStatus: !0,
            getVisiblePanels: !0,
            enableInput: !0,
            disableInput: !0,
            destroy: !0,
            resize: !0,
            setStatus: !0,
            isPlaying: !0
        },
        Te = function() {
            var t = {
                webkitTransform: "-webkit-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                OTransform: "-o-transform",
                transform: "transform"
            };
            if (!pe) return {
                name: t.transform,
                has3d: !0
            };
            var e = document.documentElement.style,
                n = "";
            for (var i in t) i in e && (n = i);
            if (!n) throw new Error("Browser doesn't support CSS3 2D Transforms.");
            var r = document.createElement("div");
            document.documentElement.insertBefore(r, null), r.style[n] = "translate3d(1px, 1px, 1px)";
            var o = window.getComputedStyle(r).getPropertyValue(t[n]);
            r.parentElement.removeChild(r);
            var s = {
                name: n,
                has3d: 0 < o.length && "none" !== o
            };
            return Te = function() {
                return s
            }, s
        },
        Ae = Te();

    function Me(i) {
        for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
        return t.forEach(function(n) {
            Object.keys(n).forEach(function(t) {
                var e = n[t];
                i[t] = e
            })
        }), i
    }

    function ze(t) {
        Array.isArray(t) || (t = [t]);
        var n = [];
        return t.forEach(function(t) {
            if (Oe(t)) {
                var e = document.createElement("div");
                for (e.innerHTML = t, n.push.apply(n, He(e.children)); e.firstChild;) e.removeChild(e.firstChild)
            } else n.push(t)
        }), n
    }

    function Oe(t) {
        return "string" == typeof t
    }

    function Re(t, e) {
        return t.classList ? t.classList.contains(e) : 0 <= t.className.split(" ").indexOf(e)
    }

    function Ne(e, n) {
        Object.keys(n).forEach(function(t) {
            e.style[t] = n[t]
        })
    }

    function _e(t, e, n) {
        return Math.max(Math.min(t, n), e)
    }

    function ke(t, e, n) {
        return e <= t && t <= n
    }

    function He(t) {
        return [].slice.call(t)
    }

    function De(t, e, n) {
        var i = null != n ? n : e / 2,
            r = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;
        if ("number" == typeof t) return _e(t, 0, e);
        for (var o = 0, s = 0, a = r.exec(t); null != a;) {
            var l = a[1],
                u = a[2],
                h = a[3],
                c = parseFloat(u);
            if (o <= 0 && (l = l || "+"), !l) return i;
            "%" === h && (c = c / 100 * e), s += "+" === l ? c : -c, ++o, a = r.exec(t)
        }
        return 0 === o ? i : _e(s, 0, e)
    }

    function Be(t, e) {
        var n = e[0],
            i = e[1],
            r = e[2];
        return i < t && r - i ? (t - i) / (r - i) : t < i && i - n ? (t - i) / (i - n) : t !== i && r - n ? (t - n) / (r - n) : 0
    }

    function Ve(t, e) {
        for (var n = 0; n < t.length; n += 1) {
            var i = t[n];
            if (i && e(i)) return n
        }
        return -1
    }

    function Le(t) {
        for (var e = [], n = 0; n < t; n += 1) e[n] = n;
        return e
    }

    function Fe(t, e, n, i) {
        var r = i ? n - e + 1 : n - e;
        if (t < e) t = n - (i ? (e - t - 1) % r : (e - t) % r);
        else if (n < t) {
            t = e + (i ? (t - n - 1) % r : (t - n) % r)
        }
        return t
    }

    function Xe(t, e) {
        e.className ? t.setAttribute("class", e.className) : t.removeAttribute("class"), e.style ? t.setAttribute("style", e.style) : t.removeAttribute("style")
    }

    function je(t, e) {
        var n;
        if (e) n = {
            x: 0,
            y: 0,
            width: t.offsetWidth,
            height: t.offsetHeight
        };
        else {
            var i = t.getBoundingClientRect();
            n = {
                x: i.left,
                y: i.top,
                width: i.width,
                height: i.height
            }
        }
        return n
    }
    var Ye = function() {
            function l(t, e, n) {
                this.viewport = n, this.prevSibling = null, this.nextSibling = null, this.clonedPanels = [], this.state = {
                    index: e,
                    position: 0,
                    relativeAnchorPosition: 0,
                    size: 0,
                    isClone: !1,
                    isVirtual: !1,
                    cloneIndex: -1,
                    originalStyle: {
                        className: "",
                        style: ""
                    },
                    cachedBbox: null
                }, this.setElement(t)
            }
            var t = l.prototype;
            return t.resize = function(t) {
                var n = this.state,
                    e = this.viewport.options,
                    i = t || this.getBbox();
                this.state.cachedBbox = i;
                var r = n.size;
                n.size = e.horizontal ? i.width : i.height, r !== n.size && (n.relativeAnchorPosition = De(e.anchor, n.size)), n.isClone || this.clonedPanels.forEach(function(t) {
                    var e = t.state;
                    e.size = n.size, e.cachedBbox = n.cachedBbox, e.relativeAnchorPosition = n.relativeAnchorPosition
                })
            }, t.unCacheBbox = function() {
                this.state.cachedBbox = null
            }, t.getProgress = function() {
                var t = this.viewport,
                    e = t.options,
                    n = t.panelManager.getPanelCount(),
                    i = t.getScrollAreaSize();
                return (e.circular ? Math.floor(this.getPosition() / i) * n : 0) + this.getIndex() - t.getCurrentProgress()
            }, t.getOutsetProgress = function() {
                var t = this.viewport,
                    e = [-this.getSize(), t.getRelativeHangerPosition() - this.getRelativeAnchorPosition(), t.getSize()];
                return Be(this.getPosition() - t.getCameraPosition(), e)
            }, t.getVisibleRatio = function() {
                var t = this.viewport,
                    e = this.getSize(),
                    n = this.getPosition() - t.getCameraPosition(),
                    i = n + e,
                    r = Math.min(t.getSize(), i) - Math.max(n, 0);
                return 0 <= r ? r / e : 0
            }, t.focus = function(t) {
                var e = this.viewport,
                    n = e.getCurrentPanel();
                if (e.getHangerPosition() !== this.getAnchorPosition() && n) {
                    var i = n.getPosition() === this.getPosition() ? "" : Pe.CHANGE;
                    e.moveTo(this, e.findEstimatedPosition(this), i, null, t)
                }
            }, t.update = function(e, t) {
                void 0 === e && (e = null), void 0 === t && (t = !0);
                var n = this.getIdenticalPanels();
                e && n.forEach(function(t) {
                    e(t.getElement())
                }), t && (n.forEach(function(t) {
                    t.unCacheBbox()
                }), this.viewport.addVisiblePanel(this), this.viewport.resize())
            }, t.prev = function() {
                var t = this.viewport.options,
                    e = this.prevSibling;
                if (!e) return null;
                var n = this.getIndex(),
                    i = this.getPosition(),
                    r = e.getIndex(),
                    o = e.getPosition(),
                    s = e.getSize(),
                    a = 1 < n - r,
                    l = t.infinite && 0 < n && n < r;
                if (a || l) return null;
                var u = i - s - t.gap,
                    h = e;
                return o !== u && (h = e.clone(e.getCloneIndex(), !0)).setPosition(u), h
            }, t.next = function() {
                var t = this.viewport,
                    e = t.options,
                    n = this.nextSibling,
                    i = t.panelManager.getLastIndex();
                if (!n) return null;
                var r = this.getIndex(),
                    o = this.getPosition(),
                    s = n.getIndex(),
                    a = n.getPosition(),
                    l = 1 < s - r,
                    u = e.infinite && r < i && s < r;
                if (l || u) return null;
                var h = o + this.getSize() + e.gap,
                    c = n;
                return a !== h && (c = n.clone(n.getCloneIndex(), !0)).setPosition(h), c
            }, t.insertBefore = function(t) {
                var e = this.viewport,
                    n = ze(t),
                    i = e.panelManager.firstPanel(),
                    r = this.prevSibling,
                    o = r && i.getIndex() !== this.getIndex() ? Math.max(r.getIndex() + 1, this.getIndex() - n.length) : Math.max(this.getIndex() - n.length, 0);
                return e.insert(o, n)
            }, t.insertAfter = function(t) {
                return this.viewport.insert(this.getIndex() + 1, t)
            }, t.remove = function() {
                return this.viewport.remove(this.getIndex()), this
            }, t.destroy = function(t) {
                if (!t.preserveUI) {
                    var e = this.state.originalStyle;
                    Xe(this.element, e)
                }
                for (var n in this) this[n] = null
            }, t.getElement = function() {
                return this.element
            }, t.getAnchorPosition = function() {
                return this.state.position + this.state.relativeAnchorPosition
            }, t.getRelativeAnchorPosition = function() {
                return this.state.relativeAnchorPosition
            }, t.getIndex = function() {
                return this.state.index
            }, t.getPosition = function() {
                return this.state.position
            }, t.getSize = function() {
                return this.state.size
            }, t.getBbox = function() {
                var t = this.state,
                    e = this.viewport,
                    n = this.element,
                    i = e.options;
                if (n) {
                    if (!t.cachedBbox) {
                        var r = Boolean(n.parentNode),
                            o = e.getCameraElement();
                        r || (o.appendChild(n), e.addVisiblePanel(this)), t.cachedBbox = je(n, i.useOffset), !r && e.options.renderExternal && o.removeChild(n)
                    }
                } else t.cachedBbox = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                return t.cachedBbox
            }, t.isClone = function() {
                return this.state.isClone
            }, t.getOverlappedClass = function(t) {
                for (var e = this.element, n = 0, i = t; n < i.length; n++) {
                    var r = i[n];
                    if (Re(e, r)) return r
                }
            }, t.getCloneIndex = function() {
                return this.state.cloneIndex
            }, t.getClonedPanels = function() {
                return this.state.isClone ? this.original.getClonedPanels() : this.clonedPanels
            }, t.getIdenticalPanels = function() {
                return this.state.isClone ? this.original.getIdenticalPanels() : [this].concat(this.clonedPanels)
            }, t.getOriginalPanel = function() {
                return this.state.isClone ? this.original : this
            }, t.setIndex = function(e) {
                this.state.index = e, this.clonedPanels.forEach(function(t) {
                    return t.state.index = e
                })
            }, t.setPosition = function(t) {
                return this.state.position = t, this
            }, t.setPositionCSS = function(t) {
                if (void 0 === t && (t = 0), this.element) {
                    var e = this.state,
                        n = e.position,
                        i = this.viewport.options,
                        r = this.element.style,
                        o = i.horizontal ? r.left : r.top,
                        s = n - t + "px";
                    e.isVirtual || o === s || (i.horizontal ? r.left = s : r.top = s)
                }
            }, t.clone = function(t, e, n) {
                void 0 === e && (e = !1);
                var i = this.state,
                    r = this.viewport,
                    o = n;
                !o && this.element && (o = e ? this.element : this.element.cloneNode(!0));
                var s = new l(o, i.index, r),
                    a = s.state;
                return s.original = i.isClone ? this.original : this, a.isClone = !0, a.isVirtual = e, a.cloneIndex = t, a.size = i.size, a.relativeAnchorPosition = i.relativeAnchorPosition, a.originalStyle = i.originalStyle, a.cachedBbox = i.cachedBbox, e ? (s.prevSibling = this.prevSibling, s.nextSibling = this.nextSibling) : this.clonedPanels.push(s), s
            }, t.removeElement = function() {
                if (!this.viewport.options.renderExternal) {
                    var t = this.element;
                    t.parentNode && t.parentNode.removeChild(t)
                }
                this.state.isClone || this.removeClonedPanelsAfter(0)
            }, t.removeClonedPanelsAfter = function(t) {
                var e = this.viewport.options,
                    n = this.clonedPanels.splice(t);
                e.renderExternal || n.forEach(function(t) {
                    t.removeElement()
                })
            }, t.setElement = function(t) {
                if (t) {
                    var e, n, i = this.element;
                    if (t !== i) {
                        var r = this.viewport.options;
                        if (i) r.horizontal ? t.style.left = i.style.left : t.style.top = i.style.top;
                        else {
                            var o = this.state.originalStyle;
                            o.className = t.getAttribute("class"), o.style = t.getAttribute("style")
                        }
                        this.element = t, r.classPrefix && (e = t, n = r.classPrefix + "-panel", e.classList ? e.classList.add(n) : Re(e, n) || (e.className = (e.className + " " + n).replace(/\s{2,}/g, " "))), Ne(this.element, me)
                    }
                }
            }, l
        }(),
        qe = function() {
            function t(t, e) {
                this.cameraElement = t, this.panels = [], this.clones = [], this.range = {
                    min: -1,
                    max: -1
                }, this.length = 0, this.cloneCount = 0, this.options = e, this.lastIndex = e.lastIndex
            }
            var e = t.prototype;
            return e.firstPanel = function() {
                return this.panels[this.range.min]
            }, e.lastPanel = function() {
                return this.panels[this.range.max]
            }, e.allPanels = function() {
                return this.panels.concat(this.clones.reduce(function(t, e) {
                    return t.concat(e)
                }, []))
            }, e.originalPanels = function() {
                return this.panels
            }, e.clonedPanels = function() {
                return this.clones
            }, e.replacePanels = function(t, e) {
                this.panels = t, this.clones = e, this.range = {
                    min: Ve(t, function(t) {
                        return Boolean(t)
                    }),
                    max: t.length - 1
                }, this.length = t.filter(function(t) {
                    return Boolean(t)
                }).length
            }, e.has = function(t) {
                return !!this.panels[t]
            }, e.get = function(t) {
                return this.panels[t]
            }, e.getPanelCount = function() {
                return this.length
            }, e.getLastIndex = function() {
                return this.lastIndex
            }, e.getRange = function() {
                return this.range
            }, e.getCloneCount = function() {
                return this.cloneCount
            }, e.setLastIndex = function(t) {
                this.lastIndex = t;
                var e = this.firstPanel(),
                    n = this.lastPanel();
                if (e && n) {
                    var i = this.range;
                    if (n.getIndex() > t) {
                        var r = this.panels.splice(t + 1);
                        this.length -= r.length;
                        var o = r.filter(function(t) {
                            return !!t
                        })[0].prevSibling;
                        i.max = o ? o.getIndex() : i.min = -1, this.shouldRender() && r.forEach(function(t) {
                            return t.removeElement()
                        })
                    }
                }
            }, e.setCloneCount = function(t) {
                this.cloneCount = t
            }, e.insert = function(n, t) {
                var i = this.panels,
                    e = this.range,
                    r = this.options.circular,
                    o = this.lastIndex,
                    s = this.findFirstPanelFrom(n),
                    a = this.firstPanel(),
                    l = s ? s.getElement() : r && a ? a.getClonedPanels()[0].getElement() : null;
                this.insertNewPanels(t, l);
                var u = t.length;
                if (n > e.max) t.forEach(function(t, e) {
                    i[n + e] = t
                });
                else {
                    var h = i.slice(n, n + t.length),
                        c = Ve(h, function(t) {
                            return !!t
                        });
                    if (c < 0 && (c = h.length), u = t.length - c, i.splice.apply(i, [n, c].concat(t)), i.length > o + 1) {
                        var f = i.splice(o + 1).filter(function(t) {
                            return Boolean(t)
                        });
                        this.length -= f.length;
                        var p = o - Ve(this.panels.concat().reverse(), function(t) {
                            return !!t
                        });
                        this.panels.splice(p + 1), this.range.max = p, this.shouldRender() && f.forEach(function(t) {
                            return t.removeElement()
                        })
                    }
                }
                if (0 < u && i.slice(n + t.length).forEach(function(t) {
                        t.setIndex(t.getIndex() + u)
                    }), this.length += t.length, this.updateIndex(n), r) {
                    this.addNewClones(n, t, t.length - u, s);
                    var g = this.clones,
                        d = this.panels.length;
                    g[0] && g[0].length > o + 1 && g.forEach(function(t) {
                        t.splice(d)
                    })
                }
                return u
            }, e.replace = function(t, e) {
                var n = this.panels,
                    i = this.range,
                    r = this.options.circular,
                    o = this.findFirstPanelFrom(t + e.length),
                    s = this.firstPanel(),
                    a = o ? o.getElement() : r && s ? s.getClonedPanels()[0].getElement() : null;
                this.insertNewPanels(e, a), t > i.max && (n[t] = null);
                var l = n.splice.apply(n, [t, e.length].concat(e)),
                    u = l.filter(function(t) {
                        return Boolean(t)
                    }).length;
                return this.length += e.length - u, this.updateIndex(t), r && this.addNewClones(t, e, e.length, o), this.shouldRender() && l.forEach(function(t) {
                    return t && t.removeElement()
                }), l
            }, e.remove = function(e, n) {
                void 0 === n && (n = 1);
                var t = this.options.circular,
                    i = this.panels,
                    r = this.clones;
                n = Math.max(n, 0);
                var o = i.splice(e, n).filter(function(t) {
                    return !!t
                });
                this.shouldRender() && o.forEach(function(t) {
                    return t.removeElement()
                }), t && r.forEach(function(t) {
                    t.splice(e, n)
                }), i.slice(e).forEach(function(t) {
                    t.setIndex(t.getIndex() - n)
                });
                var s = i.length - 1;
                if (!i[s]) {
                    var a = Ve(i.concat().reverse(), function(t) {
                        return !!t
                    });
                    s = a < 0 ? -1 : s - a, i.splice(s + 1), t && r.forEach(function(t) {
                        t.splice(s + 1)
                    })
                }
                return this.range = {
                    min: Ve(i, function(t) {
                        return !!t
                    }),
                    max: s
                }, this.length -= o.length, this.length <= 0 && (this.clones = [], this.cloneCount = 0), o
            }, e.chainAllPanels = function() {
                var r = this.allPanels().filter(function(t) {
                        return !!t
                    }),
                    t = r.length;
                if (!(t <= 1)) {
                    r.slice(1, r.length - 1).forEach(function(t, e) {
                        var n = r[e],
                            i = r[e + 2];
                        t.prevSibling = n, t.nextSibling = i
                    });
                    var e = r[0],
                        n = r[t - 1];
                    e.prevSibling = null, e.nextSibling = r[1], n.prevSibling = r[t - 2], n.nextSibling = null, this.options.circular && ((e.prevSibling = n).nextSibling = e)
                }
            }, e.insertClones = function(t, n, e, i) {
                void 0 === i && (i = 0);
                var r = this.clones,
                    o = this.lastIndex;
                if (r[t]) {
                    var s = r[t];
                    n >= s.length ? e.forEach(function(t, e) {
                        s[n + e] = t
                    }) : (s.splice.apply(s, [n, i].concat(e)), e.length > o + 1 && e.splice(o + 1))
                } else {
                    var a = [];
                    e.forEach(function(t, e) {
                        a[n + e] = t
                    }), r[t] = a
                }
            }, e.removeClonesAfter = function(e) {
                this.panels.forEach(function(t) {
                    t.removeClonedPanelsAfter(e)
                }), this.clones.splice(e)
            }, e.findPanelOf = function(t) {
                for (var e = 0, n = this.allPanels(); e < n.length; e++) {
                    var i = n[e];
                    if (i)
                        if (i.getElement().contains(t)) return i
                }
            }, e.findFirstPanelFrom = function(t) {
                for (var e = 0, n = this.panels.slice(t); e < n.length; e++) {
                    var i = n[e];
                    if (i && i.getIndex() >= t && i.getElement().parentNode) return i
                }
            }, e.addNewClones = function(o, s, a, t) {
                for (var l = this, u = this.cameraElement, e = this.getCloneCount(), n = this.lastPanel(), h = n ? n.getClonedPanels() : [], c = t ? t.getClonedPanels() : [], i = function(n) {
                        var t = c[n],
                            e = h[n],
                            i = t ? t.getElement() : e ? e.getElement().nextElementSibling : null,
                            r = s.map(function(t) {
                                var e = t.clone(n);
                                return l.shouldRender() && u.insertBefore(e.getElement(), i), e
                            });
                        f.insertClones(n, o, r, a)
                    }, f = this, r = 0, p = Le(e); r < p.length; r++) {
                    i(p[r])
                }
            }, e.updateIndex = function(t) {
                var e = this.panels,
                    n = this.range,
                    i = e.length - 1;
                i > n.max && (n.max = i), (t < n.min || n.min < 0) && (n.min = t)
            }, e.insertNewPanels = function(t, e) {
                if (this.shouldRender()) {
                    var n = document.createDocumentFragment();
                    t.forEach(function(t) {
                        return n.appendChild(t.getElement())
                    }), this.cameraElement.insertBefore(n, e)
                }
            }, e.shouldRender = function() {
                var t = this.options;
                return !t.renderExternal && !t.renderOnlyVisible
            }, t
        }(),
        Ge = function() {
            function t() {
                this.delta = 0, this.direction = null, this.targetPanel = null, this.lastPosition = 0
            }
            var e = t.prototype;
            return e.onEnter = function(t) {
                this.delta = t.delta, this.direction = t.direction, this.targetPanel = t.targetPanel, this.lastPosition = t.lastPosition
            }, e.onExit = function(t) {}, e.onHold = function(t, e) {}, e.onChange = function(t, e) {}, e.onRelease = function(t, e) {}, e.onAnimationEnd = function(t, e) {}, e.onFinish = function(t, e) {}, t
        }(),
        We = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = Ee, t.holding = !1, t.playing = !1, t
            }
            r(t, e);
            var n = t.prototype;
            return n.onEnter = function() {
                this.direction = null, this.targetPanel = null, this.delta = 0, this.lastPosition = 0
            }, n.onHold = function(t, e) {
                var n = e.flicking,
                    i = e.viewport,
                    r = e.triggerEvent,
                    o = e.transitTo;
                if (n.getPanelCount() <= 0) return i.options.infinite && i.moveCamera(i.getCameraPosition(), t), void o(Se);
                this.lastPosition = i.getCameraPosition(), r(Pe.HOLD_START, t, !0).onSuccess(function() {
                    o(ye)
                }).onStopped(function() {
                    o(Se)
                })
            }, n.onChange = function(t, e) {
                var n = e.triggerEvent,
                    i = e.transitTo;
                n(Pe.MOVE_START, t, !1).onSuccess(function() {
                    i(Ce).onChange(t, e)
                }).onStopped(function() {
                    i(Se)
                })
            }, t
        }(Ge),
        Ue = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = ye, t.holding = !0, t.playing = !0, t.releaseEvent = null, t
            }
            r(t, e);
            var n = t.prototype;
            return n.onChange = function(t, e) {
                var n = e.flicking,
                    i = e.triggerEvent,
                    r = e.transitTo,
                    o = n.options.horizontal ? t.inputEvent.offsetX : t.inputEvent.offsetY;
                this.direction = o < 0 ? we.NEXT : we.PREV, i(Pe.MOVE_START, t, !0).onSuccess(function() {
                    r(be).onChange(t, e)
                }).onStopped(function() {
                    r(Se)
                })
            }, n.onRelease = function(t, e) {
                var n = e.viewport,
                    i = e.triggerEvent,
                    r = e.transitTo;
                if (i(Pe.HOLD_END, t, !0), 0 !== t.delta.flick) return t.setTo({
                    flick: n.getCameraPosition()
                }, 0), void r(Ee);
                this.releaseEvent = t
            }, n.onFinish = function(t, e) {
                var n = e.viewport,
                    i = e.triggerEvent;
                if ((0, e.transitTo)(Ee), this.releaseEvent) {
                    var r, o = this.releaseEvent.inputEvent.srcEvent;
                    if ("touchend" === o.type) {
                        var s = o.changedTouches[0];
                        r = document.elementFromPoint(s.clientX, s.clientY)
                    } else r = o.target;
                    var a = n.panelManager.findPanelOf(r),
                        l = n.getCameraPosition();
                    if (a) {
                        var u = a.getPosition();
                        i(Pe.SELECT, null, !0, {
                            direction: l < u ? we.NEXT : u < l ? we.PREV : null,
                            index: a.getIndex(),
                            panel: a
                        })
                    }
                }
            }, t
        }(Ge),
        Je = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = be, t.holding = !0, t.playing = !0, t
            }
            r(t, e);
            var n = t.prototype;
            return n.onChange = function(t, e) {
                var n = e.moveCamera,
                    i = e.transitTo;
                t.delta.flick && n(t).onStopped(function() {
                    i(Se)
                })
            }, n.onRelease = function(t, e) {
                var n = e.flicking,
                    i = e.viewport,
                    r = e.triggerEvent,
                    o = e.transitTo,
                    s = e.stopCamera,
                    a = this.delta,
                    l = Math.abs(a),
                    u = n.options,
                    h = u.horizontal,
                    c = i.moveType,
                    f = t.inputEvent,
                    p = h ? f.velocityX : f.velocityY,
                    g = h ? f.deltaX : f.deltaY,
                    d = 1 < Math.abs(p) ? p < 0 : 0 < l ? 0 < a : g < 0,
                    v = i.options.bound ? Math.max(l, Math.abs(g)) : l,
                    m = f.deltaX ? Math.abs(180 * Math.atan(f.deltaY / f.deltaX) / Math.PI) : 90,
                    P = h ? m <= u.thresholdAngle : m > u.thresholdAngle,
                    x = v >= u.threshold && P,
                    E = {
                        viewport: i,
                        axesEvent: t,
                        state: this,
                        swipeDistance: v,
                        isNextDirection: d
                    };
                r(Pe.HOLD_END, t, !0);
                var y = this.targetPanel;
                if (!x && y) {
                    var b = c.findPanelWhenInterrupted(E);
                    return i.moveTo(b.panel, b.destPos, b.eventType, t, b.duration), void o(Ce)
                }
                var C = i.getCurrentPanel(),
                    S = i.getNearestPanel();
                if (!C || !S) return t.stop(), void o(Ee);
                var w = x ? c.findTargetPanel(E) : c.findRestorePanel(E);
                i.moveTo(w.panel, w.destPos, w.eventType, t, w.duration).onSuccess(function() {
                    o(Ce)
                }).onStopped(function() {
                    o(Se), s(t)
                })
            }, t
        }(Ge),
        Qe = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = Ce, t.holding = !1, t.playing = !0, t
            }
            r(t, e);
            var n = t.prototype;
            return n.onHold = function(t, e) {
                var n = e.viewport,
                    i = e.triggerEvent,
                    r = e.transitTo,
                    o = n.options,
                    s = n.getScrollArea(),
                    a = n.getScrollAreaSize(),
                    l = Math.floor((this.lastPosition + this.delta - s.prev) / a),
                    u = this.targetPanel;
                if (o.circular && 0 !== l && u) {
                    var h = n.panelManager.getCloneCount(),
                        c = u.getPosition(),
                        f = Fe(u.getCloneIndex() - l, -1, h - 1, !0),
                        p = c - l * a,
                        g = u.getIdenticalPanels()[f + 1].clone(f, !0);
                    g.setPosition(p), this.targetPanel = g
                }
                this.delta = 0, this.lastPosition = n.getCameraPosition(), n.setCurrentPanel(n.getNearestPanel()), i(Pe.HOLD_START, t, !0).onSuccess(function() {
                    r(be)
                }).onStopped(function() {
                    r(Se)
                })
            }, n.onChange = function(t, e) {
                var n = e.moveCamera,
                    i = e.transitTo;
                t.delta.flick && n(t).onStopped(function() {
                    i(Se)
                })
            }, n.onFinish = function(t, e) {
                var n = e.flicking,
                    i = e.viewport,
                    r = e.triggerEvent,
                    o = e.transitTo,
                    s = t && t.isTrusted;
                i.options.bound ? i.setCurrentPanel(this.targetPanel) : i.setCurrentPanel(i.getNearestPanel()), n.options.adaptive && i.updateAdaptiveSize(), o(Ee), i.updateCameraPosition(), r(Pe.MOVE_END, t, s, {
                    direction: this.direction
                })
            }, t
        }(Ge),
        Ze = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = Se, t.holding = !1, t.playing = !0, t
            }
            r(t, e);
            var n = t.prototype;
            return n.onAnimationEnd = function(t, e) {
                (0, e.transitTo)(Ee)
            }, n.onChange = function(t, e) {
                var n = e.viewport,
                    i = e.transitTo;
                t.stop(), n.updateAxesPosition(n.getCameraPosition()), i(Ee)
            }, n.onRelease = function(t, e) {
                var n = e.transitTo;
                0 === t.delta.flick && n(Ee)
            }, t
        }(Ge),
        Ke = function() {
            function t() {
                var i = this;
                this.state = new We, this.transitTo = function(t) {
                    var e = i.state;
                    if (e.type !== t) {
                        var n = void 0;
                        switch (t) {
                            case Ee:
                                n = new We;
                                break;
                            case ye:
                                n = new Ue;
                                break;
                            case be:
                                n = new Je;
                                break;
                            case Ce:
                                n = new Qe;
                                break;
                            case Se:
                                n = new Ze
                        }
                        e.onExit(n), n.onEnter(e), i.state = n
                    }
                    return i.state
                }
            }
            var e = t.prototype;
            return e.fire = function(t, e, n) {
                var i = this.state;
                switch (t) {
                    case xe.HOLD:
                        i.onHold(e, n);
                        break;
                    case xe.CHANGE:
                        i.onChange(e, n);
                        break;
                    case xe.RELEASE:
                        i.onRelease(e, n);
                        break;
                    case xe.ANIMATION_END:
                        i.onAnimationEnd(e, n);
                        break;
                    case xe.FINISH:
                        i.onFinish(e, n)
                }
            }, e.getState = function() {
                return this.state
            }, t
        }(),
        $e = function(n) {
            function t(t) {
                var e = n.call(this) || this;
                return e.type = ce.SNAP, e.count = t, e
            }
            r(t, n);
            var e = t.prototype;
            return e.findTargetPanel = function(t) {
                var e = t.viewport,
                    n = t.axesEvent,
                    i = t.swipeDistance,
                    r = this.count,
                    o = Math.abs(n.delta.flick),
                    s = e.getCurrentPanel(),
                    a = e.getNearestPanel(),
                    l = this.calcBrinkOfChange(t),
                    u = a.getIndex() === s.getIndex(),
                    h = e.canSetBoundMode() && u,
                    c = !e.isOutOfBound() && (i <= l || h);
                return 1 < r && l < o ? this.findSnappedPanel(t) : c ? this.findAdjacentPanel(t) : {
                    panel: a,
                    duration: e.options.duration,
                    destPos: e.findEstimatedPosition(a),
                    eventType: i <= l || e.isOutOfBound() && u ? Pe.RESTORE : Pe.CHANGE
                }
            }, e.findSnappedPanel = function(t) {
                for (var e = t.axesEvent, n = t.viewport, i = t.state, r = t.isNextDirection, o = Math.abs(e.delta.flick), s = this.calcBrinkOfChange(t), a = this.count, l = n.options, u = n.getScrollAreaSize(), h = l.gap / 2, c = e.destPos.flick + n.getRelativeHangerPosition(), f = n.getNearestPanel(), p = f.getCloneIndex() + 1, g = 0; g < a;) {
                    var d = f.getOriginalPanel(),
                        v = d.getPosition() + p * u,
                        m = d.getSize();
                    if (r && c < v + m + h || !r && v - h < c) break;
                    var P = r ? f.nextSibling : f.prevSibling;
                    if (!P) break;
                    var x = f.getIndex(),
                        E = P.getIndex();
                    (r && E <= x || !r && x <= E) && (p = r ? p + 1 : p - 1), f = P, g += 1
                }
                var y = f.getOriginalPanel().getPosition();
                0 !== p && (f = f.clone(f.getCloneIndex(), !0)).setPosition(y + p * u);
                var b = n.options.duration,
                    C = _e(e.duration, b, b * g);
                return {
                    panel: f,
                    destPos: n.findEstimatedPosition(f),
                    duration: C,
                    eventType: Math.max(o, i.delta) > s ? Pe.CHANGE : Pe.RESTORE
                }
            }, e.findAdjacentPanel = function(t) {
                var e = t.viewport,
                    n = t.isNextDirection,
                    i = e.options,
                    r = e.getCurrentIndex(),
                    o = e.panelManager.get(r),
                    s = e.getHangerPosition(),
                    a = e.getScrollArea(),
                    l = o.getIdenticalPanels()[1],
                    u = i.circular && Math.abs(o.getAnchorPosition() - s) > Math.abs(l.getAnchorPosition() - s) ? l : o,
                    h = u.getPosition(),
                    c = n ? u.nextSibling : u.prevSibling,
                    f = c ? Pe.CHANGE : Pe.RESTORE,
                    p = c || u,
                    g = p.getRelativeAnchorPosition(),
                    d = (i.circular ? n ? h + u.getSize() + g + i.gap : h - (p.getSize() - g) - i.gap : p.getAnchorPosition()) - e.getRelativeHangerPosition();
                return {
                    panel: p,
                    destPos: e.canSetBoundMode() ? _e(d, a.prev, a.next) : d,
                    duration: i.duration,
                    eventType: f
                }
            }, t
        }(function() {
            function t() {}
            var e = t.prototype;
            return e.is = function(t) {
                return t === this.type
            }, e.findRestorePanel = function(t) {
                var e = t.viewport,
                    n = e.options,
                    i = n.circular ? this.findRestorePanelInCircularMode(t) : e.getCurrentPanel();
                return {
                    panel: i,
                    destPos: e.findEstimatedPosition(i),
                    duration: n.duration,
                    eventType: Pe.RESTORE
                }
            }, e.findPanelWhenInterrupted = function(t) {
                var e = t.state,
                    n = t.viewport,
                    i = e.targetPanel;
                return {
                    panel: i,
                    destPos: n.findEstimatedPosition(i),
                    duration: n.options.duration,
                    eventType: ""
                }
            }, e.calcBrinkOfChange = function(t) {
                var e = t.viewport,
                    n = t.isNextDirection,
                    i = e.options,
                    r = e.getCurrentPanel(),
                    o = i.gap / 2,
                    s = r.getRelativeAnchorPosition(),
                    a = n ? r.getSize() - s + o : s + o;
                return a = Math.max(a, i.threshold)
            }, e.findRestorePanelInCircularMode = function(t) {
                var e = t.viewport,
                    n = e.getCurrentPanel().getOriginalPanel(),
                    i = e.getHangerPosition(),
                    r = n.getIdenticalPanels()[1],
                    o = Math.abs(n.getAnchorPosition() - i) > Math.abs(r.getAnchorPosition() - i);
                return !t.isNextDirection && o ? r : n
            }, t
        }()),
        tn = function(c) {
            function t() {
                var t = c.call(this, 1 / 0) || this;
                return t.type = ce.FREE_SCROLL, t
            }
            r(t, c);
            var e = t.prototype;
            return e.findTargetPanel = function(t) {
                var e = t.axesEvent,
                    n = t.state,
                    i = t.viewport,
                    r = e.destPos.flick,
                    o = this.calcBrinkOfChange(t),
                    s = i.getScrollArea(),
                    a = i.getCurrentPanel(),
                    l = i.options;
                if (o < Math.abs(e.delta.flick + n.delta)) {
                    var u = c.prototype.findSnappedPanel.call(this, t);
                    return u.duration = e.duration, u.destPos = r, u.eventType = l.circular || u.panel !== a ? Pe.CHANGE : "", u
                }
                var h = l.circular ? Fe(r, s.prev, s.next, !1) : r;
                return h = _e(h, s.prev, s.next), h += i.getRelativeHangerPosition(), {
                    panel: i.findNearestPanelAt(h),
                    destPos: r,
                    duration: e.duration,
                    eventType: ""
                }
            }, e.findRestorePanel = function(t) {
                return this.findTargetPanel(t)
            }, e.findPanelWhenInterrupted = function(t) {
                var e = t.viewport;
                return {
                    panel: e.getNearestPanel(),
                    destPos: e.getCameraPosition(),
                    duration: 0,
                    eventType: ""
                }
            }, e.calcBrinkOfChange = function(t) {
                var e = t.viewport,
                    n = t.isNextDirection,
                    i = e.options,
                    r = e.getCurrentPanel(),
                    o = i.gap / 2,
                    s = e.stateMachine.getState().lastPosition,
                    a = r.getPosition(),
                    l = s + e.getRelativeHangerPosition(),
                    u = e.getScrollAreaSize(),
                    h = n ? a + r.getSize() - l + o : l - a + o;
                return h = Math.abs(h % u), Math.min(h, u - h)
            }, t
        }($e),
        en = function() {
            function t(t, e, n) {
                var i = this;
                this.plugins = [], this.stopCamera = function(t) {
                    t && t.setTo && t.setTo({
                        flick: i.state.position
                    }, 0), i.stateMachine.transitTo(Ee)
                }, this.flicking = t, this.triggerEvent = n, this.state = {
                    size: 0,
                    position: 0,
                    panelMaintainRatio: 0,
                    relativeHangerPosition: 0,
                    positionOffset: 0,
                    scrollArea: {
                        prev: 0,
                        next: 0
                    },
                    translate: Ae,
                    infiniteThreshold: 0,
                    checkedIndexes: [],
                    isAdaptiveCached: !1,
                    isViewportGiven: !1,
                    isCameraGiven: !1,
                    originalViewportStyle: {
                        className: null,
                        style: null
                    },
                    originalCameraStyle: {
                        className: null,
                        style: null
                    },
                    cachedBbox: null
                }, this.options = e, this.stateMachine = new Ke, this.visiblePanels = [], this.panelBboxes = {}, this.build()
            }
            var e = t.prototype;
            return e.moveTo = function(t, e, n, i, r) {
                var o = this;
                void 0 === r && (r = this.options.duration);
                var s, a = this.state,
                    l = this.stateMachine.getState(),
                    u = a.position,
                    h = !!i && i.isTrusted,
                    c = e === u ? null : u < e ? we.NEXT : we.PREV;
                return (s = n === Pe.CHANGE ? this.triggerEvent(Pe.CHANGE, i, h, {
                    index: t.getIndex(),
                    panel: t,
                    direction: c
                }) : n === Pe.RESTORE ? this.triggerEvent(Pe.RESTORE, i, h) : {
                    onSuccess: function(t) {
                        return t(), this
                    },
                    onStopped: function() {
                        return this
                    }
                }).onSuccess(function() {
                    l.delta = 0, l.lastPosition = o.getCameraPosition(), l.targetPanel = t, l.direction = e === u ? null : u < e ? we.NEXT : we.PREV, e === u && (o.nearestPanel = t, o.currentPanel = t), i && i.setTo ? i.setTo({
                        flick: e
                    }, r) : o.axes.setTo({
                        flick: e
                    }, r)
                }), s
            }, e.moveCamera = function(t, e) {
                var n = this.state,
                    i = this.options,
                    r = n.translate.name,
                    o = n.scrollArea;
                i.circular && !ke(t, o.prev, o.next) && (t = Fe(t, o.prev, o.next, !1)), n.position = t, this.nearestPanel = this.findNearestPanel();
                var s = this.nearestPanel,
                    a = s ? s.getPosition() : 0;
                if (s) {
                    var l = this.getHangerPosition(),
                        u = s.getPosition(),
                        h = s.getSize(),
                        c = i.gap / 2;
                    n.panelMaintainRatio = (l - u + c) / (h + 2 * c)
                } else n.panelMaintainRatio = 0;
                this.checkNeedPanel(e), t += (s ? s.getPosition() : 0) - a, n.position = t, this.updateVisiblePanels();
                var f = i.renderOnlyVisible ? n.positionOffset : 0,
                    p = (i.horizontal ? [-(t - f), 0] : [0, -(t - f)]).map(function(t) {
                        return Math.round(t) + "px"
                    }).join(", ");
                this.cameraElement.style[r] = n.translate.has3d ? "translate3d(" + p + ", 0px)" : "translate(" + p + ")"
            }, e.unCacheBbox = function() {
                var t = this.state,
                    e = this.options;
                t.cachedBbox = null, this.visiblePanels = [];
                var n = this.viewportElement;
                e.horizontal ? n.style.height = "" : n.style.width = "", t.isAdaptiveCached = !1, this.panelBboxes = {}
            }, e.resize = function() {
                this.updateSize(), this.updateOriginalPanelPositions(), this.updateAdaptiveSize(), this.updateScrollArea(), this.updateClonePanels(), this.updateCameraPosition(), this.updatePlugins()
            }, e.findNearestPanel = function() {
                var t = this.state,
                    e = this.panelManager,
                    n = this.getHangerPosition();
                return this.isOutOfBound() ? t.position <= t.scrollArea.prev ? e.firstPanel() : e.lastPanel() : this.findNearestPanelAt(n)
            }, e.findNearestPanelAt = function(t) {
                for (var e, n = 1 / 0, i = 0, r = this.panelManager.allPanels(); i < r.length; i++) {
                    var o = r[i];
                    if (o) {
                        var s = o.getPosition(),
                            a = s + o.getSize(),
                            l = ke(t, s, a) ? 0 : Math.min(Math.abs(s - t), Math.abs(a - t));
                        if (n < l) break;
                        if (l === n && Math.abs(t - e.getAnchorPosition()) < Math.abs(t - o.getAnchorPosition())) break;
                        n = l, e = o
                    }
                }
                return e
            }, e.findNearestIdenticalPanel = function(t) {
                var i = t,
                    r = 1 / 0,
                    o = this.getHangerPosition();
                return t.getIdenticalPanels().forEach(function(t) {
                    var e = t.getAnchorPosition(),
                        n = Math.abs(e - o);
                    n < r && (i = t, r = n)
                }), i
            }, e.findShortestPositionToPanel = function(t) {
                var e = this.state,
                    n = this.options,
                    i = t.getAnchorPosition(),
                    r = this.getHangerPosition(),
                    o = Math.abs(r - i),
                    s = e.scrollArea.next - e.scrollArea.prev;
                if (n.circular) return o <= s - o ? i - e.relativeHangerPosition : r < i ? i - e.relativeHangerPosition - s : i - e.relativeHangerPosition + s;
                var a = i - e.relativeHangerPosition;
                return this.canSetBoundMode() ? _e(a, e.scrollArea.prev, e.scrollArea.next) : a
            }, e.findEstimatedPosition = function(t) {
                var e = this.getScrollArea(),
                    n = t.getAnchorPosition() - this.getRelativeHangerPosition();
                return n = this.canSetBoundMode() ? _e(n, e.prev, e.next) : n
            }, e.addVisiblePanel = function(t) {
                this.getVisibleIndexOf(t) < 0 && this.visiblePanels.push(t)
            }, e.enable = function() {
                this.panInput.enable()
            }, e.disable = function() {
                this.panInput.disable()
            }, e.insert = function(r, t) {
                var n = this,
                    e = this.panelManager.getLastIndex();
                if (r < 0 || e < r) return [];
                var o = this.state,
                    i = this.options,
                    s = ze(t).map(function(t, e) {
                        return new Ye(t, r + e, n)
                    }).slice(0, e - r + 1);
                if (s.length <= 0) return [];
                var a = this.panelManager.insert(r, s);
                if (this.resizePanels(s), !this.currentPanel) {
                    this.currentPanel = s[0], this.nearestPanel = s[0];
                    var l = s[0],
                        u = this.findEstimatedPosition(l);
                    o.position = u, this.updateAxesPosition(u), o.panelMaintainRatio = (l.getRelativeAnchorPosition() + i.gap / 2) / (l.getSize() + i.gap)
                }
                return this.updateCheckedIndexes({
                    min: r,
                    max: r
                }), o.checkedIndexes.forEach(function(t, e) {
                    var n = t[0],
                        i = t[1];
                    r < n && o.checkedIndexes.splice(e, 1, [n + a, i + a])
                }), this.resize(), s
            }, e.replace = function(n, t) {
                var i = this,
                    e = this.state,
                    r = this.options,
                    o = this.panelManager,
                    s = o.getLastIndex();
                if (n < 0 || s < n) return [];
                var a = ze(t).map(function(t, e) {
                    return new Ye(t, n + e, i)
                }).slice(0, s - n + 1);
                if (a.length <= 0) return [];
                o.replace(n, a).forEach(function(t) {
                    var e = i.getVisibleIndexOf(t); - 1 < e && i.visiblePanels.splice(e, 1)
                }), this.resizePanels(a);
                var l = this.currentPanel;
                if (!l) {
                    this.currentPanel = a[0], this.nearestPanel = a[0];
                    var u = a[0],
                        h = this.findEstimatedPosition(u);
                    e.position = h, this.updateAxesPosition(h), e.panelMaintainRatio = (u.getRelativeAnchorPosition() + r.gap / 2) / (u.getSize() + r.gap)
                } else ke(l.getIndex(), n, n + a.length - 1) && (this.currentPanel = o.get(l.getIndex()));
                return this.updateCheckedIndexes({
                    min: n,
                    max: n + a.length - 1
                }), this.resize(), a
            }, e.remove = function(t, e) {
                void 0 === e && (e = 1);
                var n = this.state;
                t = Math.max(t, 0);
                var i = this.panelManager,
                    r = this.getCurrentIndex(),
                    o = i.remove(t, e);
                if (ke(r, t, t + e - 1)) {
                    var s = Math.max(t - 1, i.getRange().min);
                    this.currentPanel = i.get(s)
                }
                0 < e && (this.updateCheckedIndexes({
                    min: t - 1,
                    max: t + e
                }), this.visiblePanels = []), i.getPanelCount() <= 0 && (this.currentPanel = void 0, this.nearestPanel = void 0), this.resize();
                var a = n.scrollArea;
                if (n.position < a.prev || n.position > a.next) {
                    var l = Fe(n.position, a.prev, a.next, !1);
                    this.moveCamera(l), this.updateAxesPosition(l)
                }
                return o
            }, e.updateAdaptiveSize = function() {
                var t = this.state,
                    e = this.options,
                    i = e.horizontal,
                    n = this.getCurrentPanel();
                if (n) {
                    var r = e.adaptive || !t.isAdaptiveCached,
                        o = this.viewportElement.style;
                    if (r) {
                        var s = void 0;
                        if (e.adaptive) {
                            var a = n.getBbox();
                            s = i ? a.height : a.width
                        } else {
                            s = this.panelManager.originalPanels().reduce(function(t, e) {
                                var n = e.getBbox();
                                return Math.max(t, i ? n.height : n.width)
                            }, 0)
                        }
                        if (!t.isAdaptiveCached) {
                            var l = this.updateBbox();
                            s = Math.max(s, i ? l.height : l.width), t.isAdaptiveCached = !0
                        }
                        var u = s + "px";
                        i ? (o.height = u, t.cachedBbox.height = s) : (o.width = u, t.cachedBbox.width = s)
                    }
                }
            }, e.updateCameraPosition = function() {
                var t = this.state,
                    e = this.getCurrentPanel(),
                    n = this.stateMachine.getState(),
                    i = this.moveType.is(ce.FREE_SCROLL),
                    r = this.getRelativeHangerPosition(),
                    o = this.options.gap / 2;
                if (n.holding || n.playing) this.updateVisiblePanels();
                else {
                    var s;
                    if (i) {
                        var a = this.getNearestPanel();
                        s = a ? a.getPosition() - o + (a.getSize() + 2 * o) * t.panelMaintainRatio - r : this.getCameraPosition()
                    } else s = e ? e.getAnchorPosition() - r : this.getCameraPosition();
                    this.canSetBoundMode() && (s = _e(s, t.scrollArea.prev, t.scrollArea.next)), this.updateAxesPosition(s), this.moveCamera(s)
                }
            }, e.updateBbox = function() {
                var t = this.state,
                    e = this.options,
                    n = this.viewportElement;
                return t.cachedBbox || (t.cachedBbox = je(n, e.useOffset)), t.cachedBbox
            }, e.updatePlugins = function() {
                var e = this;
                this.plugins.forEach(function(t) {
                    t.update && t.update(e.flicking)
                })
            }, e.destroy = function(e) {
                var t = this.state,
                    n = this.flicking.getElement(),
                    i = this.viewportElement,
                    r = this.cameraElement,
                    o = this.panelManager.originalPanels();
                if (this.removePlugins(this.plugins), !e.preserveUI && (Xe(i, t.originalViewportStyle), Xe(r, t.originalCameraStyle), !t.isCameraGiven && !this.options.renderExternal)) {
                    var s = t.isViewportGiven ? i : n,
                        a = t.isViewportGiven ? r : i;
                    o.forEach(function(t) {
                        s.appendChild(t.getElement())
                    }), s.removeChild(a)
                }
                for (var l in this.axes.destroy(), this.panInput.destroy(), o.forEach(function(t) {
                        t.destroy(e)
                    }), this) this[l] = null
            }, e.restore = function(t) {
                var e = t.panels,
                    n = this.options.defaultIndex,
                    i = this.cameraElement,
                    r = this.panelManager;
                i.innerHTML = e.map(function(t) {
                    return t.html
                }).join(""), this.refreshPanels();
                var o = r.originalPanels(),
                    s = [];
                e.forEach(function(t, e) {
                    var n = o[e];
                    n.setIndex(t.index), s[t.index] = n
                }), r.replacePanels(s, []), r.setCloneCount(0);
                var a = r.getPanelCount();
                this.nearestPanel = 0 < a ? (this.currentPanel = r.get(t.index) || r.get(n) || r.firstPanel(), this.currentPanel) : void(this.currentPanel = void 0), this.visiblePanels = s.filter(function(t) {
                    return Boolean(t)
                }), this.resize(), this.axes.setTo({
                    flick: t.position
                }, 0), this.moveCamera(t.position)
            }, e.calcVisiblePanels = function() {
                var t = this.panelManager.allPanels();
                if (this.options.renderOnlyVisible) {
                    var e = this.getCameraPosition(),
                        n = this.getSize(),
                        i = this.nearestPanel,
                        r = function(t, e, n) {
                            for (var i = [], r = t;;) {
                                var o = e(r);
                                if (!o || n(o)) break;
                                i.push(o), r = o
                            }
                            return i
                        },
                        o = this.panelManager.getPanelCount(),
                        s = function(t) {
                            return t.getIndex() + (t.getCloneIndex() + 1) * o
                        },
                        a = r(i, function(t) {
                            var e = t.nextSibling;
                            return e && e.getPosition() >= t.getPosition() ? e : null
                        }, function(t) {
                            return t.getPosition() >= e + n
                        }),
                        l = r(i, function(t) {
                            var e = t.prevSibling;
                            return e && e.getPosition() <= t.getPosition() ? e : null
                        }, function(t) {
                            return t.getPosition() + t.getSize() <= e
                        });
                    return [i].concat(a, l).sort(function(t, e) {
                        return s(t) - s(e)
                    })
                }
                return t.filter(function(t) {
                    var e = t.getOutsetProgress();
                    return -1 < e && e < 1
                })
            }, e.getCurrentPanel = function() {
                return this.currentPanel
            }, e.getCurrentIndex = function() {
                var t = this.currentPanel;
                return t ? t.getIndex() : -1
            }, e.getNearestPanel = function() {
                return this.nearestPanel
            }, e.getCurrentProgress = function() {
                var t = this.stateMachine.getState(),
                    e = t.playing || t.holding ? this.nearestPanel : this.currentPanel,
                    n = this.panelManager;
                if (!e) return NaN;
                var i = this.getScrollArea(),
                    r = i.prev,
                    o = i.next,
                    s = this.getCameraPosition(),
                    a = this.isOutOfBound(),
                    l = e.prevSibling,
                    u = e.nextSibling,
                    h = this.getHangerPosition(),
                    c = e.getAnchorPosition();
                a && l && u && s < o && h - l.getAnchorPosition() < c - h && (u = (e = l).nextSibling, l = e.prevSibling, c = e.getAnchorPosition());
                var f = e.getIndex() + (e.getCloneIndex() + 1) * n.getPanelCount(),
                    p = e.getSize();
                if (a) {
                    var g = this.getRelativeHangerPosition();
                    o + g < c ? h = c + h - g - o : c < r + g && (h = c + h - g - r)
                }
                var d = c <= h,
                    v = this.options.gap,
                    m = c,
                    P = c;
                d ? P = u ? u.getAnchorPosition() : c + p + v : m = l ? l.getAnchorPosition() : c - p - v;
                var x = (h - m) / (P - m);
                return (d ? f : l ? l.getIndex() : f - 1) + x
            }, e.updateAxesPosition = function(t) {
                var e = this.axes;
                e.off(), e.setTo({
                    flick: t
                }, 0), e.on(this.axesHandlers)
            }, e.getSize = function() {
                return this.state.size
            }, e.getScrollArea = function() {
                return this.state.scrollArea
            }, e.isOutOfBound = function() {
                var t = this.state,
                    e = this.options,
                    n = t.scrollArea;
                return !e.circular && e.bound && (t.position <= n.prev || t.position >= n.next)
            }, e.canSetBoundMode = function() {
                var t = this.options;
                return t.bound && !t.circular
            }, e.getViewportElement = function() {
                return this.viewportElement
            }, e.getCameraElement = function() {
                return this.cameraElement
            }, e.getScrollAreaSize = function() {
                var t = this.state.scrollArea;
                return t.next - t.prev
            }, e.getRelativeHangerPosition = function() {
                return this.state.relativeHangerPosition
            }, e.getHangerPosition = function() {
                return this.state.position + this.state.relativeHangerPosition
            }, e.getCameraPosition = function() {
                return this.state.position
            }, e.getPositionOffset = function() {
                return this.state.positionOffset
            }, e.getCheckedIndexes = function() {
                return this.state.checkedIndexes
            }, e.getVisiblePanels = function() {
                return this.visiblePanels
            }, e.setCurrentPanel = function(t) {
                this.currentPanel = t
            }, e.setLastIndex = function(t) {
                var e = this.currentPanel,
                    n = this.panelManager;
                n.setLastIndex(t), e && e.getIndex() > t && (this.currentPanel = n.lastPanel()), this.resize()
            }, e.setVisiblePanels = function(t) {
                this.visiblePanels = t
            }, e.connectAxesHandler = function(t) {
                var e = this.axes;
                this.axesHandlers = t, e.on(t)
            }, e.addPlugins = function(t) {
                var e = this,
                    n = [].concat(t);
                return n.forEach(function(t) {
                    t.init(e.flicking)
                }), this.plugins = this.plugins.concat(n), this
            }, e.removePlugins = function(t) {
                var n = this,
                    i = this.plugins;
                return [].concat(t).forEach(function(t) {
                    var e = i.indexOf(t); - 1 < e && i.splice(e, 1), t.destroy(n.flicking)
                }), this
            }, e.updateCheckedIndexes = function(r) {
                var o = this.state,
                    s = 0;
                o.checkedIndexes.concat().forEach(function(t, e) {
                    var n = t[0],
                        i = t[1];
                    r.min <= i && r.max >= n && (o.checkedIndexes.splice(e - s, 1), s++)
                })
            }, e.appendUncachedPanelElements = function(t) {
                var n = this,
                    i = this.options,
                    r = document.createDocumentFragment();
                if (i.isEqualSize) {
                    var e = this.visiblePanels,
                        o = i.isEqualSize,
                        s = {};
                    this.visiblePanels = [], Object.keys(this.panelBboxes).forEach(function(t) {
                        s[t] = !0
                    }), t.forEach(function(t) {
                        var e = t.getOverlappedClass(o);
                        e && !s[e] ? (i.renderExternal || r.appendChild(t.getElement()), n.visiblePanels.push(t), s[e] = !0) : e || (i.renderExternal || r.appendChild(t.getElement()), n.visiblePanels.push(t))
                    }), e.forEach(function(t) {
                        n.addVisiblePanel(t)
                    })
                } else i.renderExternal || t.forEach(function(t) {
                    return r.appendChild(t.getElement())
                }), this.visiblePanels = t.filter(function(t) {
                    return Boolean(t)
                });
                i.renderExternal || this.cameraElement.appendChild(r)
            }, e.updateClonePanels = function() {
                var t = this.panelManager;
                this.options.circular && 0 < t.getPanelCount() && (this.clonePanels(), this.updateClonedPanelPositions()), t.chainAllPanels()
            }, e.getVisibleIndexOf = function(e) {
                return Ve(this.visiblePanels, function(t) {
                    return t === e
                })
            }, e.build = function() {
                this.setElements(), this.applyCSSValue(), this.setMoveType(), this.setAxesInstance(), this.refreshPanels(), this.setDefaultPanel(), this.resize(), this.moveToDefaultPanel()
            }, e.setElements = function() {
                var t = this.state,
                    e = this.options,
                    n = this.flicking.getElement(),
                    i = e.classPrefix,
                    r = n.children[0],
                    o = r && Re(r, i + "-viewport"),
                    s = o ? r : document.createElement("div"),
                    a = o ? s.children[0] : n.children[0],
                    l = a && Re(a, i + "-camera"),
                    u = l ? a : document.createElement("div");
                l ? t.originalCameraStyle = {
                    className: u.getAttribute("class"),
                    style: u.getAttribute("style")
                } : (u.className = i + "-camera", He(o ? s.children : n.children).forEach(function(t) {
                    u.appendChild(t)
                }));
                o ? t.originalViewportStyle = {
                    className: s.getAttribute("class"),
                    style: s.getAttribute("style")
                } : (s.className = i + "-viewport", n.appendChild(s)), l && o || s.appendChild(u), this.viewportElement = s, this.cameraElement = u, t.isViewportGiven = o, t.isCameraGiven = l
            }, e.applyCSSValue = function() {
                var t = this.options,
                    e = this.viewportElement,
                    n = this.cameraElement,
                    i = this.viewportElement.style;
                Ne(e, de), Ne(n, ve), e.style.zIndex = "" + t.zIndex, t.horizontal ? (i.minHeight = "100%", i.width = "100%") : (i.minWidth = "100%", i.height = "100%"), t.overflow && (i.overflow = "visible"), this.panelManager = new qe(this.cameraElement, t)
            }, e.setMoveType = function() {
                var t = this.options.moveType;
                switch (t.type) {
                    case ce.SNAP:
                        this.moveType = new $e(t.count);
                        break;
                    case ce.FREE_SCROLL:
                        this.moveType = new tn;
                        break;
                    default:
                        throw new Error("moveType is not correct!")
                }
            }, e.setAxesInstance = function() {
                var t = this.state,
                    e = this.options,
                    n = t.scrollArea,
                    i = e.horizontal;
                this.axes = new re({
                    flick: {
                        range: [n.prev, n.next],
                        circular: e.circular,
                        bounce: [0, 0]
                    }
                }, {
                    easing: e.panelEffect,
                    deceleration: e.deceleration,
                    interruptable: !0
                }), this.panInput = new he(this.viewportElement, {
                    inputType: e.inputType,
                    thresholdAngle: e.thresholdAngle,
                    scale: e.horizontal ? [-1, 0] : [0, -1]
                }), this.axes.connect(i ? ["flick", ""] : ["", "flick"], this.panInput)
            }, e.refreshPanels = function() {
                var n = this,
                    t = this.panelManager,
                    e = He(this.cameraElement.children).map(function(t, e) {
                        return new Ye(t, e, n)
                    });
                t.replacePanels(e, []), this.visiblePanels = e.filter(function(t) {
                    return Boolean(t)
                })
            }, e.setDefaultPanel = function() {
                var t = this.options,
                    e = this.panelManager,
                    n = this.panelManager.getRange(),
                    i = _e(t.defaultIndex, n.min, n.max);
                this.currentPanel = e.get(i)
            }, e.clonePanels = function() {
                var t = this.state,
                    e = this.options,
                    r = this.panelManager,
                    n = e.gap,
                    i = t.size,
                    o = r.firstPanel(),
                    s = r.lastPanel();
                if (o) {
                    for (var a, l = r.originalPanels(), u = l.concat().reverse(), h = s.getPosition() + s.getSize() - o.getPosition() + n, c = o.getRelativeAnchorPosition(), f = this.getRelativeHangerPosition(), p = (f - c) % h, g = 0, d = 0, v = u; d < v.length; d++) {
                        if ((y = v[d]) && p <= (g += y.getSize() + n)) {
                            a = y;
                            break
                        }
                    }
                    for (var m, P = (i - f + c) % h, x = g = 0, E = l; x < E.length; x++) {
                        var y;
                        if ((y = E[x]) && P <= (g += y.getSize() + n)) {
                            m = y;
                            break
                        }
                    }
                    var b = 0 !== a.getIndex() && a.getIndex() <= m.getIndex(),
                        C = Math.ceil((f + o.getSize() - c) / h) + Math.ceil((i - f + c) / h) - 1 + (b ? 1 : 0),
                        S = r.getCloneCount();
                    if (r.setCloneCount(C), !e.renderExternal)
                        if (S < C)
                            for (var w = function(e) {
                                    var t, n = l.map(function(t) {
                                            return t.clone(e)
                                        }),
                                        i = document.createDocumentFragment();
                                    n.forEach(function(t) {
                                        return i.appendChild(t.getElement())
                                    }), I.cameraElement.appendChild(i), (t = I.visiblePanels).push.apply(t, n.filter(function(t) {
                                        return Boolean(t)
                                    })), r.insertClones(e, 0, n)
                                }, I = this, T = S; T < C; T++) w(T);
                        else C < S && r.removeClonesAfter(C)
                }
            }, e.moveToDefaultPanel = function() {
                var t = this.state,
                    e = this.panelManager,
                    n = this.options,
                    i = this.panelManager.getRange(),
                    r = _e(n.defaultIndex, i.min, i.max),
                    o = e.get(r),
                    s = 0;
                o && (s = o.getAnchorPosition() - t.relativeHangerPosition, s = this.canSetBoundMode() ? _e(s, t.scrollArea.prev, t.scrollArea.next) : s), this.moveCamera(s), this.axes.setTo({
                    flick: s
                }, 0)
            }, e.updateSize = function() {
                var t = this.state,
                    e = this.options,
                    n = this.panelManager.originalPanels().filter(function(t) {
                        return Boolean(t)
                    }),
                    i = this.updateBbox(),
                    r = t.size;
                t.size = e.horizontal ? i.width : i.height, r !== t.size && (t.relativeHangerPosition = De(e.hanger, t.size), t.infiniteThreshold = De(e.infiniteThreshold, t.size)), n.length <= 0 || this.resizePanels(n)
            }, e.updateOriginalPanelPositions = function() {
                var i = this.options.gap,
                    t = this.panelManager,
                    e = t.firstPanel(),
                    n = t.originalPanels();
                if (e) {
                    var r = this.currentPanel,
                        o = this.nearestPanel,
                        s = this.stateMachine.getState(),
                        a = this.state.scrollArea,
                        l = e.getPosition(),
                        u = e;
                    if (o) u = !ke(s.lastPosition + s.delta, a.prev, a.next) ? r : o;
                    else 0 < e.getIndex() && (u = r);
                    var h = n.slice(0, u.getIndex() + (u.getCloneIndex() + 1) * n.length).reduce(function(t, e) {
                        return t + e.getSize() + i
                    }, 0);
                    l = u.getPosition() - h, n.forEach(function(t) {
                        var e = l,
                            n = t.getSize();
                        t.setPosition(e), l += n + i
                    }), this.options.renderOnlyVisible || n.forEach(function(t) {
                        return t.setPositionCSS()
                    })
                }
            }, e.updateClonedPanelPositions = function() {
                var t = this.state,
                    e = this.options,
                    n = this.panelManager,
                    i = n.clonedPanels().reduce(function(t, e) {
                        return t.concat(e)
                    }, []).filter(function(t) {
                        return Boolean(t)
                    }),
                    r = t.scrollArea,
                    o = n.firstPanel(),
                    s = n.lastPanel();
                if (o) {
                    for (var a = s.getPosition() + s.getSize() - o.getPosition() + e.gap, l = 0, u = i; l < u.length; l++) {
                        var h = (d = u[l]).getOriginalPanel(),
                            c = a * (d.getCloneIndex() + 1) + h.getPosition();
                        d.setPosition(c)
                    }
                    for (var f = o.getPosition(), p = 0, g = i.concat().reverse(); p < g.length; p++) {
                        var d, v = (d = g[p]).getSize(),
                            m = f - v - e.gap;
                        if (m + v <= r.prev) break;
                        d.setPosition(m), f = m
                    }
                    this.options.renderOnlyVisible || i.forEach(function(t) {
                        t.setPositionCSS()
                    })
                }
            }, e.updateScrollArea = function() {
                var t = this.state,
                    e = this.panelManager,
                    n = this.options,
                    i = this.axes,
                    r = e.firstPanel(),
                    o = e.lastPanel(),
                    s = t.relativeHangerPosition;
                if (r)
                    if (this.canSetBoundMode()) {
                        if ((u = o.getPosition() + o.getSize() - r.getPosition()) >= t.size) t.scrollArea = {
                            prev: r.getPosition(),
                            next: o.getPosition() + o.getSize() - t.size
                        };
                        else {
                            var a = De(n.anchor, u),
                                l = r.getPosition() + _e(a, u - (t.size - s), s);
                            t.scrollArea = {
                                prev: l - s,
                                next: l - s
                            }
                        }
                    } else if (n.circular) {
                    var u = o.getPosition() + o.getSize() - r.getPosition() + n.gap;
                    t.scrollArea = {
                        prev: r.getAnchorPosition() - s,
                        next: u + r.getAnchorPosition() - s
                    }
                } else t.scrollArea = {
                    prev: r.getAnchorPosition() - s,
                    next: o.getAnchorPosition() - s
                };
                else t.scrollArea = {
                    prev: 0,
                    next: 0
                };
                var h, c, f = t.size,
                    p = n.bounce;
                if ((c = p) && c.constructor === Array) h = p.map(function(t) {
                    return De(t, f, ge.bounce)
                });
                else {
                    var g = De(p, f, ge.bounce);
                    h = [g, g]
                }
                var d = i.axis.flick;
                d.range = [t.scrollArea.prev, t.scrollArea.next], d.bounce = h
            }, e.checkNeedPanel = function(t) {
                var e = this.state,
                    n = this.options,
                    i = this.panelManager,
                    r = this.currentPanel,
                    o = this.nearestPanel,
                    s = this.stateMachine.getState();
                if (n.infinite) {
                    var a = n.gap,
                        l = e.infiniteThreshold,
                        u = i.getLastIndex();
                    if (!(u < 0))
                        if (r && o) {
                            for (var h = o.getPosition(), c = s.holding || s.playing ? o : r; c;) {
                                var f = c.getIndex(),
                                    p = c.nextSibling,
                                    g = !(f === (E = i.lastPanel()).getIndex()) && p ? p.getIndex() : u + 1,
                                    d = o.getPosition(),
                                    v = c.getPosition() + c.getSize() - (d - h) + a - l <= e.position + e.size;
                                if (1 < g - f && v && this.triggerNeedPanel({
                                        axesEvent: t,
                                        siblingPanel: c,
                                        direction: we.NEXT,
                                        indexRange: {
                                            min: f + 1,
                                            max: g - 1,
                                            length: g - f - 1
                                        }
                                    }), n.circular && f === u && v) {
                                    var m = (x = i.firstPanel()) ? x.getIndex() : -1;
                                    0 < m && this.triggerNeedPanel({
                                        axesEvent: t,
                                        siblingPanel: c,
                                        direction: we.NEXT,
                                        indexRange: {
                                            min: 0,
                                            max: m - 1,
                                            length: m
                                        }
                                    })
                                }
                                var P = i.lastPanel();
                                if (P && f === P.getIndex() || !v) break;
                                c = c.nextSibling
                            }
                            for (c = o; c;) {
                                var x, E, y = e.position,
                                    b = c.getIndex(),
                                    C = c.prevSibling,
                                    S = !(b === (x = i.firstPanel()).getIndex()) && C ? C.getIndex() : -1;
                                d = o.getPosition(), v = y <= c.getPosition() - (d - h) - a + l;
                                if (1 < b - S && v && this.triggerNeedPanel({
                                        axesEvent: t,
                                        siblingPanel: c,
                                        direction: we.PREV,
                                        indexRange: {
                                            min: S + 1,
                                            max: b - 1,
                                            length: b - S - 1
                                        }
                                    }), n.circular && 0 === b && v)
                                    if ((E = i.lastPanel()) && E.getIndex() < u) {
                                        var w = E.getIndex();
                                        this.triggerNeedPanel({
                                            axesEvent: t,
                                            siblingPanel: c,
                                            direction: we.PREV,
                                            indexRange: {
                                                min: w + 1,
                                                max: u,
                                                length: u - w
                                            }
                                        })
                                    }
                                var I = i.firstPanel();
                                if (I && b === I.getIndex() || !v) break;
                                c = c.prevSibling
                            }
                        } else this.triggerNeedPanel({
                            axesEvent: t,
                            siblingPanel: null,
                            direction: null,
                            indexRange: {
                                min: 0,
                                max: u,
                                length: u + 1
                            }
                        })
                }
            }, e.triggerNeedPanel = function(t) {
                var r = this,
                    e = t.axesEvent,
                    o = t.siblingPanel,
                    s = t.direction,
                    a = t.indexRange,
                    l = this.options,
                    n = this.state.checkedIndexes,
                    i = n.some(function(t) {
                        var e = t[0],
                            n = t[1];
                        return e === a.min || n === a.max
                    }),
                    u = this.flicking.hasOn(Pe.NEED_PANEL);
                if (!i && u) {
                    n.push([a.min, a.max]);
                    var h = o ? o.getIndex() : 0,
                        c = !!e && e.isTrusted;
                    this.triggerEvent(Pe.NEED_PANEL, e, c, {
                        index: h,
                        panel: o,
                        direction: s,
                        range: a,
                        fill: function(t) {
                            var e = r.panelManager;
                            if (!o) return r.insert(e.getRange().max + 1, t);
                            var n = ze(t),
                                i = s === we.NEXT ? n.slice(0, a.length) : n.slice(-a.length);
                            return s === we.NEXT ? l.circular && h === e.getLastIndex() ? r.insert(0, i) : o.insertAfter(i) : s === we.PREV ? l.circular && 0 === h ? r.insert(a.max - i.length + 1, i) : o.insertBefore(i) : r.insert(0, i)
                        }
                    })
                }
            }, e.updateVisiblePanels = function() {
                var e = this.state,
                    t = this.options,
                    n = this.panelManager,
                    i = this.stateMachine.getState(),
                    r = this.cameraElement,
                    o = t.renderExternal;
                if (t.renderOnlyVisible)
                    if (this.nearestPanel) {
                        var s = this.visiblePanels,
                            a = this.calcVisiblePanels(),
                            l = this.checkVisiblePanelChange(s, a),
                            u = l.addedPanels,
                            h = l.removedPanels;
                        if (!(u.length <= 0 && h.length <= 0)) {
                            if (i.holding) a.push.apply(a, h);
                            else {
                                var c = a[0].getPosition();
                                e.positionOffset = c
                            }
                            if (a.forEach(function(t) {
                                    t.setPositionCSS(e.positionOffset)
                                }), !o) {
                                i.holding || h.forEach(function(t) {
                                    var e = t.getElement();
                                    e.parentNode && r.removeChild(e)
                                });
                                var f = document.createDocumentFragment();
                                u.forEach(function(t) {
                                    f.appendChild(t.getElement())
                                }), r.appendChild(f)
                            }
                            var p = a[0],
                                g = a[a.length - 1],
                                d = function(t) {
                                    return t.getIndex() + (t.getCloneIndex() + 1) * n.getPanelCount()
                                },
                                v = {
                                    min: d(p),
                                    max: d(g)
                                };
                            this.visiblePanels = a, this.flicking.trigger(Pe.VISIBLE_CHANGE, {
                                type: Pe.VISIBLE_CHANGE,
                                range: v
                            })
                        }
                    } else
                        for (this.visiblePanels = []; r.firstChild;) r.removeChild(r.firstChild)
            }, e.checkVisiblePanelChange = function(i, r) {
                var o = i.map(function() {
                        return 0
                    }),
                    s = r.map(function() {
                        return 0
                    });
                return i.forEach(function(n, i) {
                    r.forEach(function(t, e) {
                        n === t && (o[i]++, s[e]++)
                    })
                }), {
                    removedPanels: o.reduce(function(t, e, n) {
                        return 0 === e ? t.concat([i[n]]) : t
                    }, []),
                    addedPanels: s.reduce(function(t, e, n) {
                        return 0 === e ? t.concat([r[n]]) : t
                    }, [])
                }
            }, e.resizePanels = function(t) {
                var e = this.options,
                    n = this.panelBboxes;
                if (!0 !== e.isEqualSize)
                    if (e.isEqualSize) {
                        var i = e.isEqualSize;
                        t.forEach(function(t) {
                            var e = t.getOverlappedClass(i);
                            e ? (t.resize(n[e]), n[e] = t.getBbox()) : t.resize()
                        })
                    } else t.forEach(function(t) {
                        t.resize()
                    });
                else {
                    if (!n.default) {
                        var r = t[0];
                        n.default = r.getBbox()
                    }
                    var o = n.default;
                    t.forEach(function(t) {
                        t.resize(o)
                    })
                }
            }, t
        }(),
        nn = "UA-70842526-24",
        rn = Math.random() * Math.pow(10, 20) / Math.pow(10, 10);
    var on = function(f) {
        function t(t, e) {
            void 0 === e && (e = {});
            var n, c = f.call(this) || this;
            if (c.isPanelChangedAtBeforeSync = !1, c.resize = function() {
                    var t = c.viewport,
                        e = c.options,
                        n = c.getElement(),
                        i = t.panelManager.allPanels();
                    e.isConstantSize || i.forEach(function(t) {
                        return t.unCacheBbox()
                    });
                    var r = e.renderOnlyVisible && !e.isConstantSize && !0 !== e.isEqualSize,
                        o = n.parentElement,
                        s = o.style.height;
                    return o.style.height = o.offsetHeight + "px", t.unCacheBbox(), t.updateBbox(), r && t.appendUncachedPanelElements(i), t.resize(), o.style.height = s, c
                }, c.triggerEvent = function(t, e, n, i) {
                    void 0 === i && (i = {});
                    var r = c.viewport,
                        o = !0;
                    if (r) {
                        var s = r.stateMachine.getState(),
                            a = r.getScrollArea(),
                            l = a.prev,
                            u = a.next,
                            h = Be(r.getCameraPosition(), [l, l, u]);
                        c.options.circular && (h %= 1), o = !f.prototype.trigger.call(c, t, Me({
                            type: t,
                            index: c.getIndex(),
                            panel: c.getCurrentPanel(),
                            direction: s.direction,
                            holding: s.holding,
                            progress: h,
                            axesEvent: e,
                            isTrusted: n
                        }, i))
                    }
                    return {
                        onSuccess: function(t) {
                            return o || t(), this
                        },
                        onStopped: function(t) {
                            return o && t(), this
                        }
                    }
                }, c.moveCamera = function(t) {
                    var e = c.viewport,
                        n = e.stateMachine.getState(),
                        i = c.options,
                        r = t.pos.flick,
                        o = e.getCameraPosition();
                    if (t.isTrusted && n.holding) {
                        var s = i.horizontal ? t.inputEvent.offsetX : t.inputEvent.offsetY,
                            a = r - o,
                            l = s < 0 === r < o;
                        if (i.circular && l) a = (0 < a ? -1 : 1) * (e.getScrollAreaSize() - Math.abs(a));
                        var u = 0 === a ? n.direction : 0 < a ? we.NEXT : we.PREV;
                        n.direction = u
                    }
                    return n.delta += t.delta.flick, e.moveCamera(r, t), c.triggerEvent(Pe.MOVE, t, t.isTrusted).onStopped(function() {
                        e.moveCamera(o, t)
                    })
                }, Oe(t)) {
                if (!(n = document.querySelector(t))) throw new Error("Base element doesn't exist.")
            } else {
                if (!t.nodeName || 1 !== t.nodeType) throw new Error("Element should be provided in string or HTMLElement.");
                n = t
            }
            c.wrapper = n, c.options = Me({}, ge, e);
            var i = c.options,
                r = i.moveType;
            return r in fe && (i.moveType = fe[r]), c.viewport = new en(c, c.options, c.triggerEvent), c.listenInput(), c.listenResize(), c.options.collectStatistics && function(t, e, n) {
                if (pe) try {
                    var i = window.innerWidth,
                        r = window.innerHeight,
                        o = window.screen || {
                            width: i,
                            height: r
                        },
                        s = ["v=1", "t=event", "dl=" + location.href, "ul=" + (navigator.language || "en-us").toLowerCase(), "de=" + (document.charset || document.inputEncoding || document.characterSet || "utf-8"), "dr=" + document.referrer, "dt=" + document.title, "sr=" + o.width + "x" + o.height, "vp=" + i + "x" + r, "ec=" + t, "ea=" + e, "el=" + JSON.stringify(n), "cid=" + rn, "tid=" + nn, "cd1=3.4.7", "z=" + Math.floor(1e7 * Math.random())],
                        a = new XMLHttpRequest;
                    a.open("GET", "https://www.google-analytics.com/collect?" + s.join("&")), a.send()
                } catch (t) {}
            }("usage", "options", e), c
        }
        r(t, f);
        var e = t.prototype;
        return e.prev = function(t) {
            var e = this.getCurrentPanel(),
                n = this.viewport.stateMachine.getState();
            if (e && n.type === Ee) {
                var i = e.prev();
                i && i.focus(t)
            }
            return this
        }, e.next = function(t) {
            var e = this.getCurrentPanel(),
                n = this.viewport.stateMachine.getState();
            if (e && n.type === Ee) {
                var i = e.next();
                i && i.focus(t)
            }
            return this
        }, e.moveTo = function(t, e) {
            var n = this.viewport,
                i = n.panelManager.get(t),
                r = n.stateMachine.getState();
            if (!i || r.type !== Ee) return this;
            var o = i.getAnchorPosition(),
                s = n.getHangerPosition(),
                a = i;
            if (this.options.circular) {
                var l = n.getScrollAreaSize(),
                    u = [o - l, o, o + l].reduce(function(t, e) {
                        return Math.abs(e - s) < Math.abs(t - s) ? e : t
                    }, 1 / 0) - i.getRelativeAnchorPosition(),
                    h = i.getIdenticalPanels(),
                    c = u - o;
                0 < c ? a = h[1] : c < 0 && (a = h[h.length - 1]), (a = a.clone(a.getCloneIndex(), !0)).setPosition(u)
            }
            var f = this.getIndex();
            if (s === a.getAnchorPosition() && f === t) return this;
            var p = i.getIndex() === n.getCurrentIndex() ? "" : Pe.CHANGE;
            return n.moveTo(a, n.findEstimatedPosition(a), p, null, e), this
        }, e.getIndex = function() {
            return this.viewport.getCurrentIndex()
        }, e.getElement = function() {
            return this.wrapper
        }, e.getCurrentPanel = function() {
            var t = this.viewport.getCurrentPanel();
            return t || null
        }, e.getPanel = function(t) {
            var e = this.viewport.panelManager.get(t);
            return e || null
        }, e.getAllPanels = function(t) {
            var e = this.viewport.panelManager;
            return (t ? e.allPanels() : e.originalPanels()).filter(function(t) {
                return !!t
            })
        }, e.getVisiblePanels = function() {
            return this.viewport.calcVisiblePanels()
        }, e.getPanelCount = function() {
            return this.viewport.panelManager.getPanelCount()
        }, e.getCloneCount = function() {
            return this.viewport.panelManager.getCloneCount()
        }, e.getLastIndex = function() {
            return this.viewport.panelManager.getLastIndex()
        }, e.setLastIndex = function(t) {
            return this.viewport.setLastIndex(t), this
        }, e.isPlaying = function() {
            return this.viewport.stateMachine.getState().playing
        }, e.enableInput = function() {
            return this.viewport.enable(), this
        }, e.disableInput = function() {
            return this.viewport.disable(), this
        }, e.getStatus = function() {
            var t = this.viewport,
                e = t.panelManager.originalPanels().filter(function(t) {
                    return !!t
                }).map(function(t) {
                    return {
                        html: t.getElement().outerHTML,
                        index: t.getIndex()
                    }
                });
            return {
                index: t.getCurrentIndex(),
                panels: e,
                position: t.getCameraPosition()
            }
        }, e.setStatus = function(t) {
            this.viewport.restore(t)
        }, e.addPlugins = function(t) {
            return this.viewport.addPlugins(t), this
        }, e.removePlugins = function(t) {
            return this.viewport.removePlugins(t), this
        }, e.destroy = function(t) {
            for (var e in void 0 === t && (t = {}), this.off(), this.options.autoResize && window.removeEventListener("resize", this.resize), this.viewport.destroy(t), this) this[e] = null
        }, e.prepend = function(t) {
            var e = this.viewport,
                n = ze(t),
                i = Math.max(e.panelManager.getRange().min - n.length, 0);
            return e.insert(i, n)
        }, e.append = function(t) {
            var e = this.viewport;
            return e.insert(e.panelManager.getRange().max + 1, t)
        }, e.replace = function(t, e) {
            return this.viewport.replace(t, e)
        }, e.remove = function(t, e) {
            return void 0 === e && (e = 1), this.viewport.remove(t, e)
        }, e.getRenderingIndexes = function(t) {
            var e = this.viewport,
                n = e.getVisiblePanels(),
                i = t.maintained.reduce(function(t, e) {
                    var n = e[0],
                        i = e[1];
                    return t[n] = i, t
                }, {}),
                r = t.prevList.length,
                o = t.list.length,
                s = t.added,
                a = n.map(function(t) {
                    return (e = t).getIndex() + (e.getCloneIndex() + 1) * r;
                    var e
                }),
                l = (a = a.filter(function(t) {
                    return null != i[t % r]
                }).map(function(t) {
                    var e = Math.floor(t / r);
                    return i[t % r] + o * e
                })).concat(s),
                u = e.panelManager.allPanels();
            return e.setVisiblePanels(l.map(function(t) {
                return u[t]
            })), l
        }, e.beforeSync = function(t) {
            var e = this,
                n = t.maintained,
                s = t.added,
                i = t.changed,
                o = t.removed,
                r = this.viewport,
                a = r.panelManager,
                l = this.options.circular,
                u = a.getCloneCount(),
                h = a.clonedPanels(),
                c = r.getVisiblePanels().filter(function(e) {
                    return Ve(o, function(t) {
                        return t === e.getIndex()
                    }) < 0
                });
            if (r.setVisiblePanels(c), s.length <= 0 && o.length <= 0 && i.length <= 0 && u === h.length) return this;
            var f = a.originalPanels(),
                p = [],
                g = Le(u).map(function() {
                    return []
                });
            n.forEach(function(t) {
                var e = t[0],
                    n = t[1];
                p[n] = f[e], p[n].setIndex(n)
            }), s.forEach(function(t) {
                p[t] = new Ye(null, t, e.viewport)
            }), l && Le(u).forEach(function(i) {
                var r = h[i],
                    o = g[i];
                n.forEach(function(t) {
                    var e = t[0],
                        n = t[1];
                    o[n] = r ? r[e] : p[n].clone(i, !1), o[n].setIndex(n)
                }), s.forEach(function(t) {
                    var e = p[t];
                    o[t] = e.clone(i, !1)
                })
            }), s.forEach(function(t) {
                r.updateCheckedIndexes({
                    min: t,
                    max: t
                })
            }), o.forEach(function(t) {
                r.updateCheckedIndexes({
                    min: t - 1,
                    max: t + 1
                })
            });
            var d = r.getCheckedIndexes();
            d.forEach(function(t, e) {
                var n = t[0],
                    i = t[1],
                    r = s.filter(function(t) {
                        return t < n && a.has(t)
                    }).length - o.filter(function(t) {
                        return t < n
                    }).length;
                d.splice(e, 1, [n + r, i + r])
            }), 0 < i.length && n.forEach(function(t) {
                var e = t[1];
                r.updateCheckedIndexes({
                    min: e,
                    max: e
                })
            }), a.replacePanels(p, g), this.isPanelChangedAtBeforeSync = !0
        }, e.sync = function(t) {
            var i = t.list,
                e = t.maintained,
                n = t.added,
                r = t.changed,
                o = t.removed;
            if (n.length <= 0 && o.length <= 0 && r.length <= 0) return this;
            var s = this.viewport,
                a = this.options,
                l = a.renderOnlyVisible,
                u = a.circular,
                h = s.panelManager;
            if (!l) {
                var c = h.getRange(),
                    f = t;
                if (u) {
                    var p = c.max,
                        g = i.length / (h.getCloneCount() + 1) >> 0,
                        d = n.filter(function(t) {
                            return t < g
                        }),
                        v = o.filter(function(t) {
                            return t <= p
                        });
                    f = {
                        added: d,
                        maintained: e.filter(function(t) {
                            return t[0] <= p
                        }),
                        removed: v,
                        changed: r.filter(function(t) {
                            return t[0] <= p
                        })
                    }
                }
                this.beforeSync(f)
            }
            var m = l ? s.getVisiblePanels() : this.getAllPanels(!0);
            return n.forEach(function(t) {
                var e = i[t],
                    n = m[t];
                n.setElement(e), n.unCacheBbox()
            }), this.isPanelChangedAtBeforeSync && (s.setVisiblePanels([]), this.isPanelChangedAtBeforeSync = !1), s.resize(), this
        }, e.listenInput = function() {
            var n = this,
                t = n.viewport,
                i = t.stateMachine;
            n.eventContext = {
                flicking: n,
                viewport: n.viewport,
                transitTo: i.transitTo,
                triggerEvent: n.triggerEvent,
                moveCamera: n.moveCamera,
                stopCamera: t.stopCamera
            };
            var r = {},
                e = function(t) {
                    var e = xe[t];
                    r[e] = function(t) {
                        return i.fire(e, t, n.eventContext)
                    }
                };
            for (var o in xe) e(o);
            n.viewport.connectAxesHandler(r)
        }, e.listenResize = function() {
            this.options.autoResize && window.addEventListener("resize", this.resize)
        }, t.VERSION = "3.4.7", t.DIRECTION = we, t.EVENTS = Pe, t
    }(t);
    return on.withFlickingMethods = function(t, o) {
        Object.keys(Ie).forEach(function(r) {
            t[r] || (t[r] = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var n, i = (n = this[o])[r].apply(n, t);
                return i === this[o] ? this : i
            })
        })
    }, on.DEFAULT_OPTIONS = ge, on.MOVE_TYPE = ce, on
});
//# sourceMappingURL=flicking.pkgd.min.js.map

/* ==== INCLUDE: /js/blocks/featured-listings.js ==== */

;
(function() {

    function init(id) {
        if (!id) {
            return
        }
        const b = document.getElementById(id)
        if (!b) {
            return
        }
        const f = b.querySelector('.featured-listings')
        if (!f) {
            return
        }
        if (f && f.__featuredInited) {
            return
        }

        f.__featuredInited = true

        b.querySelectorAll('[data-listing="true"]').forEach(el => {
            const id = el.getAttribute('data-id')
            const ribbonURL = el.getAttribute('data-ribbon')
            if (ribbonURL) {
                ribbon(el, ribbonURL)
            }
        })
    }

    const RIBBONS = {
        'SOLD-BANNER': 'SOLD',
        'LEASED-BANNER': 'LEASED',
        'RENTED-BANNER': 'RENTED',
        'NEW-BANNER': 'NEW LISTING',
        'PENDING-BANNER': 'PENDING',
        'CONTINGENT-BANNER': 'CONTINGENT',
    }

    function ribbon(el, url) {
        fetch(url).then(function(response) {
            response.json().then((json) => {
                //console.log( 'ribbon', json )
                json && json.banner && addRibbon(el, json)
            })
        }).catch(function(err) {
            console.error('ribbon lookup failed', err)
        })
    }

    function addRibbon(el, json) {
        let text = json.text
        if (!text) {
            text = RIBBONS[json.banner]
        }
        if (!text) {
            return
        }

        const ribbon = document.createElement('div')
        ribbon.classList.add('ribbon')
        ribbon.innerText = text

        const color = json.color
        if (color) {
            ribbon.setAttribute('style', '--custom-color: ' + color.replace('0x', '#') + ';')
        }
        ribbon.classList.add(json.banner.toLowerCase())

        el.appendChild(ribbon)
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.featured-listings').forEach(el => {
            const b = el.closest('.block-layout')
            if (b) {
                init(b.getAttribute('id'))
            }
        })

        _G.reinitHandlers.push(init)
    })
})();

/* ==== INCLUDE: /js/blocks/forms.js ==== */

;
(function() {


    function processSubmitResponse(origForm, html) {

        const targetFormEl = origForm.querySelector('[name=__targetForm]')
        if (!targetFormEl) {
            console.error("Failed to find __targetForm")
            return
        }

        const targetForm = targetFormEl.getAttribute('value')

        const htmlFragment = _G.createFragment(html)

        const newTargetFormEl = htmlFragment.querySelector('[name=__targetForm][value="' + targetForm + '"]')

        if (!newTargetFormEl) {
            console.error("Failed to find targetForm in the returned response")
            return
        }
        const newForm = newTargetFormEl.closest('form')
        // const newForm = _G.createFragment( html ).querySelector('form')
        newForm.querySelectorAll('.form-error').forEach(el => {
            el.remove()
        })
        origForm.parentElement.replaceChild(newForm, origForm)

        setTimeout(function() {
            const firstError = newForm.querySelector('.control-error')
            if (firstError) {
                const top = firstError.getBoundingClientRect().top
                if (top < 0) {
                    window.scrollTo({
                        top: window.scrollY + top - 100,
                        behavior: 'smooth'
                    })
                }
            }
        }, 50)
    }

    _G.onSubmitForm = (form, customCallback) => {

        let submitting = true

        function submitFeedback(form) {
            setTimeout(() => {

                if (!submitting) {
                    return
                }
                const submit = form.querySelector('[type=submit]')
                if (submit) {
                    // const submitText = submit.innerText;
                    // submit.setAttribute('data-submit-text', submitText )
                    // submit.innerText = 'Sending'
                    submit.classList.add('submitting')
                    submit.setAttribute('disabled', 'disabled')
                }
            }, 100)
        }

        function undoSubmitFeedback(form) {
            // note that we are passing our original form, not the new replaced form
            // so this will only fire if there was a network issue and no form
            // arrived back; otherwise, the new form would have had reset submit anyways
            const submit = form.querySelector('[type=submit]')
            if (submit) {
                // submit.innerText = submit.getAttribute('data-submit-text')
                submit.classList.remove('submitting')
                submit.removeAttribute('disabled')
            }
        }

        let authTk = form.getAttribute('data-tk')
        if (!authTk) {
            // try hidden
            const hidden = form.querySelector('input[name=__sh]')
            if (hidden) {
                authTk = hidden.getAttribute('value')
            }
            if (!authTk) {
                // bail
                console.error('auth token missing')
                return
            }
        }

        const data = new URLSearchParams()
        for (const pair of new FormData(form)) {
            data.append(pair[0], pair[1].toString())
        }
        data.append('__src_url', window.location.href)
        data.append('__sh', authTk)

        submitFeedback(form)

        setTimeout(() => {
            fetch(window.location.href, {
                method: 'post',
                body: data,
                headers: {
                    'X-Requested-With': 'fetch',
                    'X-Form-Submit': 'true',
                    'X-Form-Submit-From': window.location.href,
                }
            }).then(response => {
                if (customCallback) {
                    return customCallback(response)
                }
                const redir = response.headers.get('Location')
                if (redir) {
                    return window.location = redir
                }
                response.text().then(html => {
                    // console.log( 'form html', html )

                    const error = response.headers.get('X-Form-Error')
                    const successURL = response.headers.get('X-Success-URL')
                    const success = response.headers.get('X-Success-Message')

                    if (!error && success && successURL) {
                        window.location = successURL
                        return
                    }

                    processSubmitResponse(form, html)

                    if (error) {
                        _G.quickMessage(error, {
                            error: true
                        });
                    } else if (success) {
                        _G.quickMessage(success)

                        if (window.dataLayer) {
                            window.dataLayer.push({
                                event: 'formSubmitted',
                                formURL: window.location.href,
                                title: document.title,
                                formName: data.get('__formName') || ''
                            })
                        }
                    }
                })
            }).catch(err => {
                console.error("error occurred during form submission", err)
                _G.quickMessage('Error occurred during form submission', {
                    error: true
                });
            }).finally(() => {
                submitting = false
                undoSubmitFeedback(form)
            })
        }, 1000)


        return false;
    }


    function processBlogCommentSubmitResponse(origForm, html) {

        const formID = origForm.getAttribute("id");

        const htmlFragment = _G.createFragment(html)

        const newForm = htmlFragment.querySelector('#' + formID)

        // const successEl = newForm.querySelector(".form-success");
        // if( successEl && successEl.innerText ) {
        //     const message = successEl.innerText;
        //     setTimeout(() => {
        //         _G.quickMessage( message, {
        //
        //         });
        //     }, 100 );
        //     successEl.remove();
        // }

        // const newForm = _G.createFragment( html ).querySelector('form')
        newForm.querySelectorAll('.form-error').forEach(el => {
            el.remove()
        })
        const authTk = newForm.getAttribute("data-tk");
        if (authTk) {
            const authTkEl = document.createElement("input");
            authTkEl.setAttribute("type", "hidden");
            authTkEl.setAttribute("value", authTk);
            newForm.appendChild(authTkEl);
        }
        const srcUrlEl = document.createElement("input");
        srcUrlEl.setAttribute("type", "hidden");
        srcUrlEl.setAttribute("value", window.location.href);
        newForm.appendChild(srcUrlEl);
        origForm.parentElement.replaceChild(newForm, origForm);


        setTimeout(function() {
            const firstError = newForm.querySelector('.control-error')
            if (firstError) {
                const top = firstError.getBoundingClientRect().top
                if (top < 0) {
                    window.scrollTo({
                        top: window.scrollY + top - 100,
                        behavior: 'smooth'
                    })
                }
            }
        }, 50)
    }

    _G.onBlogCommentSubmitForm = (form, customCallback) => {

        let submitting = true

        function submitFeedback(form) {
            setTimeout(() => {

                if (!submitting) {
                    return
                }
                const submit = form.querySelector('[type=submit]')
                if (submit) {
                    // const submitText = submit.innerText;
                    // submit.setAttribute('data-submit-text', submitText )
                    // submit.innerText = 'Sending'
                    submit.classList.add('submitting')
                    submit.setAttribute('disabled', 'disabled')
                }
            }, 100)
        }

        function undoSubmitFeedback(form) {
            // note that we are passing our original form, not the new replaced form
            // so this will only fire if there was a network issue and no form
            // arrived back; otherwise, the new form would have had reset submit anyways
            const submit = form.querySelector('[type=submit]')
            if (submit) {
                // submit.innerText = submit.getAttribute('data-submit-text')
                submit.classList.remove('submitting')
                submit.removeAttribute('disabled')
            }
        }

        let authTk = form.getAttribute('data-tk')
        if (!authTk) {
            // try hidden
            const hidden = form.querySelector('input[name=__sh]')
            if (hidden) {
                authTk = hidden.getAttribute('value')
            }
            if (!authTk) {
                // bail
                console.error('auth token missing')
                return
            }
        }

        const data = new URLSearchParams()
        for (const pair of new FormData(form)) {
            data.append(pair[0], pair[1].toString())
        }
        data.append('__src_url', window.location.href)
        data.append('__sh', authTk)

        submitFeedback(form)

        setTimeout(() => {
            fetch(window.location.href, {
                method: 'post',
                body: data,
                headers: {
                    'X-Requested-With': 'fetch',
                    'X-Form-Submit': 'true',
                    'X-Form-Submit-From': window.location.href,
                }
            }).then(response => {
                if (customCallback) {
                    return customCallback(response)
                }
                const redir = response.headers.get('Location')
                if (redir) {
                    return window.location = redir
                }
                response.text().then(html => {
                    // console.log( 'form html', html )

                    const error = response.headers.get('X-Form-Error')
                    const successURL = response.headers.get('X-Success-URL')
                    const success = true;
                    // const success = "Comment submitted. It will be reviewed and published shortly."

                    if (!error && success && successURL) {
                        window.location = successURL
                        return
                    }

                    processBlogCommentSubmitResponse(form, html)

                    if (error) {
                        _G.quickMessage(error, {
                            error: true
                        });
                    } else {
                        // _G.quickMessage(success)

                        if (window.dataLayer) {
                            window.dataLayer.push({
                                event: 'formSubmitted',
                                formURL: window.location.href,
                                title: document.title,
                                formName: data.get('__formName') || ''
                            })
                        }
                    }
                })
            }).catch(err => {
                console.error("error occurred during form submission", err)
                _G.quickMessage('Error occurred during form submission', {
                    error: true
                });
            }).finally(() => {
                submitting = false
                undoSubmitFeedback(form)
            })
        }, 1000)


        return false;
    }
})()