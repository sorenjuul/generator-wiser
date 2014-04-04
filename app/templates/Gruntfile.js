'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    //load the shell module
    grunt.loadNpmTasks('grunt-shell');

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'www'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
                    '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/js/views/*.{ejs,mustache,hbs,tpl}',
                    'test/spec/**/*.js'
                ]
            },
            handlebars: {
                files: [
                    '<%= yeoman.app %>/js/views/*.tpl'
                ],
                tasks: ['handlebars']
            },
            test: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test:true']
            }
        },
        connect: {
            options: {
                port: SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,*/}*.js',
                '!<%= yeoman.app %>/js/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    src: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= yeoman.app %>/js',
                    optimize: 'none',
                    mainConfigFile: '<%= yeoman.app %>/js/main.js',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },

        //cssmin: {
        //    dist: {
        //        files: {
        //            '<%= yeoman.dist %>/css/main.css': [
        //                '.tmp/css/{,*/}*.css',
        //                '<%= yeoman.app %>/css/{,*/}*.css'
        //            ]
        //        }
        //    }
        //},

        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'img/{,*/}*.{webp,gif,png,jpeg}',
                        'font/{,*/}*.*',
                        'cordova.mock.js',
                        'css/images/*',
                        'js/mockdata/*.json',
                        'config.xml'
                    ]
                }]
            },
            debug: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                src: '**',
                dest: '<%= yeoman.dist %>'
            },
            template: {
                src: '.tmp/js/template.js',
                dest: '<%= yeoman.dist %>/js/'
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/main.js'
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'Wiser.Templates',
                    amd: true
                },
                files: {
                    '<%= yeoman.app %>/js/templates.js': ['<%= yeoman.app %>/js/views/*.tpl']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/js/{,*/}*.js',
                        '<%= yeoman.dist %>/css/{,*/}*.css',
                        //'<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/font/{,*/}*.*'
                    ]
                }
            }
        },

        shell: {
            runAndroid: {
                command: 'phonegap -V run android'
            },
            runIos: {
                command: 'phonegap -V run ios'
            }
        }

    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build',
                'open:server',
                'connect:dist:keepalive'
            ]);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'open:test',
                'watch:handlebars',
                'watch:livereload'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'handlebars',
            'connect:livereload',
            'open:server',
            'watch:handlebars',
            'watch:livereload'
        ]);
    });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
                'clean:server',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'mocha',
                'watch:test'
            ];

        if(!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars',
        'useminPrepare',
        'requirejs',
        //'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('hint', [
        'jshint'
    ]);

    grunt.registerTask('phonegapbuild', function(target){

        grunt.task.run([
            'build'
        ]);

        if(target === 'android') {
            return grunt.task.run([
                'shell:runAndroid'
            ]);
        }

        if(target === 'ios') {
            return grunt.task.run([
                'shell:runIos'
            ]);
        }
        grunt.fail.fatal('Supported platform missing');
    });

    grunt.registerTask('phonegapdebug', function(target){

        grunt.task.run([
            'clean:dist',
            'copy:debug'
        ]);

        if(target === 'android') {
            return grunt.task.run([
                'shell:runAndroid'
            ]);
        }

        if(target === 'ios') {
            return grunt.task.run([
                'shell:runIos'
            ]);
        }
        grunt.fail.fatal('Supported platform missing');
    });

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);


};
