import 'core-js';
import 'classlist.js';
import 'zone.js/dist/zone'; // Included with Angular CLI.
import cssVars from 'css-vars-ponyfill';

cssVars({
  watch: true,
  preserveVars: true,
  variables: {
    '--primary-color': '#007bc7',
    '--secondary-color': '#cce0f1',
    '--lightest': '#f7fafd',
    '--darker': '#4b4646',
  },
});

// NOTE: enables string.matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    (<any>Element.prototype).msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

// NOTE: following declaration is needed to prevent the following bug: https://stackoverflow.com/questions/62755093/angular-error-generic-type-modulewithproviderst-requires-1-type-arguments
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
