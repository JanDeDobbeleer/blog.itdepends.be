/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/*
  Copyright (C) 2013 Gregory Schier <gschier1990@gmail.com>
  Copyright (C) 2013 Martin Zimmermann <info@posativ.org>

  Inspired by http://codepen.io/gschier/pen/GLvAy
*/

/*
 * Copyright 2014, Martin Zimmermann <info@posativ.org>. All rights reserved.
 * Distributed under the MIT license
 */

! function () {
    var requirejs, require, define;
    ! function (e) {
        function t(e, t) {
            return b.call(e, t)
        }

        function n(e, t) {
            var n, o, a, i, r, s, m, c, d, l, u, p = t && t.split("/"),
                f = h.map,
                v = f && f["*"] || {};
            if (e && "." === e.charAt(0))
                if (t) {
                    for (e = e.split("/"), r = e.length - 1, h.nodeIdCompat && g.test(e[r]) && (e[r] = e[r].replace(g, "")), e = p.slice(0, p.length - 1).concat(e), d = 0; d < e.length; d += 1)
                        if (u = e[d], "." === u) e.splice(d, 1), d -= 1;
                        else if (".." === u) {
                        if (1 === d && (".." === e[2] || ".." === e[0])) break;
                        d > 0 && (e.splice(d - 1, 2), d -= 2)
                    }
                    e = e.join("/")
                } else 0 === e.indexOf("./") && (e = e.substring(2));
            if ((p || v) && f) {
                for (n = e.split("/"), d = n.length; d > 0; d -= 1) {
                    if (o = n.slice(0, d).join("/"), p)
                        for (l = p.length; l > 0; l -= 1)
                            if (a = f[p.slice(0, l).join("/")], a && (a = a[o])) {
                                i = a, s = d;
                                break
                            }
                    if (i) break;
                    !m && v && v[o] && (m = v[o], c = d)
                }!i && m && (i = m, s = c), i && (n.splice(0, s, i), e = n.join("/"))
            }
            return e
        }

        function o(t, n) {
            return function () {
                var o = x.call(arguments, 0);
                return "string" != typeof o[0] && 1 === o.length && o.push(null), d.apply(e, o.concat([t, n]))
            }
        }

        function a(e) {
            return function (t) {
                return n(t, e)
            }
        }

        function i(e) {
            return function (t) {
                p[e] = t
            }
        }

        function r(n) {
            if (t(f, n)) {
                var o = f[n];
                delete f[n], v[n] = !0, c.apply(e, o)
            }
            if (!t(p, n) && !t(v, n)) throw new Error("No " + n);
            return p[n]
        }

        function s(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function m(e) {
            return function () {
                return h && h.config && h.config[e] || {}
            }
        }
        var c, d, l, u, p = {},
            f = {},
            h = {},
            v = {},
            b = Object.prototype.hasOwnProperty,
            x = [].slice,
            g = /\.js$/;
        l = function (e, t) {
            var o, i = s(e),
                m = i[0];
            return e = i[1], m && (m = n(m, t), o = r(m)), m ? e = o && o.normalize ? o.normalize(e, a(t)) : n(e, t) : (e = n(e, t), i = s(e), m = i[0], e = i[1], m && (o = r(m))), {
                f: m ? m + "!" + e : e,
                n: e,
                pr: m,
                p: o
            }
        }, u = {
            require: function (e) {
                return o(e)
            },
            exports: function (e) {
                var t = p[e];
                return "undefined" != typeof t ? t : p[e] = {}
            },
            module: function (e) {
                return {
                    id: e,
                    uri: "",
                    exports: p[e],
                    config: m(e)
                }
            }
        }, c = function (n, a, s, m) {
            var c, d, h, b, x, g, w = [],
                y = typeof s;
            if (m = m || n, "undefined" === y || "function" === y) {
                for (a = !a.length && s.length ? ["require", "exports", "module"] : a, x = 0; x < a.length; x += 1)
                    if (b = l(a[x], m), d = b.f, "require" === d) w[x] = u.require(n);
                    else if ("exports" === d) w[x] = u.exports(n), g = !0;
                else if ("module" === d) c = w[x] = u.module(n);
                else if (t(p, d) || t(f, d) || t(v, d)) w[x] = r(d);
                else {
                    if (!b.p) throw new Error(n + " missing " + d);
                    b.p.load(b.n, o(m, !0), i(d), {}), w[x] = p[d]
                }
                h = s ? s.apply(p[n], w) : void 0, n && (c && c.exports !== e && c.exports !== p[n] ? p[n] = c.exports : h === e && g || (p[n] = h))
            } else n && (p[n] = s)
        }, requirejs = require = d = function (t, n, o, a, i) {
            if ("string" == typeof t) return u[t] ? u[t](n) : r(l(t, n).f);
            if (!t.splice) {
                if (h = t, h.deps && d(h.deps, h.callback), !n) return;
                n.splice ? (t = n, n = o, o = null) : t = e
            }
            return n = n || function () {}, "function" == typeof o && (o = a, a = i), a ? c(e, t, n, o) : setTimeout(function () {
                c(e, t, n, o)
            }, 4), d
        }, d.config = function (e) {
            return d(e)
        }, requirejs._defined = p, define = function (e, n, o) {
            if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
            n.splice || (o = n, n = []), t(p, e) || t(f, e) || (f[e] = [e, n, o])
        }, define.amd = {
            jQuery: !0
        }
    }(), define("components/almond/almond", function () {}), define("app/lib/ready", [], function () {
            "use strict";
            var e = !1,
                t = function (t) {
                    e || (e = !0, t())
                },
                n = function (e) {
                    document.addEventListener("DOMContentLoaded", function () {
                        t(e)
                    }), ("interactive" === document.readyState || "complete" === document.readyState) && t(e)
                };
            return n
        }), define("app/config", [], function () {
            "use strict";
            for (var e = {
                    css: !0,
                    lang: (navigator.language || navigator.userLanguage).split("-")[0],
                    "reply-to-self": !1,
                    "require-email": !1,
                    "require-author": !1,
                    "max-comments-top": "inf",
                    "max-comments-nested": 5,
                    "reveal-on-click": 5,
                    avatar: !0,
                    "avatar-bg": "#f0f0f0",
                    "avatar-fg": ["#9abf88", "#5698c4", "#e279a3", "#9163b6", "#be5168", "#f19670", "#e4bf80", "#447c69"].join(" "),
                    vote: !0,
                    "vote-levels": null
                }, t = document.getElementsByTagName("script"), n = 0; n < t.length; n++)
                for (var o = 0; o < t[n].attributes.length; o++) {
                    var a = t[n].attributes[o];
                    if (/^data-isso-/.test(a.name)) try {
                        e[a.name.substring(10)] = JSON.parse(a.value)
                    } catch (i) {
                        e[a.name.substring(10)] = a.value
                    }
                }
            return e["avatar-fg"] = e["avatar-fg"].split(" "), e
        }), define("app/i18n/bg", {
            "postbox-text": "Ð’ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð° ÑÐ¸ Ñ‚ÑƒÐº (Ð¿Ð¾Ð½Ðµ 3 Ð·Ð½Ð°ÐºÐ°)",
            "postbox-author": "Ð˜Ð¼Ðµ/Ð¿ÑÐµÐ²Ð´Ð¾Ð½Ð¸Ð¼ (Ð½ÐµÐ·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾)",
            "postbox-email": "Ð•Ð». Ð¿Ð¾Ñ‰Ð° (Ð½ÐµÐ·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾)",
            "postbox-website": "Ð£ÐµÐ±ÑÐ°Ð¹Ñ‚ (Ð½ÐµÐ·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾)",
            "postbox-submit": "ÐŸÑƒÐ±Ð»Ð¸ÐºÑƒÐ²Ð°Ð½Ðµ",
            "num-comments": "1 ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€\n{{ n }} ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð°",
            "no-comments": "Ð’ÑÐµ Ð¾Ñ‰Ðµ Ð½ÑÐ¼Ð° ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸",
            "comment-reply": "ÐžÑ‚Ð³Ð¾Ð²Ð¾Ñ€",
            "comment-edit": "Ð ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð°Ð½Ðµ",
            "comment-save": "Ð—Ð°Ð¿Ð¸Ñ",
            "comment-delete": "Ð˜Ð·Ñ‚Ñ€Ð¸Ð²Ð°Ð½Ðµ",
            "comment-confirm": "ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ",
            "comment-close": "Ð—Ð°Ñ‚Ð²Ð°Ñ€ÑÐ½Ðµ",
            "comment-cancel": "ÐžÑ‚ÐºÐ°Ð·",
            "comment-deleted": "ÐšÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€ÑŠÑ‚ Ðµ Ð¸Ð·Ñ‚Ñ€Ð¸Ñ‚.",
            "comment-queued": "ÐšÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€ÑŠÑ‚ Ñ‡Ð°ÐºÐ° Ð½Ð° Ð¾Ð¿Ð°ÑˆÐºÐ°Ñ‚Ð° Ð·Ð° Ð¼Ð¾Ð´ÐµÑ€Ð¸Ñ€Ð°Ð½Ðµ.",
            "comment-anonymous": "Ð°Ð½Ð¾Ð½Ð¸Ð¼ÐµÐ½",
            "comment-hidden": "{{ n }} ÑÐºÑ€Ð¸Ñ‚Ð¸",
            "date-now": "ÑÐµÐ³Ð°",
            "date-minute": "Ð¿Ñ€ÐµÐ´Ð¸ 1 Ð¼Ð¸Ð½ÑƒÑ‚Ð°\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} Ð¼Ð¸Ð½ÑƒÑ‚Ð¸",
            "date-hour": "Ð¿Ñ€ÐµÐ´Ð¸ 1 Ñ‡Ð°Ñ\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} Ñ‡Ð°ÑÐ°",
            "date-day": "Ð²Ñ‡ÐµÑ€Ð°\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} Ð´Ð½Ð¸",
            "date-week": "Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ‚Ð° ÑÐµÐ´Ð¼Ð¸Ñ†Ð°\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} ÑÐµÐ´Ð¼Ð¸Ñ†Ð¸",
            "date-month": "Ð¼Ð¸Ð½Ð°Ð»Ð¸Ñ Ð¼ÐµÑÐµÑ†\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} Ð¼ÐµÑÐµÑ†Ð°",
            "date-year": "Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ‚Ð° Ð³Ð¾Ð´Ð¸Ð½Ð°\nÐ¿Ñ€ÐµÐ´Ð¸ {{ n }} Ð³Ð¾Ð´Ð¸Ð½Ð¸"
        }), define("app/i18n/cs", {
            "postbox-text": "Sem napiÅ¡tÄ› svÅ¯j komentÃ¡Å™ (nejmÃ©nÄ› 3 znaky)",
            "postbox-author": "JmÃ©no (nepovinnÃ©)",
            "postbox-email": "E-mail (nepovinnÃ½)",
            "postbox-website": "Web (nepovinnÃ½)",
            "postbox-submit": "Publikovat",
            "num-comments": "Jeden komentÃ¡Å™\n{{ n }} KomentÃ¡Å™Å¯",
            "no-comments": "ZatÃ­m bez komentÃ¡Å™Å¯",
            "comment-reply": "OdpovÄ›dÄ›t",
            "comment-edit": "Upravit",
            "comment-save": "UloÅ¾it",
            "comment-delete": "Smazat",
            "comment-confirm": "Potvrdit",
            "comment-close": "ZavÅ™Ã­t",
            "comment-cancel": "ZruÅ¡it",
            "comment-deleted": "KomentÃ¡Å™ smazÃ¡n",
            "comment-queued": "KomentÃ¡Å™ ve frontÄ› na schvÃ¡lenÃ­",
            "comment-anonymous": "Anonym",
            "comment-hidden": "{{ n }} skryto",
            "date-now": "prÃ¡vÄ› teÄ",
            "date-minute": "pÅ™ed minutou\npÅ™ed {{ n }} minutami",
            "date-hour": "pÅ™ed hodinou\npÅ™ed {{ n }} hodinami",
            "date-day": "vÄera\npÅ™ed {{ n }} dny",
            "date-week": "minulÃ½ tÃ½den\npÅ™ed {{ n }} tÃ½dny",
            "date-month": "minulÃ½ mÄ›sÃ­c\npÅ™ed {{ n }} mÄ›sÃ­ci",
            "date-year": "minulÃ½ rok\npÅ™ed {{ n }} lety"
        }), define("app/i18n/de", {
            "postbox-text": "Kommentar hier eintippen (mindestens 3 Zeichen)",
            "postbox-author": "Name (optional)",
            "postbox-email": "Email (optional)",
            "postbox-website": "Website (optional)",
            "postbox-submit": "Abschicken",
            "num-comments": "1 Kommentar\n{{ n }} Kommentare",
            "no-comments": "Keine Kommentare bis jetzt",
            "comment-reply": "Antworten",
            "comment-edit": "Bearbeiten",
            "comment-save": "Speichern",
            "comment-delete": "LÃ¶schen",
            "comment-confirm": "BestÃ¤tigen",
            "comment-close": "SchlieÃŸen",
            "comment-cancel": "Abbrechen",
            "comment-deleted": "Kommentar gelÃ¶scht.",
            "comment-queued": "Kommentar muss noch freigeschaltet werden.",
            "comment-anonymous": "Anonym",
            "comment-hidden": "{{ n }} versteckt",
            "date-now": "eben jetzt",
            "date-minute": "vor einer Minute\nvor {{ n }} Minuten",
            "date-hour": "vor einer Stunde\nvor {{ n }} Stunden",
            "date-day": "Gestern\nvor {{ n }} Tagen",
            "date-week": "letzte Woche\nvor {{ n }} Wochen",
            "date-month": "letzten Monat\nvor {{ n }} Monaten",
            "date-year": "letztes Jahr\nvor {{ n }} Jahren"
        }), define("app/i18n/en", {
            "postbox-text": "Type Comment Here (at least 3 chars)",
            "postbox-author": "Name (optional)",
            "postbox-email": "E-mail (optional)",
            "postbox-website": "Website (optional)",
            "postbox-submit": "Submit",
            "num-comments": "One Comment\n{{ n }} Comments",
            "no-comments": "No Comments Yet",
            "comment-reply": "Reply",
            "comment-edit": "Edit",
            "comment-save": "Save",
            "comment-delete": "Delete",
            "comment-confirm": "Confirm",
            "comment-close": "Close",
            "comment-cancel": "Cancel",
            "comment-deleted": "Comment deleted.",
            "comment-queued": "Comment in queue for moderation.",
            "comment-anonymous": "Anonymous",
            "comment-hidden": "{{ n }} Hidden",
            "date-now": "right now",
            "date-minute": "a minute ago\n{{ n }} minutes ago",
            "date-hour": "an hour ago\n{{ n }} hours ago",
            "date-day": "Yesterday\n{{ n }} days ago",
            "date-week": "last week\n{{ n }} weeks ago",
            "date-month": "last month\n{{ n }} months ago",
            "date-year": "last year\n{{ n }} years ago"
        }), define("app/i18n/fi", {
            "postbox-text": "Kirjoita kommentti tÃ¤hÃ¤n (vÃ¤hintÃ¤Ã¤n 3 merkkiÃ¤)",
            "postbox-author": "Nimi (valinnainen)",
            "postbox-email": "SÃ¤hkÃ¶posti (valinnainen)",
            "postbox-website": "Web-sivu (valinnainen)",
            "postbox-submit": "LÃ¤hetÃ¤",
            "num-comments": "Yksi kommentti\n{{ n }} kommenttia",
            "no-comments": "Ei vielÃ¤ kommentteja",
            "comment-reply": "Vastaa",
            "comment-edit": "Muokkaa",
            "comment-save": "Tallenna",
            "comment-delete": "Poista",
            "comment-confirm": "Vahvista",
            "comment-close": "Sulje",
            "comment-cancel": "Peru",
            "comment-deleted": "Kommentti on poistettu.",
            "comment-queued": "Kommentti on laitettu jonoon odottamaan moderointia.",
            "comment-anonymous": "NimetÃ¶n",
            "comment-hidden": "{{ n }} piilotettua",
            "date-now": "hetki sitten",
            "date-minute": "minuutti sitten\n{{ n }} minuuttia sitten",
            "date-hour": "tunti sitten\n{{ n }} tuntia sitten",
            "date-day": "eilen\n{{ n }} pÃ¤ivÃ¤Ã¤ sitten",
            "date-week": "viime viikolla\n{{ n }} viikkoa sitten",
            "date-month": "viime kuussa\n{{ n }} kuukautta sitten",
            "date-year": "viime vuonna\n{{ n }} vuotta sitten"
        }), define("app/i18n/fr", {
            "postbox-text": "InsÃ©rez votre commentaire ici (au moins 3 lettres)",
            "postbox-author": "Nom (optionnel)",
            "postbox-email": "Courriel (optionnel)",
            "postbox-website": "Site web (optionnel)",
            "postbox-submit": "Soumettre",
            "num-comments": "{{ n }} commentaire\n{{ n }} commentaires",
            "no-comments": "Aucun commentaire pour l'instant",
            "comment-reply": "RÃ©pondre",
            "comment-edit": "Ã‰diter",
            "comment-save": "Enregistrer",
            "comment-delete": "Supprimer",
            "comment-confirm": "Confirmer",
            "comment-close": "Fermer",
            "comment-cancel": "Annuler",
            "comment-deleted": "Commentaire supprimÃ©.",
            "comment-queued": "Commentaire en attente de modÃ©ration.",
            "comment-anonymous": "Anonyme",
            "comment-hidden": "1 cachÃ©\n{{ n }} cachÃ©s",
            "date-now": "Ã€ l'instant",
            "date-minute": "Il y a une minute\nIl y a {{ n }} minutes",
            "date-hour": "Il y a une heure\nIl y a {{ n }} heures ",
            "date-day": "Hier\nIl y a {{ n }} jours",
            "date-week": "Il y a une semaine\nIl y a {{ n }} semaines",
            "date-month": "Il y a un mois\nIl y a {{ n }} mois",
            "date-year": "Il y a un an\nIl y a {{ n }} ans"
        }), define("app/i18n/hr", {
            "postbox-text": "NapiÅ¡i komentar ovdje (najmanje 3 znaka)",
            "postbox-author": "Ime (neobavezno)",
            "postbox-email": "E-mail (neobavezno)",
            "postbox-website": "Web stranica (neobavezno)",
            "postbox-submit": "PoÅ¡alji",
            "num-comments": "Jedan komentar\n{{ n }} komentara",
            "no-comments": "JoÅ¡ nema komentara",
            "comment-reply": "Odgovori",
            "comment-edit": "Uredi",
            "comment-save": "Spremi",
            "comment-delete": "ObriÅ¡i",
            "comment-confirm": "Potvrdi",
            "comment-close": "Zatvori",
            "comment-cancel": "Odustani",
            "comment-deleted": "Komentar obrisan",
            "comment-queued": "Komentar u redu za provjeru.",
            "comment-anonymous": "Anonimno",
            "comment-hidden": "{{ n }} Skrivenih",
            "date-now": "upravo",
            "date-minute": "prije minutu\nprije {{ n }} minuta",
            "date-hour": "prije sat vremena\nprije {{ n }} sati",
            "date-day": "juÄer\nprije {{ n }} dana",
            "date-week": "proÅ¡li tjedan\nprije {{ n }} tjedana",
            "date-month": "proÅ¡li mjesec\nprije {{ n }} mjeseci",
            "date-year": "proÅ¡le godine\nprije {{ n }} godina"
        }), define("app/i18n/ru", {
            "postbox-text": "ÐžÑÑ‚Ð°Ð²Ð¸Ñ‚ÑŒ ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹ (Ð¼Ð¸Ð½Ð¸Ð¼ÑƒÐ¼ 3 ÑÐ¸Ð¼Ð²Ð¾Ð»Ð°)",
            "postbox-author": "Ð˜Ð¼Ñ (Ð½ÐµÐ¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾)",
            "postbox-email": "Email (Ð½ÐµÐ¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾)",
            "postbox-website": "Ð¡Ð°Ð¹Ñ‚ (Ð½ÐµÐ¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾)",
            "postbox-submit": "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ",
            "num-comments": "{{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹\n{{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ñ\n{{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸ÐµÐ²",
            "no-comments": "ÐŸÐ¾ÐºÐ° Ð½ÐµÑ‚ ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸ÐµÐ²",
            "comment-reply": "ÐžÑ‚Ð²ÐµÑ‚Ð¸Ñ‚ÑŒ",
            "comment-edit": "ÐŸÑ€Ð°Ð²ÐºÐ°",
            "comment-save": "Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ",
            "comment-delete": "Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ",
            "comment-confirm": "ÐŸÐ¾Ð´Ñ‚Ð²ÐµÑ€Ð´Ð¸Ñ‚ÑŒ ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ðµ",
            "comment-close": "Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ",
            "comment-cancel": "ÐžÑ‚Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ",
            "comment-deleted": "ÐšÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹ ÑƒÐ´Ð°Ð»Ñ‘Ð½",
            "comment-queued": "ÐšÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹ Ð±ÑƒÐ´ÐµÑ‚ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐµÐ½ Ð¼Ð¾Ð´ÐµÑ€Ð°Ñ‚Ð¾Ñ€Ð¾Ð¼",
            "comment-anonymous": "ÐÐ½Ð¾Ð½Ð¸Ð¼",
            "comment-hidden": "Ð¡ÐºÑ€Ñ‹Ñ‚ {{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹\nÐ¡ÐºÑ€Ñ‹Ñ‚Ð¾ {{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ñ\nÐ¡ÐºÑ€Ñ‹Ñ‚Ð¾ {{ n }} ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸ÐµÐ²",
            "date-now": "Ð¢Ð¾Ð»ÑŒÐºÐ¾ Ñ‡Ñ‚Ð¾",
            "date-minute": "{{ n }} Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð¼Ð¸Ð½ÑƒÑ‚ Ð½Ð°Ð·Ð°Ð´",
            "date-hour": "{{ n }} Ñ‡Ð°Ñ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ñ‡Ð°ÑÐ° Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ñ‡Ð°ÑÐ¾Ð² Ð½Ð°Ð·Ð°Ð´",
            "date-day": "{{ n }} Ð´ÐµÐ½ÑŒ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð´Ð½Ñ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð´Ð½ÐµÐ¹ Ð½Ð°Ð·Ð°Ð´",
            "date-week": "{{ n }} Ð½ÐµÐ´ÐµÐ»ÑŽ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð½ÐµÐ´ÐµÐ»Ð¸ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð½ÐµÐ´ÐµÐ»ÑŒ Ð½Ð°Ð·Ð°Ð´",
            "date-month": "{{ n }} Ð¼ÐµÑÑÑ† Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð¼ÐµÑÑÑ†Ð° Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð¼ÐµÑÑÑ†ÐµÐ² Ð½Ð°Ð·Ð°Ð´",
            "date-year": "{{ n }} Ð³Ð¾Ð´ Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð³Ð¾Ð´Ð° Ð½Ð°Ð·Ð°Ð´\n{{ n }} Ð»ÐµÑ‚ Ð½Ð°Ð·Ð°Ð´"
        }), define("app/i18n/it", {
            "postbox-text": "Scrivi un commento qui (minimo 3 caratteri)",
            "postbox-author": "Nome (opzionale)",
            "postbox-email": "E-mail (opzionale)",
            "postbox-website": "Sito web (opzionale)",
            "postbox-submit": "Invia",
            "num-comments": "Un Commento\n{{ n }} Commenti",
            "no-comments": "Ancora Nessun Commento",
            "comment-reply": "Rispondi",
            "comment-edit": "Modifica",
            "comment-save": "Salva",
            "comment-delete": "Elimina",
            "comment-confirm": "Conferma",
            "comment-close": "Chiudi",
            "comment-cancel": "Cancella",
            "comment-deleted": "Commento eliminato.",
            "comment-queued": "Commento in coda per moderazione.",
            "comment-anonymous": "Anonimo",
            "comment-hidden": "{{ n }} Nascosto",
            "date-now": "poco fa",
            "date-minute": "un minuto fa\n{{ n }} minuti fa",
            "date-hour": "un ora fa\n{{ n }} ore fa",
            "date-day": "Ieri\n{{ n }} giorni fa",
            "date-week": "questa settimana\n{{ n }} settimane fa",
            "date-month": "questo mese\n{{ n }} mesi fa",
            "date-year": "quest'anno\n{{ n }} anni fa"
        }), define("app/i18n/eo", {
            "postbox-text": "Tajpu komenton Ä‰i-tie (almenaÅ­ 3 signoj)",
            "postbox-author": "Nomo (malnepra)",
            "postbox-email": "Retadreso (malnepra)",
            "postbox-website": "Retejo (malnepra)",
            "postbox-submit": "Sendu",
            "num-comments": "{{ n }} komento\n{{ n }} komentoj",
            "no-comments": "Neniu komento ankoraÅ­",
            "comment-reply": "Respondu",
            "comment-edit": "Redaktu",
            "comment-save": "Savu",
            "comment-delete": "ForviÅu",
            "comment-confirm": "Konfirmu",
            "comment-close": "Fermu",
            "comment-cancel": "Malfaru",
            "comment-deleted": "Komento forviÅita",
            "comment-queued": "Komento en atendovico por kontrolo.",
            "comment-anonymous": "Sennoma",
            "comment-hidden": "{{ n }} kaÅitaj",
            "date-now": "Äµus nun",
            "date-minute": "antaÅ­ unu minuto\nantaÅ­ {{ n }} minutoj",
            "date-hour": "antaÅ­ unu horo\nantaÅ­ {{ n }} horoj",
            "date-day": "hieraÅ­\nantaÅ­ {{ n }} tagoj",
            "date-week": "lasta semajno\nantaÅ­ {{ n }} semajnoj",
            "date-month": "lasta monato\nantaÅ­ {{ n }} monatoj",
            "date-year": "lasta jaro\nantaÅ­ {{ n }} jaroj"
        }), define("app/i18n/sv", {
            "postbox-text": "Skriv din kommentar hÃ¤r (minst 3 tecken)",
            "postbox-author": "Namn (frivilligt)",
            "postbox-email": "E-mail (frivilligt)",
            "postbox-website": "Hemsida (frivilligt)",
            "postbox-submit": "Skicka",
            "num-comments": "En kommentar\n{{ n }} kommentarer",
            "no-comments": "Inga kommentarer Ã¤n",
            "comment-reply": "Svara",
            "comment-edit": "Redigera",
            "comment-save": "Spara",
            "comment-delete": "Radera",
            "comment-confirm": "BekrÃ¤fta",
            "comment-close": "StÃ¤ng",
            "comment-cancel": "Avbryt",
            "comment-deleted": "Kommentar raderad.",
            "comment-queued": "Kommentaren invÃ¤ntar granskning.",
            "comment-anonymous": "Anonym",
            "comment-hidden": "{{ n }} GÃ¶md",
            "date-now": "just nu",
            "date-minute": "en minut sedan\n{{ n }} minuter sedan",
            "date-hour": "en timme sedan\n{{ n }} timmar sedan",
            "date-day": "igÃ¥r\n{{ n }} dagar sedan",
            "date-week": "fÃ¶rra veckan\n{{ n }} veckor sedan",
            "date-month": "fÃ¶rra mÃ¥naden\n{{ n }} mÃ¥nader sedan",
            "date-year": "fÃ¶rra Ã¥ret\n{{ n }} Ã¥r sedan"
        }), define("app/i18n/nl", {
            "postbox-text": "Typ reactie hier (minstens 3 karakters)",
            "postbox-author": "Naam (optioneel)",
            "postbox-email": "E-mail (optioneel)",
            "postbox-website": "Website (optioneel)",
            "postbox-submit": "Versturen",
            "num-comments": "Ã‰Ã©n reactie\n{{ n }} reacties",
            "no-comments": "Nog geen reacties",
            "comment-reply": "Beantwoorden",
            "comment-edit": "Bewerken",
            "comment-save": "Opslaan",
            "comment-delete": "Verwijderen",
            "comment-confirm": "Bevestigen",
            "comment-close": "Sluiten",
            "comment-cancel": "Annuleren",
            "comment-deleted": "Reactie verwijderd.",
            "comment-queued": "Reactie staat in de wachtrij voor goedkeuring.",
            "comment-anonymous": "Anoniem",
            "comment-hidden": "{{ n }} verborgen",
            "date-now": "zojuist",
            "date-minute": "een minuut geleden\n{{ n }} minuten geleden",
            "date-hour": "een uur geleden\n{{ n }} uur geleden",
            "date-day": "gisteren\n{{ n }} dagen geleden",
            "date-week": "vorige week\n{{ n }} weken geleden",
            "date-month": "vorige maand\n{{ n }} maanden geleden",
            "date-year": "vorig jaar\n{{ n }} jaar geleden"
        }), define("app/i18n/el_GR", {
            "postbox-text": "Î“ÏÎ¬ÏˆÏ„Îµ Ï„Î¿ ÏƒÏ‡ÏŒÎ»Î¹Î¿ ÎµÎ´ÏŽ (Ï„Î¿Ï…Î»Î¬Ï‡Î¹ÏƒÏ„Î¿Î½ 3 Ï‡Î±ÏÎ±ÎºÏ„Î®ÏÎµÏ‚)",
            "postbox-author": "ÎŒÎ½Î¿Î¼Î± (Ï€ÏÎ¿Î±Î¹ÏÎµÏ„Î¹ÎºÏŒ)",
            "postbox-email": "E-mail (Ï€ÏÎ¿Î±Î¹ÏÎµÏ„Î¹ÎºÏŒ)",
            "postbox-website": "Î™ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± (Ï€ÏÎ¿Î±Î¹ÏÎµÏ„Î¹ÎºÏŒ)",
            "postbox-submit": "Î¥Ï€Î¿Î²Î¿Î»Î®",
            "num-comments": "ÎˆÎ½Î± ÏƒÏ‡ÏŒÎ»Î¹Î¿\n{{ n }} ÏƒÏ‡ÏŒÎ»Î¹Î±",
            "no-comments": "Î”ÎµÎ½ Ï…Ï€Î¬ÏÏ‡Î¿Ï…Î½ ÏƒÏ‡ÏŒÎ»Î¹Î±",
            "comment-reply": "Î‘Ï€Î¬Î½Ï„Î·ÏƒÎ·",
            "comment-edit": "Î•Ï€ÎµÎ¾ÎµÏÎ³Î±ÏƒÎ¯Î±",
            "comment-save": "Î‘Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ·",
            "comment-delete": "Î”Î¹Î±Î³ÏÎ±Ï†Î®",
            "comment-confirm": "Î•Ï€Î¹Î²ÎµÎ²Î±Î¯Ï‰ÏƒÎ·",
            "comment-close": "ÎšÎ»ÎµÎ¯ÏƒÎ¹Î¼Î¿",
            "comment-cancel": "Î‘ÎºÏÏÏ‰ÏƒÎ·",
            "comment-deleted": "Î”Î¹Î±Î³ÏÎ±Î¼Î¼Î­Î½Î¿ ÏƒÏ‡ÏŒÎ»Î¹Î¿ ",
            "comment-queued": "Î¤Î¿ ÏƒÏ‡ÏŒÎ»Î¹Î¿ Î±Î½Î±Î¼Î­Î½ÎµÎ¹ Î­Î³ÎºÏÎ¹ÏƒÎ·",
            "comment-anonymous": "Î‘Î½ÏŽÎ½Ï…Î¼Î¿Ï‚",
            "comment-hidden": "{{ n }} ÎšÏÏ…Î¼Î¼Î­Î½Î±",
            "date-now": "Ï„ÏŽÏÎ±",
            "date-minute": "Ï€ÏÎ¹Î½ Î­Î½Î± Î»ÎµÏ€Ï„ÏŒ\nÏ€ÏÎ¹Î½ {{ n }} Î»ÎµÏ€Ï„Î¬",
            "date-hour": "Ï€ÏÎ¹Î½ Î¼Î¯Î± ÏŽÏÎ±\nÏ€ÏÎ¹Î½ {{ n }} ÏŽÏÎµÏ‚",
            "date-day": "Î§Ï„ÎµÏ‚\nÏ€ÏÎ¹Î½ {{ n }} Î¼Î­ÏÎµÏ‚",
            "date-week": "Ï„Î·Î½ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î· ÎµÎ²Î´Î¿Î¼Î¬Î´Î±\nÏ€ÏÎ¹Î½ {{ n }} ÎµÎ²Î´Î¿Î¼Î¬Î´ÎµÏ‚",
            "date-month": "Ï„Î¿Î½ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î¿ Î¼Î®Î½Î±\nÏ€ÏÎ¹Î½ {{ n }} Î¼Î®Î½ÎµÏ‚",
            "date-year": "Ï€Î­ÏÏ…ÏƒÎ¹\nÏ€ÏÎ¹Î½ {{ n }} Ï‡ÏÏŒÎ½Î¹Î±"
        }), define("app/i18n/es", {
            "postbox-text": "Escriba su comentario aquÃ­ (al menos 3 caracteres)",
            "postbox-author": "Nombre (opcional)",
            "postbox-email": "E-mail (opcional)",
            "postbox-website": "Sitio web (opcional)",
            "postbox-submit": "Enviar",
            "num-comments": "Un Comentario\n{{ n }} Comentarios",
            "no-comments": "Sin Comentarios TodavÃ­a",
            "comment-reply": "Responder",
            "comment-edit": "Editar",
            "comment-save": "Guardar",
            "comment-delete": "Eliminar",
            "comment-confirm": "Confirmar",
            "comment-close": "Cerrar",
            "comment-cancel": "Cancelar",
            "comment-deleted": "Comentario eliminado.",
            "comment-queued": "Comentario en espera para moderaciÃ³n.",
            "comment-anonymous": "AnÃ³nimo",
            "comment-hidden": "{{ n }} Oculto(s)",
            "date-now": "ahora",
            "date-minute": "hace un minuto\nhace {{ n }} minutos",
            "date-hour": "hace una hora\nhace {{ n }} horas",
            "date-day": "ayer\nHace {{ n }} dÃ­as",
            "date-week": "la semana pasada\nhace {{ n }} semanas",
            "date-month": "el mes pasado\nhace {{ n }} meses",
            "date-year": "el aÃ±o pasado\nhace {{ n }} aÃ±os"
        }), define("app/i18n/vi", {
            "postbox-text": "Nháº­p bÃ¬nh luáº­n táº¡i Ä‘Ã¢y (tá»‘i thiá»ƒu 3 kÃ½ tá»±)",
            "postbox-author": "TÃªn (tÃ¹y chá»n)",
            "postbox-email": "E-mail (tÃ¹y chá»n)",
            "postbox-website": "Website (tÃ¹y chá»n)",
            "postbox-submit": "Gá»­i",
            "num-comments": "Má»™t bÃ¬nh luáº­n\n{{ n }} bÃ¬nh luáº­n",
            "no-comments": "ChÆ°a cÃ³ bÃ¬nh luáº­n nÃ o",
            "comment-reply": "Tráº£ lá»i",
            "comment-edit": "Sá»­a",
            "comment-save": "LÆ°u",
            "comment-delete": "XÃ³a",
            "comment-confirm": "XÃ¡c nháº­n",
            "comment-close": "ÄÃ³ng",
            "comment-cancel": "Há»§y",
            "comment-deleted": "ÄÃ£ xÃ³a bÃ¬nh luáº­n.",
            "comment-queued": "BÃ¬nh luáº­n Ä‘ang chá» duyá»‡t",
            "comment-anonymous": "Náº·c danh",
            "comment-hidden": "{{ n }} Ä‘Ã£ áº©n",
            "date-now": "vá»«a má»›i",
            "date-minute": "má»™t phÃºt trÆ°á»›c\n{{ n }} phÃºt trÆ°á»›c",
            "date-hour": "má»™t giá» trÆ°á»›c\n{{ n }} giá» trÆ°á»›c",
            "date-day": "HÃ´m qua\n{{ n }} ngÃ y trÆ°á»›c",
            "date-week": "Tuáº§n qua\n{{ n }} tuáº§n trÆ°á»›c",
            "date-month": "ThÃ¡ng trÆ°á»›c\n{{ n }} thÃ¡ng trÆ°á»›c",
            "date-year": "NÄƒm trÆ°á»›c\n{{ n }} nÄƒm trÆ°á»›c"
        }), define("app/i18n/zh_CN", {
            "postbox-text": "åœ¨æ­¤è¾“å…¥è¯„è®º (æœ€å°‘3ä¸ªå­—ç¬¦)",
            "postbox-author": "åå­— (å¯é€‰)",
            "postbox-email": "E-mail (å¯é€‰)",
            "postbox-website": "ç½‘ç«™ (å¯é€‰)",
            "postbox-submit": "æäº¤",
            "num-comments": "1æ¡è¯„è®º\n{{ n }}æ¡è¯„è®º",
            "no-comments": "è¿˜æ²¡æœ‰è¯„è®º",
            "comment-reply": "å›žå¤",
            "comment-edit": "ç¼–è¾‘",
            "comment-save": "ä¿å­˜",
            "comment-delete": "åˆ é™¤",
            "comment-confirm": "ç¡®è®¤",
            "comment-close": "å…³é—­",
            "comment-cancel": "å–æ¶ˆ",
            "comment-deleted": "è¯„è®ºå·²åˆ é™¤.",
            "comment-queued": "è¯„è®ºå¾…å®¡æ ¸.",
            "comment-anonymous": "åŒ¿å",
            "comment-hidden": "{{ n }} æ¡è¯„è®ºå·²éšè—",
            "date-now": "åˆšåˆš",
            "date-minute": "1åˆ†é’Ÿå‰\n{{ n }}åˆ†é’Ÿå‰",
            "date-hour": "1å°æ—¶å‰\n{{ n }}å°æ—¶å‰",
            "date-day": "æ˜¨å¤©\n{{ n }}å¤©å‰",
            "date-week": "ä¸Šå‘¨\n{{ n }}å‘¨å‰",
            "date-month": "ä¸Šä¸ªæœˆ\n{{ n }}ä¸ªæœˆå‰",
            "date-year": "åŽ»å¹´\n{{ n }}å¹´å‰"
        }), define("app/i18n", ["app/config", "app/i18n/bg", "app/i18n/cs", "app/i18n/de", "app/i18n/en", "app/i18n/fi", "app/i18n/fr", "app/i18n/hr", "app/i18n/ru", "app/i18n/it", "app/i18n/eo", "app/i18n/sv", "app/i18n/nl", "app/i18n/el_GR", "app/i18n/es", "app/i18n/vi", "app/i18n/zh_CN"], function (e, t, n, o, a, i, r, s, m, c, d, l, u, p, f, h, v) {
            "use strict";
            var b = function (e) {
                    switch (e) {
                        case "bg":
                        case "cs":
                        case "de":
                        case "el":
                        case "en":
                        case "es":
                        case "eo":
                        case "fi":
                        case "hr":
                        case "it":
                        case "sv":
                        case "nl":
                        case "vi":
                        case "zh":
                            return function (e, t) {
                                return e[1 === t ? 0 : 1]
                            };
                        case "fr":
                            return function (e, t) {
                                return e[t > 1 ? 1 : 0]
                            };
                        case "ru":
                            return function (e, t) {
                                return t % 10 === 1 && t % 100 !== 11 ? e[0] : t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? e[1] : "undefined" != typeof e[2] ? e[2] : e[1]
                            };
                        default:
                            return null
                    }
                },
                x = e.lang;
            b(x) || (x = "en");
            var g = {
                    cs: n,
                    de: o,
                    el: p,
                    en: a,
                    eo: d,
                    es: f,
                    fi: i,
                    fr: r,
                    it: c,
                    hr: s,
                    ru: m,
                    sv: l,
                    nl: u,
                    vi: h,
                    zh: v
                },
                w = b(x),
                y = function (e) {
                    return g[x][e] || a[e] || "???"
                },
                j = function (e, t) {
                    var n;
                    return n = y(e), n.indexOf("\n") > -1 && (n = w(n.split("\n"), +t)), n ? n.replace("{{ n }}", +t) : n
                };
            return {
                lang: x,
                translate: y,
                pluralize: j
            }
        }), define("app/lib/promise", [], function () {
            "use strict";
            var e = function (e) {
                    console.log(e)
                },
                t = function () {
                    this.success = [], this.errors = []
                };
            t.prototype.then = function (t, n) {
                this.success.push(t), n ? this.errors.push(n) : this.errors.push(e)
            };
            var n = function () {
                this.promise = new t
            };
            n.prototype = {
                promise: t,
                resolve: function (e) {
                    this.promise.success.forEach(function (t) {
                        window.setTimeout(function () {
                            t(e)
                        }, 0)
                    })
                },
                reject: function (e) {
                    this.promise.errors.forEach(function (t) {
                        window.setTimeout(function () {
                            t(e)
                        }, 0)
                    })
                }
            };
            var o = function (e, n) {
                return e instanceof t ? e.then(n) : n(e)
            };
            return {
                defer: function () {
                    return new n
                },
                when: o
            }
        }), define("app/globals", [], function () {
            "use strict";
            var e = function () {
                this.values = []
            };
            return e.prototype.update = function (e) {
                this.values.push((new Date).getTime() - e.getTime())
            }, e.prototype.localTime = function () {
                return new Date((new Date).getTime() - this.values.reduce(function (e, t) {
                    return e + t
                }) / this.values.length)
            }, {
                offset: new e
            }
        }), define("app/api", ["app/lib/promise", "app/globals"], function (e, t) {
            "use strict";
            for (var n, o, a = "Eech7co8Ohloopo9Ol6baimi", i = window.location.pathname, r = document.getElementsByTagName("script"), s = 0; s < r.length; s++)
                if (r[s].hasAttribute("data-isso")) {
                    o = r[s].getAttribute("data-isso");
                    break
                }
            if (!o) {
                for (s = 0; s < r.length; s++)
                    if (r[s].getAttribute("async") || r[s].getAttribute("defer")) throw "Isso's automatic configuration detection failed, please refer to https://github.com/posativ/isso#client-configuration and add a custom `data-isso` attribute.";
                n = r[r.length - 1], o = n.src.substring(0, n.src.length - "/js/embed.min.js".length)
            }
            "/" === o[o.length - 1] && (o = o.substring(0, o.length - 1));
            var m = function (e, n, o, a, i) {
                    function r() {
                        var e = s.getResponseHeader("Date");
                        null !== e && t.offset.update(new Date(e));
                        var n = s.getResponseHeader("X-Set-Cookie");
                        n && n.match(/^isso-/) && (document.cookie = n), s.status >= 500 ? i && i(s.body) : a({
                            status: s.status,
                            body: s.responseText
                        })
                    }
                    var s = new XMLHttpRequest;
                    try {
                        s.open(e, n, !0), s.withCredentials = !0, s.setRequestHeader("Content-Type", "application/json"), s.onreadystatechange = function () {
                            4 === s.readyState && r()
                        }
                    } catch (m) {
                        (i || console.log)(m.message)
                    }
                    s.send(o)
                },
                c = function (e) {
                    var t = "";
                    for (var n in e) e.hasOwnProperty(n) && null !== e[n] && "undefined" != typeof e[n] && (t += n + "=" + encodeURIComponent(e[n]) + "&");
                    return t.substring(0, t.length - 1)
                },
                d = function (t, n) {
                    var a = e.defer();
                    return m("POST", o + "/new?" + c({
                        uri: t || i
                    }), JSON.stringify(n), function (e) {
                        201 === e.status || 202 === e.status ? a.resolve(JSON.parse(e.body)) : a.reject(e.body)
                    }), a.promise
                },
                l = function (t, n) {
                    var a = e.defer();
                    return m("PUT", o + "/id/" + t, JSON.stringify(n), function (e) {
                        403 === e.status ? a.reject("Not authorized to modify this comment!") : 200 === e.status ? a.resolve(JSON.parse(e.body)) : a.reject(e.body)
                    }), a.promise
                },
                u = function (t) {
                    var n = e.defer();
                    return m("DELETE", o + "/id/" + t, null, function (e) {
                        403 === e.status ? n.reject("Not authorized to remove this comment!") : 200 === e.status ? n.resolve(null === JSON.parse(e.body)) : n.reject(e.body)
                    }), n.promise
                },
                p = function (t, n) {
                    var a = e.defer();
                    return m("GET", o + "/id/" + t + "?" + c({
                        plain: n
                    }), null, function (e) {
                        a.resolve(JSON.parse(e.body))
                    }), a.promise
                },
                f = function (t, n, a, r, s) {
                    "undefined" == typeof n && (n = "inf"), "undefined" == typeof a && (a = "inf"), "undefined" == typeof r && (r = null);
                    var d = {
                        uri: t || i,
                        after: s,
                        parent: r
                    };
                    "inf" !== n && (d.limit = n), "inf" !== a && (d.nested_limit = a);
                    var l = e.defer();
                    return m("GET", o + "/?" + c(d), null, function (e) {
                        200 === e.status ? l.resolve(JSON.parse(e.body)) : 404 === e.status ? l.resolve({
                            total_replies: 0
                        }) : l.reject(e.body)
                    }), l.promise
                },
                h = function (t) {
                    var n = e.defer();
                    return m("POST", o + "/count", JSON.stringify(t), function (e) {
                        200 === e.status ? n.resolve(JSON.parse(e.body)) : n.reject(e.body)
                    }), n.promise
                },
                v = function (t) {
                    var n = e.defer();
                    return m("POST", o + "/id/" + t + "/like", null, function (e) {
                        n.resolve(JSON.parse(e.body))
                    }), n.promise
                },
                b = function (t) {
                    var n = e.defer();
                    return m("POST", o + "/id/" + t + "/dislike", null, function (e) {
                        n.resolve(JSON.parse(e.body))
                    }), n.promise
                };
            return {
                endpoint: o,
                salt: a,
                create: d,
                modify: l,
                remove: u,
                view: p,
                fetch: f,
                count: h,
                like: v,
                dislike: b
            }
        }), define("app/dom", [], function () {
            "use strict";

            function e(e) {
                this.obj = e, this.replace = function (t) {
                    var o = n.htmlify(t);
                    return e.parentNode.replaceChild(o.obj, e), o
                }, this.prepend = function (t) {
                    var o = n.htmlify(t);
                    return e.insertBefore(o.obj, e.firstChild), o
                }, this.append = function (t) {
                    var o = n.htmlify(t);
                    return e.appendChild(o.obj), o
                }, this.insertAfter = function (t) {
                    var o = n.htmlify(t);
                    return e.parentNode.insertBefore(o.obj, e.nextSibling), o
                }, this.on = function (t, n, o) {
                    e.addEventListener(t, function (e) {
                        n(e), (void 0 === o || o) && e.preventDefault()
                    })
                }, this.toggle = function (e, n, o) {
                    var a = new t(n, o);
                    this.on(e, function () {
                        a.next()
                    })
                }, this.detach = function () {
                    return e.parentNode.removeChild(this.obj), this
                }, this.remove = function () {
                    e.parentNode.removeChild(this.obj)
                }, this.show = function () {
                    e.style.display = "block"
                }, this.hide = function () {
                    e.style.display = "none"
                }, this.setText = function (t) {
                    e.textContent = t
                }, this.setHtml = function (t) {
                    e.innerHTML = t
                }, this.blur = function () {
                    e.blur()
                }, this.focus = function () {
                    e.focus()
                }, this.scrollIntoView = function (t) {
                    e.scrollIntoView(t)
                }, this.setAttribute = function (t, n) {
                    e.setAttribute(t, n)
                }, this.getAttribute = function (t) {
                    return e.getAttribute(t)
                }, this.classList = e.classList, Object.defineProperties(this, {
                    textContent: {
                        get: function () {
                            return e.textContent
                        },
                        set: function (t) {
                            e.textContent = t
                        }
                    },
                    innerHTML: {
                        get: function () {
                            return e.innerHTML
                        },
                        set: function (t) {
                            e.innerHTML = t
                        }
                    },
                    value: {
                        get: function () {
                            return e.value
                        },
                        set: function (t) {
                            e.value = t
                        }
                    },
                    placeholder: {
                        get: function () {
                            return e.placeholder
                        },
                        set: function (t) {
                            e.placeholder = t
                        }
                    }
                })
            }
            var t = function (e, t) {
                    this.state = !1, this.next = function () {
                        this.state ? (this.state = !1, t(this)) : (this.state = !0, e(this))
                    }, this.wait = function () {
                        this.state = !this.state
                    }
                },
                n = function (t, n, o) {
                    "undefined" == typeof o && (o = !0), n || (n = window.document), n instanceof e && (n = n.obj);
                    var a = [].slice.call(n.querySelectorAll(t), 0);
                    return 0 === a.length ? null : 1 === a.length && o ? new e(a[0]) : (a = [].slice.call(a, 0), a.map(function (t) {
                        return new e(t)
                    }))
                };
            return n.htmlify = function (t) {
                if (t instanceof e) return t;
                if (t instanceof window.Element) return new e(t);
                var o = n["new"]("div");
                return o.innerHTML = t, new e(o.firstChild)
            }, n["new"] = function (e, t) {
                var n = document.createElement(e.split(".")[0]);
                return e.split(".").slice(1).forEach(function (e) {
                    n.classList.add(e)
                }), ["A", "LINK"].indexOf(n.nodeName) > -1 && (n.href = "#"), t || 0 === t || (t = ""), ["TEXTAREA", "INPUT"].indexOf(n.nodeName) > -1 ? n.value = t : n.textContent = t, n
            }, n.each = function (e, t) {
                Array.prototype.forEach.call(document.getElementsByTagName(e), t)
            }, n
        }), define("app/utils", ["app/i18n"], function (e) {
            "use strict";
            var t, n = function (e) {
                    return (document.cookie.match("(^|; )" + e + "=([^;]*)") || 0)[2]
                },
                o = function (e, t, n) {
                    return n = n || "0", e += "", e.length >= t ? e : new Array(t - e.length + 1).join(n) + e
                },
                a = function (t, n) {
                    var o = (t.getTime() - n.getTime()) / 1e3;
                    (isNaN(o) || 0 > o) && (o = 0);
                    var a = Math.ceil(o / 60),
                        i = Math.ceil(a / 60),
                        r = Math.ceil(i / 24);
                    return 45 >= o && e.translate("date-now") || 90 >= o && e.pluralize("date-minute", 1) || 45 >= a && e.pluralize("date-minute", a) || 90 >= a && e.pluralize("date-hour", 1) || 22 >= i && e.pluralize("date-hour", i) || 36 >= i && e.pluralize("date-day", 1) || 5 >= r && e.pluralize("date-day", r) || 8 >= r && e.pluralize("date-week", 1) || 21 >= r && e.pluralize("date-week", Math.ceil(r / 7)) || 45 >= r && e.pluralize("date-month", 1) || 345 >= r && e.pluralize("date-month", Math.ceil(r / 30)) || 547 >= r && e.pluralize("date-year", 1) || e.pluralize("date-year", Math.ceil(r / 365.25))
                },
                i = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                },
                r = function (e) {
                    return String(e).replace(/[&<>"'\/]/g, function (e) {
                        return i[e]
                    })
                },
                s = function (e) {
                    var t = document.createElement("div");
                    return t.innerHTML = e.replace(/<div><br><\/div>/gi, "<br>").replace(/<div>/gi, "<br>").replace(/<br>/gi, "\n").replace(/&nbsp;/gi, " "), t.textContent.trim()
                },
                m = function (e) {
                    return e = r(e), e.replace(/\n\n/gi, "<br><div><br></div>").replace(/\n/gi, "<br>")
                };
            try {
                localStorage.setItem("x", "y"), localStorage.removeItem("x"), t = localStorage
            } catch (c) {
                t = function (e) {
                    return {
                        setItem: function (t, n) {
                            e[t] = n
                        },
                        getItem: function (t) {
                            return "undefined" != typeof e[t] ? e[t] : null
                        },
                        removeItem: function (t) {
                            delete e[t]
                        }
                    }
                }({})
            }
            return {
                cookie: n,
                pad: o,
                ago: a,
                text: s,
                detext: m,
                localStorageImpl: t
            }
        }),
        function (e) {
            if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
            else if ("function" == typeof define && define.amd) define("libjs-jade-runtime", [], e);
            else {
                var t;
                t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.jade = e()
            }
        }(function () {
            return function e(t, n, o) {
                function a(r, s) {
                    if (!n[r]) {
                        if (!t[r]) {
                            var m = "function" == typeof require && require;
                            if (!s && m) return m(r, !0);
                            if (i) return i(r, !0);
                            var c = new Error("Cannot find module '" + r + "'");
                            throw c.code = "MODULE_NOT_FOUND", c
                        }
                        var d = n[r] = {
                            exports: {}
                        };
                        t[r][0].call(d.exports, function (e) {
                            var n = t[r][1][e];
                            return a(n ? n : e)
                        }, d, d.exports, e, t, n, o)
                    }
                    return n[r].exports
                }
                for (var i = "function" == typeof require && require, r = 0; r < o.length; r++) a(o[r]);
                return a
            }({
                1: [function (e, t, n) {
                    "use strict";

                    function o(e) {
                        return null != e && "" !== e
                    }

                    function a(e) {
                        return (Array.isArray(e) ? e.map(a) : e && "object" == typeof e ? Object.keys(e).filter(function (t) {
                            return e[t]
                        }) : [e]).filter(o).join(" ")
                    }

                    function i(e) {
                        return s[e] || e
                    }

                    function r(e) {
                        var t = String(e).replace(m, i);
                        return t === "" + e ? e : t
                    }
                    n.merge = function c(e, t) {
                        if (1 === arguments.length) {
                            for (var n = e[0], a = 1; a < e.length; a++) n = c(n, e[a]);
                            return n
                        }
                        var i = e["class"],
                            r = t["class"];
                        (i || r) && (i = i || [], r = r || [], Array.isArray(i) || (i = [i]), Array.isArray(r) || (r = [r]), e["class"] = i.concat(r).filter(o));
                        for (var s in t) "class" != s && (e[s] = t[s]);
                        return e
                    }, n.joinClasses = a, n.cls = function (e, t) {
                        for (var o = [], i = 0; i < e.length; i++) t && t[i] ? o.push(n.escape(a([e[i]]))) : o.push(a(e[i]));
                        var r = a(o);
                        return r.length ? ' class="' + r + '"' : ""
                    }, n.style = function (e) {
                        return e && "object" == typeof e ? Object.keys(e).map(function (t) {
                            return t + ":" + e[t]
                        }).join(";") : e
                    }, n.attr = function (e, t, o, a) {
                        return "style" === e && (t = n.style(t)), "boolean" == typeof t || null == t ? t ? " " + (a ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof t ? (-1 !== JSON.stringify(t).indexOf("&") && console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"), t && "function" == typeof t.toISOString && console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0"), " " + e + "='" + JSON.stringify(t).replace(/'/g, "&apos;") + "'") : o ? (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + e + '="' + n.escape(t) + '"') : (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + e + '="' + t + '"')
                    }, n.attrs = function (e, t) {
                        var o = [],
                            i = Object.keys(e);
                        if (i.length)
                            for (var r = 0; r < i.length; ++r) {
                                var s = i[r],
                                    m = e[s];
                                "class" == s ? (m = a(m)) && o.push(" " + s + '="' + m + '"') : o.push(n.attr(s, m, !1, t))
                            }
                        return o.join("")
                    };
                    var s = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;"
                        },
                        m = /[&<>"]/g;
                    n.escape = r, n.rethrow = function d(t, n, o, a) {
                        if (!(t instanceof Error)) throw t;
                        if (!("undefined" == typeof window && n || a)) throw t.message += " on line " + o, t;
                        try {
                            a = a || e("fs").readFileSync(n, "utf8")
                        } catch (i) {
                            d(t, null, o)
                        }
                        var r = 3,
                            s = a.split("\n"),
                            m = Math.max(o - r, 0),
                            c = Math.min(s.length, o + r),
                            r = s.slice(m, c).map(function (e, t) {
                                var n = t + m + 1;
                                return (n == o ? "  > " : "    ") + n + "| " + e
                            }).join("\n");
                        throw t.path = n, t.message = (n || "Jade") + ":" + o + "\n" + r + "\n\n" + t.message, t
                    }, n.DebugItem = function (e, t) {
                        this.lineno = e, this.filename = t
                    }
                }, {
                    fs: 2
                }],
                2: [function (e, t, n) {}, {}]
            }, {}, [1])(1)
        }), define("jade", {
            load: function (e) {
                throw new Error("Dynamic load not allowed: " + e)
            }
        }), define("jade!app/text/postbox", function () {
            var e = function (e) {
                var t, n = [],
                    o = e || {};
                return function (e, o, a, i) {
                    n.push('<div class="isso-postbox"><div class="form-wrapper"><div class="textarea-wrapper"><div contenteditable="true" class="textarea placeholder">' + jade.escape(null == (t = a("postbox-text")) ? "" : t) + '</div></div><section class="auth-section"><p class="input-wrapper"><input type="text" name="author"' + jade.attr("placeholder", a("postbox-author"), !0, !1) + jade.attr("value", null !== e ? "" + e : "", !0, !1) + '/></p><p class="input-wrapper"><input type="email" name="email"' + jade.attr("placeholder", a("postbox-email"), !0, !1) + jade.attr("value", null != o ? "" + o : "", !0, !1) + '/></p><p class="input-wrapper"><input type="text" name="website"' + jade.attr("placeholder", a("postbox-website"), !0, !1) + jade.attr("value", null != i ? "" + i : "", !0, !1) + '/></p><p class="post-action"><input type="submit"' + jade.attr("value", a("postbox-submit"), !0, !1) + "/></p></section></div></div>");
                }.call(this, "author" in o ? o.author : "undefined" != typeof author ? author : void 0, "email" in o ? o.email : "undefined" != typeof email ? email : void 0, "i18n" in o ? o.i18n : "undefined" != typeof i18n ? i18n : void 0, "website" in o ? o.website : "undefined" != typeof website ? website : void 0), n.join("")
            };
            return e
        }), define("jade!app/text/comment", function () {
            var e = function (e) {
                var t, n = [],
                    o = e || {};
                return function (e, o, a, i, r, s, m) {
                    n.push("<div" + jade.attr("id", "isso-" + o.id, !0, !1) + ' class="isso-comment">'), a.avatar && n.push('<div class="avatar"><svg' + jade.attr("data-hash", "" + o.hash, !0, !1) + "></svg></div>"), n.push('<div class="text-wrapper"><div role="meta" class="isso-comment-header">'), e(o.website) ? n.push("<a" + jade.attr("href", "" + o.website, !0, !1) + ' rel="nofollow" class="author">' + jade.escape(null == (t = e(o.author) ? o.author : s("comment-anonymous")) ? "" : t) + "</a>") : n.push('<span class="author">' + jade.escape(null == (t = e(o.author) ? o.author : s("comment-anonymous")) ? "" : t) + "</span>"), n.push('<span class="spacer">&bull;</span><a' + jade.attr("href", "#isso-" + o.id, !0, !1) + ' class="permalink"><time' + jade.attr("title", "" + r(o.created), !0, !1) + jade.attr("datetime", "" + i(o.created), !0, !1) + '></time></a><span class="note">' + jade.escape(null == (t = 2 == o.mode ? s("comment-queued") : 4 == o.mode ? s("comment-deleted") : "") ? "" : t) + '</span></div><div class="text">'), 4 == o.mode ? n.push("<p>&nbsp;</p>") : n.push(null == (t = o.text) ? "" : t), n.push('</div><div class="isso-comment-footer">'), a.vote && n.push('<a href="#" class="upvote">' + (null == (t = m["arrow-up"]) ? "" : t) + '</a><span class="spacer">|</span><a href="#" class="downvote">' + (null == (t = m["arrow-down"]) ? "" : t) + "</a>"), n.push('<a href="#" class="reply">' + jade.escape(null == (t = s("comment-reply")) ? "" : t) + '</a><a href="#" class="edit">' + jade.escape(null == (t = s("comment-edit")) ? "" : t) + '</a><a href="#" class="delete">' + jade.escape(null == (t = s("comment-delete")) ? "" : t) + '</a></div><div class="isso-follow-up"></div></div></div>')
                }.call(this, "bool" in o ? o.bool : "undefined" != typeof bool ? bool : void 0, "comment" in o ? o.comment : "undefined" != typeof comment ? comment : void 0, "conf" in o ? o.conf : "undefined" != typeof conf ? conf : void 0, "datetime" in o ? o.datetime : "undefined" != typeof datetime ? datetime : void 0, "humanize" in o ? o.humanize : "undefined" != typeof humanize ? humanize : void 0, "i18n" in o ? o.i18n : "undefined" != typeof i18n ? i18n : void 0, "svg" in o ? o.svg : "undefined" != typeof svg ? svg : void 0), n.join("")
            };
            return e
        }), define("jade!app/text/comment-loader", function () {
            var e = function (e) {
                var t, n = [],
                    o = e || {};
                return function (e, o) {
                    n.push("<div" + jade.attr("id", "isso-loader-" + e.name, !0, !1) + ' class="isso-comment-loader"><a href="#" class="load_hidden">' + jade.escape(null == (t = o("comment-hidden", e.hidden_replies)) ? "" : t) + "</a></div>")
                }.call(this, "comment" in o ? o.comment : "undefined" != typeof comment ? comment : void 0, "pluralize" in o ? o.pluralize : "undefined" != typeof pluralize ? pluralize : void 0), n.join("")
            };
            return e
        }), define("app/jade", ["libjs-jade-runtime", "app/utils", "jade!app/text/postbox", "jade!app/text/comment", "jade!app/text/comment-loader"], function (runtime, utils, tt_postbox, tt_comment, tt_comment_loader) {
            "use strict";
            var globals = {},
                templates = {},
                load = function (name, js) {
                    templates[name] = function (jade) {
                        var fn;
                        return eval("fn = " + js), fn
                    }(runtime)
                },
                set = function (e, t) {
                    globals[e] = t
                };
            return load("postbox", tt_postbox), load("comment", tt_comment), load("comment-loader", tt_comment_loader), set("bool", function (e) {
                return e ? !0 : !1
            }), set("humanize", function (e) {
                return "object" != typeof e && (e = new Date(1e3 * parseInt(e, 10))), e.toString()
            }), set("datetime", function (e) {
                return "object" != typeof e && (e = new Date(1e3 * parseInt(e, 10))), [e.getUTCFullYear(), utils.pad(e.getUTCMonth(), 2), utils.pad(e.getUTCDay(), 2)].join("-") + "T" + [utils.pad(e.getUTCHours(), 2), utils.pad(e.getUTCMinutes(), 2), utils.pad(e.getUTCSeconds(), 2)].join(":") + "Z"
            }), {
                set: set,
                render: function (e, t) {
                    var n, o = templates[e];
                    if (!o) throw new Error("Template not found: '" + e + "'");
                    t = t || {};
                    var a = [];
                    for (var i in t) t.hasOwnProperty(i) && !globals.hasOwnProperty(i) && (a.push(i), globals[i] = t[i]);
                    n = templates[e](globals);
                    for (var r = 0; r < a.length; r++) delete globals[a[r]];
                    return n
                }
            }
        }), define("app/lib/editor", ["app/dom", "app/i18n"], function (e, t) {
            "use strict";
            return function (n) {
                return n = e.htmlify(n), n.setAttribute("contentEditable", !0), n.on("focus", function () {
                    n.classList.contains("placeholder") && (n.innerHTML = "", n.classList.remove("placeholder"))
                }), n.on("blur", function () {
                    0 === n.textContent.length && (n.textContent = t.translate("postbox-text"), n.classList.add("placeholder"))
                }), n
            }
        }), define("app/lib/identicons", ["app/lib/promise", "app/config"], function (e, t) {
            "use strict";
            var n = 5,
                o = function (e, t) {
                    return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
                },
                a = function (e, t, n, o, a, i) {
                    var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    r.setAttribute("x", o + t * a), r.setAttribute("y", o + n * a), r.setAttribute("width", a), r.setAttribute("height", a), r.setAttribute("style", "fill: " + i), e.appendChild(r)
                },
                i = function (i, r, s) {
                    var m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    return m.setAttribute("version", "1.1"), m.setAttribute("viewBox", "0 0 " + s + " " + s), m.setAttribute("preserveAspectRatio", "xMinYMin meet"), m.setAttribute("shape-rendering", "crispEdges"), a(m, 0, 0, 0, s + 2 * r, t["avatar-bg"]), null === typeof i ? m : (e.when(i, function (e) {
                        var i = o((parseInt(e, 16) % Math.pow(2, 18)).toString(2), 18),
                            s = 0;
                        m.setAttribute("data-hash", e);
                        for (var c = parseInt(i.substring(i.length - 3, i.length), 2), d = t["avatar-fg"][c % t["avatar-fg"].length], l = 0; l < Math.ceil(n / 2); l++)
                            for (var u = 0; n > u; u++) "1" === i.charAt(s) && (a(m, l, u, r, 8, d), l < Math.floor(n / 2) && a(m, n - 1 - l, u, r, 8, d)), s++
                    }), m)
                },
                r = function (e, t) {
                    var n = parseInt([0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0].join(""), 2).toString(16),
                        o = i(n, e, t);
                    return o.setAttribute("className", "blank"), o
                };
            return {
                generate: i,
                blank: r
            }
        }), define("app/lib", ["require", "app/lib/editor", "app/lib/identicons"], function (e) {
            return {
                editorify: e("app/lib/editor"),
                identicons: e("app/lib/identicons")
            }
        }), define("app/isso", ["app/dom", "app/utils", "app/config", "app/api", "app/jade", "app/i18n", "app/lib", "app/globals"], function (e, t, n, o, a, i, r, s) {
            "use strict";
            var m = function (i) {
                    var s = t.localStorageImpl,
                        m = e.htmlify(a.render("postbox", {
                            author: JSON.parse(s.getItem("author")),
                            email: JSON.parse(s.getItem("email")),
                            website: JSON.parse(s.getItem("website"))
                        }));
                    return m.onsuccess = function () {}, m.validate = function () {
                        return t.text(e(".textarea", this).innerHTML).length < 3 || e(".textarea", this).classList.contains("placeholder") ? (e(".textarea", this).focus(), !1) : n["require-email"] && e("[name='email']", this).value.length <= 0 ? (e("[name='email']", this).focus(), !1) : n["require-author"] && e("[name='author']", this).value.length <= 0 ? (e("[name='author']", this).focus(), !1) : !0
                    }, n["require-email"] && (e("[name='email']", m).placeholder = e("[name='email']", m).placeholder.replace(/ \(.*\)/, "")), n["require-author"] && (e("[name='author']", m).placeholder = e("[name='author']", m).placeholder.replace(/ \(.*\)/, "")), e("[type=submit]", m).on("click", function () {
                        if (m.validate()) {
                            var n = e("[name=author]", m).value || null,
                                a = e("[name=email]", m).value || null,
                                r = e("[name=website]", m).value || null;
                            s.setItem("author", JSON.stringify(n)), s.setItem("email", JSON.stringify(a)), s.setItem("website", JSON.stringify(r)), o.create(e("#isso-thread").getAttribute("data-isso-id"), {
                                author: n,
                                email: a,
                                website: r,
                                text: t.text(e(".textarea", m).innerHTML),
                                parent: i || null,
                                title: e("#isso-thread").getAttribute("data-title") || null
                            }).then(function (t) {
                                e(".textarea", m).innerHTML = "", e(".textarea", m).blur(), d(t, !0), null !== i && m.onsuccess()
                            })
                        }
                    }), r.editorify(e(".textarea", m)), m
                },
                c = function (t, i) {
                    var r;
                    null === t.id ? (r = e("#isso-root"), t.name = "null") : (r = e("#isso-" + t.id + " > .text-wrapper > .isso-follow-up"), t.name = t.id);
                    var s = e.htmlify(a.render("comment-loader", {
                        comment: t
                    }));
                    r.append(s), e("a.load_hidden", s).on("click", function () {
                        s.remove(), o.fetch(e("#isso-thread").getAttribute("data-isso-id"), n["reveal-on-click"], n["max-comments-nested"], t.id, i).then(function (e) {
                            if (0 !== e.total_replies) {
                                var t = 0;
                                e.replies.forEach(function (e) {
                                    d(e, !1), e.created > t && (t = e.created)
                                }), e.hidden_replies > 0 && c(e, t)
                            }
                        }, function (e) {
                            console.log(e)
                        })
                    })
                },
                d = function (l, u) {
                    var p = e.htmlify(a.render("comment", {
                            comment: l
                        })),
                        f = function () {
                            e(".permalink > time", p).textContent = t.ago(s.offset.localTime(), new Date(1e3 * parseInt(l.created, 10))), setTimeout(f, 6e4)
                        };
                    f(), n.avatar && e("div.avatar > svg", p).replace(r.identicons.generate(l.hash, 4, 48));
                    var h;
                    h = e(null === l.parent ? "#isso-root" : "#isso-" + l.parent + " > .text-wrapper > .isso-follow-up"), h.append(p), u && p.scrollIntoView();
                    var v = e("#isso-" + l.id + " > .text-wrapper > .isso-comment-footer"),
                        b = e("#isso-" + l.id + " > .text-wrapper > .isso-comment-header"),
                        x = e("#isso-" + l.id + " > .text-wrapper > .text"),
                        g = null;
                    if (e("a.reply", v).toggle("click", function (t) {
                            g = v.insertAfter(new m(null === l.parent ? l.id : l.parent)), g.onsuccess = function () {
                                t.next()
                            }, e(".textarea", g).focus(), e("a.reply", v).textContent = i.translate("comment-close")
                        }, function () {
                            g.remove(), e("a.reply", v).textContent = i.translate("comment-reply")
                        }), n.vote) {
                        var w = n["vote-levels"];
                        "string" == typeof w && (w = w.split(","));
                        var y = function (t) {
                            var n = e("span.votes", v);
                            if (null === n ? v.prepend(e["new"]("span.votes", t)) : n.textContent = t, t ? p.classList.remove("isso-no-votes") : p.classList.add("isso-no-votes"), w)
                                for (var o = !0, a = 0; a <= w.length; a++) o && (a >= w.length || t < w[a]) ? (p.classList.add("isso-vote-level-" + a), o = !1) : p.classList.remove("isso-vote-level-" + a)
                        };
                        e("a.upvote", v).on("click", function () {
                            o.like(l.id).then(function (e) {
                                y(e.likes - e.dislikes)
                            })
                        }), e("a.downvote", v).on("click", function () {
                            o.dislike(l.id).then(function (e) {
                                y(e.likes - e.dislikes)
                            })
                        }), y(l.likes - l.dislikes)
                    }
                    e("a.edit", v).toggle("click", function (a) {
                        var s = e("a.edit", v),
                            m = n.avatar ? e(".avatar", p, !1)[0] : null;
                        s.textContent = i.translate("comment-save"), s.insertAfter(e["new"]("a.cancel", i.translate("comment-cancel"))).on("click", function () {
                            a.canceled = !0, a.next()
                        }), a.canceled = !1, o.view(l.id, 1).then(function (n) {
                            var o = r.editorify(e["new"]("div.textarea"));
                            o.innerHTML = t.detext(n.text), o.focus(), x.classList.remove("text"), x.classList.add("textarea-wrapper"), x.textContent = "", x.append(o)
                        }), null !== m && m.hide()
                    }, function (a) {
                        var r = e(".textarea", x),
                            s = n.avatar ? e(".avatar", p, !1)[0] : null;
                        if (a.canceled || null === r) x.innerHTML = l.text;
                        else {
                            if (t.text(r.innerHTML).length < 3) return r.focus(), void a.wait();
                            o.modify(l.id, {
                                text: t.text(r.innerHTML)
                            }).then(function (e) {
                                x.innerHTML = e.text, l.text = e.text
                            })
                        }
                        x.classList.remove("textarea-wrapper"), x.classList.add("text"), null !== s && s.show(), e("a.cancel", v).remove(), e("a.edit", v).textContent = i.translate("comment-edit")
                    }), e("a.delete", v).toggle("click", function (t) {
                        var n = e("a.delete", v),
                            o = !t.state;
                        n.textContent = i.translate("comment-confirm"), n.on("mouseout", function () {
                            n.textContent = i.translate("comment-delete"), t.state = o, n.onmouseout = null
                        })
                    }, function () {
                        var t = e("a.delete", v);
                        o.remove(l.id).then(function (n) {
                            n ? p.remove() : (e("span.note", b).textContent = i.translate("comment-deleted"), x.innerHTML = "<p>&nbsp;</p>", e("a.edit", v).remove(), e("a.delete", v).remove()), t.textContent = i.translate("comment-delete")
                        })
                    });
                    var j = function (n) {
                        t.cookie("isso-" + l.id) ? setTimeout(function () {
                            j(n)
                        }, 15e3) : null !== e(n, v) && e(n, v).remove()
                    };
                    j("a.edit"), j("a.delete");
                    var k = function (e) {
                        t.cookie("isso-" + l.id) ? setTimeout(function () {
                            k(e)
                        }, 15e3) : v.append(e)
                    };
                    if (!n["reply-to-self"] && t.cookie("isso-" + l.id) && k(e("a.reply", v).detach()), l.hasOwnProperty("replies")) {
                        var C = 0;
                        l.replies.forEach(function (e) {
                            d(e, !1), e.created > C && (C = e.created)
                        }), l.hidden_replies > 0 && c(l, C)
                    }
                };
            return {
                insert: d,
                insert_loader: c,
                Postbox: m
            }
        }), define("app/count", ["app/api", "app/dom", "app/i18n"], function (e, t, n) {
            return function () {
                var o = {};
                t.each("a", function (e) {
                    if (e.href.match(/#isso-thread$/)) {
                        var t = e.getAttribute("data-isso-id") || e.href.match(/^(.+)#isso-thread$/)[1].replace(/^.*\/\/[^\/]+/, "");
                        t in o ? o[t].push(e) : o[t] = [e]
                    }
                });
                var a = Object.keys(o);
                e.count(a).then(function (e) {
                    for (var t in o)
                        if (o.hasOwnProperty(t))
                            for (var i = a.indexOf(t), r = 0; r < o[t].length; r++) o[t][r].textContent = n.pluralize("num-comments", e[i])
                })
            }
        }), define("text", {
            load: function (e) {
                throw new Error("Dynamic load not allowed: " + e)
            }
        }), define("text!app/../../css/isso.css", [], function () {
            return "#isso-thread * {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n#isso-thread a {\n    text-decoration: none;\n}\n\n#isso-thread {\n    padding: 0;\n    margin: 0;\n}\n#isso-thread > h4 {\n    color: #555;\n    font-weight: bold;\n}\n#isso-thread .textarea {\n    min-height: 58px;\n    outline: 0;\n}\n#isso-thread .textarea.placeholder {\n    color: #AAA;\n}\n\n.isso-comment {\n    max-width: 68em;\n    padding-top: 0.95em;\n    margin: 0.95em auto;\n}\n.isso-comment:not(:first-of-type),\n.isso-follow-up .isso-comment {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.isso-comment > div.avatar,\n.isso-postbox > .avatar {\n    display: block;\n    float: left;\n    width: 7%;\n    margin: 3px 15px 0 0;\n}\n.isso-postbox > .avatar {\n    float: left;\n    margin: 5px 10px 0 5px;\n    width: 48px;\n    height: 48px;\n    overflow: hidden;\n}\n.isso-comment > div.avatar > svg,\n.isso-postbox > .avatar > svg {\n    max-width: 48px;\n    max-height: 48px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-radius: 3px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.isso-comment > div.text-wrapper {\n    display: block;\n}\n.isso-comment .isso-follow-up {\n    padding-left: calc(7% + 20px);\n}\n.isso-comment > div.text-wrapper > .isso-comment-header, .isso-comment > div.text-wrapper > .isso-comment-footer {\n    font-size: 0.95em;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header {\n    font-size: 0.85em;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header .spacer {\n    padding: 0 6px;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header .spacer,\n.isso-comment > div.text-wrapper > .isso-comment-header a.permalink,\n.isso-comment > div.text-wrapper > .isso-comment-header .note,\n.isso-comment > div.text-wrapper > .isso-comment-header a.parent {\n    color: gray ;\n    font-weight: normal;\n    text-shadow: none ;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header .spacer:hover,\n.isso-comment > div.text-wrapper > .isso-comment-header a.permalink:hover,\n.isso-comment > div.text-wrapper > .isso-comment-header .note:hover,\n.isso-comment > div.text-wrapper > .isso-comment-header a.parent:hover {\n    color: #606060 ;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header .note {\n    float: right;\n}\n.isso-comment > div.text-wrapper > .isso-comment-header .author {\n    font-weight: bold;\n    color: #555;\n}\n.isso-comment > div.text-wrapper > .textarea-wrapper .textarea {\n    margin-top: 0.2em;\n}\n.isso-comment > div.text-wrapper > div.text p {\n    margin-top: 0.2em;\n}\n.isso-comment > div.text-wrapper > div.text p:last-child {\n    margin-bottom: 0.2em;\n}\n.isso-comment > div.text-wrapper > div.text h1,\n.isso-comment > div.text-wrapper > div.text h2,\n.isso-comment > div.text-wrapper > div.text h3,\n.isso-comment > div.text-wrapper > div.text h4,\n.isso-comment > div.text-wrapper > div.text h5,\n.isso-comment > div.text-wrapper > div.text h6 {\n    font-size: 130%;\n    font-weight: bold;\n}\n.isso-comment > div.text-wrapper > div.textarea-wrapper .textarea {\n    width: 100%;\n    border: 1px solid #f0f0f0;\n    border-radius: 2px;\n    box-shadow: 0 0 2px #888;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer {\n    font-size: 0.80em;\n    color: gray ;\n    clear: left;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer a {\n    font-weight: bold;\n    text-decoration: none;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer a:hover {\n    color: #111111 ;\n    text-shadow: #aaaaaa 0 0 1px ;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer > a {\n    position: relative;\n    top: .2em;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer > a + a {\n    padding-left: 1em;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer .votes {\n    color: gray;\n}\n.isso-comment > div.text-wrapper > .isso-comment-footer .upvote svg,\n.isso-comment > div.text-wrapper > .isso-comment-footer .downvote svg {\n    position: relative;\n    top: .2em;\n}\n.isso-comment .isso-postbox {\n    margin-top: 0.8em;\n}\n.isso-comment.isso-no-votes span.votes {\n    display: none;\n}\n\n.isso-postbox {\n    max-width: 68em;\n    margin: 0 auto 2em;\n}\n.isso-postbox > .form-wrapper {\n    display: block;\n    padding: 0;\n}\n.isso-postbox > .form-wrapper > .auth-section,\n.isso-postbox > .form-wrapper > .auth-section .post-action {\n    display: block;\n}\n.isso-postbox > .form-wrapper .textarea {\n    margin: 0 0 .3em;\n    padding: .4em .8em;\n    border-radius: 3px;\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n#isso-thread .textarea:focus,\n#isso-thread input:focus {\n    border-color: rgba(0, 0, 0, 0.8);\n}\n.isso-postbox > .form-wrapper > .auth-section .input-wrapper {\n    display: inline-block;\n    position: relative;\n    max-width: 25%;\n    margin: 0;\n}\n.isso-postbox > .form-wrapper > .auth-section .input-wrapper input {\n    padding: .3em 10px;\n    max-width: 100%;\n    border-radius: 3px;\n    background-color: #fff;\n    line-height: 1.4em;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.isso-postbox > .form-wrapper > .auth-section .post-action {\n    display: inline-block;\n    float: right;\n    margin: 0;\n}\n.isso-postbox > .form-wrapper > .auth-section .post-action > input {\n    padding: calc(.3em - 1px);\n    border-radius: 2px;\n    border: 1px solid #CCC;\n    background-color: #DDD;\n    cursor: pointer;\n    outline: 0;\n    line-height: 1.4em;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.isso-postbox > .form-wrapper > .auth-section .post-action > input:hover {\n    background-color: #CCC;\n}\n.isso-postbox > .form-wrapper > .auth-section .post-action > input:active {\n    background-color: #BBB;\n}\n@media screen and (max-width:600px) {\n    .isso-postbox > .form-wrapper > .auth-section .input-wrapper {\n        display: block;\n        max-width: 100%;\n        margin: 0 0 .3em;\n    }\n    .isso-postbox > .form-wrapper > .auth-section .input-wrapper input {\n        width: 100%;\n    }\n    .isso-postbox > .form-wrapper > .auth-section .post-action {\n        display: block;\n        float: none;\n        text-align: right;\n    }\n}\n"
        }), define("app/text/css", ["text!../../../css/isso.css"], function (e) {
            return {
                inline: e
            }
        }), define("text!app/text/arrow-down.svg", [], function () {
            return '<!-- Generator: IcoMoon.io --><svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray">\n  <g>\n    <path d="M 24.773,13.701c-0.651,0.669-7.512,7.205-7.512,7.205C 16.912,21.262, 16.456,21.44, 16,21.44c-0.458,0-0.914-0.178-1.261-0.534 c0,0-6.861-6.536-7.514-7.205c-0.651-0.669-0.696-1.87,0-2.586c 0.698-0.714, 1.669-0.77, 2.522,0L 16,17.112l 6.251-5.995 c 0.854-0.77, 1.827-0.714, 2.522,0C 25.47,11.83, 25.427,13.034, 24.773,13.701z">\n    </path>\n  </g>\n</svg>\n'
        }), define("text!app/text/arrow-up.svg", [], function () {
            return '<!-- Generator: IcoMoon.io --><svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray">\n  <g>\n    <path d="M 24.773,18.299c-0.651-0.669-7.512-7.203-7.512-7.203C 16.912,10.739, 16.456,10.56, 16,10.56c-0.458,0-0.914,0.179-1.261,0.536 c0,0-6.861,6.534-7.514,7.203c-0.651,0.669-0.696,1.872,0,2.586c 0.698,0.712, 1.669,0.77, 2.522,0L 16,14.89l 6.251,5.995 c 0.854,0.77, 1.827,0.712, 2.522,0C 25.47,20.17, 25.427,18.966, 24.773,18.299z">\n    </path>\n  </g>\n</svg>\n'
        }), define("app/text/svg", ["text!./arrow-down.svg", "text!./arrow-up.svg"], function (e, t) {
            return {
                "arrow-down": e,
                "arrow-up": t
            }
        }), require(["app/lib/ready", "app/config", "app/i18n", "app/api", "app/isso", "app/count", "app/dom", "app/text/css", "app/text/svg", "app/jade"], function (e, t, n, o, a, i, r, s, m, c) {
            "use strict";
            c.set("conf", t), c.set("i18n", n.translate), c.set("pluralize", n.pluralize), c.set("svg", m), e(function () {
                if (t.css) {
                    var e = r["new"]("style");
                    e.type = "text/css", e.textContent = s.inline, r("head").append(e)
                }
                return i(), null === r("#isso-thread") ? console.log("abort, #isso-thread is missing") : (r("#isso-thread").append(r["new"]("h4")), r("#isso-thread").append(new a.Postbox(null)), r("#isso-thread").append('<div id="isso-root"></div>'), void o.fetch(r("#isso-thread").getAttribute("data-isso-id"), t["max-comments-top"], t["max-comments-nested"]).then(function (e) {
                    if (0 === e.total_replies) return void(r("#isso-thread > h4").textContent = n.translate("no-comments"));
                    var t = 0,
                        o = e.total_replies;
                    e.replies.forEach(function (e) {
                        a.insert(e, !1), e.created > t && (t = e.created), o += e.total_replies
                    }), r("#isso-thread > h4").textContent = n.pluralize("num-comments", o), e.hidden_replies > 0 && a.insert_loader(e, t), window.location.hash.length > 0 && r(window.location.hash).scrollIntoView()
                }, function (e) {
                    console.log(e)
                }))
            })
        }), define("embed", function () {})
}();
