/* Lorenzo Hub v1.7 — routing */
(function(){
  function cfg(){ return window.LORENZO_HUB_CONFIG || {}; }

  window.openFeniceSection = function(section){
    const s = encodeURIComponent(section || 'home');
    window.location.href = './fenice-bridge.html?section=' + s;
  };

  window.openFeniceHome = function(){
    window.location.href = cfg().feniceBase || 'https://lorenzogtp.github.io/fenice-palcoscenico-/';
  };

  window.openACTVLatest = function(){
    window.location.href = cfg().actvLatest || 'https://actv-rapido-lorenzo.novecento64.chatgpt.site/';
  };

  window.openPensionLatest = function(){
    window.location.href = cfg().pensionLatest || 'https://pensione-lorenzo.novecento64.chatgpt.site/';
  };


  window.openSamsungCalendar = function(){
    const ms = Date.now();
    const intentUrl = `intent://com.android.calendar/time/{ms}#Intent;scheme=content;action=android.intent.action.VIEW;package=com.samsung.android.calendar;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.samsung.android.calendar;end`.replace('{ms}', String(ms));
    // Must be invoked directly by a tap/click so Chrome treats it as a user gesture.
    window.location.href = intentUrl;
  };

  window.openHubExternal = function(key){
    const url = cfg().external && cfg().external[key];
    if(url) window.open(url, '_blank', 'noopener');
  };
})();
