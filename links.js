/* Lorenzo Hub v1.3 — routing */
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

  window.openHubExternal = function(key){
    const url = cfg().external && cfg().external[key];
    if(url) window.open(url, '_blank', 'noopener');
  };
})();
