#Alert Notifications
===================
>Simple JQuery plugin for notifications

##Installation
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

##Basic Usage
```js
var notify = new AlertNotify();
notify.showNotification({
    text: 'test'
});
```