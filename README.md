Alert Notifications
===================
>Simple JQuery plugin for notifications

Requirements
------------
 * [Jquery](https://jquery.com/) - required
 * [Font Awesome](http://fontawesome.io/) - optional

Installation
------------
```html
<head>
<!-- ...your stuff... -->
<link href="your path to alertNotify.min.css" type="text/css" rel="stylesheet"/>
</head>

<body>
<!-- ...your stuff... -->
<script src="your path to alertNotify.min.js"></script>
</body>
```

Basic Usage
-----------
```js
var notify = new AlertNotify({
    enable_fa: false
});
notify.showNotification({
    text: 'test'
});
```

Advanced Usage
--------------
```js
var notify = new AlertNotify({
    enable_fa: true, // font awesome is required
    vertical_align: 'bottom',
    horizontal_align: 'right',
    animateIn: 'fade',
    animateOut: 'fade',
    timeIn: 500,
    timeOut: 1500,
    duration: 3500,
    classPrefix: 'alert-notify'
});
notify.showNotification({
    text: 'test'
});
```

Global Options:
--------------

**enable_fa**

Enable/Disable usage of Font Awesome
```js
var notify = new AlertNotify({
    enabe_fa: true
});
```
Possible values: **true/false**

**vertical_align**

Vertical positioning of notifications block
```js
var notify = new AlertNotify({
    vertical_align: 'bottom'
});
```
Possible values:

* 'top'
* 'bottom'

**horizontal_align**

Horizontal positioning of notifications block
```js
var notify = new AlertNotify({
    horizontal_align: 'right'
});
```
Possible values:

* 'right'
* 'left'
* 'center'

**animateIn/animateOut**

Appear/Disappear animation
```js
var notify = new AlertNotify({
    animateIn: 'fade',
    animateOut: 'slide'
});
```
Possible values:

* 'basic'
* 'slide'
* 'fade'

**timeIn/timeOut**

Appear/Disappear animation timeout
```js
var notify = new AlertNotify({
    timeIn: 2500,
    timeOut: 1000
});
```
Possible values: **any integer**

**duration**

Duration of notification
```js
var notify = new AlertNotify({
    duration: 2500
});
```
Possible values: **any integer**