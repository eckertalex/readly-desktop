module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'react-app',
		'plugin:jsx-a11y/recommended',
		'react-app/jest',
		'plugin:prettier/recommended',
		'prettier',
	],
	plugins: ['jsx-a11y', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
