<p align="center">
  <a href="https://www.npmjs.com/package/csnp" target="_blank" rel="noopener noreferrer">
    <img width="268" src="https://ik.imagekit.io/junxio/csnp/CSNP.jpg" alt="logo for csnp">
  </a>
</p>

<h1 align=center>csnp</h1>

<p align=center>A cli-tool for generating VSCode code snippets.</p>

<p align=center>
  <img alt="npm" src="https://img.shields.io/npm/v/csnp?logo=Visual%20Studio%20Code&logoColor=%23007ACC&labelColor=%23fff&color=F83C00">
</p>

<img alt="npm" src="./demo/demo.gif" width=100% alt=demo>

## Install
```bash
pnpm i -g csnp # recommend

npm i -g csnp

yarn i -g csnp

bun i -g csnp
```

## `csnp`

Using interactive prompts to generate `.csnp` files for managing vscode code snippets.

<img src='demo/start.png' alt='csnp' width="100%" />

### Rule csnp Path

The expected path for your snippets is:

`.csnp/{SnippetType}/{SnippetName}.csnp`

For example:

`.csnp/js/log.csnp`

```yaml
SnippetType: js
SnippetName: log
```

### Details

Open the file `.csnp/js/log.csnp` and edit the default code snippets as follows:

```csnp
---
name: Log
prefix: '-log'
description: log something
---

code snippets
```

- **name**: The name of the snippet.
- **prefix**: The trigger text for the snippet in editor.
- **description**: A brief description of what the snippet does.
- **code snippets**: The actual code that will be inserted.

Just edit and replace the line `code snippets` of `console.log`.

```csnp
---
name: Log
prefix: '-log'
description: log sth
---

console.log($1)
```

After editing, use the command:

```bash
csnp push
```

Then in editor you need to type the prefix `-log` and press Enter to generate the code.

<img src='demo/use-in-vscode.gif' alt='-clg' width="100%" />

## Transforming Snippets

You can transform all `.csnp` files and store them locally or globally(in VSCode).

```bash
# local (default)
$ csnp push

# global (VSCode)
$ csnp push --global
```

## Syncing Snippets

To sync all snippets from local or global(VSCode) and store them in `.csnp` directory.

```bash
# local (default)
$ csnp pull

# global (VSCode)
$ csnp pull --global
```

## Links

<a href='https://code.visualstudio.com/docs/editor/userdefinedsnippets' target='_blank' >How to use Snippet in Visual Studio Code.</a>

## License

MIT @ Junxio.
