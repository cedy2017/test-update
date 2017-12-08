LAST_CHANGED_REV = $(shell git rev-list HEAD -n 1 | cut -c 1-8)

main:
	rm -rf ./release
	cp -r ./app ./release
	cp -r ./config ./release
	cp -r ./node_modules_prod ./release/node_modules
	cp ./package.json	./release
	cp ./favicon.ico ./release
	cp ./dispatch.js ./release
	cd ./release && tar -cvzf ./sothebys.release.$(v).$(LAST_CHANGED_REV).tar.gz ./

.PHONY: main
