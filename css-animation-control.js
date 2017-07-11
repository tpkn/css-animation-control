/*!
 * Css Animation Control (v1.3.20141118), http://tpkn.me/
 */

/**
 * 
 * @param {Object} container       Container where plugin will add it's stuff
 * @param {Number} duration        If not set, timeline bar won't be shown
 * @param {String} timeline_style  Timeline bar style (default: bottom=0, height=5px, color:#ff0000)
 */
function CssAnimationControl(container, duration, timeline_style){

   var animation_duration = duration || 0;
   var timeline_bar_style = timeline_style || 'bottom:0; height:5px; background-color:#ff0000';

   /**
    * Key code of SPACEBAR button
    */
   var SPACEBAR = 32;

   /**
    * Unique id would be added to each div, 
    * so that wouldn't be situation when two divs with same id meet together
    */
   var uid = Date.now();

   /**
    * Add crossbrowser event listener
    */
   Object.prototype.on = function(event, callback, phase){
      this.addEventListener ? this.addEventListener(event, callback, phase || !1) : this.attachEvent && this.attachEvent("on" + event, callback);
   }

   /**
    * Create new element
    * @param  {String} type
    * @param  {Object} attr
    */
   Object.prototype.add = function(type, attr){
      var element = document.createElement(type);
      element.setAttribute(attr.name, attr.val);
      this.appendChild(element);
      return element;
   }

   /**
    * Add some style for all object we have
    */
   var style = container.add('style', {name: 'type', val: 'text/css'});
   style.innerHTML += '#playback_state' + uid + '{z-index:1000000;position:absolute;left:0;top:0;right:0;bottom:0;width:80px;height:80px;margin:auto}'
   style.innerHTML += '#play_icon' + uid + '{position:absolute;left:0;top:0;opacity:0;width:80px;height:80px;border-radius:100%;background-color:rgba(0,0,0,0.5);background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAAEiUVFhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7VJREFUeNpi/P//PwOxgImBBEB/xfMZGRkZQBgZMGLzIEzRf4gkI0FnANW9Z0QzGq/JUE1wNgsOU+kcdAABxDgcohsaxvZERTe6AmR5fNHNT0zQ/UdOE8jygyScAQKIJGfQzBVDyuD9sFSFjikKY7RiAWe6oSgoYIb+J+Aiog0GmhMPxPPRLRhNbgNnMEAA0SSMmYZMEIwaSn3AQkxRgCvvU1x6/SchQRNtKMi1QHPlgXg/MS4ghP9j0bMfiO1x6SE3og4AsQMlEYURtki1AnUiilAtQLShoAgixrDRom/UUBoZChBANGuxDKk2xahjRx076lgy6lccgB9YqX0ko64ekJD9AO3lgUD9YO+1YDRDQQNzUKYCrlAfqJDF1ioVhOKPQEflUyPUaRayRDQFPwCx4KArDYBu04eG7HlYexUU6uQYRA2Mq+8AAvbUsptqyQCUkYD4AQgDQ02RFkUXtcrZBKADHzIgjd+PNhFH2wajjh11LO0AQAB2zegGQSAIopBQACVYgiWcFWAplIQVaAdqB9qBJWAH7MZB/dCQwC6scUguwN/L7dxeeBy7AWEJS1jCEpawhP1r2OrbWYmhsQRsPfTJHS0GSUajfuvTaaRwmYUrWGcPo3gMv8DUHcB5NR760+d/VZ7vAJ0s81x4Lgjh3egdWdbH1RhDPmufhTFMU/M826YgwFdEo0U0qlAxeL/Q0m54LWHE480sSq+me9ur+3Ax0NYF0XyB7T6H6wZ62iN7iWUzZ1s4gOovpbLPZchNQSD3KHmNkt+tJ8JqZk8yDpYl94JtvSGfvZoWkbCEJSxhCUtYwv4qbCdAO2dQgzAQRNElwQAOigNwAEoAB0gABeAAcIAEUEAdtE5gJwzphENDgNKd8n4yl56al5/ZafZ3XA0yuAABFrCARYAFLGARYAELWARYwAL2M8lFeRFr9m4srOkYmWfHZrFW10o7vU/HsV/QXC9+5c6/jJUr5EL+jQXsh5JsQqy15mcE9DxUgUwXbnZxeEnuJ9b4yc1lym52NxUYN/eMm5Prze7HLXXz0Lg5pODmTs2x6uaFcfOyLTd3/QMhD/cs3EOTULPrC7A10pUlhSYgS20PmZpYWsbhF+/R7wBIyWFv9RATSdR5+SuAnXKs7gMszHaUzLhy0DZUN2DFlbE2jxMoPjrG2vcqTXX1B3Psi668GFfKT1oj48p1ymZIrcfKZ+vJ9ErpnZMm4vf/BjZTkOfgXITimAoAiwALWMAiwAIWsAiwgAUsAixg/eoG4ct/UkC0PtwAAAAASUVORK5CYII=");background-repeat:no-repeat;background-position:50% 50%;-webkit-transform:scale(0);-moz-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}'
   style.innerHTML += '#pause_icon' + uid + '{position:absolute;left:0;top:0;opacity:0;width:80px;height:80px;border-radius:100%;background-color:rgba(0,0,0,0.5);background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAAEiUVFhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNpi/P//PwOxgImBBEBnxYyMjGA8SN3Mgk0QV9jTzhkAAcQ4TKK7HhrV9YPUzYMknAECiCRn0MwVQ8rgelhBgiuFjZygIBmMJjfaGwwQQDQJY6YhEwSjhg6Mof/RisX9o2E6aiidDR0t+kYNpTIACCCatViGVJti1LGjjh11LPUcaw/E8sgNJrTGkz5IfrA49gAQJ+CRn0BAfjQZjDp21LGjjh2gousBHvkLBORHm4ijjh117KhjSQAAAdizYxQAQBAAgPQyv97TImp1CiTwXB28QUTUNICFhYWFhYVtj43sznVvXfHT1rW/mCNNniJDG8DCwsLCwsLCdsLOx3zpPqsNYGFhYWFhYctjCdCuHdoAAIMAEByd0ToaNa3FYCC5T5A1F0QFqz4ytkBgwYIVWLBgBRYsWIEFC7ZfvonqLKw4Fzv/PVgbK7BgwQosWLACCxaswIIFK7ADcxRnY8EKLFiwAgsWrMCCBSuwYPd2ATNcQ/MbiuZSAAAAAElFTkSuQmCC");background-repeat:no-repeat;background-position:50% 50%;-webkit-transform:scale(0);-moz-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}'
   style.innerHTML += '.animate_icon' + uid + '{-webkit-animation:jump_icon' + uid + ' 0.3s ease-in;-moz-animation:jump_icon' + uid + ' 0.3s ease-in;animation:jump_icon' + uid + ' 0.3s ease-in}'
   style.innerHTML += '@-webkit-keyframes jump_icon' + uid + '{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:scale(1.2);transform:scale(1.2)}99.99%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}100%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@-moz-keyframes jump_icon' + uid + '{0%{opacity:0;-moz-transform:scale(0);transform:scale(0)}50%{opacity:1;-moz-transform:scale(1.2);transform:scale(1.2)}99.99%{opacity:0;-moz-transform:scale(1);transform:scale(1)}100%{opacity:0;-moz-transform:scale(0);transform:scale(0)}}@keyframes jump_icon' + uid + '{0%{opacity:0;-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:scale(1.2);-moz-transform:scale(1.2);transform:scale(1.2)}99.99%{opacity:0;-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}100%{opacity:0;-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}}'
   
   style.innerHTML += '#timeline_bar' + uid + '{z-index:1000001;position:absolute;left:0;width:0;' + timeline_bar_style + ';-moz-box-sizing:border-box;box-sizing:border-box;-webkit-animation:timeline_bar' + uid + ' ' + animation_duration + 's linear infinite;-moz-animation:timeline_bar' + uid + ' ' + animation_duration + 's linear infinite;animation:timeline_bar' + uid + ' ' + animation_duration + 's linear infinite}';
   style.innerHTML += '@-webkit-keyframes timeline_bar' + uid + '{0%{width:0%}100%{width:100%}}';
   style.innerHTML += '@-moz-keyframes timeline_bar' + uid + '{0%{width:0%}100%{width:100%}}';
   style.innerHTML += '@keyframes timeline_bar' + uid + '{0%{width:0%}100%{width:100%}}';

   /**
    * Add Playing / Paused icons container and timeline bar
    */
   var playback_state = container.add('div', {name: 'id', val: 'playback_state' + uid});
   var play_icon = playback_state.add('div', {name: 'id', val: 'play_icon' + uid});
   var pause_icon = playback_state.add('div', {name: 'id', val: 'pause_icon' + uid});
   var timeline_bar = container.add('div', {name: 'id', val: 'timeline_bar' + uid});

   /**
    * Play / pause controller
    */
   var Playback = {
      is_playing: true,
      action: function(action){
         var divs = Array.prototype.slice.call(document.getElementsByTagName("div"), 0);
         var spans = Array.prototype.slice.call(document.getElementsByTagName("span"), 0);
         var elements = divs.concat(spans);
         for (var i = 0, len = elements.length; i < len; i++) {
            switch(action){
               case 'play':
                  if(elements[i].id != 'play_icon' + uid && elements[i].id != 'pause_icon' + uid){
                     elements[i].style.animationPlayState = 'running';
                     elements[i].style.WebkitAnimationPlayState = 'running';
                  }
               break;
               case 'pause':
                  if(elements[i].id != 'play_icon' + uid && elements[i].id != 'pause_icon' + uid){
                     elements[i].style.animationPlayState = 'paused';
                     elements[i].style.WebkitAnimationPlayState = 'paused';
                  }
               break;
            }
         }
      },
      play: function(){
         Playback.is_playing = true;
         Playback.action('play');
         play_icon.className = 'animate_icon' + uid;
         pause_icon.className = '';
      },
      pause: function(){
         Playback.is_playing = false;
         Playback.action('pause');
         play_icon.className = '';
         pause_icon.className = 'animate_icon' + uid;
      },
      toggle: function(){
         Playback.is_playing = !Playback.is_playing;
         Playback.is_playing ? Playback.play() : Playback.pause();
      }
   }

   /**
    * Bind SPACEBAR button
    */
   document.on('keydown', function(e){
      switch(window.event, e.which || e.keyCode){
         case SPACEBAR:
            e.preventDefault();
            Playback.toggle();
         break;
      }
   });

   return {playback: Playback, play: Playback.play, pause: Playback.pause, toggle: Playback.toggle};
}