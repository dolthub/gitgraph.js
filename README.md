## Package updates

This package includes changes to the original [GitGraph.js](https://github.com/nicoespeon/gitgraph.js) package to take commit info from [DoltHub](https://www.dolthub.com) in order to support pagination, and add a new design for the branch paths and commit dots.
The changes have been implemented in two sub-packages: `core` and `react`.

## Publishing

Each subpackage in this repository is its own npm package. We only publish the [`react`](https://www.npmjs.com/package/@dolthub/gitgraph-react) and [`core`](https://www.npmjs.com/package/@dolthub/gitgraph-core) packages.

Before publishing the package, it is necessary to build the package to generate the `./lib` directory. For example, to publish `gitgraph-react`, you should run:

`gitgraph-react % yarn build gitgraph-react % yarn publish`

You should see changes in the CHANGELOG and package.json for the new version
