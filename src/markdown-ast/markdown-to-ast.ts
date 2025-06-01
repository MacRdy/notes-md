import remarkParse from 'remark-parse/lib';
import { Processor, unified } from 'unified';

export type Node = ReturnType<Processor['run']> extends Promise<infer T> ? T : never;

export const markdownToAst = (content: string): Promise<Node> => {
	return new Promise((res, rej) => {
		const processor = unified().use(remarkParse);

		const ast = processor.parse(content);

		processor.run(ast).then(res).catch(rej);
	});
};
