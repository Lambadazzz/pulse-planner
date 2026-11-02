(function (scope) {
  'use strict';
  var clock = new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Moscow',hour:'2-digit',hourCycle:'h23'});
  function at(date) { var hour=Number(clock.format(date)); return hour>=20||hour<6?'dark':'light'; }
  function apply(date) {
    var theme=at(date||new Date());
    if(typeof document!=='undefined') {
      document.documentElement.dataset.theme=theme;
      var meta=document.querySelector('meta[name="theme-color"]');
      if(meta)meta.content=theme==='dark'?'#18191f':'#f6f6f8';
    }
    return theme;
  }
  scope.PulseTheme={at:at,apply:apply};
  if(typeof document!=='undefined') {
    var timer;
    function tick(){apply();clearTimeout(timer);timer=setTimeout(tick,60000-Date.now()%60000+25);}
    tick();
    document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')tick();});
    scope.addEventListener('focus',tick);
  }
})(globalThis);
