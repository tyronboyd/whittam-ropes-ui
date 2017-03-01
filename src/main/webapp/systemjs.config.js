/**
 * System configuration for Angular app
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'distjs/lib/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'distjs/src/app',
      // angular bundles
      '@angular/core': 'npm:@angular/core.umd.min.js',
      '@angular/common': 'npm:@angular/common.umd.min.js',
      '@angular/compiler': 'npm:@angular/compiler.umd.min.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'npm:@angular/http.umd.min.js',
      '@angular/router': 'npm:@angular/router.umd.min.js',
      '@angular/forms': 'npm:@angular/forms.umd.min.js',
      // other libraries
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'ng2-translate': 'npm:ng2-translate',
      //jwt
      'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js',
      'js-base64':'npm:js-base64/base64.js',
      'buffer':'@empty'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': {
        main: './main.js',
        defaultExtension: 'js'
      },
      'ng2-translate': {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    },
    bundles: {
            "/distjs/lib/rxjs/bundles/Rx.js": [
                "rxjs/*",
                "rxjs/symbol/*",
                "rxjs/operator/*",
                "rxjs/observable/*",
                "rxjs/add/operator/*",
                "rxjs/add/observable/*",
                "rxjs/util/*"
            ]
        }
  });
})(this);
