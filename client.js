// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from "react-360-web";

function init(bundle, parent, options = {}) {
  // initialise instant game
  if (FBInstant) {
    FBInstant.initializeAsync().then(function() {
      FBInstant.setLoadingProgress(100);
      FBInstant.startGameAsync();
    });
  }

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("BasicAppTemplate", {
      /* initial props */
    }),
    r360.getDefaultSurface()
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("Zen360.jpg"));
}

window.React360 = { init };
