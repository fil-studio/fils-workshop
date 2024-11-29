import { ContentSection, Scroller } from "@fils/scroller";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export class HeaderSection extends ContentSection {
    split:SplitText;

    constructor(dom:HTMLElement, scroller:Scroller) {
        super(dom, scroller);
        this.init();
    }

    addEventListeners(): void {
        
    }

    onInit(): void {
        console.log('Initialize your custom things here')
        const h1 = this.dom.querySelector('h1');
        this.split = new SplitText(h1, {type: "chars"});
        console.log(this.split);
    }

    onBeforeRestore(): void {
        console.log('before restore')
        // this.split.revert();
    }

    onAfterRestore(): void {
        console.log('after restore')
        // const h1 = this.dom.querySelector('h1');
        // this.split = new SplitText(h1, {type: "chars"});
    }

    onAnimationIn(): void {
        console.log('in')
        gsap.from(this.split.chars, {
            overwrite: true,
            duration: .5,
            ease: 'cubic.out',
            y: 100, 
            autoAlpha: 0, 
            stagger: 0.05
        });
    }

    onAnimationOut(): void {
        console.log('out')
        
    }

    onUpdate(): void {
        const p = this.section.progress;
        // console.log(p.in, p.out, p.focus);
    }
}