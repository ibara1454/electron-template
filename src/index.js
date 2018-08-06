/**
 * Setting file of electron
 */

'use strict';

import {app, BrowserWindow} from 'electron';

app.on('ready', () => {
  let window = new BrowserWindow({
    nodeIntegration: false,
    width: 800,
    height: 600
  });
  window.loadURL(`file://${__dirname}/main.html`);
});

app.on('window-all-closed', function() {
  app.quit();
});
