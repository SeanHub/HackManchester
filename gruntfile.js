module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-wiredep');

	grunt.initConfig({
		wiredep: {
			app: {
				src: 'public/app/index.html'
			}
		}
	});

	grunt.registerTask('default', function () {
		grunt.log.writeln('no default tasks added');
	});
};