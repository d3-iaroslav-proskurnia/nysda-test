import { test, expect,Locator} from '@playwright/test';
import {Axe_accessability_Methods} from "@pages/axe-accessability-methods";

test.describe('Accessability fast check suite', ()=> {

    test.beforeEach(async () => {
        console.log(`Starting test with name: "${test.info().title}"`);
    })

})