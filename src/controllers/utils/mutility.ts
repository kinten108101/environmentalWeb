export class Cancellable {
	handlers = /** @type {@type {(() => void)[]}} */([]);
	cancelled = false;

	/**
	 * @param {() => void} handler
	 */
	onCancelled(handler) {
		console.debug("Cancel connected");
		this.handlers.push(handler);
		return handler;
	}

	cancel() {
		console.debug("Cancel dispatched");
		this.cancelled = true;
		this.handlers.forEach((x) => x());
	}

	/**
	 * @param {() => void} handler
	 */
	off(handler) {
		console.debug("Cancel handle off");
		const foundIdx = this.handlers.indexOf(handler);
		if (foundIdx === -1) return;
		this.handlers.splice(foundIdx, 1);
	}
}

/**
 * @param {number} durationMs
 * @param {Cancellable=} cancellable
 */
export async function delayMs(durationMs, cancellable) {
	return new Promise(resolve => {
		/**
		 * @type {(() => void) | undefined}
		 */
		let handleCancel = undefined;
		const handleTimeout = setTimeout(() => {
			if (handleCancel) {
				cancellable?.off(handleCancel);
			}
			resolve(true);
		}, durationMs);
		handleCancel = cancellable?.onCancelled(() => {
			clearTimeout(handleTimeout);
			resolve(false);
		});
	});
};

/**
 * @template {object} T
 * @param {T} x
 */
export function $(x) {
	/**
	 * @template {(..._args: any[]) => any} R
	 * @template K
	 * @this {K}
	 * @param {R} func
	 */
	function prepare(func) {
		return /** @type {import("./typing.js").BoundFunction<R>} */(/** @type {unknown} */(func.bind(this, x)));
	}
	
	const retval = {
		$: prepare,
	};

	return retval;
}
