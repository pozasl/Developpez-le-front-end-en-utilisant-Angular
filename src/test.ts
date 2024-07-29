// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

export class TestBedInitializer {

    static isInitialized: Boolean = false;

    static getTestBed() {
        if(!this.isInitialized) {
            console.log(this.isInitialized, "CALLED HERE <=========================================");
            TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
                teardown: { destroyAfterEach: true },
              });
            this.isInitialized = true;
        }

        return TestBed;
    }
}