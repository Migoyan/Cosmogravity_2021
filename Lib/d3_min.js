! function() {
  function ra(a) {
    return a && (a.ownerDocument && a.ownerDocument.defaultView || a.document && a || a.defaultView)
  }

  function Pa(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
  }

  function Ca(a) {
    return null === a ? NaN : +a
  }

  function yg(a) {
    return !isNaN(a)
  }

  function Ld(a) {
    return {
      left: function(b, c, d, e) {
        3 > arguments.length && (d = 0);
        4 > arguments.length && (e = b.length);
        for (; d < e;) {
          var f = d + e >>> 1;
          0 > a(b[f], c) ? d = f + 1 : e = f
        }
        return d
      },
      right: function(b, c, d, e) {
        3 > arguments.length && (d = 0);
        4 > arguments.length && (e = b.length);
        for (; d < e;) {
          var f = d + e >>> 1;
          0 <
            a(b[f], c) ? e = f : d = f + 1
        }
        return d
      }
    }
  }

  function zg(a) {
    return a.length
  }

  function Md(a, b) {
    for (var c in b) Object.defineProperty(a.prototype, c, {
      value: b[c],
      enumerable: !1
    })
  }

  function ka() {
    this._ = Object.create(null)
  }

  function bb(a) {
    return "__proto__" === (a += "") || "\x00" === a[0] ? "\x00" + a : a
  }

  function rb(a) {
    return "\x00" === (a += "")[0] ? a.slice(1) : a
  }

  function Nd(a) {
    return bb(a) in this._
  }

  function Od(a) {
    return (a = bb(a)) in this._ && delete this._[a]
  }

  function Pd() {
    var a = [],
      b;
    for (b in this._) a.push(rb(b));
    return a
  }

  function Qd() {
    var a =
      0,
      b;
    for (b in this._) ++a;
    return a
  }

  function Rd() {
    for (var a in this._) return !1;
    return !0
  }

  function sc() {
    this._ = Object.create(null)
  }

  function S(a) {
    return a
  }

  function Ag(a, b, c) {
    return function() {
      var d = c.apply(b, arguments);
      return d === b ? a : d
    }
  }

  function tc(a, b) {
    if (b in a) return b;
    b = b.charAt(0).toUpperCase() + b.slice(1);
    for (var c = 0, d = Sd.length; c < d; ++c) {
      var e = Sd[c] + b;
      if (e in a) return e
    }
  }

  function O() {}

  function uc() {}

  function Td(a) {
    function b() {
      for (var b = c, d = -1, g = b.length, h; ++d < g;)(h = b[d].on) && h.apply(this, arguments);
      return a
    }
    var c = [],
      d = new ka;
    b.on = function(b, f) {
      var g = d.get(b),
        h;
      if (2 > arguments.length) return g && g.on;
      g && (g.on = null, c = c.slice(0, h = c.indexOf(g)).concat(c.slice(h + 1)), d.remove(b));
      f && c.push(d.set(b, {
        on: f
      }));
      return a
    };
    return b
  }

  function sa() {
    k.event.preventDefault()
  }

  function vc() {
    for (var a = k.event, b; b = a.sourceEvent;) a = b;
    return a
  }

  function wc(a) {
    for (var b = new uc, c = 0, d = arguments.length; ++c < d;) b[arguments[c]] = Td(b);
    b.of = function(c, d) {
      return function(g) {
        try {
          var h = g.sourceEvent = k.event;
          g.target = a;
          k.event = g;
          b[g.type].apply(c,
            d)
        } finally {
          k.event = h
        }
      }
    };
    return b
  }

  function ta(a) {
    sb(a, F);
    return a
  }

  function xc(a) {
    return "function" === typeof a ? a : function() {
      return yc(a, this)
    }
  }

  function Ud(a) {
    return "function" === typeof a ? a : function() {
      return zc(a, this)
    }
  }

  function Vd(a, b) {
    function c() {
      this.removeAttribute(a)
    }

    function d() {
      this.removeAttributeNS(a.space, a.local)
    }

    function e() {
      this.setAttribute(a, b)
    }

    function f() {
      this.setAttributeNS(a.space, a.local, b)
    }

    function g() {
      var c = b.apply(this, arguments);
      null == c ? this.removeAttribute(a) : this.setAttribute(a,
        c)
    }

    function h() {
      var c = b.apply(this, arguments);
      null == c ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, c)
    }
    a = k.ns.qualify(a);
    return null == b ? a.local ? d : c : "function" === typeof b ? a.local ? h : g : a.local ? f : e
  }

  function Wd(a) {
    return new RegExp("(?:^|\\s+)" + k.requote(a) + "(?:\\s+|$)", "g")
  }

  function Xd(a, b) {
    function c() {
      for (var c = -1; ++c < e;) a[c](this, b)
    }

    function d() {
      for (var c = -1, d = b.apply(this, arguments); ++c < e;) a[c](this, d)
    }
    a = (a + "").trim().split(/^|\s+/).map(Bg);
    var e = a.length;
    return "function" ===
      typeof b ? d : c
  }

  function Bg(a) {
    var b = Wd(a);
    return function(c, d) {
      if (e = c.classList) return d ? e.add(a) : e.remove(a);
      var e = c.getAttribute("class") || "";
      d ? (b.lastIndex = 0, b.test(e) || c.setAttribute("class", (e + " " + a).trim().replace(/\s+/g, " "))) : c.setAttribute("class", e.replace(b, " ").trim().replace(/\s+/g, " "))
    }
  }

  function Yd(a, b, c) {
    function d() {
      this.style.removeProperty(a)
    }

    function e() {
      this.style.setProperty(a, b, c)
    }

    function f() {
      var d = b.apply(this, arguments);
      null == d ? this.style.removeProperty(a) : this.style.setProperty(a,
        d, c)
    }
    return null == b ? d : "function" === typeof b ? f : e
  }

  function Zd(a, b) {
    function c() {
      delete this[a]
    }

    function d() {
      this[a] = b
    }

    function e() {
      var c = b.apply(this, arguments);
      null == c ? delete this[a] : this[a] = c
    }
    return null == b ? c : "function" === typeof b ? e : d
  }

  function $d(a) {
    function b() {
      var b = this.ownerDocument,
        c = this.namespaceURI;
      return "http://www.w3.org/1999/xhtml" === c && "http://www.w3.org/1999/xhtml" === b.documentElement.namespaceURI ? b.createElement(a) : b.createElementNS(c, a)
    }

    function c() {
      return this.ownerDocument.createElementNS(a.space,
        a.local)
    }
    return "function" === typeof a ? a : (a = k.ns.qualify(a)).local ? c : b
  }

  function Cg() {
    var a = this.parentNode;
    a && a.removeChild(this)
  }

  function ae(a) {
    return function() {
      return tb(this, a)
    }
  }

  function Dg(a) {
    arguments.length || (a = Pa);
    return function(b, c) {
      return b && c ? a(b.__data__, c.__data__) : !b - !c
    }
  }

  function la(a, b) {
    for (var c = 0, d = a.length; c < d; c++)
      for (var e = a[c], f = 0, g = e.length, h; f < g; f++)(h = e[f]) && b(h, f, c);
    return a
  }

  function be(a) {
    sb(a, ma);
    return a
  }

  function Eg(a) {
    var b, c;
    return function(d, e, f) {
      d = a[f].update;
      var g = d.length;
      f != c && (c = f, b = 0);
      for (e >= b && (b = e + 1); !(e = d[b]) && ++b < g;);
      return e
    }
  }

  function ce(a, b, c) {
    function d() {
      var b = this[g];
      b && (this.removeEventListener(a, b, b.$), delete this[g])
    }

    function e() {
      var e = l(b, ga(arguments));
      d.call(this);
      this.addEventListener(a, this[g] = e, e.$ = c);
      e._ = b
    }

    function f() {
      var b = new RegExp("^__on([^.]+)" + k.requote(a) + "$"),
        c, d;
      for (d in this)
        if (c = d.match(b)) {
          var e = this[d];
          this.removeEventListener(c[1], e, e.$);
          delete this[d]
        }
    }
    var g = "__on" + a,
      h = a.indexOf("."),
      l = de;
    0 < h && (a = a.slice(0, h));
    var m = Ac.get(a);
    m && (a = m, l = Fg);
    return h ? b ? e : d : b ? O : f
  }

  function de(a, b) {
    return function(c) {
      var d = k.event;
      k.event = c;
      b[0] = this.__data__;
      try {
        a.apply(this, b)
      } finally {
        k.event = d
      }
    }
  }

  function Fg(a, b) {
    var c = de(a, b);
    return function(a) {
      var b = a.relatedTarget;
      b && (b === this || b.compareDocumentPosition(this) & 8) || c.call(this, a)
    }
  }

  function ub(a) {
    var b = ".dragsuppress-" + ++Gg,
      c = "click" + b,
      d = k.select(ra(a)).on("touchmove" + b, sa).on("dragstart" + b, sa).on("selectstart" + b, sa);
    null == Da && (Da = "onselectstart" in a ? !1 : tc(a.style, "userSelect"));
    if (Da) {
      var e =
        (a && (a.ownerDocument || a.document || a).documentElement).style,
        f = e[Da];
      e[Da] = "none"
    }
    return function(a) {
      d.on(b, null);
      Da && (e[Da] = f);
      if (a) {
        var h = function() {
          d.on(c, null)
        };
        d.on(c, function() {
          sa();
          h()
        }, !0);
        setTimeout(h, 0)
      }
    }
  }

  function Bc(a, b) {
    b.changedTouches && (b = b.changedTouches[0]);
    var c = a.ownerSVGElement || a;
    if (c.createSVGPoint) {
      var d = c.createSVGPoint();
      if (0 > Cc && (c = ra(a), c.scrollX || c.scrollY)) {
        var c = k.select("body").append("svg").style({
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
          }, "important"),
          e = c[0][0].getScreenCTM();
        Cc = !(e.f || e.e);
        c.remove()
      }
      Cc ? (d.x = b.pageX, d.y = b.pageY) : (d.x = b.clientX, d.y = b.clientY);
      d = d.matrixTransform(a.getScreenCTM().inverse());
      return [d.x, d.y]
    }
    d = a.getBoundingClientRect();
    return [b.clientX - d.left - a.clientLeft, b.clientY - d.top - a.clientTop]
  }

  function Hg() {
    return k.event.changedTouches[0].identifier
  }

  function Dc(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  }

  function ee(a) {
    return 1 < a ? 0 : -1 > a ? D : Math.acos(a)
  }

  function ua(a) {
    return 1 < a ? P : -1 > a ? -P : Math.asin(a)
  }

  function fe(a) {
    return ((a =
      Math.exp(a)) + 1 / a) / 2
  }

  function ge(a) {
    return (a = Math.sin(a / 2)) * a
  }

  function Ea() {}

  function ha(a, b, c) {
    return this instanceof ha ? void(this.h = +a, this.s = +b, this.l = +c) : 2 > arguments.length ? a instanceof ha ? new ha(a.h, a.s, a.l) : he("" + a, ie, ha) : new ha(a, b, c)
  }

  function Ec(a, b, c) {
    function d(a) {
      360 < a ? a -= 360 : 0 > a && (a += 360);
      return 60 > a ? e + (f - e) * a / 60 : 180 > a ? f : 240 > a ? e + (f - e) * (240 - a) / 60 : e
    }
    var e, f;
    a = isNaN(a) ? 0 : 0 > (a %= 360) ? a + 360 : a;
    b = isNaN(b) ? 0 : 0 > b ? 0 : 1 < b ? 1 : b;
    c = 0 > c ? 0 : 1 < c ? 1 : c;
    f = .5 >= c ? c * (1 + b) : c + b - c * b;
    e = 2 * c - f;
    return new W(Math.round(255 *
      d(a + 120)), Math.round(255 * d(a)), Math.round(255 * d(a - 120)))
  }

  function ba(a, b, c) {
    return this instanceof ba ? void(this.h = +a, this.c = +b, this.l = +c) : 2 > arguments.length ? a instanceof ba ? new ba(a.h, a.c, a.l) : a instanceof ca ? je(a.l, a.a, a.b) : je((a = ke((a = k.rgb(a)).r, a.g, a.b)).l, a.a, a.b) : new ba(a, b, c)
  }

  function Fc(a, b, c) {
    isNaN(a) && (a = 0);
    isNaN(b) && (b = 0);
    return new ca(c, Math.cos(a *= B) * b, Math.sin(a) * b)
  }

  function ca(a, b, c) {
    return this instanceof ca ? void(this.l = +a, this.a = +b, this.b = +c) : 2 > arguments.length ? a instanceof ca ? new ca(a.l,
      a.a, a.b) : a instanceof ba ? Fc(a.h, a.c, a.l) : ke((a = W(a)).r, a.g, a.b) : new ca(a, b, c)
  }

  function le(a, b, c) {
    a = (a + 16) / 116;
    c = a - c / 200;
    b = Gc(a + b / 500) * me;
    a = Gc(a) * ne;
    c = Gc(c) * oe;
    return new W(Hc(3.2404542 * b - 1.5371385 * a - .4985314 * c), Hc(-.969266 * b + 1.8760108 * a + .041556 * c), Hc(.0556434 * b - .2040259 * a + 1.0572252 * c))
  }

  function je(a, b, c) {
    return 0 < a ? new ba(Math.atan2(c, b) * K, Math.sqrt(b * b + c * c), a) : new ba(NaN, NaN, a)
  }

  function Gc(a) {
    return .206893034 < a ? a * a * a : (a - 4 / 29) / 7.787037
  }

  function Ic(a) {
    return .008856 < a ? Math.pow(a, 1 / 3) : 7.787037 * a + 4 / 29
  }

  function Hc(a) {
    return Math.round(255 * (.00304 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055))
  }

  function W(a, b, c) {
    return this instanceof W ? void(this.r = ~~a, this.g = ~~b, this.b = ~~c) : 2 > arguments.length ? a instanceof W ? new W(a.r, a.g, a.b) : he("" + a, W, Ec) : new W(a, b, c)
  }

  function vb(a) {
    return new W(a >> 16, a >> 8 & 255, a & 255) + ""
  }

  function Qa(a) {
    return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
  }

  function he(a, b, c) {
    var d = 0,
      e = 0,
      f = 0,
      g, h;
    if (g = /([a-z]+)\((.*)\)/.exec(a = a.toLowerCase())) switch (h = g[2].split(","),
      g[1]) {
      case "hsl":
        return c(parseFloat(h[0]), parseFloat(h[1]) / 100, parseFloat(h[2]) / 100);
      case "rgb":
        return b(Jc(h[0]), Jc(h[1]), Jc(h[2]))
    }
    if (c = wb.get(a)) return b(c.r, c.g, c.b);
    null == a || "#" !== a.charAt(0) || isNaN(c = parseInt(a.slice(1), 16)) || (4 === a.length ? (d = (c & 3840) >> 4, d |= d >> 4, e = c & 240, e |= e >> 4, f = c & 15, f |= f << 4) : 7 === a.length && (d = (c & 16711680) >> 16, e = (c & 65280) >> 8, f = c & 255));
    return b(d, e, f)
  }

  function ie(a, b, c) {
    var d = Math.min(a /= 255, b /= 255, c /= 255),
      e = Math.max(a, b, c),
      f = e - d,
      g = (e + d) / 2;
    f ? (d = .5 > g ? f / (e + d) : f / (2 - e - d), a = 60 * (a ==
      e ? (b - c) / f + (b < c ? 6 : 0) : b == e ? (c - a) / f + 2 : (a - b) / f + 4)) : (a = NaN, d = 0 < g && 1 > g ? 0 : a);
    return new ha(a, d, g)
  }

  function ke(a, b, c) {
    a = Kc(a);
    b = Kc(b);
    c = Kc(c);
    var d = Ic((.4124564 * a + .3575761 * b + .1804375 * c) / me),
      e = Ic((.2126729 * a + .7151522 * b + .072175 * c) / ne);
    a = Ic((.0193339 * a + .119192 * b + .9503041 * c) / oe);
    return ca(116 * e - 16, 500 * (d - e), 200 * (e - a))
  }

  function Kc(a) {
    return .04045 >= (a /= 255) ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
  }

  function Jc(a) {
    var b = parseFloat(a);
    return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
  }

  function I(a) {
    return "function" ===
      typeof a ? a : function() {
        return a
      }
  }

  function Lc(a) {
    return function(b, c, d) {
      2 === arguments.length && "function" === typeof c && (d = c, c = null);
      return xb(b, c, a, d)
    }
  }

  function xb(a, b, c, d) {
    function e() {
      var a = l.status,
        b, d;
      if (d = !a) d = (d = l.responseType) && "text" !== d ? l.response : l.responseText;
      if (d || 200 <= a && 300 > a || 304 === a) {
        try {
          b = c.call(f, l)
        } catch (e) {
          g.error.call(f, e);
          return
        }
        g.load.call(f, b)
      } else g.error.call(f, l)
    }
    var f = {},
      g = k.dispatch("beforesend", "progress", "load", "error"),
      h = {},
      l = new XMLHttpRequest,
      m = null;
    !this.XDomainRequest ||
      "withCredentials" in l || !/^(http(s)?:)?\/\//.test(a) || (l = new XDomainRequest);
    "onload" in l ? l.onload = l.onerror = e : l.onreadystatechange = function() {
      3 < l.readyState && e()
    };
    l.onprogress = function(a) {
      var b = k.event;
      k.event = a;
      try {
        g.progress.call(f, l)
      } finally {
        k.event = b
      }
    };
    f.header = function(a, b) {
      a = (a + "").toLowerCase();
      if (2 > arguments.length) return h[a];
      null == b ? delete h[a] : h[a] = b + "";
      return f
    };
    f.mimeType = function(a) {
      if (!arguments.length) return b;
      b = null == a ? null : a + "";
      return f
    };
    f.responseType = function(a) {
      if (!arguments.length) return m;
      m = a;
      return f
    };
    f.response = function(a) {
      c = a;
      return f
    };
    ["get", "post"].forEach(function(a) {
      f[a] = function() {
        return f.send.apply(f, [a].concat(ga(arguments)))
      }
    });
    f.send = function(c, d, e) {
      2 === arguments.length && "function" === typeof d && (e = d, d = null);
      l.open(c, a, !0);
      null == b || "accept" in h || (h.accept = b + ",*/*");
      if (l.setRequestHeader)
        for (var k in h) l.setRequestHeader(k, h[k]);
      null != b && l.overrideMimeType && l.overrideMimeType(b);
      null != m && (l.responseType = m);
      if (null != e) f.on("error", e).on("load", function(a) {
        e(null, a)
      });
      g.beforesend.call(f,
        l);
      l.send(null == d ? null : d);
      return f
    };
    f.abort = function() {
      l.abort();
      return f
    };
    k.rebind(f, g, "on");
    return null == d ? f : f.get(Ig(d))
  }

  function Ig(a) {
    return 1 === a.length ? function(b, c) {
      a(null == b ? c : null)
    } : a
  }

  function yb(a, b, c) {
    var d = arguments.length;
    2 > d && (b = 0);
    3 > d && (c = Date.now());
    d = {
      c: a,
      t: c + b,
      n: null
    };
    zb ? zb.n = d : Ab = d;
    zb = d;
    Bb || (Cb = clearTimeout(Cb), Bb = 1, pe(Mc));
    return d
  }

  function Mc() {
    var a = qe(),
      a = re() - a;
    24 < a ? (isFinite(a) && (clearTimeout(Cb), Cb = setTimeout(Mc, a)), Bb = 0) : (Bb = 1, pe(Mc))
  }

  function qe() {
    for (var a = Date.now(),
        b = Ab; b;) a >= b.t && b.c(a - b.t) && (b.c = null), b = b.n;
    return a
  }

  function re() {
    for (var a, b = Ab, c = Infinity; b;) b.c ? (b.t < c && (c = b.t), b = (a = b).n) : b = a ? a.n = b.n : Ab = b.n;
    zb = a;
    return c
  }

  function Nc(a, b) {
    return b - (a ? Math.ceil(Math.log(a) / Math.LN10) : 1)
  }

  function Jg(a) {
    var b = a.decimal,
      c = a.thousands,
      d = a.grouping,
      e = a.currency,
      f = d && c ? function(a, b) {
        for (var e = a.length, f = [], n = 0, p = d[0], q = 0; 0 < e && 0 < p;) {
          q + p + 1 > b && (p = Math.max(1, b - q));
          f.push(a.substring(e -= p, e + p));
          if ((q += p + 1) > b) break;
          p = d[n = (n + 1) % d.length]
        }
        return f.reverse().join(c)
      } : S;
    return function(a) {
      a =
        se.exec(a);
      var c = a[1] || " ",
        d = a[2] || ">",
        m = a[3] || "-",
        n = a[4] || "",
        p = a[5],
        q = +a[6],
        r = a[7],
        t = a[8],
        v = a[9],
        x = 1,
        u = "",
        y = "",
        z = !1,
        A = !0;
      t && (t = +t.substring(1));
      if (p || "0" === c && "=" === d) p = c = "0", d = "=";
      switch (v) {
        case "n":
          r = !0;
          v = "g";
          break;
        case "%":
          x = 100;
          y = "%";
          v = "f";
          break;
        case "p":
          x = 100;
          y = "%";
          v = "r";
          break;
        case "b":
        case "o":
        case "x":
        case "X":
          "#" === n && (u = "0" + v.toLowerCase());
        case "c":
          A = !1;
        case "d":
          z = !0;
          t = 0;
          break;
        case "s":
          x = -1, v = "r"
      }
      "$" === n && (u = e[0], y = e[1]);
      "r" != v || t || (v = "g");
      if (null != t)
        if ("g" == v) t = Math.max(1, Math.min(21,
          t));
        else if ("e" == v || "f" == v) t = Math.max(0, Math.min(20, t));
      var v = Kg.get(v) || Lg,
        C = p && r;
      return function(a) {
        var e = y;
        if (z && a % 1) return "";
        var g = 0 > a || 0 === a && 0 > 1 / a ? (a = -a, "-") : "-" === m ? "" : m;
        0 > x ? (e = k.formatPrefix(a, t), a = e.scale(a), e = e.symbol + y) : a *= x;
        a = v(a, t);
        var n = a.lastIndexOf("."),
          T;
        0 > n ? (n = A ? a.lastIndexOf("e") : -1, 0 > n ? (T = a, a = "") : (T = a.substring(0, n), a = a.substring(n))) : (T = a.substring(0, n), a = b + a.substring(n + 1));
        !p && r && (T = f(T, Infinity));
        var n = u.length + T.length + a.length + (C ? 0 : g.length),
          H = n < q ? Array(n = q - n + 1).join(c) :
          "";
        C && (T = f(H + T, H.length ? q - a.length : Infinity));
        g += u;
        a = T + a;
        return ("<" === d ? g + a + H : ">" === d ? H + g + a : "^" === d ? H.substring(0, n >>= 1) + g + a + H.substring(n) : g + (C ? a : H + a)) + e
      }
    }
  }

  function Lg(a) {
    return a + ""
  }

  function na() {
    this._ = new Date(1 < arguments.length ? Date.UTC.apply(this, arguments) : arguments[0])
  }

  function Fa(a, b, c) {
    function d(b) {
      var c = a(b),
        d = f(c, 1);
      return b - c < d - b ? c : d
    }

    function e(c) {
      b(c = a(new U(c - 1)), 1);
      return c
    }

    function f(a, c) {
      b(a = new U(+a), c);
      return a
    }

    function g(a, d, f) {
      a = e(a);
      var h = [];
      if (1 < f)
        for (; a < d;) c(a) % f || h.push(new Date(+a)),
          b(a, 1);
      else
        for (; a < d;) h.push(new Date(+a)), b(a, 1);
      return h
    }
    a.floor = a;
    a.round = d;
    a.ceil = e;
    a.offset = f;
    a.range = g;
    var h = a.utc = Db(a);
    h.floor = h;
    h.round = Db(d);
    h.ceil = Db(e);
    h.offset = Db(f);
    h.range = function(a, b, c) {
      try {
        U = na;
        var d = new na;
        d._ = a;
        return g(d, b, c)
      } finally {
        U = Date
      }
    };
    return a
  }

  function Db(a) {
    return function(b, c) {
      try {
        U = na;
        var d = new na;
        d._ = b;
        return a(d, c)._
      } finally {
        U = Date
      }
    }
  }

  function Mg(a) {
    function b(a) {
      function b(c) {
        for (var e = [], f = -1, h = 0, l, g; ++f < d;)
          if (37 === a.charCodeAt(f)) {
            e.push(a.slice(h, f));
            null != (l =
              te[h = a.charAt(++f)]) && (h = a.charAt(++f));
            if (g = A[h]) h = g(c, null == l ? "e" === h ? " " : "0" : l);
            e.push(h);
            h = f + 1
          }
        e.push(a.slice(h, f));
        return e.join("")
      }
      var d = a.length;
      b.parse = function(b) {
        var d = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
        };
        if (c(d, a, b, 0) != b.length) return null;
        "p" in d && (d.H = d.H % 12 + 12 * d.p);
        b = null != d.Z && U !== na;
        var e = new(b ? na : U);
        "j" in d ? e.setFullYear(d.y, 0, d.j) : "W" in d || "U" in d ? ("w" in d || (d.w = "W" in d ? 1 : 0), e.setFullYear(d.y, 0, 1), e.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + 7 * d.W - (e.getDay() + 5) % 7 : d.w + 7 * d.U - (e.getDay() +
          6) % 7)) : e.setFullYear(d.y, d.m, d.d);
        e.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
        return b ? e._ : e
      };
      b.toString = function() {
        return a
      };
      return b
    }

    function c(a, b, c, d) {
      for (var e, f = 0, h = b.length, l = c.length; f < h;) {
        if (d >= l) return -1;
        e = b.charCodeAt(f++);
        if (37 === e) {
          if (e = b.charAt(f++), e = C[e in te ? b.charAt(f++) : e], !e || 0 > (d = e(a, c, d))) return -1
        } else if (e != c.charCodeAt(d++)) return -1
      }
      return d
    }
    var d = a.dateTime,
      e = a.date,
      f = a.time,
      g = a.periods,
      h = a.days,
      l = a.shortDays,
      m = a.months,
      n = a.shortMonths;
    b.utc = function(a) {
      function c(a) {
        try {
          U =
            na;
          var b = new U;
          b._ = a;
          return d(b)
        } finally {
          U = Date
        }
      }
      var d = b(a);
      c.parse = function(a) {
        try {
          U = na;
          var b = d.parse(a);
          return b && b._
        } finally {
          U = Date
        }
      };
      c.toString = d.toString;
      return c
    };
    b.multi = b.utc.multi = Ng;
    var p = k.map(),
      q = Eb(h),
      r = Fb(h),
      t = Eb(l),
      v = Fb(l),
      x = Eb(m),
      u = Fb(m),
      y = Eb(n),
      z = Fb(n);
    g.forEach(function(a, b) {
      p.set(a.toLowerCase(), b)
    });
    var A = {
        a: function(a) {
          return l[a.getDay()]
        },
        A: function(a) {
          return h[a.getDay()]
        },
        b: function(a) {
          return n[a.getMonth()]
        },
        B: function(a) {
          return m[a.getMonth()]
        },
        c: b(d),
        d: function(a, b) {
          return X(a.getDate(),
            b, 2)
        },
        e: function(a, b) {
          return X(a.getDate(), b, 2)
        },
        H: function(a, b) {
          return X(a.getHours(), b, 2)
        },
        I: function(a, b) {
          return X(a.getHours() % 12 || 12, b, 2)
        },
        j: function(a, b) {
          return X(1 + w.dayOfYear(a), b, 3)
        },
        L: function(a, b) {
          return X(a.getMilliseconds(), b, 3)
        },
        m: function(a, b) {
          return X(a.getMonth() + 1, b, 2)
        },
        M: function(a, b) {
          return X(a.getMinutes(), b, 2)
        },
        p: function(a) {
          return g[+(12 <= a.getHours())]
        },
        S: function(a, b) {
          return X(a.getSeconds(), b, 2)
        },
        U: function(a, b) {
          return X(w.sundayOfYear(a), b, 2)
        },
        w: function(a) {
          return a.getDay()
        },
        W: function(a, b) {
          return X(w.mondayOfYear(a), b, 2)
        },
        x: b(e),
        X: b(f),
        y: function(a, b) {
          return X(a.getFullYear() % 100, b, 2)
        },
        Y: function(a, b) {
          return X(a.getFullYear() % 1E4, b, 4)
        },
        Z: Og,
        "%": function() {
          return "%"
        }
      },
      C = {
        a: function(a, b, c) {
          t.lastIndex = 0;
          return (b = t.exec(b.slice(c))) ? (a.w = v.get(b[0].toLowerCase()), c + b[0].length) : -1
        },
        A: function(a, b, c) {
          q.lastIndex = 0;
          return (b = q.exec(b.slice(c))) ? (a.w = r.get(b[0].toLowerCase()), c + b[0].length) : -1
        },
        b: function(a, b, c) {
          y.lastIndex = 0;
          return (b = y.exec(b.slice(c))) ? (a.m = z.get(b[0].toLowerCase()),
            c + b[0].length) : -1
        },
        B: function(a, b, c) {
          x.lastIndex = 0;
          return (b = x.exec(b.slice(c))) ? (a.m = u.get(b[0].toLowerCase()), c + b[0].length) : -1
        },
        c: function(a, b, d) {
          return c(a, A.c.toString(), b, d)
        },
        d: ue,
        e: ue,
        H: ve,
        I: ve,
        j: Pg,
        L: Qg,
        m: Rg,
        M: Sg,
        p: function(a, b, c) {
          b = p.get(b.slice(c, c += 2).toLowerCase());
          return null == b ? -1 : (a.p = b, c)
        },
        S: Tg,
        U: Ug,
        w: Vg,
        W: Wg,
        x: function(a, b, d) {
          return c(a, A.x.toString(), b, d)
        },
        X: function(a, b, d) {
          return c(a, A.X.toString(), b, d)
        },
        y: Xg,
        Y: Yg,
        Z: Zg,
        "%": $g
      };
    return b
  }

  function X(a, b, c) {
    var d = 0 > a ? "-" : "";
    a = (d ? -a :
      a) + "";
    var e = a.length;
    return d + (e < c ? Array(c - e + 1).join(b) + a : a)
  }

  function Eb(a) {
    return new RegExp("^(?:" + a.map(k.requote).join("|") + ")", "i")
  }

  function Fb(a) {
    for (var b = new ka, c = -1, d = a.length; ++c < d;) b.set(a[c].toLowerCase(), c);
    return b
  }

  function Vg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 1))) ? (a.w = +b[0], c + b[0].length) : -1
  }

  function Ug(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c))) ? (a.U = +b[0], c + b[0].length) : -1
  }

  function Wg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c))) ? (a.W = +b[0], c + b[0].length) :
      -1
  }

  function Yg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 4))) ? (a.y = +b[0], c + b[0].length) : -1
  }

  function Xg(a, b, c) {
    M.lastIndex = 0;
    if (b = M.exec(b.slice(c, c + 2))) {
      var d = +b[0];
      a = (a.y = d + (68 < d ? 1900 : 2E3), c + b[0].length)
    } else a = -1;
    return a
  }

  function Zg(a, b, c) {
    return /^[+-]\d{4}$/.test(b = b.slice(c, c + 5)) ? (a.Z = -b, c + 5) : -1
  }

  function Rg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 2))) ? (a.m = b[0] - 1, c + b[0].length) : -1
  }

  function ue(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 2))) ? (a.d = +b[0], c + b[0].length) : -1
  }

  function Pg(a,
    b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 3))) ? (a.j = +b[0], c + b[0].length) : -1
  }

  function ve(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 2))) ? (a.H = +b[0], c + b[0].length) : -1
  }

  function Sg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 2))) ? (a.M = +b[0], c + b[0].length) : -1
  }

  function Tg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 2))) ? (a.S = +b[0], c + b[0].length) : -1
  }

  function Qg(a, b, c) {
    M.lastIndex = 0;
    return (b = M.exec(b.slice(c, c + 3))) ? (a.L = +b[0], c + b[0].length) : -1
  }

  function Og(a) {
    var b = a.getTimezoneOffset();
    a = 0 < b ? "-" : "+";
    var c = E(b) / 60 | 0,
      b = E(b) % 60;
    return a + X(c, "0", 2) + X(b, "0", 2)
  }

  function $g(a, b, c) {
    we.lastIndex = 0;
    return (a = we.exec(b.slice(c, c + 1))) ? c + a[0].length : -1
  }

  function Ng(a) {
    for (var b = a.length, c = -1; ++c < b;) a[c][0] = this(a[c][0]);
    return function(b) {
      for (var c = 0, f = a[c]; !f[1](b);) f = a[++c];
      return f[0](b)
    }
  }

  function Oc() {}

  function xe(a, b, c) {
    var d = c.s = a + b,
      e = d - a;
    c.t = a - (d - e) + (b - e)
  }

  function Gb(a, b) {
    if (a && ye.hasOwnProperty(a.type)) ye[a.type](a, b)
  }

  function Pc(a, b, c) {
    var d = -1;
    c = a.length - c;
    var e;
    for (b.lineStart(); ++d <
      c;) e = a[d], b.point(e[0], e[1], e[2]);
    b.lineEnd()
  }

  function ze(a, b) {
    var c = -1,
      d = a.length;
    for (b.polygonStart(); ++c < d;) Pc(a[c], b, 1);
    b.polygonEnd()
  }

  function ah() {
    function a(a, b) {
      a *= B;
      b = b * B / 2 + D / 4;
      var c = a - d,
        m = 0 <= c ? 1 : -1,
        c = m * c,
        n = Math.cos(b),
        p = Math.sin(b),
        q = f * p;
      Ga.add(Math.atan2(q * m * Math.sin(c), e * n + q * Math.cos(c)));
      d = a;
      e = n;
      f = p
    }
    var b, c, d, e, f;
    Y.point = function(g, h) {
      Y.point = a;
      d = (b = g) * B;
      e = Math.cos(h = (c = h) * B / 2 + D / 4);
      f = Math.sin(h)
    };
    Y.lineEnd = function() {
      a(b, c)
    }
  }

  function Ha(a) {
    var b = a[0];
    a = a[1];
    var c = Math.cos(a);
    return [c *
      Math.cos(b), c * Math.sin(b), Math.sin(a)
    ]
  }

  function Hb(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  }

  function Ra(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  }

  function Qc(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2]
  }

  function Ib(a, b) {
    return [a[0] * b, a[1] * b, a[2] * b]
  }

  function Jb(a) {
    var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    a[0] /= b;
    a[1] /= b;
    a[2] /= b
  }

  function Kb(a) {
    return [Math.atan2(a[1], a[0]), ua(a[2])]
  }

  function Lb(a, b) {
    return 1E-6 > E(a[0] - b[0]) && 1E-6 > E(a[1] - b[1])
  }

  function Rc(a, b) {
    a *= B;
    var c =
      Math.cos(b *= B);
    cb(c * Math.cos(a), c * Math.sin(a), Math.sin(b))
  }

  function cb(a, b, c) {
    ++db;
    Ia += (a - Ia) / db;
    Ja += (b - Ja) / db;
    oa += (c - oa) / db
  }

  function Ae() {
    function a(a, f) {
      a *= B;
      var g = Math.cos(f *= B),
        h = g * Math.cos(a),
        g = g * Math.sin(a),
        l = Math.sin(f),
        m = Math.atan2(Math.sqrt((m = c * l - d * g) * m + (m = d * h - b * l) * m + (m = b * g - c * h) * m), b * h + c * g + d * l);
      Mb += m;
      va += m * (b + (b = h));
      wa += m * (c + (c = g));
      ia += m * (d + (d = l));
      cb(b, c, d)
    }
    var b, c, d;
    da.point = function(e, f) {
      e *= B;
      var g = Math.cos(f *= B);
      b = g * Math.cos(e);
      c = g * Math.sin(e);
      d = Math.sin(f);
      da.point = a;
      cb(b, c, d)
    }
  }

  function Be() {
    da.point =
      Rc
  }

  function bh() {
    function a(a, b) {
      a *= B;
      var c = Math.cos(b *= B),
        m = c * Math.cos(a),
        c = c * Math.sin(a),
        n = Math.sin(b),
        p = e * n - f * c,
        q = f * m - d * n,
        k = d * c - e * m,
        t = Math.sqrt(p * p + q * q + k * k),
        v = d * m + e * c + f * n,
        x = t && -ee(v) / t,
        t = Math.atan2(t, v);
      Sa += x * p;
      Ta += x * q;
      xa += x * k;
      Mb += t;
      va += t * (d + (d = m));
      wa += t * (e + (e = c));
      ia += t * (f + (f = n));
      cb(d, e, f)
    }
    var b, c, d, e, f;
    da.point = function(g, h) {
      b = g;
      c = h;
      da.point = a;
      g *= B;
      var l = Math.cos(h *= B);
      d = l * Math.cos(g);
      e = l * Math.sin(g);
      f = Math.sin(h);
      cb(d, e, f)
    };
    da.lineEnd = function() {
      a(b, c);
      da.lineEnd = Be;
      da.point = Rc
    }
  }

  function Ce(a,
    b) {
    function c(c, e) {
      return c = a(c, e), b(c[0], c[1])
    }
    a.invert && b.invert && (c.invert = function(c, e) {
      return c = b.invert(c, e), c && a.invert(c[0], c[1])
    });
    return c
  }

  function eb() {
    return !0
  }

  function De(a, b, c, d, e) {
    var f = [],
      g = [];
    a.forEach(function(a) {
      if (!(0 >= (b = a.length - 1))) {
        var b, c = a[0],
          d = a[b];
        if (Lb(c, d)) {
          e.lineStart();
          for (d = 0; d < b; ++d) e.point((c = a[d])[0], c[1]);
          e.lineEnd()
        } else b = new Nb(c, a, null, !0), c = new Nb(c, null, b, !1), b.o = c, f.push(b), g.push(c), b = new Nb(d, a, null, !1), c = new Nb(d, null, b, !0), b.o = c, f.push(b), g.push(c)
      }
    });
    g.sort(b);
    Ee(f);
    Ee(g);
    if (f.length) {
      a = 0;
      b = c;
      for (c = g.length; a < c; ++a) g[a].e = b = !b;
      b = f[0];
      for (var h, l;;) {
        for (var m = b, n = !0; m.v;)
          if ((m = m.n) === b) return;
        h = m.z;
        e.lineStart();
        do {
          m.v = m.o.v = !0;
          if (m.e) {
            if (n)
              for (a = 0, c = h.length; a < c; ++a) e.point((l = h[a])[0], l[1]);
            else d(m.x, m.n.x, 1, e);
            m = m.n
          } else {
            if (n)
              for (h = m.p.z, a = h.length - 1; 0 <= a; --a) e.point((l = h[a])[0], l[1]);
            else d(m.x, m.p.x, -1, e);
            m = m.p
          }
          m = m.o;
          h = m.z;
          n = !n
        } while (!m.v);
        e.lineEnd()
      }
    }
  }

  function Ee(a) {
    if (b = a.length) {
      for (var b, c = 0, d = a[0], e; ++c < b;) d.n = e = a[c], e.p = d, d = e;
      d.n =
        e = a[0];
      e.p = d
    }
  }

  function Nb(a, b, c, d) {
    this.x = a;
    this.z = b;
    this.o = c;
    this.e = d;
    this.v = !1;
    this.n = this.p = null
  }

  function Fe(a, b, c, d) {
    return function(e, f) {
      function g(b, c) {
        var d = e(b, c);
        a(b = d[0], c = d[1]) && f.point(b, c)
      }

      function h(a, b) {
        var c = e(a, b);
        r.point(c[0], c[1])
      }

      function l() {
        v.point = h;
        r.lineStart()
      }

      function m() {
        v.point = g;
        r.lineEnd()
      }

      function n(a, b) {
        C.push([a, b]);
        var c = e(a, b);
        y.point(c[0], c[1])
      }

      function p() {
        y.lineStart();
        C = []
      }

      function q() {
        n(C[0][0], C[0][1]);
        y.lineEnd();
        var a = y.clean(),
          b = u.buffer(),
          c = b.length;
        C.pop();
        A.push(C);
        C = null;
        if (c)
          if (a & 1) {
            var a = b[0],
              c = a.length - 1,
              b = -1,
              d;
            if (0 < c) {
              z || (f.polygonStart(), z = !0);
              for (f.lineStart(); ++b < c;) f.point((d = a[b])[0], d[1]);
              f.lineEnd()
            }
          } else 1 < c && a & 2 && b.push(b.pop().concat(b.shift())), x.push(b.filter(ch))
      }
      var r = b(f),
        t = e.invert(d[0], d[1]),
        v = {
          point: g,
          lineStart: l,
          lineEnd: m,
          polygonStart: function() {
            v.point = n;
            v.lineStart = p;
            v.lineEnd = q;
            x = [];
            A = []
          },
          polygonEnd: function() {
            v.point = g;
            v.lineStart = l;
            v.lineEnd = m;
            x = k.merge(x);
            var a, b = t;
            a = A;
            var d = b[0],
              e = b[1],
              h = [Math.sin(d), -Math.cos(d), 0],
              n = 0,
              p = 0;
            Ga.reset();
            for (var q = 0, r = a.length; q < r; ++q) {
              var u = a[q],
                y = u.length;
              if (y)
                for (var C = u[0], w = C[0], b = C[1] / 2 + D / 4, B = Math.sin(b), E = Math.cos(b), F = 1;;) {
                  F === y && (F = 0);
                  var b = u[F],
                    I = b[0],
                    K = b[1] / 2 + D / 4,
                    P = Math.sin(K),
                    K = Math.cos(K),
                    M = I - w,
                    O = 0 <= M ? 1 : -1,
                    Sc = O * M,
                    Ob = Sc > D,
                    B = B * P;
                  Ga.add(Math.atan2(B * O * Math.sin(Sc), E * K + B * Math.cos(Sc)));
                  n += Ob ? M + O * Z : M;
                  Ob ^ w >= d ^ I >= d && (C = Ra(Ha(C), Ha(b)), Jb(C), w = Ra(h, C), Jb(w), w = (Ob ^ 0 <= M ? -1 : 1) * ua(w[2]), e > w || e === w && (C[0] || C[1])) && (p += Ob ^ 0 <= M ? 1 : -1);
                  if (!F++) break;
                  w = I;
                  B = P;
                  E = K;
                  C = b
                }
            }
            a = (-1E-6 > n || 1E-6 >
              n && 0 > Ga) ^ p & 1;
            x.length ? (z || (f.polygonStart(), z = !0), De(x, dh, a, c, f)) : a && (z || (f.polygonStart(), z = !0), f.lineStart(), c(null, null, 1, f), f.lineEnd());
            z && (f.polygonEnd(), z = !1);
            x = A = null
          },
          sphere: function() {
            f.polygonStart();
            f.lineStart();
            c(null, null, 1, f);
            f.lineEnd();
            f.polygonEnd()
          }
        },
        x, u = He(),
        y = b(u),
        z = !1,
        A, C;
      return v
    }
  }

  function ch(a) {
    return 1 < a.length
  }

  function He() {
    var a = [],
      b;
    return {
      lineStart: function() {
        a.push(b = [])
      },
      point: function(a, d) {
        b.push([a, d])
      },
      lineEnd: O,
      buffer: function() {
        var c = a;
        a = [];
        b = null;
        return c
      },
      rejoin: function() {
        1 <
          a.length && a.push(a.pop().concat(a.shift()))
      }
    }
  }

  function dh(a, b) {
    return (0 > (a = a.x)[0] ? a[1] - P - 1E-6 : P - a[1]) - (0 > (b = b.x)[0] ? b[1] - P - 1E-6 : P - b[1])
  }

  function eh(a) {
    function b(a, b) {
      return Math.cos(a) * Math.cos(b) > e
    }

    function c(a, b, c) {
      var d = Ha(a),
        f = Ha(b),
        h = [1, 0, 0],
        f = Ra(d, f),
        g = Hb(f, f),
        d = f[0],
        k = g - d * d;
      if (!k) return !c && a;
      g = e * g / k;
      k = -e * d / k;
      d = Ra(h, f);
      h = Ib(h, g);
      f = Ib(f, k);
      Qc(h, f);
      f = Hb(h, d);
      g = Hb(d, d);
      k = f * f - g * (Hb(h, h) - 1);
      if (!(0 > k)) {
        var x = Math.sqrt(k),
          k = Ib(d, (-f - x) / g);
        Qc(k, h);
        k = Kb(k);
        if (!c) return k;
        c = a[0];
        var u = b[0];
        a = a[1];
        b =
          b[1];
        var y;
        u < c && (y = c, c = u, u = y);
        var z = u - c,
          A = 1E-6 > E(z - D);
        !A && b < a && (y = a, a = b, b = y);
        if (A || 1E-6 > z ? A ? 0 < a + b ^ k[1] < (1E-6 > E(k[0] - c) ? a : b) : a <= k[1] && k[1] <= b : z > D ^ (c <= k[0] && k[0] <= u)) return b = Ib(d, (-f + x) / g), Qc(b, h), [k, Kb(b)]
      }
    }

    function d(b, c) {
      var d = f ? a : D - a,
        e = 0;
      b < -d ? e |= 1 : b > d && (e |= 2);
      c < -d ? e |= 4 : c > d && (e |= 8);
      return e
    }
    var e = Math.cos(a),
      f = 0 < e,
      g = 1E-6 < E(e),
      h = Tc(a, 6 * B);
    return Fe(b, function(a) {
      var e, h, p, q, k;
      return {
        lineStart: function() {
          q = p = !1;
          k = 1
        },
        point: function(t, v) {
          var x = [t, v],
            u, y = b(t, v),
            z = f ? y ? 0 : d(t, v) : y ? d(t + (0 > t ? D : -D), v) : 0;
          !e &&
            (q = p = y) && a.lineStart();
          y !== p && (u = c(e, x), Lb(e, u) || Lb(x, u)) && (x[0] += 1E-6, x[1] += 1E-6, y = b(x[0], x[1]));
          if (y !== p) k = 0, y ? (a.lineStart(), u = c(x, e), a.point(u[0], u[1])) : (u = c(e, x), a.point(u[0], u[1]), a.lineEnd()), e = u;
          else if (g && e && f ^ y) {
            var A;
            z & h || !(A = c(x, e, !0)) || (k = 0, f ? (a.lineStart(), a.point(A[0][0], A[0][1]), a.point(A[1][0], A[1][1]), a.lineEnd()) : (a.point(A[1][0], A[1][1]), a.lineEnd(), a.lineStart(), a.point(A[0][0], A[0][1])))
          }!y || e && Lb(e, x) || a.point(x[0], x[1]);
          e = x;
          p = y;
          h = z
        },
        lineEnd: function() {
          p && a.lineEnd();
          e = null
        },
        clean: function() {
          return k | (q && p) << 1
        }
      }
    }, h, f ? [0, -a] : [-D, a - D])
  }

  function Ie(a, b, c, d) {
    return function(e) {
      var f = e.a,
        g = e.b,
        h = f.x,
        f = f.y,
        l = 0,
        m = 1,
        n = g.x - h,
        g = g.y - f,
        p;
      p = a - h;
      if (n || !(0 < p)) {
        p /= n;
        if (0 > n) {
          if (p < l) return;
          p < m && (m = p)
        } else if (0 < n) {
          if (p > m) return;
          p > l && (l = p)
        }
        p = c - h;
        if (n || !(0 > p)) {
          p /= n;
          if (0 > n) {
            if (p > m) return;
            p > l && (l = p)
          } else if (0 < n) {
            if (p < l) return;
            p < m && (m = p)
          }
          p = b - f;
          if (g || !(0 < p)) {
            p /= g;
            if (0 > g) {
              if (p < l) return;
              p < m && (m = p)
            } else if (0 < g) {
              if (p > m) return;
              p > l && (l = p)
            }
            p = d - f;
            if (g || !(0 > p)) {
              p /= g;
              if (0 > g) {
                if (p > m) return;
                p > l && (l = p)
              } else if (0 <
                g) {
                if (p < l) return;
                p < m && (m = p)
              }
              0 < l && (e.a = {
                x: h + l * n,
                y: f + l * g
              });
              1 > m && (e.b = {
                x: h + m * n,
                y: f + m * g
              });
              return e
            }
          }
        }
      }
    }
  }

  function Je(a, b, c, d) {
    function e(d, e) {
      return 1E-6 > E(d[0] - a) ? 0 < e ? 0 : 3 : 1E-6 > E(d[0] - c) ? 0 < e ? 2 : 1 : 1E-6 > E(d[1] - b) ? 0 < e ? 1 : 0 : 0 < e ? 3 : 2
    }

    function f(a, b) {
      return g(a.x, b.x)
    }

    function g(a, b) {
      var c = e(a, 1),
        d = e(b, 1);
      return c !== d ? c - d : 0 === c ? b[1] - a[1] : 1 === c ? a[0] - b[0] : 2 === c ? a[1] - b[1] : b[0] - a[0]
    }
    return function(h) {
      function l(f, h, l, m) {
        var n = 0,
          p = 0;
        if (null == f || (n = e(f, l)) !== (p = e(h, l)) || 0 > g(f, h) ^ 0 < l) {
          do m.point(0 === n || 3 === n ? a : c, 1 < n ?
            d : b); while ((n = (n + l + 4) % 4) !== p)
        } else m.point(h[0], h[1])
      }

      function m(e, f) {
        a <= e && e <= c && b <= f && f <= d && h.point(e, f)
      }

      function n(e, f) {
        e = Math.max(-1E9, Math.min(1E9, e));
        f = Math.max(-1E9, Math.min(1E9, f));
        var g = a <= e && e <= c && b <= f && f <= d;
        v && x.push([e, f]);
        if (Q) y = e, z = f, A = g, Q = !1, g && (h.lineStart(), h.point(e, f));
        else if (g && G) h.point(e, f);
        else {
          var l = {
            a: {
              x: C,
              y: J
            },
            b: {
              x: e,
              y: f
            }
          };
          r(l) ? (G || (h.lineStart(), h.point(l.a.x, l.a.y)), h.point(l.b.x, l.b.y), g || h.lineEnd(), N = !1) : g && (h.lineStart(), h.point(e, f), N = !1)
        }
        C = e;
        J = f;
        G = g
      }
      var p = h,
        q = He(),
        r = Ie(a, b, c, d),
        t, v, x, u = {
          point: m,
          lineStart: function() {
            u.point = n;
            v && v.push(x = []);
            Q = !0;
            G = !1;
            C = J = NaN
          },
          lineEnd: function() {
            t && (n(y, z), A && G && q.rejoin(), t.push(q.buffer()));
            u.point = m;
            G && h.lineEnd()
          },
          polygonStart: function() {
            h = q;
            t = [];
            v = [];
            N = !0
          },
          polygonEnd: function() {
            h = p;
            t = k.merge(t);
            var b;
            b = [a, d];
            for (var c = 0, e = v.length, g = b[1], m = 0; m < e; ++m)
              for (var n = 1, q = v[m], u = q.length, r = q[0], y; n < u; ++n) y = q[n], r[1] <= g ? y[1] > g && 0 < Dc(r, y, b) && ++c : y[1] <= g && 0 > Dc(r, y, b) && --c, r = y;
            b = 0 !== c;
            c = N && b;
            e = t.length;
            if (c || e) h.polygonStart(), c && (h.lineStart(),
              l(null, null, 1, h), h.lineEnd()), e && De(t, f, b, l, h), h.polygonEnd();
            t = v = x = null
          }
        },
        y, z, A, C, J, G, Q, N;
      return u
    }
  }

  function Uc(a) {
    var b = 0,
      c = D / 3,
      d = Vc(a);
    a = d(b, c);
    a.parallels = function(a) {
      return arguments.length ? d(b = a[0] * D / 180, c = a[1] * D / 180) : [b / D * 180, c / D * 180]
    };
    return a
  }

  function Ke(a, b) {
    function c(a, b) {
      var c = Math.sqrt(f - 2 * e * Math.sin(b)) / e;
      return [c * Math.sin(a *= e), g - c * Math.cos(a)]
    }
    var d = Math.sin(a),
      e = (d + Math.sin(b)) / 2,
      f = 1 + d * (2 * e - d),
      g = Math.sqrt(f) / e;
    c.invert = function(a, b) {
      var c = g - b;
      return [Math.atan2(a, c) / e, ua((f - (a * a +
        c * c) * e * e) / (2 * e))]
    };
    return c
  }

  function fh() {
    function a(a, b) {
      Wc += e * a - d * b;
      d = a;
      e = b
    }
    var b, c, d, e;
    ya.point = function(f, g) {
      ya.point = a;
      b = d = f;
      c = e = g
    };
    ya.lineEnd = function() {
      a(b, c)
    }
  }

  function gh() {
    function a(a, b) {
      g.push("M", a, ",", b, f)
    }

    function b(a, b) {
      g.push("M", a, ",", b);
      h.point = c
    }

    function c(a, b) {
      g.push("L", a, ",", b)
    }

    function d() {
      h.point = a
    }

    function e() {
      g.push("Z")
    }
    var f = Le(4.5),
      g = [],
      h = {
        point: a,
        lineStart: function() {
          h.point = b
        },
        lineEnd: d,
        polygonStart: function() {
          h.lineEnd = e
        },
        polygonEnd: function() {
          h.lineEnd = d;
          h.point = a
        },
        pointRadius: function(a) {
          f = Le(a);
          return h
        },
        result: function() {
          if (g.length) {
            var a = g.join("");
            g = [];
            return a
          }
        }
      };
    return h
  }

  function Le(a) {
    return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a + "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z"
  }

  function Ka(a, b) {
    Ia += a;
    Ja += b;
    ++oa
  }

  function Me() {
    function a(a, e) {
      var f = a - b,
        g = e - c,
        f = Math.sqrt(f * f + g * g);
      va += f * (b + a) / 2;
      wa += f * (c + e) / 2;
      ia += f;
      Ka(b = a, c = e)
    }
    var b, c;
    ea.point = function(d, e) {
      ea.point = a;
      Ka(b = d, c = e)
    }
  }

  function Ne() {
    ea.point = Ka
  }

  function hh() {
    function a(a, b) {
      var c = a - d,
        l = b - e,
        c = Math.sqrt(c * c + l * l);
      va += c * (d + a) / 2;
      wa += c * (e + b) / 2;
      ia += c;
      c = e * a - d * b;
      Sa += c * (d + a);
      Ta += c * (e + b);
      xa += 3 * c;
      Ka(d = a, e = b)
    }
    var b, c, d, e;
    ea.point = function(f, g) {
      ea.point = a;
      Ka(b = d = f, c = e = g)
    };
    ea.lineEnd = function() {
      a(b, c)
    }
  }

  function ih(a) {
    function b(b, c) {
      a.moveTo(b + g, c);
      a.arc(b, c, g, 0, Z)
    }

    function c(b, c) {
      a.moveTo(b, c);
      h.point = d
    }

    function d(b, c) {
      a.lineTo(b, c)
    }

    function e() {
      h.point = b
    }

    function f() {
      a.closePath()
    }
    var g = 4.5,
      h = {
        point: b,
        lineStart: function() {
          h.point = c
        },
        lineEnd: e,
        polygonStart: function() {
          h.lineEnd = f
        },
        polygonEnd: function() {
          h.lineEnd = e;
          h.point =
            b
        },
        pointRadius: function(a) {
          g = a;
          return h
        },
        result: O
      };
    return h
  }

  function Oe(a) {
    function b(a) {
      return (h ? d : c)(a)
    }

    function c(b) {
      return Pe(b, function(c, d) {
        c = a(c, d);
        b.point(c[0], c[1])
      })
    }

    function d(b) {
      function c(d, e) {
        d = a(d, e);
        b.point(d[0], d[1])
      }

      function d() {
        G = NaN;
        L.point = f;
        b.lineStart()
      }

      function f(c, d) {
        var g = Ha([c, d]),
          m = a(c, d);
        e(G, Q, J, N, T, H, G = m[0], Q = m[1], J = c, N = g[0], T = g[1], H = g[2], h, b);
        b.point(G, Q)
      }

      function g() {
        L.point = c;
        b.lineEnd()
      }

      function k() {
        d();
        L.point = t;
        L.lineEnd = v
      }

      function t(a, b) {
        f(x = a, b);
        u = G;
        y = Q;
        z = N;
        A =
          T;
        C = H;
        L.point = f
      }

      function v() {
        e(G, Q, J, N, T, H, u, y, x, z, A, C, h, b);
        L.lineEnd = g;
        g()
      }
      var x, u, y, z, A, C, J, G, Q, N, T, H, L = {
        point: c,
        lineStart: d,
        lineEnd: g,
        polygonStart: function() {
          b.polygonStart();
          L.lineStart = k
        },
        polygonEnd: function() {
          b.polygonEnd();
          L.lineStart = d
        }
      };
      return L
    }

    function e(b, c, d, h, q, k, t, v, x, u, y, z, A, C) {
      var J = t - b,
        G = v - c,
        Q = J * J + G * G;
      if (Q > 4 * f && A--) {
        var N = h + u,
          T = q + y,
          H = k + z,
          L = Math.sqrt(N * N + T * T + H * H),
          w = Math.asin(H /= L),
          B = 1E-6 > E(E(H) - 1) || 1E-6 > E(d - x) ? (d + x) / 2 : Math.atan2(T, N),
          D = a(B, w),
          w = D[0],
          D = D[1],
          Ge = w - b,
          F = D - c,
          I = G * Ge - J * F;
        if (I * I / Q > f || .3 < E((J * Ge + G * F) / Q - .5) || h * u + q * y + k * z < g) e(b, c, d, h, q, k, w, D, B, N /= L, T /= L, H, A, C), C.point(w, D), e(w, D, B, N, T, H, t, v, x, u, y, z, A, C)
      }
    }
    var f = .5,
      g = Math.cos(30 * B),
      h = 16;
    b.precision = function(a) {
      if (!arguments.length) return Math.sqrt(f);
      h = 0 < (f = a * a) && 16;
      return b
    };
    return b
  }

  function jh(a) {
    var b = Oe(function(b, d) {
      return a([b * K, d * K])
    });
    return function(a) {
      return Qe(b(a))
    }
  }

  function Re(a) {
    this.stream = a
  }

  function Pe(a, b) {
    return {
      point: b,
      sphere: function() {
        a.sphere()
      },
      lineStart: function() {
        a.lineStart()
      },
      lineEnd: function() {
        a.lineEnd()
      },
      polygonStart: function() {
        a.polygonStart()
      },
      polygonEnd: function() {
        a.polygonEnd()
      }
    }
  }

  function za(a) {
    return Vc(function() {
      return a
    })()
  }

  function Vc(a) {
    function b(a) {
      a = h(a[0] * B, a[1] * B);
      return [a[0] * m + u, y - a[1] * m]
    }

    function c(a) {
      return (a = h.invert((a[0] - u) / m, (y - a[1]) / m)) && [a[0] * K, a[1] * K]
    }

    function d() {
      h = Ce(g = Xc(t, v, x), f);
      var a = f(q, r);
      u = n - a[0] * m;
      y = p + a[1] * m;
      return e()
    }

    function e() {
      G && (G.valid = !1, G = null);
      return b
    }
    var f, g, h, l = Oe(function(a, b) {
        a = f(a, b);
        return [a[0] * m + u, y - a[1] * m]
      }),
      m = 150,
      n = 480,
      p = 250,
      q = 0,
      r = 0,
      t = 0,
      v = 0,
      x = 0,
      u, y, z = Se,
      A = S,
      C = null,
      J = null,
      G;
    b.stream = function(a) {
      G && (G.valid = !1);
      G = Qe(z(g, l(A(a))));
      G.valid = !0;
      return G
    };
    b.clipAngle = function(a) {
      if (!arguments.length) return C;
      z = null == a ? (C = a, Se) : eh((C = +a) * B);
      return e()
    };
    b.clipExtent = function(a) {
      if (!arguments.length) return J;
      A = (J = a) ? Je(a[0][0], a[0][1], a[1][0], a[1][1]) : S;
      return e()
    };
    b.scale = function(a) {
      if (!arguments.length) return m;
      m = +a;
      return d()
    };
    b.translate = function(a) {
      if (!arguments.length) return [n, p];
      n = +a[0];
      p = +a[1];
      return d()
    };
    b.center = function(a) {
      if (!arguments.length) return [q *
        K, r * K
      ];
      q = a[0] % 360 * B;
      r = a[1] % 360 * B;
      return d()
    };
    b.rotate = function(a) {
      if (!arguments.length) return [t * K, v * K, x * K];
      t = a[0] % 360 * B;
      v = a[1] % 360 * B;
      x = 2 < a.length ? a[2] % 360 * B : 0;
      return d()
    };
    k.rebind(b, l, "precision");
    return function() {
      f = a.apply(this, arguments);
      b.invert = f.invert && c;
      return d()
    }
  }

  function Qe(a) {
    return Pe(a, function(b, c) {
      a.point(b * B, c * B)
    })
  }

  function fb(a, b) {
    return [a, b]
  }

  function Te(a, b) {
    return [a > D ? a - Z : a < -D ? a + Z : a, b]
  }

  function Xc(a, b, c) {
    return a ? b || c ? Ce(Ue(a), Ve(b, c)) : Ue(a) : b || c ? Ve(b, c) : Te
  }

  function We(a) {
    return function(b,
      c) {
      return b += a, [b > D ? b - Z : b < -D ? b + Z : b, c]
    }
  }

  function Ue(a) {
    var b = We(a);
    b.invert = We(-a);
    return b
  }

  function Ve(a, b) {
    function c(a, b) {
      var c = Math.cos(b),
        n = Math.cos(a) * c,
        c = Math.sin(a) * c,
        p = Math.sin(b),
        q = p * d + n * e;
      return [Math.atan2(c * f - q * g, n * d - p * e), ua(q * f + c * g)]
    }
    var d = Math.cos(a),
      e = Math.sin(a),
      f = Math.cos(b),
      g = Math.sin(b);
    c.invert = function(a, b) {
      var c = Math.cos(b),
        n = Math.cos(a) * c,
        c = Math.sin(a) * c,
        p = Math.sin(b),
        q = p * f - c * g;
      return [Math.atan2(c * f + p * g, n * d + q * e), ua(q * d - n * e)]
    };
    return c
  }

  function Tc(a, b) {
    var c = Math.cos(a),
      d = Math.sin(a);
    return function(e, f, g, h) {
      var l = g * b;
      if (null != e) {
        if (e = Xe(c, e), f = Xe(c, f), 0 < g ? e < f : e > f) e += g * Z
      } else e = a + g * Z, f = a - .5 * l;
      for (var m; 0 < g ? e > f : e < f; e -= l) h.point((m = Kb([c, -d * Math.cos(e), -d * Math.sin(e)]))[0], m[1])
    }
  }

  function Xe(a, b) {
    var c = Ha(b);
    c[0] -= a;
    Jb(c);
    var d = ee(-c[1]);
    return ((0 > -c[2] ? -d : d) + 2 * Math.PI - 1E-6) % (2 * Math.PI)
  }

  function Ye(a, b, c) {
    var d = k.range(a, b - 1E-6, c).concat(b);
    return function(a) {
      return d.map(function(b) {
        return [a, b]
      })
    }
  }

  function Ze(a, b, c) {
    var d = k.range(a, b - 1E-6, c).concat(b);
    return function(a) {
      return d.map(function(b) {
        return [b,
          a
        ]
      })
    }
  }

  function Yc(a) {
    return a.source
  }

  function Zc(a) {
    return a.target
  }

  function kh(a, b, c, d) {
    var e = Math.cos(b),
      f = Math.sin(b),
      g = Math.cos(d),
      h = Math.sin(d),
      l = e * Math.cos(a),
      m = e * Math.sin(a),
      n = g * Math.cos(c),
      p = g * Math.sin(c),
      q = 2 * Math.asin(Math.sqrt(ge(d - b) + e * g * ge(c - a))),
      k = 1 / Math.sin(q);
    c = q ? function(a) {
      var b = Math.sin(a *= q) * k;
      a = Math.sin(q - a) * k;
      var c = a * l + b * n,
        d = a * m + b * p;
      return [Math.atan2(d, c) * K, Math.atan2(a * f + b * h, Math.sqrt(c * c + d * d)) * K]
    } : function() {
      return [a * K, b * K]
    };
    c.distance = q;
    return c
  }

  function gb(a, b) {
    function c(b,
      c) {
      var f = Math.cos(c),
        g = a(Math.cos(b) * f);
      return [g * f * Math.sin(b), g * Math.sin(c)]
    }
    c.invert = function(a, c) {
      var f = Math.sqrt(a * a + c * c),
        g = b(f),
        h = Math.sin(g);
      return [Math.atan2(a * h, f * Math.cos(g)), Math.asin(f && c * h / f)]
    };
    return c
  }

  function $e(a, b) {
    function c(a, b) {
      0 < f ? b < -P + 1E-6 && (b = -P + 1E-6) : b > P - 1E-6 && (b = P - 1E-6);
      var c = f / Math.pow(Math.tan(D / 4 + b / 2), e);
      return [c * Math.sin(e * a), f - c * Math.cos(e * a)]
    }
    var d = Math.cos(a),
      e = a === b ? Math.sin(a) : Math.log(d / Math.cos(b)) / Math.log(Math.tan(D / 4 + b / 2) / Math.tan(D / 4 + a / 2)),
      f = d * Math.pow(Math.tan(D /
        4 + a / 2), e) / e;
    if (!e) return Pb;
    c.invert = function(a, b) {
      var c = f - b;
      return [Math.atan2(a, c) / e, 2 * Math.atan(Math.pow(f / ((0 < e ? 1 : 0 > e ? -1 : 0) * Math.sqrt(a * a + c * c)), 1 / e)) - P]
    };
    return c
  }

  function af(a, b) {
    function c(a, b) {
      var c = f - b;
      return [c * Math.sin(e * a), f - c * Math.cos(e * a)]
    }
    var d = Math.cos(a),
      e = a === b ? Math.sin(a) : (d - Math.cos(b)) / (b - a),
      f = d / e + a;
    if (1E-6 > E(e)) return fb;
    c.invert = function(a, b) {
      var c = f - b;
      return [Math.atan2(a, c) / e, f - (0 < e ? 1 : 0 > e ? -1 : 0) * Math.sqrt(a * a + c * c)]
    };
    return c
  }

  function Pb(a, b) {
    return [a, Math.log(Math.tan(D / 4 + b / 2))]
  }

  function bf(a) {
    var b = za(a),
      c = b.scale,
      d = b.translate,
      e = b.clipExtent,
      f;
    b.scale = function() {
      var a = c.apply(b, arguments);
      return a === b ? f ? b.clipExtent(null) : b : a
    };
    b.translate = function() {
      var a = d.apply(b, arguments);
      return a === b ? f ? b.clipExtent(null) : b : a
    };
    b.clipExtent = function(a) {
      var h = e.apply(b, arguments);
      if (h === b) {
        if (f = null == a) {
          var l = D * c(),
            m = d();
          e([
            [m[0] - l, m[1] - l],
            [m[0] + l, m[1] + l]
          ])
        }
      } else f && (h = null);
      return h
    };
    return b.clipExtent(null)
  }

  function $c(a, b) {
    return [Math.log(Math.tan(D / 4 + b / 2)), -a]
  }

  function Ua(a) {
    return a[0]
  }

  function hb(a) {
    return a[1]
  }

  function cf(a) {
    for (var b = a.length, c = [0, 1], d = 2, e = 2; e < b; e++) {
      for (; 1 < d && 0 >= Dc(a[c[d - 2]], a[c[d - 1]], a[e]);) --d;
      c[d++] = e
    }
    return c.slice(0, d)
  }

  function lh(a, b) {
    return a[0] - b[0] || a[1] - b[1]
  }

  function ad(a, b, c) {
    return (c[0] - b[0]) * (a[1] - b[1]) < (c[1] - b[1]) * (a[0] - b[0])
  }

  function bd(a, b, c, d) {
    var e = a[0],
      f = c[0],
      g = b[0] - e,
      h = d[0] - f;
    a = a[1];
    c = c[1];
    b = b[1] - a;
    d = d[1] - c;
    f = (h * (a - c) - d * (e - f)) / (d * g - h * b);
    return [e + f * g, a + f * b]
  }

  function df(a) {
    var b = a[0];
    a = a[a.length - 1];
    return !(b[0] - a[0] || b[1] - a[1])
  }

  function mh() {
    Qb(this);
    this.edge = this.site = this.circle = null
  }

  function ef(a) {
    var b = ff.pop() || new mh;
    b.site = a;
    return b
  }

  function cd(a) {
    Va(a);
    Wa.remove(a);
    ff.push(a);
    Qb(a)
  }

  function gf(a, b) {
    var c = a.site,
      d = c.x,
      e = c.y,
      f = e - b;
    if (!f) return d;
    var g = a.P;
    if (!g) return -Infinity;
    var c = g.site,
      g = c.x,
      c = c.y,
      h = c - b;
    if (!h) return g;
    var l = g - d,
      m = 1 / f - 1 / h,
      n = l / h;
    return m ? (-n + Math.sqrt(n * n - 2 * m * (l * l / (-2 * h) - c + h / 2 + e - f / 2))) / m + d : (d + g) / 2
  }

  function hf(a) {
    this.site = a;
    this.edges = []
  }

  function jf(a, b) {
    return b.angle - a.angle
  }

  function nh() {
    Qb(this);
    this.x = this.y = this.arc =
      this.site = this.cy = null
  }

  function Xa(a) {
    var b = a.P,
      c = a.N;
    if (b && c) {
      var d = b.site,
        b = a.site,
        e = c.site;
      if (d !== e) {
        var c = b.x,
          f = b.y,
          g = d.x - c,
          h = d.y - f,
          d = e.x - c,
          e = e.y - f,
          l = 2 * (g * e - h * d);
        if (!(-1E-12 <= l)) {
          var m = g * g + h * h,
            n = d * d + e * e,
            h = (e * m - h * n) / l,
            g = (g * n - d * m) / l,
            e = g + f,
            f = kf.pop() || new nh;
          f.arc = a;
          f.site = b;
          f.x = h + c;
          f.y = e + Math.sqrt(h * h + g * g);
          f.cy = e;
          a.circle = f;
          a = null;
          for (b = ib._; b;)
            if (f.y < b.y || f.y === b.y && f.x <= b.x)
              if (b.L) b = b.L;
              else {
                a = b.P;
                break
              }
          else if (b.R) b = b.R;
          else {
            a = b;
            break
          }
          ib.insert(a, f);
          a || (dd = f)
        }
      }
    }
  }

  function Va(a) {
    var b = a.circle;
    b && (b.P || (dd = b.N), ib.remove(b), kf.push(b), Qb(b), a.circle = null)
  }

  function oh(a, b) {
    var c = a.b;
    if (c) return !0;
    var d = a.a,
      c = b[0][0],
      e = b[1][0],
      f = b[0][1],
      g = b[1][1],
      h = a.l,
      l = a.r,
      m = h.x,
      h = h.y,
      n = l.x,
      l = l.y,
      p = (m + n) / 2,
      q;
    if (l === h) {
      if (p < c || p >= e) return;
      if (m > n) {
        if (!d) d = {
          x: p,
          y: f
        };
        else if (d.y >= g) return;
        c = {
          x: p,
          y: g
        }
      } else {
        if (!d) d = {
          x: p,
          y: g
        };
        else if (d.y < f) return;
        c = {
          x: p,
          y: f
        }
      }
    } else if (q = (m - n) / (l - h), p = (h + l) / 2 - q * p, -1 > q || 1 < q)
      if (m > n) {
        if (!d) d = {
          x: (f - p) / q,
          y: f
        };
        else if (d.y >= g) return;
        c = {
          x: (g - p) / q,
          y: g
        }
      } else {
        if (!d) d = {
          x: (g - p) / q,
          y: g
        };
        else if (d.y <
          f) return;
        c = {
          x: (f - p) / q,
          y: f
        }
      }
    else if (h < l) {
      if (!d) d = {
        x: c,
        y: q * c + p
      };
      else if (d.x >= e) return;
      c = {
        x: e,
        y: q * e + p
      }
    } else {
      if (!d) d = {
        x: e,
        y: q * e + p
      };
      else if (d.x < c) return;
      c = {
        x: c,
        y: q * c + p
      }
    }
    a.a = d;
    a.b = c;
    return !0
  }

  function lf(a, b) {
    this.l = a;
    this.r = b;
    this.a = this.b = null
  }

  function jb(a, b, c, d) {
    var e = new lf(a, b);
    Ya.push(e);
    c && Rb(e, a, b, c);
    d && Rb(e, b, a, d);
    La[a.i].edges.push(new Sb(e, a, b));
    La[b.i].edges.push(new Sb(e, b, a));
    return e
  }

  function ph(a, b, c) {
    a = new lf(a, null);
    a.a = b;
    a.b = c;
    Ya.push(a);
    return a
  }

  function Rb(a, b, c, d) {
    a.a || a.b ? a.l === c ?
      a.b = d : a.a = d : (a.a = d, a.l = b, a.r = c)
  }

  function Sb(a, b, c) {
    var d = a.a,
      e = a.b;
    this.edge = a;
    this.site = b;
    this.angle = c ? Math.atan2(c.y - b.y, c.x - b.x) : a.l === b ? Math.atan2(e.x - d.x, d.y - e.y) : Math.atan2(d.x - e.x, e.y - d.y)
  }

  function ed() {
    this._ = null
  }

  function Qb(a) {
    a.U = a.C = a.L = a.R = a.P = a.N = null
  }

  function kb(a, b) {
    var c = b.R,
      d = b.U;
    d ? d.L === b ? d.L = c : d.R = c : a._ = c;
    c.U = d;
    b.U = c;
    b.R = c.L;
    b.R && (b.R.U = b);
    c.L = b
  }

  function lb(a, b) {
    var c = b.L,
      d = b.U;
    d ? d.L === b ? d.L = c : d.R = c : a._ = c;
    c.U = d;
    b.U = c;
    b.L = c.R;
    b.L && (b.L.U = b);
    c.R = b
  }

  function mf(a) {
    for (; a.L;) a = a.L;
    return a
  }

  function fd(a, b) {
    var c = a.sort(qh).pop(),
      d, e, f;
    Ya = [];
    La = Array(a.length);
    Wa = new ed;
    for (ib = new ed;;)
      if (f = dd, c && (!f || c.y < f.y || c.y === f.y && c.x < f.x)) {
        if (c.x !== d || c.y !== e) {
          La[c.i] = new hf(c);
          d = c;
          var g = d.x,
            h = d.y;
          f = e = void 0;
          for (var l, m, n = Wa._; n;)
            if (l = gf(n, h) - g, 1E-6 < l) n = n.L;
            else {
              var p = n;
              m = h;
              var q = p.N;
              q ? m = gf(q, m) : (p = p.site, m = p.y === m ? p.x : Infinity);
              m = g - m;
              if (1E-6 < m) {
                if (!n.R) {
                  e = n;
                  break
                }
                n = n.R
              } else {
                -1E-6 < l ? (e = n.P, f = n) : -1E-6 < m ? (e = n, f = n.N) : e = f = n;
                break
              }
            }
          g = ef(d);
          Wa.insert(e, g);
          if (e || f)
            if (e === f) Va(e), f = ef(e.site),
              Wa.insert(g, f), g.edge = f.edge = jb(e.site, g.site), Xa(e), Xa(f);
            else if (f) {
            Va(e);
            Va(f);
            h = e.site;
            n = h.x;
            m = h.y;
            p = d.x - n;
            q = d.y - m;
            l = f.site;
            var k = l.x - n,
              t = l.y - m,
              v = 2 * (p * t - q * k),
              x = p * p + q * q,
              u = k * k + t * t,
              n = {
                x: (t * x - q * u) / v + n,
                y: (p * u - k * x) / v + m
              };
            Rb(f.edge, h, l, n);
            g.edge = jb(h, d, null, n);
            f.edge = jb(d, l, null, n);
            Xa(e);
            Xa(f)
          } else g.edge = jb(e.site, g.site);
          d = c.x;
          e = c.y
        }
        c = a.pop()
      } else if (f) {
      l = f.arc;
      f = l.circle;
      h = f.x;
      n = f.cy;
      f = {
        x: h,
        y: n
      };
      p = l.P;
      m = l.N;
      g = [l];
      cd(l);
      for (l = p; l.circle && 1E-6 > E(h - l.circle.x) && 1E-6 > E(n - l.circle.cy);) p = l.P, g.unshift(l),
        cd(l), l = p;
      g.unshift(l);
      Va(l);
      for (p = m; p.circle && 1E-6 > E(h - p.circle.x) && 1E-6 > E(n - p.circle.cy);) m = p.N, g.push(p), cd(p), p = m;
      g.push(p);
      Va(p);
      h = g.length;
      for (n = 1; n < h; ++n) p = g[n], l = g[n - 1], Rb(p.edge, l.site, p.site, f);
      l = g[0];
      p = g[h - 1];
      p.edge = jb(l.site, p.site, null, f);
      Xa(l);
      Xa(p)
    } else break;
    if (b) {
      c = Ya;
      d = Ie(b[0][0], b[0][1], b[1][0], b[1][1]);
      for (e = c.length; e--;)
        if (f = c[e], !oh(f, b) || !d(f) || 1E-6 > E(f.a.x - f.b.x) && 1E-6 > E(f.a.y - f.b.y)) f.a = f.b = null, c.splice(e, 1);
      c = b[0][0];
      d = b[1][0];
      e = b[0][1];
      f = b[1][1];
      n = La;
      for (m = n.length; m--;)
        if ((p =
            n[m]) && p.prepare())
          for (k = p.edges, t = k.length, q = 0; q < t;)
            if (v = k[q].end(), h = v.x, l = v.y, x = k[++q % t].start(), g = x.x, x = x.y, 1E-6 < E(h - g) || 1E-6 < E(l - x)) k.splice(q, 0, new Sb(ph(p.site, v, 1E-6 > E(h - c) && 1E-6 < f - l ? {
              x: c,
              y: 1E-6 > E(g - c) ? x : f
            } : 1E-6 > E(l - f) && 1E-6 < d - h ? {
              x: 1E-6 > E(x - f) ? g : d,
              y: f
            } : 1E-6 > E(h - d) && 1E-6 < l - e ? {
              x: d,
              y: 1E-6 > E(g - d) ? x : e
            } : 1E-6 > E(l - e) && 1E-6 < h - c ? {
              x: 1E-6 > E(x - e) ? g : c,
              y: e
            } : null), p.site, null)), ++t
    }
    c = {
      cells: La,
      edges: Ya
    };
    Wa = ib = Ya = La = null;
    return c
  }

  function qh(a, b) {
    return b.y - a.y || b.x - a.x
  }

  function rh(a) {
    return a.x
  }

  function sh(a) {
    return a.y
  }

  function nf() {
    return {
      leaf: !0,
      nodes: [],
      point: null,
      x: null,
      y: null
    }
  }

  function mb(a, b, c, d, e, f) {
    if (!a(b, c, d, e, f)) {
      var g = .5 * (c + e),
        h = .5 * (d + f);
      b = b.nodes;
      b[0] && mb(a, b[0], c, d, g, h);
      b[1] && mb(a, b[1], g, d, e, h);
      b[2] && mb(a, b[2], c, h, g, f);
      b[3] && mb(a, b[3], g, h, e, f)
    }
  }

  function th(a, b, c, d, e, f, g) {
    var h = Infinity,
      l;
    (function n(a, q, k, t, v) {
      if (!(q > f || k > g || t < d || v < e)) {
        if (x = a.point) {
          var x, u = b - a.x,
            y = c - a.y,
            u = u * u + y * y;
          u < h && (u = Math.sqrt(h = u), d = b - u, e = c - u, f = b + u, g = c + u, l = x)
        }
        x = a.nodes;
        for (var u = .5 * (q + t), y = .5 * (k + v), z = (c >= y) << 1 | b >= u, A = z + 4; z < A; ++z)
          if (a =
            x[z & 3]) switch (z & 3) {
            case 0:
              n(a, q, k, u, y);
              break;
            case 1:
              n(a, u, k, t, y);
              break;
            case 2:
              n(a, q, y, u, v);
              break;
            case 3:
              n(a, u, y, t, v)
          }
      }
    })(a, d, e, f, g);
    return l
  }

  function gd(a, b) {
    a = k.rgb(a);
    b = k.rgb(b);
    var c = a.r,
      d = a.g,
      e = a.b,
      f = b.r - c,
      g = b.g - d,
      h = b.b - e;
    return function(a) {
      return "#" + Qa(Math.round(c + f * a)) + Qa(Math.round(d + g * a)) + Qa(Math.round(e + h * a))
    }
  }

  function of (a, b) {
    var c = {},
      d = {},
      e;
    for (e in a) e in b ? c[e] = Ma(a[e], b[e]) : d[e] = a[e];
    for (e in b) e in a || (d[e] = b[e]);
    return function(a) {
      for (e in c) d[e] = c[e](a);
      return d
    }
  }

  function pa(a, b) {
    a = +a;
    b = +b;
    return function(c) {
      return a * (1 - c) + b * c
    }
  }

  function pf(a, b) {
    var c = hd.lastIndex = id.lastIndex = 0,
      d, e, f, g = -1,
      h = [],
      l = [];
    a += "";
    for (b += "";
      (d = hd.exec(a)) && (e = id.exec(b));)(f = e.index) > c && (f = b.slice(c, f), h[g] ? h[g] += f : h[++g] = f), (d = d[0]) === (e = e[0]) ? h[g] ? h[g] += e : h[++g] = e : (h[++g] = null, l.push({
      i: g,
      x: pa(d, e)
    })), c = id.lastIndex;
    c < b.length && (f = b.slice(c), h[g] ? h[g] += f : h[++g] = f);
    return 2 > h.length ? l[0] ? (b = l[0].x, function(a) {
      return b(a) + ""
    }) : function() {
      return b
    } : (b = l.length, function(a) {
      for (var c = 0, d; c < b; ++c) h[(d = l[c]).i] =
        d.x(a);
      return h.join("")
    })
  }

  function Ma(a, b) {
    for (var c = k.interpolators.length, d; 0 <= --c && !(d = k.interpolators[c](a, b)););
    return d
  }

  function Tb(a, b) {
    var c = [],
      d = [],
      e = a.length,
      f = b.length,
      g = Math.min(a.length, b.length),
      h;
    for (h = 0; h < g; ++h) c.push(Ma(a[h], b[h]));
    for (; h < e; ++h) d[h] = a[h];
    for (; h < f; ++h) d[h] = b[h];
    return function(a) {
      for (h = 0; h < g; ++h) d[h] = c[h](a);
      return d
    }
  }

  function uh(a) {
    return function(b) {
      return 0 >= b ? 0 : 1 <= b ? 1 : a(b)
    }
  }

  function qf(a) {
    return function(b) {
      return 1 - a(1 - b)
    }
  }

  function rf(a) {
    return function(b) {
      return .5 *
        (.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
    }
  }

  function vh(a) {
    return a * a
  }

  function wh(a) {
    return a * a * a
  }

  function xh(a) {
    if (0 >= a) return 0;
    if (1 <= a) return 1;
    var b = a * a,
      c = b * a;
    return 4 * (.5 > a ? c : 3 * (a - b) + c - .75)
  }

  function yh(a) {
    return 1 - Math.cos(a * P)
  }

  function zh(a) {
    return Math.pow(2, 10 * (a - 1))
  }

  function Ah(a) {
    return 1 - Math.sqrt(1 - a * a)
  }

  function Bh(a) {
    return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
  }

  function sf(a, b) {
    b -= a;
    return function(c) {
      return Math.round(a +
        b * c)
    }
  }

  function tf(a) {
    var b = [a.a, a.b],
      c = [a.c, a.d],
      d = uf(b),
      e = b[0] * c[0] + b[1] * c[1],
      f = -e;
    c[0] += f * b[0];
    c[1] += f * b[1];
    f = uf(c) || 0;
    b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1);
    this.rotate = (d ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * K;
    this.translate = [a.e, a.f];
    this.scale = [d, f];
    this.skew = f ? Math.atan2(e, f) * K : 0
  }

  function uf(a) {
    var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    b && (a[0] /= b, a[1] /= b);
    return b
  }

  function Za(a) {
    return a.length ? a.pop() + "," : ""
  }

  function Ch(a, b, c, d) {
    a[0] !== b[0] || a[1] !== b[1] ? (c = c.push("translate(",
      null, ",", null, ")"), d.push({
      i: c - 4,
      x: pa(a[0], b[0])
    }, {
      i: c - 2,
      x: pa(a[1], b[1])
    })) : (b[0] || b[1]) && c.push("translate(" + b + ")")
  }

  function Dh(a, b, c, d) {
    a !== b ? (180 < a - b ? b += 360 : 180 < b - a && (a += 360), d.push({
      i: c.push(Za(c) + "rotate(", null, ")") - 2,
      x: pa(a, b)
    })) : b && c.push(Za(c) + "rotate(" + b + ")")
  }

  function Eh(a, b, c, d) {
    a !== b ? d.push({
      i: c.push(Za(c) + "skewX(", null, ")") - 2,
      x: pa(a, b)
    }) : b && c.push(Za(c) + "skewX(" + b + ")")
  }

  function Fh(a, b, c, d) {
    a[0] !== b[0] || a[1] !== b[1] ? (c = c.push(Za(c) + "scale(", null, ",", null, ")"), d.push({
      i: c - 4,
      x: pa(a[0], b[0])
    }, {
      i: c - 2,
      x: pa(a[1], b[1])
    })) : 1 === b[0] && 1 === b[1] || c.push(Za(c) + "scale(" + b + ")")
  }

  function vf(a, b) {
    var c = [],
      d = [];
    a = k.transform(a);
    b = k.transform(b);
    Ch(a.translate, b.translate, c, d);
    Dh(a.rotate, b.rotate, c, d);
    Eh(a.skew, b.skew, c, d);
    Fh(a.scale, b.scale, c, d);
    a = b = null;
    return function(a) {
      for (var b = -1, g = d.length, h; ++b < g;) c[(h = d[b]).i] = h.x(a);
      return c.join("")
    }
  }

  function Gh(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(c) {
      return (c - a) / b
    }
  }

  function Hh(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(c) {
      return Math.max(0, Math.min(1, (c - a) /
        b))
    }
  }

  function Ih(a) {
    var b = a.source;
    a = a.target;
    var c;
    var d = a;
    if (b === d) c = b;
    else {
      c = wf(b);
      for (var d = wf(d), e = c.pop(), f = d.pop(), g = null; e === f;) g = e, e = c.pop(), f = d.pop();
      c = g
    }
    for (d = [b]; b !== c;) b = b.parent, d.push(b);
    for (b = d.length; a !== c;) d.splice(b, 0, a), a = a.parent;
    return d
  }

  function wf(a) {
    for (var b = [], c = a.parent; null != c;) b.push(a), a = c, c = c.parent;
    b.push(a);
    return b
  }

  function Jh(a) {
    a.fixed |= 2
  }

  function Kh(a) {
    a.fixed &= -7
  }

  function Lh(a) {
    a.fixed |= 4;
    a.px = a.x;
    a.py = a.y
  }

  function Mh(a) {
    a.fixed &= -5
  }

  function xf(a, b, c) {
    var d =
      0,
      e = 0;
    a.charge = 0;
    if (!a.leaf)
      for (var f = a.nodes, g = f.length, h = -1, l; ++h < g;) l = f[h], null != l && (xf(l, b, c), a.charge += l.charge, d += l.charge * l.cx, e += l.charge * l.cy);
    a.point && (a.leaf || (a.point.x += Math.random() - .5, a.point.y += Math.random() - .5), b *= c[a.point.index], a.charge += a.pointCharge = b, d += b * a.point.x, e += b * a.point.y);
    a.cx = d / a.charge;
    a.cy = e / a.charge
  }

  function nb(a, b) {
    k.rebind(a, b, "sort", "children", "value");
    a.nodes = a;
    a.links = Nh;
    return a
  }

  function ob(a, b) {
    for (var c = [a]; null != (a = c.pop());)
      if (b(a), (e = a.children) && (d =
          e.length))
        for (var d, e; 0 <= --d;) c.push(e[d])
  }

  function ja(a, b) {
    for (var c = [a], d = []; null != (a = c.pop());)
      if (d.push(a), (g = a.children) && (f = g.length))
        for (var e = -1, f, g; ++e < f;) c.push(g[e]);
    for (; null != (a = d.pop());) b(a)
  }

  function Oh(a) {
    return a.children
  }

  function Ph(a) {
    return a.value
  }

  function Qh(a, b) {
    return b.value - a.value
  }

  function Nh(a) {
    return k.merge(a.map(function(a) {
      return (a.children || []).map(function(c) {
        return {
          source: a,
          target: c
        }
      })
    }))
  }

  function Rh(a) {
    return a.x
  }

  function Sh(a) {
    return a.y
  }

  function Th(a, b, c) {
    a.y0 =
      b;
    a.y = c
  }

  function jd(a) {
    return k.range(a.length)
  }

  function kd(a) {
    var b = -1;
    a = a[0].length;
    for (var c = []; ++b < a;) c[b] = 0;
    return c
  }

  function Uh(a) {
    for (var b = 1, c = 0, d = a[0][1], e, f = a.length; b < f; ++b)(e = a[b][1]) > d && (c = b, d = e);
    return c
  }

  function Vh(a) {
    return a.reduce(Wh, 0)
  }

  function Wh(a, b) {
    return a + b[1]
  }

  function Xh(a, b) {
    return yf(a, Math.ceil(Math.log(b.length) / Math.LN2 + 1))
  }

  function yf(a, b) {
    for (var c = -1, d = +a[0], e = (a[1] - d) / b, f = []; ++c <= b;) f[c] = e * c + d;
    return f
  }

  function Yh(a) {
    return [k.min(a), k.max(a)]
  }

  function Zh(a, b) {
    return a.value -
      b.value
  }

  function ld(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b
  }

  function zf(a, b) {
    a._pack_next = b;
    b._pack_prev = a
  }

  function Af(a, b) {
    var c = b.x - a.x,
      d = b.y - a.y,
      e = a.r + b.r;
    return .999 * e * e > c * c + d * d
  }

  function Bf(a) {
    function b(a) {
      d = Math.min(a.x - a.r, d);
      e = Math.max(a.x + a.r, e);
      f = Math.min(a.y - a.r, f);
      g = Math.max(a.y + a.r, g)
    }
    if ((c = a.children) && (k = c.length)) {
      var c, d = Infinity,
        e = -Infinity,
        f = Infinity,
        g = -Infinity,
        h, l, m, n, p, q, k;
      c.forEach($h);
      h = c[0];
      h.x = -h.r;
      h.y = 0;
      b(h);
      if (1 < k && (l = c[1], l.x =
          l.r, l.y = 0, b(l), 2 < k))
        for (m = c[2], Cf(h, l, m), b(m), ld(h, m), h._pack_prev = m, ld(m, l), l = h._pack_next, n = 3; n < k; n++) {
          Cf(h, l, m = c[n]);
          var t = 0,
            v = 1,
            x = 1;
          for (p = l._pack_next; p !== l; p = p._pack_next, v++)
            if (Af(p, m)) {
              t = 1;
              break
            }
          if (1 == t)
            for (q = h._pack_prev; q !== p._pack_prev && !Af(q, m); q = q._pack_prev, x++);
          t ? (v < x || v == x && l.r < h.r ? zf(h, l = p) : zf(h = q, l), n--) : (ld(h, m), l = m, b(m))
        }
      h = (d + e) / 2;
      l = (f + g) / 2;
      for (n = p = 0; n < k; n++) m = c[n], m.x -= h, m.y -= l, p = Math.max(p, m.r + Math.sqrt(m.x * m.x + m.y * m.y));
      a.r = p;
      c.forEach(ai)
    }
  }

  function $h(a) {
    a._pack_next = a._pack_prev =
      a
  }

  function ai(a) {
    delete a._pack_next;
    delete a._pack_prev
  }

  function Df(a, b, c, d) {
    var e = a.children;
    a.x = b += d * a.x;
    a.y = c += d * a.y;
    a.r *= d;
    if (e) {
      a = -1;
      for (var f = e.length; ++a < f;) Df(e[a], b, c, d)
    }
  }

  function Cf(a, b, c) {
    var d = a.r + c.r,
      e = b.x - a.x,
      f = b.y - a.y;
    if (d && (e || f)) {
      var g = b.r + c.r,
        h = e * e + f * f,
        g = g * g,
        d = d * d;
      b = .5 + (d - g) / (2 * h);
      g = Math.sqrt(Math.max(0, 2 * g * (d + h) - (d -= h) * d - g * g)) / (2 * h);
      c.x = a.x + b * e + g * f;
      c.y = a.y + b * f - g * e
    } else c.x = a.x + d, c.y = a.y
  }

  function Ef(a, b) {
    return a.parent == b.parent ? 1 : 2
  }

  function md(a) {
    var b = a.children;
    return b.length ?
      b[0] : a.t
  }

  function nd(a) {
    var b = a.children,
      c;
    return (c = b.length) ? b[c - 1] : a.t
  }

  function bi(a) {
    return 1 + k.max(a, function(a) {
      return a.y
    })
  }

  function ci(a) {
    return a.reduce(function(a, c) {
      return a + c.x
    }, 0) / a.length
  }

  function Ff(a) {
    var b = a.children;
    return b && b.length ? Ff(b[0]) : a
  }

  function Gf(a) {
    var b = a.children,
      c;
    return b && (c = b.length) ? Gf(b[c - 1]) : a
  }

  function od(a) {
    return {
      x: a.x,
      y: a.y,
      dx: a.dx,
      dy: a.dy
    }
  }

  function Hf(a, b) {
    var c = a.x + b[3],
      d = a.y + b[0],
      e = a.dx - b[1] - b[3],
      f = a.dy - b[0] - b[2];
    0 > e && (c += e / 2, e = 0);
    0 > f && (d += f / 2, f = 0);
    return {
      x: c,
      y: d,
      dx: e,
      dy: f
    }
  }

  function $a(a) {
    var b = a[0];
    a = a[a.length - 1];
    return b < a ? [b, a] : [a, b]
  }

  function Ub(a) {
    return a.rangeExtent ? a.rangeExtent() : $a(a.range())
  }

  function di(a, b, c, d) {
    var e = c(a[0], a[1]),
      f = d(b[0], b[1]);
    return function(a) {
      return f(e(a))
    }
  }

  function Vb(a, b) {
    var c = 0,
      d = a.length - 1,
      e = a[c],
      f = a[d],
      g;
    f < e && (g = c, c = d, d = g, g = e, e = f, f = g);
    a[c] = b.floor(e);
    a[d] = b.ceil(f);
    return a
  }

  function If(a) {
    return a ? {
      floor: function(b) {
        return Math.floor(b / a) * a
      },
      ceil: function(b) {
        return Math.ceil(b / a) * a
      }
    } : ei
  }

  function fi(a, b, c, d) {
    var e = [],
      f = [],
      g = 0,
      h = Math.min(a.length, b.length) - 1;
    a[h] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse());
    for (; ++g <= h;) e.push(c(a[g - 1], a[g])), f.push(d(b[g - 1], b[g]));
    return function(b) {
      var c = k.bisect(a, b, 1, h) - 1;
      return f[c](e[c](b))
    }
  }

  function Jf(a, b, c, d) {
    function e() {
      var e = 2 < Math.min(a.length, b.length) ? fi : di,
        m = d ? Hh : Gh;
      g = e(a, b, m, c);
      h = e(b, a, m, Ma);
      return f
    }

    function f(a) {
      return g(a)
    }
    var g, h;
    f.invert = function(a) {
      return h(a)
    };
    f.domain = function(b) {
      if (!arguments.length) return a;
      a = b.map(Number);
      return e()
    };
    f.range =
      function(a) {
        if (!arguments.length) return b;
        b = a;
        return e()
      };
    f.rangeRound = function(a) {
      return f.range(a).interpolate(sf)
    };
    f.clamp = function(a) {
      if (!arguments.length) return d;
      d = a;
      return e()
    };
    f.interpolate = function(a) {
      if (!arguments.length) return c;
      c = a;
      return e()
    };
    f.ticks = function(b) {
      return k.range.apply(k, Aa(a, b))
    };
    f.tickFormat = function(b, c) {
      return pd(a, b, c)
    };
    f.nice = function(b) {
      Kf(a, b);
      return e()
    };
    f.copy = function() {
      return Jf(a, b, c, d)
    };
    return e()
  }

  function qd(a, b) {
    return k.rebind(a, b, "range", "rangeRound", "interpolate",
      "clamp")
  }

  function Kf(a, b) {
    Vb(a, If(Aa(a, b)[2]));
    Vb(a, If(Aa(a, b)[2]));
    return a
  }

  function Aa(a, b) {
    null == b && (b = 10);
    var c = $a(a),
      d = c[1] - c[0],
      e = Math.pow(10, Math.floor(Math.log(d / b) / Math.LN10)),
      d = b / d * e;
    .15 >= d ? e *= 10 : .35 >= d ? e *= 5 : .75 >= d && (e *= 2);
    c[0] = Math.ceil(c[0] / e) * e;
    c[1] = Math.floor(c[1] / e) * e + .5 * e;
    c[2] = e;
    return c
  }

  function pd(a, b, c) {
    a = Aa(a, b);
    if (c) {
      b = se.exec(c);
      b.shift();
      if ("s" === b[8]) {
        var d = k.formatPrefix(Math.max(E(a[0]), E(a[1])));
        b[7] || (b[7] = "." + Wb(d.scale(a[2])));
        b[8] = "f";
        c = k.format(b.join(""));
        return function(a) {
          return c(d.scale(a)) +
            d.symbol
        }
      }
      b[7] || (b[7] = "." + gi(b[8], a));
      c = b.join("")
    } else c = ",." + Wb(a[2]) + "f";
    return k.format(c)
  }

  function Wb(a) {
    return -Math.floor(Math.log(a) / Math.LN10 + .01)
  }

  function gi(a, b) {
    var c = Wb(b[2]);
    return a in hi ? Math.abs(c - Wb(Math.max(E(b[0]), E(b[1])))) + +("e" !== a) : c - 2 * ("%" === a)
  }

  function Lf(a, b, c, d) {
    function e(a) {
      return (c ? Math.log(0 > a ? 0 : a) : -Math.log(0 < a ? 0 : -a)) / Math.log(b)
    }

    function f(a) {
      return c ? Math.pow(b, a) : -Math.pow(b, -a)
    }

    function g(b) {
      return a(e(b))
    }
    g.invert = function(b) {
      return f(a.invert(b))
    };
    g.domain = function(b) {
      if (!arguments.length) return d;
      c = 0 <= b[0];
      a.domain((d = b.map(Number)).map(e));
      return g
    };
    g.base = function(c) {
      if (!arguments.length) return b;
      b = +c;
      a.domain(d.map(e));
      return g
    };
    g.nice = function() {
      var b = Vb(d.map(e), c ? Math : ii);
      a.domain(b);
      d = b.map(f);
      return g
    };
    g.ticks = function() {
      var a = $a(d),
        g = [],
        m = a[0],
        a = a[1],
        n = Math.floor(e(m)),
        p = Math.ceil(e(a)),
        k = b % 1 ? 2 : b;
      if (isFinite(p - n)) {
        if (c) {
          for (; n < p; n++)
            for (var r = 1; r < k; r++) g.push(f(n) * r);
          g.push(f(n))
        } else
          for (g.push(f(n)); n++ < p;)
            for (r = k - 1; 0 < r; r--) g.push(f(n) * r);
        for (n = 0; g[n] < m; n++);
        for (p = g.length; g[p -
            1] > a; p--);
        g = g.slice(n, p)
      }
      return g
    };
    g.tickFormat = function(a, c) {
      if (!arguments.length) return Mf;
      2 > arguments.length ? c = Mf : "function" !== typeof c && (c = k.format(c));
      var d = Math.max(1, b * a / g.ticks().length);
      return function(a) {
        var h = a / f(Math.round(e(a)));
        h * b < b - .5 && (h *= b);
        return h <= d ? c(a) : ""
      }
    };
    g.copy = function() {
      return Lf(a.copy(), b, c, d)
    };
    return qd(g, a)
  }

  function Nf(a, b, c) {
    function d(b) {
      return a(e(b))
    }
    var e = Xb(b),
      f = Xb(1 / b);
    d.invert = function(b) {
      return f(a.invert(b))
    };
    d.domain = function(b) {
      if (!arguments.length) return c;
      a.domain((c = b.map(Number)).map(e));
      return d
    };
    d.ticks = function(a) {
      return k.range.apply(k, Aa(c, a))
    };
    d.tickFormat = function(a, b) {
      return pd(c, a, b)
    };
    d.nice = function(a) {
      return d.domain(Kf(c, a))
    };
    d.exponent = function(g) {
      if (!arguments.length) return b;
      e = Xb(b = g);
      f = Xb(1 / b);
      a.domain(c.map(e));
      return d
    };
    d.copy = function() {
      return Nf(a.copy(), b, c)
    };
    return qd(d, a)
  }

  function Xb(a) {
    return function(b) {
      return 0 > b ? -Math.pow(-b, a) : Math.pow(b, a)
    }
  }

  function Of(a, b) {
    function c(c) {
      return f[((e.get(c) || ("range" === b.t ? e.set(c, a.push(c)) :
        NaN)) - 1) % f.length]
    }

    function d(b, c) {
      return k.range(a.length).map(function(a) {
        return b + c * a
      })
    }
    var e, f, g;
    c.domain = function(d) {
      if (!arguments.length) return a;
      a = [];
      e = new ka;
      for (var f = -1, g = d.length, n; ++f < g;) e.has(n = d[f]) || e.set(n, a.push(n));
      return c[b.t].apply(c, b.a)
    };
    c.range = function(a) {
      if (!arguments.length) return f;
      f = a;
      g = 0;
      b = {
        t: "range",
        a: arguments
      };
      return c
    };
    c.rangePoints = function(e, l) {
      2 > arguments.length && (l = 0);
      var m = e[0],
        n = e[1],
        n = 2 > a.length ? (m = (m + n) / 2, 0) : (n - m) / (a.length - 1 + l);
      f = d(m + n * l / 2, n);
      g = 0;
      b = {
        t: "rangePoints",
        a: arguments
      };
      return c
    };
    c.rangeRoundPoints = function(e, l) {
      2 > arguments.length && (l = 0);
      var m = e[0],
        n = e[1],
        p = 2 > a.length ? (m = n = Math.round((m + n) / 2), 0) : (n - m) / (a.length - 1 + l) | 0;
      f = d(m + Math.round(p * l / 2 + (n - m - (a.length - 1 + l) * p) / 2), p);
      g = 0;
      b = {
        t: "rangeRoundPoints",
        a: arguments
      };
      return c
    };
    c.rangeBands = function(e, l, m) {
      2 > arguments.length && (l = 0);
      3 > arguments.length && (m = l);
      var n = e[1] < e[0],
        p = e[n - 0],
        k = (e[1 - n] - p) / (a.length - l + 2 * m);
      f = d(p + k * m, k);
      n && f.reverse();
      g = k * (1 - l);
      b = {
        t: "rangeBands",
        a: arguments
      };
      return c
    };
    c.rangeRoundBands = function(e,
      l, m) {
      2 > arguments.length && (l = 0);
      3 > arguments.length && (m = l);
      var n = e[1] < e[0],
        p = e[n - 0],
        k = e[1 - n],
        r = Math.floor((k - p) / (a.length - l + 2 * m));
      f = d(p + Math.round((k - p - (a.length - l) * r) / 2), r);
      n && f.reverse();
      g = Math.round(r * (1 - l));
      b = {
        t: "rangeRoundBands",
        a: arguments
      };
      return c
    };
    c.rangeBand = function() {
      return g
    };
    c.rangeExtent = function() {
      return $a(b.a[0])
    };
    c.copy = function() {
      return Of(a, b)
    };
    return c.domain(a)
  }

  function Pf(a, b) {
    function c() {
      var c = 0,
        g = b.length;
      for (e = []; ++c < g;) e[c - 1] = k.quantile(a, c / g);
      return d
    }

    function d(a) {
      if (!isNaN(a = +a)) return b[k.bisect(e, a)]
    }
    var e;
    d.domain = function(b) {
      if (!arguments.length) return a;
      a = b.map(Ca).filter(yg).sort(Pa);
      return c()
    };
    d.range = function(a) {
      if (!arguments.length) return b;
      b = a;
      return c()
    };
    d.quantiles = function() {
      return e
    };
    d.invertExtent = function(c) {
      c = b.indexOf(c);
      return 0 > c ? [NaN, NaN] : [0 < c ? e[c - 1] : a[0], c < e.length ? e[c] : a[a.length - 1]]
    };
    d.copy = function() {
      return Pf(a, b)
    };
    return c()
  }

  function Qf(a, b, c) {
    function d(b) {
      return c[Math.max(0, Math.min(g, Math.floor(f * (b - a))))]
    }

    function e() {
      f = c.length / (b - a);
      g = c.length - 1;
      return d
    }
    var f, g;
    d.domain = function(c) {
      if (!arguments.length) return [a, b];
      a = +c[0];
      b = +c[c.length - 1];
      return e()
    };
    d.range = function(a) {
      if (!arguments.length) return c;
      c = a;
      return e()
    };
    d.invertExtent = function(b) {
      b = c.indexOf(b);
      b = 0 > b ? NaN : b / f + a;
      return [b, b + 1 / f]
    };
    d.copy = function() {
      return Qf(a, b, c)
    };
    return e()
  }

  function Rf(a, b) {
    function c(c) {
      if (c <= c) return b[k.bisect(a, c)]
    }
    c.domain = function(b) {
      if (!arguments.length) return a;
      a = b;
      return c
    };
    c.range = function(a) {
      if (!arguments.length) return b;
      b = a;
      return c
    };
    c.invertExtent = function(c) {
      c = b.indexOf(c);
      return [a[c - 1], a[c]]
    };
    c.copy = function() {
      return Rf(a, b)
    };
    return c
  }

  function Sf(a) {
    function b(a) {
      return +a
    }
    b.invert = b;
    b.domain = b.range = function(c) {
      if (!arguments.length) return a;
      a = c.map(b);
      return b
    };
    b.ticks = function(b) {
      return k.range.apply(k, Aa(a, b))
    };
    b.tickFormat = function(b, d) {
      return pd(a, b, d)
    };
    b.copy = function() {
      return Sf(a)
    };
    return b
  }

  function ji() {
    return 0
  }

  function ki(a) {
    return a.innerRadius
  }

  function li(a) {
    return a.outerRadius
  }

  function Tf(a) {
    return a.startAngle
  }

  function Uf(a) {
    return a.endAngle
  }

  function mi(a) {
    return a && a.padAngle
  }

  function Yb(a, b, c, d) {
    return 0 < (a - c) * b - (b - d) * a ? 0 : 1
  }

  function Zb(a, b, c, d, e) {
    var f = a[0] - b[0],
      g = a[1] - b[1];
    e = (e ? d : -d) / Math.sqrt(f * f + g * g);
    var g = e * g,
      f = -e * f,
      h = a[0] + g,
      l = a[1] + f,
      m = b[0] + g,
      n = b[1] + f;
    a = (h + m) / 2;
    b = (l + n) / 2;
    e = m - h;
    var p = n - l,
      k = e * e + p * p;
    d = c - d;
    var n = h * n - m * l,
      r = (0 > p ? -1 : 1) * Math.sqrt(Math.max(0, d * d * k - n * n)),
      h = (n * p - e * r) / k,
      l = (-n * e - p * r) / k,
      m = (n * p + e * r) / k;
    e = (-n * e + p * r) / k;
    p = h - a;
    k = l - b;
    a = m - a;
    b = e - b;
    p * p + k * k > a * a + b * b && (h = m, l = e);
    return [
      [h - g, l - f],
      [h * c / d, l * c /
        d
      ]
    ]
  }

  function Vf(a) {
    function b(b) {
      function g() {
        n.push("M", f(a(p), h))
      }
      for (var n = [], p = [], k = -1, r = b.length, t, v = I(c), x = I(d); ++k < r;) e.call(this, t = b[k], k) ? p.push([+v.call(this, t, k), +x.call(this, t, k)]) : p.length && (g(), p = []);
      p.length && g();
      return n.length ? n.join("") : null
    }
    var c = Ua,
      d = hb,
      e = eb,
      f = fa,
      g = f.key,
      h = .7;
    b.x = function(a) {
      if (!arguments.length) return c;
      c = a;
      return b
    };
    b.y = function(a) {
      if (!arguments.length) return d;
      d = a;
      return b
    };
    b.defined = function(a) {
      if (!arguments.length) return e;
      e = a;
      return b
    };
    b.interpolate = function(a) {
      if (!arguments.length) return g;
      g = "function" === typeof a ? f = a : (f = rd.get(a) || fa).key;
      return b
    };
    b.tension = function(a) {
      if (!arguments.length) return h;
      h = a;
      return b
    };
    return b
  }

  function fa(a) {
    return 1 < a.length ? a.join("L") : a + "Z"
  }

  function Wf(a) {
    return a.join("L") + "Z"
  }

  function sd(a) {
    for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("V", (d = a[b])[1], "H", d[0]);
    return e.join("")
  }

  function td(a) {
    for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("H", (d = a[b])[0], "V", d[1]);
    return e.join("")
  }

  function $b(a, b) {
    if (1 > b.length || a.length !=
      b.length && a.length != b.length + 2) return fa(a);
    var c = a.length != b.length,
      d = "",
      e = a[0],
      f = a[1],
      g = b[0],
      h = g,
      l = 1;
    c && (d += "Q" + (f[0] - 2 * g[0] / 3) + "," + (f[1] - 2 * g[1] / 3) + "," + f[0] + "," + f[1], e = a[1], l = 2);
    if (1 < b.length)
      for (h = b[1], f = a[l], l++, d += "C" + (e[0] + g[0]) + "," + (e[1] + g[1]) + "," + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1], e = 2; e < b.length; e++, l++) f = a[l], h = b[e], d += "S" + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1];
    c && (c = a[l], d += "Q" + (f[0] + 2 * h[0] / 3) + "," + (f[1] + 2 * h[1] / 3) + "," + c[0] + "," + c[1]);
    return d
  }

  function ud(a, b) {
    for (var c = [],
        d = (1 - b) / 2, e, f = a[0], g = a[1], h = 1, l = a.length; ++h < l;) e = f, f = g, g = a[h], c.push([d * (g[0] - e[0]), d * (g[1] - e[1])]);
    return c
  }

  function Xf(a) {
    if (3 > a.length) return fa(a);
    var b = 1,
      c = a.length,
      d = a[0],
      e = d[0],
      f = d[1],
      g = [e, e, e, (d = a[1])[0]],
      h = [f, f, f, d[1]],
      e = [e, ",", f, "L", aa(Ba, g), ",", aa(Ba, h)];
    for (a.push(a[c - 1]); ++b <= c;) d = a[b], g.shift(), g.push(d[0]), h.shift(), h.push(d[1]), vd(e, g, h);
    a.pop();
    e.push("L", d);
    return e.join("")
  }

  function aa(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
  }

  function vd(a, b, c) {
    a.push("C", aa(Yf, b), ",",
      aa(Yf, c), ",", aa(Zf, b), ",", aa(Zf, c), ",", aa(Ba, b), ",", aa(Ba, c))
  }

  function wd(a, b) {
    return (b[1] - a[1]) / (b[0] - a[0])
  }

  function $f(a) {
    for (var b, c = -1, d = a.length, e, f; ++c < d;) b = a[c], e = b[0], f = b[1] - P, b[0] = e * Math.cos(f), b[1] = e * Math.sin(f);
    return a
  }

  function ag(a) {
    function b(b) {
      function l() {
        t.push("M", h(a(x), k), n, m(a(v.reverse()), k), "Z")
      }
      for (var t = [], v = [], x = [], u = -1, y = b.length, z, A = I(c), C = I(e), J = c === d ? function() {
          return Q
        } : I(d), G = e === f ? function() {
          return N
        } : I(f), Q, N; ++u < y;) g.call(this, z = b[u], u) ? (v.push([Q = +A.call(this,
        z, u), N = +C.call(this, z, u)]), x.push([+J.call(this, z, u), +G.call(this, z, u)])) : v.length && (l(), v = [], x = []);
      v.length && l();
      return t.length ? t.join("") : null
    }
    var c = Ua,
      d = Ua,
      e = 0,
      f = hb,
      g = eb,
      h = fa,
      l = h.key,
      m = h,
      n = "L",
      k = .7;
    b.x = function(a) {
      if (!arguments.length) return d;
      c = d = a;
      return b
    };
    b.x0 = function(a) {
      if (!arguments.length) return c;
      c = a;
      return b
    };
    b.x1 = function(a) {
      if (!arguments.length) return d;
      d = a;
      return b
    };
    b.y = function(a) {
      if (!arguments.length) return f;
      e = f = a;
      return b
    };
    b.y0 = function(a) {
      if (!arguments.length) return e;
      e = a;
      return b
    };
    b.y1 = function(a) {
      if (!arguments.length) return f;
      f = a;
      return b
    };
    b.defined = function(a) {
      if (!arguments.length) return g;
      g = a;
      return b
    };
    b.interpolate = function(a) {
      if (!arguments.length) return l;
      l = "function" === typeof a ? h = a : (h = rd.get(a) || fa).key;
      m = h.reverse || h;
      n = h.closed ? "M" : "L";
      return b
    };
    b.tension = function(a) {
      if (!arguments.length) return k;
      k = a;
      return b
    };
    return b
  }

  function ni(a) {
    return a.radius
  }

  function bg(a) {
    return [a.x, a.y]
  }

  function oi(a) {
    return function() {
      var b = a.apply(this, arguments),
        c = b[0],
        b = b[1] - P;
      return [c *
        Math.cos(b), c * Math.sin(b)
      ]
    }
  }

  function pi() {
    return 64
  }

  function qi() {
    return "circle"
  }

  function cg(a) {
    a = Math.sqrt(a / D);
    return "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a + "Z"
  }

  function dg(a) {
    return function() {
      var b, c, d;
      (b = this[a]) && (d = b[c = b.active]) && (d.timer.c = null, d.timer.t = NaN, --b.count ? delete b[c] : delete this[a], b.active += .5, d.event && d.event.interrupt.call(this, this.__data__, d.index))
    }
  }

  function pb(a, b, c) {
    sb(a, R);
    a.namespace = b;
    a.id = c;
    return a
  }

  function xd(a, b, c, d) {
    var e = a.id,
      f = a.namespace;
    return la(a, "function" === typeof c ? function(a, h, l) {
      a[f][e].tween.set(b, d(c.call(a, a.__data__, h, l)))
    } : (c = d(c), function(a) {
      a[f][e].tween.set(b, c)
    }))
  }

  function ri(a) {
    null == a && (a = "");
    return function() {
      this.textContent = a
    }
  }

  function yd(a) {
    return null == a ? "__transition__" : "__transition_" + a + "__"
  }

  function ac(a, b, c, d, e) {
    function f(a) {
      var b = m.delay;
      k.t = b + n;
      if (b <= a) return g(a - b);
      k.c = g
    }

    function g(c) {
      var e = l.active,
        f = l[e];
      f && (f.timer.c = null, f.timer.t = NaN, --l.count, delete l[e], f.event && f.event.interrupt.call(a, a.__data__,
        f.index));
      for (var g in l) + g < d && (e = l[g], e.timer.c = null, e.timer.t = NaN, --l.count, delete l[g]);
      k.c = h;
      yb(function() {
        k.c && h(c || 1) && (k.c = null, k.t = NaN);
        return 1
      }, 0, n);
      l.active = d;
      m.event && m.event.start.call(a, a.__data__, b);
      t = [];
      m.tween.forEach(function(c, d) {
        (d = d.call(a, a.__data__, b)) && t.push(d)
      });
      r = m.ease;
      q = m.duration
    }

    function h(e) {
      e /= q;
      for (var f = r(e), g = t.length; 0 < g;) t[--g].call(a, f);
      if (1 <= e) return m.event && m.event.end.call(a, a.__data__, b), --l.count ? delete l[d] : delete a[c], 1
    }
    var l = a[c] || (a[c] = {
        active: 0,
        count: 0
      }),
      m = l[d],
      n, k, q, r, t;
    m || (n = e.time, k = yb(f, 0, n), m = l[d] = {
      tween: new ka,
      time: n,
      timer: k,
      delay: e.delay,
      duration: e.duration,
      ease: e.ease,
      index: b
    }, e = null, ++l.count)
  }

  function si(a, b, c) {
    a.attr("transform", function(a) {
      var e = b(a);
      return "translate(" + (isFinite(e) ? e : c(a)) + ",0)"
    })
  }

  function ti(a, b, c) {
    a.attr("transform", function(a) {
      var e = b(a);
      return "translate(0," + (isFinite(e) ? e : c(a)) + ")"
    })
  }

  function zd(a) {
    return a.toISOString()
  }

  function Ad(a, b, c) {
    function d(b) {
      return a(b)
    }

    function e(a, c) {
      var d = (a[1] - a[0]) / c,
        e = k.bisect(bc,
          d);
      return e == bc.length ? [b.year, Aa(a.map(function(a) {
        return a / 31536E6
      }), c)[2]] : e ? b[d / bc[e - 1] < bc[e] / d ? e - 1 : e] : [ui, Aa(a, c)[2]]
    }
    d.invert = function(b) {
      return Na(a.invert(b))
    };
    d.domain = function(b) {
      if (!arguments.length) return a.domain().map(Na);
      a.domain(b);
      return d
    };
    d.nice = function(a, b) {
      function c(d) {
        return !isNaN(d) && !a.range(d, Na(+d + 1), b).length
      }
      var l = d.domain(),
        m = $a(l);
      if (m = null == a ? e(m, 10) : "number" === typeof a && e(m, a)) a = m[0], b = m[1];
      return d.domain(Vb(l, 1 < b ? {
        floor: function(b) {
          for (; c(b = a.floor(b));) b = Na(b -
            1);
          return b
        },
        ceil: function(b) {
          for (; c(b = a.ceil(b));) b = Na(+b + 1);
          return b
        }
      } : a))
    };
    d.ticks = function(a, b) {
      var c = $a(d.domain()),
        l = null == a ? e(c, 10) : "number" === typeof a ? e(c, a) : !a.range && [{
          range: a
        }, b];
      l && (a = l[0], b = l[1]);
      return a.range(c[0], Na(+c[1] + 1), 1 > b ? 1 : b)
    };
    d.tickFormat = function() {
      return c
    };
    d.copy = function() {
      return Ad(a.copy(), b, c)
    };
    return qd(d, a)
  }

  function Na(a) {
    return new Date(a)
  }

  function vi(a) {
    return JSON.parse(a.responseText)
  }

  function wi(a) {
    var b = V.createRange();
    b.selectNode(V.body);
    return b.createContextualFragment(a.responseText)
  }
  var k = {
      version: "3.5.16"
    },
    eg = [].slice,
    ga = function(a) {
      return eg.call(a)
    },
    V = this.document;
  if (V) try {
    ga(V.documentElement.childNodes)[0].nodeType
  } catch (a) {
    ga = function(a) {
      for (var c = a.length, d = Array(c); c--;) d[c] = a[c];
      return d
    }
  }
  Date.now || (Date.now = function() {
    return +new Date
  });
  if (V) try {
    V.createElement("DIV").style.setProperty("opacity", 0, "")
  } catch (a) {
    var cc = this.Element.prototype,
      xi = cc.setAttribute,
      yi = cc.setAttributeNS,
      fg = this.CSSStyleDeclaration.prototype,
      zi = fg.setProperty;
    cc.setAttribute = function(a, c) {
      xi.call(this,
        a, c + "")
    };
    cc.setAttributeNS = function(a, c, d) {
      yi.call(this, a, c, d + "")
    };
    fg.setProperty = function(a, c, d) {
      zi.call(this, a, c + "", d)
    }
  }
  k.ascending = Pa;
  k.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
  };
  k.min = function(a, b) {
    var c = -1,
      d = a.length,
      e, f;
    if (1 === arguments.length) {
      for (; ++c < d;)
        if (null != (f = a[c]) && f >= f) {
          e = f;
          break
        }
      for (; ++c < d;) null != (f = a[c]) && e > f && (e = f)
    } else {
      for (; ++c < d;)
        if (null != (f = b.call(a, a[c], c)) && f >= f) {
          e = f;
          break
        }
      for (; ++c < d;) null != (f = b.call(a, a[c], c)) && e > f && (e = f)
    }
    return e
  };
  k.max = function(a, b) {
    var c = -1,
      d = a.length,
      e, f;
    if (1 === arguments.length) {
      for (; ++c < d;)
        if (null != (f = a[c]) && f >= f) {
          e = f;
          break
        }
      for (; ++c < d;) null != (f = a[c]) && f > e && (e = f)
    } else {
      for (; ++c < d;)
        if (null != (f = b.call(a, a[c], c)) && f >= f) {
          e = f;
          break
        }
      for (; ++c < d;) null != (f = b.call(a, a[c], c)) && f > e && (e = f)
    }
    return e
  };
  k.extent = function(a, b) {
    var c = -1,
      d = a.length,
      e, f, g;
    if (1 === arguments.length) {
      for (; ++c < d;)
        if (null != (f = a[c]) && f >= f) {
          e = g = f;
          break
        }
      for (; ++c < d;) null != (f = a[c]) && (e > f && (e = f), g < f && (g = f))
    } else {
      for (; ++c < d;)
        if (null != (f = b.call(a, a[c], c)) && f >= f) {
          e = g = f;
          break
        }
      for (; ++c <
        d;) null != (f = b.call(a, a[c], c)) && (e > f && (e = f), g < f && (g = f))
    }
    return [e, g]
  };
  k.sum = function(a, b) {
    var c = 0,
      d = a.length,
      e, f = -1;
    if (1 === arguments.length)
      for (; ++f < d;) isNaN(e = +a[f]) || (c += e);
    else
      for (; ++f < d;) isNaN(e = +b.call(a, a[f], f)) || (c += e);
    return c
  };
  k.mean = function(a, b) {
    var c = 0,
      d = a.length,
      e, f = -1,
      g = d;
    if (1 === arguments.length)
      for (; ++f < d;) isNaN(e = Ca(a[f])) ? --g : c += e;
    else
      for (; ++f < d;) isNaN(e = Ca(b.call(a, a[f], f))) ? --g : c += e;
    if (g) return c / g
  };
  k.quantile = function(a, b) {
    var c = (a.length - 1) * b + 1,
      d = Math.floor(c),
      e = +a[d - 1];
    return (c -=
      d) ? e + c * (a[d] - e) : e
  };
  k.median = function(a, b) {
    var c = [],
      d = a.length,
      e, f = -1;
    if (1 === arguments.length)
      for (; ++f < d;) isNaN(e = Ca(a[f])) || c.push(e);
    else
      for (; ++f < d;) isNaN(e = Ca(b.call(a, a[f], f))) || c.push(e);
    if (c.length) return k.quantile(c.sort(Pa), .5)
  };
  k.variance = function(a, b) {
    var c = a.length,
      d = 0,
      e, f, g = 0,
      h = -1,
      l = 0;
    if (1 === arguments.length)
      for (; ++h < c;) isNaN(e = Ca(a[h])) || (f = e - d, d += f / ++l, g += f * (e - d));
    else
      for (; ++h < c;) isNaN(e = Ca(b.call(a, a[h], h))) || (f = e - d, d += f / ++l, g += f * (e - d));
    if (1 < l) return g / (l - 1)
  };
  k.deviation = function() {
    var a =
      k.variance.apply(this, arguments);
    return a ? Math.sqrt(a) : a
  };
  var gg = Ld(Pa);
  k.bisectLeft = gg.left;
  k.bisect = k.bisectRight = gg.right;
  k.bisector = function(a) {
    return Ld(1 === a.length ? function(b, c) {
      return Pa(a(b), c)
    } : a)
  };
  k.shuffle = function(a, b, c) {
    3 > (d = arguments.length) && (c = a.length, 2 > d && (b = 0));
    for (var d = c - b, e, f; d;) f = Math.random() * d-- | 0, e = a[d + b], a[d + b] = a[f + b], a[f + b] = e;
    return a
  };
  k.permute = function(a, b) {
    for (var c = b.length, d = Array(c); c--;) d[c] = a[b[c]];
    return d
  };
  k.pairs = function(a) {
    for (var b = 0, c = a.length - 1, d = a[0],
        e = Array(0 > c ? 0 : c); b < c;) e[b] = [d, d = a[++b]];
    return e
  };
  k.transpose = function(a) {
    if (!(f = a.length)) return [];
    for (var b = -1, c = k.min(a, zg), d = Array(c); ++b < c;)
      for (var e = -1, f, g = d[b] = Array(f); ++e < f;) g[e] = a[e][b];
    return d
  };
  k.zip = function() {
    return k.transpose(arguments)
  };
  k.keys = function(a) {
    var b = [],
      c;
    for (c in a) b.push(c);
    return b
  };
  k.values = function(a) {
    var b = [],
      c;
    for (c in a) b.push(a[c]);
    return b
  };
  k.entries = function(a) {
    var b = [],
      c;
    for (c in a) b.push({
      key: c,
      value: a[c]
    });
    return b
  };
  k.merge = function(a) {
    var b = a.length,
      c;
    c = -1;
    for (var d = 0, e, f; ++c < b;) d += a[c].length;
    for (e = Array(d); 0 <= --b;)
      for (f = a[b], c = f.length; 0 <= --c;) e[--d] = f[c];
    return e
  };
  var E = Math.abs;
  k.range = function(a, b, c) {
    3 > arguments.length && (c = 1, 2 > arguments.length && (b = a, a = 0));
    if (Infinity === (b - a) / c) throw Error("infinite range");
    var d = [],
      e;
    e = E(c);
    for (var f = 1; e * f % 1;) f *= 10;
    e = f;
    var f = -1,
      g;
    a *= e;
    b *= e;
    c *= e;
    if (0 > c)
      for (;
        (g = a + c * ++f) > b;) d.push(g / e);
    else
      for (;
        (g = a + c * ++f) < b;) d.push(g / e);
    return d
  };
  k.map = function(a, b) {
    var c = new ka;
    if (a instanceof ka) a.forEach(function(a, b) {
      c.set(a,
        b)
    });
    else if (Array.isArray(a)) {
      var d = -1,
        e = a.length,
        f;
      if (1 === arguments.length)
        for (; ++d < e;) c.set(d, a[d]);
      else
        for (; ++d < e;) c.set(b.call(a, f = a[d], d), f)
    } else
      for (d in a) c.set(d, a[d]);
    return c
  };
  Md(ka, {
    has: Nd,
    get: function(a) {
      return this._[bb(a)]
    },
    set: function(a, b) {
      return this._[bb(a)] = b
    },
    remove: Od,
    keys: Pd,
    values: function() {
      var a = [],
        b;
      for (b in this._) a.push(this._[b]);
      return a
    },
    entries: function() {
      var a = [],
        b;
      for (b in this._) a.push({
        key: rb(b),
        value: this._[b]
      });
      return a
    },
    size: Qd,
    empty: Rd,
    forEach: function(a) {
      for (var b in this._) a.call(this,
        rb(b), this._[b])
    }
  });
  k.nest = function() {
    function a(b, e, m) {
      if (m >= d.length) return g ? g.call(c, e) : f ? e.sort(f) : e;
      for (var n = -1, k = e.length, q = d[m++], r, t, v = new ka, x; ++n < k;)(x = v.get(r = q(t = e[n]))) ? x.push(t) : v.set(r, [t]);
      b ? (t = b(), e = function(c, d) {
        t.set(c, a(b, d, m))
      }) : (t = {}, e = function(c, d) {
        t[c] = a(b, d, m)
      });
      v.forEach(e);
      return t
    }

    function b(a, c) {
      if (c >= d.length) return a;
      var f = [],
        g = e[c++];
      a.forEach(function(a, d) {
        f.push({
          key: a,
          values: b(d, c)
        })
      });
      return g ? f.sort(function(a, b) {
        return g(a.key, b.key)
      }) : f
    }
    var c = {},
      d = [],
      e = [],
      f, g;
    c.map = function(b, c) {
      return a(c, b, 0)
    };
    c.entries = function(c) {
      return b(a(k.map, c, 0), 0)
    };
    c.key = function(a) {
      d.push(a);
      return c
    };
    c.sortKeys = function(a) {
      e[d.length - 1] = a;
      return c
    };
    c.sortValues = function(a) {
      f = a;
      return c
    };
    c.rollup = function(a) {
      g = a;
      return c
    };
    return c
  };
  k.set = function(a) {
    var b = new sc;
    if (a)
      for (var c = 0, d = a.length; c < d; ++c) b.add(a[c]);
    return b
  };
  Md(sc, {
    has: Nd,
    add: function(a) {
      this._[bb(a += "")] = !0;
      return a
    },
    remove: Od,
    values: Pd,
    size: Qd,
    empty: Rd,
    forEach: function(a) {
      for (var b in this._) a.call(this, rb(b))
    }
  });
  k.behavior = {};
  k.rebind = function(a, b) {
    for (var c = 1, d = arguments.length, e; ++c < d;) a[e = arguments[c]] = Ag(a, b, b[e]);
    return a
  };
  var Sd = "webkit ms moz Moz o O".split(" ");
  k.dispatch = function() {
    for (var a = new uc, b = -1, c = arguments.length; ++b < c;) a[arguments[b]] = Td(a);
    return a
  };
  uc.prototype.on = function(a, b) {
    var c = a.indexOf("."),
      d = "";
    0 <= c && (d = a.slice(c + 1), a = a.slice(0, c));
    if (a) return 2 > arguments.length ? this[a].on(d) : this[a].on(d, b);
    if (2 === arguments.length) {
      if (null == b)
        for (a in this)
          if (this.hasOwnProperty(a)) this[a].on(d,
            null);
      return this
    }
  };
  k.event = null;
  k.requote = function(a) {
    return a.replace(Ai, "\\$&")
  };
  var Ai = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
    sb = {}.__proto__ ? function(a, b) {
      a.__proto__ = b
    } : function(a, b) {
      for (var c in b) a[c] = b[c]
    },
    yc = function(a, b) {
      return b.querySelector(a)
    },
    zc = function(a, b) {
      return b.querySelectorAll(a)
    },
    tb = function(a, b) {
      var c = a.matches || a[tc(a, "matchesSelector")];
      tb = function(a, b) {
        return c.call(a, b)
      };
      return tb(a, b)
    };
  "function" === typeof Sizzle && (yc = function(a, b) {
      return Sizzle(a, b)[0] || null
    }, zc = Sizzle, tb =
    Sizzle.matchesSelector);
  k.selection = function() {
    return k.select(V.documentElement)
  };
  var F = k.selection.prototype = [];
  F.select = function(a) {
    var b = [],
      c, d, e, f;
    a = xc(a);
    for (var g = -1, h = this.length; ++g < h;) {
      b.push(c = []);
      c.parentNode = (e = this[g]).parentNode;
      for (var l = -1, m = e.length; ++l < m;)(f = e[l]) ? (c.push(d = a.call(f, f.__data__, l, g)), d && "__data__" in f && (d.__data__ = f.__data__)) : c.push(null)
    }
    return ta(b)
  };
  F.selectAll = function(a) {
    var b = [],
      c, d;
    a = Ud(a);
    for (var e = -1, f = this.length; ++e < f;)
      for (var g = this[e], h = -1, l = g.length; ++h <
        l;)
        if (d = g[h]) b.push(c = ga(a.call(d, d.__data__, h, e))), c.parentNode = d;
    return ta(b)
  };
  var Bd = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  k.ns = {
    prefix: Bd,
    qualify: function(a) {
      var b = a.indexOf(":"),
        c = a;
      0 <= b && "xmlns" !== (c = a.slice(0, b)) && (a = a.slice(b + 1));
      return Bd.hasOwnProperty(c) ? {
        space: Bd[c],
        local: a
      } : a
    }
  };
  F.attr = function(a, b) {
    if (2 > arguments.length) {
      if ("string" ===
        typeof a) {
        var c = this.node();
        a = k.ns.qualify(a);
        return a.local ? c.getAttributeNS(a.space, a.local) : c.getAttribute(a)
      }
      for (b in a) this.each(Vd(b, a[b]));
      return this
    }
    return this.each(Vd(a, b))
  };
  F.classed = function(a, b) {
    if (2 > arguments.length) {
      if ("string" === typeof a) {
        var c = this.node(),
          d = (a = (a + "").trim().split(/^|\s+/)).length,
          e = -1;
        if (b = c.classList)
          for (; ++e < d;) {
            if (!b.contains(a[e])) return !1
          } else
            for (b = c.getAttribute("class"); ++e < d;)
              if (!Wd(a[e]).test(b)) return !1;
        return !0
      }
      for (b in a) this.each(Xd(b, a[b]));
      return this
    }
    return this.each(Xd(a,
      b))
  };
  F.style = function(a, b, c) {
    var d = arguments.length;
    if (3 > d) {
      if ("string" !== typeof a) {
        2 > d && (b = "");
        for (c in a) this.each(Yd(c, a[c], b));
        return this
      }
      if (2 > d) return d = this.node(), ra(d).getComputedStyle(d, null).getPropertyValue(a);
      c = ""
    }
    return this.each(Yd(a, b, c))
  };
  F.property = function(a, b) {
    if (2 > arguments.length) {
      if ("string" === typeof a) return this.node()[a];
      for (b in a) this.each(Zd(b, a[b]));
      return this
    }
    return this.each(Zd(a, b))
  };
  F.text = function(a) {
    return arguments.length ? this.each("function" === typeof a ? function() {
      var b =
        a.apply(this, arguments);
      this.textContent = null == b ? "" : b
    } : null == a ? function() {
      this.textContent = ""
    } : function() {
      this.textContent = a
    }) : this.node().textContent
  };
  F.html = function(a) {
    return arguments.length ? this.each("function" === typeof a ? function() {
      var b = a.apply(this, arguments);
      this.innerHTML = null == b ? "" : b
    } : null == a ? function() {
      this.innerHTML = ""
    } : function() {
      this.innerHTML = a
    }) : this.node().innerHTML
  };
  F.append = function(a) {
    a = $d(a);
    return this.select(function() {
      return this.appendChild(a.apply(this, arguments))
    })
  };
  F.insert =
    function(a, b) {
      a = $d(a);
      b = xc(b);
      return this.select(function() {
        return this.insertBefore(a.apply(this, arguments), b.apply(this, arguments) || null)
      })
    };
  F.remove = function() {
    return this.each(Cg)
  };
  F.data = function(a, b) {
    function c(a, c) {
      var d, e = a.length,
        f = c.length,
        g = Math.min(e, f),
        k = Array(f),
        u = Array(f),
        y = Array(e),
        z, A;
      if (b) {
        var g = new ka,
          C = Array(e),
          J;
        for (d = -1; ++d < e;)
          if (z = a[d]) g.has(J = b.call(z, z.__data__, d)) ? y[d] = z : g.set(J, z), C[d] = J;
        for (d = -1; ++d < f;)(z = g.get(J = b.call(c, A = c[d], d))) ? !0 !== z && (k[d] = z, z.__data__ = A) : u[d] = {
          __data__: A
        }, g.set(J, !0);
        for (d = -1; ++d < e;) d in C && !0 !== g.get(C[d]) && (y[d] = a[d])
      } else {
        for (d = -1; ++d < g;) z = a[d], A = c[d], z ? (z.__data__ = A, k[d] = z) : u[d] = {
          __data__: A
        };
        for (; d < f; ++d) u[d] = {
          __data__: c[d]
        };
        for (; d < e; ++d) y[d] = a[d]
      }
      u.update = k;
      u.parentNode = k.parentNode = y.parentNode = a.parentNode;
      h.push(u);
      l.push(k);
      m.push(y)
    }
    var d = -1,
      e = this.length,
      f, g;
    if (!arguments.length) {
      for (a = Array(e = (f = this[0]).length); ++d < e;)
        if (g = f[d]) a[d] = g.__data__;
      return a
    }
    var h = be([]),
      l = ta([]),
      m = ta([]);
    if ("function" === typeof a)
      for (; ++d < e;) c(f =
        this[d], a.call(f, f.parentNode.__data__, d));
    else
      for (; ++d < e;) c(f = this[d], a);
    l.enter = function() {
      return h
    };
    l.exit = function() {
      return m
    };
    return l
  };
  F.datum = function(a) {
    return arguments.length ? this.property("__data__", a) : this.property("__data__")
  };
  F.filter = function(a) {
    var b = [],
      c, d, e;
    "function" !== typeof a && (a = ae(a));
    for (var f = 0, g = this.length; f < g; f++) {
      b.push(c = []);
      c.parentNode = (d = this[f]).parentNode;
      for (var h = 0, l = d.length; h < l; h++)(e = d[h]) && a.call(e, e.__data__, h, f) && c.push(e)
    }
    return ta(b)
  };
  F.order = function() {
    for (var a = -1, b = this.length; ++a < b;)
      for (var c = this[a], d = c.length - 1, e = c[d], f; 0 <= --d;)
        if (f = c[d]) e && e !== f.nextSibling && e.parentNode.insertBefore(f, e), e = f;
    return this
  };
  F.sort = function(a) {
    a = Dg.apply(this, arguments);
    for (var b = -1, c = this.length; ++b < c;) this[b].sort(a);
    return this.order()
  };
  F.each = function(a) {
    return la(this, function(b, c, d) {
      a.call(b, b.__data__, c, d)
    })
  };
  F.call = function(a) {
    var b = ga(arguments);
    a.apply(b[0] = this, b);
    return this
  };
  F.empty = function() {
    return !this.node()
  };
  F.node = function() {
    for (var a = 0, b = this.length; a <
      b; a++)
      for (var c = this[a], d = 0, e = c.length; d < e; d++) {
        var f = c[d];
        if (f) return f
      }
    return null
  };
  F.size = function() {
    var a = 0;
    la(this, function() {
      ++a
    });
    return a
  };
  var ma = [];
  k.selection.enter = be;
  k.selection.enter.prototype = ma;
  ma.append = F.append;
  ma.empty = F.empty;
  ma.node = F.node;
  ma.call = F.call;
  ma.size = F.size;
  ma.select = function(a) {
    for (var b = [], c, d, e, f, g, h = -1, l = this.length; ++h < l;) {
      e = (f = this[h]).update;
      b.push(c = []);
      c.parentNode = f.parentNode;
      for (var m = -1, n = f.length; ++m < n;)(g = f[m]) ? (c.push(e[m] = d = a.call(f.parentNode, g.__data__,
        m, h)), d.__data__ = g.__data__) : c.push(null)
    }
    return ta(b)
  };
  ma.insert = function(a, b) {
    2 > arguments.length && (b = Eg(this));
    return F.insert.call(this, a, b)
  };
  k.select = function(a) {
    var b;
    "string" === typeof a ? (b = [yc(a, V)], b.parentNode = V.documentElement) : (b = [a], b.parentNode = a && (a.ownerDocument || a.document || a).documentElement);
    return ta([b])
  };
  k.selectAll = function(a) {
    "string" === typeof a ? (a = ga(zc(a, V)), a.parentNode = V.documentElement) : (a = ga(a), a.parentNode = null);
    return ta([a])
  };
  F.on = function(a, b, c) {
    var d = arguments.length;
    if (3 > d) {
      if ("string" !== typeof a) {
        2 > d && (b = !1);
        for (c in a) this.each(ce(c, a[c], b));
        return this
      }
      if (2 > d) return (d = this.node()["__on" + a]) && d._;
      c = !1
    }
    return this.each(ce(a, b, c))
  };
  var Ac = k.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  V && Ac.forEach(function(a) {
    "on" + a in V && Ac.remove(a)
  });
  var Da, Gg = 0;
  k.mouse = function(a) {
    return Bc(a, vc())
  };
  var Cc = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
  k.touch = function(a, b, c) {
    3 > arguments.length && (c = b, b = vc().changedTouches);
    if (b)
      for (var d = 0, e = b.length,
          f; d < e; ++d)
        if ((f = b[d]).identifier === c) return Bc(a, f)
  };
  k.behavior.drag = function() {
    function a() {
      this.on("mousedown.drag", e).on("touchstart.drag", f)
    }

    function b(a, b, e, f, n) {
      return function() {
        var p = k.event.target.correspondingElement || k.event.target,
          q = this.parentNode,
          r = c.of(this, arguments),
          t = 0,
          v = a(),
          x = ".drag" + (null == v ? "" : "-" + v),
          u, y = k.select(e(p)).on(f + x, function() {
            var a = b(q, v),
              c, d;
            a && (c = a[0] - A[0], d = a[1] - A[1], t |= c | d, A = a, r({
              type: "drag",
              x: a[0] + u[0],
              y: a[1] + u[1],
              dx: c,
              dy: d
            }))
          }).on(n + x, function() {
            b(q, v) && (y.on(f +
              x, null).on(n + x, null), z(t), r({
              type: "dragend"
            }))
          }),
          z = ub(p),
          A = b(q, v);
        d ? (u = d.apply(this, arguments), u = [u.x - A[0], u.y - A[1]]) : u = [0, 0];
        r({
          type: "dragstart"
        })
      }
    }
    var c = wc(a, "drag", "dragstart", "dragend"),
      d = null,
      e = b(O, k.mouse, ra, "mousemove", "mouseup"),
      f = b(Hg, k.touch, S, "touchmove", "touchend");
    a.origin = function(b) {
      if (!arguments.length) return d;
      d = b;
      return a
    };
    return k.rebind(a, c, "on")
  };
  k.touches = function(a, b) {
    2 > arguments.length && (b = vc().touches);
    return b ? ga(b).map(function(b) {
      var d = Bc(a, b);
      d.identifier = b.identifier;
      return d
    }) : []
  };
  var D = Math.PI,
    Z = 2 * D,
    Bi = Z - 1E-6,
    P = D / 2,
    B = D / 180,
    K = 180 / D,
    qb = Math.SQRT2;
  k.interpolateZoom = function(a, b) {
    var c = a[0],
      d = a[1],
      e = a[2],
      f = b[2],
      g = b[0] - c,
      h = b[1] - d,
      l = g * g + h * h,
      m, n;
    if (1E-12 > l) n = Math.log(f / e) / qb, m = function(a) {
      return [c + a * g, d + a * h, e * Math.exp(qb * a * n)]
    };
    else {
      var k = Math.sqrt(l);
      m = (f * f - e * e + 4 * l) / (4 * e * k);
      var f = (f * f - e * e - 4 * l) / (4 * f * k),
        q = Math.log(Math.sqrt(m * m + 1) - m);
      n = (Math.log(Math.sqrt(f * f + 1) - f) - q) / qb;
      m = function(a) {
        a *= n;
        var b = fe(q),
          f = e / (2 * k),
          m, l = qb * a + q;
        m = ((l = Math.exp(2 * l)) - 1) / (l + 1);
        var y = q,
          l = ((y =
            Math.exp(y)) - 1 / y) / 2,
          f = f * (b * m - l);
        return [c + f * g, d + f * h, e * b / fe(qb * a + q)]
      }
    }
    m.duration = 1E3 * n;
    return m
  };
  k.behavior.zoom = function() {
    function a(a) {
      a.on("mousedown.zoom", m).on(Cd + ".zoom", p).on("dblclick.zoom", q).on("touchstart.zoom", n)
    }

    function b(a) {
      return [(a[0] - r.x) / r.k, (a[1] - r.y) / r.k]
    }

    function c(a) {
      r.k = Math.max(y[0], Math.min(y[1], a))
    }

    function d(a, b) {
      b = [b[0] * r.k + r.x, b[1] * r.k + r.y];
      r.x += a[0] - b[0];
      r.y += a[1] - b[1]
    }

    function e(b, e, f, g) {
      b.__chart__ = {
        x: r.x,
        y: r.y,
        k: r.k
      };
      c(Math.pow(2, g));
      d(v = e, f);
      b = k.select(b);
      0 < z && (b =
        b.transition().duration(z));
      b.call(a.event)
    }

    function f() {
      N && N.domain(Q.range().map(function(a) {
        return (a - r.x) / r.k
      }).map(Q.invert));
      H && H.domain(w.range().map(function(a) {
        return (a - r.y) / r.k
      }).map(w.invert))
    }

    function g(a) {
      A++ || a({
        type: "zoomstart"
      })
    }

    function h(a) {
      f();
      a({
        type: "zoom",
        scale: r.k,
        translate: [r.x, r.y]
      })
    }

    function l(a) {
      --A || (a({
        type: "zoomend"
      }), v = null)
    }

    function m() {
      var a = this,
        c = G.of(a, arguments),
        e = 0,
        f = k.select(ra(a)).on("mousemove.zoom", function() {
          e = 1;
          d(k.mouse(a), m);
          h(c)
        }).on("mouseup.zoom", function() {
          f.on("mousemove.zoom",
            null).on("mouseup.zoom", null);
          n(e);
          l(c)
        }),
        m = b(k.mouse(a)),
        n = ub(a);
      dc.call(a);
      g(c)
    }

    function n() {
      function a() {
        var c = k.touches(x);
        y = r.k;
        c.forEach(function(a) {
          a.identifier in v && (v[a.identifier] = b(a))
        });
        return c
      }

      function f() {
        var b = k.event.target;
        k.select(b).on(A, p).on(C, q);
        N.push(b);
        for (var b = k.event.changedTouches, c = 0, d = b.length; c < d; ++c) v[b[c].identifier] = null;
        c = a();
        d = Date.now();
        1 === c.length ? (500 > d - J && (b = c[0], e(x, b, v[b.identifier], Math.floor(Math.log(r.k) / Math.LN2) + 1), sa()), J = d) : 1 < c.length && (b = c[0],
          d = c[1], c = b[0] - d[0], b = b[1] - d[1], t = c * c + b * b)
      }

      function p() {
        var a = k.touches(x),
          b, e, f, g;
        dc.call(x);
        for (var m = 0, l = a.length; m < l; ++m, g = null)
          if (f = a[m], g = v[f.identifier]) {
            if (e) break;
            b = f;
            e = g
          }
        if (g) {
          var n = (n = f[0] - b[0]) * n + (n = f[1] - b[1]) * n,
            a = t && Math.sqrt(n / t);
          b = [(b[0] + f[0]) / 2, (b[1] + f[1]) / 2];
          e = [(e[0] + g[0]) / 2, (e[1] + g[1]) / 2];
          c(a * y)
        }
        J = null;
        d(b, e);
        h(u)
      }

      function q() {
        if (k.event.touches.length) {
          for (var b = k.event.changedTouches, c = 0, d = b.length; c < d; ++c) delete v[b[c].identifier];
          for (var e in v) return void a()
        }
        k.selectAll(N).on(z,
          null);
        Q.on("mousedown.zoom", m).on("touchstart.zoom", n);
        H();
        l(u)
      }
      var x = this,
        u = G.of(x, arguments),
        v = {},
        t = 0,
        y, z = ".zoom-" + k.event.changedTouches[0].identifier,
        A = "touchmove" + z,
        C = "touchend" + z,
        N = [],
        Q = k.select(x),
        H = ub(x);
      f();
      g(u);
      Q.on("mousedown.zoom", null).on("touchstart.zoom", f)
    }

    function p() {
      var a = G.of(this, arguments);
      C ? clearTimeout(C) : (dc.call(this), t = b(v = x || k.mouse(this)), g(a));
      C = setTimeout(function() {
        C = null;
        l(a)
      }, 50);
      sa();
      c(Math.pow(2, .002 * ec()) * r.k);
      d(v, t);
      h(a)
    }

    function q() {
      var a = k.mouse(this),
        c = Math.log(r.k) /
        Math.LN2;
      e(this, a, b(a), k.event.shiftKey ? Math.ceil(c) - 1 : Math.floor(c) + 1)
    }
    var r = {
        x: 0,
        y: 0,
        k: 1
      },
      t, v, x, u = [960, 500],
      y = hg,
      z = 250,
      A = 0,
      C, J, G = wc(a, "zoomstart", "zoom", "zoomend"),
      Q, N, w, H;
    Cd || (Cd = "onwheel" in V ? (ec = function() {
      return -k.event.deltaY * (k.event.deltaMode ? 120 : 1)
    }, "wheel") : "onmousewheel" in V ? (ec = function() {
      return k.event.wheelDelta
    }, "mousewheel") : (ec = function() {
      return -k.event.detail
    }, "MozMousePixelScroll"));
    a.event = function(a) {
      a.each(function() {
        var a = G.of(this, arguments),
          b = r;
        Oa ? k.select(this).transition().each("start.zoom",
          function() {
            r = this.__chart__ || {
              x: 0,
              y: 0,
              k: 1
            };
            g(a)
          }).tween("zoom:zoom", function() {
          var c = u[0],
            d = u[1],
            e = v ? v[0] : c / 2,
            f = v ? v[1] : d / 2,
            g = k.interpolateZoom([(e - r.x) / r.k, (f - r.y) / r.k, c / r.k], [(e - b.x) / b.k, (f - b.y) / b.k, c / b.k]);
          return function(b) {
            b = g(b);
            var d = c / b[2];
            this.__chart__ = r = {
              x: e - b[0] * d,
              y: f - b[1] * d,
              k: d
            };
            h(a)
          }
        }).each("interrupt.zoom", function() {
          l(a)
        }).each("end.zoom", function() {
          l(a)
        }) : (this.__chart__ = r, g(a), h(a), l(a))
      })
    };
    a.translate = function(b) {
      if (!arguments.length) return [r.x, r.y];
      r = {
        x: +b[0],
        y: +b[1],
        k: r.k
      };
      f();
      return a
    };
    a.scale = function(b) {
      if (!arguments.length) return r.k;
      r = {
        x: r.x,
        y: r.y,
        k: null
      };
      c(+b);
      f();
      return a
    };
    a.scaleExtent = function(b) {
      if (!arguments.length) return y;
      y = null == b ? hg : [+b[0], +b[1]];
      return a
    };
    a.center = function(b) {
      if (!arguments.length) return x;
      x = b && [+b[0], +b[1]];
      return a
    };
    a.size = function(b) {
      if (!arguments.length) return u;
      u = b && [+b[0], +b[1]];
      return a
    };
    a.duration = function(b) {
      if (!arguments.length) return z;
      z = +b;
      return a
    };
    a.x = function(b) {
      if (!arguments.length) return N;
      N = b;
      Q = b.copy();
      r = {
        x: 0,
        y: 0,
        k: 1
      };
      return a
    };
    a.y = function(b) {
      if (!arguments.length) return H;
      H = b;
      w = b.copy();
      r = {
        x: 0,
        y: 0,
        k: 1
      };
      return a
    };
    return k.rebind(a, G, "on")
  };
  var hg = [0, Infinity],
    ec, Cd;
  k.color = Ea;
  Ea.prototype.toString = function() {
    return this.rgb() + ""
  };
  k.hsl = ha;
  var Dd = ha.prototype = new Ea;
  Dd.brighter = function(a) {
    a = Math.pow(.7, arguments.length ? a : 1);
    return new ha(this.h, this.s, this.l / a)
  };
  Dd.darker = function(a) {
    a = Math.pow(.7, arguments.length ? a : 1);
    return new ha(this.h, this.s, a * this.l)
  };
  Dd.rgb = function() {
    return Ec(this.h, this.s, this.l)
  };
  k.hcl =
    ba;
  var Ed = ba.prototype = new Ea;
  Ed.brighter = function(a) {
    return new ba(this.h, this.c, Math.min(100, this.l + fc * (arguments.length ? a : 1)))
  };
  Ed.darker = function(a) {
    return new ba(this.h, this.c, Math.max(0, this.l - fc * (arguments.length ? a : 1)))
  };
  Ed.rgb = function() {
    return Fc(this.h, this.c, this.l).rgb()
  };
  k.lab = ca;
  var fc = 18,
    me = .95047,
    ne = 1,
    oe = 1.08883,
    Fd = ca.prototype = new Ea;
  Fd.brighter = function(a) {
    return new ca(Math.min(100, this.l + fc * (arguments.length ? a : 1)), this.a, this.b)
  };
  Fd.darker = function(a) {
    return new ca(Math.max(0,
      this.l - fc * (arguments.length ? a : 1)), this.a, this.b)
  };
  Fd.rgb = function() {
    return le(this.l, this.a, this.b)
  };
  k.rgb = W;
  var gc = W.prototype = new Ea;
  gc.brighter = function(a) {
    a = Math.pow(.7, arguments.length ? a : 1);
    var b = this.r,
      c = this.g,
      d = this.b;
    if (!b && !c && !d) return new W(30, 30, 30);
    b && 30 > b && (b = 30);
    c && 30 > c && (c = 30);
    d && 30 > d && (d = 30);
    return new W(Math.min(255, b / a), Math.min(255, c / a), Math.min(255, d / a))
  };
  gc.darker = function(a) {
    a = Math.pow(.7, arguments.length ? a : 1);
    return new W(a * this.r, a * this.g, a * this.b)
  };
  gc.hsl = function() {
    return ie(this.r,
      this.g, this.b)
  };
  gc.toString = function() {
    return "#" + Qa(this.r) + Qa(this.g) + Qa(this.b)
  };
  var wb = k.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  wb.forEach(function(a, b) {
    wb.set(a, new W(b >> 16, b >> 8 & 255, b & 255))
  });
  k.functor = I;
  k.xhr = Lc(S);
  k.dsv = function(a, b) {
    function c(a, c, f) {
      3 > arguments.length && (f = c, c = null);
      var g = xb(a, b, null == c ? d : e(c), f);
      g.row = function(a) {
        return arguments.length ? g.response(null == (c =
          a) ? d : e(a)) : c
      };
      return g
    }

    function d(a) {
      return c.parse(a.responseText)
    }

    function e(a) {
      return function(b) {
        return c.parse(b.responseText, a)
      }
    }

    function f(b) {
      return b.map(g).join(a)
    }

    function g(a) {
      return h.test(a) ? '"' + a.replace(/\"/g, '""') + '"' : a
    }
    var h = new RegExp('["' + a + "\n]"),
      l = a.charCodeAt(0);
    c.parse = function(a, b) {
      var d;
      return c.parseRows(a, function(a, c) {
        if (d) return d(a, c - 1);
        var e = new Function("d", "return {" + a.map(function(a, b) {
          return JSON.stringify(a) + ": d[" + b + "]"
        }).join(",") + "}");
        d = b ? function(a, c) {
          return b(e(a),
            c)
        } : e
      })
    };
    c.parseRows = function(a, b) {
      function c() {
        if (h >= g) return e;
        if (z) return z = !1, d;
        var b = h;
        if (34 === a.charCodeAt(b)) {
          for (var f = b; f++ < g;)
            if (34 === a.charCodeAt(f)) {
              if (34 !== a.charCodeAt(f + 1)) break;
              ++f
            }
          h = f + 2;
          var n = a.charCodeAt(f + 1);
          13 === n ? (z = !0, 10 === a.charCodeAt(f + 2) && ++h) : 10 === n && (z = !0);
          return a.slice(b + 1, f).replace(/""/g, '"')
        }
        for (; h < g;) {
          n = a.charCodeAt(h++);
          f = 1;
          if (10 === n) z = !0;
          else if (13 === n) z = !0, 10 === a.charCodeAt(h) && (++h, ++f);
          else if (n !== l) continue;
          return a.slice(b, h - f)
        }
        return a.slice(b)
      }
      for (var d = {},
          e = {}, f = [], g = a.length, h = 0, k = 0, y, z;
        (y = c()) !== e;) {
        for (var A = []; y !== d && y !== e;) A.push(y), y = c();
        b && null == (A = b(A, k++)) || f.push(A)
      }
      return f
    };
    c.format = function(b) {
      if (Array.isArray(b[0])) return c.formatRows(b);
      var d = new sc,
        e = [];
      b.forEach(function(a) {
        for (var b in a) d.has(b) || e.push(d.add(b))
      });
      return [e.map(g).join(a)].concat(b.map(function(b) {
        return e.map(function(a) {
          return g(b[a])
        }).join(a)
      })).join("\n")
    };
    c.formatRows = function(a) {
      return a.map(f).join("\n")
    };
    return c
  };
  k.csv = k.dsv(",", "text/csv");
  k.tsv = k.dsv("\t",
    "text/tab-separated-values");
  var Ab, zb, Bb, Cb, pe = this[tc(this, "requestAnimationFrame")] || function(a) {
    setTimeout(a, 17)
  };
  k.timer = function() {
    yb.apply(this, arguments)
  };
  k.timer.flush = function() {
    qe();
    re()
  };
  k.round = function(a, b) {
    return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
  };
  var Ci = "y z a f p n \u00b5 m  k M G T P E Z Y".split(" ").map(function(a, b) {
    var c = Math.pow(10, 3 * E(8 - b));
    return {
      scale: 8 < b ? function(a) {
        return a / c
      } : function(a) {
        return a * c
      },
      symbol: a
    }
  });
  k.formatPrefix = function(a, b) {
    var c = 0;
    if (a = +a) 0 > a && (a *= -1), b && (a = k.round(a, Nc(a, b))), c = 1 + Math.floor(1E-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, 3 * Math.floor((c - 1) / 3)));
    return Ci[8 + c / 3]
  };
  var se = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
    Kg = k.map({
      b: function(a) {
        return a.toString(2)
      },
      c: function(a) {
        return String.fromCharCode(a)
      },
      o: function(a) {
        return a.toString(8)
      },
      x: function(a) {
        return a.toString(16)
      },
      X: function(a) {
        return a.toString(16).toUpperCase()
      },
      g: function(a, b) {
        return a.toPrecision(b)
      },
      e: function(a,
        b) {
        return a.toExponential(b)
      },
      f: function(a, b) {
        return a.toFixed(b)
      },
      r: function(a, b) {
        return (a = k.round(a, Nc(a, b))).toFixed(Math.max(0, Math.min(20, Nc(a * (1 + 1E-15), b))))
      }
    }),
    w = k.time = {},
    U = Date;
  na.prototype = {
    getDate: function() {
      return this._.getUTCDate()
    },
    getDay: function() {
      return this._.getUTCDay()
    },
    getFullYear: function() {
      return this._.getUTCFullYear()
    },
    getHours: function() {
      return this._.getUTCHours()
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds()
    },
    getMinutes: function() {
      return this._.getUTCMinutes()
    },
    getMonth: function() {
      return this._.getUTCMonth()
    },
    getSeconds: function() {
      return this._.getUTCSeconds()
    },
    getTime: function() {
      return this._.getTime()
    },
    getTimezoneOffset: function() {
      return 0
    },
    valueOf: function() {
      return this._.valueOf()
    },
    setDate: function() {
      qa.setUTCDate.apply(this._, arguments)
    },
    setDay: function() {
      qa.setUTCDay.apply(this._, arguments)
    },
    setFullYear: function() {
      qa.setUTCFullYear.apply(this._, arguments)
    },
    setHours: function() {
      qa.setUTCHours.apply(this._, arguments)
    },
    setMilliseconds: function() {
      qa.setUTCMilliseconds.apply(this._,
        arguments)
    },
    setMinutes: function() {
      qa.setUTCMinutes.apply(this._, arguments)
    },
    setMonth: function() {
      qa.setUTCMonth.apply(this._, arguments)
    },
    setSeconds: function() {
      qa.setUTCSeconds.apply(this._, arguments)
    },
    setTime: function() {
      qa.setTime.apply(this._, arguments)
    }
  };
  var qa = Date.prototype;
  w.year = Fa(function(a) {
    a = w.day(a);
    a.setMonth(0, 1);
    return a
  }, function(a, b) {
    a.setFullYear(a.getFullYear() + b)
  }, function(a) {
    return a.getFullYear()
  });
  w.years = w.year.range;
  w.years.utc = w.year.utc.range;
  w.day = Fa(function(a) {
    var b = new U(2E3,
      0);
    b.setFullYear(a.getFullYear(), a.getMonth(), a.getDate());
    return b
  }, function(a, b) {
    a.setDate(a.getDate() + b)
  }, function(a) {
    return a.getDate() - 1
  });
  w.days = w.day.range;
  w.days.utc = w.day.utc.range;
  w.dayOfYear = function(a) {
    var b = w.year(a);
    return Math.floor((a - b - 6E4 * (a.getTimezoneOffset() - b.getTimezoneOffset())) / 864E5)
  };
  "sunday monday tuesday wednesday thursday friday saturday".split(" ").forEach(function(a, b) {
    b = 7 - b;
    var c = w[a] = Fa(function(a) {
      (a = w.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7);
      return a
    }, function(a,
      b) {
      a.setDate(a.getDate() + 7 * Math.floor(b))
    }, function(a) {
      var c = w.year(a).getDay();
      return Math.floor((w.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
    });
    w[a + "s"] = c.range;
    w[a + "s"].utc = c.utc.range;
    w[a + "OfYear"] = function(a) {
      var c = w.year(a).getDay();
      return Math.floor((w.dayOfYear(a) + (c + b) % 7) / 7)
    }
  });
  w.week = w.sunday;
  w.weeks = w.sunday.range;
  w.weeks.utc = w.sunday.utc.range;
  w.weekOfYear = w.sundayOfYear;
  var te = {
      "-": "",
      _: " ",
      0: "0"
    },
    M = /^\s*\d+/,
    we = /^%/;
  k.locale = function(a) {
    return {
      numberFormat: Jg(a),
      timeFormat: Mg(a)
    }
  };
  var ig = k.locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    shortDays: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
    months: "January February March April May June July August September October November December".split(" "),
    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
  });
  k.format = ig.numberFormat;
  k.geo = {};
  Oc.prototype = {
    s: 0,
    t: 0,
    add: function(a) {
      xe(a,
        this.t, hc);
      xe(hc.s, this.s, this);
      this.s ? this.t += hc.t : this.s = hc.t
    },
    reset: function() {
      this.s = this.t = 0
    },
    valueOf: function() {
      return this.s
    }
  };
  var hc = new Oc;
  k.geo.stream = function(a, b) {
    if (a && jg.hasOwnProperty(a.type)) jg[a.type](a, b);
    else Gb(a, b)
  };
  var jg = {
      Feature: function(a, b) {
        Gb(a.geometry, b)
      },
      FeatureCollection: function(a, b) {
        for (var c = a.features, d = -1, e = c.length; ++d < e;) Gb(c[d].geometry, b)
      }
    },
    ye = {
      Sphere: function(a, b) {
        b.sphere()
      },
      Point: function(a, b) {
        a = a.coordinates;
        b.point(a[0], a[1], a[2])
      },
      MultiPoint: function(a,
        b) {
        for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) a = c[d], b.point(a[0], a[1], a[2])
      },
      LineString: function(a, b) {
        Pc(a.coordinates, b, 0)
      },
      MultiLineString: function(a, b) {
        for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) Pc(c[d], b, 0)
      },
      Polygon: function(a, b) {
        ze(a.coordinates, b)
      },
      MultiPolygon: function(a, b) {
        for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) ze(c[d], b)
      },
      GeometryCollection: function(a, b) {
        for (var c = a.geometries, d = -1, e = c.length; ++d < e;) Gb(c[d], b)
      }
    };
  k.geo.area = function(a) {
    ic = 0;
    k.geo.stream(a, Y);
    return ic
  };
  var ic,
    Ga = new Oc,
    Y = {
      sphere: function() {
        ic += 4 * D
      },
      point: O,
      lineStart: O,
      lineEnd: O,
      polygonStart: function() {
        Ga.reset();
        Y.lineStart = ah
      },
      polygonEnd: function() {
        var a = 2 * Ga;
        ic += 0 > a ? 4 * D + a : a;
        Y.lineStart = Y.lineEnd = Y.point = O
      }
    };
  k.geo.bounds = function() {
    function a(a, b) {
      z.push(A = [n = a, q = a]);
      b < p && (p = b);
      b > r && (r = b)
    }

    function b(b, c) {
      var d = Ha([b * B, c * B]);
      if (u) {
        var e = Ra(u, d),
          e = Ra([e[1], -e[0], 0], e);
        Jb(e);
        var e = Kb(e),
          f = b - t,
          g = 0 < f ? 1 : -1,
          l = e[0] * K * g,
          f = 180 < E(f);
        f ^ (g * t < l && l < g * b) ? (e = e[1] * K, e > r && (r = e)) : (l = (l + 360) % 360 - 180, f ^ (g * t < l && l < g * b)) ? (e = -e[1] * K, e < p && (p = e)) : (c < p && (p = c), c > r && (r = c));
        f ? b < t ? h(n, b) > h(n, q) && (q = b) : h(b, q) > h(n, q) && (n = b) : q >= n ? (b < n && (n = b), b > q && (q = b)) : b > t ? h(n, b) > h(n, q) && (q = b) : h(b, q) > h(n, q) && (n = b)
      } else a(b, c);
      u = d;
      t = b
    }

    function c() {
      C.point = b
    }

    function d() {
      A[0] = n;
      A[1] = q;
      C.point = a;
      u = null
    }

    function e(a, c) {
      if (u) {
        var d = a - t;
        y += 180 < E(d) ? d + (0 < d ? 360 : -360) : d
      } else v = a, x = c;
      Y.point(a, c);
      b(a, c)
    }

    function f() {
      Y.lineStart()
    }

    function g() {
      e(v, x);
      Y.lineEnd();
      1E-6 < E(y) && (n = -(q = 180));
      A[0] = n;
      A[1] = q;
      u = null
    }

    function h(a, b) {
      return 0 > (b -= a) ? b + 360 : b
    }

    function l(a,
      b) {
      return a[0] - b[0]
    }

    function m(a, b) {
      return b[0] <= b[1] ? b[0] <= a && a <= b[1] : a < b[0] || b[1] < a
    }
    var n, p, q, r, t, v, x, u, y, z, A, C = {
      point: a,
      lineStart: c,
      lineEnd: d,
      polygonStart: function() {
        C.point = e;
        C.lineStart = f;
        C.lineEnd = g;
        y = 0;
        Y.polygonStart()
      },
      polygonEnd: function() {
        Y.polygonEnd();
        C.point = a;
        C.lineStart = c;
        C.lineEnd = d;
        0 > Ga ? (n = -(q = 180), p = -(r = 90)) : 1E-6 < y ? r = 90 : -1E-6 > y && (p = -90);
        A[0] = n;
        A[1] = q
      }
    };
    return function(a) {
      r = q = -(n = p = Infinity);
      z = [];
      k.geo.stream(a, C);
      if (a = z.length) {
        z.sort(l);
        for (var b = 1, c = z[0], d, e = [c]; b < a; ++b) d = z[b],
          m(d[0], c) || m(d[1], c) ? (h(c[0], d[1]) > h(c[0], c[1]) && (c[1] = d[1]), h(d[0], c[1]) > h(c[0], c[1]) && (c[0] = d[0])) : e.push(c = d);
        var f = -Infinity,
          g;
        a = e.length - 1;
        b = 0;
        for (c = e[a]; b <= a; c = d, ++b) d = e[b], (g = h(c[1], d[0])) > f && (f = g, n = d[0], q = c[1])
      }
      z = A = null;
      return Infinity === n || Infinity === p ? [
        [NaN, NaN],
        [NaN, NaN]
      ] : [
        [n, p],
        [q, r]
      ]
    }
  }();
  k.geo.centroid = function(a) {
    db = Mb = Ia = Ja = oa = va = wa = ia = Sa = Ta = xa = 0;
    k.geo.stream(a, da);
    a = Sa;
    var b = Ta,
      c = xa,
      d = a * a + b * b + c * c;
    return 1E-12 > d && (a = va, b = wa, c = ia, 1E-6 > Mb && (a = Ia, b = Ja, c = oa), d = a * a + b * b + c * c, 1E-12 > d) ? [NaN,
      NaN
    ] : [Math.atan2(b, a) * K, ua(c / Math.sqrt(d)) * K]
  };
  var db, Mb, Ia, Ja, oa, va, wa, ia, Sa, Ta, xa, da = {
      sphere: O,
      point: Rc,
      lineStart: Ae,
      lineEnd: Be,
      polygonStart: function() {
        da.lineStart = bh
      },
      polygonEnd: function() {
        da.lineStart = Ae
      }
    },
    Se = Fe(eb, function(a) {
      var b = NaN,
        c = NaN,
        d = NaN,
        e;
      return {
        lineStart: function() {
          a.lineStart();
          e = 1
        },
        point: function(f, g) {
          var h = 0 < f ? D : -D,
            l = E(f - b);
          if (1E-6 > E(l - D)) a.point(b, c = 0 < (c + g) / 2 ? P : -P), a.point(d, c), a.lineEnd(), a.lineStart(), a.point(h, c), a.point(f, c), e = 0;
          else if (d !== h && l >= D) {
            1E-6 > E(b - d) && (b -= 1E-6 *
              d);
            1E-6 > E(f - h) && (f -= 1E-6 * h);
            var l = b,
              m = c,
              n = f,
              k, q, r = Math.sin(l - n);
            c = 1E-6 < E(r) ? Math.atan((Math.sin(m) * (q = Math.cos(g)) * Math.sin(n) - Math.sin(g) * (k = Math.cos(m)) * Math.sin(l)) / (k * q * r)) : (m + g) / 2;
            a.point(d, c);
            a.lineEnd();
            a.lineStart();
            a.point(h, c);
            e = 0
          }
          a.point(b = f, c = g);
          d = h
        },
        lineEnd: function() {
          a.lineEnd();
          b = c = NaN
        },
        clean: function() {
          return 2 - e
        }
      }
    }, function(a, b, c, d) {
      null == a ? (c *= P, d.point(-D, c), d.point(0, c), d.point(D, c), d.point(D, 0), d.point(D, -c), d.point(0, -c), d.point(-D, -c), d.point(-D, 0), d.point(-D, c)) : 1E-6 < E(a[0] -
        b[0]) ? (a = a[0] < b[0] ? D : -D, c = c * a / 2, d.point(-a, c), d.point(0, c), d.point(a, c)) : d.point(b[0], b[1])
    }, [-D, -D / 2]);
  k.geo.clipExtent = function() {
    var a, b, c, d, e, f, g = {
      stream: function(a) {
        e && (e.valid = !1);
        e = f(a);
        e.valid = !0;
        return e
      },
      extent: function(h) {
        if (!arguments.length) return [
          [a, b],
          [c, d]
        ];
        f = Je(a = +h[0][0], b = +h[0][1], c = +h[1][0], d = +h[1][1]);
        e && (e.valid = !1, e = null);
        return g
      }
    };
    return g.extent([
      [0, 0],
      [960, 500]
    ])
  };
  (k.geo.conicEqualArea = function() {
    return Uc(Ke)
  }).raw = Ke;
  k.geo.albers = function() {
    return k.geo.conicEqualArea().rotate([96,
      0
    ]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
  };
  k.geo.albersUsa = function() {
    function a(a) {
      var b = a[0];
      a = a[1];
      e = null;
      (g(b, a), e) || (h(b, a), e) || l(b, a);
      return e
    }
    var b = k.geo.albers(),
      c = k.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
      d = k.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
      e, f = {
        point: function(a, b) {
          e = [a, b]
        }
      },
      g, h, l;
    a.invert = function(a) {
      var e = b.scale(),
        f = b.translate(),
        g = (a[0] - f[0]) / e,
        e = (a[1] - f[1]) / e;
      return (.12 <= e && .234 > e && -.425 <= g && -.214 >
        g ? c : .166 <= e && .234 > e && -.214 <= g && -.115 > g ? d : b).invert(a)
    };
    a.stream = function(a) {
      var e = b.stream(a),
        f = c.stream(a),
        g = d.stream(a);
      return {
        point: function(a, b) {
          e.point(a, b);
          f.point(a, b);
          g.point(a, b)
        },
        sphere: function() {
          e.sphere();
          f.sphere();
          g.sphere()
        },
        lineStart: function() {
          e.lineStart();
          f.lineStart();
          g.lineStart()
        },
        lineEnd: function() {
          e.lineEnd();
          f.lineEnd();
          g.lineEnd()
        },
        polygonStart: function() {
          e.polygonStart();
          f.polygonStart();
          g.polygonStart()
        },
        polygonEnd: function() {
          e.polygonEnd();
          f.polygonEnd();
          g.polygonEnd()
        }
      }
    };
    a.precision = function(e) {
      if (!arguments.length) return b.precision();
      b.precision(e);
      c.precision(e);
      d.precision(e);
      return a
    };
    a.scale = function(e) {
      if (!arguments.length) return b.scale();
      b.scale(e);
      c.scale(.35 * e);
      d.scale(e);
      return a.translate(b.translate())
    };
    a.translate = function(e) {
      if (!arguments.length) return b.translate();
      var k = b.scale(),
        p = +e[0],
        q = +e[1];
      g = b.translate(e).clipExtent([
        [p - .455 * k, q - .238 * k],
        [p + .455 * k, q + .238 * k]
      ]).stream(f).point;
      h = c.translate([p - .307 * k, q + .201 * k]).clipExtent([
        [p - .425 * k + 1E-6, q + .12 *
          k + 1E-6
        ],
        [p - .214 * k - 1E-6, q + .234 * k - 1E-6]
      ]).stream(f).point;
      l = d.translate([p - .205 * k, q + .212 * k]).clipExtent([
        [p - .214 * k + 1E-6, q + .166 * k + 1E-6],
        [p - .115 * k - 1E-6, q + .234 * k - 1E-6]
      ]).stream(f).point;
      return a
    };
    return a.scale(1070)
  };
  var Gd, Wc, ya = {
      point: O,
      lineStart: O,
      lineEnd: O,
      polygonStart: function() {
        Wc = 0;
        ya.lineStart = fh
      },
      polygonEnd: function() {
        ya.lineStart = ya.lineEnd = ya.point = O;
        Gd += E(Wc / 2)
      }
    },
    jc, kc, lc, mc, Di = {
      point: function(a, b) {
        a < jc && (jc = a);
        a > lc && (lc = a);
        b < kc && (kc = b);
        b > mc && (mc = b)
      },
      lineStart: O,
      lineEnd: O,
      polygonStart: O,
      polygonEnd: O
    },
    ea = {
      point: Ka,
      lineStart: Me,
      lineEnd: Ne,
      polygonStart: function() {
        ea.lineStart = hh
      },
      polygonEnd: function() {
        ea.point = Ka;
        ea.lineStart = Me;
        ea.lineEnd = Ne
      }
    };
  k.geo.path = function() {
    function a(a) {
      a && ("function" === typeof c && g.pointRadius(+c.apply(this, arguments)), h && h.valid || (h = f(g)), k.geo.stream(a, h));
      return g.result()
    }

    function b() {
      h = null;
      return a
    }
    var c = 4.5,
      d, e, f, g, h;
    a.area = function(a) {
      Gd = 0;
      k.geo.stream(a, f(ya));
      return Gd
    };
    a.centroid = function(a) {
      Ia = Ja = oa = va = wa = ia = Sa = Ta = xa = 0;
      k.geo.stream(a, f(ea));
      return xa ? [Sa / xa,
        Ta / xa
      ] : ia ? [va / ia, wa / ia] : oa ? [Ia / oa, Ja / oa] : [NaN, NaN]
    };
    a.bounds = function(a) {
      lc = mc = -(jc = kc = Infinity);
      k.geo.stream(a, f(Di));
      return [
        [jc, kc],
        [lc, mc]
      ]
    };
    a.projection = function(a) {
      if (!arguments.length) return d;
      f = (d = a) ? a.stream || jh(a) : S;
      return b()
    };
    a.context = function(a) {
      if (!arguments.length) return e;
      g = null == (e = a) ? new gh : new ih(a);
      "function" !== typeof c && g.pointRadius(c);
      return b()
    };
    a.pointRadius = function(b) {
      if (!arguments.length) return c;
      c = "function" === typeof b ? b : (g.pointRadius(+b), +b);
      return a
    };
    return a.projection(k.geo.albersUsa()).context(null)
  };
  k.geo.transform = function(a) {
    return {
      stream: function(b) {
        b = new Re(b);
        for (var c in a) b[c] = a[c];
        return b
      }
    }
  };
  Re.prototype = {
    point: function(a, b) {
      this.stream.point(a, b)
    },
    sphere: function() {
      this.stream.sphere()
    },
    lineStart: function() {
      this.stream.lineStart()
    },
    lineEnd: function() {
      this.stream.lineEnd()
    },
    polygonStart: function() {
      this.stream.polygonStart()
    },
    polygonEnd: function() {
      this.stream.polygonEnd()
    }
  };
  k.geo.projection = za;
  k.geo.projectionMutator = Vc;
  (k.geo.equirectangular = function() {
    return za(fb)
  }).raw = fb.invert =
    fb;
  k.geo.rotation = function(a) {
    function b(b) {
      b = a(b[0] * B, b[1] * B);
      return b[0] *= K, b[1] *= K, b
    }
    a = Xc(a[0] % 360 * B, a[1] * B, 2 < a.length ? a[2] * B : 0);
    b.invert = function(b) {
      b = a.invert(b[0] * B, b[1] * B);
      return b[0] *= K, b[1] *= K, b
    };
    return b
  };
  Te.invert = fb;
  k.geo.circle = function() {
    function a() {
      var a = "function" === typeof b ? b.apply(this, arguments) : b,
        c = Xc(-a[0] * B, -a[1] * B, 0).invert,
        d = [];
      e(null, null, 1, {
        point: function(a, b) {
          d.push(a = c(a, b));
          a[0] *= K;
          a[1] *= K
        }
      });
      return {
        type: "Polygon",
        coordinates: [d]
      }
    }
    var b = [0, 0],
      c, d = 6,
      e;
    a.origin = function(c) {
      if (!arguments.length) return b;
      b = c;
      return a
    };
    a.angle = function(b) {
      if (!arguments.length) return c;
      e = Tc((c = +b) * B, d * B);
      return a
    };
    a.precision = function(b) {
      if (!arguments.length) return d;
      e = Tc(c * B, (d = +b) * B);
      return a
    };
    return a.angle(90)
  };
  k.geo.distance = function(a, b) {
    var c = (b[0] - a[0]) * B,
      d = a[1] * B,
      e = b[1] * B,
      f = Math.cos(c),
      g = Math.sin(d),
      d = Math.cos(d),
      h = Math.sin(e),
      e = Math.cos(e),
      l;
    return Math.atan2(Math.sqrt((l = e * Math.sin(c)) * l + (l = d * h - g * e * f) * l), g * h + d * e * f)
  };
  k.geo.graticule = function() {
    function a() {
      return {
        type: "MultiLineString",
        coordinates: b()
      }
    }

    function b() {
      return k.range(Math.ceil(f /
        q) * q, e, q).map(x).concat(k.range(Math.ceil(m / r) * r, l, r).map(u)).concat(k.range(Math.ceil(d / n) * n, c, n).filter(function(a) {
        return 1E-6 < E(a % q)
      }).map(t)).concat(k.range(Math.ceil(h / p) * p, g, p).filter(function(a) {
        return 1E-6 < E(a % r)
      }).map(v))
    }
    var c, d, e, f, g, h, l, m, n = 10,
      p = n,
      q = 90,
      r = 360,
      t, v, x, u, y = 2.5;
    a.lines = function() {
      return b().map(function(a) {
        return {
          type: "LineString",
          coordinates: a
        }
      })
    };
    a.outline = function() {
      return {
        type: "Polygon",
        coordinates: [x(f).concat(u(l).slice(1), x(e).reverse().slice(1), u(m).reverse().slice(1))]
      }
    };
    a.extent = function(b) {
      return arguments.length ? a.majorExtent(b).minorExtent(b) : a.minorExtent()
    };
    a.majorExtent = function(b) {
      if (!arguments.length) return [
        [f, m],
        [e, l]
      ];
      f = +b[0][0];
      e = +b[1][0];
      m = +b[0][1];
      l = +b[1][1];
      f > e && (b = f, f = e, e = b);
      m > l && (b = m, m = l, l = b);
      return a.precision(y)
    };
    a.minorExtent = function(b) {
      if (!arguments.length) return [
        [d, h],
        [c, g]
      ];
      d = +b[0][0];
      c = +b[1][0];
      h = +b[0][1];
      g = +b[1][1];
      d > c && (b = d, d = c, c = b);
      h > g && (b = h, h = g, g = b);
      return a.precision(y)
    };
    a.step = function(b) {
      return arguments.length ? a.majorStep(b).minorStep(b) :
        a.minorStep()
    };
    a.majorStep = function(b) {
      if (!arguments.length) return [q, r];
      q = +b[0];
      r = +b[1];
      return a
    };
    a.minorStep = function(b) {
      if (!arguments.length) return [n, p];
      n = +b[0];
      p = +b[1];
      return a
    };
    a.precision = function(b) {
      if (!arguments.length) return y;
      y = +b;
      t = Ye(h, g, 90);
      v = Ze(d, c, y);
      x = Ye(m, l, 90);
      u = Ze(f, e, y);
      return a
    };
    return a.majorExtent([
      [-180, -89.999999],
      [180, 89.999999]
    ]).minorExtent([
      [-180, -80.000001],
      [180, 80.000001]
    ])
  };
  k.geo.greatArc = function() {
    function a() {
      return {
        type: "LineString",
        coordinates: [c || b.apply(this,
          arguments), e || d.apply(this, arguments)]
      }
    }
    var b = Yc,
      c, d = Zc,
      e;
    a.distance = function() {
      return k.geo.distance(c || b.apply(this, arguments), e || d.apply(this, arguments))
    };
    a.source = function(d) {
      if (!arguments.length) return b;
      b = d;
      c = "function" === typeof d ? null : d;
      return a
    };
    a.target = function(b) {
      if (!arguments.length) return d;
      d = b;
      e = "function" === typeof b ? null : b;
      return a
    };
    a.precision = function() {
      return arguments.length ? a : 0
    };
    return a
  };
  k.geo.interpolate = function(a, b) {
    return kh(a[0] * B, a[1] * B, b[0] * B, b[1] * B)
  };
  k.geo.length = function(a) {
    Hd =
      0;
    k.geo.stream(a, ab);
    return Hd
  };
  var Hd, ab = {
      sphere: O,
      point: O,
      lineStart: function() {
        function a(a, f) {
          var g = Math.sin(f *= B),
            h = Math.cos(f),
            l = E((a *= B) - b),
            m = Math.cos(l);
          Hd += Math.atan2(Math.sqrt((l = h * Math.sin(l)) * l + (l = d * g - c * h * m) * l), c * g + d * h * m);
          b = a;
          c = g;
          d = h
        }
        var b, c, d;
        ab.point = function(e, f) {
          b = e * B;
          c = Math.sin(f *= B);
          d = Math.cos(f);
          ab.point = a
        };
        ab.lineEnd = function() {
          ab.point = ab.lineEnd = O
        }
      },
      lineEnd: O,
      polygonStart: O,
      polygonEnd: O
    },
    kg = gb(function(a) {
      return Math.sqrt(2 / (1 + a))
    }, function(a) {
      return 2 * Math.asin(a / 2)
    });
  (k.geo.azimuthalEqualArea =
    function() {
      return za(kg)
    }).raw = kg;
  var lg = gb(function(a) {
    return (a = Math.acos(a)) && a / Math.sin(a)
  }, S);
  (k.geo.azimuthalEquidistant = function() {
    return za(lg)
  }).raw = lg;
  (k.geo.conicConformal = function() {
    return Uc($e)
  }).raw = $e;
  (k.geo.conicEquidistant = function() {
    return Uc(af)
  }).raw = af;
  var mg = gb(function(a) {
    return 1 / a
  }, Math.atan);
  (k.geo.gnomonic = function() {
    return za(mg)
  }).raw = mg;
  Pb.invert = function(a, b) {
    return [a, 2 * Math.atan(Math.exp(b)) - P]
  };
  (k.geo.mercator = function() {
    return bf(Pb)
  }).raw = Pb;
  var ng = gb(function() {
      return 1
    },
    Math.asin);
  (k.geo.orthographic = function() {
    return za(ng)
  }).raw = ng;
  var og = gb(function(a) {
    return 1 / (1 + a)
  }, function(a) {
    return 2 * Math.atan(a)
  });
  (k.geo.stereographic = function() {
    return za(og)
  }).raw = og;
  $c.invert = function(a, b) {
    return [-b, 2 * Math.atan(Math.exp(a)) - P]
  };
  (k.geo.transverseMercator = function() {
    var a = bf($c),
      b = a.center,
      c = a.rotate;
    a.center = function(a) {
      return a ? b([-a[1], a[0]]) : (a = b(), [a[1], -a[0]])
    };
    a.rotate = function(a) {
      return a ? c([a[0], a[1], 2 < a.length ? a[2] + 90 : 90]) : (a = c(), [a[0], a[1], a[2] - 90])
    };
    return c([0,
      0, 90
    ])
  }).raw = $c;
  k.geom = {};
  k.geom.hull = function(a) {
    function b(a) {
      if (3 > a.length) return [];
      var b = I(c),
        g = I(d),
        h, l = a.length,
        m = [],
        k = [];
      for (h = 0; h < l; h++) m.push([+b.call(this, a[h], h), +g.call(this, a[h], h), h]);
      m.sort(lh);
      for (h = 0; h < l; h++) k.push([m[h][0], -m[h][1]]);
      var b = cf(m),
        k = cf(k),
        g = k[0] === b[0],
        l = k[k.length - 1] === b[b.length - 1],
        p = [];
      for (h = b.length - 1; 0 <= h; --h) p.push(a[m[b[h]][2]]);
      for (h = +g; h < k.length - l; ++h) p.push(a[m[k[h]][2]]);
      return p
    }
    var c = Ua,
      d = hb;
    if (arguments.length) return b(a);
    b.x = function(a) {
      return arguments.length ?
        (c = a, b) : c
    };
    b.y = function(a) {
      return arguments.length ? (d = a, b) : d
    };
    return b
  };
  k.geom.polygon = function(a) {
    sb(a, nc);
    return a
  };
  var nc = k.geom.polygon.prototype = [];
  nc.area = function() {
    for (var a = -1, b = this.length, c, d = this[b - 1], e = 0; ++a < b;) c = d, d = this[a], e += c[1] * d[0] - c[0] * d[1];
    return .5 * e
  };
  nc.centroid = function(a) {
    var b = -1,
      c = this.length,
      d = 0,
      e = 0,
      f, g = this[c - 1],
      h;
    for (arguments.length || (a = -1 / (6 * this.area())); ++b < c;) f = g, g = this[b], h = f[0] * g[1] - g[0] * f[1], d += (f[0] + g[0]) * h, e += (f[1] + g[1]) * h;
    return [d * a, e * a]
  };
  nc.clip = function(a) {
    for (var b,
        c = df(a), d = -1, e = this.length - df(this), f, g, h = this[e - 1], l, m, k; ++d < e;) {
      b = a.slice();
      a.length = 0;
      l = this[d];
      m = b[(g = b.length - c) - 1];
      for (f = -1; ++f < g;) k = b[f], ad(k, h, l) ? (ad(m, h, l) || a.push(bd(m, k, h, l)), a.push(k)) : ad(m, h, l) && a.push(bd(m, k, h, l)), m = k;
      c && a.push(a[0]);
      h = l
    }
    return a
  };
  var Ya, La, Wa, ff = [],
    dd, ib, kf = [];
  hf.prototype.prepare = function() {
    for (var a = this.edges, b = a.length, c; b--;) c = a[b].edge, c.b && c.a || a.splice(b, 1);
    a.sort(jf);
    return a.length
  };
  Sb.prototype = {
    start: function() {
      return this.edge.l === this.site ? this.edge.a :
        this.edge.b
    },
    end: function() {
      return this.edge.l === this.site ? this.edge.b : this.edge.a
    }
  };
  ed.prototype = {
    insert: function(a, b) {
      var c, d, e;
      if (a) {
        b.P = a;
        if (b.N = a.N) a.N.P = b;
        a.N = b;
        if (a.R) {
          for (a = a.R; a.L;) a = a.L;
          a.L = b
        } else a.R = b;
        c = a
      } else this._ ? (a = mf(this._), b.P = null, b.N = a, a.P = a.L = b, c = a) : (b.P = b.N = null, this._ = b, c = null);
      b.L = b.R = null;
      b.U = c;
      b.C = !0;
      for (a = b; c && c.C;) d = c.U, c === d.L ? (e = d.R) && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.R && (kb(this, c), a = c, c = a.U), c.C = !1, d.C = !0, lb(this, d)) : (e = d.L) && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.L &&
        (lb(this, c), a = c, c = a.U), c.C = !1, d.C = !0, kb(this, d)), c = a.U;
      this._.C = !1
    },
    remove: function(a) {
      a.N && (a.N.P = a.P);
      a.P && (a.P.N = a.N);
      a.N = a.P = null;
      var b = a.U,
        c = a.L,
        d = a.R,
        e, f;
      e = c ? d ? mf(d) : c : d;
      b ? b.L === a ? b.L = e : b.R = e : this._ = e;
      c && d ? (f = e.C, e.C = a.C, e.L = c, c.U = e, e !== d ? (b = e.U, e.U = a.U, a = e.R, b.L = a, e.R = d, d.U = e) : (e.U = b, b = e, a = e.R)) : (f = a.C, a = e);
      a && (a.U = b);
      if (!f)
        if (a && a.C) a.C = !1;
        else {
          do {
            if (a === this._) break;
            if (a === b.L) {
              if (a = b.R, a.C && (a.C = !1, b.C = !0, kb(this, b), a = b.R), a.L && a.L.C || a.R && a.R.C) {
                a.R && a.R.C || (a.L.C = !1, a.C = !0, lb(this, a),
                  a = b.R);
                a.C = b.C;
                b.C = a.R.C = !1;
                kb(this, b);
                a = this._;
                break
              }
            } else if (a = b.L, a.C && (a.C = !1, b.C = !0, lb(this, b), a = b.L), a.L && a.L.C || a.R && a.R.C) {
              a.L && a.L.C || (a.R.C = !1, a.C = !0, kb(this, a), a = b.L);
              a.C = b.C;
              b.C = a.L.C = !1;
              lb(this, b);
              a = this._;
              break
            }
            a.C = !0;
            a = b;
            b = b.U
          } while (!a.C);
          a && (a.C = !1)
        }
    }
  };
  k.geom.voronoi = function(a) {
    function b(a) {
      var b = Array(a.length),
        d = h[0][0],
        e = h[0][1],
        f = h[1][0],
        g = h[1][1];
      fd(c(a), h).cells.forEach(function(c, h) {
        var k = c.edges,
          u = c.site;
        (b[h] = k.length ? k.map(function(a) {
            a = a.start();
            return [a.x, a.y]
          }) : u.x >=
          d && u.x <= f && u.y >= e && u.y <= g ? [
            [d, g],
            [f, g],
            [f, e],
            [d, e]
          ] : []).point = a[h]
      });
      return b
    }

    function c(a) {
      return a.map(function(a, b) {
        return {
          x: 1E-6 * Math.round(f(a, b) / 1E-6),
          y: 1E-6 * Math.round(g(a, b) / 1E-6),
          i: b
        }
      })
    }
    var d = Ua,
      e = hb,
      f = d,
      g = e,
      h = oc;
    if (a) return b(a);
    b.links = function(a) {
      return fd(c(a)).edges.filter(function(a) {
        return a.l && a.r
      }).map(function(b) {
        return {
          source: a[b.l.i],
          target: a[b.r.i]
        }
      })
    };
    b.triangles = function(a) {
      var b = [];
      fd(c(a)).cells.forEach(function(c, d) {
        for (var e = c.site, f = c.edges.sort(jf), g = -1, h = f.length, k,
            u = f[h - 1].edge, u = u.l === e ? u.r : u.l; ++g < h;) k = u, u = f[g].edge, u = u.l === e ? u.r : u.l, d < k.i && d < u.i && 0 > (e.x - u.x) * (k.y - e.y) - (e.x - k.x) * (u.y - e.y) && b.push([a[d], a[k.i], a[u.i]])
      });
      return b
    };
    b.x = function(a) {
      return arguments.length ? (f = I(d = a), b) : d
    };
    b.y = function(a) {
      return arguments.length ? (g = I(e = a), b) : e
    };
    b.clipExtent = function(a) {
      if (!arguments.length) return h === oc ? null : h;
      h = null == a ? oc : a;
      return b
    };
    b.size = function(a) {
      return arguments.length ? b.clipExtent(a && [
        [0, 0], a
      ]) : h === oc ? null : h && h[1]
    };
    return b
  };
  var oc = [
    [-1E6, -1E6],
    [1E6,
      1E6
    ]
  ];
  k.geom.delaunay = function(a) {
    return k.geom.voronoi().triangles(a)
  };
  k.geom.quadtree = function(a, b, c, d, e) {
    function f(a) {
      function f(a, b, c, d, e, g, h, l) {
        if (!isNaN(c) && !isNaN(d))
          if (a.leaf) {
            var m = a.x,
              n = a.y;
            if (null != m) {
              if (!(.01 > E(m - c) + E(n - d))) {
                var q = a.point;
                a.x = a.y = a.point = null;
                k(a, q, m, n, e, g, h, l)
              }
              k(a, b, c, d, e, g, h, l)
            } else a.x = c, a.y = d, a.point = b
          } else k(a, b, c, d, e, g, h, l)
      }

      function k(a, b, c, d, e, g, h, l) {
        var m = .5 * (e + h),
          p = .5 * (g + l),
          q = c >= m,
          u = d >= p,
          v = u << 1 | q;
        a.leaf = !1;
        a = a.nodes[v] || (a.nodes[v] = nf());
        q ? e = m : h = m;
        u ? g = p : l = p;
        f(a, b, c, d, e, g, h, l)
      }
      var q, r = I(g),
        t = I(h),
        v, x, u, y, z, A, C, J;
      if (null != b) z = b, A = c, C = d, J = e;
      else if (C = J = -(z = A = Infinity), v = [], x = [], y = a.length, l)
        for (u = 0; u < y; ++u) q = a[u], q.x < z && (z = q.x), q.y < A && (A = q.y), q.x > C && (C = q.x), q.y > J && (J = q.y), v.push(q.x), x.push(q.y);
      else
        for (u = 0; u < y; ++u) {
          var G = +r(q = a[u], u);
          q = +t(q, u);
          G < z && (z = G);
          q < A && (A = q);
          G > C && (C = G);
          q > J && (J = q);
          v.push(G);
          x.push(q)
        }
      G = C - z;
      q = J - A;
      G > q ? J = A + G : C = z + q;
      var w = nf();
      w.add = function(a) {
        f(w, a, +r(a, ++u), +t(a, u), z, A, C, J)
      };
      w.visit = function(a) {
        mb(a, w, z, A, C, J)
      };
      w.find = function(a) {
        return th(w,
          a[0], a[1], z, A, C, J)
      };
      u = -1;
      if (null == b) {
        for (; ++u < y;) f(w, a[u], v[u], x[u], z, A, C, J);
        --u
      } else a.forEach(w.add);
      v = x = a = q = null;
      return w
    }
    var g = Ua,
      h = hb,
      l;
    if (l = arguments.length) return g = rh, h = sh, 3 === l && (e = c, d = b, c = b = 0), f(a);
    f.x = function(a) {
      return arguments.length ? (g = a, f) : g
    };
    f.y = function(a) {
      return arguments.length ? (h = a, f) : h
    };
    f.extent = function(a) {
      if (!arguments.length) return null == b ? null : [
        [b, c],
        [d, e]
      ];
      null == a ? b = c = d = e = null : (b = +a[0][0], c = +a[0][1], d = +a[1][0], e = +a[1][1]);
      return f
    };
    f.size = function(a) {
      if (!arguments.length) return null ==
        b ? null : [d - b, e - c];
      null == a ? b = c = d = e = null : (b = c = 0, d = +a[0], e = +a[1]);
      return f
    };
    return f
  };
  k.interpolateRgb = gd;
  k.interpolateObject = of ;
  k.interpolateNumber = pa;
  k.interpolateString = pf;
  var hd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    id = new RegExp(hd.source, "g");
  k.interpolate = Ma;
  k.interpolators = [function(a, b) {
    var c = typeof b;
    return ("string" === c ? wb.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? gd : pf : b instanceof Ea ? gd : Array.isArray(b) ? Tb : "object" === c && isNaN(b) ? of : pa)(a, b)
  }];
  k.interpolateArray = Tb;
  var pg = function() {
      return S
    },
    Ei = k.map({
      linear: pg,
      poly: function(a) {
        return function(b) {
          return Math.pow(b, a)
        }
      },
      quad: function() {
        return vh
      },
      cubic: function() {
        return wh
      },
      sin: function() {
        return yh
      },
      exp: function() {
        return zh
      },
      circle: function() {
        return Ah
      },
      elastic: function(a, b) {
        var c;
        2 > arguments.length && (b = .45);
        arguments.length ? c = b / Z * Math.asin(1 / a) : (a = 1, c = b / 4);
        return function(d) {
          return 1 + a * Math.pow(2, -10 * d) * Math.sin((d - c) * Z / b)
        }
      },
      back: function(a) {
        a || (a = 1.70158);
        return function(b) {
          return b * b * ((a + 1) * b - a)
        }
      },
      bounce: function() {
        return Bh
      }
    }),
    Fi =
    k.map({
      "in": S,
      out: qf,
      "in-out": rf,
      "out-in": function(a) {
        return rf(qf(a))
      }
    });
  k.ease = function(a) {
    var b = a.indexOf("-"),
      c = 0 <= b ? a.slice(0, b) : a,
      b = 0 <= b ? a.slice(b + 1) : "in",
      c = Ei.get(c) || pg,
      b = Fi.get(b) || S;
    return uh(b(c.apply(null, eg.call(arguments, 1))))
  };
  k.interpolateHcl = function(a, b) {
    a = k.hcl(a);
    b = k.hcl(b);
    var c = a.h,
      d = a.c,
      e = a.l,
      f = b.h - c,
      g = b.c - d,
      h = b.l - e;
    isNaN(g) && (g = 0, d = isNaN(d) ? b.c : d);
    isNaN(f) ? (f = 0, c = isNaN(c) ? b.h : c) : 180 < f ? f -= 360 : -180 > f && (f += 360);
    return function(a) {
      return Fc(c + f * a, d + g * a, e + h * a) + ""
    }
  };
  k.interpolateHsl =
    function(a, b) {
      a = k.hsl(a);
      b = k.hsl(b);
      var c = a.h,
        d = a.s,
        e = a.l,
        f = b.h - c,
        g = b.s - d,
        h = b.l - e;
      isNaN(g) && (g = 0, d = isNaN(d) ? b.s : d);
      isNaN(f) ? (f = 0, c = isNaN(c) ? b.h : c) : 180 < f ? f -= 360 : -180 > f && (f += 360);
      return function(a) {
        return Ec(c + f * a, d + g * a, e + h * a) + ""
      }
    };
  k.interpolateLab = function(a, b) {
    a = k.lab(a);
    b = k.lab(b);
    var c = a.l,
      d = a.a,
      e = a.b,
      f = b.l - c,
      g = b.a - d,
      h = b.b - e;
    return function(a) {
      return le(c + f * a, d + g * a, e + h * a) + ""
    }
  };
  k.interpolateRound = sf;
  k.transform = function(a) {
    var b = V.createElementNS(k.ns.prefix.svg, "g");
    return (k.transform = function(a) {
      if (null !=
        a) {
        b.setAttribute("transform", a);
        var d = b.transform.baseVal.consolidate()
      }
      return new tf(d ? d.matrix : Gi)
    })(a)
  };
  tf.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
  };
  var Gi = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  k.interpolateTransform = vf;
  k.layout = {};
  k.layout.bundle = function() {
    return function(a) {
      for (var b = [], c = -1, d = a.length; ++c < d;) b.push(Ih(a[c]));
      return b
    }
  };
  k.layout.chord = function() {
    function a() {
      var a = {},
        c = [],
        r = k.range(g),
        t = [],
        v, x, u,
        y, z;
      d = [];
      e = [];
      v = 0;
      for (y = -1; ++y < g;) {
        x = 0;
        for (z = -1; ++z < g;) x += f[y][z];
        c.push(x);
        t.push(k.range(g));
        v += x
      }
      l && r.sort(function(a, b) {
        return l(c[a], c[b])
      });
      m && t.forEach(function(a, b) {
        a.sort(function(a, c) {
          return m(f[b][a], f[b][c])
        })
      });
      v = (Z - h * g) / v;
      x = 0;
      for (y = -1; ++y < g;) {
        u = x;
        for (z = -1; ++z < g;) {
          var A = r[y],
            C = t[A][z],
            J = f[A][C],
            G = x,
            w = x += J * v;
          a[A + "-" + C] = {
            index: A,
            subindex: C,
            startAngle: G,
            endAngle: w,
            value: J
          }
        }
        e[A] = {
          index: A,
          startAngle: u,
          endAngle: x,
          value: c[A]
        };
        x += h
      }
      for (y = -1; ++y < g;)
        for (z = y - 1; ++z < g;) r = a[y + "-" + z], t = a[z + "-" + y], (r.value ||
          t.value) && d.push(r.value < t.value ? {
          source: t,
          target: r
        } : {
          source: r,
          target: t
        });
      n && b()
    }

    function b() {
      d.sort(function(a, b) {
        return n((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
      })
    }
    var c = {},
      d, e, f, g, h = 0,
      l, m, n;
    c.matrix = function(a) {
      if (!arguments.length) return f;
      g = (f = a) && f.length;
      d = e = null;
      return c
    };
    c.padding = function(a) {
      if (!arguments.length) return h;
      h = a;
      d = e = null;
      return c
    };
    c.sortGroups = function(a) {
      if (!arguments.length) return l;
      l = a;
      d = e = null;
      return c
    };
    c.sortSubgroups = function(a) {
      if (!arguments.length) return m;
      m = a;
      d = null;
      return c
    };
    c.sortChords = function(a) {
      if (!arguments.length) return n;
      n = a;
      d && b();
      return c
    };
    c.chords = function() {
      d || a();
      return d
    };
    c.groups = function() {
      e || a();
      return e
    };
    return c
  };
  k.layout.force = function() {
    function a(a) {
      return function(b, c, d, e) {
        if (b.point !== a) {
          d = b.cx - a.x;
          var f = b.cy - a.y;
          c = e - c;
          e = d * d + f * f;
          if (c * c / t < e) return e < q && (c = b.charge / e, a.px -= d * c, a.py -= f * c), !0;
          b.point && e && e < q && (c = b.pointCharge / e, a.px -= d * c, a.py -= f * c)
        }
        return !b.charge
      }
    }

    function b(a) {
      a.px = k.event.x;
      a.py = k.event.y;
      c.resume()
    }
    var c = {},
      d = k.dispatch("start", "tick", "end"),
      e, f = [1, 1],
      g, h, l = .9,
      m = Hi,
      n = Ii,
      p = -30,
      q = Ji,
      r = .1,
      t = .64,
      v = [],
      x = [],
      u, y, z;
    c.tick = function() {
      if (.005 > (h *= .99)) return e = null, d.end({
        type: "end",
        alpha: h = 0
      }), !0;
      var b = v.length,
        c = x.length,
        g, m, n, q, t, w, B;
      for (g = 0; g < c; ++g)
        if (m = x[g], n = m.source, q = m.target, w = q.x - n.x, B = q.y - n.y, t = w * w + B * B) t = h * y[g] * ((t = Math.sqrt(t)) - u[g]) / t, w *= t, B *= t, q.x -= w * (t = n.weight + q.weight ? n.weight / (n.weight + q.weight) : .5), q.y -= B * t, n.x += w * (t = 1 - t), n.y += B * t;
      if (t = h * r)
        if (w = f[0] / 2, B = f[1] / 2, g = -1, t)
          for (; ++g < b;) m = v[g], m.x +=
            (w - m.x) * t, m.y += (B - m.y) * t;
      if (p)
        for (xf(c = k.geom.quadtree(v), h, z), g = -1; ++g < b;)(m = v[g]).fixed || c.visit(a(m));
      for (g = -1; ++g < b;) m = v[g], m.fixed ? (m.x = m.px, m.y = m.py) : (m.x -= (m.px - (m.px = m.x)) * l, m.y -= (m.py - (m.py = m.y)) * l);
      d.tick({
        type: "tick",
        alpha: h
      })
    };
    c.nodes = function(a) {
      if (!arguments.length) return v;
      v = a;
      return c
    };
    c.links = function(a) {
      if (!arguments.length) return x;
      x = a;
      return c
    };
    c.size = function(a) {
      if (!arguments.length) return f;
      f = a;
      return c
    };
    c.linkDistance = function(a) {
      if (!arguments.length) return m;
      m = "function" ===
        typeof a ? a : +a;
      return c
    };
    c.distance = c.linkDistance;
    c.linkStrength = function(a) {
      if (!arguments.length) return n;
      n = "function" === typeof a ? a : +a;
      return c
    };
    c.friction = function(a) {
      if (!arguments.length) return l;
      l = +a;
      return c
    };
    c.charge = function(a) {
      if (!arguments.length) return p;
      p = "function" === typeof a ? a : +a;
      return c
    };
    c.chargeDistance = function(a) {
      if (!arguments.length) return Math.sqrt(q);
      q = a * a;
      return c
    };
    c.gravity = function(a) {
      if (!arguments.length) return r;
      r = +a;
      return c
    };
    c.theta = function(a) {
      if (!arguments.length) return Math.sqrt(t);
      t = a * a;
      return c
    };
    c.alpha = function(a) {
      if (!arguments.length) return h;
      a = +a;
      h ? 0 < a ? h = a : (e.c = null, e.t = NaN, e = null, d.end({
        type: "end",
        alpha: h = 0
      })) : 0 < a && (d.start({
        type: "start",
        alpha: h = a
      }), e = yb(c.tick));
      return c
    };
    c.start = function() {
      function a(c, f) {
        if (!l) {
          l = Array(d);
          for (h = 0; h < d; ++h) l[h] = [];
          for (h = 0; h < e; ++h) {
            var g = x[h];
            l[g.source.index].push(g.target);
            l[g.target.index].push(g.source)
          }
        }
        for (var g = l[b], h = -1, m = g.length, k; ++h < m;)
          if (!isNaN(k = g[h][c])) return k;
        return Math.random() * f
      }
      var b, d = v.length,
        e = x.length,
        g = f[0],
        h = f[1],
        l, k;
      for (b = 0; b < d; ++b)(k = v[b]).index = b, k.weight = 0;
      for (b = 0; b < e; ++b) k = x[b], "number" == typeof k.source && (k.source = v[k.source]), "number" == typeof k.target && (k.target = v[k.target]), ++k.source.weight, ++k.target.weight;
      for (b = 0; b < d; ++b) k = v[b], isNaN(k.x) && (k.x = a("x", g)), isNaN(k.y) && (k.y = a("y", h)), isNaN(k.px) && (k.px = k.x), isNaN(k.py) && (k.py = k.y);
      u = [];
      if ("function" === typeof m)
        for (b = 0; b < e; ++b) u[b] = +m.call(this, x[b], b);
      else
        for (b = 0; b < e; ++b) u[b] = m;
      y = [];
      if ("function" === typeof n)
        for (b = 0; b < e; ++b) y[b] = +n.call(this,
          x[b], b);
      else
        for (b = 0; b < e; ++b) y[b] = n;
      z = [];
      if ("function" === typeof p)
        for (b = 0; b < d; ++b) z[b] = +p.call(this, v[b], b);
      else
        for (b = 0; b < d; ++b) z[b] = p;
      return c.resume()
    };
    c.resume = function() {
      return c.alpha(.1)
    };
    c.stop = function() {
      return c.alpha(0)
    };
    c.drag = function() {
      g || (g = k.behavior.drag().origin(S).on("dragstart.force", Jh).on("drag.force", b).on("dragend.force", Kh));
      if (!arguments.length) return g;
      this.on("mouseover.force", Lh).on("mouseout.force", Mh).call(g)
    };
    return k.rebind(c, d, "on")
  };
  var Hi = 20,
    Ii = 1,
    Ji = Infinity;
  k.layout.hierarchy =
    function() {
      function a(e) {
        var f = [e],
          g = [],
          h;
        for (e.depth = 0; null != (h = f.pop());)
          if (g.push(h), (m = c.call(a, h, h.depth)) && (l = m.length)) {
            for (var l, m, k; 0 <= --l;) f.push(k = m[l]), k.parent = h, k.depth = h.depth + 1;
            d && (h.value = 0);
            h.children = m
          } else d && (h.value = +d.call(a, h, h.depth) || 0), delete h.children;
        ja(e, function(a) {
          var c, e;
          b && (c = a.children) && c.sort(b);
          d && (e = a.parent) && (e.value += a.value)
        });
        return g
      }
      var b = Qh,
        c = Oh,
        d = Ph;
      a.sort = function(c) {
        if (!arguments.length) return b;
        b = c;
        return a
      };
      a.children = function(b) {
        if (!arguments.length) return c;
        c = b;
        return a
      };
      a.value = function(b) {
        if (!arguments.length) return d;
        d = b;
        return a
      };
      a.revalue = function(b) {
        d && (ob(b, function(a) {
          a.children && (a.value = 0)
        }), ja(b, function(b) {
          var c;
          b.children || (b.value = +d.call(a, b, b.depth) || 0);
          if (c = b.parent) c.value += b.value
        }));
        return b
      };
      return a
    };
  k.layout.partition = function() {
    function a(b, c, d, e) {
      var k = b.children;
      b.x = c;
      b.y = b.depth * e;
      b.dx = d;
      b.dy = e;
      if (k && (p = k.length)) {
        var n = -1,
          p, q;
        for (d = b.value ? d / b.value : 0; ++n < p;) a(q = k[n], c, b = q.value * d, e), c += b
      }
    }

    function b(a) {
      a = a.children;
      var c =
        0;
      if (a && (e = a.length))
        for (var d = -1, e; ++d < e;) c = Math.max(c, b(a[d]));
      return 1 + c
    }

    function c(c, g) {
      var h = d.call(this, c, g);
      a(h[0], 0, e[0], e[1] / b(h[0]));
      return h
    }
    var d = k.layout.hierarchy(),
      e = [1, 1];
    c.size = function(a) {
      if (!arguments.length) return e;
      e = a;
      return c
    };
    return nb(c, d)
  };
  k.layout.pie = function() {
    function a(g) {
      var h = g.length,
        l = g.map(function(c, d) {
          return +b.call(a, c, d)
        }),
        m = +("function" === typeof d ? d.apply(this, arguments) : d),
        n = ("function" === typeof e ? e.apply(this, arguments) : e) - m,
        p = Math.min(Math.abs(n) / h, +("function" ===
          typeof f ? f.apply(this, arguments) : f)),
        q = p * (0 > n ? -1 : 1),
        r = k.sum(l),
        t = r ? (n - h * q) / r : 0,
        h = k.range(h),
        v = [],
        x;
      null != c && h.sort(c === qg ? function(a, b) {
        return l[b] - l[a]
      } : function(a, b) {
        return c(g[a], g[b])
      });
      h.forEach(function(a) {
        v[a] = {
          data: g[a],
          value: x = l[a],
          startAngle: m,
          endAngle: m += x * t + q,
          padAngle: p
        }
      });
      return v
    }
    var b = Number,
      c = qg,
      d = 0,
      e = Z,
      f = 0;
    a.value = function(c) {
      if (!arguments.length) return b;
      b = c;
      return a
    };
    a.sort = function(b) {
      if (!arguments.length) return c;
      c = b;
      return a
    };
    a.startAngle = function(b) {
      if (!arguments.length) return d;
      d = b;
      return a
    };
    a.endAngle = function(b) {
      if (!arguments.length) return e;
      e = b;
      return a
    };
    a.padAngle = function(b) {
      if (!arguments.length) return f;
      f = b;
      return a
    };
    return a
  };
  var qg = {};
  k.layout.stack = function() {
    function a(h, l) {
      if (!(r = h.length)) return h;
      var m = h.map(function(c, d) {
          return b.call(a, c, d)
        }),
        n = m.map(function(b) {
          return b.map(function(b, c) {
            return [f.call(a, b, c), g.call(a, b, c)]
          })
        }),
        p = c.call(a, n, l),
        m = k.permute(m, p),
        n = k.permute(n, p),
        p = d.call(a, n, l),
        q = m[0].length,
        r, t, v, x;
      for (v = 0; v < q; ++v)
        for (e.call(a, m[0][v], x = p[v],
            n[0][v][1]), t = 1; t < r; ++t) e.call(a, m[t][v], x += n[t - 1][v][1], n[t][v][1]);
      return h
    }
    var b = S,
      c = jd,
      d = kd,
      e = Th,
      f = Rh,
      g = Sh;
    a.values = function(c) {
      if (!arguments.length) return b;
      b = c;
      return a
    };
    a.order = function(b) {
      if (!arguments.length) return c;
      c = "function" === typeof b ? b : Ki.get(b) || jd;
      return a
    };
    a.offset = function(b) {
      if (!arguments.length) return d;
      d = "function" === typeof b ? b : Li.get(b) || kd;
      return a
    };
    a.x = function(b) {
      if (!arguments.length) return f;
      f = b;
      return a
    };
    a.y = function(b) {
      if (!arguments.length) return g;
      g = b;
      return a
    };
    a.out =
      function(b) {
        if (!arguments.length) return e;
        e = b;
        return a
      };
    return a
  };
  var Ki = k.map({
      "inside-out": function(a) {
        var b = a.length,
          c, d = a.map(Uh),
          e = a.map(Vh),
          f = k.range(b).sort(function(a, b) {
            return d[a] - d[b]
          }),
          g = 0,
          h = 0,
          l = [],
          m = [];
        for (a = 0; a < b; ++a) c = f[a], g < h ? (g += e[c], l.push(c)) : (h += e[c], m.push(c));
        return m.reverse().concat(l)
      },
      reverse: function(a) {
        return k.range(a.length).reverse()
      },
      "default": jd
    }),
    Li = k.map({
      silhouette: function(a) {
        var b = a.length,
          c = a[0].length,
          d = [],
          e = 0,
          f, g, h, k = [];
        for (g = 0; g < c; ++g) {
          for (h = f = 0; f < b; f++) h +=
            a[f][g][1];
          h > e && (e = h);
          d.push(h)
        }
        for (g = 0; g < c; ++g) k[g] = (e - d[g]) / 2;
        return k
      },
      wiggle: function(a) {
        var b = a.length,
          c = a[0],
          d = c.length,
          e, f, g, h, k, m, n, p, q, r = [];
        r[0] = p = q = 0;
        for (f = 1; f < d; ++f) {
          for (h = e = 0; e < b; ++e) h += a[e][f][1];
          k = e = 0;
          for (n = c[f][0] - c[f - 1][0]; e < b; ++e) {
            g = 0;
            for (m = (a[e][f][1] - a[e][f - 1][1]) / (2 * n); g < e; ++g) m += (a[g][f][1] - a[g][f - 1][1]) / n;
            k += m * a[e][f][1]
          }
          r[f] = p -= h ? k / h * n : 0;
          p < q && (q = p)
        }
        for (f = 0; f < d; ++f) r[f] -= q;
        return r
      },
      expand: function(a) {
        var b = a.length,
          c = a[0].length,
          d = 1 / b,
          e, f, g, h = [];
        for (f = 0; f < c; ++f) {
          for (g = e = 0; e <
            b; e++) g += a[e][f][1];
          if (g)
            for (e = 0; e < b; e++) a[e][f][1] /= g;
          else
            for (e = 0; e < b; e++) a[e][f][1] = d
        }
        for (f = 0; f < c; ++f) h[f] = 0;
        return h
      },
      zero: kd
    });
  k.layout.histogram = function() {
    function a(a, g) {
      var h = [],
        l = a.map(c, this),
        m = d.call(this, l, g),
        n = e.call(this, m, l, g),
        p;
      g = -1;
      for (var q = l.length, r = n.length - 1, t = b ? 1 : 1 / q; ++g < r;) p = h[g] = [], p.dx = n[g + 1] - (p.x = n[g]), p.y = 0;
      if (0 < r)
        for (g = -1; ++g < q;) p = l[g], p >= m[0] && p <= m[1] && (p = h[k.bisect(n, p, 1, r) - 1], p.y += t, p.push(a[g]));
      return h
    }
    var b = !0,
      c = Number,
      d = Yh,
      e = Xh;
    a.value = function(b) {
      if (!arguments.length) return c;
      c = b;
      return a
    };
    a.range = function(b) {
      if (!arguments.length) return d;
      d = I(b);
      return a
    };
    a.bins = function(b) {
      if (!arguments.length) return e;
      e = "number" === typeof b ? function(a) {
        return yf(a, b)
      } : I(b);
      return a
    };
    a.frequency = function(c) {
      if (!arguments.length) return b;
      b = !!c;
      return a
    };
    return a
  };
  k.layout.pack = function() {
    function a(a, g) {
      var h = b.call(this, a, g),
        k = h[0],
        m = d[0],
        n = d[1],
        p = null == e ? Math.sqrt : "function" === typeof e ? e : function() {
          return e
        };
      k.x = k.y = 0;
      ja(k, function(a) {
        a.r = +p(a.value)
      });
      ja(k, Bf);
      if (c) {
        var q = c * (e ? 1 : Math.max(2 *
          k.r / m, 2 * k.r / n)) / 2;
        ja(k, function(a) {
          a.r += q
        });
        ja(k, Bf);
        ja(k, function(a) {
          a.r -= q
        })
      }
      Df(k, m / 2, n / 2, e ? 1 : 1 / Math.max(2 * k.r / m, 2 * k.r / n));
      return h
    }
    var b = k.layout.hierarchy().sort(Zh),
      c = 0,
      d = [1, 1],
      e;
    a.size = function(b) {
      if (!arguments.length) return d;
      d = b;
      return a
    };
    a.radius = function(b) {
      if (!arguments.length) return e;
      e = null == b || "function" === typeof b ? b : +b;
      return a
    };
    a.padding = function(b) {
      if (!arguments.length) return c;
      c = +b;
      return a
    };
    return nb(a, b)
  };
  k.layout.tree = function() {
    function a(a, k) {
      var p = f.call(this, a, k),
        q = p[0],
        r =
        b(q);
      ja(r, c);
      r.parent.m = -r.z;
      ob(r, d);
      if (l) ob(q, e);
      else {
        var t = q,
          v = q,
          x = q;
        ob(q, function(a) {
          a.x < t.x && (t = a);
          a.x > v.x && (v = a);
          a.depth > x.depth && (x = a)
        });
        var u = g(t, v) / 2 - t.x,
          y = h[0] / (v.x + g(v, t) / 2 + u),
          z = h[1] / (x.depth || 1);
        ob(q, function(a) {
          a.x = (a.x + u) * y;
          a.y = a.depth * z
        })
      }
      return p
    }

    function b(a) {
      a = {
        A: null,
        children: [a]
      };
      for (var b = [a], c; null != (c = b.pop());)
        for (var d = c.children, e, f = 0, g = d.length; f < g; ++f) b.push((d[f] = e = {
          _: d[f],
          parent: c,
          children: (e = d[f].children) && e.slice() || [],
          A: null,
          a: null,
          z: 0,
          m: 0,
          c: 0,
          s: 0,
          t: null,
          i: f
        }).a = e);
      return a.children[0]
    }

    function c(a) {
      var b = a.children,
        c = a.parent.children,
        d = a.i ? c[a.i - 1] : null;
      if (b.length) {
        for (var e = 0, f = 0, h = a.children, k = h.length, l; 0 <= --k;) l = h[k], l.z += e, l.m += e, e += l.s + (f += l.c);
        b = (b[0].z + b[b.length - 1].z) / 2;
        d ? (a.z = d.z + g(a._, d._), a.m = a.z - b) : a.z = b
      } else d && (a.z = d.z + g(a._, d._));
      b = a.parent;
      c = a.parent.A || c[0];
      if (d) {
        f = e = a;
        h = e.parent.children[0];
        k = e.m;
        l = f.m;
        for (var y = d.m, z = h.m, A; d = nd(d), e = md(e), d && e;) {
          h = md(h);
          f = nd(f);
          f.a = a;
          A = d.z + y - e.z - k + g(d._, e._);
          if (0 < A) {
            var C = d.a.parent === a.parent ? d.a : c,
              w =
              a,
              G = A,
              B = G / (w.i - C.i);
            w.c -= B;
            w.s += G;
            C.c += B;
            w.z += G;
            w.m += G;
            k += A;
            l += A
          }
          y += d.m;
          k += e.m;
          z += h.m;
          l += f.m
        }
        d && !nd(f) && (f.t = d, f.m += y - l);
        e && !md(h) && (h.t = e, h.m += k - z, c = a)
      }
      b.A = c
    }

    function d(a) {
      a._.x = a.z + a.parent.m;
      a.m += a.parent.m
    }

    function e(a) {
      a.x *= h[0];
      a.y = a.depth * h[1]
    }
    var f = k.layout.hierarchy().sort(null).value(null),
      g = Ef,
      h = [1, 1],
      l = null;
    a.separation = function(b) {
      if (!arguments.length) return g;
      g = b;
      return a
    };
    a.size = function(b) {
      if (!arguments.length) return l ? null : h;
      l = null == (h = b) ? e : null;
      return a
    };
    a.nodeSize = function(b) {
      if (!arguments.length) return l ?
        h : null;
      l = null == (h = b) ? null : e;
      return a
    };
    return nb(a, f)
  };
  k.layout.cluster = function() {
    function a(a, g) {
      var h = b.call(this, a, g),
        k = h[0],
        m, n = 0;
      ja(k, function(a) {
        var b = a.children;
        b && b.length ? (a.x = ci(b), a.y = bi(b)) : (a.x = m ? n += c(a, m) : 0, a.y = 0, m = a)
      });
      var p = Ff(k),
        q = Gf(k),
        r = p.x - c(p, q) / 2,
        t = q.x + c(q, p) / 2;
      ja(k, e ? function(a) {
        a.x = (a.x - k.x) * d[0];
        a.y = (k.y - a.y) * d[1]
      } : function(a) {
        a.x = (a.x - r) / (t - r) * d[0];
        a.y = (1 - (k.y ? a.y / k.y : 1)) * d[1]
      });
      return h
    }
    var b = k.layout.hierarchy().sort(null).value(null),
      c = Ef,
      d = [1, 1],
      e = !1;
    a.separation = function(b) {
      if (!arguments.length) return c;
      c = b;
      return a
    };
    a.size = function(b) {
      if (!arguments.length) return e ? null : d;
      e = null == (d = b);
      return a
    };
    a.nodeSize = function(b) {
      if (!arguments.length) return e ? d : null;
      e = null != (d = b);
      return a
    };
    return nb(a, b)
  };
  k.layout.treemap = function() {
    function a(a, b) {
      for (var c = -1, d = a.length, e, f; ++c < d;) f = (e = a[c]).value * (0 > b ? 0 : b), e.area = isNaN(f) || 0 >= f ? 0 : f
    }

    function b(c) {
      var e = c.children;
      if (e && e.length) {
        var f = m(c),
          g = [],
          h = e.slice(),
          k = Infinity,
          l, n = "slice" === q ? f.dx : "dice" === q ? f.dy : "slice-dice" === q ? c.depth & 1 ? f.dy : f.dx : Math.min(f.dx, f.dy);
        a(h, f.dx * f.dy / c.value);
        for (g.area = 0; 0 < (c = h.length);) {
          g.push(c = h[c - 1]);
          g.area += c.area;
          if (!(c = "squarify" !== q)) {
            l = n;
            c = g.area;
            for (var p, w = 0, B = Infinity, D = -1, E = g.length; ++D < E;)
              if (p = g[D].area) p < B && (B = p), p > w && (w = p);
            c *= c;
            l *= l;
            c = (l = c ? Math.max(l * w * r / c, c / (l * B * r)) : Infinity) <= k
          }
          c ? (h.pop(), k = l) : (g.area -= g.pop().area, d(g, n, f, !1), n = Math.min(f.dx, f.dy), g.length = g.area = 0, k = Infinity)
        }
        g.length && (d(g, n, f, !0), g.length = g.area = 0);
        e.forEach(b)
      }
    }

    function c(b) {
      var e = b.children;
      if (e && e.length) {
        var f = m(b),
          g = e.slice(),
          h = [];
        a(g,
          f.dx * f.dy / b.value);
        for (h.area = 0; b = g.pop();) h.push(b), h.area += b.area, null != b.z && (d(h, b.z ? f.dx : f.dy, f, !g.length), h.length = h.area = 0);
        e.forEach(c)
      }
    }

    function d(a, b, c, d) {
      var e = -1,
        f = a.length,
        h = c.x,
        k = c.y,
        l = b ? g(a.area / b) : 0,
        m;
      if (b == c.dx) {
        if (d || l > c.dy) l = c.dy;
        for (; ++e < f;) m = a[e], m.x = h, m.y = k, m.dy = l, h += m.dx = Math.min(c.x + c.dx - h, l ? g(m.area / l) : 0);
        m.z = !0;
        m.dx += c.x + c.dx - h;
        c.y += l;
        c.dy -= l
      } else {
        if (d || l > c.dx) l = c.dx;
        for (; ++e < f;) m = a[e], m.x = h, m.y = k, m.dx = l, k += m.dy = Math.min(c.y + c.dy - k, l ? g(m.area / l) : 0);
        m.z = !1;
        m.dy += c.y + c.dy - k;
        c.x += l;
        c.dx -= l
      }
    }

    function e(d) {
      d = p || f(d);
      var e = d[0];
      e.x = e.y = 0;
      e.value ? (e.dx = h[0], e.dy = h[1]) : e.dx = e.dy = 0;
      p && f.revalue(e);
      a([e], e.dx * e.dy / e.value);
      (p ? c : b)(e);
      n && (p = d);
      return d
    }
    var f = k.layout.hierarchy(),
      g = Math.round,
      h = [1, 1],
      l = null,
      m = od,
      n = !1,
      p, q = "squarify",
      r = .5 * (1 + Math.sqrt(5));
    e.size = function(a) {
      if (!arguments.length) return h;
      h = a;
      return e
    };
    e.padding = function(a) {
      function b(c) {
        var d = a.call(e, c, c.depth);
        return null == d ? od(c) : Hf(c, "number" === typeof d ? [d, d, d, d] : d)
      }

      function c(b) {
        return Hf(b, a)
      }
      if (!arguments.length) return l;
      var d;
      m = null == (l = a) ? od : "function" === (d = typeof a) ? b : "number" === d ? (a = [a, a, a, a], c) : c;
      return e
    };
    e.round = function(a) {
      if (!arguments.length) return g != Number;
      g = a ? Math.round : Number;
      return e
    };
    e.sticky = function(a) {
      if (!arguments.length) return n;
      n = a;
      p = null;
      return e
    };
    e.ratio = function(a) {
      if (!arguments.length) return r;
      r = a;
      return e
    };
    e.mode = function(a) {
      if (!arguments.length) return q;
      q = a + "";
      return e
    };
    return nb(e, f)
  };
  k.random = {
    normal: function(a, b) {
      var c = arguments.length;
      2 > c && (b = 1);
      1 > c && (a = 0);
      return function() {
        var c, e;
        do c = 2 * Math.random() - 1, e = 2 * Math.random() - 1, e = c * c + e * e; while (!e || 1 < e);
        return a + b * c * Math.sqrt(-2 * Math.log(e) / e)
      }
    },
    logNormal: function() {
      var a = k.random.normal.apply(k, arguments);
      return function() {
        return Math.exp(a())
      }
    },
    bates: function(a) {
      var b = k.random.irwinHall(a);
      return function() {
        return b() / a
      }
    },
    irwinHall: function(a) {
      return function() {
        for (var b = 0, c = 0; c < a; c++) b += Math.random();
        return b
      }
    }
  };
  k.scale = {};
  var ei = {
    floor: S,
    ceil: S
  };
  k.scale.linear = function() {
    return Jf([0, 1], [0, 1], Ma, !1)
  };
  var hi = {
    s: 1,
    g: 1,
    p: 1,
    r: 1,
    e: 1
  };
  k.scale.log = function() {
    return Lf(k.scale.linear().domain([0, 1]), 10, !0, [1, 10])
  };
  var Mf = k.format(".0e"),
    ii = {
      floor: function(a) {
        return -Math.ceil(-a)
      },
      ceil: function(a) {
        return -Math.floor(-a)
      }
    };
  k.scale.pow = function() {
    return Nf(k.scale.linear(), 1, [0, 1])
  };
  k.scale.sqrt = function() {
    return k.scale.pow().exponent(.5)
  };
  k.scale.ordinal = function() {
    return Of([], {
      t: "range",
      a: [
        []
      ]
    })
  };
  k.scale.category10 = function() {
    return k.scale.ordinal().range(Mi)
  };
  k.scale.category20 = function() {
    return k.scale.ordinal().range(Ni)
  };
  k.scale.category20b = function() {
    return k.scale.ordinal().range(Oi)
  };
  k.scale.category20c = function() {
    return k.scale.ordinal().range(Pi)
  };
  var Mi = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(vb),
    Ni = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(vb),
    Oi = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993,
      12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654
    ].map(vb),
    Pi = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(vb);
  k.scale.quantile = function() {
    return Pf([], [])
  };
  k.scale.quantize = function() {
    return Qf(0, 1, [0, 1])
  };
  k.scale.threshold = function() {
    return Rf([.5], [0, 1])
  };
  k.scale.identity = function() {
    return Sf([0, 1])
  };
  k.svg = {};
  k.svg.arc =
    function() {
      function a() {
        var a = Math.max(0, +c.apply(this, arguments)),
          n = Math.max(0, +d.apply(this, arguments)),
          p = g.apply(this, arguments) - P,
          q = h.apply(this, arguments) - P,
          r = Math.abs(q - p),
          t = p > q ? 0 : 1;
        n < a && (v = n, n = a, a = v);
        if (r >= Bi) return b(n, t) + (a ? b(a, 1 - t) : "") + "Z";
        var v, x, u, y, z = 0,
          A = 0,
          w, B, G, E, N, F = [];
        if (y = (+k.apply(this, arguments) || 0) / 2) u = f === pc ? Math.sqrt(a * a + n * n) : +f.apply(this, arguments), t || (A *= -1), n && (A = ua(u / n * Math.sin(y))), a && (z = ua(u / a * Math.sin(y)));
        n ? (u = n * Math.cos(p + A), y = n * Math.sin(p + A), w = n * Math.cos(q - A), B = n *
          Math.sin(q - A), x = Math.abs(q - p - 2 * A) <= D ? 0 : 1, A && Yb(u, y, w, B) === t ^ x && (w = (p + q) / 2, u = n * Math.cos(w), y = n * Math.sin(w), w = B = null)) : u = y = 0;
        if (a) {
          A = a * Math.cos(q - z);
          G = a * Math.sin(q - z);
          E = a * Math.cos(p + z);
          N = a * Math.sin(p + z);
          var H = Math.abs(p - q + 2 * z) <= D ? 0 : 1;
          z && Yb(A, G, E, N) === 1 - t ^ H && (E = (p + q) / 2, A = a * Math.cos(E), G = a * Math.sin(E), E = N = null)
        } else A = G = 0;
        1E-6 < r && .001 < (v = Math.min(Math.abs(n - a) / 2, +e.apply(this, arguments))) ? (x = a < n ^ t ? 0 : 1, H = p = v, r < D && (r = null == E ? [A, G] : null == w ? [u, y] : bd([u, y], [E, N], [w, B], [A, G]), H = u - r[0], p = y - r[1], q = w - r[0], z = B -
          r[1], p = 1 / Math.sin(Math.acos((H * q + p * z) / (Math.sqrt(H * H + p * p) * Math.sqrt(q * q + z * z))) / 2), r = Math.sqrt(r[0] * r[0] + r[1] * r[1]), H = Math.min(v, (a - r) / (p - 1)), p = Math.min(v, (n - r) / (p + 1))), null != w ? (r = Zb(null == E ? [A, G] : [E, N], [u, y], n, p, t), q = Zb([w, B], [A, G], n, p, t), v === p ? F.push("M", r[0], "A", p, ",", p, " 0 0,", x, " ", r[1], "A", n, ",", n, " 0 ", 1 - t ^ Yb(r[1][0], r[1][1], q[1][0], q[1][1]), ",", t, " ", q[1], "A", p, ",", p, " 0 0,", x, " ", q[0]) : F.push("M", r[0], "A", p, ",", p, " 0 1,", x, " ", q[0])) : F.push("M", u, ",", y), null != E ? (n = Zb([u, y], [E, N], a, -H, t), w =
          Zb([A, G], null == w ? [u, y] : [w, B], a, -H, t), v === H ? F.push("L", w[0], "A", H, ",", H, " 0 0,", x, " ", w[1], "A", a, ",", a, " 0 ", t ^ Yb(w[1][0], w[1][1], n[1][0], n[1][1]), ",", 1 - t, " ", n[1], "A", H, ",", H, " 0 0,", x, " ", n[0]) : F.push("L", w[0], "A", H, ",", H, " 0 0,", x, " ", n[0])) : F.push("L", A, ",", G)) : (F.push("M", u, ",", y), null != w && F.push("A", n, ",", n, " 0 ", x, ",", t, " ", w, ",", B), F.push("L", A, ",", G), null != E && F.push("A", a, ",", a, " 0 ", H, ",", 1 - t, " ", E, ",", N));
        F.push("Z");
        return F.join("")
      }

      function b(a, b) {
        return "M0," + a + "A" + a + "," + a + " 0 1," + b +
          " 0," + -a + "A" + a + "," + a + " 0 1," + b + " 0," + a
      }
      var c = ki,
        d = li,
        e = ji,
        f = pc,
        g = Tf,
        h = Uf,
        k = mi;
      a.innerRadius = function(b) {
        if (!arguments.length) return c;
        c = I(b);
        return a
      };
      a.outerRadius = function(b) {
        if (!arguments.length) return d;
        d = I(b);
        return a
      };
      a.cornerRadius = function(b) {
        if (!arguments.length) return e;
        e = I(b);
        return a
      };
      a.padRadius = function(b) {
        if (!arguments.length) return f;
        f = b == pc ? pc : I(b);
        return a
      };
      a.startAngle = function(b) {
        if (!arguments.length) return g;
        g = I(b);
        return a
      };
      a.endAngle = function(b) {
        if (!arguments.length) return h;
        h = I(b);
        return a
      };
      a.padAngle = function(b) {
        if (!arguments.length) return k;
        k = I(b);
        return a
      };
      a.centroid = function() {
        var a = (+c.apply(this, arguments) + +d.apply(this, arguments)) / 2,
          b = (+g.apply(this, arguments) + +h.apply(this, arguments)) / 2 - P;
        return [Math.cos(b) * a, Math.sin(b) * a]
      };
      return a
    };
  var pc = "auto";
  k.svg.line = function() {
    return Vf(S)
  };
  var rd = k.map({
    linear: fa,
    "linear-closed": Wf,
    step: function(a) {
      for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("H", (d[0] + (d = a[b])[0]) / 2, "V", d[1]);
      1 < c && e.push("H", d[0]);
      return e.join("")
    },
    "step-before": sd,
    "step-after": td,
    basis: Xf,
    "basis-open": function(a) {
      if (4 > a.length) return fa(a);
      for (var b = [], c = -1, d = a.length, e, f = [0], g = [0]; 3 > ++c;) e = a[c], f.push(e[0]), g.push(e[1]);
      b.push(aa(Ba, f) + "," + aa(Ba, g));
      for (--c; ++c < d;) e = a[c], f.shift(), f.push(e[0]), g.shift(), g.push(e[1]), vd(b, f, g);
      return b.join("")
    },
    "basis-closed": function(a) {
      for (var b, c = -1, d = a.length, e = d + 4, f, g = [], h = []; 4 > ++c;) f = a[c % d], g.push(f[0]), h.push(f[1]);
      b = [aa(Ba, g), ",", aa(Ba, h)];
      for (--c; ++c < e;) f = a[c % d], g.shift(), g.push(f[0]),
        h.shift(), h.push(f[1]), vd(b, g, h);
      return b.join("")
    },
    bundle: function(a, b) {
      var c = a.length - 1;
      if (c)
        for (var d = a[0][0], e = a[0][1], f = a[c][0] - d, g = a[c][1] - e, h = -1, k, m; ++h <= c;) k = a[h], m = h / c, k[0] = b * k[0] + (1 - b) * (d + m * f), k[1] = b * k[1] + (1 - b) * (e + m * g);
      return Xf(a)
    },
    cardinal: function(a, b) {
      return 3 > a.length ? fa(a) : a[0] + $b(a, ud(a, b))
    },
    "cardinal-open": function(a, b) {
      return 4 > a.length ? fa(a) : a[1] + $b(a.slice(1, -1), ud(a, b))
    },
    "cardinal-closed": function(a, b) {
      return 3 > a.length ? Wf(a) : a[0] + $b((a.push(a[0]), a), ud([a[a.length - 2]].concat(a, [a[1]]), b))
    },
    monotone: function(a) {
      if (3 > a.length) a = fa(a);
      else {
        var b = a[0],
          c = [],
          d, e, f, g;
        d = 0;
        e = a.length - 1;
        var h = [];
        f = a[1];
        for (g = h[0] = wd(a[0], f); ++d < e;) h[d] = (g + (g = wd(f, f = a[d + 1]))) / 2;
        h[d] = g;
        for (var k = -1, m = a.length - 1; ++k < m;) d = wd(a[k], a[k + 1]), 1E-6 > E(d) ? h[k] = h[k + 1] = 0 : (e = h[k] / d, f = h[k + 1] / d, g = e * e + f * f, 9 < g && (g = 3 * d / Math.sqrt(g), h[k] = g * e, h[k + 1] = g * f));
        for (k = -1; ++k <= m;) g = (a[Math.min(m, k + 1)][0] - a[Math.max(0, k - 1)][0]) / (6 * (1 + h[k] * h[k])), c.push([g || 0, h[k] * g || 0]);
        a = b + $b(a, c)
      }
      return a
    }
  });
  rd.forEach(function(a, b) {
    b.key = a;
    b.closed = /-closed$/.test(a)
  });
  var Yf = [0, 2 / 3, 1 / 3, 0],
    Zf = [0, 1 / 3, 2 / 3, 0],
    Ba = [0, 1 / 6, 2 / 3, 1 / 6];
  k.svg.line.radial = function() {
    var a = Vf($f);
    a.radius = a.x;
    delete a.x;
    a.angle = a.y;
    delete a.y;
    return a
  };
  sd.reverse = td;
  td.reverse = sd;
  k.svg.area = function() {
    return ag(S)
  };
  k.svg.area.radial = function() {
    var a = ag($f);
    a.radius = a.x;
    delete a.x;
    a.innerRadius = a.x0;
    delete a.x0;
    a.outerRadius = a.x1;
    delete a.x1;
    a.angle = a.y;
    delete a.y;
    a.startAngle = a.y0;
    delete a.y0;
    a.endAngle = a.y1;
    delete a.y1;
    return a
  };
  k.svg.chord = function() {
    function a(a,
      f) {
      var g = b(this, d, a, f),
        h = b(this, e, a, f);
      return "M" + g.p0 + c(g.r, g.p1, g.a1 - g.a0) + (g.a0 == h.a0 && g.a1 == h.a1 ? "Q 0,0 " + g.p0 : "Q 0,0 " + h.p0 + c(h.r, h.p1, h.a1 - h.a0) + ("Q 0,0 " + g.p0)) + "Z"
    }

    function b(a, b, c, d) {
      var e = b.call(a, c, d);
      b = f.call(a, e, d);
      c = g.call(a, e, d) - P;
      a = h.call(a, e, d) - P;
      return {
        r: b,
        a0: c,
        a1: a,
        p0: [b * Math.cos(c), b * Math.sin(c)],
        p1: [b * Math.cos(a), b * Math.sin(a)]
      }
    }

    function c(a, b, c) {
      return "A" + a + "," + a + " 0 " + +(c > D) + ",1 " + b
    }
    var d = Yc,
      e = Zc,
      f = ni,
      g = Tf,
      h = Uf;
    a.radius = function(b) {
      if (!arguments.length) return f;
      f = I(b);
      return a
    };
    a.source = function(b) {
      if (!arguments.length) return d;
      d = I(b);
      return a
    };
    a.target = function(b) {
      if (!arguments.length) return e;
      e = I(b);
      return a
    };
    a.startAngle = function(b) {
      if (!arguments.length) return g;
      g = I(b);
      return a
    };
    a.endAngle = function(b) {
      if (!arguments.length) return h;
      h = I(b);
      return a
    };
    return a
  };
  k.svg.diagonal = function() {
    function a(a, f) {
      var g = b.call(this, a, f),
        h = c.call(this, a, f),
        k = (g.y + h.y) / 2,
        g = [g, {
          x: g.x,
          y: k
        }, {
          x: h.x,
          y: k
        }, h],
        g = g.map(d);
      return "M" + g[0] + "C" + g[1] + " " + g[2] + " " + g[3]
    }
    var b = Yc,
      c = Zc,
      d = bg;
    a.source = function(c) {
      if (!arguments.length) return b;
      b = I(c);
      return a
    };
    a.target = function(b) {
      if (!arguments.length) return c;
      c = I(b);
      return a
    };
    a.projection = function(b) {
      if (!arguments.length) return d;
      d = b;
      return a
    };
    return a
  };
  k.svg.diagonal.radial = function() {
    var a = k.svg.diagonal(),
      b = bg,
      c = a.projection;
    a.projection = function(a) {
      return arguments.length ? c(oi(b = a)) : b
    };
    return a
  };
  k.svg.symbol = function() {
    function a(a, e) {
      return (rg.get(b.call(this, a, e)) || cg)(c.call(this, a, e))
    }
    var b = qi,
      c = pi;
    a.type = function(c) {
      if (!arguments.length) return b;
      b = I(c);
      return a
    };
    a.size = function(b) {
      if (!arguments.length) return c;
      c = I(b);
      return a
    };
    return a
  };
  var rg = k.map({
    circle: cg,
    cross: function(a) {
      a = Math.sqrt(a / 5) / 2;
      return "M" + -3 * a + "," + -a + "H" + -a + "V" + -3 * a + "H" + a + "V" + -a + "H" + 3 * a + "V" + a + "H" + a + "V" + 3 * a + "H" + -a + "V" + a + "H" + -3 * a + "Z"
    },
    diamond: function(a) {
      a = Math.sqrt(a / (2 * sg));
      var b = a * sg;
      return "M0," + -a + "L" + b + ",0 0," + a + " " + -b + ",0Z"
    },
    square: function(a) {
      a = Math.sqrt(a) / 2;
      return "M" + -a + "," + -a + "L" + a + "," + -a + " " + a + "," + a + " " + -a + "," + a + "Z"
    },
    "triangle-down": function(a) {
      a = Math.sqrt(a / qc);
      var b = a * qc / 2;
      return "M0," + b + "L" + a + "," + -b + " " + -a + "," + -b + "Z"
    },
    "triangle-up": function(a) {
      a =
        Math.sqrt(a / qc);
      var b = a * qc / 2;
      return "M0," + -b + "L" + a + "," + b + " " + -a + "," + b + "Z"
    }
  });
  k.svg.symbolTypes = rg.keys();
  var qc = Math.sqrt(3),
    sg = Math.tan(30 * B);
  F.transition = function(a) {
    var b = Oa || ++tg;
    a = yd(a);
    for (var c = [], d, e, f = rc || {
        time: Date.now(),
        ease: xh,
        delay: 0,
        duration: 250
      }, g = -1, h = this.length; ++g < h;) {
      c.push(d = []);
      for (var k = this[g], m = -1, n = k.length; ++m < n;)(e = k[m]) && ac(e, m, a, b, f), d.push(e)
    }
    return pb(c, a, b)
  };
  F.interrupt = function(a) {
    return this.each(null == a ? dc : dg(yd(a)))
  };
  var dc = dg(yd()),
    R = [],
    tg = 0,
    Oa, rc;
  R.call = F.call;
  R.empty = F.empty;
  R.node = F.node;
  R.size = F.size;
  k.transition = function(a, b) {
    return a && a.transition ? Oa ? a.transition(b) : a : k.selection().transition(a)
  };
  k.transition.prototype = R;
  R.select = function(a) {
    var b = this.id,
      c = this.namespace,
      d = [],
      e, f, g;
    a = xc(a);
    for (var h = -1, k = this.length; ++h < k;) {
      d.push(e = []);
      for (var m = this[h], n = -1, p = m.length; ++n < p;)(g = m[n]) && (f = a.call(g, g.__data__, n, h)) ? ("__data__" in g && (f.__data__ = g.__data__), ac(f, n, c, b, g[c][b]), e.push(f)) : e.push(null)
    }
    return pb(d, c, b)
  };
  R.selectAll = function(a) {
    var b =
      this.id,
      c = this.namespace,
      d = [],
      e, f, g, h;
    a = Ud(a);
    for (var k = -1, m = this.length; ++k < m;)
      for (var n = this[k], p = -1, q = n.length; ++p < q;)
        if (e = n[p]) {
          h = e[c][b];
          f = a.call(e, e.__data__, p, k);
          d.push(e = []);
          for (var r = -1, t = f.length; ++r < t;)(g = f[r]) && ac(g, r, c, b, h), e.push(g)
        }
    return pb(d, c, b)
  };
  R.filter = function(a) {
    var b = [],
      c, d, e;
    "function" !== typeof a && (a = ae(a));
    for (var f = 0, g = this.length; f < g; f++) {
      b.push(c = []);
      d = this[f];
      for (var h = 0, k = d.length; h < k; h++)(e = d[h]) && a.call(e, e.__data__, h, f) && c.push(e)
    }
    return pb(b, this.namespace, this.id)
  };
  R.tween = function(a, b) {
    var c = this.id,
      d = this.namespace;
    return 2 > arguments.length ? this.node()[d][c].tween.get(a) : la(this, null == b ? function(b) {
      b[d][c].tween.remove(a)
    } : function(e) {
      e[d][c].tween.set(a, b)
    })
  };
  R.attr = function(a, b) {
    function c() {
      this.removeAttribute(h)
    }

    function d() {
      this.removeAttributeNS(h.space, h.local)
    }

    function e(a) {
      return null == a ? c : (a += "", function() {
        var b = this.getAttribute(h),
          c;
        return b !== a && (c = g(b, a), function(a) {
          this.setAttribute(h, c(a))
        })
      })
    }

    function f(a) {
      return null == a ? d : (a += "", function() {
        var b =
          this.getAttributeNS(h.space, h.local),
          c;
        return b !== a && (c = g(b, a), function(a) {
          this.setAttributeNS(h.space, h.local, c(a))
        })
      })
    }
    if (2 > arguments.length) {
      for (b in a) this.attr(b, a[b]);
      return this
    }
    var g = "transform" == a ? vf : Ma,
      h = k.ns.qualify(a);
    return xd(this, "attr." + a, b, h.local ? f : e)
  };
  R.attrTween = function(a, b) {
    function c(a, c) {
      var d = b.call(this, a, c, this.getAttribute(e));
      return d && function(a) {
        this.setAttribute(e, d(a))
      }
    }

    function d(a, c) {
      var d = b.call(this, a, c, this.getAttributeNS(e.space, e.local));
      return d && function(a) {
        this.setAttributeNS(e.space,
          e.local, d(a))
      }
    }
    var e = k.ns.qualify(a);
    return this.tween("attr." + a, e.local ? d : c)
  };
  R.style = function(a, b, c) {
    function d() {
      this.style.removeProperty(a)
    }
    var e = arguments.length;
    if (3 > e) {
      if ("string" !== typeof a) {
        2 > e && (b = "");
        for (c in a) this.style(c, a[c], b);
        return this
      }
      c = ""
    }
    return xd(this, "style." + a, b, function(b) {
      return null == b ? d : (b += "", function() {
        var d = ra(this).getComputedStyle(this, null).getPropertyValue(a),
          e;
        return d !== b && (e = Ma(d, b), function(b) {
          this.style.setProperty(a, e(b), c)
        })
      })
    })
  };
  R.styleTween = function(a,
    b, c) {
    3 > arguments.length && (c = "");
    return this.tween("style." + a, function(d, e) {
      var f = b.call(this, d, e, ra(this).getComputedStyle(this, null).getPropertyValue(a));
      return f && function(b) {
        this.style.setProperty(a, f(b), c)
      }
    })
  };
  R.text = function(a) {
    return xd(this, "text", a, ri)
  };
  R.remove = function() {
    var a = this.namespace;
    return this.each("end.transition", function() {
      var b;
      2 > this[a].count && (b = this.parentNode) && b.removeChild(this)
    })
  };
  R.ease = function(a) {
    var b = this.id,
      c = this.namespace;
    if (1 > arguments.length) return this.node()[c][b].ease;
    "function" !== typeof a && (a = k.ease.apply(k, arguments));
    return la(this, function(d) {
      d[c][b].ease = a
    })
  };
  R.delay = function(a) {
    var b = this.id,
      c = this.namespace;
    return 1 > arguments.length ? this.node()[c][b].delay : la(this, "function" === typeof a ? function(d, e, f) {
      d[c][b].delay = +a.call(d, d.__data__, e, f)
    } : (a = +a, function(d) {
      d[c][b].delay = a
    }))
  };
  R.duration = function(a) {
    var b = this.id,
      c = this.namespace;
    return 1 > arguments.length ? this.node()[c][b].duration : la(this, "function" === typeof a ? function(d, e, f) {
      d[c][b].duration = Math.max(1,
        a.call(d, d.__data__, e, f))
    } : (a = Math.max(1, a), function(d) {
      d[c][b].duration = a
    }))
  };
  R.each = function(a, b) {
    var c = this.id,
      d = this.namespace;
    if (2 > arguments.length) {
      var e = rc,
        f = Oa;
      try {
        Oa = c, la(this, function(b, e, f) {
          rc = b[d][c];
          a.call(b, b.__data__, e, f)
        })
      } finally {
        rc = e, Oa = f
      }
    } else la(this, function(e) {
      e = e[d][c];
      (e.event || (e.event = k.dispatch("start", "end", "interrupt"))).on(a, b)
    });
    return this
  };
  R.transition = function() {
    for (var a = this.id, b = ++tg, c = this.namespace, d = [], e, f, g, h, k = 0, m = this.length; k < m; k++) {
      d.push(e = []);
      f = this[k];
      for (var n = 0, p = f.length; n < p; n++) {
        if (g = f[n]) h = g[c][a], ac(g, n, c, b, {
          time: h.time,
          ease: h.ease,
          delay: h.delay + h.duration,
          duration: h.duration
        });
        e.push(g)
      }
    }
    return pb(d, c, b)
  };
  k.svg.axis = function() {
    function a(a) {
      a.each(function() {
        var a = k.select(this),
          m = this.__chart__ || b,
          q = this.__chart__ = b.copy(),
          r = null == h ? q.ticks ? q.ticks.apply(q, g) : q.domain() : h,
          t = null == l ? q.tickFormat ? q.tickFormat.apply(q, g) : S : l,
          v = a.selectAll(".tick").data(r, q),
          r = v.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1E-6),
          x = k.transition(v.exit()).style("opacity",
            1E-6).remove(),
          u = k.transition(v.order()).style("opacity", 1),
          y = Math.max(d, 0) + f,
          z = Ub(q),
          a = a.selectAll(".domain").data([0]),
          a = (a.enter().append("path").attr("class", "domain"), k.transition(a));
        r.append("line");
        r.append("text");
        var w = r.select("line"),
          C = u.select("line"),
          v = v.select("text").text(t),
          B = r.select("text"),
          E = u.select("text"),
          D = "top" === c || "left" === c ? -1 : 1,
          F, I, H, L;
        "bottom" === c || "top" === c ? (t = si, F = "x", H = "y", I = "x2", L = "y2", v.attr("dy", 0 > D ? "0em" : ".71em").style("text-anchor", "middle"), a.attr("d", "M" + z[0] +
          "," + D * e + "V0H" + z[1] + "V" + D * e)) : (t = ti, F = "y", H = "x", I = "y2", L = "x2", v.attr("dy", ".32em").style("text-anchor", 0 > D ? "end" : "start"), a.attr("d", "M" + D * e + "," + z[0] + "H0V" + z[1] + "H" + D * e));
        w.attr(L, D * d);
        B.attr(H, D * y);
        C.attr(I, 0).attr(L, D * d);
        E.attr(F, 0).attr(H, D * y);
        if (q.rangeBand) var K = q,
          M = K.rangeBand() / 2,
          m = q = function(a) {
            return K(a) + M
          };
        else m.rangeBand ? m = q : x.call(t, q, m);
        r.call(t, m, q);
        u.call(t, q, q)
      })
    }
    var b = k.scale.linear(),
      c = ug,
      d = 6,
      e = 6,
      f = 3,
      g = [10],
      h = null,
      l;
    a.scale = function(c) {
      if (!arguments.length) return b;
      b = c;
      return a
    };
    a.orient = function(b) {
      if (!arguments.length) return c;
      c = b in Qi ? b + "" : ug;
      return a
    };
    a.ticks = function() {
      if (!arguments.length) return g;
      g = ga(arguments);
      return a
    };
    a.tickValues = function(b) {
      if (!arguments.length) return h;
      h = b;
      return a
    };
    a.tickFormat = function(b) {
      if (!arguments.length) return l;
      l = b;
      return a
    };
    a.tickSize = function(b) {
      var c = arguments.length;
      if (!c) return d;
      d = +b;
      e = +arguments[c - 1];
      return a
    };
    a.innerTickSize = function(b) {
      if (!arguments.length) return d;
      d = +b;
      return a
    };
    a.outerTickSize = function(b) {
      if (!arguments.length) return e;
      e = +b;
      return a
    };
    a.tickPadding = function(b) {
      if (!arguments.length) return f;
      f = +b;
      return a
    };
    a.tickSubdivide = function() {
      return arguments.length && a
    };
    return a
  };
  var ug = "bottom",
    Qi = {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
    };
  k.svg.brush = function() {
    function a(f) {
      f.each(function() {
        var f = k.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", e).on("touchstart.brush", e),
          l = f.selectAll(".background").data([0]);
        l.enter().append("rect").attr("class", "background").style("visibility",
          "hidden").style("cursor", "crosshair");
        f.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
        var m = f.selectAll(".resize").data(t, S);
        m.exit().remove();
        m.enter().append("g").attr("class", function(a) {
          return "resize " + a
        }).style("cursor", function(a) {
          return Ri[a]
        }).append("rect").attr("x", function(a) {
          return /[ew]$/.test(a) ? -3 : null
        }).attr("y", function(a) {
          return /^[ns]/.test(a) ? -3 : null
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        m.style("display",
          a.empty() ? "none" : null);
        f = k.transition(f);
        l = k.transition(l);
        g && (m = Ub(g), l.attr("x", m[0]).attr("width", m[1] - m[0]), c(f));
        h && (m = Ub(h), l.attr("y", m[0]).attr("height", m[1] - m[0]), d(f));
        b(f)
      })
    }

    function b(a) {
      a.selectAll(".resize").attr("transform", function(a) {
        return "translate(" + l[+/e$/.test(a)] + "," + m[+/^s/.test(a)] + ")"
      })
    }

    function c(a) {
      a.select(".extent").attr("x", l[0]);
      a.selectAll(".extent,.n>rect,.s>rect").attr("width", l[1] - l[0])
    }

    function d(a) {
      a.select(".extent").attr("y", m[0]);
      a.selectAll(".extent,.e>rect,.w>rect").attr("height",
        m[1] - m[0])
    }

    function e() {
      function e() {
        var a = k.mouse(y),
          f = !1;
        K && (a[0] += K[0], a[1] += K[1]);
        F || (k.event.altKey ? (H || (H = [(l[0] + l[1]) / 2, (m[0] + m[1]) / 2]), L[0] = l[+(a[0] < H[0])], L[1] = m[+(a[1] < H[1])]) : H = null);
        D && t(a, g, 0) && (c(C), f = !0);
        E && t(a, h, 1) && (d(C), f = !0);
        f && (b(C), w({
          type: "brush",
          mode: F ? "move" : "resize"
        }))
      }

      function t(a, b, c) {
        var d = Ub(b);
        b = d[0];
        var e = d[1],
          d = L[c],
          f = c ? m : l,
          g = f[1] - f[0];
        F && (b -= d, e -= g + d);
        a = (c ? r : q) ? Math.max(b, Math.min(e, a[c])) : a[c];
        F ? b = (a += d) + g : (H && (d = Math.max(b, Math.min(e, 2 * H[c] - a))), d < a ? (b = a, a = d) : b =
          d);
        if (f[0] != a || f[1] != b) return c ? p = null : n = null, f[0] = a, f[1] = b, !0
      }

      function u() {
        e();
        C.style("pointer-events", "all").selectAll(".resize").style("display", a.empty() ? "none" : null);
        k.select("body").style("cursor", null);
        M.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        I();
        w({
          type: "brushend"
        })
      }
      var y = this,
        z = k.select(k.event.target),
        w = f.of(y, arguments),
        C = k.select(y),
        B = z.datum(),
        D = !/^(n|s)$/.test(B) && g,
        E = !/^(e|w)$/.test(B) &&
        h,
        F = z.classed("extent"),
        I = ub(y),
        H, L = k.mouse(y),
        K, M = k.select(ra(y)).on("keydown.brush", function() {
          32 == k.event.keyCode && (F || (H = null, L[0] -= l[1], L[1] -= m[1], F = 2), sa())
        }).on("keyup.brush", function() {
          32 == k.event.keyCode && 2 == F && (L[0] += l[1], L[1] += m[1], F = 0, sa())
        });
      if (k.event.changedTouches) M.on("touchmove.brush", e).on("touchend.brush", u);
      else M.on("mousemove.brush", e).on("mouseup.brush", u);
      C.interrupt().selectAll("*").interrupt();
      if (F) L[0] = l[0] - L[0], L[1] = m[0] - L[1];
      else if (B) {
        var O = +/w$/.test(B),
          B = +/^n/.test(B);
        K = [l[1 - O] - L[0], m[1 - B] - L[1]];
        L[0] = l[O];
        L[1] = m[B]
      } else k.event.altKey && (H = L.slice());
      C.style("pointer-events", "none").selectAll(".resize").style("display", null);
      k.select("body").style("cursor", z.style("cursor"));
      w({
        type: "brushstart"
      });
      e()
    }
    var f = wc(a, "brushstart", "brush", "brushend"),
      g = null,
      h = null,
      l = [0, 0],
      m = [0, 0],
      n, p, q = !0,
      r = !0,
      t = Id[0];
    a.event = function(a) {
      a.each(function() {
        var a = f.of(this, arguments),
          b = {
            x: l,
            y: m,
            i: n,
            j: p
          },
          c = this.__chart__ || b;
        this.__chart__ = b;
        Oa ? k.select(this).transition().each("start.brush",
          function() {
            n = c.i;
            p = c.j;
            l = c.x;
            m = c.y;
            a({
              type: "brushstart"
            })
          }).tween("brush:brush", function() {
          var c = Tb(l, b.x),
            d = Tb(m, b.y);
          n = p = null;
          return function(e) {
            l = b.x = c(e);
            m = b.y = d(e);
            a({
              type: "brush",
              mode: "resize"
            })
          }
        }).each("end.brush", function() {
          n = b.i;
          p = b.j;
          a({
            type: "brush",
            mode: "resize"
          });
          a({
            type: "brushend"
          })
        }) : (a({
          type: "brushstart"
        }), a({
          type: "brush",
          mode: "resize"
        }), a({
          type: "brushend"
        }))
      })
    };
    a.x = function(b) {
      if (!arguments.length) return g;
      g = b;
      t = Id[!g << 1 | !h];
      return a
    };
    a.y = function(b) {
      if (!arguments.length) return h;
      h = b;
      t = Id[!g << 1 | !h];
      return a
    };
    a.clamp = function(b) {
      if (!arguments.length) return g && h ? [q, r] : g ? q : h ? r : null;
      g && h ? (q = !!b[0], r = !!b[1]) : g ? q = !!b : h && (r = !!b);
      return a
    };
    a.extent = function(b) {
      var c, d, e, f, k;
      if (!arguments.length) return g && (n ? (c = n[0], d = n[1]) : (c = l[0], d = l[1], g.invert && (c = g.invert(c), d = g.invert(d)), d < c && (k = c, c = d, d = k))), h && (p ? (e = p[0], f = p[1]) : (e = m[0], f = m[1], h.invert && (e = h.invert(e), f = h.invert(f)), f < e && (k = e, e = f, f = k))), g && h ? [
        [c, e],
        [d, f]
      ] : g ? [c, d] : h && [e, f];
      g && (c = b[0], d = b[1], h && (c = c[0], d = d[0]), n = [c, d], g.invert &&
        (c = g(c), d = g(d)), d < c && (k = c, c = d, d = k), c != l[0] || d != l[1]) && (l = [c, d]);
      h && (e = b[0], f = b[1], g && (e = e[1], f = f[1]), p = [e, f], h.invert && (e = h(e), f = h(f)), f < e && (k = e, e = f, f = k), e != m[0] || f != m[1]) && (m = [e, f]);
      return a
    };
    a.clear = function() {
      a.empty() || (l = [0, 0], m = [0, 0], n = p = null);
      return a
    };
    a.empty = function() {
      return !!g && l[0] == l[1] || !!h && m[0] == m[1]
    };
    return k.rebind(a, f, "on")
  };
  var Ri = {
      n: "ns-resize",
      e: "ew-resize",
      s: "ns-resize",
      w: "ew-resize",
      nw: "nwse-resize",
      ne: "nesw-resize",
      se: "nwse-resize",
      sw: "nesw-resize"
    },
    Id = ["n e s w nw ne se sw".split(" "), ["e", "w"],
      ["n", "s"],
      []
    ],
    Jd = w.format = ig.timeFormat,
    vg = Jd.utc,
    wg = vg("%Y-%m-%dT%H:%M:%S.%LZ");
  Jd.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? zd : wg;
  zd.parse = function(a) {
    a = new Date(a);
    return isNaN(a) ? null : a
  };
  zd.toString = wg.toString;
  w.second = Fa(function(a) {
    return new U(1E3 * Math.floor(a / 1E3))
  }, function(a, b) {
    a.setTime(a.getTime() + 1E3 * Math.floor(b))
  }, function(a) {
    return a.getSeconds()
  });
  w.seconds = w.second.range;
  w.seconds.utc = w.second.utc.range;
  w.minute = Fa(function(a) {
    return new U(6E4 *
      Math.floor(a / 6E4))
  }, function(a, b) {
    a.setTime(a.getTime() + 6E4 * Math.floor(b))
  }, function(a) {
    return a.getMinutes()
  });
  w.minutes = w.minute.range;
  w.minutes.utc = w.minute.utc.range;
  w.hour = Fa(function(a) {
    var b = a.getTimezoneOffset() / 60;
    return new U(36E5 * (Math.floor(a / 36E5 - b) + b))
  }, function(a, b) {
    a.setTime(a.getTime() + 36E5 * Math.floor(b))
  }, function(a) {
    return a.getHours()
  });
  w.hours = w.hour.range;
  w.hours.utc = w.hour.utc.range;
  w.month = Fa(function(a) {
    a = w.day(a);
    a.setDate(1);
    return a
  }, function(a, b) {
    a.setMonth(a.getMonth() +
      b)
  }, function(a) {
    return a.getMonth()
  });
  w.months = w.month.range;
  w.months.utc = w.month.utc.range;
  var bc = [1E3, 5E3, 15E3, 3E4, 6E4, 3E5, 9E5, 18E5, 36E5, 108E5, 216E5, 432E5, 864E5, 1728E5, 6048E5, 2592E6, 7776E6, 31536E6],
    Kd = [
      [w.second, 1],
      [w.second, 5],
      [w.second, 15],
      [w.second, 30],
      [w.minute, 1],
      [w.minute, 5],
      [w.minute, 15],
      [w.minute, 30],
      [w.hour, 1],
      [w.hour, 3],
      [w.hour, 6],
      [w.hour, 12],
      [w.day, 1],
      [w.day, 2],
      [w.week, 1],
      [w.month, 1],
      [w.month, 3],
      [w.year, 1]
    ],
    Si = Jd.multi([
      [".%L", function(a) {
        return a.getMilliseconds()
      }],
      [":%S", function(a) {
        return a.getSeconds()
      }],
      ["%I:%M", function(a) {
        return a.getMinutes()
      }],
      ["%I %p", function(a) {
        return a.getHours()
      }],
      ["%a %d", function(a) {
        return a.getDay() && 1 != a.getDate()
      }],
      ["%b %d", function(a) {
        return 1 != a.getDate()
      }],
      ["%B", function(a) {
        return a.getMonth()
      }],
      ["%Y", eb]
    ]),
    ui = {
      range: function(a, b, c) {
        return k.range(Math.ceil(a / c) * c, +b, c).map(Na)
      },
      floor: S,
      ceil: S
    };
  Kd.year = w.year;
  w.scale = function() {
    return Ad(k.scale.linear(), Kd, Si)
  };
  var xg = Kd.map(function(a) {
      return [a[0].utc, a[1]]
    }),
    Ti = vg.multi([
      [".%L", function(a) {
        return a.getUTCMilliseconds()
      }],
      [":%S", function(a) {
        return a.getUTCSeconds()
      }],
      ["%I:%M", function(a) {
        return a.getUTCMinutes()
      }],
      ["%I %p", function(a) {
        return a.getUTCHours()
      }],
      ["%a %d", function(a) {
        return a.getUTCDay() && 1 != a.getUTCDate()
      }],
      ["%b %d", function(a) {
        return 1 != a.getUTCDate()
      }],
      ["%B", function(a) {
        return a.getUTCMonth()
      }],
      ["%Y", eb]
    ]);
  xg.year = w.year.utc;
  w.scale.utc = function() {
    return Ad(k.scale.linear(), xg, Ti)
  };
  k.text = Lc(function(a) {
    return a.responseText
  });
  k.json = function(a, b) {
    return xb(a, "application/json", vi, b)
  };
  k.html = function(a,
    b) {
    return xb(a, "text/html", wi, b)
  };
  k.xml = Lc(function(a) {
    return a.responseXML
  });
  "function" === typeof define && define.amd ? (this.d3 = k, define(k)) : "object" === typeof module && module.exports ? module.exports = k : this.d3 = k
}();
