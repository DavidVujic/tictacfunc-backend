### Tic-Tac-Func back end API

Play the game at: https://davidvujic.github.io/tictacfunc

This repo was previously the back end part of Tic-Tac-Func (no longer used in production): a simple API written in nodejs. The service consumes one AWS Lambda and one Azure Function, the players of the game, and returns a player move as a jsonp call.

~~I couldn't figure out how to send data as jsonp from AWS Lambda, that is why this extra layer exist. -Do you have a solution, that would make this API unnecessary?~~

Here is the source code for user interface part (consumer of this API) of the game: https://github.com/DavidVujic/tictacfunc

Also, Here's the players repo, where the source code for AWS Lambda and Azure Functions is: https://github.com/DavidVujic/tictacfunc-player
