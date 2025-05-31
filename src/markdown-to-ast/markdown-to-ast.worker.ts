/// <reference lib="webworker" />

import remarkParse from 'remark-parse';
import { unified } from 'unified';

addEventListener('message', (event: MessageEvent<string>) => {
	const content = event.data;

	const processor = unified().use(remarkParse);

	const ast = processor.parse(content);

	processor.run(ast).then(node => {
		postMessage(node);
	});
});
