LAST_CHANGED_REV = $(shell git rev-list HEAD -n 1 | cut -c 1-8)

main:
	cd ./release && rm -rf ./app && rm -rf ./config && rm -f ./dispatch.js && rm -f ./favicon.ico && rm -f ./package.json && rm -f ./sothebys.release*
	cp -r ./app ./release/app
	cp -r ./config ./release/config
	cp ./package.json	./release
	cp ./favicon.ico ./release
	cp ./dispatch.js ./release
	cd ./release && npm install --production && tar -cvzf ./sothebys.release.$(v).$(LAST_CHANGED_REV).tar.gz ./

.PHONY: main
