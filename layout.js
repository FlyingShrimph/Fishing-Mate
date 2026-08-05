(() => {
  const style = document.createElement('style');
  style.textContent = '.grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:16px!important}.zone{grid-column:1 / -1!important;grid-row:1!important;min-height:470px}.tide{grid-column:1!important;grid-row:2!important}.species{grid-column:2!important;grid-row:2!important}.temp{display:none!important}@media(max-width:760px){.grid{grid-template-columns:1fr!important}.zone,.tide,.species{grid-column:1!important}.zone{grid-row:1!important}.tide{grid-row:2!important}.species{grid-row:3!important}}';
  document.head.appendChild(style);
})();
