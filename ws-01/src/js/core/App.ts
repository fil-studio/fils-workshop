import { ThreeDOMLayer } from "@fils/gl-dom";
import { ThreeSketch } from "../gfx/ThreeSketch";
import { Timer } from "@fils/ani";
import { D, Scroller } from "@fils/scroller";

export class App {
	gl:ThreeDOMLayer;
	sketch:ThreeSketch;
	clock:Timer;
	scroller:Scroller;

	constructor() {
		this.gl = new ThreeDOMLayer(document.querySelector('.view'));
		this.gl.renderer.setClearColor(0xffffff, 1);
		this.sketch = new ThreeSketch(this.gl);
		this.start();

		this.scroller = new Scroller({
			// allowVerticalScrolling: false,
			// direction: D.LEFT,
			easing: 0.2,
			// snapping: true
		});
	}

	start() {
		const animate = () => {
			requestAnimationFrame(animate);
			this.update();
		}

		requestAnimationFrame(animate);

		this.clock = new Timer(true);
	}

	update() {
		this.clock.tick();
		const t = this.clock.currentTime;
		this.sketch.update(t);
		this.sketch.render();
		this.scroller.update();
	}
}