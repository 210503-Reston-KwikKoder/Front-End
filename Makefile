.PHONY: build run clean test clearlogs publish

#Angular_project_root is the directory containing the angular project relative to this makefile
Angular_project_root = KwikKoderUI

#log_dir is the name of directory with logs relative to Angular_project_root
log_dir = logs

build:
	cd ./$(Angular_project_root) && ng build

test:
	cd ./$(Angular_project_root) && ng test

run: 
	cd ./$(Angular_project_root) && ng serve

clean: clearlogs

sonar-scanner:
	cd ./$(Angular_project_root) && npm run test:ci
	cd ./$(Angular_project_root) && sonar-scanner
	
clearlogs:
	rm -f $(Angular_project_root)/$(log_dir)/*

createimage:
	docker build . -t kwikkoder/front-end:test

runimage:
	docker run -p 80:80 kwikkoder/front-end:test