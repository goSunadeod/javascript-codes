# eslint-plugin-max-lines-exclude-style

不包括样式的最大行数限制

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-max-lines-exclude-style`:

```sh
npm install eslint-plugin-max-lines-exclude-style --save-dev
```

## Usage

Add `max-lines-exclude-style` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "max-lines-exclude-style"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "max-lines-exclude-style/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


