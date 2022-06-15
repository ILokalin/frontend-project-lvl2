run:
	node bin/gendiff.js

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install-deps:
	npm ci