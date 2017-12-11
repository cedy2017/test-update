LAST_CHANGED_REV = $(shell git rev-list HEAD -n 1 | cut -c 1-8)

main:
	cd ./release && rm -fr !(node_modules)
	cp -r ./app ./release/app
	cp -r ./config ./release/config
	cp -r ./node_modules ./release/node_modules
	cp ./package.json	./release
	cp ./favicon.ico ./release
	cp ./dispatch.js ./release
	cd ./release && npm install --production && tar -cvzf ./sothebys.release.$(v).$(LAST_CHANGED_REV).tar.gz ./

.PHONY: main
