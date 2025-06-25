function easeInOutQuad(t) {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function getOffset(section) {
	const box = section.getBoundingClientRect();

	const body = document.body;
	const docEl = document.documentElement;

	const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	const clientTop = docEl.clientTop || body.clientTop || 0;
	const clientLeft = docEl.clientLeft || body.clientLeft || 0;

	const top  = box.top +  scrollTop - clientTop;
	const left = box.left + scrollLeft - clientLeft;

	return { top: Math.round(top), left: Math.round(left) };
}

export default function animate(elem, target, style, unit, time, prop) {
	let from = elem.scrollTop;
	let to = 0;

	if (!elem) {
		return;
	} else {
		to = getOffset(target).top;
	}

	let start = new Date().getTime(),
		timer = setInterval(function () {
			let step = Math.min(1, (new Date().getTime() - start) / time);
			if (prop) {
				elem[style] = (from + step * (to - 200 - from)) + unit;
			} else {
				elem.style[style] = (from + step * (to - 200 - from)) + unit;
			}
			if (step === 1) {
				clearInterval(timer);
			}
		}, 25);
	if (prop) {
		elem[style] = from + unit;
	} else {
		elem.style[style] = from + unit;
	}
}
