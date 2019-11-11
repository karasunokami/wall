WALL
=============
Laravel + Vuejs based single page application

# Stack
- Laravel 5.8;
- VueJS 2.6;
- Vue-router;
- Vuex;
- laravel-echo-server;
- redis;
- sqlite;

# todo
- [ ] only admin can edit & remove messages
- [ ] user cant edit own message after 2 hours
- [ ] admin can export messages to CSV for the period

# run
install composer dependencies
`$ composer install`

use docker-compose to run [laradock](https://laradock.io)
`$ docker-compose up -d workspace nginx redis`

run laravel worker and laravel-echo-server
`$ php artisan queue:work`
`$ laravel-echo-server start`