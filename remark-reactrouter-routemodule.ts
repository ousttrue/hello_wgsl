import { valueToEstree } from 'estree-util-value-to-estree';
// import { type Literal, type Root } from 'mdast';
// import { type Plugin } from 'unified';
import { parse as parseYaml } from 'yaml';

function process(ast, metaData) {
  ast.children.unshift({
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: 'meta' },
                  init: {
                    type: 'ArrowFunctionExpression',
                    expression: false,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: valueToEstree(metaData, {
                            preserveReferences: true,
                          }),
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

type RemarkReactRouerRouteModuleOptions = {
  meta: (frontmatter: unknown) => Record<string, string>[];
};

const remarkReactRouerRouteModule = ({ meta }: RemarkReactRouerRouteModuleOptions) => {
  const allParsers: Record<string, (value: string) => unknown> = {
    yaml: parseYaml,
  };

  return (ast) => {
    let data: unknown;
    const node = ast.children.find((child) =>
      Object.hasOwn(allParsers, child.type),
    );

    if (node) {
      const parser = allParsers[node.type];
      const { value } = node as Literal;
      data = parser(value);
    }

    const metaData = data ? meta(data) : undefined;

    if (metaData) {
      process(ast, metaData);
    }
  };
};

export default remarkReactRouerRouteModule;
