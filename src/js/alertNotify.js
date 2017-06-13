/*
 Alert Notifications Library 1.0.0

 Copyright 2016, Pavel Filimonov
 filimonps@gmail.com

 Dependencies:
 jQuery
 http://jquery.com/
 Copyright 2011, John Resig
 Dual licensed under the MIT or GPL Version 2 licenses.
 http://jquery.org/license

 Font Awesome(optional)
 http://fontawesome.io/
 Created by Dave Gandy
 Font Awesome licensed under SIL OFL 1.1
 Code licensed under MIT License
 Documentation licensed under CC BY 3.0
 */
'use strict';

var AlertNotify = function (options) {
    if (!window.jQuery) {
        console.error('You need jQuery for this plugin work');
        return;
    }
    this._settings = this._extend({}, this._defaults, options);
    this._globalBlock = $('<div/>').addClass(this._globalClasses().join(' '));

    var self = this;
    $(document).ready(function () {
        self._initialize()
    });
};

AlertNotify.prototype = {
    _defaults: {
        vertical_align: 'top',
        horizontal_align: 'right',
        enable_fa: true,
        animateIn: 'fade',
        animateOut: 'fade',
        timeIn: 500,
        timeOut: 1500,
        duration: 3500,
        classPrefix: 'alert-notify'
    },
    _extend: function () {
        var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var args = [];

        Array.prototype.push.apply(args, arguments);

        args.slice(1).forEach(function (obj) {
            if (obj) {
                for (var key in obj) {
                    if (({}).hasOwnProperty.call(obj, key)) {
                        out[key] = obj[key];
                    }
                }
            }
        });

        return out;
    },
    _initialize: function () {
        $('body').append(this._globalBlock);

        if (this._settings.horizontal_align == 'center') {
            this._globalBlock.css({
                'margin-left': function () {
                    return '-' + $(this).width() / 2 + 'px';
                }
            });
        }
    },
    _globalClasses: function () {
        if (!this._settings) {
            return [];
        }
        return [
            this._settings.classPrefix + '-block',
            this._settings.classPrefix + '-block-' + this._settings.vertical_align,
            this._settings.classPrefix + '-block-' + this._settings.horizontal_align
        ];
    },
    _notifyClasses: function (type) {
        if (!this._settings) {
            return [];
        }
        return [
            this._settings.classPrefix,
            this._settings.classPrefix + '-' + type
        ]
    },
    _iconTemplate: function (icon) {
        if (!this._settings) {
            return '';
        }
        return '<div class="' + this._settings.classPrefix + '-icon"><i class="fa fa-' +
            icon + ' fa-2x" aria-hidden="true"></i></div>';
    },
    _notifyTemplate: function () {
        if (!this._settings) {
            return '';
        }
        return '<div class="' + this._settings.classPrefix + '-body' +
            (this._settings.enable_fa ? '' : ' ' + this._settings.classPrefix + '-body-full') +
            '">' +
            '<p class="' + this._settings.classPrefix + '-title"></p>' +
            '<p class="' + this._settings.classPrefix + '-text"></p>' +
            '</div>' +
            '</div>'
    },
    _getIcon: function (type) {
        switch (type) {
            case 'success':
                return 'check';
            case 'warning':
                return 'info-circle';
            case 'error':
                return 'warning';
            default:
                return 'bell';
        }
    },

    showNotification: function (options) {
        if (!window.jQuery) {
            console.error('You need jQuery for this plugin work');
            return;
        }

        var notify = this.createNotify(options);

        this.showNotify(notify, this._settings.timeIn);

        var timeout = setTimeout(this.hideNotify.bind(this, notify, this._settings.timeOut), this._settings.duration);

        var self = this;
        notify.on('click', function () {
            clearTimeout(timeout);
            self.removeNotify(notify);
        });
    },
    showNotify: function (notify, timeIn) {
        if (notify) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if (width < 768){
                notify.slideDown(timeIn);
            } else {
                switch (this._settings.animateIn) {
                    case 'basic':
                        notify.show(timeIn);
                        break;
                    case 'slide':
                        notify.slideDown(timeIn);
                        break;
                    case 'fade':
                    default:
                        notify.fadeIn(timeIn);
                }
            }
        }
    },
    hideNotify: function (notify, timeOut) {
        var self = this;
        if (notify) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if (width < 768){
                notify.slideUp(timeOut, function() {
                    self.removeNotify(notify);
                });
            } else {
                switch (this._settings.animateOut) {
                    case 'basic':
                        notify.hide(timeOut, function() {
                            self.removeNotify(notify);
                        });
                        break;
                    case 'slide':
                        notify.slideUp(timeOut, function() {
                            self.removeNotify(notify);
                        });
                        break;
                    case 'fade':
                    default:
                        notify.fadeOut(timeOut, function() {
                            self.removeNotify(notify);
                        });
                }
            }
        }
    },
    removeNotify: function (notify) {
        notify.remove();
    },
    createNotify: function (options) {
        if (!window.jQuery) {
            console.error('You need jQuery for this plugin work');
            return null;
        }
        if (!options.text && !options.html) {
            console.error('text or html options must be not empty');
            return null;
        }
        var defaults = {
            text: '',
            type: 'default',
            icon: '',
            html: '',
            title: ''
        };
        var settings = this._extend({}, defaults, options);

        if (this._settings.enable_fa && settings.icon.length == 0) {
            settings.icon = this._getIcon(settings.type);
        }

        var notify = $('<div/>').addClass(this._notifyClasses(settings.type).join(' '));

        if (settings.html) {
            notify.append($(settings.html));
        } else {
            if (this._settings.enable_fa) {
                notify.append($(this._iconTemplate(settings.icon)));
            }
            notify.append($(this._notifyTemplate()));
            notify.find('.' + this._settings.classPrefix + '-text').text(settings.text);
            if (settings.title === ''){
                notify.find('.' + this._settings.classPrefix + '-title').remove();
            } else {
                notify.find('.' + this._settings.classPrefix + '-title').text(settings.title);
            }
        }
        var block = this._globalBlock;
        if (block.hasClass(this._settings.classPrefix + '-block-top')) {
            block.append(notify);
        } else if (block.hasClass(this._settings.classPrefix + '-block-bottom')) {
            block.prepend(notify);
        }
        return notify;
    }
};