LAMBDA=$1
TIMESTAMP=`date +%Y-%m-%d-%H-%M-%S`
ARCHIVE_NAME=${LAMBDA}-${TIMESTAMP}.zip

mkdir -p build

cd $LAMBDA
zip -r $ARCHIVE_NAME .
mv $ARCHIVE_NAME ../build/
cd ..

