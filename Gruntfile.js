module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // MetaData
      banner: '/*!\n* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
          ' \n* Licensed under: <%= pkg.license %> \n*/\n',
      // Task configuration.
      clean: {
          src: ['dist']
      },
      concat: {
          options: {
              banner: '<%= banner %>',
              stripBanners: true,
              seperator: ';',
          },
          main: {
              src: ['src/<%= pkg.name %>.js'],
              dest: 'dist/<%= pkg.name %>.js',
          },
          multiple_files: {
              files: {
                  'dist/full-<%= pkg.name %>.js': ['src/<%= pkg.name %>.js', ], // Define all files here.
              },
          },
      },
      jshint: {
          src: ['src/**/*.js']
      },
      uglify: {
          options: {
              banner: '<%= banner %>'
          },
          main: {
              src: '<%= concat.main.dest %>',
              dest: 'dist/<%= pkg.name %>.min.js',
          },
          multiple_files: {
              src: 'dist/full-<%= pkg.name %>.js',
              dest: 'dist/full-<%= pkg.name %>.min.js',
          },
      },
      watch: {
          src: {
              files: '<%= jshint.src %>',
              tasks: ['jshint:src'] // In the future testing tasks should also be invoked.
          },
      },
      copy: {
          main: {
              src: 'node_modules/twitter-bootstrap/dist/css/bootstrap.min.css',
              dest: 'dist/bootstrap.min.css',
          },
      },
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'copy:main']);
};