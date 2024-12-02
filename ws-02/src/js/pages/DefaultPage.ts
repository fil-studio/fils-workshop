import { Page } from "@fils/nomad";
import { Scroller } from "@fils/scroller";
import { HeaderSection } from "../sections/HeaderSection";
import gsap from "gsap";

export class DefaultPage extends Page {
    scroller:Scroller;

    constructor(id: string, template: string, dom: HTMLElement) {
        super(id, template, dom);

        gsap.set(dom, {
          autoAlpha: 0,
        })
    }

    update() {
      this.scroller.update();
    }

    transitionIn(resolve: any): Promise<void> {
      this.scroller.restore();
        /* return new Promise<void>((gsapResolve) => {
          gsap.to(this.dom, {
            autoAlpha: 1,
            duration: 1,
            ease: 'linear',
            onComplete: () => {
              gsapResolve()
            },
          })
        }).then(resolve) */

        gsap.to(this.dom, {
            autoAlpha: 1,
            duration: 1,
            ease: 'linear'
        })

        return Promise.resolve().then(resolve);
    }

    transitionOut(resolve: any): Promise<void> {
        /* return new Promise<void>((gsapResolve) => {
          gsap.to(this.dom, {
            autoAlpha: 0,
            duration: 1,
            ease: 'linear',
            onComplete: () => {
              gsapResolve()
            },
          })
        }).then(resolve) */

        gsap.to(this.dom, {
            autoAlpha: 0,
            duration: 1,
            ease: 'linear',
            onComplete: () => {
              this.dom.remove();
            }
        })

        return Promise.resolve().then(resolve);
    }

    create(): void {
        this.scroller = new Scroller({
            // allowVerticalScrolling: false,
            // direction: D.LEFT,
            container: this.dom.querySelector('[fil-scroller]'),
            easing: 0.2,
            // snapping: true
        });

        // custom sections
        const sections = this.dom.querySelectorAll('[fil-scroller-section="hello"]');
        for(const s of sections) {
            //@ts-ignore
            const cs = new HeaderSection(s, this.scroller);
        }

        const container = document.querySelector('[fil-scroller]');
        const rs = new ResizeObserver(() => {
            // console.log('resize');
            this.scroller.restore();
        })
        rs.observe(container);
    }

    dispose(): void {
      this.scroller.dispose();
    }
}