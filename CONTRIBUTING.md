## Contributing

### Getting Started

You will need Node.js version 8.9 or higher.

The development environment only supports Unix shells, i.e. Mac OS and Linux.

For Windows environments, consider using Windows Subsystem for Linux or a cloud-based development server.

Yarn is the preferred package manager for developing in the repository, but npm is supported.

When using npm instead of Yarn for script commands use `npm run` in place of just `yarn`.

### Starting the Example Site

```bash
$ yarn
$ yarn start
```

Navigate your browser to http://localhost:8080

Note: port may change depending on usage in your system, observe the terminal output when running the start command to see what port the site is running on.

### Building the Example Site for Github Pages

```bash
$ yarn build
```

### Commit Messages

This repository will only support commit messages in the Angular format from Commitizen.

These messages are easily produced using the interactive commitizen interface

```bash
$ yarn cz
```

### Releases

This package follows Symantic Versioning use the following scripts to tag the package and update the version number.

```bash
$ yarn b patch 'some-unique-release-identifier'
$ yarn b minor 'some-unique-release-identifier'
$ yarn b major 'some-unique-release-identifier'
```

### Programming Guidelines

Examples and templates will be written in Pug instead of HTML.

linting:

```bash
$ yarn b lint
```
