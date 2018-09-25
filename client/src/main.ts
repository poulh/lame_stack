/*
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/app.component.ts`.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';

import { LoopBackConfig } from '../sdk';

if (environment.production) {
  enableProdMode();
  const loc = window.location;
  console.log(loc);
  let uri = loc.protocol + "//" + loc.hostname;
  if (loc.port != "80" && loc.port != "") {
    uri = uri + ":" + loc.port;
  }
  console.log(uri);
  LoopBackConfig.setBaseURL(uri);
} else {
  LoopBackConfig.setBaseURL("http://localhost:3000");
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

