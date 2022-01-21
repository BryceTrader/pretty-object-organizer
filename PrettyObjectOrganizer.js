const PrettyObjectOrganizer = (userConfig = {}) => {
	const config = {}

	config.left = userConfig.left || '|'
	config.right = userConfig.right || '|'
	config.corner = userConfig.corner || '#'
	config.bottom = userConfig.bottom || '-'
	config.top = userConfig.top || '-'
	config.space = userConfig.space || 1
	config.lineNumbers = userConfig.lineNumbers || false

	const LOG = (...value) => {
		const other = []
		const important = []

		for (let i = 0; i < value.length; i++) {
			if (typeof value[i] == 'object') {
				if (Array.isArray(value[i])) {
					other.push(value[i])
				} else {
					important.push(value[i])
				}
			} else {
				other.push(value[i])
			}
		}

		if (other) console.log(...other)
		if (important) {
			for (let i = 0; i < important.length; i++) {
				console.log(prettyPrint(important[i]))
			}
		}
	}

	const prettyPrint = (x) => {
		let arr = Object.entries(x)
		const tester = Object.entries(arr[0][1])
		let title
		if (tester.length > 0) {
			title = arr[0][0]
			arr = tester
		}
		return makeOutput(arr, findLongest(arr), title)
	}

	const findLongest = (x) => {
		let size = 0
		for (let i = 0; i < x.length; i++) {
			let length = 0
			for (let j = 0; j < x[i].length; j++) {
				length += `${x[i][j]}`.length
			}
			if (length > size) {
				size = length
			}
		}
		return size
	}

	const makeOutput = (arr, size, title) => {
		const left = config.left + ' '
		const right = ' ' + config.right + '\n'
		const corners = config.corner
		const bottom = config.bottom
		const top = config.top
		const extraSpace = config.space

		let topBar = corners
		let bottomBar = corners
		let lineNumberBalancer = 0
		const LNBOffset = config.lineNumbers ? 1 : 0
		const loops = size + config.left.length + config.right.length + 1 + extraSpace + LNBOffset

		for (let i = 0; i < loops + lineNumberBalancer; i++) {
			if (config.lineNumbers) lineNumberBalancer = `${i}`.length
			topBar += top
			bottomBar += bottom
		}
		topBar += corners
		bottomBar += corners + '\n'

		let output = '\n'
		if (title) {
			const count = Math.floor(topBar.length / 2) - Math.floor(title.length / 2)
			for (let i = 0; i < count; i++) {
				output += ' '
			}
			output += title + '\n'
		}

		output += topBar + '\n'
		for (let i = 0; i < arr.length; i++) {
			if (config.lineNumbers) output += balancer(i, lineNumberBalancer)
			output += `${left}${arr[i][0]}:${spaces(arr[i], size, extraSpace)}${arr[i][1]}${right}`
		}
		output += bottomBar

		return output
	}

	const balancer = (i, lineNumber) => {
		let result = `${i + 1} `
		for (let j = `${i}`.length; j < lineNumber; j++) {
			result += ' '
		}
		return result
	}

	const spaces = (arr, x, extra = 0) => {
		const numberOfSpaces = x - arr.join('').length + extra
		let result = ''
		for (let i = 0; i < numberOfSpaces; i++) {
			result += ' '
		}

		return result
	}

	const ChangeConfig = (newConfig) => {
		config.left = newConfig.left || config.left
		config.right = newConfig.right || config.right
		config.corner = newConfig.corner || config.corner
		config.bottom = newConfig.bottom || config.bottom
		config.top = newConfig.top || config.top
		config.space = newConfig.space || config.space
		config.lineNumbers = newConfig.lineNumbers = config.lineNumbers
	}

	return {
		log: LOG,
		changeConfig: ChangeConfig,
	}
}

module.exports = PrettyObjectOrganizer
