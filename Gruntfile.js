module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'style/style.css' : 'sass/style.scss'
				}
			}
		},
		uncss: {
		  dist: {
          options: {
            ignore: ['a[x-apple-data-detectors]', 'a[href^=tel]', '.roboto'],
          },
			files: {
			  'style/cleaned_style.css': ['index.html']
			}
		  }
		},
		processhtml: {
		  dist: {
			files: {
			  'inline/index.html': ['index.html']
			}
		  }
		},
		premailer: {
		  main: {
			options: {
			  verbose: true
			},
			files: {
			  'inline/index-inline.html': ['inline/index.html']
			}
		  }
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['email']
			},
			html: {
				files: 'index.html',
				tasks: ['email']
			}
		}
	});
	grunt.registerTask('email', ['sass','uncss', 'processhtml', 'premailer']);
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-premailer');	
	grunt.registerTask('default',['watch']);
}