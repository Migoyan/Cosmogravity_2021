/*

 jsPDF addImage plugin
 Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
               2013 Chris Dowling, https://github.com/gingerchris
               2013 Trinh Ho, https://github.com/ineedfat
               2013 Edwin Alejandro Perez, https://github.com/eaparango
               2013 Norah Smith, https://github.com/burnburnrocket
               2014 Diego Casorran, https://github.com/diegocr
               2014 James Robb, https://github.com/jamesbrobb

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(h) {
  var C = ["jpeg", "jpg", "png"],
    D = function(a) {
      var c = this.internal.newObject(),
        d = this.internal.write,
        k = this.internal.putStream;
      a.n = c;
      d("<</Type /XObject");
      d("/Subtype /Image");
      d("/Width " + a.w);
      d("/Height " + a.h);
      a.cs === this.color_spaces.INDEXED ? d("/ColorSpace [/Indexed /DeviceRGB " + (a.pal.length / 3 - 1) + " " + ("smask" in a ? c + 2 : c + 1) + " 0 R]") : (d("/ColorSpace /" + a.cs), a.cs === this.color_spaces.DEVICE_CMYK && d("/Decode [1 0 1 0 1 0 1 0]"));
      d("/BitsPerComponent " + a.bpc);
      "f" in a && d("/Filter /" + a.f);
      "dp" in
      a && d("/DecodeParms <<" + a.dp + ">>");
      if ("trns" in a && a.trns.constructor == Array) {
        for (var e = "", h = 0, b = a.trns.length; h < b; h++) e += a.trns[h] + " " + a.trns[h] + " ";
        d("/Mask [" + e + "]")
      }
      "smask" in a && d("/SMask " + (c + 1) + " 0 R");
      d("/Length " + a.data.length + ">>");
      k(a.data);
      d("endobj");
      "smask" in a && (c = {
        w: a.w,
        h: a.h,
        cs: "DeviceGray",
        bpc: a.bpc,
        dp: "/Predictor 15 /Colors 1 /BitsPerComponent " + a.bpc + " /Columns " + a.w,
        data: a.smask
      }, "f" in a && (c.f = a.f), D.call(this, c));
      a.cs === this.color_spaces.INDEXED && (this.internal.newObject(), d("<< /Length " +
        a.pal.length + ">>"), k(this.arrayBufferToBinaryString(new Uint8Array(a.pal))), d("endobj"))
    },
    F = function() {
      var a = this.internal.collections.addImage_images,
        c;
      for (c in a) D.call(this, a[c])
    },
    G = function() {
      var a = this.internal.collections.addImage_images,
        c = this.internal.write,
        d, k;
      for (k in a) d = a[k], c("/I" + d.i, d.n, "0", "R")
    },
    H = function(a) {
      a && "string" === typeof a && (a = a.toUpperCase());
      return a in h.image_compression ? a : h.image_compression.NONE
    },
    I = function(a) {
      var c = 0;
      if (a) {
        if (Object.keys) a = Object.keys(a).length;
        else {
          var c =
            0,
            d;
          for (d in a) a.hasOwnProperty(d) && c++;
          a = c
        }
        c = a
      }
      return c
    },
    E = function(a, c) {
      var d;
      if (c)
        for (var k in c)
          if (a === c[k].alias) {
            d = c[k];
            break
          }
      return d
    };
  h.color_spaces = {
    DEVICE_RGB: "DeviceRGB",
    DEVICE_GRAY: "DeviceGray",
    DEVICE_CMYK: "DeviceCMYK",
    CAL_GREY: "CalGray",
    CAL_RGB: "CalRGB",
    LAB: "Lab",
    ICC_BASED: "ICCBased",
    INDEXED: "Indexed",
    PATTERN: "Pattern",
    SEPERATION: "Seperation",
    DEVICE_N: "DeviceN"
  };
  h.decode = {
    DCT_DECODE: "DCTDecode",
    FLATE_DECODE: "FlateDecode",
    LZW_DECODE: "LZWDecode",
    JPX_DECODE: "JPXDecode",
    JBIG2_DECODE: "JBIG2Decode",
    ASCII85_DECODE: "ASCII85Decode",
    ASCII_HEX_DECODE: "ASCIIHexDecode",
    RUN_LENGTH_DECODE: "RunLengthDecode",
    CCITT_FAX_DECODE: "CCITTFaxDecode"
  };
  h.image_compression = {
    NONE: "NONE",
    FAST: "FAST",
    MEDIUM: "MEDIUM",
    SLOW: "SLOW"
  };
  h.sHashCode = function(a) {
    return Array.prototype.reduce && a.split("").reduce(function(a, d) {
      a = (a << 5) - a + d.charCodeAt(0);
      return a & a
    }, 0)
  };
  h.isString = function(a) {
    return "string" === typeof a
  };
  h.extractInfoFromBase64DataURI = function(a) {
    return /^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(a)
  };
  h.supportsArrayBuffer =
    function() {
      return "undefined" !== typeof ArrayBuffer && "undefined" !== typeof Uint8Array
    };
  h.isArrayBuffer = function(a) {
    return this.supportsArrayBuffer() ? a instanceof ArrayBuffer : !1
  };
  h.isArrayBufferView = function(a) {
    return this.supportsArrayBuffer() && "undefined" !== typeof Uint32Array ? a instanceof Int8Array || a instanceof Uint8Array || "undefined" !== typeof Uint8ClampedArray && a instanceof Uint8ClampedArray || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof
    Float32Array || a instanceof Float64Array: !1
  };
  h.binaryStringToUint8Array = function(a) {
    for (var c = a.length, d = new Uint8Array(c), k = 0; k < c; k++) d[k] = a.charCodeAt(k);
    return d
  };
  h.arrayBufferToBinaryString = function(a) {
    if ("TextDecoder" in window) return (new TextDecoder("ascii")).decode(a);
    this.isArrayBuffer(a) && (a = new Uint8Array(a));
    for (var c = "", d = a.byteLength, k = 0; k < d; k++) c += String.fromCharCode(a[k]);
    return c
  };
  h.arrayBufferToBase64 = function(a) {
    var c = "";
    a = new Uint8Array(a);
    for (var d = a.byteLength, k = d % 3, d = d - k, e, h, b,
        g, n = 0; n < d; n += 3) g = a[n] << 16 | a[n + 1] << 8 | a[n + 2], e = (g & 16515072) >> 18, h = (g & 258048) >> 12, b = (g & 4032) >> 6, g &= 63, c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [e] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [b] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [g];
    1 == k ? (g = a[d], c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g &
      3) << 4] + "==") : 2 == k && (g = a[d] << 8 | a[d + 1], c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 15) << 2] + "=");
    return c
  };
  h.createImageInfo = function(a, c, d, k, e, h, b, g, n, l, f, v) {
    a = {
      alias: g,
      w: c,
      h: d,
      cs: k,
      bpc: e,
      i: b,
      data: a
    };
    h && (a.f = h);
    n && (a.dp = n);
    l && (a.trns = l);
    f && (a.pal = f);
    v && (a.smask = v);
    return a
  };
  h.addImage = function(a, c, d, k, e, w, b, g, n) {
    if ("string" !==
      typeof c) {
      var l = w;
      w = e;
      e = k;
      k = d;
      d = c;
      c = l
    }
    "object" === typeof a && ("object" !== typeof a || 1 !== a.nodeType) && "imageData" in a && (l = a, a = l.imageData, c = l.format || c, d = l.x || d || 0, k = l.y || k || 0, e = l.w || e, w = l.h || w, b = l.alias || b, g = l.compression || g, n = l.rotation || l.angle || n);
    if (isNaN(d) || isNaN(k)) throw console.error("jsPDF.addImage: Invalid coordinates", arguments), Error("Invalid coordinates passed to jsPDF.addImage");
    l = this.internal.collections.addImage_images;
    l || (this.internal.collections.addImage_images = l = {}, this.internal.events.subscribe("putResources",
      F), this.internal.events.subscribe("putXobjectDict", G));
    var f;
    if (!(f = E(a, l))) {
      var v;
      if ("object" === typeof a && 1 === a.nodeType) a: {
        f = a;
        var q = c,
          t = n;
        if ("IMG" === f.nodeName && f.hasAttribute("src")) {
          var m = "" + f.getAttribute("src");
          if (!t && 0 === m.indexOf("data:image/")) {
            a = m;
            break a
          }!q && /\.png(?:[?#].*)?$/i.test(m) && (q = "png")
        }
        if ("CANVAS" === f.nodeName) m = f;
        else {
          m = document.createElement("canvas");
          m.width = f.clientWidth || f.width;
          m.height = f.clientHeight || f.height;
          var p = m.getContext("2d");
          if (!p) throw "addImage requires canvas to be supported by browser.";
          if (t) {
            var u, r, z, x, A, B;
            x = Math.PI / 180;
            var y;
            "object" === typeof t && (u = t.x, r = t.y, z = t.bg, t = t.angle);
            y = t * x;
            t = Math.abs(Math.cos(y));
            x = Math.abs(Math.sin(y));
            A = m.width;
            B = m.height;
            m.width = B * x + A * t;
            m.height = B * t + A * x;
            isNaN(u) && (u = m.width / 2);
            isNaN(r) && (r = m.height / 2);
            p.clearRect(0, 0, m.width, m.height);
            p.fillStyle = z || "white";
            p.fillRect(0, 0, m.width, m.height);
            p.save();
            p.translate(u, r);
            p.rotate(y);
            p.drawImage(f, -(A / 2), -(B / 2));
            p.rotate(-y);
            p.translate(-u, -r);
            p.restore()
          } else p.drawImage(f, 0, 0, m.width, m.height)
        }
        a = m.toDataURL("png" ==
          ("" + q).toLowerCase() ? "image/png" : "image/jpeg")
      }
      if ("undefined" === typeof b || null === b) b = "string" === typeof a && h.sHashCode(a);
      if (!(f = E(b, l))) {
        this.isString(a) && ((u = this.extractInfoFromBase64DataURI(a)) ? (c = u[2], a = atob(u[3])) : 137 === a.charCodeAt(0) && 80 === a.charCodeAt(1) && 78 === a.charCodeAt(2) && 71 === a.charCodeAt(3) && (c = "png"));
        c = (c || "JPEG").toLowerCase();
        if (-1 === C.indexOf(c)) throw Error("addImage currently only supports formats " + C + ", not '" + c + "'");
        if ("function" !== typeof h["process" + c.toUpperCase()]) throw Error("please ensure that the plugin for '" +
          c + "' support is added");
        !this.supportsArrayBuffer() || a instanceof Uint8Array || (v = a, a = this.binaryStringToUint8Array(a));
        f = this["process" + c.toUpperCase()](a, I(l), b, H(g), v);
        if (!f) throw Error("An unkwown error occurred whilst processing the image");
      }
    }
    v = d;
    u = k;
    r = f;
    z = f.i;
    f = e;
    q = w;
    f || q || (q = f = -96);
    0 > f && (f = -72 * r.w / f / this.internal.scaleFactor);
    0 > q && (q = -72 * r.h / q / this.internal.scaleFactor);
    0 === f && (f = q * r.w / r.h);
    0 === q && (q = f * r.h / r.w);
    p = [f, q];
    q = this.internal.getCoordinateString;
    m = this.internal.getVerticalCoordinateString;
    f = p[0];
    p = p[1];
    l[z] = r;
    this.internal.write("q", q(f), "0 0", q(p), q(v), m(u + p), "cm /I" + r.i, "Do Q");
    return this
  };
  h.processJPEG = function(a, c, d, k, e) {
    k = this.color_spaces.DEVICE_RGB;
    var h = this.decode.DCT_DECODE,
      b;
    if (this.isString(a)) {
      a: {
        e = a;
        var g, n;
        if (255 === !e.charCodeAt(0) || 216 === !e.charCodeAt(1) || 255 === !e.charCodeAt(2) || 224 === !e.charCodeAt(3) || 74 === !e.charCodeAt(6) || 70 === !e.charCodeAt(7) || 73 === !e.charCodeAt(8) || 70 === !e.charCodeAt(9) || 0 === !e.charCodeAt(10)) throw Error("getJpegSize requires a binary string jpeg file");
        g = 256 * e.charCodeAt(4) + e.charCodeAt(5);b = 4;
        for (n = e.length; b < n;) {
          b += g;
          if (255 !== e.charCodeAt(b)) throw Error("getJpegSize could not find the size of the image");
          if (192 === e.charCodeAt(b + 1) || 193 === e.charCodeAt(b + 1) || 194 === e.charCodeAt(b + 1) || 195 === e.charCodeAt(b + 1) || 196 === e.charCodeAt(b + 1) || 197 === e.charCodeAt(b + 1) || 198 === e.charCodeAt(b + 1) || 199 === e.charCodeAt(b + 1)) {
            n = 256 * e.charCodeAt(b + 5) + e.charCodeAt(b + 6);
            g = 256 * e.charCodeAt(b + 7) + e.charCodeAt(b + 8);
            e = e.charCodeAt(b + 9);
            b = [g, n, e];
            break a
          } else b += 2, g = 256 * e.charCodeAt(b) +
            e.charCodeAt(b + 1)
        }
        b = void 0
      }
      return this.createImageInfo(a, b[0], b[1], 1 == b[3] ? this.color_spaces.DEVICE_GRAY : k, 8, h, c, d)
    }
    this.isArrayBuffer(a) && (a = new Uint8Array(a));
    if (this.isArrayBufferView(a)) {
      a: {
        g = a;
        if (65496 !== (g[0] << 8 | g[1])) throw Error("Supplied data is not a JPEG");n = g.length;
        for (var l = (g[4] << 8) + g[5], f = 4; f < n;) {
          f += l;
          b = g.subarray(f, f + 5);
          l = (b[2] << 8) + b[3];
          if ((192 === b[1] || 194 === b[1]) && 255 === b[0] && 7 < l) {
            b = f + 5;
            b = g.subarray(b, b + 5);
            g = (b[2] << 8) + b[3];
            n = (b[0] << 8) + b[1];
            b = b[4];
            b = {
              width: g,
              height: n,
              numcomponents: b
            };
            break a
          }
          f += 2
        }
        throw Error("getJpegSizeFromBytes could not find the size of the image");
      }
      a = e || this.arrayBufferToBinaryString(a);
      return this.createImageInfo(a, b.width, b.height, 1 == b.numcomponents ? this.color_spaces.DEVICE_GRAY : k, 8, h, c, d)
    }
    return null
  };
  h.processJPG = function() {
    return this.processJPEG.apply(this, arguments)
  }
})(jsPDF.API);
