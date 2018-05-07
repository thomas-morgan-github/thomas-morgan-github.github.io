
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  
	    notify: {
	        less:{
	            options:{
	                title: "CSS Files built",
	                message: "Compiled"
	            }
	        }
	    },


	 	notify_hooks: {
	    	options: {
			    enabled: true,
			    max_jshint_notifications: 5, // maximum number of notifications from jshint output 
			    title: "Grunt", // defaults to the name in package.json, or will use project directory's name 
			    success: false, // whether successful grunt executions should be notified automatically 
			    duration: 3 // the duration of notification in seconds, for `notify-send only 
			}
	 	},


	    concat: {
		    css: {
		      src: ['css/header.css', 'css/cms.css', 'css/fonts.css', 'css/homepage.css', 'css/introduction.css', 'css/portfolio-projects.css', 'css/contact.css'],
		      dest: 'build/css/styles.css',
		    },
	    },
	 

	    autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 8', 'ie 9']
            },
            dist: {
                files: {
                    'build/css/styles.css': 'build/css/styles.css'
                }
            }
        },


	    watch: {

			css: {
			  files: ['css/*.css'],
			  tasks: ['concat'],
			},

			less: {
			  files: ['less/templates/homepage/partials/*.less', 'less/templates/*.less'],
			  tasks: ['less', 'autoprefixer', 'notify:less'],
			},
	   },
	 

	    less: {
		  development: {
		    options: {
		      paths: ['less/templates/homepage/partials/', 'less/templates/*.less']
		    },
		    files: {
		      'css/header.css': 'less/templates/homepage/partials/header.less',
		      'css/cms.css': 'less/templates/homepage/partials/cms.less',
		      'css/fonts.css': 'less/templates/fonts.less',
		      'css/homepage.css': 'less/templates/homepage.less',
		      'css/introduction.css': 'less/templates/homepage/partials/introduction.less',
		      'css/portfolio-projects.css': 'less/templates/homepage/partials/portfolio-projects.less',
		      'css/contact.css': 'less/templates/homepage/partials/contact.less',
		    }
		  },
		},


		browserSync: {
		  default_options: {
		    bsFiles: {
		      src: [
		        "build/css/*.css",
		        "*.html"
		      ]
		    },
		    options: {
		      watchTask: true,
		      proxy: "localhost:80"
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', ['concat', 'less', 'autoprefixer', 'browserSync', 'watch', 'notify']);
};