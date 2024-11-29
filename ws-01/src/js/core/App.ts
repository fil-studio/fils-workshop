import { ThreeDOMLayer } from "@fils/gl-dom";
import { ThreeSketch } from "../gfx/ThreeSketch";
import { Timer } from "@fils/ani";
import { D, Scroller } from "@fils/scroller";
import { HeaderSection } from "../sections/HeaderSection";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export class App {
	gl:ThreeDOMLayer;
	sketch:ThreeSketch;
	clock:Timer;
	scroller:Scroller;

	constructor() {
		this.gl = new ThreeDOMLayer(document.querySelector('.view'));
		this.gl.renderer.setClearColor(0xffffff, 1);
		this.sketch = new ThreeSketch(this.gl);

		gsap.registerPlugin(SplitText);

		this.scroller = new Scroller({
			// allowVerticalScrolling: false,
			// direction: D.LEFT,
			easing: 0.2,
			// snapping: true
		});

		// custom sections
		const sections = document.querySelectorAll('[fil-scroller-section="hello"]');
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

		gsap.ticker.remove(gsap.updateRoot);

		this.start();

		// rs.disconnect();

		/* window.addEventListener('resize', event => {
			this.scroller.restore();
		}); */
	}

	start() {
		const animate = () => {
			requestAnimationFrame(animate);
			this.update();
		}

		requestAnimationFrame(animate);

		this.clock = new Timer(true);

		window.addEventListener('blur', event => {
			console.log('blur');
			this.clock.pause();
		})

		window.addEventListener('focus', event => {
			console.log('focus');
			this.clock.resume();
		})
	}

	update() {
		if(this.clock.paused) return;
		this.clock.tick();
		const t = this.clock.currentTime;
		gsap.updateRoot(t);
		this.sketch.update(t);
		this.sketch.render();
		this.scroller.update();
	}
}