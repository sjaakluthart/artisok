#!/bin/bash

if [ -z "${BUILD_DIR}" ]; then
  BUILD_DIR=./build
fi

cp -R assets build
npm run postcss

cat ${BUILD_DIR}/css/{meyer-reset.css,index.css} > bundle.css
rm -rf ${BUILD_DIR}/css/

cat templates/{header.html,home.html,footer.html} > ${BUILD_DIR}/index.html
cat templates/{header.html,about.html,footer.html} > ${BUILD_DIR}/about.html
cat templates/{header.html,products.html,footer.html} > ${BUILD_DIR}/products.html

mkdir build/assets/css

CSS_HASH=$(shasum bundle.css | cut -b-10)
mv bundle.css ${BUILD_DIR}/assets/css/bundle.${CSS_HASH}.css

sed -i -e s@%%CSS_HASH%%@${CSS_HASH}@ ${BUILD_DIR}/*.html
