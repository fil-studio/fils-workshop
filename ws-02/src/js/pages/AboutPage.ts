import { DefaultPage } from "./DefaultPage";

export class AboutPage extends DefaultPage {
    constructor(id: string, template: string, dom: HTMLElement) {
        super(id, template, dom);
        console.log('About Page');
    }
}