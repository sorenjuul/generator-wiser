# Backbone.js and jquery mobile generator 

Maintainer: [Søren Juul](https://github.com/sorenjuul)

A Backbone generator for Yeoman that provides a functional boilerplate Backbone app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views, collections and so on.

Optional RequireJS (AMD) support has recently been added as a prompt when using the generator on new projects.


## Usage

Install: `npm install -g sorenjuul/generator-wiser`

Make a new directory and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo wiser`, optionally passing an app name:
```
yo wiser [app-name]
```

## Generators

Available generators:

- wiser:model
- wiser:view
- wiser:collection
- wiser:router
- wiser:all

## Typical workflow

```
yo wiser # generates your application base and build workflow
yo wiser:model blog
yo wiser:collection blog
yo wiser:router blog
yo wiser:view blog
grunt serve
```

Also checkout this [NetTuts write-up](http://net.tutsplus.com/tutorials/javascript-ajax/building-apps-with-the-yeoman-workflow/) for a guide to building Backbone.js apps using this generator.


## Options

* `--appPath`

  Generate scaffold into a custom directory.

* `--coffee`

  Generate scaffolds in CoffeeScript. By default check if project uses CoffeeScript.

* `--requirejs`

  Generate scaffolds using RequireJS (AMD) Loader. By default check if project uses RequireJS.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

* `--template-framework=[framework]`

  Defaults to `lodash` templating with grunt-contrib-jst.
  `handlebars` and `mustache` are also supported.

## A note regarding JST templates and strict mode

If you use strict mode in your app and JST templates the default grunt-jst implementation will cause your app to error out as the templates will be precompiled using a 'with' statement.

This can be addressed by changing the jst grunt task as follows:

```
jst: {
    compile: {
        options:
        {
            templateSettings:
            {
                variable: 'data'
            }
        },
        files: {
            '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
    }
},
```
A result of this change is that your template variable definitions must also be updated from `<%= templateVariable %>` to `<%= data.templateVariable %>`. More information on this can be found in the [Underscore documentation](http://underscorejs.org/#template).

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
