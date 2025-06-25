import ScrollTrigger from 'gsap/ScrollTrigger';

export default function scrollerProxy(scrollbar) {
	ScrollTrigger.scrollerProxy('html, body', {
		scrollTop(value) {
			if (arguments.length) {
				scrollbar.scrollTop = value;
			}
			return scrollbar.scrollTop;
		},
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		}
	});

	window.addEventListener('resize', () => {
		ScrollTrigger.update();
	})

	scrollbar.addListener(() => {
		ScrollTrigger.update();
	});
}
