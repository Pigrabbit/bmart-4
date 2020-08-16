#!/bin/bash
npm run build --prefix client
rm -r server/public
mkdir server/public
cp -r client/build/* server/public