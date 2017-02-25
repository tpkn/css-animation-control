# Css Animation Control
Play or pause all css animation by pressing one button


![preview](https://github.com/tpkn/css-animation-control/blob/master/preview.gif)


### Usage

```javascript
var ac = new CssAnimationControl(document.getElementById('container'), 14.7);
```

Default control button is `SPACEBAR`

Direct access to main methods
```javascript
ac.play();
ac.pause();
ac.toggle();
```



### Customisations

You could change timeline bar style like you do it in css
```css
'bottom:0; height:5px; background-color:#ff0000;'
```
