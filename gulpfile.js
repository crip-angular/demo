var gulp = require('gulp'),
    crip = require('cripweb');

crip.sassConfig({
    dest: 'build/css',
    minify: false
});

crip.sass(
    'resources/assets/sass/app.scss',
    'resources/assets/sass/**/*.scss',
    'sass'
);

crip.scriptsConfig({
    dest: 'build/js',
    minify: false
});

crip.scripts(
    [
        '/jquery/dist/jquery.js',
        '/bootstrap-sass/assets/javascripts/bootstrap.js',
        '/angular/angular.js',
        '/angular-resource/angular-resource.js',
        '/crip-core/build/crip-core.js',
        '/crip-grid/build/crip-grid.js',
        '/crip-grid-url/build/crip-grid-url.js',
        '/crip-input/build/crip-input.angular.min.js'
    ],
    'vendor',
    'scripts-vendor',
    'bower_components'
);

crip.scripts(
    [
        '**/*.module.js',
        'app.js',
        '**/*.js'
    ],
    'app',
    'scripts-app',
    'resources/assets/js');

crip.copy('resources/views/**/*.*', 'build', 'copy-views');
crip.copy('bower_components/components-font-awesome/fonts/**/*.*', 'build/fonts', 'copy-fonts');

gulp.task('default', function () {
    crip.gulp.start('crip-default');
    crip.watch();
});