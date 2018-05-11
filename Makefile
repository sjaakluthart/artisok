BUILD_DIR=./build

default:
	@echo No target specified

clean:
	rm -rf $(BUILD_DIR)

build: clean
	mkdir $(BUILD_DIR)
	bash scripts/build.sh
