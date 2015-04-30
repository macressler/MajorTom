/**
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      snow: {
        options: {
          banner: '/*! Snow <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/css/dist/extra/snow-animation.min.css': ['public/css/src/extra/snow-animation.css']
        }
      },
      staff: {
        options: {
          banner: '/*! Staff <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/css/dist/main/staff.min.css': ['public/css/src/main/staff.css']
        }
      },
      admin: {
        options: {
          banner: '/*! Admin <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/css/dist/main/admin.min.css': ['public/css/src/main/admin.css']
        }
      },
      textAnimation: {
        options: {
          banner: '/*! Text-animation <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/css/dist/main/text-animation.min.css': ['public/css/src/main/text-animation.css']
        }
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['public/js/src/<%= pkg.name %>/<%= pkg.name %>-main.js'],
        dest: 'public/js/tmp/<%= pkg.name %>.js'
      }
    },
    uglify: {
      snow: {
        options: {
          banner: '/*! Snow <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/js/dist/extra/Snow.min.js': ['public/js/src/Snow/snow.js']
        }
      },
      dash: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/js/dist/main/<%= pkg.name %>.min.js': ['public/js/tmp/<%= pkg.name %>.js']
        }
      },
      admin: {
        options: {
          banner: '/*! admin.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/js/dist/main/admin.min.js': ['public/js/src/admin.js']
        }
      },
      staff: {
        options: {
          banner: '/*! admin.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/js/dist/main/staff.min.js': ['public/js/src/staff.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/basic.html'
          ]
        }
      }
    } 
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);
  grunt.registerTask('test', ['connect', 'qunit']);
};
