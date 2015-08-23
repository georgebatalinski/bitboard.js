.PHONY: test lint docs clean

SRC=BitBoard.js
TESTS=test/*.js

test:
	mocha $(TESTS)

lint:
	jshint $(SRC) $(TESTS)

docs:
	jsdoc $(SRC)

clean:
	rm -rf *.log out/
