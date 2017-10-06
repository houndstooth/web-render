const iterator = (layers, options = { oneIndexed: false }) => {
	let iterator = []
	for (let i = 0; i < Math.ceil(layers); i++) {
		iterator.push(i)
	}
	if (options.oneIndexed) iterator = iterator.map(k => k + 1)
	return iterator
}

const wrappedIndex = ({ array, index = 0 }) => {
	let i
	if (index < 0) {
		i = array.length - (Math.abs(index) % array.length)
		if (i === array.length) i = 0
	}
	else {
		i = index % array.length
	}
	return array[ i ]
}

const shallowEqual = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length
	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[ key ])
}

const deepClone: any = objectToDeepClone => {
	let clonedObject = {}
	setAllPropertiesOfObjectOnAnother({
		objectWithProperties: objectToDeepClone,
		objectToChange: clonedObject,
	})
	return clonedObject
}

const setAllPropertiesOfObjectOnAnother = ({ objectWithProperties, objectToChange }) => {
	Object.entries(objectWithProperties).forEach(([ propertyName, propertyValue ]) => {
		objectToChange[ propertyName ] = deepCloneMaybeNotObject(propertyValue)
	})
}

const deepCloneMaybeNotObject = maybeObjectToDeepClone => {
	let clonedMaybeObject
	if (maybeObjectToDeepClone instanceof Array) {
		clonedMaybeObject = maybeObjectToDeepClone.slice()
	}
	else if (maybeObjectToDeepClone && typeof maybeObjectToDeepClone === 'object') {
		clonedMaybeObject = deepClone(maybeObjectToDeepClone)
	}
	else {
		clonedMaybeObject = maybeObjectToDeepClone
	}
	return clonedMaybeObject
}

const deeperPath = ({ propertyPath, propertyName }) => {
	const deeperPath = propertyPath.slice()
	deeperPath.push(propertyName)
	return deeperPath
}

const accessChildPropertyOrCreatePath = ({ objectWithProperties, propertyPath }) => {
	let childProperty = objectWithProperties
	propertyPath.forEach(pathStep => {
		if (!isDefined(childProperty[ pathStep ])) childProperty[ pathStep ] = {}
		childProperty = childProperty[ pathStep ]
	})
	return childProperty
}

const defaultToTrue = property => isDefined(property) ? property : true

const isDefined = property => typeof property !== 'undefined'

const propertyIsDefinedOnObject = ({ propertyName, objectWithProperties }) => {
	return isDefined(objectWithProperties[ propertyName ])
}

const changeObjectIntoCopy = ({ objectToChange, objectWithProperties }) => {
	Object.keys(objectToChange).forEach(key => delete objectToChange[key])
	setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
}

const reversed = array => array.slice().reverse()

export {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	deepCloneMaybeNotObject,
	deeperPath,
	accessChildPropertyOrCreatePath,
	defaultToTrue,
	isDefined,
	propertyIsDefinedOnObject,
	changeObjectIntoCopy,
	reversed,
}