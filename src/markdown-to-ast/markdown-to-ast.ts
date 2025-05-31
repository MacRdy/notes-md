import { Processor } from 'unified';

export type Node = ReturnType<Processor['run']> extends Promise<infer T> ? T : never;

export const markdownToAst = (markdown: string) => {
	const worker = new Worker(new URL('./markdown-to-ast.worker.ts', import.meta.url));

	const result = new Promise<Node>((res, rej) => {
		worker.onmessage = (event: MessageEvent<Node>) => {
			worker.terminate();

			res(event.data);
		};

		worker.onerror = (error: ErrorEvent) => {
			worker.terminate();

			rej(new Error(`Worker error: ${error.message}`));
		};

		worker.postMessage(markdown);
	});

	return {
		result,
		terminate: (): void => {
			worker.terminate();
		},
	};
};
