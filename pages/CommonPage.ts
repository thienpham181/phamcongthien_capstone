import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TopBarNagivation } from "./components/TopBarNavigation";

export class CommonPage extends BasePage{

readonly topBarNagivation: TopBarNagivation;

    constructor (page:Page){
        super(page);
        this.topBarNagivation = new TopBarNagivation(page);
    }
}