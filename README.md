# csnp

a tool fast to generate vscode code snippets.

## Install
```bash
$ npm i -g csnp

$ yarn i -g csnp

$ pnpm i -g csnp

$ bun i -g csnp
```

## `csnp`

easily use interactive prompts to generate .csnp files for managing code snippets

<img src='demo/csnp.png' alt='csnp' width="100%" />

## .csnp to code-snippets

transform all *.csnp files and store locally or global(vscode)

```bash
# local (default)
$ csnp push

# global (vscode)
$ csnp push --global
```



## code-snippets to .csnp

sync all snippets from local or global(vscode) and store in .csnp dir

```bash
# local (default)
$ csnp pull

# global (vscode)
$ csnp pull --global
```

## License

MIT