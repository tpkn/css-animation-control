# Css Animation Control
Play or pause all css animation by pressing one button


![preview](https://github.com/tpkn/css-animation-control/blob/master/preview.gif)


### Usage

```javascript
var ac = new CssAnimationControl(document.getElementById('container'), 14.7);
```

Default control button is `SPACEBAR`

Direct access to main methods:
```javascript
ac.play();
ac.pause();
ac.toggle();
```
<br />


### Customisations
You could change timeline bar style like you do it in css:
```css
bottom:0; height:5px; background-color:#ff0000
```
<br />


### PS
Works great to me since 2014 but today we have Firefox 52 that could do pretty much the same and a bit more...
