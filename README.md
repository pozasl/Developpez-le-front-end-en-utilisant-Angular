[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)

# Télésport Olympic front-end

This project is the Olympic's app front-end.
It displays the medals won by the articipating countries in a Dashboard and other detailed informations on their participations.

## Technologies
- TS
- CSS 
- Angular (18.0.3)

## Authors

Starter code: @el1638en and @dpnick

UX design: Omar

Application code: @pozasl


## Licensing

&copy; DelivWeb

## Development environment
For conveniance a devcontainer with NodeJS and Google-Chrome is provided.

Otherwise you need to install nodejs and npm then run `npm instal`

Run `ng serve` for a dev server. Navigate to `http://127.0.0.1:4200/`. The application will automatically reload if you change any of the source files.

## Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project architecture

The architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components (`ui` and `charts` folders)
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)
