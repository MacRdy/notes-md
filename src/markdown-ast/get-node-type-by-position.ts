import { CONTINUE, EXIT, visit } from '@flex-development/unist-util-visit';
import { Node } from './markdown-to-ast';

export const getNodeTypeByPosition = (ast: Node, position: number): string | undefined => {
	let nodeType: string | undefined = undefined;

	visit(ast, node => {
		if (!node.position) {
			return CONTINUE;
		}

		const { start, end } = node.position;

		if ((start.offset ?? 0) <= position && (end.offset ?? 0) >= position) {
			nodeType = node.type;

			return EXIT;
		}

		return CONTINUE;
	});

	return nodeType;
};
