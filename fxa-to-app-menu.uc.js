window.delayedStartupPromise.then(() => {
  const fxaBtn = document.getElementById("fxa-toolbar-menu-button");
  if (!fxaBtn) return;

  const openAppMenuHere = async (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    if (e.type === "keypress" && ![" ", "Enter"].includes(e.key)) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (PanelUI.panel.state === "open") {
      PanelUI.hide();
      return;
    }

    await PanelUI.ensureReady();
    const anchor = PanelUI._getPanelAnchor(fxaBtn);
    await PanelMultiView.openPopup(PanelUI.panel, anchor, {
      triggerEvent: e.type === "keypress" ? null : e,
    });
  };

  fxaBtn.addEventListener("mousedown", openAppMenuHere, true);
  fxaBtn.addEventListener("keypress", openAppMenuHere, true);
});
