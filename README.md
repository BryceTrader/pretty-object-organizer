# pretty-object-organizer

Module to make logging objects to the console look a little better.
Require the package and then assign it to a varible to begin logging.
You can use the defualt style or make your own with a simple object passed in.
```
const pretty = require('pretty-object-organizer')
const prettyConfig = {
	left: '>',
	right: '     |',
	corner: '*',
	bottom: '=',
	top: '=',
	space: 4,
	lineNumbers: true,
}
const logger = pretty(prettyConfig)
logger.log({ reee: { x: 0, y: 123 } })
```
Output:

        reee
*===================*
1  > x:      0      |
2  > y:    123      |
*===================*

You can change the config on the fly by using the changeConfig method.
```
logger.changeConfig({ right: '<' })
logger.log({ reee: { x: 0, y: 123 } })
```
Output:

      reee
*==============*
1  > x:      0 <
2  > y:    123 <
*==============*


This is mostly a meme as I was bored at work.
