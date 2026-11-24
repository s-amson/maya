(function(){
  const a=document.getElementById('bgm'),bar=document.getElementById('musicBar'),
        pb=document.getElementById('mPlay'),mb=document.getElementById('mMute');
  let userPaused=false;
  function ui(){
    const playing=!a.paused;
    bar.classList.toggle('playing',playing);
    pb.textContent=playing?'\u23F8':'\u25B6';
    pb.setAttribute('aria-label',playing?'Pause music':'Play music');
    mb.textContent=a.muted?'\uD83D\uDD07':'\uD83D\uDD0A';
    mb.setAttribute('aria-label',a.muted?'Unmute music':'Mute music');
  }
  function tryPlay(){const p=a.play();if(p&&p.catch)p.catch(function(){});}
  pb.addEventListener('click',function(){
    if(a.paused){userPaused=false;tryPlay();}else{userPaused=true;a.pause();}
  });
  mb.addEventListener('click',function(){a.muted=!a.muted;ui();});
  ['play','pause','volumechange'].forEach(function(e){a.addEventListener(e,ui);});
  a.addEventListener('error',function(){pb.disabled=true;mb.disabled=true;bar.classList.remove('playing');});
  // Play 1 second after the page opens. Browsers may block sound until the visitor
  // interacts, so if that happens the music starts on her first tap, click or key press.
  var delayDone=false,evs=['pointerdown','touchstart','keydown'];
  function gesture(){if(delayDone&&!userPaused&&a.paused)tryPlay();}
  evs.forEach(function(e){document.addEventListener(e,gesture,{passive:true});});
  a.addEventListener('playing',function(){evs.forEach(function(e){document.removeEventListener(e,gesture);});});
  setTimeout(function(){delayDone=true;if(!userPaused)tryPlay();},1000);
  ui();
})();
