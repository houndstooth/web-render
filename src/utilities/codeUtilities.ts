/* eslint-disable max-lines */
import { PropertyPath } from './types'

const iterator: { (i: number, options?: { oneIndexed: boolean }): number[] } = (i, options = { oneIndexed: false }) => {
	let iter: number[] = []
	for (let j = 0; j < Math.ceil(i); j++) {
		iter.push(j)
	}
	if (options.oneIndexed) {
		iter = iter.map(k => k + 1)
	}

	return iter
}

const wrappedIndex: { <T>({}: { array: T[], index?: number }): T } = ({ array, index = 0 }) => {
	let i
	if (index < 0) {
		i = array.length - Math.abs(index) % array.length
		if (i === array.length) {
			i = 0
		}
	}
	else {
		i = index % array.length
	}

	return array[ i ]
}

const shallowEqual: { <T>(a: T, b: T): boolean } = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length

	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[ key ])
}

const deepClone: { <T>(objectToDeepClone: T): T } = objectToDeepClone => {
	const clonedObject = {} as typeof objectToDeepClone
	setAllPropertiesOfObjectOnAnother({
		objectWithProperties: objectToDeepClone,
		objectToChange: clonedObject,
	})

	return clonedObject
}

const setAllPropertiesOfObjectOnAnother: {
	({}: { objectWithProperties, objectToChange }): void,
} = ({ objectWithProperties, objectToChange }) => {
	Object.entries(objectWithProperties).forEach(([ propertyName, propertyValue ]) => {
		objectToChange[ propertyName ] = deepCloneMaybeNotObject(propertyValue)
	})
}

const deepCloneMaybeNotObject: { <T>(maybeObjectToDeepClone: T): T } = maybeObjectToDeepClone => {
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

const deeperPath: {
	({}: { propertyPath: PropertyPath, propertyName: string }): PropertyPath,
} = ({ propertyPath, propertyName }) => {
	const path = propertyPath.slice()
	path.push(propertyName)

	return path as PropertyPath
}

const accessChildPropertyOrCreatePath: {
	({}: { objectWithProperties: object, propertyPath: PropertyPath }): any,
} = ({ objectWithProperties, propertyPath }) => {
	let childProperty = objectWithProperties
	propertyPath.forEach(pathStep => {
		if (!isDefined(childProperty[ pathStep ])) {
			childProperty[ pathStep ] = {}
		}
		childProperty = childProperty[ pathStep ]
	})

	return childProperty
}

const defaultToTrue: { <T>(property: T): T | boolean } = property => isDefined(property) ? property : true

const isDefined: { <T>(property: T): boolean } = property => typeof property !== 'undefined'

const propertyIsDefinedOnObject: {
	({}: { objectWithProperties: object, propertyName: string }): boolean,
} = ({ propertyName, objectWithProperties }) =>
	isDefined(objectWithProperties[ propertyName ])

const changeObjectIntoCopy: {
	({}: { objectToChange: object, objectWithProperties: object }): void,
} = ({ objectToChange, objectWithProperties }) => {
	Object.keys(objectToChange).forEach(key => delete objectToChange[ key ])
	setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
}

const reversed: { <T>(array: T[]): T[] } = array => array.slice().reverse()

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
