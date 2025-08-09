build:
	rm -r docs/ 
	mkdir docs 
	cp src/*.html docs/ 
	cp src/*.svg docs/ 
	npx webpack
