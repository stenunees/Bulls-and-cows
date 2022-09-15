# Bulls and cows

An implementation of the **bulls and cows** puzzle game,
it's similar to mastermind.

The project was coded for fun during a weekend, after a friend taught me the game, mainly to practice my JavaScript knowledge.

## Goal of the game

Find all the numbers in their correct position and you win.

You can play the game [**here**](http://nioniosfr.github.io/js-bulls-cows/)

## Contributing

If you want to contribute, you are more than welcome.
Here's how I though of it initially.

## Requirements

- `nodejs`
- `grunt`

## Structure

The project source files are stored under the `src` folder and the libraries and "compiled" files into the `dist` folder.

The project is using the `npm` package manager to keep track of the project dependencies and the `grunt` task runner to automate some of the work.

For the page styling the twitter-bootstrap framework is used, and is placed under the `dist` folder when executing `grunt copy` from the root of the project.

Changes to the HTML document should also point to the `gh-pages` branch.

###Get the code

To create the development environment, first clone the repository locally.

```bash
git clone https://github.com/NioniosFr/js-bulls-cows.git
```

and then move inside the project folder and install the dependencies.

```bash
cd js-bulls-cows
npm install
```

### JavaScript code

Run `grunt jshint` to lint your file, fix any errors and then commit.

### General tasks

By running `grunt` from the root of the repository, the files that exist in the source will be concatenated, minified, and a header will be applied.  
The resulted file is saved under the `dist` folder.

The tasks can be changed and/or reviewed from inside the `Gruntfile.js` file.

## License

The project is licensed under the [MIT License](http://opensource.org/licenses/MIT)