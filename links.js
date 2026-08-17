/* Lorenzo Hub - gestore collegamenti v1.1 */
(function(){
  const cfg = () => window.LORENZO_HUB_CONFIG || {apps:{},external:{}};

  function resolveApp(key){
    const app = cfg().apps?.[key];
    if(!app) return null;
    const custom = localStorage.getItem("lorenzoHub.custom."+key);
    return custom || app.local || null;
  }

  window.openHubApp = function(key){
    const url = resolveApp(key);
    if(!url){
      if(window.hubToast) window.hubToast("Collegamento non configurato");
      return;
    }
    window.location.href = url;
  };

  window.openHubExternal = function(key){
    const url = cfg().external?.[key];
    if(!url){
      if(window.hubToast) window.hubToast("Collegamento non configurato");
      return;
    }
    window.open(url, "_blank", "noopener");
  };

  window.saveHubCustomLink = function(key, value){
    const clean = (value || "").trim();
    if(clean) localStorage.setItem("lorenzoHub.custom."+key, clean);
    else localStorage.removeItem("lorenzoHub.custom."+key);
  };

  window.getHubResolvedLink = resolveApp;
})();
