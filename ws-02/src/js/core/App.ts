import { Timer } from "@fils/ani";
import { ThreeDOMLayer } from "@fils/gl-dom";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ThreeSketch } from "../gfx/ThreeSketch";
import { DefaultPage } from "../pages/DefaultPage";
import { Nomad, NomadRoute, NomadRouteListener } from "@fils/nomad";
import { AboutPage } from "../pages/AboutPage";

export class App implements NomadRouteListener {
	gl:ThreeDOMLayer;
	sketch:ThreeSketch;
	clock:Timer;

	currentPage:DefaultPage;

	constructor() {
		this.gl = new ThreeDOMLayer(document.querySelector('.view'));
		this.gl.renderer.setClearColor(0xffffff, 1);
		this.sketch = new ThreeSketch(this.gl);

		gsap.registerPlugin(SplitText);

		gsap.ticker.remove(gsap.updateRoot);

		this.initNomad();

		this.start();
	}

	initNomad() {
		const nomad = new Nomad({
			replace: false
		}, (id, template, dom) =>{
			console.log(id, template)
			if (template === 'about') return new AboutPage(id, template, dom)
			return new DefaultPage(id, template, dom);
		})

		nomad.addRouteListener(this);

		this.currentPage = nomad.route.page as DefaultPage;
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
		this.currentPage?.update();
	}

	onRouteChangeStart(href: string): void {
		
	}

	onRouteChanged(route: NomadRoute): void {
		this.currentPage = route.page as DefaultPage;
	}
}